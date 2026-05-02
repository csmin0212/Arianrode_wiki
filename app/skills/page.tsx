'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── 타입 ──────────────────────────────────────────────────────────────────

type SkillTier = 'making' | 'normal' | 'cl5' | 'cl10' | 'special' | 'eosheon'

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
  { id: 'bestia', name: '베스티아', accent: '#7A6A3A', skills: [
    { id: 'bes-aquila',       name: '베스티아 : 아쿠이라',   tier: 'making'  },
    { id: 'bes-aquarius',     name: '베스티아 : 아쿠아리에스', tier: 'making' },
    { id: 'bes-urza',         name: '베스티아 : 우르자',     tier: 'making'  },
    { id: 'bes-equus',        name: '베스티아 : 에쿠우스',   tier: 'making'  },
    { id: 'bes-canis',        name: '베스티아 : 카니스',     tier: 'making'  },
    { id: 'bes-cancer',       name: '베스티아 : 캔서',       tier: 'making'  },
    { id: 'bes-cryptid',      name: '베스티아 : 크립티드',   tier: 'making'  },
    { id: 'bes-scarabe',      name: '베스티아 : 스카라베',   tier: 'making'  },
    { id: 'bes-scorpio',      name: '베스티아 : 스코피오',   tier: 'making'  },
    { id: 'bes-dinosaur',     name: '베스티아 : 다이나소어', tier: 'making'  },
    { id: 'bes-bat',          name: '베스티아 : 배트',       tier: 'making'  },
    { id: 'bes-papillon',     name: '베스티아 : 파피용',     tier: 'making'  },
    { id: 'bes-pavou',        name: '베스티아 : 파보우',     tier: 'making'  },
    { id: 'bes-beetle',       name: '베스티아 : 비틀',       tier: 'making'  },
    { id: 'bes-hedgehog',     name: '베스티아 : 헤지호그',   tier: 'making'  },
    { id: 'bes-pochid',       name: '베스티아 : 포치드',     tier: 'making'  },
    { id: 'bes-rakelter',     name: '베스티아 : 라켈터',     tier: 'making'  },
    { id: 'bes-leo',          name: '베스티아 : 리오',       tier: 'making'  },
    { id: 'bes-liquid',       name: '베스티아 : 리퀴드',     tier: 'making'  },
    { id: 'bes-reps',         name: '베스티아 : 레프스',     tier: 'making'  },
    { id: 'bes-flight',       name: '비행 능력',             tier: 'special' },
    { id: 'bes-amphibious',   name: '수륙양용',              tier: 'special' },
    { id: 'bes-암시',         name: '암시',                  tier: 'special' },
    { id: 'bes-sub-species',  name: '서브 스피시즈',         tier: 'normal'  },
    { id: 'bes-scale-skin',   name: '스케일 스킨',           tier: 'normal'  },
    { id: 'bes-dodge-shift',  name: '닷지 시프트',           tier: 'normal'  },
    { id: 'bes-animal-hand',  name: '애니멀핸드',            tier: 'cl5'     },
    { id: 'bes-beast-grow',   name: '비스트 그로우',         tier: 'cl5'     },
    { id: 'bes-humanize',     name: '휴머나이즈',            tier: 'cl5'     },
    { id: 'bes-gate-shift',   name: '게이트 시프트',         tier: 'cl10'    },
  ] },
]

