'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── 타입 ──────────────────────────────────────────────────────────────────

type SkillTier = 'making' | 'normal' | 'cl5' | 'cl10' | 'special'

interface Skill {
  id: string
  name: string
  tier?: SkillTier
}

interface Category {
  id: string
  name: string
  accent: string
  skills: Skill[]
}

interface Review {
  id: string
  skillId: string
  authorName: string
  rating: number
  comment: string
  createdAt: string
}

interface Aggregate {
  avgRating: number
  count: number
}

// ─── 데이터 ─────────────────────────────────────────────────────────────────

const RACES: Category[] = [
  { id: 'hurin', name: '휴린', accent: '#C85A1E', skills: [
    { id: 'hurin-ollaround',      name: '올라운드',      tier: 'making' },
    { id: 'hurin-providence',     name: '프로비던스',    tier: 'making' },
    { id: 'hurin-half-blood',     name: '하프 블러드',   tier: 'making' },
    { id: 'hurin-gift',           name: '기프트',        tier: 'normal' },
    { id: 'hurin-combat-mastery', name: '컴뱃 마스터리', tier: 'normal' },
    { id: 'hurin-predominant',    name: '프리도미던트',  tier: 'normal' },
    { id: 'hurin-razor-sharp',    name: '레이저 샤프',   tier: 'cl5'    },
    { id: 'hurin-meister',        name: '마이스터',      tier: 'cl5'    },
    { id: 'hurin-esotekira',      name: '에소테키라',    tier: 'cl10'   },
  ] },
  { id: 'eldanan',    name: '엘다난',     accent: '#5A6A9A', skills: [] },
  { id: 'nevaf',      name: '네바프',     accent: '#7A6030', skills: [] },
  { id: 'pilbor',     name: '필보르',     accent: '#4A8A5A', skills: [] },
  { id: 'verna',      name: '버나',       accent: '#4A88CA', skills: [] },
  { id: 'duang',      name: '두앙',       accent: '#7A6A8A', skills: [] },
  { id: 'eosheon',    name: '어션',       accent: '#686868', skills: [] },
  { id: 'sahagin',    name: '사하긴',     accent: '#2A7A9A', skills: [] },
  { id: 'nephilim',   name: '네필림',     accent: '#8A5535', skills: [] },
  { id: 'diva',       name: '디바',       accent: '#A0A025', skills: [] },
  { id: 'lemures',    name: '레무레스',   accent: '#5A3A80', skills: [] },
  { id: 'ex-machina', name: '엑스 마키나', accent: '#5A7A8A', skills: [] },
  { id: 'dragonet',   name: '드라고넷',   accent: '#A05525', skills: [] },
  { id: 'alcard',     name: '알카드',     accent: '#6A2A6A', skills: [] },
  { id: 'homgoblin',  name: '홈고블린',   accent: '#3A6A3A', skills: [] },
  { id: 'hokaspokas', name: '호카스포카스', accent: '#6A5A8A', skills: [] },
  { id: 'jelbor',     name: '젤보어',     accent: '#8A7A30', skills: [] },
  { id: 'doomguard',  name: '둠가드',     accent: '#6A3020', skills: [] },
  { id: 'fey',        name: '페이',       accent: '#8A4A9A', skills: [] },
  { id: 'glaiaei',    name: '글라이아이', accent: '#7A50A0', skills: [] },
]

const CLASSES: Category[] = [
  { id: 'class-placeholder', name: '(클래스명 미확인)', accent: '#8D6E63', skills: [] },
]

// ─── 유틸 ──────────────────────────────────────────────────────────────────

const ACCENT_MAIN = '#5E3A1E'
const SIDEBAR_BG = '#1E1812'

const TIER_CONFIG: Record<SkillTier, { label: string; color: string; bg: string }> = {
  making:  { label: '메이킹', color: '#7B8FE8', bg: '#7B8FE822' },
  normal:  { label: '일반',   color: '#4CAF50', bg: '#4CAF5022' },
  cl5:     { label: 'CL5+',  color: '#FFC107', bg: '#FFC10722' },
  cl10:    { label: 'CL10+', color: '#8D6E63', bg: '#8D6E6322' },
  special: { label: '특수',  color: '#F44336', bg: '#F4433622' },
}

