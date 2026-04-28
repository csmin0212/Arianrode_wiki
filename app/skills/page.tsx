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
  { id: 'eldanan', name: '엘다난', accent: '#5A6A9A', skills: [
    { id: 'eldanan-magic-sensor',      name: '매직 센서',      tier: 'making' },
    { id: 'eldanan-immortality',       name: '이모탈리티',     tier: 'making' },
    { id: 'eldanan-fortitude',         name: '포티튜드',       tier: 'making' },
    { id: 'eldanan-natural-history',   name: '내츄럴 히스토리', tier: 'normal' },
    { id: 'eldanan-magic-mastery',     name: '매직 마스터리',  tier: 'normal' },
    { id: 'eldanan-offensive-sense',   name: '오펜시브 센스',  tier: 'normal' },
    { id: 'eldanan-magic-geyser',      name: '매직 가이저',    tier: 'cl5'    },
    { id: 'eldanan-elder-magic',       name: '엘더 매직',      tier: 'cl5'    },
    { id: 'eldanan-recruit',           name: '리크루트',       tier: 'cl10'   },
  ] },
  { id: 'nevaf', name: '네바프', accent: '#7A6030', skills: [
    { id: 'nevaf-master-hand',    name: '마스터 핸드',  tier: 'making' },
    { id: 'nevaf-adamant',        name: '아다만트',     tier: 'making' },
    { id: 'nevaf-technic-master', name: '테크닉 마스터', tier: 'making' },
    { id: 'nevaf-running-potion', name: '러닝 포션',    tier: 'normal' },
    { id: 'nevaf-axe-master',     name: '액스 마스터',  tier: 'normal' },
    { id: 'nevaf-infravision',    name: '인프라비전',   tier: 'normal' },
    { id: 'nevaf-axe-adept',      name: '액스 어뎁트',  tier: 'cl5'    },
    { id: 'nevaf-anti-magic',     name: '안티 매직',    tier: 'cl5'    },
    { id: 'nevaf-weapon-master',  name: '웨폰 마스터',  tier: 'cl10'   },
  ] },
  { id: 'pilbor', name: '필보르', accent: '#4A8A5A', skills: [
    { id: 'pilbor-nimble',        name: '님블',        tier: 'making' },
    { id: 'pilbor-lucky-star',    name: '러키 스타',   tier: 'making' },
    { id: 'pilbor-magic-resist',  name: '매직 레지스트', tier: 'making' },
    { id: 'pilbor-relax',         name: '릴랙스',      tier: 'normal' },
    { id: 'pilbor-size-custom',   name: '사이즈 커스텀', tier: 'normal' },
    { id: 'pilbor-trickster',     name: '트릭스터',    tier: 'normal' },
    { id: 'pilbor-swifty',        name: '스위프티',    tier: 'cl5'    },
    { id: 'pilbor-self-defense',  name: '셀프 디펜스', tier: 'cl5'    },
    { id: 'pilbor-stealth-pace',  name: '스텔스 페이스', tier: 'cl10'  },
  ] },
  { id: 'verna', name: '버나', accent: '#4A88CA', skills: [
    { id: 'verna-rang',        name: '버나 : 랑족',  tier: 'making' },
    { id: 'verna-myo',         name: '버나 : 묘족',  tier: 'making' },
    { id: 'verna-to',          name: '버나 : 토족',  tier: 'making' },
    { id: 'verna-wild-sense',  name: '와일드 센스',  tier: 'normal' },
    { id: 'verna-judgment',    name: '저지먼트',     tier: 'normal' },
    { id: 'verna-hunting-eye', name: '헌팅 아이',   tier: 'normal' },
    { id: 'verna-rapidity',    name: '래피디티',    tier: 'cl5'    },
    { id: 'verna-sprinter',    name: '스프린터',    tier: 'cl5'    },
    { id: 'verna-hunter-shot', name: '헌터 샷',     tier: 'cl10'   },
  ] },
  { id: 'duang', name: '두앙', accent: '#7A6A8A', skills: [
    { id: 'duang-ajo',          name: '두앙 : 아조족', tier: 'making' },
    { id: 'duang-yugak',        name: '두앙 : 유각족', tier: 'making' },
    { id: 'duang-cheonik',      name: '두앙 : 천익족', tier: 'making' },
    { id: 'duang-steadfast',    name: '스테드패스트',  tier: 'normal' },
    { id: 'duang-strong',       name: '스트롱',       tier: 'normal' },
    { id: 'duang-fury',         name: '퓨리',         tier: 'normal' },
    { id: 'duang-ascetic',      name: '어세틱',       tier: 'cl5'    },
    { id: 'duang-hard-mind',    name: '하드 마인드',  tier: 'cl5'    },
    { id: 'duang-muscle-wall',  name: '머슬 월',      tier: 'cl10'   },
  ] },
  { id: 'eosheon', name: '어션', accent: '#686868', skills: [
    { id: 'eosheon-sago',         name: '어션 : 사고',  tier: 'making' },
    { id: 'eosheon-sohwan',       name: '어션 : 소환',  tier: 'making' },
    { id: 'eosheon-jeongsaeng',   name: '어션 : 전생',  tier: 'making' },
    { id: 'eosheon-risen-out',    name: '리즌 아웃',    tier: 'normal' },
    { id: 'eosheon-optimize',     name: '옵티마이즈',   tier: 'normal' },
    { id: 'eosheon-inspiration',  name: '인스피레이션', tier: 'normal' },
    { id: 'eosheon-price-down',   name: '프라이스 다운', tier: 'cl5'   },
    { id: 'eosheon-destiny-jean', name: '데스티니 진',  tier: 'cl5'    },
    { id: 'eosheon-reversal-act', name: '리버설액트',   tier: 'cl10'   },
  ] },
  { id: 'sahagin', name: '사하긴', accent: '#2A7A9A', skills: [
    { id: 'sahagin-sea-fighter',    name: '시 파이터',    tier: 'making'  },
    { id: 'sahagin-land-scale',     name: '랜드 스케일',  tier: 'making'  },
    { id: 'sahagin-aqua-assist',    name: '아쿠아 어시스트', tier: 'normal' },
    { id: 'sahagin-aqua-smash',     name: '아쿠아 스매시', tier: 'normal' },
    { id: 'sahagin-aqua-magic',     name: '아쿠아 매직',  tier: 'normal'  },
    { id: 'sahagin-swimming-rush',  name: '스위밍 러시',  tier: 'normal'  },
    { id: 'sahagin-aqua-killer',    name: '아쿠아 킬러',  tier: 'cl5'     },
    { id: 'sahagin-aqua-burst',     name: '아쿠아 버스트', tier: 'cl5'    },
    { id: 'sahagin-style',          name: '사하긴 스타일', tier: 'cl10'   },
    { id: 'sahagin-amphibious',     name: '수륙양용',     tier: 'special' },
  ] },
  { id: 'nephilim', name: '네필림', accent: '#8A5535', skills: [
    { id: 'nephilim-giant-growth',   name: '자이언트 그로스',  tier: 'making'  },
    { id: 'nephilim-giant-size',     name: '초대형',           tier: 'special' },
    { id: 'nephilim-awake-break',    name: '어웨이크 브레이크', tier: 'normal' },
    { id: 'nephilim-giant-muscle',   name: '자이언트 머슬',    tier: 'normal'  },
    { id: 'nephilim-storm-seeker',   name: '스톰 시커',        tier: 'normal'  },
    { id: 'nephilim-tradition',      name: '트레디션',         tier: 'normal'  },
    { id: 'nephilim-long-arm',       name: '롱 암',            tier: 'normal'  },
    { id: 'nephilim-ancient-magic',  name: '에이션트 매직',    tier: 'cl5'     },
    { id: 'nephilim-giant-force',    name: '자이언트 포스',    tier: 'cl5'     },
    { id: 'nephilim-giant-cover',    name: '자이언트 커버',    tier: 'cl10'    },
  ] },
  { id: 'diva', name: '디바', accent: '#A0A025', skills: [
    { id: 'diva-elder',        name: '디바 : 엘더',   tier: 'making' },
    { id: 'diva-demi-god',     name: '디바 : 데미 갓', tier: 'making' },
    { id: 'diva-hero',         name: '디바 : 히어로', tier: 'making' },
    { id: 'diva-omniscience',  name: '옴니사이언스',  tier: 'normal' },
    { id: 'diva-god-hand',     name: '갓 핸드',       tier: 'normal' },
    { id: 'diva-god-heal',     name: '갓 힐',         tier: 'normal' },
    { id: 'diva-advent',       name: '어드벤트',      tier: 'cl5'    },
    { id: 'diva-god-force',    name: '갓 포스',       tier: 'cl5'    },
    { id: 'diva-wonder-work',  name: '원더 위크',     tier: 'cl10'   },
  ] },
  { id: 'lemures', name: '레무레스', accent: '#5A3A80', skills: [
    { id: 'lemures-astral-body',     name: '아스트랄 보디',   tier: 'making' },
    { id: 'lemures-elemental-body',  name: '엘리멘탈 보디',   tier: 'making' },
    { id: 'lemures-reincarnation',   name: '리인카네이션',    tier: 'making' },
    { id: 'lemures-astral-sense',    name: '아스트랄 센스',   tier: 'normal' },
    { id: 'lemures-ghost-trick',     name: '고스트 트릭',     tier: 'normal' },
    { id: 'lemures-flying-soul',     name: '플라잉 소울',     tier: 'normal' },
    { id: 'lemures-fade-out',        name: '페이드 아웃',     tier: 'cl5'    },
    { id: 'lemures-soul-hit',        name: '소울 히트',       tier: 'cl5'    },
    { id: 'lemures-permeation',      name: '퍼미에이션',      tier: 'cl10'   },
  ] },
  { id: 'ex-machina', name: '엑스 마키나', accent: '#5A7A8A', skills: [
    { id: 'exm-soul-install',     name: '소울 인스톨',      tier: 'making' },
    { id: 'exm-tuning',           name: '튜닝',             tier: 'making' },
    { id: 'exm-rampart',          name: '램파트',           tier: 'making' },
    { id: 'exm-acceleration',     name: '엑셀러레이션',     tier: 'normal' },
    { id: 'exm-amplifier',        name: '앰플리파이어',     tier: 'normal' },
    { id: 'exm-defibrillator',    name: '디피브릴레이터',   tier: 'normal' },
    { id: 'exm-update',           name: '업데이트',         tier: 'cl5'    },
    { id: 'exm-battery-backup',   name: '배터리 백업',      tier: 'cl5'    },
    { id: 'exm-ringmail-coating', name: '링메일 코팅',      tier: 'cl10'   },
  ] },
  { id: 'dragonet', name: '드라고넷', accent: '#A05525', skills: [
    { id: 'dragonet-anslok',       name: '드라고넷 : 안슬록', tier: 'making' },
    { id: 'dragonet-medion',       name: '드라고넷 : 메디온', tier: 'making' },
    { id: 'dragonet-repatal',      name: '드라고넷 : 레파탈', tier: 'making' },
    { id: 'dragonet-dragon-arm',   name: '드래곤 암',         tier: 'normal' },
    { id: 'dragonet-peculiar',     name: '페큐리어 스피릿',   tier: 'normal' },
    { id: 'dragonet-hovering',     name: '호버링',            tier: 'normal' },
    { id: 'dragonet-absolute',     name: '드래곤 앱솔루트',   tier: 'cl5'    },
    { id: 'dragonet-sky',          name: '드래곤 스카이',     tier: 'cl5'    },
    { id: 'dragonet-anger',        name: '드래곤 앵거',       tier: 'cl10'   },
  ] },
  { id: 'alcard', name: '알카드', accent: '#6A2A6A', skills: [
    { id: 'alcard-dark-fang',      name: '암흑의 엄니',     tier: 'making' },
    { id: 'alcard-night-walker',   name: '나이트 워커',     tier: 'making' },
    { id: 'alcard-mystery-blood',  name: '미스터리블러드',  tier: 'making' },
    { id: 'alcard-dark-master',    name: '다크마스터',      tier: 'normal' },
    { id: 'alcard-night-blade',    name: '나이트 블레이드', tier: 'normal' },
    { id: 'alcard-life-drain',     name: '라이프 드레인',   tier: 'normal' },
    { id: 'alcard-eternal-shadow', name: '이터널 새도우',   tier: 'cl5'    },
    { id: 'alcard-blood-fire',     name: '블러드 파이어',   tier: 'cl5'    },
    { id: 'alcard-crimson-mist',   name: '크림슨 미스트',   tier: 'cl10'   },
  ] },
  { id: 'homgoblin', name: '홈고블린', accent: '#3A6A3A', skills: [
    { id: 'hom-earth-child',    name: '어스차일드',        tier: 'making' },
    { id: 'hom-diologist',      name: '디올로지스트',      tier: 'making' },
    { id: 'hom-nature-support', name: '네이처서포트',      tier: 'making' },
    { id: 'hom-earth-dance',    name: '어스 댄스',         tier: 'normal' },
    { id: 'hom-earth-magic',    name: '어스 매직',         tier: 'normal' },
    { id: 'hom-field-keeper',   name: '필드 키퍼',         tier: 'normal' },
    { id: 'hom-earth-spot',     name: '어스 스폿',         tier: 'cl5'    },
    { id: 'hom-speed-charge',   name: '스피드 차지',       tier: 'cl5'    },
    { id: 'hom-earth-heal',     name: '어스 힐',           tier: 'cl10'   },
  ] },
  { id: 'hokaspokas', name: '호카스포카스', accent: '#6A5A8A', skills: [
    { id: 'hok-intelligent',   name: '인텔리전트',          tier: 'making' },
    { id: 'hok-magic-strat',   name: '매직 스트래티지',     tier: 'making' },
    { id: 'hok-mucus-skin',    name: '뮤커스 스킨',         tier: 'making' },
    { id: 'hok-incentive',     name: '인센시티브',          tier: 'normal' },
    { id: 'hok-situation',     name: '시튜에이션 애널라이즈', tier: 'normal' },
    { id: 'hok-snap-arm',      name: '스냅 암',             tier: 'normal' },
    { id: 'hok-suggestion',    name: '서제스천',            tier: 'cl5'    },
    { id: 'hok-heavy-magic',   name: '헤비 매직',           tier: 'cl5'    },
    { id: 'hok-magic-ref',     name: '매직 레퍼런스',       tier: 'cl10'   },
  ] },
  { id: 'jelbor', name: '젤보어', accent: '#8A7A30', skills: [
    { id: 'jel-craft-hand',      name: '크래프트 핸드',   tier: 'making' },
    { id: 'jel-deft-finger',     name: '데프트핑거',      tier: 'making' },
    { id: 'jel-treasure-search', name: '트레져 서치',     tier: 'making' },
    { id: 'jel-merchant-sense',  name: '머첸트 센스',     tier: 'normal' },
    { id: 'jel-master-storage',  name: '마스터 스토리지', tier: 'normal' },
    { id: 'jel-running-beat',    name: '러닝 비트',       tier: 'normal' },
    { id: 'jel-tear-off',        name: '티어오프',        tier: 'cl5'    },
    { id: 'jel-fast-step',       name: '패스트 스탭',     tier: 'cl5'    },
    { id: 'jel-master-artist',   name: '마스터 아티스트', tier: 'cl10'   },
  ] },
  { id: 'doomguard', name: '둠가드', accent: '#6A3020', skills: [
    { id: 'doom-fighting-spirit', name: '파이팅 스피릿',  tier: 'making' },
    { id: 'doom-practice',        name: '프랙티스',       tier: 'making' },
    { id: 'doom-muscle-veil',     name: '머슬 베일',      tier: 'making' },
    { id: 'doom-stand-alone',     name: '스탠드 얼론',    tier: 'normal' },
    { id: 'doom-tough-body',      name: '터프 바디',      tier: 'normal' },
    { id: 'doom-battle-blessing', name: '배틀 블레싱',    tier: 'normal' },
    { id: 'doom-fist-adept',      name: '피스트 어뎁트',  tier: 'cl5'    },
    { id: 'doom-smash-blast',     name: '스매스 블라스트', tier: 'cl5'   },
    { id: 'doom-body-soul',       name: '바디 소울',      tier: 'cl10'   },
  ] },
  { id: 'fey', name: '페이', accent: '#8A4A9A', skills: [
    { id: 'fey-valkyrie',   name: '페이 : 발키리',   tier: 'making' },
    { id: 'fey-gremlin',    name: '페이 : 그렘린',   tier: 'making' },
    { id: 'fey-sprite',     name: '페이 : 스프라이트', tier: 'making' },
    { id: 'fey-spriggan',   name: '페이 : 스프리건', tier: 'making' },
    { id: 'fey-dinasi',     name: '페이 : 디나시',   tier: 'making' },
    { id: 'fey-nightmare',  name: '페이 : 나이트메어', tier: 'making' },
    { id: 'fey-nixie',      name: '페이 : 닉시',     tier: 'making' },
    { id: 'fey-knocker',    name: '페이 : 노커',     tier: 'making' },
    { id: 'fey-fairy',      name: '페이 : 페어리',   tier: 'making' },
    { id: 'fey-pixie',      name: '페이 : 픽시',     tier: 'making' },
    { id: 'fey-lanansi',    name: '페이 : 라난시',   tier: 'making' },
    { id: 'fey-leprechaun', name: '페이 : 레프라콘', tier: 'making' },
    { id: 'fey-tiny-weapon', name: '타이니 웨폰',    tier: 'normal' },
    { id: 'fey-tales-symbol', name: '테일즈 심볼',   tier: 'normal' },
    { id: 'fey-hideaway',   name: '하이드어웨이',    tier: 'normal' },
    { id: 'fey-boost-trick', name: '부스트 트릭',    tier: 'cl5'    },
    { id: 'fey-force-guard', name: '포스 가드',      tier: 'cl5'    },
    { id: 'fey-retry-act',  name: '리트라이 액트',   tier: 'cl10'   },
  ] },
  { id: 'glaiaei', name: '글라이아이', accent: '#7A50A0', skills: [
    { id: 'gla-iron-hand',        name: '글라이아이 : 아이언 핸드',     tier: 'making' },
    { id: 'gla-assault-skin',     name: '글라이아이 : 어설트 스킨',     tier: 'making' },
    { id: 'gla-amabenetrait',     name: '글라이아이 : 아마베네트라이트', tier: 'making' },
    { id: 'gla-invisible-hand',   name: '글라이아이 : 인비지블 핸드',   tier: 'making' },
    { id: 'gla-void-slash',       name: '글라이아이 : 보이드 슬래시',   tier: 'making' },
    { id: 'gla-water-stance',     name: '글라이아이 : 워터 스텐스',     tier: 'making' },
    { id: 'gla-guard-arm',        name: '글라이아이 : 가드 암',         tier: 'making' },
    { id: 'gla-shot-eye',         name: '글라이아이 : 샷 아이',         tier: 'making' },
    { id: 'gla-stretch-arm',      name: '글라이아이 : 스트레치암',      tier: 'making' },
    { id: 'gla-storm-foot',       name: '글라이아이 : 스톰풋',          tier: 'making' },
    { id: 'gla-spite-eye',        name: '글라이아이 : 스파이트 아이',   tier: 'making' },
    { id: 'gla-dimension-blow',   name: '글라이아이 : 디멘전 블로우',   tier: 'making' },
    { id: 'gla-dead-hair',        name: '글라이아이 : 데드헤어',        tier: 'making' },
    { id: 'gla-fake-face',        name: '글라이아이 : 페이크 페이스',   tier: 'making' },
    { id: 'gla-poison-liquid',    name: '글라이아이 : 포이즌 리퀴드',   tier: 'making' },
    { id: 'gla-majestic-hair',    name: '글라이아이 : 마제스틱 헤어',   tier: 'making' },
    { id: 'gla-magic-eye',        name: '글라이아이 : 매직 아이',       tier: 'making' },
    { id: 'gla-mirage-eye',       name: '글라이아이 : 미라지 아이',     tier: 'making' },
    { id: 'gla-rust-mist',        name: '글라이아이 : 루스트 미스트',   tier: 'making' },
    { id: 'gla-amphibious',       name: '수륙양용',                     tier: 'special' },
    { id: 'gla-aura-skin',        name: '오라 스킨',                    tier: 'cl5'    },
    { id: 'gla-dual-face',        name: '듀얼 페이스',                  tier: 'cl5'    },
  ] },
]

