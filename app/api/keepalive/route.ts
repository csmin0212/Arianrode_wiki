import { Redis } from '@upstash/redis'
import { describeError } from '../_lib/errors'

export const dynamic = 'force-dynamic'

/* 저장소 자동 깨우기.
   Upstash 무료 플랜은 일정 기간 요청이 없으면 데이터베이스를 보관(archive)해 버린다.
   보관되면 주소가 응답하지 않아 저장 기능이 통째로 멈춘다.
   vercel.json 의 cron 이 하루 한 번 이 경로를 호출해 활성 상태를 유지한다. */
export async function GET() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    return Response.json({ ok: false, error: '저장소 접속 정보가 없습니다.' }, { status: 500 })
  }

  try {
    const redis = new Redis({ url, token })
    const stamp = new Date().toISOString()
    await redis.set('pedomi:keepalive', stamp)
    return Response.json({ ok: true, 확인시각: stamp })
  } catch (e) {
    // 실패는 Vercel 로그에 남는다 → 저장소가 죽으면 여기서 먼저 드러난다
    return Response.json({ ok: false, error: describeError(e) }, { status: 502 })
  }
}
