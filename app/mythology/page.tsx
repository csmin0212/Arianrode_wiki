'use client'
import { useState } from 'react'

const ACCENT = "#C8A830"
const SIDEBAR_BG = "#06080E"

// ── 헬퍼 컴포넌트 ────────────────────────────────────────────────────────────

function Prose({ text, color = "#444" }: { text: string; color?: string }) {
  return (
    <p style={{ margin: "0 0 10px", lineHeight: 1.8, color }}>
      {text}
    </p>
  )
}

function SecTitle({ title, color = ACCENT }: { title: string; color?: string }) {
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color,
      borderBottom: `2px solid ${color}`, paddingBottom: 4,
      margin: "24px 0 12px", fontFamily: "'Noto Serif KR', serif"
    }}>
      {title}
    </h3>
  )
}

// ── 스킬 카드 ────────────────────────────────────────────────────────────────

interface Skill {
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
}

function SkillCard({ skill, accent }: { skill: Skill; accent: string }) {
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", gap: 8, fontSize: 12, marginBottom: 4 }}>
      <span style={{ color: accent, fontWeight: 700, minWidth: 56, flexShrink: 0 }}>{label}</span>
      <span style={{ color: "#D8CCA8" }}>{value}</span>
    </div>
  )
  return (
    <div style={{
      background: "#0C0A06", border: `1px solid ${accent}`,
      borderRadius: 10, padding: "16px 18px",
      display: "flex", flexDirection: "column", gap: 10
    }}>
      <div>
        <div style={{ fontWeight: 700, color: "#F0E090", fontSize: 15, marginBottom: 2 }}>{skill.name}</div>
        {skill.nameJp && (
          <div style={{ color: "#8A7830", fontSize: 11 }}>{skill.nameJp}</div>
        )}
      </div>
      <div style={{ background: "#161208", borderRadius: 7, padding: "10px 12px" }}>
        {row("타이밍", skill.timing)}
        {row("판정", skill.judge)}
        {row("대상", skill.target)}
        {row("사거리", skill.range)}
        {row("코스트", skill.cost)}
        {row("SL상한", skill.slMax)}
        {skill.condition && row("사용조건", skill.condition)}
      </div>
      <p style={{ color: "#C8B870", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{skill.effect}</p>
    </div>
  )
}

// ── 신 이미지 슬롯 ────────────────────────────────────────────────────────────

function GodImage({ id, name, accent }: { id: string; name: string; accent: string }) {
  return (
    <div style={{
      width: 300, flexShrink: 0,
      border: `2px solid ${accent}`, borderRadius: 10, overflow: "hidden",
      background: "#0C0A06", alignSelf: "flex-start"
    }}>
      <img
        src={`/gods/${id}.jpg`}
        alt={name}
        style={{ width: "100%", display: "block" }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement
          img.style.display = "none"
          const wrapper = img.parentElement
          if (wrapper) {
            wrapper.style.display = "flex"
            wrapper.style.flexDirection = "column"
            wrapper.style.alignItems = "center"
            wrapper.style.justifyContent = "center"
            wrapper.style.height = "360px"
            wrapper.style.color = accent
            wrapper.style.gap = "8px"
            wrapper.style.fontSize = "13px"
            wrapper.innerHTML = `<span style="font-size:40px">🖼</span><span>${name}</span><span style="color:#5A5030;font-size:11px">/gods/${id}.jpg</span>`
          }
        }}
      />
    </div>
  )
}

// ── 데이터 ────────────────────────────────────────────────────────────────────

