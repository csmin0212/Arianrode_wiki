import { NextRequest } from 'next/server'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { createHash } from 'crypto'

const DB_PATH = join(process.cwd(), 'data', 'reviews.json')

interface Review {
  id: string
  skillId: string
  authorName: string
  passwordHash: string | null
  rating: number
  comment: string
  createdAt: string
}

interface DB {
  reviews: Review[]
}

function readDB(): DB {
  try {
    return JSON.parse(readFileSync(DB_PATH, 'utf-8'))
  } catch {
    return { reviews: [] }
  }
}

function writeDB(data: DB) {
  mkdirSync(dirname(DB_PATH), { recursive: true })
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
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
  const db = readDB()

  if (skillId) {
    const reviews = db.reviews.filter(r => r.skillId === skillId)
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0
    return Response.json({
      reviews: reviews.map(sanitize),
      avgRating: Math.round(avgRating * 10) / 10,
      count: reviews.length,
    })
  }

  // 전체 스킬별 평균 집계
  const aggregates: Record<string, { avgRating: number; count: number }> = {}
  for (const r of db.reviews) {
    if (!aggregates[r.skillId]) aggregates[r.skillId] = { avgRating: 0, count: 0 }
    aggregates[r.skillId].count++
    aggregates[r.skillId].avgRating += r.rating
  }
  for (const id in aggregates) {
    const a = aggregates[id]
    a.avgRating = Math.round((a.avgRating / a.count) * 10) / 10
  }

  return Response.json({ aggregates })
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

  const db = readDB()
  const review: Review = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    skillId,
    authorName: authorName?.trim() || '익명',
    passwordHash: password?.trim() ? hashPassword(password.trim()) : null,
    rating: Number(rating),
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
  }

  db.reviews.push(review)
  writeDB(db)

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

  const db = readDB()
  const index = db.reviews.findIndex(r => r.id === id)
  if (index === -1) return Response.json({ error: '리뷰를 찾을 수 없습니다.' }, { status: 404 })

  const review = db.reviews[index]
  if (review.passwordHash) {
    if (!password) return Response.json({ error: '비밀번호가 필요합니다.' }, { status: 403 })
    if (hashPassword(password) !== review.passwordHash) {
      return Response.json({ error: '비밀번호가 틀렸습니다.' }, { status: 403 })
    }
  }

  db.reviews.splice(index, 1)
  writeDB(db)

  return Response.json({ success: true })
}