function TierBadge({ tier, small }: { tier?: SkillTier; small?: boolean }) {
  if (!tier || tier === 'normal') return null
  const cfg = TIER_CONFIG[tier]
  return (
    <span style={{
      fontSize: small ? 9 : 10, fontWeight: 700,
      color: cfg.color, background: cfg.bg,
      border: `1px solid ${cfg.color}55`,
      padding: small ? '1px 4px' : '2px 6px',
      borderRadius: 4, lineHeight: 1.4,
    }}>
      {cfg.label}
    </span>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function avgColor(hex: string, opacity = 0.15) {
  return hex + Math.round(opacity * 255).toString(16).padStart(2, '0')
}

// ─── 서브 컴포넌트 ─────────────────────────────────────────────────────────

function Stars({ value, onChange, size = 20 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          style={{
            fontSize: size, cursor: onChange ? 'pointer' : 'default',
            color: n <= (hover || value) ? '#F0C030' : '#444',
            transition: 'color 0.1s', lineHeight: 1,
          }}
        >★</span>
      ))}
    </div>
  )
}

function SkillCard({
  skill, accent, aggregate, onClick, selected,
}: {
  skill: Skill; accent: string; aggregate?: Aggregate; onClick: () => void; selected: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected ? avgColor(accent, 0.2) : '#0E0C08',
        border: `1px solid ${selected ? accent : '#2A2520'}`,
        borderRadius: 8, padding: '12px 14px',
        textAlign: 'left', cursor: 'pointer',
        transition: 'all 0.15s', width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: '#F0E0C0', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {skill.name}
          </div>
          <TierBadge tier={skill.tier} small />
        </div>
        {aggregate && aggregate.count > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
            <Stars value={Math.round(aggregate.avgRating)} size={12} />
            <span style={{ fontSize: 10, color: '#A09070' }}>{aggregate.avgRating.toFixed(1)} ({aggregate.count})</span>
          </div>
        ) : (
          <span style={{ fontSize: 10, color: '#5A4A30', flexShrink: 0 }}>미평가</span>
        )}
      </div>
    </button>
  )
}

