import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { createHash } from 'crypto'

export const dynamic = 'force-dynamic'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const DB_KEY = 'arianrode:reviews'

interface Review {
  id: string
  skillId: string
  authorName: string
  passwordHash: string | null
  rating: number
  comment: string
  createdAt: string
}

async function readReviews(): Promise<Review[]> {
  try {
    const data = await redis.get<Review[]>(DB_KEY)
    return data ?? []
  } catch {
    return []
  }
}

async function writeReviews(reviews: Review[]) {
  await redis.set(DB_KEY, reviews)
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

function sanitize(r: Review) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safe } = r
  return safe
}

export async function GET(req: NextRequest) {
  const skillId = req.nextUrl.searchParams.get('skillId')
  const prefix = req.nextUrl.searchParams.get('prefix')
  const reviews = await readReviews()

  // 접두사 일괄 조회 — 해당 네임스페이스의 리뷰를 한 번의 요청으로 모두 반환한다.
  // (서버는 어차피 전체를 읽으므로, 카드마다 따로 요청하는 것보다 훨씬 싸다)
  if (prefix) {
    const byId: Record<string, ReturnType<typeof sanitize>[]> = {}
    const aggregates: Record<string, { avgRating: number; count: number }> = {}

    for (const r of reviews) {
      if (!r.skillId?.startsWith(prefix)) continue
      const id = r.skillId.slice(prefix.length)
      ;(byId[id] ??= []).push(sanitize(r))
      const a = (aggregates[id] ??= { avgRating: 0, count: 0 })
      a.count++
      a.avgRating += r.rating
    }
    for (const id in aggregates) {
      const a = aggregates[id]
      a.avgRating = Math.round((a.avgRating / a.count) * 10) / 10
    }
    // 각 카드의 리뷰는 최신순으로
    for (const id in byId) {
      byId[id].sort((x, y) => (y.createdAt || '').localeCompare(x.createdAt || ''))
    }

    return Response.json({ byId, aggregates }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }

  if (skillId) {
    const filtered = reviews.filter(r => r.skillId === skillId)
    const avgRating = filtered.length > 0
      ? filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length
      : 0
    return Response.json({
      reviews: filtered.map(sanitize),
      avgRating: Math.round(avgRating * 10) / 10,
      count: filtered.length,
    })
  }

  // 전체 스킬별 평균 집계
  const aggregates: Record<string, { avgRating: number; count: number }> = {}
  for (const r of reviews) {
    if (!aggregates[r.skillId]) aggregates[r.skillId] = { avgRating: 0, count: 0 }
    aggregates[r.skillId].count++
    aggregates[r.skillId].avgRating += r.rating
  }
  for (const id in aggregates) {
    const a = aggregates[id]
    a.avgRating = Math.round((a.avgRating / a.count) * 10) / 10
  }

  return Response.json({ aggregates }, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { skillId, authorName, password, rating, comment } = body

  if (!skillId || rating == null || !comment?.trim()) {
    return Response.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
  }
  if (rating < 1 || rating > 5) {
    return Response.json({ error: '평점은 1~5 사이여야 합니다.' }, { status: 400 })
  }

  const reviews = await readReviews()
  const review: Review = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    skillId,
    authorName: authorName?.trim() || '익명',
    passwordHash: password?.trim() ? hashPassword(password.trim()) : null,
    rating: Number(rating),
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
  }

  reviews.push(review)
  await writeReviews(reviews)

  return Response.json({ success: true, review: sanitize(review) })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'id가 없습니다.' }, { status: 400 })

  let password: string | undefined
  try {
    const body = await req.json()
    password = body.password
  } catch {
    // no body
  }

  const reviews = await readReviews()
  const index = reviews.findIndex(r => r.id === id)
  if (index === -1) return Response.json({ error: '리뷰를 찾을 수 없습니다.' }, { status: 404 })

  const review = reviews[index]
  if (review.passwordHash) {
    if (!password) return Response.json({ error: '비밀번호가 필요합니다.' }, { status: 403 })
    if (hashPassword(password) !== review.passwordHash) {
      return Response.json({ error: '비밀번호가 틀렸습니다.' }, { status: 403 })
    }
  }

  reviews.splice(index, 1)
  await writeReviews(reviews)

  return Response.json({ success: true })
}
