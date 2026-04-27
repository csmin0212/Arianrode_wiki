'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── 타입 ──────────────────────────────────────────────────────────────────

// tier: 'normal' | 'cl5' | 'cl10' | 'special'
// special = 빨강, SP로 취득 불가 (다른 스킬로 자동 취득)
type SkillTier = 'normal' | 'cl5' | 'cl10' | 'special'

interface Skill {
  id: string
  name: string
  nameJp?: string
  timing: string
  judge: string
  target: string
  range: string
  cost: string
  slMax: string
  condition?: string
  effect: string
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
  hp: number    // HP 보정
  mp: number    // MP 보정
}

interface Category {
  id: string
  name: string
  accent: string
  description: string
  skills: Skill[]
  stats?: RaceStats       // 종족 능력 기본치 (클래스엔 없음)
  isRace?: boolean
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

// ─── 샘플 데이터 ────────────────────────────────────────────────────────────

const RACES: Category[] = [
  // ── 플레이스홀더 종족 (실제 데이터 추가 예정) ────────────────────────────
  {
    id: 'hurin', name: '휴린', accent: '#C85A1E',
    description: '태양신 아켄라브에 의해 보내어진 전사의 종족. 에린에서 가장 널리 퍼져 있으며 다른 종족보다 강한 전투 기질을 갖추고 있다.',
    stats: { str: 10, dex: 9, agi: 9, int: 7, spi: 8, luk: 9, hp: 0, mp: 0 },
    skills: [
      { id: 'hurin-1', name: '투지', timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '3', slMax: '3', effect: '이 씬 종료까지 자신의 무기 공격 데미지에 +[SL]D한다.' },
      { id: 'hurin-2', name: '인내', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '5', effect: '이 캐릭터가 받는 물리·마법 피해 감소에 +[SL]한다.' },
      { id: 'hurin-3', name: '전투 의지', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: 'HP가 최대치의 절반 이하일 때 발동. 자신의 무기 공격 데미지에 +[SL×2]한다.' },
      { id: 'hurin-4', name: '진격', timing: '메이저 액션', judge: '자동 성공', target: '자신', range: '─', cost: '4', slMax: '1', effect: '이 라운드 자신의 이동력에 +10m하고, 이동 후 근접 공격의 데미지에 +3D한다.' },
    ],
  },
  {
    id: 'eldanan', name: '엘다난', accent: '#5A6A9A',
    description: '달의 여신 브리간티아의 수호를 받는 종족. 긴 수명과 뛰어난 마술 능력을 지니며, 자연과 깊이 교감한다.',
    stats: { str: 7, dex: 8, agi: 9, int: 10, spi: 9, luk: 9, hp: 0, mp: 0 },
    skills: [
      { id: 'elda-1', name: '엘달란의 시', timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '2', slMax: '3', effect: '이 씬 종료까지 마술 판정에 성공할 때마다 MP를 [SL]점 회복한다.' },
      { id: 'elda-2', name: '자연과의 교감', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '야외·숲 등 자연 환경에서의 감지·은밀 판정에 +[SL×2]D한다.' },
      { id: 'elda-3', name: '달의 가호', timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '3', slMax: '2', effect: '야간 씬에서 사용 가능. 이 씬 종료까지 마법 데미지에 +[SL×3]하고 마법 판정 수정에 +[SL]한다.' },
      { id: 'elda-4', name: '정령의 눈', timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '2', slMax: '1', effect: '이 씬 종료까지 투명·은신 상태의 대상을 정상적으로 감지할 수 있다.' },
    ],
  },
  {
    id: 'nevaf', name: '네바프', accent: '#7A6030',
    description: '대장신 고바논이 빚어낸 종족. 짧은 키와 강인한 체격을 지니며 연금술과 제련 기술이 뛰어나다.',
    stats: { str: 10, dex: 10, agi: 7, int: 8, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [
      { id: 'nevaf-1', name: '연금술사의 손', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '5', effect: '연금술 관련 기술 판정에 +[SL×2]D한다. 또한 연금술로 만든 아이템의 효과에 +[SL]한다.' },
      { id: 'nevaf-2', name: '철벽 방어', timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '4', slMax: '3', effect: '이 씬 종료까지 방어력에 +[SL×2]한다. 중장비 착용 중에는 추가로 피해 감소에 +[SL]한다.' },
      { id: 'nevaf-3', name: '드워프의 집념', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '무기 제작·수리·감정 판정에 +[SL×2]D한다. 또한 자신이 직접 제작한 무기의 데미지에 +[SL]한다.' },
      { id: 'nevaf-4', name: '산악 보행', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1', effect: '험한 지형(산악·동굴·암벽)에서의 이동 패널티를 무시한다. 관련 기술 판정에 +2D한다.' },
    ],
  },
  {
    id: 'pilbor', name: '필보르', accent: '#4A8A5A',
    description: '샘의 여신 아에마가 낳은 종족. 온화한 성격과 뛰어난 치유 능력을 지니며 지원 역할에 특화되어 있다.',
    stats: { str: 7, dex: 8, agi: 10, int: 8, spi: 9, luk: 8, hp: 0, mp: 0 },
    skills: [
      { id: 'pilbor-1', name: '샘의 축복', timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '2', slMax: '3', effect: '이 씬 종료까지 자신이 사용하는 힐 계열 효과에 +[SL×3]한다.' },
      { id: 'pilbor-2', name: '정령의 손길', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '회복 마법의 SL 상한을 +[SL]한다. 또한 회복 마법 효과의 계산에 사용하는 다이스를 +[SL]개 추가한다.' },
      { id: 'pilbor-3', name: '생명의 수호', timing: '리액션', judge: '자동 성공', target: '캐릭터 1체', range: '10m', cost: '4', slMax: '2', effect: '사망 판정을 하는 캐릭터 1체에게 사용. 그 사망 판정에 +[SL×3]D한다.' },
      { id: 'pilbor-4', name: '치유의 기도', timing: '메이저 액션', judge: '자동 성공', target: '단체', range: '20m', cost: '6', slMax: '3', effect: '범위 내 아군 전원의 HP를 [SL×4]점 회복한다. 또한 경상 이하의 상태이상을 1개 해제한다.' },
    ],
  },
  {
    id: 'verna', name: '버나', accent: '#4A88CA',
    description: '천공신 다그데모아가 마물 토벌을 위해 창조한 비행 종족. 하늘을 나는 능력과 민첩한 신체를 자랑한다.',
    stats: { str: 8, dex: 9, agi: 11, int: 8, spi: 7, luk: 7, hp: 0, mp: 0 },
    skills: [
      { id: 'verna-1', name: '비행', timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '─', effect: '자신을 비행 상태로 만든다. 비행 상태에서는 지면 장애물의 영향을 받지 않는다.' },
      { id: 'verna-2', name: '신속의 날개', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '비행 상태일 때, 이동력에 +[SL×5]m한다.' },
      { id: 'verna-3', name: '하늘의 사냥꾼', timing: '메이저 액션', judge: '자동 성공', target: '자신', range: '─', cost: '3', slMax: '3', condition: '비행', effect: '비행 상태에서 사용 가능. 이 라운드 원거리 공격의 명중 판정에 +[SL]D, 데미지에 +[SL×2]한다.' },
      { id: 'verna-4', name: '바람의 방패', timing: '리액션', judge: '자동 성공', target: '자신', range: '─', cost: '2', slMax: '2', condition: '비행', effect: '비행 상태일 때 공격을 받은 경우에 사용. 그 공격의 데미지를 [SL×3]점 감소한다.' },
    ],
  },
  {
    id: 'duang', name: '두앙', accent: '#7A6A8A',
    description: '뇌신 그랑아인이 창조한 종족. 뛰어난 기계 지식과 정밀한 손놀림을 지니며 정찰과 지원에 탁월하다.',
    stats: { str: 8, dex: 9, agi: 9, int: 9, spi: 8, luk: 7, hp: 0, mp: 0 },
    skills: [
      { id: 'duang-1', name: '정밀 사격', timing: '메이저 액션', judge: '자동 성공', target: '자신', range: '─', cost: '3', slMax: '3', effect: '이 라운드 원거리 공격 판정의 수정에 +[SL×2]D하고, 데미지에 +[SL×2]한다.' },
      { id: 'duang-2', name: '기계 지식', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '5', effect: '기계 장치·함정 해제·조작 관련 기술 판정에 +[SL×2]D한다.' },
      { id: 'duang-3', name: '탐지 전문가', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '발견·감지·조사 판정에 +[SL×2]D한다. 또한 은밀 판정에도 +[SL]D한다.' },
      { id: 'duang-4', name: '번개의 기민', timing: '리액션', judge: '자동 성공', target: '자신', range: '─', cost: '2', slMax: '2', effect: '이니셔티브 판정에 +[SL×3]D한다. 또한 선제 공격을 받았을 때 그 데미지를 [SL×2]점 감소한다.' },
    ],
  },
  // ── 스텁 종족 (데이터 입력 예정) ─────────────────────────────────────────
  {
    id: 'eosheon', name: '어션', accent: '#686868',
    description: '현대 지구에서 에린으로 넘어온 종족. 특수한 마력 자질 없이도 다양한 클래스의 능력을 습득할 수 있는 만능형 종족.',
    stats: { str: 9, dex: 9, agi: 9, int: 9, spi: 8, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'sahagin', name: '사하긴', accent: '#2A7A9A',
    description: '수신의 가호를 받는 수생 종족. 〈수〉속성 스킬과 수영 조건 스킬에 특화되어 있으며, 수륙양용(빨강/특수) 스킬을 지닌다.',
    stats: { str: 10, dex: 8, agi: 9, int: 7, spi: 8, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'nephilim', name: '네필림', accent: '#8A5535',
    description: '거인의 혈통을 이어받은 종족. 초대형(빨강/특수) 스킬을 보유하며 자이언트 그로스 관련 스킬에 특화되어 있다.',
    stats: { str: 11, dex: 7, agi: 7, int: 8, spi: 8, luk: 9, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'diva', name: '디바', accent: '#A0A025',
    description: '신의 혈통에 따라 엘더·데미갓·히어로 세 계통으로 나뉘는 신성 종족. 각 계통마다 고유 스킬을 보유한다.',
    stats: { str: 8, dex: 9, agi: 9, int: 9, spi: 9, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'lemures', name: '레무레스', accent: '#5A3A80',
    description: '영체를 지닌 정신 최강의 종족(정신 11). 아스트랄 계열 스킬과 영체 관련 능력에 특화되어 있다.',
    stats: { str: 7, dex: 8, agi: 8, int: 9, spi: 11, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'ex-machina', name: '엑스 마키나', accent: '#5A7A8A',
    description: '기계 종족. 근력 최강(11)을 자랑하며 건슬링거·워리어 클래스와의 연계 스킬에 특화되어 있다.',
    stats: { str: 11, dex: 9, agi: 7, int: 8, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'dragonet', name: '드라고넷', accent: '#A05525',
    description: '용의 피를 이어받은 종족. 속성 선택형 스킬을 보유하며 비행 능력도 갖추고 있다.',
    stats: { str: 10, dex: 8, agi: 9, int: 9, spi: 8, luk: 6, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'alcard', name: '알카드', accent: '#6A2A6A',
    description: '뱀파이어의 피를 이어받은 종족. 지력이 높고 〈암〉속성 스킬에 특화되어 있다.',
    stats: { str: 8, dex: 9, agi: 9, int: 10, spi: 8, luk: 6, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'homgoblin', name: '홈고블린', accent: '#3A6A3A',
    description: '숲과 자연에 적응한 종족. 민첩이 높고 〈지〉속성 및 숲/자연 계열 스킬에 특화되어 있다.',
    stats: { str: 8, dex: 10, agi: 10, int: 8, spi: 7, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'hokaspokas', name: '호카스포카스', accent: '#6A5A8A',
    description: '마술에 능통한 종족. 지력·정신이 높으며 뮤커스 스킨(10 미만 피해 0) 스킬을 보유한다.',
    stats: { str: 7, dex: 8, agi: 8, int: 10, spi: 10, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'jelbor', name: '젤보어', accent: '#8A7A30',
    description: '재주와 민첩이 높은 상인 계열 종족. 교섭·정보 수집 관련 스킬에 특화되어 있다.',
    stats: { str: 7, dex: 10, agi: 10, int: 9, spi: 7, luk: 7, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'doomguard', name: '둠가드', accent: '#6A3020',
    description: '근력 최강(11)의 격투 특화 종족. 혼자싸움·격투 관련 스킬에 완전히 집중된 전투 종족.',
    stats: { str: 11, dex: 8, agi: 9, int: 7, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  {
    id: 'fey', name: '페이', accent: '#8A4A9A',
    description: '12가지 타입(발키리·그렘린·스프라이트·스프리건·디나시·나이트메어·닉시·노커·페어리·픽시·라난시·레프라콘)으로 나뉘는 요정 종족. 각 타입마다 고유 스탯과 스킬을 보유하며 공용 스킬 6개를 공유한다.',
    stats: { str: 8, dex: 9, agi: 9, int: 9, spi: 8, luk: 8, hp: 0, mp: 0 },
    skills: [],
  },
  // ── 글라이아이 (실제 데이터 입력 완료) ────────────────────────────────────
  {
    id: 'glaiaei', name: '글라이아이', accent: '#7A50A0',
    description: '이형(異形)의 힘을 신체 각 부위에 발현시키는 종족. 팔·눈·발·머리카락 등이 이형화하여 강력한 전투 능력과 다양한 특수 능력을 구사한다.',
    stats: { str: 9, dex: 9, agi: 9, int: 9, per: 8, spi: 7, luk: 8, hp: 0, mp: 0 },
    skills: [
      // ─ 일반 (녹색) ─
      {
        id: 'glaiaei-1', name: '글라이아이: 아이언 핸드',
        timing: '대미지 굴림 직전', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '장면 1회',
        effect: '백병 공격의 대미지 굴림 직전에 사용한다. 대미지 증가를 건다. 그 공격의 대미지에 +2D한다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-2', name: '글라이아이: 어설트 스킨',
        timing: '무브 액션', judge: '자동 성공', target: '자신', range: '─', cost: '6', slMax: '1',
        effect: '전투이동 혹은 전력이동을 실행한다. 이 효과로 이동한 경우, 백병 공격의 대상의 【물리 방어력】과 【마법 방어력】을 -5(최저 0)로 하여 대미지를 계산한다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-3', name: '글라이아이: 아마베네트레이트',
        timing: '대미지 굴림 직전', judge: '자동 성공', target: '자신', range: '─', cost: '10', slMax: '1',
        condition: '시나리오 1회',
        effect: '백병 공격의 대미지 굴림 직전에 사용한다. 그 공격은 【물리 방어력】과 【마법 방어력】을 0으로 하여 계산한다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-4', name: '글라이아이: 인비지블 핸드',
        timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '단검 2개 이상 휴대',
        effect: '휴대품을 「분류: 단검」인 무기를 2개 이상 휴대하고 있을 경우 유효(장비품은 세지 않음). 무기 공격의 대미지에 +1D한다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-5', name: '글라이아이: 보이드 슬래시',
        timing: '효과 참조', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '시나리오 1회',
        effect: '무기 공격과 동시에 사용한다. 그 공격에 대한 리액션 판정에 -2D한다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-special-suryuk', name: '수륙양용',
        timing: '패시브', judge: '─', target: '─', range: '─', cost: '─', slMax: '1',
        effect: '수중 상태에서 이동력 패널티를 받지 않는다. 이 스킬은 스킬포인트를 사용하여 얻을 수 없습니다.',
        tier: 'special',
      },
      {
        id: 'glaiaei-6', name: '글라이아이: 워터 스텐스',
        timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '수영',
        effect: '공격의 대미지에 +3한다. 또한, 캐릭터 작성 시에 〈수륙양용〉을 취득한다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-7', name: '글라이아이: 가드 암',
        timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '4', slMax: '1',
        effect: '【물리 방어력】과 【마법 방어력】에 +6한다. 이 효과는 라운드 종료, 이동, 전투 불능 혹은 사망할 때까지 지속된다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-8', name: '글라이아이: 샷 아이',
        timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '5', slMax: '1',
        effect: '사격 공격의 명중 판정에 +1D한다. 이 효과는 라운드가 종료될 때까지 지속된다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-9', name: '글라이아이: 스트레치암',
        timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: '백병 공격의 사거리가 「5m」가 되며, 인게이지하지 않은 대상에게도 실행할 수 있다.',
        tier: 'normal',
      },
      {
        id: 'glaiaei-10', name: '글라이아이: 스톰풋',
        timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '4', slMax: '1',
        effect: '전투 이동, 또는 이탈을 한다. 단, 당신이 있는 인게이지가 적 캐릭터로 봉쇄되어 있다면 이탈은 할 수 없다.',
        tier: 'normal',
      },
      // ─ CL5+ (노랑) ─
      {
        id: 'glaiaei-cl5-1', name: '글라이아이: 스파이트 아이',
        timing: '리액션', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '장면 1회',
        effect: '대상이 행한 공격에 대한 리액션으로 스팟 로스를 건다. 또, 대상의 공격은 당신에게 자동으로 명중한다. 대상이 한 공격은 정상적으로 처리된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-2', name: '글라이아이: 디멘전 블로우',
        timing: '무브 액션', judge: '자동 성공', target: '자신', range: '─', cost: '4', slMax: '1',
        effect: '무기 공격의 대미지를 〈무〉속성의 마법 대미지로 변경한다. 이 효과로 이동한 경우, 백병 공격의 대상의 【물리 방어력】과 【마법 방어력】에 -10을 하여 대미지를 계산한다. 이 효과는 메인 프로세스가 종료될 때까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-3', name: '글라이아이: 데드헤어',
        timing: '셋업 프로세스', judge: '정신 대결', target: '단일', range: '20m', cost: '5', slMax: '1',
        effect: '대상의 【정신】과 대결한다. 이 대결에서 승리한 경우 대상에게 【넉백(1)】을 건다. 또한, 장면 종료 시까지 대상을 [분류: 언데드]로 변환한다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-4', name: '글라이아이: 페이크 페이스',
        timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: '무기 공격으로 대상에게 1점이라도 HP 대미지를 주면 [독(1)]을 건다. 이 효과는 메인 프로세스가 종료될 때까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-5', name: '글라이아이: 포이즌 리퀴드',
        timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: '무기 공격으로 대상에게 1점이라도 HP 대미지를 주면 [독(1)]을 건다. 이 효과는 라운드가 종료될 때까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-6', name: '글라이아이: 마제스틱 헤어',
        timing: '셋업 프로세스', judge: '정신 판정', target: '장면(선택)', range: '시야', cost: '8', slMax: '1',
        effect: '대미지 증가를 건다. 대상이 행하는 공격의 대미지에 +2한다. 당신은 대상으로 삼을 수 없다. 이 효과는 라운드 종료까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-7', name: '글라이아이: 매직 아이',
        timing: '셋업 프로세스', judge: '마술 판정', target: '단일', range: '10m', cost: '6', slMax: '1',
        effect: '대상이 실행하는 무기 공격의 대미지를 〈무〉속성의 마법 대미지로 변경한다. 이 효과는 라운드 종료시까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-8', name: '글라이아이: 미라지 아이',
        timing: '메이저 액션', judge: '정신 판정', target: '범위(선택)', range: '20m', cost: '8', slMax: '1',
        effect: '그 대상이 「분류: 식물, 언데드, 기계」이외일 경우 유효. 대상에게 특수 공격을 실행한다. 그 특수 공격의 대미지는 [2D+【정신】](관통 대미지)가 된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-9', name: '글라이아이: 루스트 미스트',
        timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: '무기 공격으로 1점이라도 HP 대미지를 입혔을 경우, 대상의 【물리 방어력】에 -5(최저 0)한다. 이 효과는 장면 종료까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-10', name: '오라 스킨',
        timing: '마이너 액션', judge: '자동 성공', target: '자신', range: '─', cost: '4', slMax: '1',
        effect: 'CL 5 이상에서 취득 가능. 【물리 방어력】과 【마법 방어력】에 +3한다. 이 효과는 장면 종료까지 지속된다.',
        tier: 'cl5',
      },
      {
        id: 'glaiaei-cl5-11', name: '듀얼 페이스',
        timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: 'CL 5 이상에서 취득 가능. 〈글라이아이: ──〉스킬 중 하나를 선택한다. 선택한 종족 스킬을 취득한다. 또한 【행운 기본치】에 -3한다.',
        tier: 'cl5',
      },
      // ─ CL10+ (금색) ─
      {
        id: 'glaiaei-cl10-1', name: '이그젝트핸드',
        timing: '판정 직전', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '장면 1회',
        effect: '〈재주〉판정 직전에 사용한다. 그 판정에 +1D한다.',
        tier: 'cl10',
      },
      {
        id: 'glaiaei-cl10-2', name: '버스트 포스',
        timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: '주사위로 효과를 정하는 「분류: 마술」에 유효. 마법 공격, 대미지 증가, 대미지 경감하는 마술의 효과에 +2한다.',
        tier: 'cl10',
      },
      {
        id: 'glaiaei-cl10-3', name: '베리언트 폼',
        timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        effect: '공격의 대미지에 +1D한다. 이 효과는 장면 종료 시까지 지속된다.',
        tier: 'cl10',
      },
      {
        id: 'glaiaei-cl10-4', name: '마리그난트 소울',
        timing: '효과 참조', judge: '자동 성공', target: '자신', range: '─', cost: '5', slMax: '1',
        effect: '강도가 있는 밴드 스테이터스를 주는 공격·스킬·파워·아이템과 동시에 사용한다. 그 효과 강도에 +1한다.',
        tier: 'cl10',
      },
      {
        id: 'glaiaei-cl10-5', name: '래피드 포스',
        timing: '셋업 프로세스', judge: '자동 성공', target: '자신', range: '─', cost: '3', slMax: '1',
        condition: '장면 1회',
        effect: '행동치 증가를 건다. 【행동치】에 +2D한다. 이 효과는 라운드 종료 시까지 지속된다.',
        tier: 'cl10',
      },
      {
        id: 'glaiaei-cl10-6', name: '웨이스트 오라',
        timing: '무브 액션', judge: '자동 성공', target: '자신', range: '─', cost: '─', slMax: '1',
        condition: '장면 1회',
        effect: 'CL 10 이상에서 취득 가능. 공격으로 1점이라도 HP 대미지를 주었을 경우, 추가로 [CL×3]점의 HP로스를 준다.',
        tier: 'cl10',
      },
    ],
  },
]

const CLASSES: Category[] = [
  {
    id: 'warrior', name: '전사', accent: '#C83030',
    description: '근접 전투에 특화된 클래스. 높은 체력과 강력한 무기 공격으로 전선을 유지한다.',
    skills: [
      { id: 'war-1', name: '강타', nameJp: '強打', timing: '메이저액션', judge: '자동성공', target: '자신', range: '─', cost: '4', slMax: '5', effect: '이 라운드 근접 무기 공격의 데미지에 +[SL×3]한다.' },
      { id: 'war-2', name: '방패 방어', nameJp: '盾防御', timing: '리액션', judge: '자동성공', target: '자신', range: '─', cost: '2', slMax: '3', condition: '방패 장착', effect: '방패 장착 시 사용 가능. 이 공격의 데미지를 [SL×4]점 감소한다.' },
      { id: 'war-3', name: '전선 유지', nameJp: '戦線維持', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '근접 범위 내의 적이 자신 이외의 아군을 대상으로 이동할 때, 그 이동을 방해하는 판정을 할 수 있다. 판정 수정에 +[SL×2]D한다.' },
      { id: 'war-4', name: '결사의 일격', nameJp: '決死の一撃', timing: '메이저액션', judge: '《근력》대결', target: '캐릭터 1체', range: '근접', cost: '6', slMax: '1', effect: '근접 공격 판정에 대신 《근력》 대결을 사용. 성공시 통상 데미지에 더해 [2D×SL]의 추가 데미지를 준다.' },
    ],
  },
  {
    id: 'mage', name: '마법사', accent: '#5A30A0',
    description: '강력한 마법 공격을 구사하는 클래스. 높은 마법 위력을 자랑하지만 체력이 낮다.',
    skills: [
      { id: 'mage-1', name: '마력 집중', nameJp: '魔力集中', timing: '마이너액션', judge: '자동성공', target: '자신', range: '─', cost: '3', slMax: '3', effect: '이 라운드 자신이 다음으로 사용하는 마술의 데미지에 +[SL×4]한다. 이 효과는 중복 불가.' },
      { id: 'mage-2', name: '마법 방벽', nameJp: '魔法障壁', timing: '셋업프로세스', judge: '자동성공', target: '자신', range: '─', cost: '4', slMax: '3', effect: '이 씬 종료까지 마법 공격에 의한 피해를 [SL×3]점 감소한다.' },
      { id: 'mage-3', name: '원소 지배', nameJp: '元素支配', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '5', effect: '속성을 지정한 마법 공격의 데미지에 +[SL×2]한다. 이 스킬은 속성 하나에 각각 습득 가능하다.' },
      { id: 'mage-4', name: '마법 연쇄', nameJp: '魔法連鎖', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '마술로 적을 쓰러뜨렸을 때, MP를 [SL×2]점 회복한다. 한 씬에 [SL]회까지 발동.' },
    ],
  },
  {
    id: 'priest', name: '신관', accent: '#C8A830',
    description: '신의 가르침을 따르는 지원 클래스. 회복과 버프를 통해 아군을 뒷받침한다.',
    skills: [
      { id: 'pri-1', name: '신성한 치유', nameJp: '神聖な癒し', timing: '메이저액션', judge: '자동성공', target: '캐릭터 1체', range: '10m', cost: '4', slMax: '5', effect: '대상의 HP를 [SL×5]점 회복한다. 사용자가 아켄라브 신자인 경우 +[SL×2] 추가 회복.' },
      { id: 'pri-2', name: '정화의 빛', nameJp: '浄化の光', timing: '메이저액션', judge: '자동성공', target: '캐릭터 1체', range: '10m', cost: '3', slMax: '3', effect: '대상의 상태이상 1개를 해제한다. SL2 이상이면 2개, SL3이면 경상 이하 상태이상 전부를 해제한다.' },
      { id: 'pri-3', name: '신의 가호', nameJp: '神の加護', timing: '셋업프로세스', judge: '자동성공', target: '단체', range: '20m', cost: '5', slMax: '3', effect: '범위 내 아군 전원의 이 씬 종료까지 방어력에 +[SL×2]하고, 처음으로 받는 피해를 [SL×3]점 감소한다.' },
      { id: 'pri-4', name: '부활의 기도', nameJp: '蘇生の祈り', timing: '메이저액션', judge: '《신앙》자동성공', target: '캐릭터 1체', range: '근접', cost: '8', slMax: '1', effect: '죽음 상태 캐릭터 1체를 HP1로 부활시킨다. 씬 당 1회 사용 제한. 사용 후 MP를 4점 소비한다.' },
    ],
  },
  {
    id: 'rogue', name: '도적', accent: '#308050',
    description: '기습과 속임수를 구사하는 클래스. 고위험 고보상의 전술로 적의 허점을 노린다.',
    skills: [
      { id: 'rog-1', name: '기습', nameJp: '奇襲', timing: '메이저액션', judge: '자동성공', target: '자신', range: '─', cost: '3', slMax: '5', condition: '은신', effect: '은신 상태에서 공격할 때 사용 가능. 그 공격의 데미지에 +[SL×3]하고, 은신 상태가 해제된다.' },
      { id: 'rog-2', name: '독 사용', nameJp: '毒使い', timing: '마이너액션', judge: '자동성공', target: '자신', range: '─', cost: '2', slMax: '3', effect: '이 라운드 자신의 근접·원거리 공격에 독을 부여한다. 명중 시 대상에게 [SL]라운드 독 상태를 부여.' },
      { id: 'rog-3', name: '탈출 달인', nameJp: '逃走の達人', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '속박·고정 등의 행동 방해 상태이상을 해제하는 판정에 +[SL×2]D한다. 또한 도주 판정에 +[SL×3]D한다.' },
      { id: 'rog-4', name: '은신', nameJp: '隠身', timing: '마이너액션', judge: '은밀 판정', target: '자신', range: '─', cost: '2', slMax: '2', effect: '은밀 판정 성공 시 은신 상태가 된다. 판정 수정에 +[SL×2]D. 은신 상태는 공격하거나 판정 실패 시 해제.' },
    ],
  },
  {
    id: 'fighter', name: '격투가', accent: '#A05030',
    description: '맨몸 격투를 주체로 하는 클래스. 빠른 연속 공격과 체술로 근접전을 지배한다.',
    skills: [
      { id: 'fig-1', name: '연격', nameJp: '連撃', timing: '메이저액션', judge: '자동성공', target: '자신', range: '─', cost: '3', slMax: '3', effect: '이 라운드 근접 공격을 [1+SL]회 행한다. 단, 각 공격의 데미지는 통상의 절반이 된다.' },
      { id: 'fig-2', name: '기공탄', nameJp: '気功弾', timing: '메이저액션', judge: '원거리 공격 판정', target: '캐릭터 1체', range: '30m', cost: '4', slMax: '3', effect: '격투 기술을 원거리 공격으로 변환. 데미지는 격투 공격과 동일하며 +[SL×2]를 추가. 〈기〉속성.' },
      { id: 'fig-3', name: '철벽 체술', nameJp: '鉄壁体術', timing: '리액션', judge: '자동성공', target: '자신', range: '─', cost: '2', slMax: '3', effect: '근접 공격을 받았을 때 사용. 그 공격의 데미지를 [SL×3]점 감소하고, 반격으로 [SL]D의 격투 데미지를 준다.' },
      { id: 'fig-4', name: '파동권', nameJp: '波動拳', timing: '메이저액션', judge: '격투 공격 판정', target: '캐릭터 1체', range: '근접', cost: '5', slMax: '2', effect: '대상을 [SL×2]m 밀어내고 넘어짐 상태를 부여. 판정 성공 시 추가로 [2D+SL×4]의 데미지.' },
    ],
  },
  {
    id: 'ranger', name: '레인저', accent: '#305A30',
    description: '야외 생존과 원거리 전투에 능숙한 클래스. 자연 환경을 활용하여 적을 제압한다.',
    skills: [
      { id: 'ran-1', name: '정조준', nameJp: '狙い撃ち', timing: '마이너액션', judge: '자동성공', target: '자신', range: '─', cost: '2', slMax: '3', effect: '이 라운드 원거리 공격에 한해 명중 판정에 +[SL×2]D하고 사거리에 +[SL×10]m한다.' },
      { id: 'ran-2', name: '야생의 본능', nameJp: '野生の本能', timing: '패시브', judge: '─', target: '자신', range: '─', cost: '─', slMax: '3', effect: '야외 씬에서 기습을 받을 수 없다. 또한 야외에서 이니셔티브 판정에 +[SL×2]D한다.' },
      { id: 'ran-3', name: '함정 설치', nameJp: '罠設置', timing: '마이너액션', judge: '함정 설치 판정', target: '─', range: '─', cost: '2', slMax: '3', effect: '자신 주변 5m 이내에 함정을 설치한다. 판정 성공 시 최초로 밟은 적에게 [SL×4]D의 데미지와 행동 방해를 부여.' },
      { id: 'ran-4', name: '복합 사격', nameJp: '複合射撃', timing: '메이저액션', judge: '원거리 공격 판정', target: '캐릭터 최대 [SL]체', range: '40m', cost: '5', slMax: '3', effect: '범위 내 최대 [SL]체를 대상으로 원거리 공격을 행한다. 각 공격의 데미지는 [SL×2]를 추가.' },
    ],
  },
]

// ─── 유틸 ──────────────────────────────────────────────────────────────────

const ACCENT_MAIN = '#5E3A1E'
const SIDEBAR_BG = '#1E1812'

const TIER_CONFIG: Record<SkillTier, { label: string; color: string; bg: string }> = {
  normal:  { label: '일반',    color: '#4CAF50', bg: '#4CAF5022' },
  cl5:     { label: 'CL5+',   color: '#FFC107', bg: '#FFC10722' },
  cl10:    { label: 'CL10+',  color: '#8D6E63', bg: '#8D6E6322' },
  special: { label: '특수',   color: '#F44336', bg: '#F4433622' },
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
  const physRows: [string, number][] = [
    ['근력', stats.str], ['재주', stats.dex], ['민첩', stats.agi],
  ]
  const mentalRows: [string, number][] = [
    ['지력', stats.int],
    ...(stats.per !== undefined ? [['감지', stats.per] as [string, number]] : []),
    ['정신', stats.spi], ['행운', stats.luk],
  ]
  const allRows = [...physRows, ...mentalRows]
  const cols = allRows.length <= 6 ? 3 : 4
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, color: accent, fontWeight: 700, marginBottom: 6, letterSpacing: '0.1em' }}>능력 기본치</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4 }}>
        {allRows.map(([label, val]) => (
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
      {(stats.hp !== 0 || stats.mp !== 0) && (
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {stats.hp !== 0 && (
            <div style={{ background: '#0A0806', border: `1px solid ${accent}20`, borderRadius: 6, padding: '4px 10px', fontSize: 11 }}>
              <span style={{ color: '#7A6040' }}>HP</span>
              <span style={{ color: '#C8C0A8', marginLeft: 6, fontWeight: 700 }}>{stats.hp > 0 ? `+${stats.hp}` : stats.hp}</span>
            </div>
          )}
          {stats.mp !== 0 && (
            <div style={{ background: '#0A0806', border: `1px solid ${accent}20`, borderRadius: 6, padding: '4px 10px', fontSize: 11 }}>
              <span style={{ color: '#7A6040' }}>MP</span>
              <span style={{ color: '#C8C0A8', marginLeft: 6, fontWeight: 700 }}>{stats.mp > 0 ? `+${stats.mp}` : stats.mp}</span>
            </div>
          )}
        </div>
      )}
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
            fontSize: size,
            cursor: onChange ? 'pointer' : 'default',
            color: n <= (hover || value) ? '#F0C030' : '#444',
            transition: 'color 0.1s',
            lineHeight: 1,
          }}
        >★</span>
      ))}
    </div>
  )
}

function SkillStatRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 12, marginBottom: 5 }}>
      <span style={{ color: accent, fontWeight: 700, minWidth: 58, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#C8C0A8' }}>{value}</span>
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
        borderRadius: 8,
        padding: '12px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.15s',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontWeight: 700, color: '#F0E0C0', fontSize: 14 }}>{skill.name}</div>
          {skill.nameJp && <div style={{ color: '#6A5830', fontSize: 11, marginTop: 2 }}>{skill.nameJp}</div>}
        </div>
        {aggregate && aggregate.count > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <Stars value={Math.round(aggregate.avgRating)} size={12} />
            <span style={{ fontSize: 10, color: '#A09070' }}>{aggregate.avgRating.toFixed(1)} ({aggregate.count})</span>
          </div>
        ) : (
          <span style={{ fontSize: 10, color: '#5A4A30' }}>미평가</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {[skill.timing, skill.target].map((tag, i) => (
          <span key={i} style={{ fontSize: 10, background: avgColor(accent, 0.12), color: accent, padding: '2px 7px', borderRadius: 10 }}>{tag}</span>
        ))}
        {skill.condition && (
          <span style={{ fontSize: 10, background: '#2A1810', color: '#A07050', padding: '2px 7px', borderRadius: 10 }}>조건: {skill.condition}</span>
        )}
        <TierBadge tier={skill.tier} small />
      </div>
    </button>
  )
}

function SkillDetail({ skill, accent, raceStats, onClose }: { skill: Skill; accent: string; raceStats?: RaceStats; onClose: () => void }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // form state
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  // delete state
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
      <div style={{ background: `linear-gradient(135deg, ${avgColor(accent, 0.2)} 0%, #0C0A06 100%)`, borderBottom: `2px solid ${accent}40`, padding: '20px 24px 18px' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#7A6040', cursor: 'pointer', fontSize: 12, marginBottom: 10, padding: 0 }}>
          ← 목록으로
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, color: '#F0E0C0', fontSize: 20, fontFamily: "'Noto Serif KR', serif", fontWeight: 700 }}>{skill.name}</h2>
          {skill.nameJp && <span style={{ color: '#6A5830', fontSize: 12 }}>{skill.nameJp}</span>}
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
        {/* 종족 능력 기본치 */}
        {raceStats && <RaceStatsTable stats={raceStats} accent={accent} />}

        {/* 스킬 스탯 */}
        <div style={{ background: '#0A0806', border: `1px solid ${accent}30`, borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
          <SkillStatRow label="타이밍" value={skill.timing} accent={accent} />
          <SkillStatRow label="판정" value={skill.judge} accent={accent} />
          <SkillStatRow label="대상" value={skill.target} accent={accent} />
          <SkillStatRow label="사거리" value={skill.range} accent={accent} />
          <SkillStatRow label="코스트" value={skill.cost} accent={accent} />
          <SkillStatRow label="SL 상한" value={skill.slMax} accent={accent} />
          {skill.condition && <SkillStatRow label="사용조건" value={skill.condition} accent={accent} />}
        </div>
        <div style={{ background: `${accent}18`, border: `1px solid ${accent}40`, borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
          <p style={{ color: '#C8B870', fontSize: 13, lineHeight: 1.8, margin: 0 }}>{skill.effect}</p>
        </div>

        {/* 댓글 목록 */}
        <h3 style={{ color: accent, fontSize: 13, fontWeight: 700, borderBottom: `1px solid ${accent}30`, paddingBottom: 6, marginBottom: 14 }}>
          평가 및 댓글
        </h3>
        {loading ? (
          <div style={{ color: '#5A4A30', fontSize: 13, marginBottom: 20 }}>불러오는 중...</div>
        ) : reviews.length === 0 ? (
          <div style={{ color: '#5A4A30', fontSize: 13, marginBottom: 20 }}>아직 댓글이 없습니다. 첫 번째 평가를 남겨보세요!</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {reviews.map(r => (
              <div key={r.id} style={{ background: '#0A0806', border: '1px solid #2A2520', borderRadius: 8, padding: '12px 14px' }}>
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
                padding: '9px 0', fontSize: 13, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
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
    const skillsWithRating = cat.skills.filter(s => aggregates[s.id]?.count > 0)
    if (skillsWithRating.length === 0) return null
    const sum = skillsWithRating.reduce((acc, s) => acc + (aggregates[s.id]?.avgRating ?? 0), 0)
    return Math.round((sum / skillsWithRating.length) * 10) / 10
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
        background: SIDEBAR_BG,
        color: '#D4CFC7',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
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
                {avg !== null ? (
                  <span style={{ fontSize: 10, color: '#F0C030' }}>★ {avg.toFixed(1)}</span>
                ) : (
                  <span style={{ fontSize: 10, color: '#4A3A20' }}>미평가</span>
                )}
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
          // 스킬 상세 뷰
          <SkillDetail
            key={selectedSkill.id}
            skill={selectedSkill}
            accent={selectedCat.accent}
            raceStats={selectedCat.stats}
            onClose={() => {
              setSelectedSkillId(null)
              refreshAggregates()
            }}
          />
        ) : (
          // 스킬 목록 뷰
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
                <p style={{ color: '#7A7060', fontSize: 13, lineHeight: 1.8, margin: '0 0 12px' }}>{selectedCat.description}</p>
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
                        borderRadius: 6, padding: '3px 8px', color: val >= 10 ? selectedCat.accent : '#7A6040',
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
