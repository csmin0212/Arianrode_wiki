import { Redis } from '@upstash/redis'
import { describeError } from '../_lib/errors'

export const dynamic = 'force-dynamic'

/* 저장소가 왜 안 되는지 확인하는 진단용 엔드포인트.
   /api/health 를 브라우저로 열면 결과를 볼 수 있다.
   비밀값은 노출하지 않고 존재 여부와 호스트명만 알려준다. */
export async function GET() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN

  const env = {
    KV_REST_API_URL: url ? '설정됨' : '없음',
    KV_REST_API_TOKEN: token ? `설정됨 (${token.length}자)` : '없음',
    host: url ? safeHost(url) : null,
  }

  if (!url || !token) {
    return Response.json({
      ok: false,
      단계: '환경변수',
      진단: '저장소 접속 정보가 배포 환경에 없습니다. Vercel 프로젝트의 환경변수를 확인하세요.',
      env,
    }, { status: 500 })
  }

  // 1) 호스트에 닿는지 (인증 없이 접속만 확인)
  let reach: { ok: boolean; detail: string }
  try {
    const r = await fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
    reach = { ok: true, detail: `HTTP ${r.status}` }
  } catch (e) {
    reach = { ok: false, detail: describeError(e) }
  }

  // 2) 실제 읽기/쓰기
  let rw: { ok: boolean; detail: string }
  try {
    const redis = new Redis({ url, token })
    const key = 'pedomi:health'
    const stamp = new Date().toISOString()
    await redis.set(key, stamp)
    const back = await redis.get<string>(key)
    rw = { ok: back === stamp, detail: back === stamp ? '읽기/쓰기 정상' : `되읽은 값이 다름: ${back}` }
  } catch (e) {
    rw = { ok: false, detail: describeError(e) }
  }

  const ok = reach.ok && rw.ok
  return Response.json({
    ok,
    env,
    호스트접속: reach,
    읽기쓰기: rw,
    진단: ok
      ? '저장소 정상입니다.'
      : reach.detail.includes('ENOTFOUND')
        ? '저장소 호스트를 찾을 수 없습니다. 데이터베이스가 삭제되었거나 주소가 바뀐 것으로 보입니다. Vercel에서 Upstash(KV) 스토어를 다시 연결하고 환경변수를 갱신하세요.'
        : '저장소에 연결하지 못했습니다. 아래 detail 을 확인하세요.',
  }, { status: ok ? 200 : 502 })
}

function safeHost(u: string) {
  try { return new URL(u).host } catch { return '주소 형식 오류' }
}
