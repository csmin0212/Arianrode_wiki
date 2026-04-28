'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── 타입 ──────────────────────────────────────────────────────────────────

type SkillTier = 'normal' | 'cl5' | 'cl10' | 'special'

interface Skill {
  id: string
  name: string
  tier?: SkillTier
}

interface RaceStats {
  str: number   // 근력
  dex: number   // 재주
  agi: number   // 민첩
  int: number   // 지력
  per?: number  // 감지 (일부 종족)
  spi: number   // 정신
  luk: number   // 행운
  hp: number
  mp: number
}

interface Category {
  id: string
  name: string
  accent: string
  description: string
  skills: Skill[]
  stats?: RaceStats
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
// 스킬 효과 텍스트는 저작권 이슈로 미포함. 이름 + 티어만 관리.
// ※ 아래 스킬 이름은 실제 데이터 입력 전 임시 값입니다. 이미지 재전송 후 교체 예정.

const RACES: Category[] = [
  {
    id: 'hurin', name: '휴린', accent: '#C85A1E',
    description: '태양신 아켄라브에 의해 보내어진 전사의 종족.',
    stats: { str: 10, dex: 9, agi: 9, int: 7, spi: 8, luk: 9, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'eldanan', name: '엘다난', accent: '#5A6A9A',
    description: '달의 여신 브리간티아의 수호를 받는 종족.',
    stats: { str: 7, dex: 8, agi: 9, int: 10, spi: 9, luk: 9, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'nevaf', name: '네바프', accent: '#7A6030',
    description: '대장신 고바논이 빚어낸 종족.',
    stats: { str: 10, dex: 10, agi: 7, int: 8, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'pilbor', name: '필보르', accent: '#4A8A5A',
    description: '샘의 여신 아에마가 낳은 종족.',
    stats: { str: 7, dex: 8, agi: 10, int: 8, spi: 9, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'verna', name: '버나', accent: '#4A88CA',
    description: '천공신 다그데모아가 창조한 비행 종족.',
    stats: { str: 8, dex: 9, agi: 11, int: 8, spi: 7, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'duang', name: '두앙', accent: '#7A6A8A',
    description: '뇌신 그랑아인이 창조한 종족.',
    stats: { str: 8, dex: 9, agi: 9, int: 9, spi: 8, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'eosheon', name: '어션', accent: '#686868',
    description: '현대 지구에서 에린으로 넘어온 종족.',
    stats: { str: 9, dex: 9, agi: 9, int: 9, spi: 8, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'sahagin', name: '사하긴', accent: '#2A7A9A',
    description: '수신의 가호를 받는 수생 종족.',
    stats: { str: 10, dex: 8, agi: 9, int: 7, spi: 8, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'nephilim', name: '네필림', accent: '#8A5535',
    description: '거인의 혈통을 이어받은 종족.',
    stats: { str: 11, dex: 7, agi: 7, int: 8, spi: 8, luk: 9, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'diva', name: '디바', accent: '#A0A025',
    description: '엘더·데미갓·히어로 세 계통으로 나뉘는 신성 종족.',
    stats: { str: 8, dex: 9, agi: 9, int: 9, spi: 9, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'lemures', name: '레무레스', accent: '#5A3A80',
    description: '영체를 지닌 정신 최강의 종족.',
    stats: { str: 7, dex: 8, agi: 8, int: 9, spi: 11, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'ex-machina', name: '엑스 마키나', accent: '#5A7A8A',
    description: '근력 최강의 기계 종족.',
    stats: { str: 11, dex: 9, agi: 7, int: 8, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'dragonet', name: '드라고넷', accent: '#A05525',
    description: '용의 피를 이어받은 종족.',
    stats: { str: 10, dex: 8, agi: 9, int: 9, spi: 8, luk: 6, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'alcard', name: '알카드', accent: '#6A2A6A',
    description: '뱀파이어의 피를 이어받은 종족.',
    stats: { str: 8, dex: 9, agi: 9, int: 10, spi: 8, luk: 6, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'homgoblin', name: '홈고블린', accent: '#3A6A3A',
    description: '숲과 자연에 적응한 종족.',
    stats: { str: 8, dex: 10, agi: 10, int: 8, spi: 7, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'hokaspokas', name: '호카스포카스', accent: '#6A5A8A',
    description: '마술에 능통한 종족.',
    stats: { str: 7, dex: 8, agi: 8, int: 10, spi: 10, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'jelbor', name: '젤보어', accent: '#8A7A30',
    description: '재주와 민첩이 높은 상인 계열 종족.',
    stats: { str: 7, dex: 10, agi: 10, int: 9, spi: 7, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'doomguard', name: '둠가드', accent: '#6A3020',
    description: '근력 최강의 격투 특화 종족.',
    stats: { str: 11, dex: 8, agi: 9, int: 7, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'fey', name: '페이', accent: '#8A4A9A',
    description: '12가지 타입으로 나뉘는 요정 종족.',
    stats: { str: 8, dex: 9, agi: 9, int: 9, spi: 8, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'glaiaei', name: '글라이아이', accent: '#7A50A0',
    description: '이형(異形)의 힘을 신체 각 부위에 발현시키는 종족.',
    stats: { str: 9, dex: 9, agi: 9, int: 9, per: 8, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [
      { id: 'glaiaei-1',        name: '글라이아이: 아이언 핸드',      tier: 'normal' },
      { id: 'glaiaei-2',        name: '글라이아이: 어설트 스킨',      tier: 'normal' },
      { id: 'glaiaei-3',        name: '글라이아이: 아마베네트레이트',  tier: 'normal' },
      { id: 'glaiaei-4',        name: '글라이아이: 인비지블 핸드',    tier: 'normal' },
      { id: 'glaiaei-5',        name: '글라이아이: 보이드 슬래시',    tier: 'normal' },
      { id: 'glaiaei-sp1',      name: '수륙양용',                     tier: 'special' },
      { id: 'glaiaei-6',        name: '글라이아이: 워터 스텐스',      tier: 'normal' },
      { id: 'glaiaei-7',        name: '글라이아이: 가드 암',          tier: 'normal' },
      { id: 'glaiaei-8',        name: '글라이아이: 샷 아이',          tier: 'normal' },
      { id: 'glaiaei-9',        name: '글라이아이: 스트레치암',       tier: 'normal' },
      { id: 'glaiaei-10',       name: '글라이아이: 스톰풋',           tier: 'normal' },
      { id: 'glaiaei-cl5-1',   name: '글라이아이: 스파이트 아이',    tier: 'cl5' },
      { id: 'glaiaei-cl5-2',   name: '글라이아이: 디멘전 블로우',    tier: 'cl5' },
      { id: 'glaiaei-cl5-3',   name: '글라이아이: 데드헤어',         tier: 'cl5' },
      { id: 'glaiaei-cl5-4',   name: '글라이아이: 페이크 페이스',    tier: 'cl5' },
      { id: 'glaiaei-cl5-5',   name: '글라이아이: 포이즌 리퀴드',    tier: 'cl5' },
      { id: 'glaiaei-cl5-6',   name: '글라이아이: 마제스틱 헤어',    tier: 'cl5' },
      { id: 'glaiaei-cl5-7',   name: '글라이아이: 매직 아이',        tier: 'cl5' },
      { id: 'glaiaei-cl5-8',   name: '글라이아이: 미라지 아이',      tier: 'cl5' },
      { id: 'glaiaei-cl5-9',   name: '글라이아이: 루스트 미스트',    tier: 'cl5' },
      { id: 'glaiaei-cl5-10',  name: '오라 스킨',                    tier: 'cl5' },
      { id: 'glaiaei-cl5-11',  name: '듀얼 페이스',                  tier: 'cl5' },
    ],
  },
]

// ※ 클래스 이름 및 스킬 목록은 실제 데이터로 교체 예정.
// 마지막 이미지(image 3)의 6개 스킬은 별도 클래스로 분리.
const CLASSES: Category[] = [
  {
    id: 'class-last', name: '(클래스명 미확인)', accent: '#8D6E63',
    description: '클래스명을 확인 후 업데이트 예정.',
    skills: [
      { id: 'cls-last-1', name: '이그젝트핸드',    tier: 'normal' },
      { id: 'cls-last-2', name: '버스트 포스',     tier: 'normal' },
      { id: 'cls-last-3', name: '베리언트 폼',     tier: 'normal' },
      { id: 'cls-last-4', name: '마리그난트 소울', tier: 'normal' },
      { id: 'cls-last-5', name: '래피드 포스',     tier: 'normal' },
      { id: 'cls-last-6', name: '웨이스트 오라',   tier: 'cl10' },
    ],
  },
]

// ─── 유틸 ──────────────────────────────────────────────────────────────────

const ACCENT_MAIN = '#5E3A1E'
const SIDEBAR_BG = '#1E1812'

const TIER_CONFIG: Record<SkillTier, { label: string; color: string; bg: string }> = {
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

function RaceStatsTable({ stats, accent }: { stats: RaceStats; accent: string }) {
  const rows: [string, number][] = [
    ['근력', stats.str], ['재주', stats.dex], ['민첩', stats.agi],
    ['지력', stats.int],
    ...(stats.per !== undefined ? [['감지', stats.per] as [string, number]] : []),
    ['정신', stats.spi], ['행운', stats.luk],
  ]
  const cols = rows.length <= 6 ? 3 : 4
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, color: accent, fontWeight: 700, marginBottom: 6, letterSpacing: '0.1em' }}>능력 기본치</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4 }}>
        {rows.map(([label, val]) => (
          <div key={label} style={{
            background: '#0A0806', border: `1px solid ${accent}20`,
            borderRadius: 6, padding: '6px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, color: '#7A6040' }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: val >= 10 ? accent : '#C8C0A8' }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
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

function SkillDetail({ skill, accent, raceStats, onClose }: {
  skill: Skill; accent: string; raceStats?: RaceStats; onClose: () => void
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
      {/* 헤더 */}
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
        {/* 종족 능력 기본치 (종족 스킬에만 표시) */}
        {raceStats && <RaceStatsTable stats={raceStats} accent={accent} />}

        {/* 댓글 목록 */}
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

        {/* 댓글 작성 폼 */}
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
        {/* 브랜딩 */}
        <div style={{ padding: '28px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#7a7060', marginBottom: 6, fontFamily: "'Noto Serif KR', serif" }}>ARIANROD 2E · SKILL WIKI</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#E8E2D4', letterSpacing: '0.04em', lineHeight: 1.4, fontFamily: "'Noto Serif KR', serif" }}>아리안로드<br />스킬 위키</div>
        </div>

        {/* 탭 */}
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

        {/* 카테고리 목록 */}
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

        {/* 하단 링크 */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="/mythology" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9A7A18', textDecoration: 'none', background: 'rgba(154,122,24,0.08)', borderRadius: 6, padding: '7px 10px', marginBottom: 6, border: '1px solid rgba(154,122,24,0.2)' }}>
            <span>✨</span><span style={{ fontWeight: 500 }}>신화 가이드</span>
          </a>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9A7A18', textDecoration: 'none', background: 'rgba(154,122,24,0.08)', borderRadius: 6, padding: '7px 10px', marginBottom: 10, border: '1px solid rgba(154,122,24,0.2)' }}>
            <span>🌍</span><span style={{ fontWeight: 500 }}>월드 섹션</span>
          </a>
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
            raceStats={selectedCat.stats}
            onClose={() => { setSelectedSkillId(null); refreshAggregates() }}
          />
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* 헤더 */}
            <div style={{
              background: `linear-gradient(135deg, ${avgColor(selectedCat.accent, 0.15)} 0%, #06080E 100%)`,
              borderBottom: `3px solid ${selectedCat.accent}30`,
              padding: mob ? '60px 20px 24px' : '32px 36px 28px',
            }}>
              <div style={{ maxWidth: 800 }}>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', color: selectedCat.accent, opacity: 0.7, marginBottom: 6 }}>
                  {tab === 'race' ? '종족 스킬' : '클래스 스킬'}
                </div>
                <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? 22 : 26, fontWeight: 700, color: '#E8E2D4', margin: '0 0 8px', letterSpacing: '0.02em' }}>
                  {selectedCat.name}
                </h1>
                <p style={{ color: '#7A7060', fontSize: 13, lineHeight: 1.8, margin: '0 0 12px' }}>
                  {selectedCat.description}
                </p>
                {selectedCat.stats && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {([
                      ['근력', selectedCat.stats.str], ['재주', selectedCat.stats.dex], ['민첩', selectedCat.stats.agi],
                      ['지력', selectedCat.stats.int],
                      ...(selectedCat.stats.per !== undefined ? [['감지', selectedCat.stats.per]] : []),
                      ['정신', selectedCat.stats.spi], ['행운', selectedCat.stats.luk],
                    ] as [string, number][]).map(([label, val]) => (
                      <span key={label} style={{
                        fontSize: 11, background: '#0A0806', border: `1px solid ${selectedCat.accent}30`,
                        borderRadius: 6, padding: '3px 8px',
                        color: val >= 10 ? selectedCat.accent : '#7A6040',
                        fontWeight: val >= 10 ? 700 : 400,
                      }}>
                        {label} <strong>{val}</strong>
                      </span>
                    ))}
                  </div>
                )}
                {catAvgRating(selectedCat) !== null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Stars value={Math.round(catAvgRating(selectedCat)!)} size={14} />
                    <span style={{ color: '#F0C030', fontWeight: 700 }}>{catAvgRating(selectedCat)!.toFixed(1)}</span>
                    <span style={{ color: '#5A4A30', fontSize: 12 }}>종합 평균</span>
                  </div>
                )}
                <div style={{ width: 36, height: 2, background: selectedCat.accent, borderRadius: 1, marginTop: 10, opacity: 0.6 }} />
              </div>
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