const gods = [
  {
    id: "arkenrav",
    name: "아켄라브",
    nameJp: "アーケンラーヴ",
    title: "태양의 신",
    race: "휴린족의 신",
    accent: "#C8A830",
    lore: [
      {
        heading: "태양신 아켄라브",
        text: "천공신 다그데모아와 대지의 여신 다난으로부터 태어난 태양의 신. 은빛 검과 황금빛 머리카락을 특징으로 하며, 신전의 미술 작품에서는 검을 높이 들고 신들의 선두에 서서 악의 군대에 맞서는 모습으로 자주 묘사된다."
      },
      {
        heading: "휴린족과 아켄라브",
        text: "불의 시대에 예언의 여신 브리간티아가 아켄라브에 의해 보내어진 휴린을 탄생시켰다. 아켄라브가 항상 전투의 선두에 섰던 것처럼 휴린족도 전장에서 먼저 나아가 싸우도록 정해졌으며, 이 때문에 다른 종족보다 강한 전투 기질을 갖추게 되었다."
      },
      {
        heading: "신들의 왕",
        text: "칠대신 중에서도 신들의 왕으로 여겨지며, 왕족·귀족 같은 지배층 사이에서도 신자가 많다. 빛으로 치유하며 싸웠다는 전설 때문에 신관들 사이에서도 널리 숭배받고 있다. 그란펠덴을 비롯한 여러 나라에서 국가 신앙의 중심을 이룬다."
      },
    ],
    skills: [
      {
        name: "정화의 일섬", nameJp: "浄化の一閃",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "5", slMax: "3",
        effect: "공격의 데미지에 +2DL의 〈빛〉 속성 마법 데미지를 추가한다."
      },
      {
        name: "파사의 증거", nameJp: "破邪の証",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "공격 대상이 「분류: 요마·마수·마족·사신」일 때 유효. 그 공격의 데미지에 +5한다."
      },
      {
        name: "양광의 칼날", nameJp: "陽光の刃",
        timing: "셋업프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "3",
        effect: "무기 공격의 데미지에 +1D한다. 이 효과는 [SL+1]회까지 중복 사용 가능하다."
      },
    ] as Skill[],
  },
  {
    id: "brigantia",
    name: "브리간티아",
    nameJp: "ブリガンティア",
    title: "달의 여신",
    race: "엘다난족의 신",
    accent: "#8A8ACA",
    lore: [
      {
        heading: "달의 여신 브리간티아",
        text: "달과 꿈, 신탁을 관장하는 여신. 마술의 신이기도 하며 엘다난족의 수호신이다. 에린에서 가장 널리 숭배받는 여신 중 하나로, 아발론에서도 브리간티아 신앙이 중심적 역할을 한다."
      },
      {
        heading: "엘다난과 예언",
        text: "엘다난족의 먼 조상인 에르다 시대부터 브리간티아는 예언의 역할을 맡아왔다. '불의 시대'에 마물 부활을 예언하며 아켄라브와 함께 휴린족을 에린에 보냈다는 전설이 있다. 신탁을 통해 지도자들에게 길을 제시하는 수호자로 여겨진다."
      },
      {
        heading: "마술의 여신",
        text: "마술과 기예를 사랑하는 여신으로, 엘다난의 뛰어난 마술 능력은 브리간티아의 축복에서 비롯되었다고 전해진다. 그녀의 신전은 종종 도서관이나 학원과 함께 세워지며, 지식과 예술을 중시하는 자들의 신앙 대상이 된다."
      },
    ],
    skills: [
      {
        name: "월광의 무류", nameJp: "月光の霧流",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "─",
        effect: "마술 분류의 단체 대상을 「범위 선택」으로 변경한다. 이 효과는 메인프로세스 종료까지 지속된다."
      },
      {
        name: "마술신의 비의", nameJp: "魔術神の秘義",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "─",
        effect: "마법 공격·힐·데미지 증가 등 마술 효과의 수치에 +2한다."
      },
      {
        name: "여신의 조언", nameJp: "女神の助言",
        timing: "메이저액션", judge: "자동성공", target: "단체",
        range: "20m", cost: "5", slMax: "3",
        effect: "대상의 마법 데미지를 +[SL×3]한다. 이 효과는 씬 종료까지 지속된다."
      },
    ] as Skill[],
  },
  {
    id: "dagdemoa",
    name: "다그데모아",
    nameJp: "ダグデモア",
    title: "천공의 신",
    race: "버나족의 신",
    accent: "#4A88CA",
    lore: [
      {
        heading: "천공신 다그데모아",
        text: "빛의 시대에 하늘과 땅이 나뉠 때 그 사이에서 태어난 천공의 신. 대지의 여신 다난과 부부신이 되어 수많은 신들을 낳았다. 에린 신들의 아버지로 여겨지며, 하늘을 나는 자유를 상징한다."
      },
      {
        heading: "버나족의 창조",
        text: "물의 시대에 대지의 구멍에 숨어 반격을 노리는 마물들을 없애기 위해 버나족을 창조했다. 비행 능력을 타고난 버나족은 하늘에서 마물을 감시하고 싸우는 역할을 부여받았다. 때문에 버나족은 다그데모아를 조상신으로 깊이 경배한다."
      },
      {
        heading: "하늘의 자유",
        text: "속박을 싫어하고 광활한 하늘처럼 자유를 사랑하는 신으로 묘사된다. 그의 신자들은 여행자·뱃사람·탐험가가 많으며, 먼 여행을 떠나기 전에 다그데모아에게 제를 올리는 풍습이 널리 퍼져 있다."
      },
    ],
    skills: [
      {
        name: "하늘의 노래", nameJp: "空の歌",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "─",
        condition: "비행",
        effect: "비행 상태일 때 사용 가능. 공격 데미지에 보너스를 부여한다. 이 효과는 씬 종료까지 지속된다."
      },
      {
        name: "날개의 노래", nameJp: "翼の歌",
        timing: "메이저액션", judge: "자동성공", target: "캐릭터 1체",
        range: "10m", cost: "3", slMax: "─",
        effect: "대상을 비행 상태로 만든다. 이 효과는 씬 종료까지 지속된다."
      },
      {
        name: "천공의 기교", nameJp: "天空の技巧",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "주사위 판정 결과에 따라 HP 회복, MP 회복, 데미지 증가 등의 효과를 얻는다."
      },
    ] as Skill[],
  },
  {
    id: "danan",
    name: "다난",
    nameJp: "ダナン",
    title: "대지의 여신",
    race: "모든 종족의 신",
    accent: "#5A9A4A",
    lore: [
      {
        heading: "대지의 여신 다난",
        text: "빛의 시대에 천공신 다그데모아와 함께 탄생한 대지의 여신. 에린의 모든 대지와 생명을 관장하며, 대지의 풍요와 수확의 신으로 농부와 농경민 사이에서 깊이 숭배된다."
      },
      {
        heading: "생명의 어머니",
        text: "다그데모아와 함께 수많은 신들을 낳은 신들의 어머니. 모든 생명의 근원으로 여겨지며, 살아있는 모든 것을 자식처럼 아끼는 따뜻한 신으로 묘사된다. 大地の母라고도 불리며, 출산과 양육의 신으로서도 경배된다."
      },
      {
        heading: "대지의 수호",
        text: "전장에서는 흙과 돌로 방벽을 만들어 아군을 지키는 수호의 신이기도 하다. 방어에 특화된 능력을 갖추며, 특히 비행하지 않고 땅을 밟고 있는 자에게 힘을 부여한다고 전해진다. 땅과의 연결이 그녀 힘의 근원이다."
      },
    ],
    skills: [
      {
        name: "자애의 대지", nameJp: "慈愛の大地",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "비행 상태가 아닐 때 유효. 공격의 데미지를 +[SL×2]한다."
      },
      {
        name: "대수의 비호", nameJp: "大樹の庇護",
        timing: "메이저액션", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "3",
        effect: "물리방어력과 마법방어력을 각각 +[SL×3]한다. 이 효과는 씬 종료까지 지속된다."
      },
      {
        name: "대지의 벽", nameJp: "大地の壁",
        timing: "반응 (데미지 직후)", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "방어 중 1회",
        effect: "받는 데미지를 [SL×3]만큼 경감한다. 같은 타이밍에 복수 발동된 경우, 대상이 어느 것을 적용할지 선택한다."
      },
    ] as Skill[],
  },
  {
    id: "aema",
    name: "아에마",
    nameJp: "アエマ",
    title: "샘의 여신",
    race: "필보르족의 신",
    accent: "#4AA89A",
    lore: [
      {
        heading: "샘의 여신 아에마",
        text: "강과 샘, 물을 관장하는 여신. 아발론의 이주신(두 기둥의 여신) 중 한 명으로, 브리간티아와 함께 유계 안에 방새도시 아발론을 창조했다. 물의 흐름처럼 온화하고 인자한 성품을 가졌다고 전해진다."
      },
      {
        heading: "필보르족과의 인연",
        text: "땅의 시대에 아에마가 필보르족을 낳았다고 전해진다. 자연과 생명을 소중히 여기는 필보르의 성품은 어머니 여신 아에마를 닮았다는 이야기가 있다. 필보르족은 특히 아에마를 깊이 숭배하며, 그녀의 신전은 샘이나 강가에 세워지는 경우가 많다."
      },
      {
        heading: "치유와 위로",
        text: "상처 입은 자를 치유하고 지친 자에게 위로의 비를 내려주는 여신으로 알려져 있다. 치유사와 의사들에게 특히 경배받으며, 전쟁터에서 부상자를 돌보는 자들이 아에마에게 기도를 올린다. 물처럼 부드럽지만 결코 굴하지 않는 강인함을 상징하기도 한다."
      },
    ],
    skills: [
      {
        name: "위로의 비", nameJp: "慰めの雨",
        timing: "무브액션", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "씬 SL회",
        effect: "HP를 [SL×5]만큼 회복한다. 또한 자신에게 걸린 상태이상을 하나 해제한다."
      },
      {
        name: "강의 흐름", nameJp: "河の流れ",
        timing: "무브액션", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "3",
        effect: "〈수〉 속성 마법 공격의 데미지에 +2D한다. 이 효과는 메인프로세스 종료까지 지속된다."
      },
      {
        name: "은혜의 꽃", nameJp: "恵みの花",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "HP 회복 스킬·아이템의 효과에 +[SL×3]한다."
      },
    ] as Skill[],
  },
  {
    id: "gobannon",
    name: "고바논",
    nameJp: "ゴヴァノン",
    title: "산의 신 / 단야의 신",
    race: "네바프족의 신",
    accent: "#CA7A2A",
    lore: [
      {
        heading: "산의 신 고바논",
        text: "산과 대장장이, 단야(鍛冶)를 관장하는 신. 철을 다루고 무기와 도구를 만드는 기술의 신이기도 하다. 거대한 수염을 가진 우람한 체구의 신으로 묘사되며, 그 수염에서 힘이 나온다는 전설이 있다."
      },
      {
        heading: "네바프족의 조상",
        text: "땅의 시대에 고바논이 네바프족을 낳았다고 전해진다. 연금술과 기술에 뛰어난 네바프의 재능은 창조의 신 고바논의 축복에서 비롯되었다고 여겨진다. 네바프의 대장장이와 발명가들은 고바논을 특히 깊이 경배한다."
      },
      {
        heading: "불과 쇠의 신",
        text: "원시의 불을 다루어 세상에 새로운 것을 창조하는 신으로, 불의 힘을 무기에 깃들여 적을 쓰러뜨린다고 전해진다. 그의 신전은 대장간과 함께 세워지는 경우가 많으며, 새 무기를 벼리기 전에 고바논에게 제를 올리는 풍습이 있다."
      },
    ],
    skills: [
      {
        name: "단야신의 손가락", nameJp: "鍛冶神の指",
        timing: "메이저액션", judge: "자동성공", target: "단체",
        range: "30m", cost: "4", slMax: "3",
        effect: "대상의 무기 공격 데미지를 +[SL×3]한다. 이 효과는 메인프로세스 종료까지 지속된다."
      },
      {
        name: "원시의 종화", nameJp: "原始の種火",
        timing: "셋업프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "3",
        effect: "자신의 무기 공격을 〈화〉 속성 마법 데미지로 변환한다. 이 효과는 씬 종료까지 지속된다."
      },
      {
        name: "망치의 일격", nameJp: "槌の一撃",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "타격 무기 사용",
        effect: "타격 무기로 공격할 때 명중판정의 달성값을 +[SL×2]한다."
      },
    ] as Skill[],
  },
  {
    id: "granain",
    name: "그랑아인",
    nameJp: "グランアイン",
    title: "번개의 신",
    race: "두앙족의 신",
    accent: "#7A4ACA",
    lore: [
      {
        heading: "번개의 신 그랑아인",
        text: "번개와 전쟁을 관장하는 신. 강렬한 번개처럼 압도적인 힘과 전투 능력으로 적을 쳐부수는 전신(戰神)이기도 하다. 왕위와 용기의 상징으로 여겨지며, 전사들의 신앙을 크게 받는다."
      },
      {
        heading: "두앙족의 조상",
        text: "물의 시대에 그랑아인이 두앙족을 만들었다고 전해진다. 강인하고 용감한 두앙의 전사 기질은 그랑아인의 힘에서 비롯되었다는 이야기가 있다. 두앙족은 전투 전에 반드시 그랑아인에게 기도를 올리는 풍습을 가진다."
      },
      {
        heading: "아들과 이중성",
        text: "번개와 전쟁이라는 두 가지 속성을 가진 그랑아인은 파괴적인 힘과 동시에 전쟁을 끝내고 평화를 가져오는 존재로도 묘사된다. 신전의 조각에서는 한 손에 번개를 쥐고 다른 손으로 화평의 손짓을 하는 모습으로 표현된다."
      },
    ],
    skills: [
      {
        name: "전신의 주먹", nameJp: "戦神の拳",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "격투 사용",
        effect: "격투 무기로 공격할 때 데미지를 +[SL×3]한다."
      },
      {
        name: "토멸의 번개", nameJp: "討滅の雷",
        timing: "마이너액션", judge: "자동성공", target: "캐릭터 1체",
        range: "30m", cost: "6", slMax: "1",
        condition: "시나리오 1회",
        effect: "무기 공격에 추가로 [SL×10] 〈뇌〉 속성 마법 데미지를 부여하고, 대상에게 「속박」 상태를 1라운드 부여한다."
      },
      {
        name: "뇌신난무", nameJp: "雷神乱舞",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "3",
        condition: "씬 SL회",
        effect: "메인프로세스 종료까지 공격 횟수를 +1한다. 추가 공격에는 〈뇌〉 속성 마법 데미지 +[SL×2]가 부여된다."
      },
    ] as Skill[],
  },
]

