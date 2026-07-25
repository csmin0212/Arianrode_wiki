import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { createHash } from 'crypto'

export const dynamic = 'force-dynamic'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// 카드 일러스트는 아카이브 DB(JSON blob)와 분리해 이미지별 키에 저장한다.
// blob 안에 base64로 넣으면 저장할 때마다 전체를 전송하게 되어 요청 크기 한도를 넘긴다.
const imgKey = (id: string) => `pedomi:img:${id}`

const MAX_BYTES = 900 * 1024   // 원본 데이터 URL 기준 상한
const ALLOWED = /^data:image\/(jpeg|png|webp|gif);base64,/

// GET /api/image?id=<hash> → 이미지 바이트
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id || !/^[a-f0-9]{8,64}$/.test(id)) {
    return new Response('잘못된 id', { status: 400 })
  }

  let dataUrl: string | null = null
  try {
    dataUrl = await redis.get<string>(imgKey(id))
  } catch {
    return new Response('저장소 오류', { status: 502 })
  }
  if (!dataUrl) return new Response('이미지를 찾을 수 없습니다', { status: 404 })

  const m = dataUrl.match(/^data:([^;]+);base64,(.*)$/)
  if (!m) return new Response('손상된 이미지', { status: 500 })

  const bytes = Buffer.from(m[2], 'base64')
  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': m[1],
      'Content-Length': String(bytes.length),
      // 내용 해시가 id이므로 URL이 바뀌지 않는 한 내용도 같다 → 영구 캐시 가능
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}

// POST { data: "data:image/...;base64,..." } → { url }
export async function POST(req: NextRequest) {
  let body: { data?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const data = body.data
  if (typeof data !== 'string' || !ALLOWED.test(data)) {
    return Response.json(
      { error: '지원하지 않는 이미지 형식입니다. (jpeg / png / webp / gif)' },
      { status: 400 },
    )
  }
  if (data.length > MAX_BYTES) {
    return Response.json(
      { error: `이미지가 너무 큽니다. (${Math.round(data.length / 1024)}KB / 최대 ${Math.round(MAX_BYTES / 1024)}KB)` },
      { status: 413 },
    )
  }

  // 내용 해시를 id로 삼아 같은 이미지는 한 번만 저장한다
  const id = createHash('sha256').update(data).digest('hex').slice(0, 24)
  try {
    await redis.set(imgKey(id), data)
  } catch {
    return Response.json({ error: '이미지 저장에 실패했습니다.' }, { status: 502 })
  }

  return Response.json({ url: `/api/image?id=${id}`, id })
}