const CLASSES: Category[] = [
  { id: 'class-placeholder', name: '(클래스명 미확인)', accent: '#8D6E63', skills: [
    { id: 'cls-exect-hand',       name: '이그젝트핸드',    tier: 'normal' },
    { id: 'cls-burst-force',      name: '버스트 포스',     tier: 'normal' },
    { id: 'cls-variant-form',     name: '베리언트 폼',     tier: 'normal' },
    { id: 'cls-malignant-soul',   name: '마리그난트 소울', tier: 'normal' },
    { id: 'cls-rapid-force',      name: '래피드 포스',     tier: 'normal' },
    { id: 'cls-waste-aura',       name: '웨이스트 오라',   tier: 'cl10'   },
  ] },
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
        borderRadius: 10, padding: '16px 18px',
        textAlign: 'left', cursor: 'pointer',
        transition: 'all 0.15s', width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: '#F0E0C0', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {skill.name}
          </div>
          <TierBadge tier={skill.tier} />
        </div>
        {aggregate && aggregate.count > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
            <Stars value={Math.round(aggregate.avgRating)} size={13} />
            <span style={{ fontSize: 11, color: '#A09070' }}>{aggregate.avgRating.toFixed(1)} ({aggregate.count})</span>
          </div>
        ) : (
          <span style={{ fontSize: 11, color: '#5A4A30', flexShrink: 0 }}>미평가</span>
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
            <div style={{ padding: mob ? '20px 16px 60px' : '28px 40px 60px', maxWidth: 1200 }}>
              {selectedCat.skills.length === 0 ? (
                <div style={{ color: '#5A4A30', fontSize: 13, padding: '20px 0' }}>
                  스킬 데이터 준비 중입니다.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
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