// ── 섹션 컴포넌트 ──────────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <section>
      <div style={{
        background: "#10100A", border: `1px solid ${ACCENT}`,
        borderRadius: 8, padding: 16, marginBottom: 20
      }}>
        <div style={{ color: ACCENT, fontWeight: 700, marginBottom: 8, fontSize: 15 }}>
          📜 아리안로드 미솔로지 가이드
        </div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.75, margin: "0 0 10px" }}>
          에린에 전해지는 창세 신화와 칠대신(七大神)에 관한 기록을 담은 가이드입니다.
          신화의 내용은 현지 신관들에 의해 구전되어 왔으며, 지역과 시대에 따라 세부 내용이 달라지는 경우도 있습니다.
          여기에 수록된 것은 주로 휴린족 사이에서 전승된 가장 널리 알려진 버전입니다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
          신들은 빛의 시대에 천지를 창조한 이래 에린을 지켜보고 있으며, 선택받은 자들에게 「천혜(天惠) 스킬」이라는 형태로 신들의 가호를 수여한다고 전해진다.
        </p>
      </div>

      <SecTitle title="칠대신 일람" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, marginBottom: 28 }}>
        {gods.map(g => (
          <div key={g.id} style={{
            background: "#0C0A06", border: `1px solid ${g.accent}`,
            borderRadius: 8, padding: "10px 14px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontWeight: 700, color: g.accent, fontSize: 15 }}>{g.name}</span>
                <span style={{ color: "#5A5030", fontSize: 11, marginLeft: 6 }}>{g.nameJp}</span>
              </div>
            </div>
            <div style={{ color: "#C8B870", fontSize: 12, marginTop: 3 }}>{g.title}</div>
            <div style={{ color: "#8A7830", fontSize: 11, marginTop: 2 }}>{g.race}</div>
          </div>
        ))}
      </div>

      <SecTitle title="천혜 스킬이란" />
      <Prose text="신들에게 선택된 신환자(神喚者)들은 자신이 따르는 신의 페이스(Face)를 취득함으로써 「천혜 스킬」을 습득할 수 있다. 천혜 스킬은 해당 신의 가호를 받아 발동되는 특수한 능력이며, 신과의 계약을 상징하는 존재의 증명이다." />
      <Prose text="각 신에게는 고유한 3가지 천혜 스킬이 있으며, 각 스킬은 페이스 레벨에 따라 취득할 수 있다. 천혜 스킬은 그 신이 관장하는 영역을 반영하며, 신자가 전투에서 신의 힘을 발휘할 수 있도록 돕는다." />
    </section>
  )
}

