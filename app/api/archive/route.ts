import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// 페도미 아카이브 카드 DB 전체를 하나의 blob(JSON 문자열)으로 공용 저장한다.
// window.storage.get/set 와 짝을 이룬다.
const DB_KEY = 'pedomi:archive:db'

// 저장소 요청 크기 한도보다 여유 있게 잡는다 (이미지는 /api/image 로 분리)
const MAX_DB_BYTES = 800 * 1024

// GET → { value: string | null }
export async function GET() {
  try {
    const value = await redis.get<string>(DB_KEY)
    return Response.json(
      { value: value ?? null },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    )
  } catch {
    return Response.json({ value: null })
  }
}

// POST { value: string } → { success: true }
export async function POST(req: NextRequest) {
  let body: { value?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const { value } = body
  if (typeof value !== 'string') {
    return Response.json({ error: 'value(문자열)가 필요합니다.' }, { status: 400 })
  }
  // 방어: 실제로 파싱 가능한 배열인지 확인한다.
  let parsed: unknown
  try {
    parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) throw new Error('not array')
  } catch {
    return Response.json({ error: '올바른 아카이브 데이터가 아닙니다.' }, { status: 400 })
  }

  // 이미지는 /api/image 에 따로 저장해야 한다. blob 안에 base64가 섞이면
  // 저장할 때마다 함께 전송되어 저장소 요청 크기 한도를 넘는다.
  const inlineImages = (parsed as { illust?: unknown }[])
    .filter(e => typeof e?.illust === 'string' && e.illust.startsWith('data:')).length
  if (inlineImages > 0) {
    return Response.json(
      { error: `이미지 ${inlineImages}건이 카드에 직접 포함되어 있습니다. 이미지는 별도 업로드가 필요합니다.` },
      { status: 400 },
    )
  }

  if (value.length > MAX_DB_BYTES) {
    return Response.json(
      { error: `아카이브가 너무 큽니다. (${Math.round(value.length / 1024)}KB / 최대 ${Math.round(MAX_DB_BYTES / 1024)}KB)` },
      { status: 413 },
    )
  }

  await redis.set(DB_KEY, value)
  return Response.json({ success: true })
}