const CLASSES: Category[] = [
  { id: 'warrior', name: '워리어', accent: '#C0503A', skills: [
    { id: 'war-bash',             name: '배시',            tier: 'normal' },
    { id: 'war-defender',         name: '디펜더',          tier: 'normal' },
    { id: 'war-recovery',         name: '리커버리',        tier: 'normal' },
    { id: 'war-berserk',          name: '버서크',          tier: 'normal' },
    { id: 'war-vortex-attack',    name: '볼텍스 어택',     tier: 'normal' },
    { id: 'war-brandish',         name: '브랜디시',        tier: 'normal' },
    { id: 'war-beat-down',        name: '비트 다운',       tier: 'normal' },
    { id: 'war-save-attack',      name: '세이브 어택',     tier: 'normal' },
    { id: 'war-smash',            name: '스매시',          tier: 'normal' },
    { id: 'war-slash-blow',       name: '슬래시 블로',     tier: 'normal' },
    { id: 'war-shield-strike',    name: '실드 스트라이크', tier: 'normal' },
    { id: 'war-shield-slam',      name: '실드 슬램',       tier: 'normal' },
    { id: 'war-shield-parry',     name: '실드 패리',       tier: 'normal' },
    { id: 'war-iron-clad',        name: '아이언 클래드',   tier: 'normal' },
    { id: 'war-arms-range',       name: '암즈 레인지',     tier: 'normal' },
    { id: 'war-arms-mastery',     name: '암즈 마스터리',   tier: 'normal' },
    { id: 'war-autoguard',        name: '오토가드',        tier: 'normal' },
    { id: 'war-weapon-guard',     name: '웨폰 가드',       tier: 'normal' },
    { id: 'war-weapon-roller',    name: '웨폰 롤러',       tier: 'normal' },
    { id: 'war-invisible-attack', name: '인비지블 어택',   tier: 'normal' },
    { id: 'war-covering',         name: '커버링',          tier: 'normal' },
    { id: 'war-cover-move',       name: '커버 무브',       tier: 'normal' },
    { id: 'war-parry',            name: '패리',            tier: 'normal' },
    { id: 'war-pump-up',          name: '펌프 업',         tier: 'normal' },
    { id: 'war-full-defense',     name: '풀 디펜스',       tier: 'normal' },
    { id: 'war-provoke',          name: '프로보크',        tier: 'normal' },
    { id: 'war-rebound-bash',     name: '리바운드 배시',   tier: 'normal' },
    { id: 'war-magic-defender',   name: '매직 디펜더',     tier: 'normal' },
    { id: 'war-violent-attack',   name: '바이올런트 어택', tier: 'normal' },
    { id: 'war-cool-running',     name: '쿨 러닝',         tier: 'normal' },
    { id: 'war-hate-control',     name: '헤이트 컨트롤',   tier: 'eosheon' },
    { id: 'war-bodybuilding',     name: '보디빌딩',        tier: 'eosheon' },
  ] },
  { id: 'acolyte', name: '어콜라이트', accent: '#C8A030', skills: [
    { id: 'acl-protection',       name: '프로텍션',         tier: 'normal'  },
    { id: 'acl-divine-arm',       name: '디바인 암',        tier: 'normal'  },
    { id: 'acl-raise',            name: '레이즈',           tier: 'normal'  },
    { id: 'acl-blessing',         name: '블레싱',           tier: 'normal'  },
    { id: 'acl-glory',            name: '글로리',           tier: 'normal'  },
    { id: 'acl-blink',            name: '블링크',           tier: 'normal'  },
    { id: 'acl-believe',          name: '빌리브',           tier: 'normal'  },
    { id: 'acl-slow',             name: '슬로우',           tier: 'normal'  },
    { id: 'acl-arms-mastery',     name: '암즈 마스터리: 타격', tier: 'normal' },
    { id: 'acl-affection',        name: '어팩션',           tier: 'normal'  },
    { id: 'acl-undead-bane',      name: '언데드 베인',      tier: 'normal'  },
    { id: 'acl-invoke',           name: '인보크',           tier: 'normal'  },
    { id: 'acl-quick-heal',       name: '퀵 힐',            tier: 'normal'  },
    { id: 'acl-cure',             name: '큐어',             tier: 'normal'  },
    { id: 'acl-crucifixion',      name: '크루시픽션',       tier: 'normal'  },
    { id: 'acl-teleport',         name: '텔레포트',         tier: 'normal'  },
    { id: 'acl-favored',          name: '페이버드',         tier: 'normal'  },
    { id: 'acl-purify',           name: '퓨리파이',         tier: 'normal'  },
    { id: 'acl-hammer-strike',    name: '해머 스트라이크',  tier: 'normal'  },
    { id: 'acl-hammer-pose',      name: '해머 포지',        tier: 'normal'  },
    { id: 'acl-haste',            name: '헤이스트',         tier: 'normal'  },
    { id: 'acl-holy-guard',       name: '홀리 가드',        tier: 'normal'  },
    { id: 'acl-holy-light',       name: '홀리 라이트',      tier: 'normal'  },
    { id: 'acl-holy-armor',       name: '홀리 아머',        tier: 'normal'  },
    { id: 'acl-holy-word',        name: '홀리 워드',        tier: 'normal'  },
    { id: 'acl-holy-weapon',      name: '홀리 웨폰',        tier: 'normal'  },
    { id: 'acl-heal',             name: '힐',               tier: 'normal'  },
    { id: 'acl-mind-absorb',      name: '마인드 업소브',    tier: 'normal'  },
    { id: 'acl-magnificat',       name: '매니피카트',       tier: 'normal'  },
    { id: 'acl-holy-glaze',       name: '홀리 글레이즈',    tier: 'normal'  },
    { id: 'acl-prayer-word',      name: '플레이어 워드',    tier: 'eosheon' },
    { id: 'acl-medic',            name: '메딕',             tier: 'eosheon' },
  ] },
  { id: 'mage', name: '메이지', accent: '#5A6ABE', skills: [
    { id: 'mag-magicians-might',  name: '매지션즈 마이트',    tier: 'normal' },
    { id: 'mag-detox',            name: '디톡스',             tier: 'normal' },
    { id: 'mag-resentment',       name: '리젠트먼트',         tier: 'normal' },
    { id: 'mag-magic-lock',       name: '매직 락',            tier: 'normal' },
    { id: 'mag-magic-blast',      name: '매직 블래스트',      tier: 'normal' },
    { id: 'mag-magic-coat',       name: '매직 코트',          tier: 'normal' },
    { id: 'mag-magic-forge',      name: '매직 포지',          tier: 'normal' },
    { id: 'mag-material-comp',    name: '매터리얼 컴포넌트',  tier: 'normal' },
    { id: 'mag-boost-magic',      name: '부스트 매직',        tier: 'normal' },
    { id: 'mag-stoneskin',        name: '스톤스킨',           tier: 'normal' },
    { id: 'mag-earth-bullet',     name: '어스 불릿',          tier: 'normal' },
    { id: 'mag-earth-breaker',    name: '어스 브레이커',      tier: 'normal' },
    { id: 'mag-aerial-saber',     name: '에어리얼 세이버',    tier: 'normal' },
    { id: 'mag-aerial-slash',     name: '에어리얼 슬래시',    tier: 'normal' },
    { id: 'mag-water-master',     name: '워터 마스터',        tier: 'normal' },
    { id: 'mag-water-spear',      name: '워터 스피어',        tier: 'normal' },
    { id: 'mag-water-shield',     name: '워터 실드',          tier: 'normal' },
    { id: 'mag-wind-barrier',     name: '윈드 배리어',        tier: 'normal' },
    { id: 'mag-eruption',         name: '이럽션',             tier: 'normal' },
    { id: 'mag-expert',           name: '익스퍼트',           tier: 'normal' },
    { id: 'mag-enchant-weapon',   name: '인첸트 웨폰',        tier: 'normal' },
    { id: 'mag-concentration',    name: '컨센트레이션',       tier: 'normal' },
    { id: 'mag-fire-lord',        name: '파이어 로드',        tier: 'normal' },
    { id: 'mag-fire-bolt',        name: '파이어 볼트',        tier: 'normal' },
    { id: 'mag-flight',           name: '플라이트',           tier: 'normal' },
    { id: 'mag-physical-enchant', name: '피지컬 인첸트',      tier: 'normal' },
    { id: 'mag-dao-grasp',        name: '다오 그래스프',      tier: 'normal' },
    { id: 'mag-djinn-breeze',     name: '디지니 브리즈',      tier: 'normal' },
    { id: 'mag-marid-stroll',     name: '마리드 스트롤',      tier: 'normal' },
    { id: 'mag-ifrit-shimmer',    name: '이프리트 시머',      tier: 'normal' },
    { id: 'mag-technology',       name: '테크놀리지',         tier: 'eosheon' },
    { id: 'mag-metamorphose',     name: '메타모르포제',       tier: 'eosheon' },
  ] },
  { id: 'thief', name: '시프', accent: '#4A7A6A', skills: [
    { id: 'thf-wide-attack',       name: '와이드 어택',        tier: 'normal' },
    { id: 'thf-knife-parry',       name: '나이프 패리',        tier: 'normal' },
    { id: 'thf-dodge-move',        name: '닷지 무브',          tier: 'normal' },
    { id: 'thf-dissect-edge',      name: '디섹트 에지',        tier: 'normal' },
    { id: 'thf-run-up',            name: '런업',               tier: 'normal' },
    { id: 'thf-butterfly-dance',   name: '버터플라이 댄스',    tier: 'normal' },
    { id: 'thf-bee-sting',         name: '비 스팅',            tier: 'normal' },
    { id: 'thf-sidewinder',        name: '사이드와인더',       tier: 'normal' },
    { id: 'thf-shadow-blade',      name: '새도 블레이드',      tier: 'normal' },
    { id: 'thf-shadow-stalk',      name: '새도 스토크',        tier: 'normal' },
    { id: 'thf-surprisal',         name: '서프라이절',         tier: 'normal' },
    { id: 'thf-swing-dagger',      name: '스윙 대거',          tier: 'normal' },
    { id: 'thf-strike-throw',      name: '스트라이크 스로',    tier: 'normal' },
    { id: 'thf-steal',             name: '스틸',               tier: 'normal' },
    { id: 'thf-specialize',        name: '스페셜라이즈',       tier: 'normal' },
    { id: 'thf-arms-mastery',      name: '암즈 마스터리',      tier: 'normal' },
    { id: 'thf-ambidexterity',     name: '앰비덱스터러티',     tier: 'normal' },
    { id: 'thf-evasion',           name: '이베이전',           tier: 'normal' },
    { id: 'thf-envenom',           name: '인베놈',             tier: 'normal' },
    { id: 'thf-entangle',          name: '인탱글',             tier: 'normal' },
    { id: 'thf-interrupt',         name: '인터럽트',           tier: 'normal' },
    { id: 'thf-just-defense',      name: '저스트 디펜스',      tier: 'normal' },
    { id: 'thf-cutting-edge',      name: '커팅 에지',          tier: 'normal' },
    { id: 'thf-taunt',             name: '타운트',             tier: 'normal' },
    { id: 'thf-feint',             name: '페인트',             tier: 'normal' },
    { id: 'thf-full-speed',        name: '풀 스피드',          tier: 'normal' },
    { id: 'thf-piercing-strike',   name: '피어싱 스트라이크',  tier: 'normal' },
    { id: 'thf-sudden-impact',     name: '서든 임팩트',        tier: 'normal' },
    { id: 'thf-wide-storm',        name: '와이드 스톰',        tier: 'normal' },
    { id: 'thf-weapon-focus',      name: '웨폰 포커스',        tier: 'normal' },
    { id: 'thf-cracker',           name: '크래커',             tier: 'eosheon' },
    { id: 'thf-look-out',          name: '룩 아웃',            tier: 'eosheon' },
  ] },
  { id: 'alchemist', name: '알케미스트', accent: '#C87A30', skills: [
    { id: 'alc-gunsmith',          name: '건스미스',            tier: 'normal' },
    { id: 'alc-grenade-direct',    name: '그레네이드: 다이렉트', tier: 'normal' },
    { id: 'alc-grenade-micro',     name: '그레네이드: 마이크로', tier: 'normal' },
    { id: 'alc-grenade-material',  name: '그레네이드: 매터리얼', tier: 'normal' },
    { id: 'alc-grenade-burst',     name: '그레네이드: 버스트',  tier: 'normal' },
    { id: 'alc-grenade-stun',      name: '그레네이드: 스턴',    tier: 'normal' },
    { id: 'alc-grenade-poison',    name: '그레네이드: 포이즌',  tier: 'normal' },
    { id: 'alc-lapis',             name: '라피스 필로소포름',   tier: 'normal' },
    { id: 'alc-magnification',     name: '매그니피케이션',      tier: 'normal' },
    { id: 'alc-synthesization',    name: '신시사이제이션',      tier: 'normal' },
    { id: 'alc-armor-forge',       name: '아머 포지',           tier: 'normal' },
    { id: 'alc-alchemical-circle', name: '알케미컬 서클',       tier: 'normal' },
    { id: 'alc-arms-mastery',      name: '암즈 마스터리',       tier: 'normal' },
    { id: 'alc-alt-weapon',        name: '얼터너티브 웨폰',     tier: 'normal' },
    { id: 'alc-elixir',            name: '엘릭서',              tier: 'normal' },
    { id: 'alc-option-parts',      name: '옵션 파츠',           tier: 'normal' },
    { id: 'alc-weapon-create',     name: '웨폰 크리에이트',     tier: 'normal' },
    { id: 'alc-weapon-forge',      name: '웨폰 포지',           tier: 'normal' },
    { id: 'alc-conv-rifle',        name: '컨버전: 라이플',      tier: 'normal' },
    { id: 'alc-conv-railgun',      name: '컨버전: 레일건',      tier: 'normal' },
    { id: 'alc-conv-blaster',      name: '컨버전: 블래스터',    tier: 'normal' },
    { id: 'alc-conv-shotgun',      name: '컨버전: 샷건',        tier: 'normal' },
    { id: 'alc-toxicology',        name: '톡시콜로지',          tier: 'normal' },
    { id: 'alc-final-strike',      name: '파이널 스트라이크',   tier: 'normal' },
    { id: 'alc-potion-pitch',      name: '포션 피치',           tier: 'normal' },
    { id: 'alc-hand-grenade',      name: '핸드 그레네이드',     tier: 'normal' },
    { id: 'alc-grenadier',         name: '그레네디어',          tier: 'normal' },
    { id: 'alc-complex',           name: '컴플렉스',            tier: 'normal' },
    { id: 'alc-quick-create',      name: '퀵 크리에이트',       tier: 'normal' },
    { id: 'alc-quick-forge',       name: '퀵 포지',             tier: 'normal' },
    { id: 'alc-conv-modern',       name: '컨버전: 모던',        tier: 'eosheon' },
    { id: 'alc-science',           name: '사이언스',            tier: 'eosheon' },
  ] },
  { id: 'illusionist', name: '일루저니스트', accent: '#8A4AAA', skills: [
    { id: 'ill-death-image',       name: '데스 이미지',         tier: 'normal' },
    { id: 'ill-disturb-image',     name: '디스터브 이미지',     tier: 'normal' },
    { id: 'ill-decoy-image',       name: '디코이 이미지',       tier: 'normal' },
    { id: 'ill-labyrinth-image',   name: '라비린스 이미지',     tier: 'normal' },
    { id: 'ill-mind-break',        name: '마인드 브레이크',     tier: 'normal' },
    { id: 'ill-mass-illusion',     name: '매스 일루전',         tier: 'normal' },
    { id: 'ill-mirage-guide',      name: '미라지 가이드',       tier: 'normal' },
    { id: 'ill-mirage-bind',       name: '미라지 바인드',       tier: 'normal' },
    { id: 'ill-mirage-edge',       name: '미라지 에지',         tier: 'normal' },
    { id: 'ill-mirage-cape',       name: '미라지 케이프',       tier: 'normal' },
    { id: 'ill-bad-image',         name: '배드 이미지',         tier: 'normal' },
    { id: 'ill-image-magic',       name: '이미지 매직',         tier: 'normal' },
    { id: 'ill-image-beast',       name: '이미지 비스트',       tier: 'normal' },
    { id: 'ill-image-weapon',      name: '이미지 웨폰',         tier: 'normal' },
    { id: 'ill-image-chain',       name: '이미지 체인',         tier: 'normal' },
    { id: 'ill-inevitable-image',  name: '인에비터블 이미지',   tier: 'normal' },
    { id: 'ill-illusion-master',   name: '일루전 마스터',       tier: 'normal' },
    { id: 'ill-camouflage-curtain',name: '카모플라쥬 커튼',     tier: 'normal' },
    { id: 'ill-confuse-image',     name: '컨퓨즈 이미지',      tier: 'normal' },
    { id: 'ill-create-field',      name: '크리에이트 필드',     tier: 'normal' },
    { id: 'ill-clear-image',       name: '클리어 이미지',       tier: 'normal' },
    { id: 'ill-final-illusion',    name: '파이널 일루전',       tier: 'normal' },
    { id: 'ill-phantom-pain',      name: '팬텀 페인',           tier: 'normal' },
    { id: 'ill-poison-image',      name: '포이즌 이미지',       tier: 'normal' },
    { id: 'ill-practice-mind',     name: '프랙티스 마인드',     tier: 'normal' },
    { id: 'ill-finish-image',      name: '피니시 이미지',       tier: 'normal' },
    { id: 'ill-fear-image',        name: '피어 이미지',         tier: 'normal' },
    { id: 'ill-disturb-abyss',     name: '디스터브 어비스',     tier: 'normal' },
    { id: 'ill-realistic-image',   name: '리얼리스틱 이미지',   tier: 'normal' },
    { id: 'ill-trick-image',       name: '트릭 이미지',         tier: 'normal' },
    { id: 'ill-trick-magic',       name: '트릭 매직',           tier: 'eosheon' },
    { id: 'ill-mentalist',         name: '멘탈리스트',          tier: 'eosheon' },
  ] },
  { id: 'gunslinger', name: '건슬링거', accent: '#5A6A7A', skills: [
    { id: 'gsl-gunplay',           name: '건플레이',            tier: 'normal' },
    { id: 'gsl-death-target',      name: '데스 타겟',           tier: 'normal' },
    { id: 'gsl-last-resort',       name: '라스트 리조트',       tier: 'normal' },
    { id: 'gsl-last-action',       name: '라스트 액션',         tier: 'normal' },
    { id: 'gsl-running-shot',      name: '러닝 샷',             tier: 'normal' },
    { id: 'gsl-long-barrel',       name: '롱 배럴',             tier: 'normal' },
    { id: 'gsl-magic-bullet',      name: '매직 불릿',           tier: 'normal' },
    { id: 'gsl-bullet-rave',       name: '불릿 레이브',         tier: 'normal' },
    { id: 'gsl-sighting-device',   name: '사이팅 디바이스',     tier: 'normal' },
    { id: 'gsl-sniping',           name: '스나이핑',            tier: 'normal' },
    { id: 'gsl-spell-bullet',      name: '스펠 불릿',           tier: 'normal' },
    { id: 'gsl-arms-mastery',      name: '암즈 마스터리: 마도총', tier: 'normal' },
    { id: 'gsl-one-coin-shot',     name: '원 코인 샷',          tier: 'normal' },
    { id: 'gsl-exceed-shot',       name: '익시드 샷',           tier: 'normal' },
    { id: 'gsl-intercept',         name: '인터셉트',            tier: 'normal' },
    { id: 'gsl-impact-shot',       name: '임팩트 샷',           tier: 'normal' },
    { id: 'gsl-counter-shot',      name: '카운터 샷',           tier: 'normal' },
    { id: 'gsl-caliber',           name: '캘리버',              tier: 'normal' },
    { id: 'gsl-caliber-gun-pod',   name: '캘리버 건 파드',      tier: 'normal' },
    { id: 'gsl-calculate',         name: '캘큐레이트',          tier: 'normal' },
    { id: 'gsl-capture-shot',      name: '캡처 샷',             tier: 'normal' },
    { id: 'gsl-quick-draw',        name: '퀵 드로',             tier: 'normal' },
    { id: 'gsl-temp-repair',       name: '템퍼러리 리페어',     tier: 'normal' },
    { id: 'gsl-fight-back',        name: '파이트 백',           tier: 'normal' },
    { id: 'gsl-fanning',           name: '패닝',                tier: 'normal' },
    { id: 'gsl-diffusion-shot',    name: '디퓨전 샷',           tier: 'normal' },
    { id: 'gsl-fall-down',         name: '폴 다운',             tier: 'normal' },
    { id: 'gsl-bullet-mark',       name: '불릿 마크',           tier: 'normal' },
    { id: 'gsl-custom-gun',        name: '커스텀 건',           tier: 'normal' },
    { id: 'gsl-quick-snipe',       name: '퀵 스나이프',         tier: 'normal' },
    { id: 'gsl-shooter',           name: '슈터',                tier: 'eosheon' },
    { id: 'gsl-modern-arms-hg',    name: '모던 암즈: 핸드 건',  tier: 'eosheon' },
  ] },
  { id: 'samurai', name: '사무라이', accent: '#8A2020', skills: [
    { id: 'sam-glance-slash',      name: '글랜스 슬래시',       tier: 'normal' },
    { id: 'sam-nerve-break',       name: '너브 브레이크',       tier: 'normal' },
    { id: 'sam-deflection',        name: '디플렉션',            tier: 'normal' },
    { id: 'sam-reflection',        name: '리플렉션',            tier: 'normal' },
    { id: 'sam-rage',              name: '레이지',              tier: 'normal' },
    { id: 'sam-sonic-boom',        name: '소닉 붐',             tier: 'normal' },
    { id: 'sam-sonic-burst',       name: '소닉 버스트',         tier: 'normal' },
    { id: 'sam-strike-back',       name: '스트라이크 백',       tier: 'normal' },
    { id: 'sam-shot-back',         name: '샷 백',               tier: 'normal' },
    { id: 'sam-spirit-of-samurai', name: '스피릿 오브 사무라이', tier: 'normal' },
    { id: 'sam-secret-formula',    name: '시크릿 포뮬러',       tier: 'normal' },
    { id: 'sam-armor-break',       name: '아머 브레이크',       tier: 'normal' },
    { id: 'sam-out-strip',         name: '아웃 스트립',         tier: 'normal' },
    { id: 'sam-arms-mastery',      name: '암즈 마스터리: 카타나', tier: 'normal' },
    { id: 'sam-combat-sense',      name: '컴뱃 센스',           tier: 'normal' },
    { id: 'sam-clear-mind',        name: '클리어 마인드',       tier: 'normal' },
    { id: 'sam-tornado-blast',     name: '토네이도 블래스트',   tier: 'normal' },
    { id: 'sam-hyper-blast',       name: '하이퍼 블래스트',     tier: 'normal' },
    { id: 'sam-two-hand-attack',   name: '투 핸드 어택',        tier: 'normal' },
    { id: 'sam-true-eye',          name: '트루 아이',           tier: 'normal' },
    { id: 'sam-twin-blade',        name: '트윈 블레이드',       tier: 'normal' },
    { id: 'sam-power-break',       name: '파워 브레이크',       tier: 'normal' },
    { id: 'sam-power-smite',       name: '파워 스마이트',       tier: 'normal' },
    { id: 'sam-first-strike',      name: '퍼스트 스트라이크',   tier: 'normal' },
    { id: 'sam-fatal-blow',        name: '페이탈 블로',         tier: 'normal' },
    { id: 'sam-forestall',         name: '포어스톨',            tier: 'normal' },
    { id: 'sam-pressure',          name: '프레셔',              tier: 'normal' },
    { id: 'sam-radiant-edge',      name: '라디언트 에지',       tier: 'normal' },
    { id: 'sam-insight-blade',     name: '인사이트 블레이드',   tier: 'normal' },
    { id: 'sam-true-break',        name: '트루 브레이크',       tier: 'normal' },
    { id: 'sam-kendo',             name: '검도',                tier: 'eosheon' },
    { id: 'sam-musado',            name: '무사도',              tier: 'eosheon' },
  ] },
  { id: 'summoner', name: '서머너', accent: '#2A7A5A', skills: [
    { id: 'sum-guardian',          name: '가디언',              tier: 'normal' },
    { id: 'sum-discipline',        name: '디시플린',            tier: 'normal' },
    { id: 'sum-relaxation',        name: '릴랙세이션',          tier: 'normal' },
    { id: 'sum-magic-circle',      name: '매직 서클',           tier: 'normal' },
    { id: 'sum-blurt-pact',        name: '블러트 펙트',         tier: 'normal' },
    { id: 'sum-beast-bane',        name: '비스트 베인',         tier: 'normal' },
    { id: 'sum-beast-hunter',      name: '비스트 헌터',         tier: 'normal' },
    { id: 'sum-summon-leviathan',  name: '서먼 리바이어선',     tier: 'normal' },
    { id: 'sum-summon-simurgh',    name: '서먼 시무르그',       tier: 'normal' },
    { id: 'sum-summon-arachne',    name: '서먼 아라크네',       tier: 'normal' },
    { id: 'sum-summon-jormungandr',name: '서먼 요르문간드',     tier: 'normal' },
    { id: 'sum-summon-catoblepas', name: '서먼 카토블레퍼스',   tier: 'normal' },
    { id: 'sum-summon-fafnir',     name: '서먼 파브니르',       tier: 'normal' },
    { id: 'sum-summon-fenrir',     name: '서먼 펜릴',           tier: 'normal' },
    { id: 'sum-animal-pact',       name: '애니멀 팩트',         tier: 'normal' },
    { id: 'sum-constriction',      name: '컨스트릭션',          tier: 'normal' },
    { id: 'sum-query',             name: '쿼리',                tier: 'normal' },
    { id: 'sum-territory',         name: '테리토리',            tier: 'normal' },
    { id: 'sum-familiar',          name: '패밀리어',            tier: 'normal' },
    { id: 'sum-familiar-land',     name: '패밀리어 랜드',       tier: 'normal' },
    { id: 'sum-familiar-mastery',  name: '패밀리어 마스터리',   tier: 'normal' },
    { id: 'sum-familiar-support',  name: '패밀리어 서포트',     tier: 'normal' },
    { id: 'sum-familiar-attack',   name: '패밀리어 어택',       tier: 'normal' },
    { id: 'sum-familiar-plus',     name: '패밀리어 플러스',     tier: 'normal' },
    { id: 'sum-force-bringer',     name: '포스 브링어',         tier: 'normal' },
    { id: 'sum-high-summoner',     name: '하이 서머너',         tier: 'normal' },
    { id: 'sum-great-summoner',    name: '그레이트 서머너',     tier: 'normal' },
    { id: 'sum-absolute-force',    name: '앱솔루트 포스',       tier: 'normal' },
    { id: 'sum-untouchable',       name: '언터쳐블',            tier: 'normal' },
    { id: 'sum-familiar-combo',    name: '패밀리어 콤비네이션', tier: 'normal' },
    { id: 'sum-summon-demon-lord', name: '서먼 데몬 로드',      tier: 'eosheon' },
    { id: 'sum-draw-card',         name: '드로우 카드',         tier: 'eosheon' },
  ] },
  { id: 'sage', name: '세이지', accent: '#3A5A9A', skills: [
    { id: 'sge-dismantle',         name: '디스맨틀',            tier: 'normal' },
    { id: 'sge-running',           name: '러닝',                tier: 'normal' },
    { id: 'sge-reversal',          name: '리버설',              tier: 'normal' },
    { id: 'sge-magic-operation',   name: '매직 오퍼레이션',     tier: 'normal' },
    { id: 'sge-memory-complete',   name: '메모리 컴플리트',     tier: 'normal' },
    { id: 'sge-biology',           name: '바이올로지',          tier: 'normal' },
    { id: 'sge-bookmark',          name: '북마크',              tier: 'normal' },
    { id: 'sge-break-attribute',   name: '브레이크 어트리뷰트', tier: 'normal' },
    { id: 'sge-blood-spell',       name: '블러드 스펠',         tier: 'normal' },
    { id: 'sge-advice',            name: '어드바이스',          tier: 'normal' },
    { id: 'sge-attribute',         name: '어트리뷰트',          tier: 'normal' },
    { id: 'sge-encyclopedia',      name: '엔사이클로피디아',    tier: 'normal' },
    { id: 'sge-quick-search',      name: '퀵 서치',             tier: 'normal' },
    { id: 'sge-weak-point',        name: '위크 포인트',         tier: 'normal' },
    { id: 'sge-vital-part',        name: '바이탈 파트',         tier: 'normal' },
    { id: 'sge-examine',           name: '이그제민',            tier: 'normal' },
    { id: 'sge-efficient',         name: '이피션트',            tier: 'normal' },
    { id: 'sge-extend-range',      name: '익스텐드 레인지',     tier: 'normal' },
    { id: 'sge-elucidate',         name: '일루다이트',          tier: 'normal' },
    { id: 'sge-concordance',       name: '콘코던스',            tier: 'normal' },
    { id: 'sge-tactics',           name: '택틱스',              tier: 'normal' },
    { id: 'sge-treasure-mania',    name: '트레져 마니아',       tier: 'normal' },
    { id: 'sge-truth-sight',       name: '트루스 사이트',       tier: 'normal' },
    { id: 'sge-trivialist',        name: '트리비얼리스트',      tier: 'normal' },
    { id: 'sge-find-out',          name: '파인드 아웃',         tier: 'normal' },
    { id: 'sge-follow-up',         name: '폴로 업',             tier: 'normal' },
    { id: 'sge-high-wisdom',       name: '하이 위즈덤',         tier: 'normal' },
    { id: 'sge-magic-brain',       name: '매직 브레인',         tier: 'normal' },
    { id: 'sge-prediction',        name: '프레딕션',            tier: 'normal' },
    { id: 'sge-high-attribute',    name: '하이 어트리뷰트',     tier: 'normal' },
    { id: 'sge-educated',          name: '에디케이티드',        tier: 'eosheon' },
    { id: 'sge-fantasy-knowledge', name: '판타지 널리지',       tier: 'eosheon' },
  ] },
  { id: 'dancer', name: '댄서', accent: '#C04080', skills: [
    { id: 'dnc-dance-marvel',      name: '댄스 마커블',         tier: 'normal' },
    { id: 'dnc-dancing-hero',      name: '댄싱 히어로',         tier: 'normal' },
    { id: 'dnc-matador',           name: '마타도르',            tier: 'normal' },
    { id: 'dnc-mysterious-dance',  name: '미스테리어스 댄스',   tier: 'normal' },
    { id: 'dnc-battle-step',       name: '배틀 스탭',           tier: 'normal' },
    { id: 'dnc-sword-dance',       name: '소드 댄스',           tier: 'normal' },
    { id: 'dnc-super-hero',        name: '슈퍼 히어로',         tier: 'normal' },
    { id: 'dnc-step-dark',         name: '스탭: 다크',          tier: 'normal' },
    { id: 'dnc-step-bright',       name: '스탭: 브라이트',      tier: 'normal' },
    { id: 'dnc-step-earth',        name: '스탭: 어스',          tier: 'normal' },
    { id: 'dnc-step-aerial',       name: '스탭: 에어리얼',      tier: 'normal' },
    { id: 'dnc-step-water',        name: '스탭: 워터',          tier: 'normal' },
    { id: 'dnc-step-fire',         name: '스탭: 파이어',        tier: 'normal' },
    { id: 'dnc-armor-change',      name: '아머 체인지',         tier: 'normal' },
    { id: 'dnc-avoid-dance',       name: '어보이드 댄스',       tier: 'normal' },
    { id: 'dnc-application',       name: '어플리케이션',        tier: 'normal' },
    { id: 'dnc-aerial-rave',       name: '에어리얼 레이브',     tier: 'normal' },
    { id: 'dnc-effect-skip',       name: '이펙트 스킵',         tier: 'normal' },
    { id: 'dnc-encourage',         name: '인커리지',            tier: 'normal' },
    { id: 'dnc-quick-step',        name: '퀵 스탭',             tier: 'normal' },
    { id: 'dnc-trick-step',        name: '트릭 스탭',           tier: 'normal' },
    { id: 'dnc-performance',       name: '퍼포먼스',            tier: 'normal' },
    { id: 'dnc-feather-tap',       name: '페더 탭',             tier: 'normal' },
    { id: 'dnc-somersault',        name: '서머솔트',            tier: 'normal' },
    { id: 'dnc-heartbeat',         name: '하트 비트',           tier: 'normal' },
    { id: 'dnc-regeneration',      name: '리제네이션',          tier: 'normal' },
    { id: 'dnc-vanishing-step',    name: '배니싱 스탭',         tier: 'normal' },
    { id: 'dnc-backup-dance',      name: '백업 댄스',           tier: 'normal' },
    { id: 'dnc-entry-marvel',      name: '엔트리 마커블',       tier: 'normal' },
    { id: 'dnc-touch-and-go',      name: '터치 앤 고',          tier: 'normal' },
    { id: 'dnc-kabuki',            name: '가부키',              tier: 'eosheon' },
    { id: 'dnc-breakdance',        name: '브레이크 댄스',       tier: 'eosheon' },
  ] },
  { id: 'ninja', name: '닌자', accent: '#2A3A5A', skills: [
    { id: 'nnj-die-another-day',   name: '다이 어나더 데이',    tier: 'normal' },
    { id: 'nnj-death-blow',        name: '데스 블로',           tier: 'normal' },
    { id: 'nnj-land-fisher',       name: '랜드 피셔',           tier: 'normal' },
    { id: 'nnj-murder-skill',      name: '머더 스킬',           tier: 'normal' },
    { id: 'nnj-mirror-attack',     name: '미러 어택',           tier: 'normal' },
    { id: 'nnj-violent-wind',      name: '바이올런트 윈드',     tier: 'normal' },
    { id: 'nnj-burst-break',       name: '버스트 브레이크',     tier: 'normal' },
    { id: 'nnj-bloody-beat',       name: '블러디 피트',         tier: 'normal' },
    { id: 'nnj-blow-up',           name: '블로 업',             tier: 'normal' },
    { id: 'nnj-shadow-snap',       name: '섀도 스냅',           tier: 'normal' },
    { id: 'nnj-soar-spot',         name: '소어 스폿',           tier: 'normal' },
    { id: 'nnj-sneak-up',          name: '스닉 업',             tier: 'normal' },
    { id: 'nnj-stunt-flying',      name: '스턴트 플라잉',       tier: 'normal' },
    { id: 'nnj-secret-arts',       name: '시크릿 아츠',         tier: 'normal' },
    { id: 'nnj-weapon-shoot',      name: '웨폰 슈트',           tier: 'normal' },
    { id: 'nnj-image-body',        name: '이미지 보디',         tier: 'normal' },
    { id: 'nnj-enhance-spell',     name: '인핸스 스펠',         tier: 'normal' },
    { id: 'nnj-implosion',         name: '임플로전',            tier: 'normal' },
    { id: 'nnj-conceal-attack',    name: '컨실 어택',           tier: 'normal' },
    { id: 'nnj-quick-riding',      name: '퀵 라이딩',           tier: 'normal' },
    { id: 'nnj-trouble-sense',     name: '트러블 센스',         tier: 'normal' },
    { id: 'nnj-fire-clap',         name: '파이어 클랩',         tier: 'normal' },
    { id: 'nnj-poisonous-mist',    name: '포이즈너스 미스트',   tier: 'normal' },
    { id: 'nnj-hand-symbol-bomb',  name: '핸드 심볼: 폭',       tier: 'normal' },
    { id: 'nnj-homing-hit',        name: '호밍 히트',           tier: 'normal' },
    { id: 'nnj-never-give-up',     name: '네버 기브 업',        tier: 'normal' },
    { id: 'nnj-double-arts',       name: '더블 아츠',           tier: 'normal' },
    { id: 'nnj-big-bang',          name: '빅 뱅',               tier: 'normal' },
    { id: 'nnj-genocider-skill',   name: '제노사이더 스킬',     tier: 'normal' },
    { id: 'nnj-hand-symbol-heat',  name: '핸드심볼: 열',        tier: 'normal' },
    { id: 'nnj-ninja-soul',        name: '닌자 소울',           tier: 'eosheon' },
    { id: 'nnj-fatal-bomb',        name: '페이탈 봄',           tier: 'eosheon' },
  ] },
  { id: 'berserker', name: '버서커', accent: '#A03030', skills: [
    { id: 'bsk-run-after',         name: '런 애프터',           tier: 'normal' },
    { id: 'bsk-body-brain',        name: '바디 브레인',         tier: 'normal' },
    { id: 'bsk-berserk',           name: '버서크',              tier: 'normal' },
    { id: 'bsk-soul-hit',          name: '소울 히트',           tier: 'normal' },
    { id: 'bsk-brutal-drain',      name: '브루탈 드레인',       tier: 'normal' },
    { id: 'bsk-brutal-life',       name: '브루탈 라이프',       tier: 'normal' },
    { id: 'bsk-brutal-move',       name: '브루탈 무브',         tier: 'normal' },
    { id: 'bsk-brutal-strike',     name: '브루탈 스트라이크',   tier: 'normal' },
    { id: 'bsk-brutal-jail',       name: '브루탈 제일',         tier: 'normal' },
    { id: 'bsk-big-swing',         name: '빅 스윙',             tier: 'normal' },
    { id: 'bsk-victory-blood',     name: '빅토리 블러드',       tier: 'normal' },
    { id: 'bsk-speed-swing',       name: '스피드 스윙',         tier: 'normal' },
    { id: 'bsk-arms-mastery',      name: '암즈 마스터리: 양손', tier: 'normal' },
    { id: 'bsk-anger-storm',       name: '앵거 스톰',           tier: 'normal' },
    { id: 'bsk-anger-war',         name: '앵거 워',             tier: 'normal' },
    { id: 'bsk-wild-assault',      name: '와일드 어설트',       tier: 'normal' },
    { id: 'bsk-excite-soul',       name: '익사이트 소울',       tier: 'normal' },
    { id: 'bsk-confused-fight',    name: '컨퓨즈드 파이트',     tier: 'normal' },
    { id: 'bsk-cross-counter',     name: '크로스 카운터',       tier: 'normal' },
    { id: 'bsk-two-hand-grip',     name: '투 핸드 그립',        tier: 'normal' },
    { id: 'bsk-two-hand-blow',     name: '투 핸드 블로',        tier: 'normal' },
    { id: 'bsk-fatal-finish',      name: '페이탈 피니시',       tier: 'normal' },
    { id: 'bsk-frenzy-mastery',    name: '프렌지 마스터리',     tier: 'normal' },
    { id: 'bsk-frenzy-swing',      name: '프렌지 스윙',         tier: 'normal' },
    { id: 'bsk-frenzy-impact',     name: '프렌지 임팩트',       tier: 'normal' },
    { id: 'bsk-frenzy-zone',       name: '프렌지 존',           tier: 'normal' },
    { id: 'bsk-brutal-burst',      name: '브루탈 버스트',       tier: 'normal' },
    { id: 'bsk-switch-back',       name: '스위치 백',           tier: 'normal' },
    { id: 'bsk-over-power',        name: '오버 파워',           tier: 'normal' },
    { id: 'bsk-tension-grow',      name: '텐션 그로우',         tier: 'normal' },
    { id: 'bsk-ganzke',            name: '간츠케',              tier: 'eosheon' },
    { id: 'bsk-dahyeoljil',        name: '다혈질',              tier: 'eosheon' },
  ] },
  { id: 'bard', name: '바드', accent: '#C09020', skills: [
    { id: 'brd-galdr',             name: '갈드르',              tier: 'normal' },
    { id: 'brd-grapevine',         name: '그레이프바인',        tier: 'normal' },
    { id: 'brd-discord',           name: '디스코드',            tier: 'normal' },
    { id: 'brd-last-song',         name: '라스트송',            tier: 'normal' },
    { id: 'brd-loud-voice',        name: '라우드 보이스',       tier: 'normal' },
    { id: 'brd-lullaby',           name: '럴러바이',            tier: 'normal' },
    { id: 'brd-requiem',           name: '레퀴엠',              tier: 'normal' },
    { id: 'brd-madrigal',          name: '마드리갈',            tier: 'normal' },
    { id: 'brd-march',             name: '마치',                tier: 'normal' },
    { id: 'brd-ballad',            name: '발라드',              tier: 'normal' },
    { id: 'brd-busker',            name: '버스커',              tier: 'normal' },
    { id: 'brd-serenade',          name: '스레너디',            tier: 'normal' },
    { id: 'brd-silver-song',       name: '실버리송',            tier: 'normal' },
    { id: 'brd-allegro',           name: '알레그로',            tier: 'normal' },
    { id: 'brd-accessory-change',  name: '액세서리 체인지',     tier: 'normal' },
    { id: 'brd-anthem',            name: '앤섬',                tier: 'normal' },
    { id: 'brd-impromptu',         name: '엠프롱프투',          tier: 'normal' },
    { id: 'brd-etude',             name: '에튀드',              tier: 'normal' },
    { id: 'brd-oratorio',          name: '오라토리오',          tier: 'normal' },
    { id: 'brd-joyful-joyful',     name: '조이풀 조이풀',       tier: 'normal' },
    { id: 'brd-canon',             name: '카논',                tier: 'normal' },
    { id: 'brd-capriccio',         name: '카프리치오',          tier: 'normal' },
    { id: 'brd-fight-song',        name: '파이트 송',           tier: 'normal' },
    { id: 'brd-forte',             name: '포르테',              tier: 'normal' },
    { id: 'brd-polka',             name: '폴카',                tier: 'normal' },
    { id: 'brd-hymnody',           name: '힘노디',              tier: 'normal' },
    { id: 'brd-mazurka',           name: '마주르카',            tier: 'normal' },
    { id: 'brd-accompany',         name: '어컴퍼니',            tier: 'normal' },
    { id: 'brd-carol',             name: '캐롤',                tier: 'normal' },
    { id: 'brd-quick-song',        name: '퀵 송',               tier: 'normal' },
    { id: 'brd-idol',              name: '아이돌',              tier: 'eosheon' },
    { id: 'brd-rock-n-roll',       name: '로큰롤',              tier: 'eosheon' },
  ] },
  { id: 'monk', name: '몽크', accent: '#C07030', skills: [
    { id: 'mnk-rush-knuckle',      name: '러시 너클',           tier: 'normal' },
    { id: 'mnk-resist-elemental',  name: '레지스트 엘리멘탈',   tier: 'normal' },
    { id: 'mnk-mind-adept',        name: '마인드 어뎁트',       tier: 'normal' },
    { id: 'mnk-mind-crash',        name: '마인드 크래시',       tier: 'normal' },
    { id: 'mnk-menacing-roar',     name: '메나싱 로어',         tier: 'normal' },
    { id: 'mnk-mace-fighting',     name: '메이스 파이팅',       tier: 'normal' },
    { id: 'mnk-more-toughness',    name: '모어 터프니스',       tier: 'normal' },
    { id: 'mnk-vital-force',       name: '바이탈 포스',         tier: 'normal' },
    { id: 'mnk-self-healing',      name: '셀프 힐링',           tier: 'normal' },
    { id: 'mnk-soul-buster',       name: '소울 버스터',         tier: 'normal' },
    { id: 'mnk-soul-fist',         name: '소울 피스트',         tier: 'normal' },
    { id: 'mnk-stun-attack',       name: '스턴 어택',           tier: 'normal' },
    { id: 'mnk-strong-style',      name: '스트롱 스타일',       tier: 'normal' },
    { id: 'mnk-iron-fist',         name: '아이언 피스트',       tier: 'normal' },
    { id: 'mnk-arms-mastery',      name: '암즈 마스터리: 격투', tier: 'normal' },
    { id: 'mnk-energy-burst',      name: '에너지 버스트',       tier: 'normal' },
    { id: 'mnk-energy-flow',       name: '에너지 플로',         tier: 'normal' },
    { id: 'mnk-energy-squeeze',    name: '에너지 스퀴즈',       tier: 'normal' },
    { id: 'mnk-additional-blow',   name: '에디셔널 블로',       tier: 'normal' },
    { id: 'mnk-one-two-blow',      name: '원 투 블로',          tier: 'normal' },
    { id: 'mnk-endure',            name: '인듀어',              tier: 'normal' },
    { id: 'mnk-combat-throw',      name: '컴뱃 스로',           tier: 'normal' },
    { id: 'mnk-call-out',          name: '콜 아웃',             tier: 'normal' },
    { id: 'mnk-penetrate-blow',    name: '페니트레이트 블로',   tier: 'normal' },
    { id: 'mnk-hard-muscle',       name: '하드 머슬',           tier: 'normal' },
    { id: 'mnk-hurricane-blow',    name: '허리케인 블로',       tier: 'normal' },
    { id: 'mnk-resist-complete',   name: '레지스트 컴플리트',   tier: 'normal' },
    { id: 'mnk-metal-muscle',      name: '메탈 머슬',           tier: 'normal' },
    { id: 'mnk-counter-throw',     name: '카운터 스로',         tier: 'normal' },
    { id: 'mnk-triple-blow',       name: '트리플 블로',         tier: 'normal' },
    { id: 'mnk-karate',            name: '가라테',              tier: 'eosheon' },
    { id: 'mnk-systema',           name: '시스테마',            tier: 'eosheon' },
  ] },
  { id: 'ranger', name: '레인저', accent: '#4A7A30', skills: [
    { id: 'rng-direct-hit',        name: '다이렉트 히트',       tier: 'normal' },
    { id: 'rng-dual-arrow',        name: '듀얼 애로',           tier: 'normal' },
    { id: 'rng-disappear',         name: '디서피어',            tier: 'normal' },
    { id: 'rng-long-range-shot',   name: '롱 레인지 샷',        tier: 'normal' },
    { id: 'rng-recycle',           name: '리사이클',            tier: 'normal' },
    { id: 'rng-bind-shot',         name: '바인드 샷',           tier: 'normal' },
    { id: 'rng-booby-trap',        name: '부비 트랩',           tier: 'normal' },
    { id: 'rng-bulls-eye',         name: '볼스 아이',           tier: 'normal' },
    { id: 'rng-blindsight',        name: '블라인드사이트',      tier: 'normal' },
    { id: 'rng-shadow-shot',       name: '섀도 샷',             tier: 'normal' },
    { id: 'rng-sure-shot',         name: '슈어 샷',             tier: 'normal' },
    { id: 'rng-shoot-out',         name: '슛 아웃',             tier: 'normal' },
    { id: 'rng-speed-shot',        name: '스피드 샷',           tier: 'normal' },
    { id: 'rng-slayer',            name: '슬레이어',            tier: 'normal' },
    { id: 'rng-arms-mastery',      name: '암즈 마스터리: 활',   tier: 'normal' },
    { id: 'rng-arrow-shower',      name: '애로 샤워',           tier: 'normal' },
    { id: 'rng-arrow-rain',        name: '애로 레인',           tier: 'normal' },
    { id: 'rng-adept',             name: '어뎁트',              tier: 'normal' },
    { id: 'rng-accurate-shot',     name: '어큐레이트 샷',       tier: 'normal' },
    { id: 'rng-weapon-trick',      name: '웨폰 트릭',           tier: 'normal' },
    { id: 'rng-eagle-eye',         name: '이글아이',            tier: 'normal' },
    { id: 'rng-quick-action',      name: '퀵 액션',             tier: 'normal' },
    { id: 'rng-quick-aid',         name: '퀵 에이드',           tier: 'normal' },
    { id: 'rng-close-shot',        name: '클로즈 샷',           tier: 'normal' },
    { id: 'rng-fade-away',         name: '페이드 어웨이',       tier: 'normal' },
    { id: 'rng-hawk-eye',          name: '호크 아이',           tier: 'normal' },
    { id: 'rng-garuda-eye',        name: '가루다 아이',         tier: 'normal' },
    { id: 'rng-shadow-eye',        name: '섀도 아이',           tier: 'normal' },
    { id: 'rng-strong-bow',        name: '스트롱 보우',         tier: 'normal' },
    { id: 'rng-trick-shot',        name: '트릭 샷',             tier: 'normal' },
    { id: 'rng-power-ranger',      name: '파워레인저',          tier: 'eosheon' },
    { id: 'rng-sub-sistence',      name: '서브 시스턴스',       tier: 'eosheon' },
  ] },
  { id: 'blacksmith', name: '블랙스미스', accent: '#6A5040', skills: [
    { id: 'bsm-earth-smith',       name: '어스 스미스',         tier: 'normal' },
    { id: 'bsm-armor-break',       name: '아머 브레이크',       tier: 'normal' },
    { id: 'bsm-arms-specialist',   name: '암즈 스페셜리스트',   tier: 'normal' },
    { id: 'bsm-arms-mastery',      name: '암즈 마스터리: 타격', tier: 'normal' },
    { id: 'bsm-iron-hand',         name: '아이언 핸드',         tier: 'normal' },
    { id: 'bsm-weapon-coordinate', name: '웨폰 코디네이트',     tier: 'normal' },
    { id: 'bsm-weapon-burst',      name: '웨폰 버스트',         tier: 'normal' },
    { id: 'bsm-water-smith',       name: '위터 스미스',         tier: 'normal' },
    { id: 'bsm-aerial-smith',      name: '에어리얼 스미스',     tier: 'normal' },
    { id: 'bsm-elemental-enchant', name: '엘레멘탈 인첸터',     tier: 'normal' },
    { id: 'bsm-gunsmith',          name: '건스미스',            tier: 'normal' },
    { id: 'bsm-crystal-smith',     name: '크리스탈 스미스',     tier: 'normal' },
    { id: 'bsm-spirit-samurai',    name: '스피릿 오브 사무라이', tier: 'normal' },
    { id: 'bsm-smith-adept',       name: '스미스 아데프토',     tier: 'normal' },
    { id: 'bsm-slot-shield',       name: '슬롯 스미스: 방패',   tier: 'normal' },
    { id: 'bsm-slot-weapon',       name: '슬롯 스미스: 무기',   tier: 'normal' },
    { id: 'bsm-slot-armor',        name: '슬롯 스미스: 방어구', tier: 'normal' },
    { id: 'bsm-slot-plus',         name: '슬롯 플러스',         tier: 'normal' },
    { id: 'bsm-temper-shield',     name: '템퍼: 방패',          tier: 'normal' },
    { id: 'bsm-temper-weapon',     name: '템퍼: 무기',          tier: 'normal' },
    { id: 'bsm-temper-armor',      name: '템퍼: 방어구',        tier: 'normal' },
    { id: 'bsm-fire-smith',        name: '파이어 스미스',       tier: 'normal' },
    { id: 'bsm-placize',           name: '플라시즈',            tier: 'normal' },
    { id: 'bsm-recycle',           name: '리사이클',            tier: 'normal' },
    { id: 'bsm-recycle-other',     name: '리사이클 아더',       tier: 'normal' },
    { id: 'bsm-magic-coating',     name: '매직 코팅',           tier: 'normal' },
    { id: 'bsm-ultimate-item',     name: '얼티밋아이템',        tier: 'normal' },
    { id: 'bsm-weight-customize',  name: '웨이트 커스터마이징', tier: 'normal' },
    { id: 'bsm-blade-master',      name: '블레이드마스터',      tier: 'normal' },
    { id: 'bsm-magic-break',       name: '매직 브레이크',       tier: 'normal' },
    { id: 'bsm-engineer',          name: '엔지니어',            tier: 'eosheon' },
    { id: 'bsm-modern-technology', name: '모던 테크놀로지',     tier: 'eosheon' },
  ] },
  { id: 'excellent', name: '엑설런트', accent: '#C0A020', skills: [
    { id: 'exc-invio-ability',     name: '인바이오 어빌리티',   tier: 'normal' },
    { id: 'exc-well-safe',         name: '월 세이프',           tier: 'normal' },
    { id: 'exc-excess-fate',       name: '엑시즈 페이트',       tier: 'normal' },
    { id: 'exc-excellent-gift',    name: '엑설런트 기프트',     tier: 'normal' },
    { id: 'exc-excellent-luck',    name: '엑설런트 럭',         tier: 'normal' },
    { id: 'exc-auth-ackenlabb',    name: '권능: 아켄라브',      tier: 'normal' },
    { id: 'exc-auth-aema',         name: '권능: 아에마',        tier: 'normal' },
    { id: 'exc-auth-granaine',     name: '권능: 그랑아인',      tier: 'normal' },
    { id: 'exc-auth-glovis',       name: '권능: 글로비스',      tier: 'normal' },
    { id: 'exc-auth-gobannon',     name: '권능: 고바논',        tier: 'normal' },
    { id: 'exc-auth-dagda',        name: '권능: 다그데모아',    tier: 'normal' },
    { id: 'exc-auth-danan',        name: '권능: 다난',          tier: 'normal' },
    { id: 'exc-auth-naleshu',      name: '권능: 나레슈',        tier: 'normal' },
    { id: 'exc-auth-brigantia',    name: '권능: 브리간티아',    tier: 'normal' },
    { id: 'exc-auth-rial',         name: '권능: 리알',          tier: 'normal' },
    { id: 'exc-alternation',       name: '얼터네이션',          tier: 'normal' },
    { id: 'exc-calamity-trigger',  name: '칼라미티 트리거',     tier: 'normal' },
    { id: 'exc-god-knows',         name: '갓 노우즈',           tier: 'normal' },
    { id: 'exc-shine-braver',      name: '샤인 브레이버',       tier: 'normal' },
    { id: 'exc-divergence',        name: '다이버전스',          tier: 'normal' },
    { id: 'exc-darkness-lord',     name: '다크니스 로드',       tier: 'normal' },
    { id: 'exc-distortion',        name: '디스토션',            tier: 'normal' },
    { id: 'exc-divvy-up',          name: '디비 업',             tier: 'normal' },
    { id: 'exc-fatal-force',       name: '페이탈 포스',         tier: 'normal' },
    { id: 'exc-fatal-tuning',      name: '페이탈 튜닝',         tier: 'normal' },
    { id: 'exc-revival',           name: '리바이벌',            tier: 'normal' },
    { id: 'exc-brave-soul',        name: '브레이브 소울',       tier: 'normal' },
    { id: 'exc-dome-break',        name: '돔 브레이크',         tier: 'normal' },
    { id: 'exc-fatal-indicator',   name: '페이탈 인디케이터',   tier: 'normal' },
    { id: 'exc-world-stasis',      name: '월드 스테이시스',     tier: 'normal' },
    { id: 'exc-auth-kami',         name: '권능: 카미',          tier: 'eosheon' },
    { id: 'exc-god-shard',         name: '갓 샤드',             tier: 'eosheon' },
  ] },
  { id: 'cyborg', name: '사이버오건', accent: '#2A7A9A', skills: [
    { id: 'cyb-arms-link',         name: '암즈 링크',           tier: 'normal' },
    { id: 'cyb-active-cam',        name: '액티브 캠',           tier: 'normal' },
    { id: 'cyb-anti-gravity',      name: '안티 그래비티',       tier: 'normal' },
    { id: 'cyb-inertial-attack',   name: '이너설 어택',         tier: 'normal' },
    { id: 'cyb-implant-weapon',    name: '임플란트 웨폰',       tier: 'normal' },
    { id: 'cyb-over-limit',        name: '오버 리미트',         tier: 'normal' },
    { id: 'cyb-over-assault',      name: '오버 어설트',         tier: 'normal' },
    { id: 'cyb-over-clock',        name: '오버 클럭',           tier: 'normal' },
    { id: 'cyb-over-turbo',        name: '오버 터보',           tier: 'normal' },
    { id: 'cyb-guard-set',         name: '가드 셋',             tier: 'normal' },
    { id: 'cyb-gun-sight',         name: '건 사이트',           tier: 'normal' },
    { id: 'cyb-cyber-eye',         name: '사이버 아이',         tier: 'normal' },
    { id: 'cyb-self-bullet',       name: '셀프 불릿',           tier: 'normal' },
    { id: 'cyb-strike-boost',      name: '스트라이크 부스트',   tier: 'normal' },
    { id: 'cyb-down-burst',        name: '다운 버스트',         tier: 'normal' },
    { id: 'cyb-hard-body',         name: '하드 바디',           tier: 'normal' },
    { id: 'cyb-hard-wired',        name: '하드 와이어드',       tier: 'normal' },
    { id: 'cyb-variant-attack',    name: '베리언트 어택',       tier: 'normal' },
    { id: 'cyb-heat-drive',        name: '히트 드라이브',       tier: 'normal' },
    { id: 'cyb-brute-force',       name: '브루트 포스',         tier: 'normal' },
    { id: 'cyb-brain-accel',       name: '브레인 액셀',         tier: 'normal' },
    { id: 'cyb-metalize-head',     name: '메탈라이즈: 헤드',    tier: 'normal' },
    { id: 'cyb-metalize-limb',     name: '메탈라이즈: 림',      tier: 'normal' },
    { id: 'cyb-metalize-body',     name: '메탈라이즈: 바디',    tier: 'normal' },
    { id: 'cyb-reboot',            name: '리부트',              tier: 'normal' },
    { id: 'cyb-anti-shock-coat',   name: '안티 쇼크 코트',      tier: 'normal' },
    { id: 'cyb-anti-magic-coat',   name: '안티 매직 코트',      tier: 'normal' },
    { id: 'cyb-integral-arms',     name: '인테그랄 암즈',       tier: 'normal' },
    { id: 'cyb-flash-drive',       name: '플래시 드라이브',     tier: 'normal' },
    { id: 'cyb-heavy-metalize',    name: '헤비 메탈라이즈',     tier: 'normal' },
    { id: 'cyb-vehicle-link',      name: '비클 링크',           tier: 'eosheon' },
    { id: 'cyb-beast-gene',        name: '비스트 진',           tier: 'eosheon' },
  ] },
  { id: 'hacker', name: '해커', accent: '#20A040', skills: [
    { id: 'hck-virus-command',     name: '바이러스 커맨드',     tier: 'normal' },
    { id: 'hck-encoding',          name: '인코딩',              tier: 'normal' },
    { id: 'hck-cast-jamming',      name: '캐스트 재밍',         tier: 'normal' },
    { id: 'hck-crack-magic',       name: '크랙 매직',           tier: 'normal' },
    { id: 'hck-code-break',        name: '코드 브레이크',       tier: 'normal' },
    { id: 'hck-compile-dodge',     name: '컴파일: 닷지',        tier: 'normal' },
    { id: 'hck-compile-boost',     name: '컴파일: 부스트',      tier: 'normal' },
    { id: 'hck-compile-heal',      name: '컴파일: 힐',          tier: 'normal' },
    { id: 'hck-synchro-network',   name: '싱크로 네트워크',     tier: 'normal' },
    { id: 'hck-scanning',          name: '스캐닝',              tier: 'normal' },
    { id: 'hck-speed-load',        name: '스피드 로드',         tier: 'normal' },
    { id: 'hck-tactics-network',   name: '텍틱스 네트워크',     tier: 'normal' },
    { id: 'hck-tag-edit',          name: '태그 에디트',         tier: 'normal' },
    { id: 'hck-destructor',        name: '디스트럭터',          tier: 'normal' },
    { id: 'hck-delay-command',     name: '딜레이 커맨드',       tier: 'normal' },
    { id: 'hck-network-search',    name: '네트워크 서치',       tier: 'normal' },
    { id: 'hck-network-link',      name: '네트워크 링크',       tier: 'normal' },
    { id: 'hck-backup-load',       name: '백업 로드',           tier: 'normal' },
    { id: 'hck-program-magic',     name: '프로그램 마술',       tier: 'normal' },
    { id: 'hck-fine-editor',       name: '파인 에디터',         tier: 'normal' },
    { id: 'hck-vector-armor',      name: '벡터 아머',           tier: 'normal' },
    { id: 'hck-homing-code',       name: '호밍 코드',           tier: 'normal' },
    { id: 'hck-magic-update',      name: '매직 업데이트',       tier: 'normal' },
    { id: 'hck-magic-device',      name: '매직 디바이스',       tier: 'normal' },
    { id: 'hck-mind-security',     name: '마인드 시큐리티',     tier: 'normal' },
    { id: 'hck-magic-function',    name: '매직 펀션',           tier: 'normal' },
    { id: 'hck-logical-wall',      name: '로지컬 월',           tier: 'normal' },
    { id: 'hck-copy-paste',        name: '카피 앤 페이스트',    tier: 'normal' },
    { id: 'hck-cast-canceller',    name: '캐스트 캔슬러',       tier: 'normal' },
    { id: 'hck-reprogram',         name: '리 프로그램',         tier: 'normal' },
    { id: 'hck-system-engineer',   name: '시스템 엔지니어',     tier: 'eosheon' },
    { id: 'hck-library',           name: '라이브러리',          tier: 'eosheon' },
  ] },
  { id: 'gladiator', name: '글라디에이터', accent: '#9A3020', skills: [
    { id: 'gld-narrow-save',       name: '내로우 세이브',       tier: 'normal' },
    { id: 'gld-dirty-fight',       name: '더티 파이트',         tier: 'normal' },
    { id: 'gld-dual-fight',        name: '듀얼 파이트',         tier: 'normal' },
    { id: 'gld-last-blow',         name: '라스트 블로',         tier: 'normal' },
    { id: 'gld-rolling-dodge',     name: '롤링 닷지',           tier: 'normal' },
    { id: 'gld-make-stage',        name: '메이크 스테이지',     tier: 'normal' },
    { id: 'gld-battle-sense',      name: '배틀 센스',           tier: 'normal' },
    { id: 'gld-blocking',          name: '블로킹',              tier: 'normal' },
    { id: 'gld-beast-roar',        name: '비스트 로어',         tier: 'normal' },
    { id: 'gld-survive',           name: '서바이브',            tier: 'normal' },
    { id: 'gld-arms-mastery',      name: '암즈 마스터리',       tier: 'normal' },
    { id: 'gld-up-lift',           name: '업 리프트',           tier: 'normal' },
    { id: 'gld-one-on-one',        name: '원 온 원',            tier: 'normal' },
    { id: 'gld-excite-battle',     name: '익사이트 배틀',       tier: 'normal' },
    { id: 'gld-champion',          name: '챔피언',              tier: 'normal' },
    { id: 'gld-cranvel-style',     name: '크란 벨 스타일',      tier: 'normal' },
    { id: 'gld-target-on',         name: '타겟 온',             tier: 'normal' },
    { id: 'gld-technical-guard',   name: '태크니컬 가드',       tier: 'normal' },
    { id: 'gld-fight-appeal',      name: '파이트 어필',         tier: 'normal' },
    { id: 'gld-persistent',        name: '퍼시스턴트',          tier: 'normal' },
    { id: 'gld-footwork',          name: '풋워크',              tier: 'normal' },
    { id: 'gld-fury-blood',        name: '퓨리 블러드',         tier: 'normal' },
    { id: 'gld-hell-in-cell',      name: '헬 인 셀',            tier: 'normal' },
    { id: 'gld-last-stand',        name: '라스트 스탠드',       tier: 'normal' },
    { id: 'gld-lion-howl',         name: '라이온 하울',         tier: 'normal' },
    { id: 'gld-unlimited-mind',    name: '언리미티드 마인드',   tier: 'normal' },
    { id: 'gld-unbreakable-body',  name: '언브레이커블 바디',   tier: 'normal' },
    { id: 'gld-target-change',     name: '타겟 체인지',         tier: 'normal' },
    { id: 'gld-target-trace',      name: '타겟 트레이스',       tier: 'normal' },
    { id: 'gld-face-down',         name: '페이스 다운',         tier: 'normal' },
    { id: 'gld-promoter',          name: '프로모터',            tier: 'eosheon' },
    { id: 'gld-pro-wrestling',     name: '프로레슬링',          tier: 'eosheon' },
  ] },
  { id: 'shaman', name: '샤먼', accent: '#5A3A7A', skills: [
    { id: 'shm-darud',             name: '대러드',              tier: 'normal' },
    { id: 'shm-deadly-curse',      name: '데들리 커스',         tier: 'normal' },
    { id: 'shm-daymare',           name: '데이메어',            tier: 'normal' },
    { id: 'shm-debilitate',        name: '디빌리테이트',        tier: 'normal' },
    { id: 'shm-distrand',          name: '디스트랜드',          tier: 'normal' },
    { id: 'shm-rusty',             name: '러스티',              tier: 'normal' },
    { id: 'shm-sand-cloud',        name: '샌드 클라우드',       tier: 'normal' },
    { id: 'shm-stumble',           name: '스턴블',              tier: 'normal' },
    { id: 'shm-sickness',          name: '시크니스',            tier: 'normal' },
    { id: 'shm-anesthetic',        name: '애니스제틱',          tier: 'normal' },
    { id: 'shm-absorb',            name: '업소브',              tier: 'normal' },
    { id: 'shm-abstraction',       name: '업스트랙션',          tier: 'normal' },
    { id: 'shm-evil-eye',          name: '이블 아이',           tier: 'normal' },
    { id: 'shm-tangle',            name: '탱글',                tier: 'normal' },
    { id: 'shm-fog-mirage',        name: '포그 미라쥬',         tier: 'normal' },
    { id: 'shm-fortunate',         name: '포츄네이트',          tier: 'normal' },
    { id: 'shm-fragile',           name: '프래자일',            tier: 'normal' },
    { id: 'shm-preset-naked',      name: '프리셋: 네이키드',    tier: 'normal' },
    { id: 'shm-preset-devout',     name: '프리셋: 디바우트',    tier: 'normal' },
    { id: 'shm-preset-unarm',      name: '프리셋: 언암',        tier: 'normal' },
    { id: 'shm-preset-temperance', name: '프리셋: 템퍼런스',    tier: 'normal' },
    { id: 'shm-piercing-pain',     name: '피어싱 페인',         tier: 'normal' },
    { id: 'shm-hermit',            name: '허밋',                tier: 'normal' },
    { id: 'shm-lizard-preset',     name: '리저드 프리셋',       tier: 'normal' },
    { id: 'shm-ritual-curse',      name: '리추얼 커스',         tier: 'normal' },
    { id: 'shm-repentance',        name: '리펜턴스',            tier: 'normal' },
    { id: 'shm-serious-disease',   name: '시리어스 디지즈',     tier: 'normal' },
    { id: 'shm-soul-breaker',      name: '소울 브레이커',       tier: 'normal' },
    { id: 'shm-first-channel',     name: '퍼스트 채널',         tier: 'normal' },
    { id: 'shm-forbidden-curse',   name: '포비든 커스',         tier: 'normal' },
    { id: 'shm-animism',           name: '애니미즘',            tier: 'eosheon' },
    { id: 'shm-toxin-spirit',      name: '톡신스피릿',          tier: 'eosheon' },
  ] },
  { id: 'druid', name: '드루이드', accent: '#2A6A30', skills: [
    { id: 'drd-druid-master',      name: '드루이드 마스터',     tier: 'normal' },
    { id: 'drd-moving-set',        name: '무빙 세트',           tier: 'normal' },
    { id: 'drd-mirage-step',       name: '미라쥬 스텝',         tier: 'normal' },
    { id: 'drd-mistletoe-vital',   name: '미슬토우 바이탈리티', tier: 'normal' },
    { id: 'drd-mistletoe-power',   name: '미슬토우 파워',       tier: 'normal' },
    { id: 'drd-sense-enemy',       name: '센스 에너미',         tier: 'normal' },
    { id: 'drd-screen',            name: '스크린',              tier: 'normal' },
    { id: 'drd-anti-evil',         name: '안티 이블',           tier: 'normal' },
    { id: 'drd-acute-arts',        name: '어큐트 아츠',         tier: 'normal' },
    { id: 'drd-appreciate',        name: '어프리시에이트',      tier: 'normal' },
    { id: 'drd-edict',             name: '에딕트',              tier: 'normal' },
    { id: 'drd-elusive-step',      name: '엘루시브 스텝',       tier: 'normal' },
    { id: 'drd-warning',           name: '워닝',                tier: 'normal' },
    { id: 'drd-evil-venom',        name: '이블 베놈',           tier: 'normal' },
    { id: 'drd-evil-bane',         name: '이블 베인',           tier: 'normal' },
    { id: 'drd-impalement',        name: '임페일먼트',          tier: 'normal' },
    { id: 'drd-evil-hound',        name: '이블 헌드',           tier: 'normal' },
    { id: 'drd-force-weapon',      name: '포스 웨폰',           tier: 'normal' },
    { id: 'drd-force-impact',      name: '포스 임팩트',         tier: 'normal' },
    { id: 'drd-predatory-sense',   name: '프레데러티 센스',     tier: 'normal' },
    { id: 'drd-hunter-arts',       name: '헌터 아츠',           tier: 'normal' },
    { id: 'drd-holy-sight',        name: '홀리 사이트',         tier: 'normal' },
    { id: 'drd-holy-force',        name: '홀리 포스',           tier: 'normal' },
    { id: 'drd-detect-attack',     name: '디택트 어택',         tier: 'normal' },
    { id: 'drd-reflector-shot',    name: '리플랙터 샷',         tier: 'normal' },
    { id: 'drd-master-arts',       name: '마스터 아츠',         tier: 'normal' },
    { id: 'drd-slate-dodge',       name: '슬레이트 닷지',       tier: 'normal' },
    { id: 'drd-offering',          name: '오퍼링',              tier: 'normal' },
    { id: 'drd-evil-killer',       name: '이블 킬러',           tier: 'normal' },
    { id: 'drd-holy-storm',        name: '홀리 스톰',           tier: 'normal' },
    { id: 'drd-nature-care',       name: '네이처케어',          tier: 'eosheon' },
    { id: 'drd-ritual-magic',      name: '리추얼 매직',         tier: 'eosheon' },
  ] },
  { id: 'viking', name: '바이킹', accent: '#2A5A8A', skills: [
    { id: 'vik-go-sign',           name: '고 사인',             tier: 'normal' },
    { id: 'vik-diving',            name: '다이빙',              tier: 'normal' },
    { id: 'vik-deep-dive',         name: '딥 다이브',           tier: 'normal' },
    { id: 'vik-relieve',           name: '릴리브',              tier: 'normal' },
    { id: 'vik-mail-stream',       name: '메일 스트림',         tier: 'normal' },
    { id: 'vik-meat-dish',         name: '미트 디쉬',           tier: 'normal' },
    { id: 'vik-self-pride',        name: '셀프 프라이드',       tier: 'normal' },
    { id: 'vik-swimming',          name: '스위밍',              tier: 'normal' },
    { id: 'vik-skip-jack',         name: '스킵 잭',             tier: 'normal' },
    { id: 'vik-splash',            name: '스플래시',            tier: 'normal' },
    { id: 'vik-sea-sentry',        name: '시 센티',             tier: 'normal' },
    { id: 'vik-synchronize',       name: '싱크로나이즈',        tier: 'normal' },
    { id: 'vik-outsell',           name: '아웃셀',              tier: 'normal' },
    { id: 'vik-aqua-stance',       name: '아쿠아 스탠스',       tier: 'normal' },
    { id: 'vik-ex-boomerang',      name: '엑스 부메랑',         tier: 'normal' },
    { id: 'vik-ex-bomber',         name: '엑스 보머',           tier: 'normal' },
    { id: 'vik-wave-ride',         name: '웨이브 라이드',       tier: 'normal' },
    { id: 'vik-invert-attack',     name: '인버트 어택',         tier: 'normal' },
    { id: 'vik-eat-the-meat',      name: '잇 더 미트',          tier: 'normal' },
    { id: 'vik-captain',           name: '캡틴',                tier: 'normal' },
    { id: 'vik-finding',           name: '파인딩',              tier: 'normal' },
    { id: 'vik-friendship',        name: '프렌드 쉽',           tier: 'normal' },
    { id: 'vik-phineas-song',      name: '핀지어스 송',         tier: 'normal' },
    { id: 'vik-hook-up',           name: '훅 업',               tier: 'normal' },
    { id: 'vik-drowning',          name: '드라우닝',            tier: 'normal' },
    { id: 'vik-boarding',          name: '보딩',                tier: 'normal' },
    { id: 'vik-shark-bite',        name: '샤크 바이트',         tier: 'normal' },
    { id: 'vik-sailor-soul',       name: '세일러 소울',         tier: 'normal' },
    { id: 'vik-sea-rescue',        name: '시 레스큐',           tier: 'normal' },
    { id: 'vik-admiral',           name: '어드미럴',            tier: 'normal' },
    { id: 'vik-freestyle',         name: '자유형',              tier: 'eosheon' },
    { id: 'vik-treasure-nose',     name: '트레저 노즈',         tier: 'eosheon' },
  ] },
  { id: 'healer', name: '힐러', accent: '#3A9A60', skills: [
    { id: 'hlr-regular',           name: '레귤러',              tier: 'normal' },
    { id: 'hlr-mitration',         name: '마이트레이션',        tier: 'normal' },
    { id: 'hlr-marginal-herb',     name: '마지널 허브',         tier: 'normal' },
    { id: 'hlr-medical-mastery',   name: '메디컬 마스터리',     tier: 'normal' },
    { id: 'hlr-versination',       name: '버시네이션',          tier: 'normal' },
    { id: 'hlr-boost-herb',        name: '부스트 허브',         tier: 'normal' },
    { id: 'hlr-supplement',        name: '서플리먼트',          tier: 'normal' },
    { id: 'hlr-special-drink',     name: '스페셜 드링크',       tier: 'normal' },
    { id: 'hlr-special-potion',    name: '스페셜 포션',         tier: 'normal' },
    { id: 'hlr-special-egg',       name: '스페셜 에그',         tier: 'normal' },
    { id: 'hlr-speed-aid',         name: '스피드 에이드',       tier: 'normal' },
    { id: 'hlr-syrup',             name: '시럽',                tier: 'normal' },
    { id: 'hlr-aroma-frat',        name: '아로마 프랫',         tier: 'normal' },
    { id: 'hlr-iron-salt',         name: '아이언솔트',          tier: 'normal' },
    { id: 'hlr-ointment',          name: '오인트먼트',          tier: 'normal' },
    { id: 'hlr-stimulant',         name: '스티뮬런트',          tier: 'normal' },
    { id: 'hlr-toad-oil',          name: '토드 오일',           tier: 'normal' },
    { id: 'hlr-tranquilizer',      name: '트랭큘라이저',        tier: 'normal' },
    { id: 'hlr-power-way',         name: '파워웨이',            tier: 'normal' },
    { id: 'hlr-patch',             name: '패치',                tier: 'normal' },
    { id: 'hlr-patronage',         name: '패트로네이지',        tier: 'normal' },
    { id: 'hlr-perfume',           name: '퍼품',                tier: 'normal' },
    { id: 'hlr-pesticide',         name: '페스티사이드',        tier: 'normal' },
    { id: 'hlr-poison-apple',      name: '포이즌 애플',         tier: 'normal' },
    { id: 'hlr-herbal-lore',       name: '허벌 로어',           tier: 'normal' },
    { id: 'hlr-herb-tea',          name: '허브 티',             tier: 'normal' },
    { id: 'hlr-neutralize',        name: '뉴트럴라이즈',        tier: 'normal' },
    { id: 'hlr-excite-truffle',    name: '익사이트 트뤼프',     tier: 'normal' },
    { id: 'hlr-prime-oil',         name: '프라임 오일',         tier: 'normal' },
    { id: 'hlr-preservation',      name: '프리저베이션',        tier: 'normal' },
    { id: 'hlr-doctor',            name: '닥터',                tier: 'eosheon' },
    { id: 'hlr-medical-drug',      name: '메디컬 드래그',       tier: 'eosheon' },
  ] },
  { id: 'kannagi', name: '칸나기', accent: '#C89028', skills: [
    { id: 'kng-god-mastery',       name: '갓 마스터리',         tier: 'normal' },
    { id: 'kng-god-speed',         name: '갓스피드',            tier: 'normal' },
    { id: 'kng-donation',          name: '도네이션',            tier: 'normal' },
    { id: 'kng-lastrate-magic',    name: '라스트레이트 매직',   tier: 'normal' },
    { id: 'kng-lastrate-weapon',   name: '라스트레이트 웨폰',   tier: 'normal' },
    { id: 'kng-raise-charm',       name: '레이즈 참',           tier: 'normal' },
    { id: 'kng-refresh',           name: '리프레쉬',            tier: 'normal' },
    { id: 'kng-refresh-zone',      name: '리프레쉬 존',         tier: 'normal' },
    { id: 'kng-magical-repair',    name: '매지컬 리페어',       tier: 'normal' },
    { id: 'kng-sacred-dance',      name: '세이크리드 댄스',     tier: 'normal' },
    { id: 'kng-sacred-song',       name: '세이크리드 송',       tier: 'normal' },
    { id: 'kng-speed-reading',     name: '스피드 리딩',         tier: 'normal' },
    { id: 'kng-witch-doctor',      name: '위치 닥터',           tier: 'normal' },
    { id: 'kng-charm-mastery',     name: '참 마스터리',         tier: 'normal' },
    { id: 'kng-channeling',        name: '채널링',              tier: 'normal' },
    { id: 'kng-compose',           name: '컴포즈',              tier: 'normal' },
    { id: 'kng-call-god-nakihsame',name: '콜 갓: 나키하사메',   tier: 'normal' },
    { id: 'kng-call-god-susanoo',  name: '콜 갓: 스사노오',     tier: 'normal' },
    { id: 'kng-call-god-amaterasu',name: '콜 갓: 아마테루',     tier: 'normal' },
    { id: 'kng-call-god-izanagi',  name: '콜 갓: 이자나기',     tier: 'normal' },
    { id: 'kng-call-god-izanami',  name: '콜 갓: 이자나미',     tier: 'normal' },
    { id: 'kng-call-god-tsukuyomi',name: '콜 갓: 츠키요미',     tier: 'normal' },
    { id: 'kng-call-god-kagutsuchi',name:'콜 갓: 카구츠치',     tier: 'normal' },
    { id: 'kng-call-god-takefutsu',name: '콜 갓: 타케후츠',     tier: 'normal' },
    { id: 'kng-create-charm',      name: '크리에이트 참',       tier: 'normal' },
    { id: 'kng-holy-body',         name: '홀리 바디',           tier: 'normal' },
    { id: 'kng-god-body',          name: '갓 바디',             tier: 'normal' },
    { id: 'kng-god-breath',        name: '갓 브레스',           tier: 'normal' },
    { id: 'kng-ritual-charm',      name: '리츄얼 참',           tier: 'normal' },
    { id: 'kng-pantheon',          name: '판테논',              tier: 'normal' },
    { id: 'kng-call-god-shitennoh',name: '콜 갓: 사천왕',       tier: 'eosheon' },
    { id: 'kng-call-god-hachiman', name: '콜 갓: 하치만',       tier: 'eosheon' },
  ] },
  { id: 'bator', name: '바토르', accent: '#8A5A30', skills: [
    { id: 'btr-last-ride',         name: '라스트 라이드',       tier: 'normal' },
    { id: 'btr-ride-stalk',        name: '라이드 스토크',       tier: 'normal' },
    { id: 'btr-ride-charge',       name: '라이드 차지',         tier: 'normal' },
    { id: 'btr-ride-fight',        name: '라이드 파이트',       tier: 'normal' },
    { id: 'btr-light-wind',        name: '라이트 윈드',         tier: 'normal' },
    { id: 'btr-lightning-ride',    name: '라이트닝 라이드',     tier: 'normal' },
    { id: 'btr-runabout',          name: '런어바웃',            tier: 'normal' },
    { id: 'btr-rodeo',             name: '로데오',              tier: 'normal' },
    { id: 'btr-moving-shot',       name: '무빙 샷',             tier: 'normal' },
    { id: 'btr-body-drive',        name: '바디 드라이브',       tier: 'normal' },
    { id: 'btr-best-route',        name: '베스트 루트',         tier: 'normal' },
    { id: 'btr-saber-skill',       name: '세이버 스킬',         tier: 'normal' },
    { id: 'btr-arms-mastery',      name: '암즈 마스터리',       tier: 'normal' },
    { id: 'btr-wake-up',           name: '웨이크 업',           tier: 'normal' },
    { id: 'btr-wind-sense',        name: '윈드 센스',           tier: 'normal' },
    { id: 'btr-wind-attack',       name: '윈드 어택',           tier: 'normal' },
    { id: 'btr-extrion',           name: '익스트리언',          tier: 'normal' },
    { id: 'btr-jamming-arrow',     name: '재밍 애로',           tier: 'normal' },
    { id: 'btr-companion',         name: '컴패니언',            tier: 'normal' },
    { id: 'btr-companion-master',  name: '컴패니언 마스터',     tier: 'normal' },
    { id: 'btr-call-dragon',       name: '콜 드래곤',           tier: 'normal' },
    { id: 'btr-quick-drink',       name: '퀵 드링크',           tier: 'normal' },
    { id: 'btr-tail-swipe',        name: '테일 스와이프',       tier: 'normal' },
    { id: 'btr-trishot',           name: '트라이샷',            tier: 'normal' },
    { id: 'btr-first-move',        name: '퍼스트 무브',         tier: 'normal' },
    { id: 'btr-point-blank-shot',  name: '포인트 블랭크 샷',    tier: 'normal' },
    { id: 'btr-preparation',       name: '프리퍼레이션',        tier: 'normal' },
    { id: 'btr-ride-master',       name: '라이드 마스터',       tier: 'normal' },
    { id: 'btr-ride-maneuver',     name: '라이드 메뉴버',       tier: 'normal' },
    { id: 'btr-running-away',      name: '러닝 어웨이',         tier: 'normal' },
    { id: 'btr-horse-riding',      name: '호스 라이딩',         tier: 'eosheon' },
    { id: 'btr-rider',             name: '라이더',              tier: 'eosheon' },
  ] },
  { id: 'chushi', name: '츄시', accent: '#C87A20', skills: [
    { id: 'chs-doctor-chef',       name: '닥터 셰프',           tier: 'normal' },
    { id: 'chs-dumbwaiter',        name: '덤웨이터',            tier: 'normal' },
    { id: 'chs-recovery-food',     name: '리커버리 푸드',       tier: 'normal' },
    { id: 'chs-mariage',           name: '마리아쥬',            tier: 'normal' },
    { id: 'chs-master-chef',       name: '마스터 셰프',         tier: 'normal' },
    { id: 'chs-bargain-mastery',   name: '바겐 마스터리',       tier: 'normal' },
    { id: 'chs-chefs-hand',        name: '셰프스 핸드',         tier: 'normal' },
    { id: 'chs-soul-food',         name: '소울푸드',            tier: 'normal' },
    { id: 'chs-arrange-recipe',    name: '어레인지 레시피',     tier: 'normal' },
    { id: 'chs-elemental-chef',    name: '엘레멘탈 셰프',       tier: 'normal' },
    { id: 'chs-one-plate',         name: '원 플레이트',         tier: 'normal' },
    { id: 'chs-weak-food',         name: '위크푸드',            tier: 'normal' },
    { id: 'chs-instant-recipe',    name: '인스턴트 레시피',     tier: 'normal' },
    { id: 'chs-just-eating',       name: '저스트 이팅',         tier: 'normal' },
    { id: 'chs-create-food',       name: '크리에이트 푸드',     tier: 'normal' },
    { id: 'chs-turn-oil',          name: '턴오일',              tier: 'normal' },
    { id: 'chs-papaya',            name: '파파에이야',          tier: 'normal' },
    { id: 'chs-fast-eat',          name: '패스트 이트',         tier: 'normal' },
    { id: 'chs-poison-food',       name: '포이즌 푸드',         tier: 'normal' },
    { id: 'chs-food-recipe',       name: '푸드 레시피',         tier: 'normal' },
    { id: 'chs-food-mastery',      name: '푸드 마스터리',       tier: 'normal' },
    { id: 'chs-food-aroma',        name: '푸드 아로마',         tier: 'normal' },
    { id: 'chs-food-armor',        name: '푸드 아머',           tier: 'normal' },
    { id: 'chs-food-fight',        name: '푸드 파이트',         tier: 'normal' },
    { id: 'chs-elemental-chef-2',  name: '엘레멘탈 셰프 II',   tier: 'normal' },
    { id: 'chs-eating-now',        name: '이팅 나우',           tier: 'normal' },
    { id: 'chs-commercial',        name: '코먼셜',              tier: 'normal' },
    { id: 'chs-food-adept',        name: '푸드 어뎁트',         tier: 'normal' },
    { id: 'chs-food-trap',         name: '푸드 트랩',           tier: 'normal' },
    { id: 'chs-full-course',       name: '풀 코스',             tier: 'normal' },
    { id: 'chs-modern-spice',      name: '모던 스파이스',       tier: 'eosheon' },
    { id: 'chs-modern-food',       name: '모던 푸드',           tier: 'eosheon' },
  ] },
  { id: 'phalanx', name: '팔랑크스', accent: '#5A6878', skills: [
    { id: 'plx-guard-defense',     name: '가드 디펜스',         tier: 'normal' },
    { id: 'plx-defense-master',    name: '디펜스 마스터',       tier: 'normal' },
    { id: 'plx-run-over',          name: '런 오버',             tier: 'normal' },
    { id: 'plx-storm-guard',       name: '스톰 가드',           tier: 'normal' },
    { id: 'plx-shield-work',       name: '실드 워크',           tier: 'normal' },
    { id: 'plx-shield-pattern',    name: '실드 패턴',           tier: 'normal' },
    { id: 'plx-armor-adept',       name: '아머 어뎁트',         tier: 'normal' },
    { id: 'plx-iron-blow',         name: '아이언 블로',         tier: 'normal' },
    { id: 'plx-iron-armed',        name: '아이언 암드',         tier: 'normal' },
    { id: 'plx-iron-foot',         name: '아이언 풋',           tier: 'normal' },
    { id: 'plx-covering',          name: '커버링',              tier: 'normal' },
    { id: 'plx-iron-spirit',       name: '아이언 스피릿',       tier: 'normal' },
    { id: 'plx-iron-cover',        name: '아이언 커버',         tier: 'normal' },
    { id: 'plx-two-hand-pattern',  name: '투 핸드 패턴',        tier: 'normal' },
    { id: 'plx-phalanx-dive',      name: '팔랑크스 다이브',     tier: 'normal' },
    { id: 'plx-phalanx-mode',      name: '팔랑크스 모드',       tier: 'normal' },
    { id: 'plx-phalanx-style',     name: '팔랑크스 스타일',     tier: 'normal' },
    { id: 'plx-phalanx-attack',    name: '팔랑크스 어택',       tier: 'normal' },
    { id: 'plx-phalanx-charge',    name: '팔랑크스 차지',       tier: 'normal' },
    { id: 'plx-phalanx-counter',   name: '팔랑크스 카운터',     tier: 'normal' },
    { id: 'plx-phalanx-fort',      name: '팔랑크스 포트',       tier: 'normal' },
    { id: 'plx-hard-attack',       name: '하드 어택',           tier: 'normal' },
    { id: 'plx-hold-out',          name: '홀드 아웃',           tier: 'normal' },
    { id: 'plx-steal-guard',       name: '스틸 가드',           tier: 'normal' },
    { id: 'plx-ultimate-blow',     name: '얼티밋 블로',         tier: 'normal' },
    { id: 'plx-phalanx-block',     name: '팔랑크스 블록',       tier: 'normal' },
    { id: 'plx-phalanx-spell',     name: '팔랑크스 스펠',       tier: 'normal' },
    { id: 'plx-phalanx-arts',      name: '팔랑크스 아츠',       tier: 'normal' },
    { id: 'plx-phalanx-crash',     name: '팔랑크스 크래시',     tier: 'normal' },
    { id: 'plx-pattern-fighting',  name: '패턴 파이팅',         tier: 'normal' },
    { id: 'plx-power-suit-speed',  name: '파워 슈트: 스피드',   tier: 'eosheon' },
    { id: 'plx-power-suit-power',  name: '파워 슈트: 파워',     tier: 'eosheon' },
  ] },
  { id: 'forecaster', name: '포어캐스터', accent: '#4A4A8A', skills: [
    { id: 'fct-gambit',            name: '갬빗',                tier: 'normal' },
    { id: 'fct-grand-master',      name: '그랜드 마스터',       tier: 'normal' },
    { id: 'fct-discovered-guard',  name: '디스커버드: 가드',    tier: 'normal' },
    { id: 'fct-discovered-magic',  name: '디스커버드: 매직',    tier: 'normal' },
    { id: 'fct-discovered-attack', name: '디스커버드: 어택',    tier: 'normal' },
    { id: 'fct-double-check',      name: '더블 체크',           tier: 'normal' },
    { id: 'fct-luring',            name: '루어링',              tier: 'normal' },
    { id: 'fct-bad-move',          name: '배드 무브',           tier: 'normal' },
    { id: 'fct-bridge-sense',      name: '브리지 센스',         tier: 'normal' },
    { id: 'fct-blunder-move',      name: '블렌더 무브',         tier: 'normal' },
    { id: 'fct-stand-by',          name: '스탠 바이',           tier: 'normal' },
    { id: 'fct-strategium',        name: '스트라티지움',        tier: 'normal' },
    { id: 'fct-special-command',   name: '스페셜 커맨드',       tier: 'normal' },
    { id: 'fct-en-passant',        name: '앙 파상',             tier: 'normal' },
    { id: 'fct-outpost',           name: '아웃포스트',          tier: 'normal' },
    { id: 'fct-x-ray',             name: '엑스레이',            tier: 'normal' },
    { id: 'fct-checkmate',         name: '체크 메이트',         tier: 'normal' },
    { id: 'fct-castling',          name: '캐슬링',              tier: 'normal' },
    { id: 'fct-closed-game',       name: '클로즈 게임',         tier: 'normal' },
    { id: 'fct-tactical-play',     name: '택티컬 플레이',       tier: 'normal' },
    { id: 'fct-fast-pawn',         name: '패스트폰',            tier: 'normal' },
    { id: 'fct-perpetual-check',   name: '퍼페츄얼 체크',       tier: 'normal' },
    { id: 'fct-forced-move',       name: '퍼스드 무브',         tier: 'normal' },
    { id: 'fct-positional-play',   name: '포지셔널 플레이',     tier: 'normal' },
    { id: 'fct-promotion',         name: '프로모션',            tier: 'normal' },
    { id: 'fct-prophylaxis',       name: '프로필락시스',        tier: 'normal' },
    { id: 'fct-decoy-lure',        name: '디코이 루어',         tier: 'normal' },
    { id: 'fct-special-discovered',name: '스페셜 디스커버드',   tier: 'normal' },
    { id: 'fct-outplay',           name: '아웃플레이',          tier: 'normal' },
    { id: 'fct-transposition',     name: '트랜스포지션',        tier: 'normal' },
    { id: 'fct-game-maker',        name: '게임 메이커',         tier: 'eosheon' },
    { id: 'fct-modern-strategy',   name: '모던 스트래티지',     tier: 'eosheon' },
  ] },
  { id: 'preacher', name: '프리쳐', accent: '#7A4A9A', skills: [
    { id: 'prc-guard-aura',        name: '가드 오라',           tier: 'normal' },
    { id: 'prc-greed-force',       name: '그리드 포스',         tier: 'normal' },
    { id: 'prc-dragon-grow',       name: '드래곤 그로',         tier: 'normal' },
    { id: 'prc-dragon-roar',       name: '드래곤 로어',         tier: 'normal' },
    { id: 'prc-dragon-strike',     name: '드래곤 스트라이크',   tier: 'normal' },
    { id: 'prc-dragon-curse',      name: '드래곤 커스',         tier: 'normal' },
    { id: 'prc-distant-magic',     name: '디스턴트 매직',       tier: 'normal' },
    { id: 'prc-life-boost',        name: '라이프 부스트',       tier: 'normal' },
    { id: 'prc-master-luck',       name: '마스터 럭',           tier: 'normal' },
    { id: 'prc-mighty-arm',        name: '마이티 암',           tier: 'normal' },
    { id: 'prc-magic-breath',      name: '매직 브레스',         tier: 'normal' },
    { id: 'prc-magic-force',       name: '매직 포스',           tier: 'normal' },
    { id: 'prc-mental-treatment',  name: '멘탈 트리트먼트',     tier: 'normal' },
    { id: 'prc-summon-speech',     name: '서먼 스피치',         tier: 'normal' },
    { id: 'prc-soul-convert',      name: '소울 컨버트',         tier: 'normal' },
    { id: 'prc-speech-meeting',    name: '스피치 미팅',         tier: 'normal' },
    { id: 'prc-elemental-breed',   name: '엘레멘탈 브리드',     tier: 'normal' },
    { id: 'prc-willpower',         name: '윌파워',              tier: 'normal' },
    { id: 'prc-immunity',          name: '이뮤니티',            tier: 'normal' },
    { id: 'prc-endurance',         name: '인듀런스',            tier: 'normal' },
    { id: 'prc-connect-nerve',     name: '커넥트 너브',         tier: 'normal' },
    { id: 'prc-connect-dragon',    name: '커넥트 드래곤',       tier: 'normal' },
    { id: 'prc-connect-eye',       name: '커넥트 아이',         tier: 'normal' },
    { id: 'prc-connect-force',     name: '커넥트 포스',         tier: 'normal' },
    { id: 'prc-power-shout',       name: '파워 샤우트',         tier: 'normal' },
    { id: 'prc-force-strike',      name: '포스 스트라이크',     tier: 'normal' },
    { id: 'prc-fortune-guard',     name: '포춘 가드',           tier: 'normal' },
    { id: 'prc-great-connect',     name: '그레이트 커넥트',     tier: 'normal' },
    { id: 'prc-magic-control',     name: '매직 컨트롤',         tier: 'normal' },
    { id: 'prc-mental-master',     name: '멘탈 마스터',         tier: 'normal' },
    { id: 'prc-enter-dragon',      name: '엔터 드래곤',         tier: 'eosheon' },
    { id: 'prc-concentrate-feel',  name: '컨센트레이트 필',     tier: 'eosheon' },
  ] },
  { id: 'surrogate', name: '서로게이트', accent: '#C8A030', skills: [
    { id: 'srg-divine-magic',      name: '디바인 매직',         tier: 'normal' },
    { id: 'srg-divine-shot',       name: '디바인 슛',           tier: 'normal' },
    { id: 'srg-divine-smash',      name: '디바인 스매시',       tier: 'normal' },
    { id: 'srg-divine-stream',     name: '디바인 스트림',       tier: 'normal' },
    { id: 'srg-divine-caster',     name: '디바인 캐스터',       tier: 'normal' },
    { id: 'srg-divine-call',       name: '디바인 콜',           tier: 'normal' },
    { id: 'srg-double-call',       name: '더블 콜',             tier: 'normal' },
    { id: 'srg-defense-halo',      name: '디펜스 헤일로',       tier: 'normal' },
    { id: 'srg-writers-glory',     name: '라이터스 글로리',     tier: 'normal' },
    { id: 'srg-light-shot',        name: '라이트 슛',           tier: 'normal' },
    { id: 'srg-limit-release',     name: '리미트 릴리즈',       tier: 'normal' },
    { id: 'srg-revelation',        name: '리빌레이션',          tier: 'normal' },
    { id: 'srg-sonic-halo',        name: '소닉 헤일로',         tier: 'normal' },
    { id: 'srg-arms-mastery-summon',name:'암즈 마스터리: 소환구',tier: 'normal' },
    { id: 'srg-attack-halo',       name: '어택 헤일로',         tier: 'normal' },
    { id: 'srg-apostle-sword',     name: '어포슬: 소드',        tier: 'normal' },
    { id: 'srg-apostle-agent',     name: '어포슬: 에이전트',    tier: 'normal' },
    { id: 'srg-apostle-flame',     name: '어포슬: 플레임',      tier: 'normal' },
    { id: 'srg-unlimited-arms',    name: '언리미티드 암즈',     tier: 'normal' },
    { id: 'srg-illuminant-weapon', name: '일루미넌트 웨폰',     tier: 'normal' },
    { id: 'srg-change-call',       name: '체인지 콜',           tier: 'normal' },
    { id: 'srg-call-sleipnir',     name: '콜 슬레이프닐',       tier: 'normal' },
    { id: 'srg-halo-call',         name: '헤일로 콜',           tier: 'normal' },
    { id: 'srg-holy-veil',         name: '홀리 베일',           tier: 'normal' },
    { id: 'srg-holy-smite',        name: '홀리 스마이트',       tier: 'normal' },
    { id: 'srg-holy-feather',      name: '홀리 페더',           tier: 'normal' },
    { id: 'srg-divine-move',       name: '디바인 무브',         tier: 'normal' },
    { id: 'srg-light-caster',      name: '라이트 캐스터',       tier: 'normal' },
    { id: 'srg-justice-magic',     name: '저스티스 매직',       tier: 'normal' },
    { id: 'srg-true-smite',        name: '트루 스마이트',       tier: 'normal' },
    { id: 'srg-machinize',         name: '머신나이즈',          tier: 'eosheon' },
    { id: 'srg-spark-hit',         name: '스파크 히트',         tier: 'eosheon' },
  ] },
  { id: 'gardner', name: '가드너', accent: '#3A7A2A', skills: [
    { id: 'gdn-garden-cave',       name: '가든: 동굴',          tier: 'normal' },
    { id: 'gdn-garden-desert',     name: '가든: 사막',          tier: 'normal' },
    { id: 'gdn-garden-spring',     name: '가든: 샘',            tier: 'normal' },
    { id: 'gdn-garden-lava',       name: '가든: 용암',          tier: 'normal' },
    { id: 'gdn-garden-meadow',     name: '가든: 초원',          tier: 'normal' },
    { id: 'gdn-garden-wasteland',  name: '가든: 황야',          tier: 'normal' },
    { id: 'gdn-shangri-la',        name: '상그리라',            tier: 'normal' },
    { id: 'gdn-elysion',           name: '엘리시온',            tier: 'normal' },
    { id: 'gdn-keep-garden',       name: '킵 가든',             tier: 'normal' },
    { id: 'gdn-bramble-prison',    name: '브램블 프리즌',       tier: 'normal' },
    { id: 'gdn-green-thumb',       name: '그린 섬',             tier: 'normal' },
    { id: 'gdn-root-division',     name: '루트 디비전',         tier: 'normal' },
    { id: 'gdn-break-garden',      name: '브레이크 가든',       tier: 'normal' },
    { id: 'gdn-sharpness-garden',  name: '샤프니스 가든',       tier: 'normal' },
    { id: 'gdn-boost-garden',      name: '부스트 가든',         tier: 'normal' },
    { id: 'gdn-therapist-garden',  name: '세라피스트 가든',     tier: 'normal' },
    { id: 'gdn-shake-garden',      name: '세이크 가든',         tier: 'normal' },
    { id: 'gdn-shield-garden',     name: '실드 가든',           tier: 'normal' },
    { id: 'gdn-architecture',      name: '아키텍쳐',            tier: 'normal' },
    { id: 'gdn-alchemical-circle', name: '알케미컬 서클',       tier: 'normal' },
    { id: 'gdn-element-garden',    name: '엘레멘트 가든',       tier: 'normal' },
    { id: 'gdn-extend-garden',     name: '익스텐드 가든',       tier: 'normal' },
    { id: 'gdn-catcher-garden',    name: '캐쳐 가든',           tier: 'normal' },
    { id: 'gdn-crash-garden',      name: '크래시 가든',         tier: 'normal' },
    { id: 'gdn-twine-garden',      name: '트와인 가든',         tier: 'normal' },
    { id: 'gdn-powerful-garden',   name: '파워풀 가든',         tier: 'normal' },
    { id: 'gdn-healing-garden',    name: '힐링 가든',           tier: 'normal' },
    { id: 'gdn-living-garden',     name: '리빙 가든',           tier: 'normal' },
    { id: 'gdn-magicians-garden',  name: '매지션즈 가든',       tier: 'normal' },
    { id: 'gdn-protect-garden',    name: '프로텍트 가든',       tier: 'normal' },
    { id: 'gdn-agriculture',       name: '애그리컬쳐',          tier: 'eosheon' },
    { id: 'gdn-kitchen-garden',    name: '키친 가든',           tier: 'eosheon' },
  ] },
  { id: 'ruinator', name: '루이네이터', accent: '#6A2A8A', skills: [
    { id: 'rnt-nightroad',         name: '나이트로드',          tier: 'normal' },
    { id: 'rnt-darkness-shot',     name: '다크니스 슛',         tier: 'normal' },
    { id: 'rnt-mind-rover',        name: '마인드 로버',         tier: 'normal' },
    { id: 'rnt-miasma-bind',       name: '미아즈마 바인드',     tier: 'normal' },
    { id: 'rnt-miasma-buster',     name: '미아즈마 버스터',     tier: 'normal' },
    { id: 'rnt-miasma-boost',      name: '미아즈마 부스트',     tier: 'normal' },
    { id: 'rnt-miasma-weapon',     name: '미아즈마 웨폰',       tier: 'normal' },
    { id: 'rnt-miasma-pact',       name: '미아즈마 팩트',       tier: 'normal' },
    { id: 'rnt-miasma-field',      name: '미아즈마 필드',       tier: 'normal' },
    { id: 'rnt-bad-fortune',       name: '배드 포춘',           tier: 'normal' },
    { id: 'rnt-vaccination',       name: '백시네이션',          tier: 'normal' },
    { id: 'rnt-stampede',          name: '스탬피드',            tier: 'normal' },
    { id: 'rnt-speedstar',         name: '스피드스타',          tier: 'normal' },
    { id: 'rnt-undead-life',       name: '언데드 라이프',       tier: 'normal' },
    { id: 'rnt-engraved',          name: '인그레이브드',        tier: 'normal' },
    { id: 'rnt-compensation',      name: '컴퍼제이션',          tier: 'normal' },
    { id: 'rnt-create-option',     name: '크리에이트 옵션',     tier: 'normal' },
    { id: 'rnt-trans-longarm',     name: '트란스: 롱암',        tier: 'normal' },
    { id: 'rnt-trans-beast',       name: '트란스: 비스트',      tier: 'normal' },
    { id: 'rnt-trans-shade',       name: '트란스: 세이드',      tier: 'normal' },
    { id: 'rnt-trans-scale',       name: '트란스: 스케일',      tier: 'normal' },
    { id: 'rnt-trans-evil-eye',    name: '트란스: 이블아이',    tier: 'normal' },
    { id: 'rnt-trans-giant',       name: '트란스: 자이언트',    tier: 'normal' },
    { id: 'rnt-trans-feather',     name: '트란스: 페더',        tier: 'normal' },
    { id: 'rnt-piercing-miasma',   name: '피어싱 마이즈마',     tier: 'normal' },
    { id: 'rnt-darkness-caster',   name: '다크니스 캐스터',     tier: 'normal' },
    { id: 'rnt-miasma-blast',      name: '미아즈마 블래스트',   tier: 'normal' },
    { id: 'rnt-soul-field',        name: '소울 필드',           tier: 'normal' },
    { id: 'rnt-another-life',      name: '어나더 라이프',       tier: 'normal' },
    { id: 'rnt-breaker-brand',     name: '브레이커 브랜드',     tier: 'normal' },
    { id: 'rnt-curse-energy',      name: '커스 에너지',         tier: 'eosheon' },
    { id: 'rnt-bad-eye',           name: '배드 아이',           tier: 'eosheon' },
  ] },
  { id: 'hunter', name: '헌터', accent: '#6A4A20', skills: [
    { id: 'htr-gigant-weapon',     name: '기간트 웨폰',         tier: 'normal' },
    { id: 'htr-dynamic-guard',     name: '다이나믹 가드',       tier: 'normal' },
    { id: 'htr-break-cross',       name: '브레이크 크로스',     tier: 'normal' },
    { id: 'htr-survival-style',    name: '서바이벌 스타일',     tier: 'normal' },
    { id: 'htr-survival-adept',    name: '서바이벌 어뎁트',     tier: 'normal' },
    { id: 'htr-special-blocker',   name: '스페셜 블로커',       tier: 'normal' },
    { id: 'htr-perfect-blocker',   name: '퍼펙트 블로커',       tier: 'normal' },
    { id: 'htr-arms-mastery-hunt', name: '암즈 마스터리: 수렵', tier: 'normal' },
    { id: 'htr-ambush-hand',       name: '앰부쉬 핸드',         tier: 'normal' },
    { id: 'htr-wild-power',        name: '와일드 파워',         tier: 'normal' },
    { id: 'htr-combat-style',      name: '컴뱃 스타일',         tier: 'normal' },
    { id: 'htr-corner-hand',       name: '코너 핸드',           tier: 'normal' },
    { id: 'htr-quick-prepare',     name: '퀵 프리페어',         tier: 'normal' },
    { id: 'htr-craftwork',         name: '크래프트워크',        tier: 'normal' },
    { id: 'htr-tier-off',          name: '티어 오프',           tier: 'normal' },
    { id: 'htr-fatal-hunt',        name: '페이탈 헌트',         tier: 'normal' },
    { id: 'htr-fracture',          name: '프랙쳐',              tier: 'normal' },
    { id: 'htr-hunter-life',       name: '헌터 라이프',         tier: 'normal' },
    { id: 'htr-hunter-weapon',     name: '헌터 웨폰',           tier: 'normal' },
    { id: 'htr-hunters-hand',      name: '헌터즈 핸드',         tier: 'normal' },
    { id: 'htr-hunting-mastery',   name: '헌팅 마스터리',       tier: 'normal' },
    { id: 'htr-hunting-move',      name: '헌팅 무브',           tier: 'normal' },
    { id: 'htr-hunting-set',       name: '헌팅 세트',           tier: 'normal' },
    { id: 'htr-hunting-style',     name: '헌팅 스타일',         tier: 'normal' },
    { id: 'htr-hunting-adept',     name: '헌팅 어뎁트',         tier: 'normal' },
    { id: 'htr-hunting-chance',    name: '헌팅 찬스',           tier: 'normal' },
    { id: 'htr-great-rank',        name: '그래이트 랭크',       tier: 'normal' },
    { id: 'htr-unique-weapon',     name: '유니크 웨폰',         tier: 'normal' },
    { id: 'htr-hunters-wit',       name: '헌터즈 위트',         tier: 'normal' },
    { id: 'htr-heavy-hunt',        name: '헤비 헌트',           tier: 'normal' },
    { id: 'htr-collectmata',       name: '콜렉트마타',          tier: 'eosheon' },
    { id: 'htr-chain-attack',      name: '체인 어택',           tier: 'eosheon' },
  ] },
  { id: 'militant', name: '밀리턴트(레거시)', accent: '#5A7A9A', skills: [
    { id: 'mlt-arms-mastery',      name: '암즈 마스터리',       tier: 'normal' },
    { id: 'mlt-weapon-tactical',   name: '웨폰 택티컬',         tier: 'normal' },
    { id: 'mlt-reverse-life',      name: '리버스 라이프',       tier: 'normal' },
    { id: 'mlt-impact-blow',       name: '임팩트 블로우',       tier: 'normal' },
    { id: 'mlt-aura-shield',       name: '아우라 실드',         tier: 'normal' },
    { id: 'mlt-rush-n-rush',       name: '러시 앤 러시',        tier: 'normal' },
    { id: 'mlt-dodge-edge',        name: '닷지 에지',           tier: 'normal' },
    { id: 'mlt-precision',         name: '프리시전',            tier: 'normal' },
    { id: 'mlt-pain-edge',         name: '페인 에지',           tier: 'normal' },
    { id: 'mlt-swift-sword',       name: '스위프트 소드',       tier: 'normal' },
    { id: 'mlt-sword-excel',       name: '소드 엑셀',           tier: 'normal' },
    { id: 'mlt-buster-sword',      name: '버스터 소드',         tier: 'normal' },
    { id: 'mlt-energy-slash',      name: '에너지 슬러시',       tier: 'normal' },
    { id: 'mlt-fort-blade',        name: '포트 블레이드',       tier: 'normal' },
    { id: 'mlt-blade-blast',       name: '블레이드 블래스트',   tier: 'normal' },
    { id: 'mlt-ex-bomber',         name: '엑스 봄버',           tier: 'normal' },
    { id: 'mlt-dynamic-dash',      name: '다이나믹 대시',       tier: 'normal' },
    { id: 'mlt-fast-ex',           name: '패스트 엑스',         tier: 'normal' },
    { id: 'mlt-soul-shock',        name: '소울 쇼크',           tier: 'normal' },
    { id: 'mlt-buster-swing',      name: '버스터 스윙',         tier: 'normal' },
    { id: 'mlt-healing-strike',    name: '힐링 스트라이크',     tier: 'normal' },
    { id: 'mlt-jump-shift',        name: '점프 시프트',         tier: 'normal' },
    { id: 'mlt-spear-pressure',    name: '스피어 프레셔',       tier: 'normal' },
    { id: 'mlt-pinpoint-thrust',   name: '핀포인트 드러스트',   tier: 'normal' },
    { id: 'mlt-whip-cage',         name: '윕 케이지',           tier: 'normal' },
    { id: 'mlt-whip-rave',         name: '윕 레이브',           tier: 'normal' },
    { id: 'mlt-pain-bind',         name: '페인 바인드',         tier: 'normal' },
    { id: 'mlt-guard-arrow',       name: '가드 애로',           tier: 'normal' },
    { id: 'mlt-foresee',           name: '포어시',              tier: 'normal' },
    { id: 'mlt-million-shot',      name: '밀리언 샷',           tier: 'normal' },
    { id: 'mlt-aura-blade',        name: '아우라 블레이드',     tier: 'normal' },
    { id: 'mlt-kick-assault',      name: '킥 어썰트',           tier: 'normal' },
    { id: 'mlt-stance-rush',       name: '스탠스 러시',         tier: 'normal' },
    { id: 'mlt-snipe',             name: '스나이프',            tier: 'normal' },
    { id: 'mlt-charge-shot',       name: '차지 샷',             tier: 'normal' },
    { id: 'mlt-barrage',           name: '바라주',              tier: 'normal' },
    { id: 'mlt-gunfu',             name: '건후',                tier: 'normal' },
    { id: 'mlt-recoil-control',    name: '리코일 컨트롤',       tier: 'normal' },
    { id: 'mlt-long-shot',         name: '롱 쇼트',             tier: 'normal' },
    { id: 'mlt-aura-battle',       name: '오라 배틀',           tier: 'normal' },
    { id: 'mlt-shine-aura',        name: '사인 오라',           tier: 'normal' },
    { id: 'mlt-repairwork',        name: '리페어워크',          tier: 'normal' },
    { id: 'mlt-weapon-armed',      name: '웨폰 암드',           tier: 'normal' },
    { id: 'mlt-weapon-wing',       name: '웨폰 윙',             tier: 'normal' },
    { id: 'mlt-weapon-regain',     name: '웨폰 리게인',         tier: 'normal' },
  ] },
  { id: 'contractor', name: '컨트렉터(레거시)', accent: '#7A5A9A', skills: [
    { id: 'ctr-contract',          name: '컨트랙트',            tier: 'normal' },
    { id: 'ctr-contract-mastery',  name: '컨트랙트 마스터리',   tier: 'normal' },
    { id: 'ctr-chant-contract',    name: '체인트 컨트랙트',     tier: 'normal' },
    { id: 'ctr-valkyrie-charge',   name: '발키리 차지',         tier: 'normal' },
    { id: 'ctr-valkyrie-smash',    name: '발키리 스매시',       tier: 'normal' },
    { id: 'ctr-mirage-force',      name: '미라주 포스',         tier: 'normal' },
    { id: 'ctr-trick-bomb',        name: '트릭봄',              tier: 'normal' },
    { id: 'ctr-lantern-bomb',      name: '랜턴봄',              tier: 'normal' },
    { id: 'ctr-lantern-mischief',  name: '랜턴 미스 치프',      tier: 'normal' },
    { id: 'ctr-assist-light',      name: '어시스트 라이트',     tier: 'normal' },
    { id: 'ctr-sprite-force',      name: '스프라이트 포스',     tier: 'normal' },
    { id: 'ctr-magic-link',        name: '매직 링크',           tier: 'normal' },
    { id: 'ctr-dynasty-guard',     name: '디나시 가드',         tier: 'normal' },
    { id: 'ctr-round-guard',       name: '라운드 가드',         tier: 'normal' },
    { id: 'ctr-dynasty-block',     name: '디나시 블록',         tier: 'normal' },
    { id: 'ctr-trap-knock',        name: '트랩 노크',           tier: 'normal' },
    { id: 'ctr-trap-release',      name: '트랩 릴리스',         tier: 'normal' },
    { id: 'ctr-knocker-follow',    name: '노커 팔로우',         tier: 'normal' },
    { id: 'ctr-pixie-heal',        name: '픽시 힐',             tier: 'normal' },
    { id: 'ctr-flower-fragrance',  name: '플라워 프레이그런스', tier: 'normal' },
    { id: 'ctr-pixie-flower',      name: '픽시 플라워',         tier: 'normal' },
    { id: 'ctr-fairy-wind',        name: '페어리 윈드',         tier: 'normal' },
    { id: 'ctr-fairy-support',     name: '페어리 서포트',       tier: 'normal' },
    { id: 'ctr-fairy-blast',       name: '페어리 블래스트',     tier: 'normal' },
    { id: 'ctr-lenanshee-song',    name: '라난시 송',           tier: 'normal' },
    { id: 'ctr-lenanshee-lute',    name: '라난시 류트',         tier: 'normal' },
    { id: 'ctr-lenanshee-recital', name: '라난시 리사이틀',     tier: 'normal' },
  ] },
  { id: 'warlock', name: '워록(레거시)', accent: '#6A2080', skills: [
    { id: 'wlk-elemental-weapon',  name: '엘레멘탈 웨폰',       tier: 'normal' },
    { id: 'wlk-great-elemental',   name: '그레이트 엘레멘탈',   tier: 'normal' },
    { id: 'wlk-double-elemental',  name: '더블 엘레멘탈',       tier: 'normal' },
    { id: 'wlk-elemental-guard',   name: '엘레멘탈 가드',       tier: 'normal' },
    { id: 'wlk-sword-magic',       name: '소드 매직',           tier: 'normal' },
    { id: 'wlk-chain-magic',       name: '체인 매직',           tier: 'normal' },
    { id: 'wlk-fast-sign',         name: '패스트 사인',         tier: 'normal' },
    { id: 'wlk-forward-move',      name: '포워드 무브',         tier: 'normal' },
    { id: 'wlk-magic-follow',      name: '매직 팔로우',         tier: 'normal' },
    { id: 'wlk-stone-corps',       name: '스톤 카프스',         tier: 'normal' },
    { id: 'wlk-spike-shoot',       name: '스파이크 슛',         tier: 'normal' },
    { id: 'wlk-boost-sign',        name: '부스트 사인',         tier: 'normal' },
    { id: 'wlk-break-guard',       name: '브레이크 가드',       tier: 'normal' },
    { id: 'wlk-vortex-forge',      name: '보텍스 포지',         tier: 'normal' },
    { id: 'wlk-liquid-sign',       name: '리퀴드 사인',         tier: 'normal' },
    { id: 'wlk-over-heat',         name: '오버 히트',           tier: 'normal' },
    { id: 'wlk-trap-sign',         name: '트랩 사인',           tier: 'normal' },
    { id: 'wlk-melt-armor',        name: '멜트 아머',           tier: 'normal' },
    { id: 'wlk-over-wind',         name: '오버 윈드',           tier: 'normal' },
    { id: 'wlk-cyclone-sign',      name: '사이클론 사인',       tier: 'normal' },
    { id: 'wlk-strong-wind',       name: '스트롱 윈드',         tier: 'normal' },
    { id: 'wlk-guide-sign',        name: '가이드 사인',         tier: 'normal' },
    { id: 'wlk-flash-summing',     name: '플래시 서밍',         tier: 'normal' },
    { id: 'wlk-ray-focus',         name: '레이 포커스',         tier: 'normal' },
    { id: 'wlk-black-needle',      name: '블랙 니들',           tier: 'normal' },
    { id: 'wlk-heavy-dark',        name: '해비 다크',           tier: 'normal' },
    { id: 'wlk-long-shadow',       name: '롱 새도우',           tier: 'normal' },
  ] },
  { id: 'fortunate', name: '포츄네이트(레거시)', accent: '#C0A030', skills: [
    { id: 'ftn-arcana',            name: '아르카나',            tier: 'normal' },
    { id: 'ftn-card-boost',        name: '카드 부스트',         tier: 'normal' },
    { id: 'ftn-card-master',       name: '카드 마스터',         tier: 'normal' },
    { id: 'ftn-glory-draw',        name: '글로리 드로우',       tier: 'normal' },
    { id: 'ftn-shuffle',           name: '셔플',                tier: 'normal' },
    { id: 'ftn-double-draw',       name: '더블 드로우',         tier: 'normal' },
    { id: 'ftn-tension-up',        name: '텐션 업',             tier: 'normal' },
    { id: 'ftn-reserve',           name: '리저브',              tier: 'normal' },
    { id: 'ftn-reverse-card',      name: '리버스 카드',         tier: 'normal' },
  ] },
  { id: 'warlord', name: '워로드(상급)', accent: '#A02828', skills: [
    { id: 'wld-great-burst',       name: '그레이트 버스트',     tier: 'normal' },
    { id: 'wld-desperado',         name: '데스페라도',          tier: 'normal' },
    { id: 'wld-defense-line',      name: '디펜스 라인',         tier: 'normal' },
    { id: 'wld-balance-break',     name: '밸런스 브레이크',     tier: 'normal' },
    { id: 'wld-melt-down',         name: '멜트 다운',           tier: 'normal' },
    { id: 'wld-violent-hit',       name: '바이올런트 히트',     tier: 'normal' },
    { id: 'wld-battle-complete',   name: '배틀 컴플리트',       tier: 'normal' },
    { id: 'wld-burst-slash',       name: '버스트 슬래시',       tier: 'normal' },
    { id: 'wld-break-down',        name: '브레이크 다운',       tier: 'normal' },
    { id: 'wld-blood-hit',         name: '블러드 히트',         tier: 'normal' },
    { id: 'wld-build-up-force',    name: '빌드 업 포스',        tier: 'normal' },
    { id: 'wld-storm-attack',      name: '스톰 어택',           tier: 'normal' },
    { id: 'wld-struggle-crash',    name: '스트러글 크래시',     tier: 'normal' },
    { id: 'wld-arms-logic',        name: '암즈 로직',           tier: 'normal' },
    { id: 'wld-over-drive',        name: '오버 드라이브',       tier: 'normal' },
    { id: 'wld-war-cry',           name: '워 크라이',           tier: 'normal' },
    { id: 'wld-weapon-balance',    name: '웨폰 밸런스',         tier: 'normal' },
    { id: 'wld-cross-slash',       name: '크로스 슬래시',       tier: 'normal' },
    { id: 'wld-close-combat',      name: '클로즈 컴뱃',         tier: 'normal' },
    { id: 'wld-twin-weapon',       name: '트윈 웨폰',           tier: 'normal' },
    { id: 'wld-fighting-law',      name: '파이팅 로',           tier: 'normal' },
    { id: 'wld-first-set',         name: '퍼스트 세트',         tier: 'normal' },
    { id: 'wld-perfect-body',      name: '퍼펙트 바디',         tier: 'normal' },
    { id: 'wld-full-swing',        name: '풀 스윙',             tier: 'normal' },
    { id: 'wld-twin-arts',         name: '트윈 아츠',           tier: 'normal' },
    { id: 'wld-high-voltage',      name: '하이 볼티지',         tier: 'normal' },
    { id: 'wld-death-bound',       name: '데스바운드',          tier: 'normal' },
    { id: 'wld-ultimate-body',     name: '얼티메이트 바디',     tier: 'normal' },
    { id: 'wld-clock-up-force',    name: '클록 업 포스',        tier: 'normal' },
    { id: 'wld-hyper-gain',        name: '하이퍼 게인',         tier: 'normal' },
  ] },
  { id: 'knight', name: '나이트(상급)', accent: '#4A6A9A', skills: [
    { id: 'knt-grandeur',          name: '그란디어',            tier: 'normal' },
    { id: 'knt-gladiate',          name: '글라디에이트',        tier: 'normal' },
    { id: 'knt-riding',            name: '라이딩',              tier: 'normal' },
    { id: 'knt-rush',              name: '러시',                tier: 'normal' },
    { id: 'knt-red-rug',           name: '레드 러그',           tier: 'normal' },
    { id: 'knt-mighty-slash',      name: '마이티 슬래시',       tier: 'normal' },
    { id: 'knt-boost-dash',        name: '부스트 대시',         tier: 'normal' },
    { id: 'knt-break-slash',       name: '브레이크 슬래시',     tier: 'normal' },
    { id: 'knt-stand-tough',       name: '스탠드 터프',         tier: 'normal' },
    { id: 'knt-steelclad',         name: '스틸클래드',          tier: 'normal' },
    { id: 'knt-special-cover',     name: '스페셜 커버',         tier: 'normal' },
    { id: 'knt-shield-rush',       name: '실드 러시',           tier: 'normal' },
    { id: 'knt-shield-horse',      name: '실드 호스',           tier: 'normal' },
    { id: 'knt-around-cover',      name: '어라운드 커버',       tier: 'normal' },
    { id: 'knt-attack-charge',     name: '어택 차지',           tier: 'normal' },
    { id: 'knt-weapon-expert',     name: '웨폰 익스퍼트',       tier: 'normal' },
    { id: 'knt-invulnerable',      name: '인버러너블',          tier: 'normal' },
    { id: 'knt-close-shield',      name: '클로즈 실드',         tier: 'normal' },
    { id: 'knt-power-arm',         name: '파워 암',             tier: 'normal' },
    { id: 'knt-final-guard',       name: '파이널 가드',         tier: 'normal' },
    { id: 'knt-perfect-shield',    name: '퍼펙트 실드',         tier: 'normal' },
    { id: 'knt-fortress',          name: '포트리스',            tier: 'normal' },
    { id: 'knt-frontal-assault',   name: '프론탈 어설트',       tier: 'normal' },
    { id: 'knt-field-battler',     name: '필드 배틀러',         tier: 'normal' },
    { id: 'knt-hyper-shield',      name: '하이퍼 실드',         tier: 'normal' },
    { id: 'knt-heavy-attack',      name: '헤비 어택',           tier: 'normal' },
    { id: 'knt-horse-battler',     name: '호스 배틀러',         tier: 'normal' },
    { id: 'knt-sagittarius',       name: '사지타리우스',        tier: 'normal' },
    { id: 'knt-aggrandize',        name: '어그란다이즈',        tier: 'normal' },
    { id: 'knt-impregnable',       name: '인프래그너블',        tier: 'normal' },
  ] },
  { id: 'paladin', name: '팔라딘(상급)', accent: '#C8B040', skills: [
    { id: 'pld-go-slow',           name: '고 슬로우',           tier: 'normal' },
    { id: 'pld-grace-force',       name: '그레이스 포스',       tier: 'normal' },
    { id: 'pld-dignity',           name: '디그니티',            tier: 'normal' },
    { id: 'pld-religious',         name: '렐리기아스',          tier: 'normal' },
    { id: 'pld-mighty-strike',     name: '마이티 스트라이크',   tier: 'normal' },
    { id: 'pld-banish-power',      name: '배니시 파워',         tier: 'normal' },
    { id: 'pld-sanction',          name: '생선',                tier: 'normal' },
    { id: 'pld-shine-strike',      name: '사인 스트라이크',     tier: 'normal' },
    { id: 'pld-self-sacrifice',    name: '셀프 세크리파이스',   tier: 'normal' },
    { id: 'pld-oath',              name: '오스',                tier: 'normal' },
    { id: 'pld-wide-protection',   name: '와이드 프로텍션',     tier: 'normal' },
    { id: 'pld-wish',              name: '위시',                tier: 'normal' },
    { id: 'pld-imperative',        name: '임페라티브',          tier: 'normal' },
    { id: 'pld-judge-attack',      name: '저지 어택',           tier: 'normal' },
    { id: 'pld-command-style',     name: '커맨드 스타일',       tier: 'normal' },
    { id: 'pld-crash-impact',      name: '크래시 임팩트',       tier: 'normal' },
    { id: 'pld-turn-undead',       name: '턴 언데드',           tier: 'normal' },
    { id: 'pld-punisher',          name: '퍼니셔',              tier: 'normal' },
    { id: 'pld-full-hit',          name: '풀 히트',             tier: 'normal' },
    { id: 'pld-flash-blink',       name: '플래시 블링크',       tier: 'normal' },
    { id: 'pld-high-dignity',      name: '하이 디그니티',       tier: 'normal' },
    { id: 'pld-holy-attack',       name: '홀리 어택',           tier: 'normal' },
    { id: 'pld-holy-field',        name: '홀리 필드',           tier: 'normal' },
    { id: 'pld-holy-hit',          name: '홀리 히트',           tier: 'normal' },
    { id: 'pld-divide',            name: '디바이드',            tier: 'normal' },
    { id: 'pld-restoration',       name: '레스토레이션',        tier: 'normal' },
    { id: 'pld-exorcism',          name: '엑소시즘',            tier: 'normal' },
    { id: 'pld-evil-banish',       name: '이블 배니시',         tier: 'normal' },
    { id: 'pld-field-protection',  name: '필드 프로텍션',       tier: 'normal' },
    { id: 'pld-high-punisher',     name: '하이 퍼니셔',         tier: 'normal' },
  ] },
  { id: 'priest', name: '프리스트(상급)', accent: '#8A60C0', skills: [
    { id: 'pst-god-force',         name: '갓 포스',             tier: 'normal' },
    { id: 'pst-glory-divine',      name: '글로리 디바인',       tier: 'normal' },
    { id: 'pst-dark-star',         name: '다크 스타',           tier: 'normal' },
    { id: 'pst-dark-weave',        name: '다크 위브',           tier: 'normal' },
    { id: 'pst-lightning-orb',     name: '라이트닝 오브',       tier: 'normal' },
    { id: 'pst-retribution',       name: '레트리뷰션',          tier: 'normal' },
    { id: 'pst-resurrection',      name: '리저렉션',            tier: 'normal' },
    { id: 'pst-mana-mastery',      name: '마나 마스터리',       tier: 'normal' },
    { id: 'pst-magic-circle',      name: '매직 서클',           tier: 'normal' },
    { id: 'pst-multi-cast',        name: '멀티 캐스트',         tier: 'normal' },
    { id: 'pst-barrier',           name: '배리어',              tier: 'normal' },
    { id: 'pst-barrier-field',     name: '배리어 필드',         tier: 'normal' },
    { id: 'pst-battle-heal',       name: '배틀 힐',             tier: 'normal' },
    { id: 'pst-void-circle',       name: '보이드 마법진',       tier: 'normal' },
    { id: 'pst-soul-shield',       name: '소울 실드',           tier: 'normal' },
    { id: 'pst-spear-magic',       name: '스피어 매직',         tier: 'normal' },
    { id: 'pst-earthquake',        name: '어스 퀘이크',         tier: 'normal' },
    { id: 'pst-energy-orb',        name: '에너지 오브',         tier: 'normal' },
    { id: 'pst-ever-shield',       name: '에버 실드',           tier: 'normal' },
    { id: 'pst-walk-of-god',       name: '워크 오브 갓',        tier: 'normal' },
    { id: 'pst-imperial-divine',   name: '임페리얼 디바인',     tier: 'normal' },
    { id: 'pst-evangelism',        name: '전도',                tier: 'normal' },
    { id: 'pst-chase-mage',        name: '체이스 메이지',       tier: 'normal' },
    { id: 'pst-two-cast',          name: '투 캐스트',           tier: 'normal' },
    { id: 'pst-triple-cast',       name: '트리플 캐스트',       tier: 'normal' },
    { id: 'pst-power-barrier',     name: '파워 배리어',         tier: 'normal' },
    { id: 'pst-passive-soul',      name: '패시브 소울',         tier: 'normal' },
    { id: 'pst-full-cast',         name: '풀 커스트',           tier: 'normal' },
    { id: 'pst-holy-war',          name: '홀리 워',             tier: 'normal' },
    { id: 'pst-heal-mastery',      name: '힐 마스터',           tier: 'normal' },
  ] },
  { id: 'wizard', name: '위저드(상급)', accent: '#4878C0', skills: [
    { id: 'wzd-dual-effect',       name: '듀얼 이펙트',         tier: 'normal' },
    { id: 'wzd-long-spell',        name: '롱 스펠',             tier: 'normal' },
    { id: 'wzd-magic-edge',        name: '매직 에지',           tier: 'normal' },
    { id: 'wzd-magic-experience',  name: '매직 익스피리언스',   tier: 'normal' },
    { id: 'wzd-midnight-sun',      name: '미드나이트 선',       tier: 'normal' },
    { id: 'wzd-boost-enchant',     name: '부스트 인첸트',       tier: 'normal' },
    { id: 'wzd-blindfold',         name: '블라인드폴드',        tier: 'normal' },
    { id: 'wzd-snatch',            name: '스내치',              tier: 'normal' },
    { id: 'wzd-swift-weapon',      name: '스위프트 웨폰',       tier: 'normal' },
    { id: 'wzd-armor-down',        name: '아머 다운',           tier: 'normal' },
    { id: 'wzd-avenge',            name: '어벤지',              tier: 'normal' },
    { id: 'wzd-enchant-weapon-l',  name: '인첸트 웨폰: 광',     tier: 'normal' },
    { id: 'wzd-enchant-weapon-d',  name: '인첸트 웨폰: 암',     tier: 'normal' },
    { id: 'wzd-increase-device',   name: '인크리즈 디바이스',   tier: 'normal' },
    { id: 'wzd-charge-magic',      name: '차지 매직',           tier: 'normal' },
    { id: 'wzd-cheat-magic',       name: '치트 매직',           tier: 'normal' },
    { id: 'wzd-counter-spell',     name: '카운터 스펠',         tier: 'normal' },
    { id: 'wzd-spell-break',       name: '스펠 브레이크',       tier: 'normal' },
    { id: 'wzd-master-magic',      name: '마스터 매직',         tier: 'normal' },
    { id: 'wzd-material-component-2', name: '매터리얼 컴퍼넌트 II', tier: 'normal' },
    { id: 'wzd-shadow-spear',      name: '섀도 스피어',         tier: 'normal' },
    { id: 'wzd-celestial-star',    name: '셀레스티얼 스타',     tier: 'normal' },
    { id: 'wzd-inferno',           name: '인페르노',            tier: 'normal' },
    { id: 'wzd-cocytus',           name: '코퀴토스',            tier: 'normal' },
    { id: 'wzd-quake',             name: '퀘이크',              tier: 'normal' },
    { id: 'wzd-tempest',           name: '템페스트',            tier: 'normal' },
    { id: 'wzd-double-phase',      name: '더블 페이지',         tier: 'normal' },
    { id: 'wzd-ruin-storm',        name: '루인 스톰',           tier: 'normal' },
    { id: 'wzd-frost-prism',       name: '프로스트 프리즘',     tier: 'normal' },
    { id: 'wzd-flame-crack',       name: '플레임 크랙',         tier: 'normal' },
  ] },
  { id: 'sorcerer', name: '소서러(상급)', accent: '#B84040', skills: [
    { id: 'src-negate',            name: '니게이트',            tier: 'normal' },
    { id: 'src-double-cast',       name: '더블 캐스트',         tier: 'normal' },
    { id: 'src-demons-web',        name: '데몬즈 웹',           tier: 'normal' },
    { id: 'src-dispel',            name: '디스펠',              tier: 'normal' },
    { id: 'src-running-set',       name: '러닝 세트',           tier: 'normal' },
    { id: 'src-rainbow-killer',    name: '레인보우 킬러',       tier: 'normal' },
    { id: 'src-limit-break',       name: '리미트 브레이크',     tier: 'normal' },
    { id: 'src-riposte-pain',      name: '리포스트 페인',       tier: 'normal' },
    { id: 'src-material-attack',   name: '매터리얼 어택',       tier: 'normal' },
    { id: 'src-variant-magic',     name: '바리언트 매직',       tier: 'normal' },
    { id: 'src-void-magic',        name: '보이드 매직',         tier: 'normal' },
    { id: 'src-boost-force',       name: '부스트 포스',         tier: 'normal' },
    { id: 'src-soul-steal',        name: '소울 스틸',           tier: 'normal' },
    { id: 'src-shift-energy',      name: '시프트 에너지',       tier: 'normal' },
    { id: 'src-amplification',     name: '앰플리피케이션',      tier: 'normal' },
    { id: 'src-aiming-poise',      name: '에이밍 포지',         tier: 'normal' },
    { id: 'src-all-weapon',        name: '올 웨폰',             tier: 'normal' },
    { id: 'src-economy-magic',     name: '이코노미 매직',       tier: 'normal' },
    { id: 'src-curse-spell',       name: '커스 스펠',           tier: 'normal' },
    { id: 'src-boost-curse',       name: '부스트 커스',         tier: 'normal' },
    { id: 'src-condense',          name: '컨덴스',              tier: 'normal' },
    { id: 'src-convert',           name: '컨버트',              tier: 'normal' },
    { id: 'src-crazy-barrier',     name: '크래시 배리어',       tier: 'normal' },
    { id: 'src-paralyze-pain',     name: '패럴라이즈 페인',     tier: 'normal' },
    { id: 'src-fast-draw',         name: '패스트 드로',         tier: 'normal' },
    { id: 'src-poise-charge',      name: '포지 차지',           tier: 'normal' },
    { id: 'src-high-expert',       name: '하이 익스퍼트',       tier: 'normal' },
    { id: 'src-set-off-guard',     name: '셋 오프 가드',        tier: 'normal' },
    { id: 'src-aggressive-magic',  name: '어그레시브 매직',     tier: 'normal' },
    { id: 'src-fine-art',          name: '파인 아트',           tier: 'normal' },
  ] },
  { id: 'explorer', name: '익스플로러(상급)', accent: '#40A060', skills: [
    { id: 'exp-gale-slash',        name: '게일 슬래시',         tier: 'normal' },
    { id: 'exp-ghost-step',        name: '고스트 스텝',         tier: 'normal' },
    { id: 'exp-ghost-attack',      name: '고스트 어택',         tier: 'normal' },
    { id: 'exp-dagger-arts',       name: '대거 아츠',           tier: 'normal' },
    { id: 'exp-dash-attack',       name: '대시 어택',           tier: 'normal' },
    { id: 'exp-death-gale',        name: '데스 게일',           tier: 'normal' },
    { id: 'exp-death-blade',       name: '데스 블레이드',       tier: 'normal' },
    { id: 'exp-detect',            name: '디텍트',              tier: 'normal' },
    { id: 'exp-laser-storm',       name: '레이저 스톰',         tier: 'normal' },
    { id: 'exp-magic-cut',         name: '매직 컷',             tier: 'normal' },
    { id: 'exp-vorpal-arts',       name: '보팔 아츠',           tier: 'normal' },
    { id: 'exp-blind-spot',        name: '블라인드 스폿',       tier: 'normal' },
    { id: 'exp-shadow-hide',       name: '섀도 하이드',         tier: 'normal' },
    { id: 'exp-support-strike',    name: '서포트 스트라이크',   tier: 'normal' },
    { id: 'exp-support-strike-2',  name: '서포트 스트라이크 II', tier: 'normal' },
    { id: 'exp-storm-trap',        name: '스톰 트랩',           tier: 'normal' },
    { id: 'exp-acrobat-dodge',     name: '아크로뱃 닷지',       tier: 'normal' },
    { id: 'exp-intuition',         name: '인튜이션',            tier: 'normal' },
    { id: 'exp-juggling-attack',   name: '저글링 어택',         tier: 'normal' },
    { id: 'exp-constrain',         name: '컨스트레인',          tier: 'normal' },
    { id: 'exp-quick-move',        name: '퀵 무브',             tier: 'normal' },
    { id: 'exp-time-magic',        name: '타임 매직',           tier: 'normal' },
    { id: 'exp-top-speed',         name: '탑 스피드',           tier: 'normal' },
    { id: 'exp-twin-fencer',       name: '트윈 펜서',           tier: 'normal' },
    { id: 'exp-pin-point-attack',  name: '핀 포인트 어택',      tier: 'normal' },
    { id: 'exp-rapid-hand',        name: '래피드 핸드',         tier: 'normal' },
    { id: 'exp-blood-edge',        name: '블러드 에지',         tier: 'normal' },
    { id: 'exp-after-image',       name: '애프터 이미지',       tier: 'normal' },
    { id: 'exp-accel-hit',         name: '액셀 히트',           tier: 'normal' },
    { id: 'exp-top-gear',          name: '탑 기어',             tier: 'normal' },
  ] },
  { id: 'scout', name: '스카우트(상급)', accent: '#8B6914', skills: [
    { id: 'sct-double-shot',       name: '더블 샷',             tier: 'normal' },
    { id: 'sct-defense-trick',     name: '디펜스 트릭',         tier: 'normal' },
    { id: 'sct-last-luck',         name: '라스트 럭',           tier: 'normal' },
    { id: 'sct-marksman',          name: '마크스맨',            tier: 'normal' },
    { id: 'sct-versatile',         name: '버서타일',            tier: 'normal' },
    { id: 'sct-straight-shot',     name: '스트레이트 샷',       tier: 'normal' },
    { id: 'sct-strong-arrow',      name: '스트롱 애로',         tier: 'normal' },
    { id: 'sct-spirit-break',      name: '스피릿 브레이크',     tier: 'normal' },
    { id: 'sct-addendum',          name: '어덴덤',              tier: 'normal' },
    { id: 'sct-accurate',          name: '어큐레이트',          tier: 'normal' },
    { id: 'sct-aiming-shot',       name: '에이밍 샷',           tier: 'normal' },
    { id: 'sct-interference',      name: '인터피어런스',        tier: 'normal' },
    { id: 'sct-zero-in',           name: '제로 인',             tier: 'normal' },
    { id: 'sct-cutting-plan',      name: '커팅 플랜',           tier: 'normal' },
    { id: 'sct-trick-attack',      name: '트릭 어택',           tier: 'normal' },
    { id: 'sct-restrict-attack',   name: '리스트릭트 어택',     tier: 'normal' },
    { id: 'sct-restrict-attack-2', name: '리스트릭트 어택 II',  tier: 'normal' },
    { id: 'sct-penalty-hit',       name: '패널티 히트',         tier: 'normal' },
    { id: 'sct-fatal-hit',         name: '페이탈 히트',         tier: 'normal' },
    { id: 'sct-fortune-hit',       name: '포춘 히트',           tier: 'normal' },
    { id: 'sct-flash-shot',        name: '플래시 샷',           tier: 'normal' },
    { id: 'sct-field-work',        name: '필드 워크',           tier: 'normal' },
    { id: 'sct-hard-luck',         name: '하드 럭',             tier: 'normal' },
    { id: 'sct-hollow-shot',       name: '할로우 샷',           tier: 'normal' },
    { id: 'sct-nimble-steal',      name: '님블 스틸',           tier: 'normal' },
    { id: 'sct-dead-shot',         name: '데드 샷',             tier: 'normal' },
    { id: 'sct-deadly-poison',     name: '데들리 포이즌',       tier: 'normal' },
    { id: 'sct-super-trick',       name: '슈퍼 트릭',           tier: 'normal' },
    { id: 'sct-insensible',        name: '인센시블',            tier: 'normal' },
    { id: 'sct-proof-poison',      name: '프루프 포이즌',       tier: 'normal' },
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
  special:  { label: 'SP불가',   color: '#F44336', bg: '#F4433622' },
  eosheon:  { label: '어션 전용', color: '#909060', bg: '#90906022' },
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
  skill, accent, aggregate, aggregatesLoaded, onClick, selected,
}: {
  skill: Skill; accent: string; aggregate?: Aggregate; aggregatesLoaded: boolean; onClick: () => void; selected: boolean
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
        ) : aggregatesLoaded ? (
          <span style={{ fontSize: 11, color: '#5A4A30', flexShrink: 0 }}>미평가</span>
        ) : null}
      </div>
    </button>
  )
}

function SkillDetail({ skill, accent, onClose, onReviewSubmitted }: {
  skill: Skill; accent: string; onClose: () => void; onReviewSubmitted: () => void
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
        onReviewSubmitted()
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
  const [aggregatesLoaded, setAggregatesLoaded] = useState(false)
  const [mob, setMob] = useState(false)
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const check = () => setMob(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    fetch('/api/reviews', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { setAggregates(data.aggregates || {}); setAggregatesLoaded(true) })
      .catch(() => { setAggregatesLoaded(true) })
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
    fetch('/api/reviews', { cache: 'no-store' })
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
                  : aggregatesLoaded
                    ? <span style={{ fontSize: 10, color: '#4A3A20' }}>미평가</span>
                    : null
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
            onReviewSubmitted={refreshAggregates}
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
                      aggregatesLoaded={aggregatesLoaded}
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