function CreationMythSection() {
  const ages = [
    {
      name: "빛의 시대",
      icon: "☀️",
      color: "#C8A830",
      text: "최초에 하늘과 땅이 뒤섞여 혼돈만이 있었다. 그후 하늘과 땅이 나뉘고, 그 틈새에서 빛이 생겨났다.\n\n이 하늘과 땅 사이에서 천공신 다그데모아와 대지의 여신 다난이 태어났다. 두 신은 수많은 신들을 낳았고, 빛의 언어로 만물에 권능을 부여하며 정령들을 창조했다. 정령들 중에서도 가장 강한 빛을 가진 자들은 「왕」이라 불리며 물, 불, 바람, 빛 등의 자연 현상을 관장하는 역할을 맡았다.\n\n그 중에서도 「광휘의 왕」 마라이카가 항상 세계를 빛으로 가득 채우며 정화했다. 이 시대는 그 어느 시대와도 비교할 수 없을 만큼 평화롭고 풍요로웠다.",
    },
    {
      name: "바람의 시대",
      icon: "🌪",
      color: "#8A8ACA",
      text: "신들은 정령, 동물에 이어 더욱 자유로운 의지를 가진 존재인 에르다들을 낳아 에린딜에 보냈다. 에르다들은 정령처럼 아름답고 현명했지만, 정령과 달리 자신만의 의지와 욕망을 가졌다.\n\n처음에는 정령에게서 지혜와 기술을 배우며 평화롭게 살았으나, 점차 신의 피조물임을 잊어갔다. 에르다들 사이에 의심이 생겨났고, 그 의심은 두려움과 질투로 변했다. 이 감정들이 결합하자 공포의 정령 트리팔크, 증오의 신 크롬쿠르, 위협의 신 인데이마, 질투의 여신 모리안, 소탐대실의 여신 유오발, 욕망의 여신 마가다 같은 사신(邪神)들이 이름을 갖추게 되었다.\n\n신들은 바람의 정령왕 디지니에게 명하여 역병을 불어넣어 에르다들을 정화했다. 이를 「바람의 서청(書淸)」이라 부른다.",
    },
    {
      name: "물의 시대",
      icon: "💧",
      color: "#4A88CA",
      text: "바람의 서청에서 완전히 사라지지 않은 악한 자들이 대지의 구멍에 숨어 반격의 기회를 노리고 있었다. 이 마물들을 없애기 위해 천공신 다그데모아가 버나족을 창조하고, 뇌신 그랑아인이 두앙족을 만들었다.\n\n그러나 보통의 민이 다시 내분에 빠졌다. 신들은 물의 정령왕 마리드에게 명하여 물로 세계를 정화시켰다. 이것이 「물의 서청」이었다.",
    },
    {
      name: "땅의 시대",
      icon: "🌍",
      color: "#5A9A4A",
      text: "새롭게 변한 세계에서 샘의 여신 아에마가 필보르족을 낳고, 대장신 고바논이 네바프족을 낳았다.\n\n「물의 서청」에서 유일하게 살아남은 에르다 바랄이 있었다. 그는 마왕이 되어 마족들을 부하로 두고 여러 종족을 지배했다. 두앙 여성들의 기도가 신에게 닿아, 신들은 대지의 정령왕 다오에게 명하여 지옥을 갈라 바랄과 마족들을 마계로 던져넣었다. 이것을 「땅의 서청」이라 불렀다.",
    },
    {
      name: "불의 시대",
      icon: "🔥",
      color: "#CA7A2A",
      note: "현재",
      text: "마물이 사라지고 세계는 빛을 되찾았다. 그러나 쫓겨났던 자들이 완전히 사라지지 않았고, 불안에 휩싸여 신들에게 제재를 받았다고 의심하는 자도 적지 않았다.\n\n그러한 시대에, 예언의 여신 브리간티아가 태양신 아켄라브에 의해 보내어진 휴린을 탄생시켰다. 두 민족은 다가오는 마물 부활을 막기 위해 보내어졌다는 전설이 있다.\n\n이렇게 「불의 시대」가 시작되었으며, 이것이 곧 현재의 시대다. 마물의 위협은 사라지지 않았고, 신들에게 선택받은 신환자들이 오늘도 에린을 지키기 위해 싸우고 있다.",
    },
  ]

  return (
    <section>
      <Prose text="에린에 전해지는 창세 신화는 크게 5개의 시대로 나뉜다. 각 시대는 신들의 의지로 이루어진 「서청(書淸)」이라 불리는 정화 사건을 통해 구분된다." />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
        {ages.map((age) => (
          <div key={age.name} style={{
            background: "#0C0A06", border: `1px solid ${age.color}`,
            borderRadius: 10, overflow: "hidden"
          }}>
            <div style={{
              background: age.color + "22", borderBottom: `1px solid ${age.color}`,
              padding: "10px 16px", display: "flex", alignItems: "center", gap: 10
            }}>
              <span style={{ fontSize: 20 }}>{age.icon}</span>
              <span style={{ fontWeight: 700, color: age.color, fontSize: 16, fontFamily: "'Noto Serif KR', serif" }}>
                {age.name}
              </span>
              {age.note && (
                <span style={{
                  marginLeft: 6, background: age.color, color: "#000",
                  fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10
                }}>{age.note}</span>
              )}
            </div>
            <div style={{ padding: "14px 16px" }}>
              {age.text.split('\n\n').map((para, i) => (
                <Prose key={i} text={para} color="#D8CCA8" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GodsOverviewSection() {
  return (
    <section>
      <Prose text="에린에는 칠대신 외에도 수많은 신들이 있으며, 각자 직능을 맡아 역할을 다하고 있다. 칠대신은 에린의 창조와 역사에 깊이 관여한 가장 강력한 신들로, 현재도 신환자들을 통해 에린의 세계에 영향을 미치고 있다." />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {gods.map(g => (
          <div key={g.id} style={{
            background: "#0C0A06", border: `1px solid ${g.accent}`,
            borderRadius: 8, padding: "12px 16px",
            display: "flex", alignItems: "flex-start", gap: 14
          }}>
            <div style={{
              width: 6, alignSelf: "stretch", background: g.accent,
              borderRadius: 3, flexShrink: 0
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: g.accent, fontSize: 16 }}>{g.name}</span>
                <span style={{ color: "#5A5030", fontSize: 11 }}>{g.nameJp}</span>
                <span style={{ color: "#C8B870", fontSize: 12 }}>— {g.title}</span>
              </div>
              <div style={{ color: "#8A7830", fontSize: 12 }}>{g.race}</div>
            </div>
          </div>
        ))}
      </div>

      <SecTitle title="기타 신들" />
      <Prose text="칠대신 외에도 에린에는 수많은 소신(小神)들이 존재한다. 강과 샘의 정령신, 산의 수호신, 항해를 돕는 바람의 신 등 자연 현상과 인간의 활동 각 영역에 걸쳐 다양한 신들이 숭배받고 있다." />
      <Prose text="또한 바람의 시대에 에르다들이 세계 창조에 쓰인 혼돈의 잔재를 바탕으로 만들어낸 사신(邪神)들도 존재한다. 신들과의 전투에서 패배한 많은 사신들은 현재 마계나 다른 장소에 봉인되어 있다." />
    </section>
  )
}

function GodSection({ god }: { god: typeof gods[0] }) {
  return (
    <section>
      {/* 헤더 배너 */}
      <div style={{
        background: `linear-gradient(135deg, ${god.accent}22 0%, ${god.accent}08 100%)`,
        border: `1px solid ${god.accent}`,
        borderRadius: 12, padding: "20px 28px", marginBottom: 32
      }}>
        <div style={{ fontSize: 11, color: god.accent, letterSpacing: 3, marginBottom: 6, textTransform: "uppercase" }}>
          칠대신 · {god.race}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{
            fontSize: 36, fontWeight: 700, color: god.accent,
            fontFamily: "'Noto Serif KR', serif", margin: 0, letterSpacing: "-0.5px"
          }}>{god.name}</h2>
          <span style={{ color: "#8A7830", fontSize: 15 }}>{god.nameJp}</span>
          <span style={{ color: "#C8B870", fontSize: 15 }}>— {god.title}</span>
        </div>
        <div style={{ width: 60, height: 3, background: god.accent, marginTop: 14, borderRadius: 2 }} />
      </div>

      {/* 이미지 + 본문 */}
      <div style={{ display: "flex", gap: 32, marginBottom: 36, alignItems: "flex-start" }}>
        <GodImage id={god.id} name={god.name} accent={god.accent} />
        <div style={{ flex: 1 }}>
          {god.lore.map((section, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <SecTitle title={section.heading} color={god.accent} />
              <Prose text={section.text} />
            </div>
          ))}
        </div>
      </div>

      {/* 천혜 스킬 */}
      <div style={{
        background: god.accent + "18",
        borderLeft: `4px solid ${god.accent}`,
        padding: "10px 16px", marginBottom: 16, borderRadius: "0 8px 8px 0"
      }}>
        <span style={{ color: god.accent, fontWeight: 700, fontSize: 14 }}>
          ✨ 천혜 스킬 (天惠スキル)
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {god.skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} accent={god.accent} />
        ))}
      </div>
    </section>
  )
}

// ── 네비게이션 ────────────────────────────────────────────────────────────────

const navItems = [
  { id: "overview",   label: "개요",       icon: "📖" },
  { id: "creation",   label: "창세신화",   icon: "🌌" },
  { id: "gods",       label: "칠대신",     icon: "⚜️" },
  { id: "arkenrav",   label: "아켄라브",   icon: "☀️" },
  { id: "brigantia",  label: "브리간티아", icon: "🌙" },
  { id: "dagdemoa",   label: "다그데모아", icon: "🪁" },
  { id: "danan",      label: "다난",       icon: "🌿" },
  { id: "aema",       label: "아에마",     icon: "💧" },
  { id: "gobannon",   label: "고바논",     icon: "⚒️" },
  { id: "granain",    label: "그랑아인",   icon: "⚡" },
]

const godAccentMap: Record<string, string> = Object.fromEntries(
  gods.map(g => [g.id, g.accent])
)

// ── 메인 ─────────────────────────────────────────────────────────────────────

export default function MythologyPage() {
  const [active, setActive] = useState("overview")

  const godData = gods.find(g => g.id === active)

  function renderContent() {
    switch (active) {
      case "overview":  return <OverviewSection />
      case "creation":  return <CreationMythSection />
      case "gods":      return <GodsOverviewSection />
      default:
        if (godData) return <GodSection god={godData} />
        return <OverviewSection />
    }
  }

  const currentAccent = godAccentMap[active] ?? ACCENT

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE" }}>
        {/* Sidebar */}
        <aside style={{
          width: 220, background: SIDEBAR_BG, color: "#E0D8B0",
          display: "flex", flexDirection: "column", padding: "24px 0",
          position: "sticky", top: 0, height: "100vh", overflowY: "auto"
        }}>
          <a href="/" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: "11px", color: "#888" }}>← 아리안로드 위키</div>
          </a>
          <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid #2A2808" }}>
            <div style={{ fontSize: 11, color: "#8A7830", letterSpacing: 2, marginBottom: 4 }}>ARIANROD 2E</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#F0E090", lineHeight: 1.3 }}>
              신화 가이드
            </div>
            <div style={{ fontSize: 11, color: "#8A7830", marginTop: 4 }}>ミソロジーガイド</div>
          </div>
          <nav style={{ padding: "12px 0", flex: 1 }}>
            {navItems.map(item => {
              const isGod = gods.some(g => g.id === item.id)
              const itemAccent = isGod ? (godAccentMap[item.id] ?? ACCENT) : ACCENT
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    width: "100%", textAlign: "left",
                    padding: isGod ? "8px 20px 8px 28px" : "10px 20px",
                    background: isActive ? "#1A1808" : "transparent",
                    color: isActive ? "#F0E090" : (isGod ? "#907840" : "#A89040"),
                    border: "none",
                    borderLeft: isActive ? `3px solid ${itemAccent}` : "3px solid transparent",
                    cursor: "pointer", fontSize: isGod ? 12 : 13,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {item.icon} {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "40px 60px", overflowY: "auto" }}>
          <header style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: "#8A7830", marginBottom: 4 }}>아리안로드 미솔로지 가이드</div>
            <h1 style={{
              fontSize: 32, fontWeight: 700, color: "#1A1408",
              fontFamily: "'Noto Serif KR', serif", margin: "0 0 4px"
            }}>
              에린의 신화와 칠대신
            </h1>
            <div style={{ fontSize: 14, color: "#6A5820" }}>ミソロジーガイド — 창세신화 · 칠대신 · 천혜 스킬</div>
            <div style={{ width: 60, height: 3, background: currentAccent, marginTop: 12, borderRadius: 2, transition: "background 0.3s" }} />
          </header>
          {renderContent()}
        </main>
      </div>
    </>
  )
}