function SkillDetail({ skill, accent, onClose }: {
  skill: Skill; accent: string; onClose: () => void
}) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deletePassword, setDeletePassword] = useState('')

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reviews?skillId=${encodeURIComponent(skill.id)}`)
      const data = await res.json()
      setReviews(data.reviews || [])
      setAvgRating(data.avgRating || 0)
      setCount(data.count || 0)
    } finally {
      setLoading(false)
    }
  }, [skill.id])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { setFormError('평점을 선택해 주세요.'); return }
    if (!comment.trim()) { setFormError('댓글을 입력해 주세요.'); return }
    setFormError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId: skill.id, authorName, password, rating, comment }),
      })
      if (res.ok) {
        setRating(0); setComment(''); setAuthorName(''); setPassword('')
        await fetchReviews()
      } else {
        const data = await res.json()
        setFormError(data.error || '오류가 발생했습니다.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/reviews?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: deletePassword }),
    })
    if (res.ok) {
      setDeletingId(null); setDeletePassword('')
      await fetchReviews()
    } else {
      const data = await res.json()
      alert(data.error || '삭제 실패')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#0A0806', border: '1px solid #3A2E1A', borderRadius: 6,
    color: '#D0C8B0', fontSize: 13, padding: '7px 10px', width: '100%', outline: 'none',
    fontFamily: "'Noto Sans KR', sans-serif",
  }
  const labelStyle: React.CSSProperties = { fontSize: 11, color: '#7A6040', marginBottom: 4, display: 'block' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <div style={{
        background: `linear-gradient(135deg, ${avgColor(accent, 0.2)} 0%, #0C0A06 100%)`,
        borderBottom: `2px solid ${accent}40`, padding: '20px 24px 18px',
      }}>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: '#7A6040',
          cursor: 'pointer', fontSize: 12, marginBottom: 10, padding: 0,
        }}>
          ← 목록으로
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, color: '#F0E0C0', fontSize: 20, fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>
            {skill.name}
          </h2>
          <TierBadge tier={skill.tier} />
        </div>
        {count > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars value={Math.round(avgRating)} size={16} />
            <span style={{ color: '#F0C030', fontWeight: 700, fontSize: 16 }}>{avgRating.toFixed(1)}</span>
            <span style={{ color: '#7A6040', fontSize: 12 }}>({count}개 평가)</span>
          </div>
        ) : (
          <span style={{ color: '#5A4A30', fontSize: 12 }}>아직 평가가 없습니다</span>
        )}
      </div>

      <div style={{ padding: '20px 24px', flex: 1 }}>
        <h3 style={{
          color: accent, fontSize: 13, fontWeight: 700,
          borderBottom: `1px solid ${accent}30`, paddingBottom: 6, marginBottom: 14,
        }}>
          평가 및 댓글
        </h3>
        {loading ? (
          <div style={{ color: '#5A4A30', fontSize: 13, marginBottom: 20 }}>불러오는 중...</div>
        ) : reviews.length === 0 ? (
          <div style={{ color: '#5A4A30', fontSize: 13, marginBottom: 20 }}>
            아직 댓글이 없습니다. 첫 번째 평가를 남겨보세요!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {reviews.map(r => (
              <div key={r.id} style={{
                background: '#0A0806', border: '1px solid #2A2520',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Stars value={r.rating} size={14} />
                    <span style={{ color: accent, fontWeight: 700, fontSize: 12 }}>{r.authorName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#5A4A30', fontSize: 11 }}>{formatDate(r.createdAt)}</span>
                    {deletingId === r.id ? (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <input
                          type="password" placeholder="비밀번호" value={deletePassword}
                          onChange={e => setDeletePassword(e.target.value)}
                          style={{ ...inputStyle, width: 100, padding: '3px 7px', fontSize: 11 }}
                        />
                        <button onClick={() => handleDelete(r.id)} style={{ fontSize: 11, background: '#C83030', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>확인</button>
                        <button onClick={() => { setDeletingId(null); setDeletePassword('') }} style={{ fontSize: 11, background: '#2A2520', color: '#888', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>취소</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeletingId(r.id)} style={{ fontSize: 10, background: 'none', color: '#5A4A30', border: '1px solid #3A2E1A', borderRadius: 4, padding: '1px 6px', cursor: 'pointer' }}>삭제</button>
                    )}
                  </div>
                </div>
                <p style={{ color: '#A09070', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0C0A06', border: `1px solid ${accent}40`, borderRadius: 8, padding: '16px' }}>
          <h4 style={{ color: accent, fontSize: 13, fontWeight: 700, margin: '0 0 14px' }}>댓글 작성</h4>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={labelStyle}>평점 (필수)</label>
              <Stars value={rating} onChange={setRating} size={24} />
            </div>
            <div>
              <label style={labelStyle}>댓글 (필수)</label>
              <textarea
                value={comment} onChange={e => setComment(e.target.value)}
                placeholder="스킬에 대한 의견을 작성해 주세요."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <label style={labelStyle}>이름 (선택, 비워두면 익명)</label>
                <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="익명" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>비밀번호 (선택, 삭제 시 사용)</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="나중에 삭제할 경우 입력" style={inputStyle} />
              </div>
            </div>
            {formError && <div style={{ color: '#C83030', fontSize: 12 }}>{formError}</div>}
            <button
              type="submit" disabled={submitting}
              style={{
                background: accent, color: '#fff', border: 'none', borderRadius: 6,
                padding: '9px 0', fontSize: 13, fontWeight: 700,
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? '전송 중...' : '댓글 등록'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────

export default function SkillsPage() {
  const [tab, setTab] = useState<'race' | 'class'>('race')
  const [selectedId, setSelectedId] = useState<string>(RACES[0].id)
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const [aggregates, setAggregates] = useState<Record<string, Aggregate>>({})
  const [mob, setMob] = useState(false)
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const check = () => setMob(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => setAggregates(data.aggregates || {}))
      .catch(() => {})
  }, [])

  const categories = tab === 'race' ? RACES : CLASSES
  const selectedCat = categories.find(c => c.id === selectedId) ?? categories[0]
  const selectedSkill = selectedCat.skills.find(s => s.id === selectedSkillId) ?? null

  function selectCategory(id: string) {
    setSelectedId(id)
    setSelectedSkillId(null)
    if (mob) setShowNav(false)
  }

  function catAvgRating(cat: Category): number | null {
    const rated = cat.skills.filter(s => aggregates[s.id]?.count > 0)
    if (rated.length === 0) return null
    const sum = rated.reduce((acc, s) => acc + (aggregates[s.id]?.avgRating ?? 0), 0)
    return Math.round((sum / rated.length) * 10) / 10
  }

  function refreshAggregates() {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => setAggregates(data.aggregates || {}))
      .catch(() => {})
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Noto Sans KR', sans-serif", background: '#06080E', color: '#D0C8B0' }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />

      {mob && (
        <button
          onClick={() => setShowNav(!showNav)}
          style={{ position: 'fixed', top: 12, left: 12, zIndex: 1000, background: ACCENT_MAIN, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        >
          {showNav ? '✕' : '☰'}
        </button>
      )}

      {/* ── 사이드바 ─────────────────────────────────── */}
      <nav style={{
        width: 248, minWidth: 248,
        background: SIDEBAR_BG, color: '#D4CFC7',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        ...(mob ? {
          position: 'fixed', top: 0, left: showNav ? 0 : -260, height: '100vh', zIndex: 999,
          transition: 'left 0.3s ease', boxShadow: showNav ? '4px 0 20px rgba(0,0,0,0.4)' : 'none',
        } : {}),
      }}>
        <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#7A6A50', textDecoration: 'none', marginBottom: 10, letterSpacing: '0.02em' }}>
            ← 메인으로
          </a>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#7a7060', marginBottom: 6, fontFamily: "'Noto Serif KR', serif" }}>ARIANROD 2E · SKILL WIKI</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#E8E2D4', letterSpacing: '0.04em', lineHeight: 1.4, fontFamily: "'Noto Serif KR', serif" }}>아리안로드<br />스킬 위키</div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {(['race', 'class'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setSelectedId(t === 'race' ? RACES[0].id : CLASSES[0].id); setSelectedSkillId(null) }}
              style={{
                flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                background: tab === t ? 'rgba(255,255,255,0.07)' : 'transparent',
                color: tab === t ? '#E8E2D4' : '#6A6050',
                borderBottom: tab === t ? `2px solid ${ACCENT_MAIN}` : '2px solid transparent',
              }}
            >
              {t === 'race' ? '종족' : '클래스'}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {categories.map(cat => {
            const avg = catAvgRating(cat)
            const isActive = cat.id === selectedId
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '9px 20px', border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontSize: 13, fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                  color: isActive ? cat.accent : '#A09888',
                  borderLeft: isActive ? `3px solid ${cat.accent}` : '3px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <span>{cat.name}</span>
                {avg !== null
                  ? <span style={{ fontSize: 10, color: '#F0C030' }}>★ {avg.toFixed(1)}</span>
                  : <span style={{ fontSize: 10, color: '#4A3A20' }}>미평가</span>
                }
              </button>
            )
          })}
        </div>

        <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 11, color: '#5A4A30' }}>아리안로드 위키</div>
        </div>
      </nav>

      {/* ── 메인 콘텐츠 ──────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selectedSkill ? (
          <SkillDetail
            key={selectedSkill.id}
            skill={selectedSkill}
            accent={selectedCat.accent}
            onClose={() => { setSelectedSkillId(null); refreshAggregates() }}
          />
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* 헤더 — 종족/클래스 이름만 */}
            <div style={{
              background: `linear-gradient(135deg, ${avgColor(selectedCat.accent, 0.12)} 0%, #06080E 100%)`,
              borderBottom: `3px solid ${selectedCat.accent}20`,
              padding: mob ? '60px 20px 24px' : '32px 36px 28px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', color: selectedCat.accent, opacity: 0.7, marginBottom: 8 }}>
                {tab === 'race' ? '종족 스킬' : '클래스 스킬'}
              </div>
              <h1 style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: mob ? 24 : 30, fontWeight: 700,
                color: '#E8E2D4', margin: 0, letterSpacing: '0.02em',
              }}>
                {selectedCat.name}
              </h1>
              {catAvgRating(selectedCat) !== null && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                  <Stars value={Math.round(catAvgRating(selectedCat)!)} size={14} />
                  <span style={{ color: '#F0C030', fontWeight: 700 }}>{catAvgRating(selectedCat)!.toFixed(1)}</span>
                  <span style={{ color: '#5A4A30', fontSize: 12 }}>종합 평균</span>
                </div>
              )}
            </div>

            {/* 스킬 그리드 */}
            <div style={{ padding: mob ? '20px 16px 60px' : '24px 36px 60px', maxWidth: 900 }}>
              {selectedCat.skills.length === 0 ? (
                <div style={{ color: '#5A4A30', fontSize: 13, padding: '20px 0' }}>
                  스킬 데이터 준비 중입니다.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
                  {selectedCat.skills.map(skill => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      accent={selectedCat.accent}
                      aggregate={aggregates[skill.id]}
                      onClick={() => setSelectedSkillId(skill.id)}
                      selected={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
