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

// ── 소신 데이터 ───────────────────────────────────────────────────────────────

const minorGods = [
  {
    id: "glovis",
    name: "글로비스",
    nameJp: "グローヴィス",
    title: "검의 여신",
    parentage: "고바논의 딸",
    accent: "#D4863A",
    lore: [
      {
        heading: "여신의 축제",
        text: "전투의 날을 기념하는 여신 글로비스. 아스란에서도 제사가 행해졌으나, 처음에는 여신을 얕보는 자들도 있었다. 그러나 이 행동을 통해 사람들이 단결하는 힘을 깊이 인식하게 되어, 이 양식이 정착하기 시작했다는 이야기가 전해진다."
      },
      {
        heading: "고바논의 딸",
        text: "단야신 고바논의 딸로, 검과 방패를 든 불꽃의 여신. 붉은 빛의 긴 머리카락을 가진 20대 여성의 모습으로 현현하며, 성격은 진지하고 과묵하다. 신들이 천계로 떠난 후에도 글로비스는 에린에 머물며, 숙적 「패의 신」 셀노그를 쫓는 역할을 떠맡아 끊임없는 싸움을 계속하고 있다."
      },
      {
        heading: "신봉자들",
        text: "글로비스를 신봉하는 자는 여신의 군세에 몸을 던지고, 셀노그와의 싸움에 목숨을 거는 자들이다. 여신의 자질이 있다고 인정받은 자에게 여신의 사자가 찾아온다. 이들은 아스란 방면 너머, 신들의 전장 아스란에서 날마다 사신의 군세와 싸우고 있다."
      },
    ],
    skills: [
      {
        name: "방패의 기원", nameJp: "盾の願い",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "방패 장비",
        effect: "【물리방어력】과 【마법방어력】을 +[SL×2]한다. 글로비스의 이름 아래 방패에 기원을 맡겨 방어 능력을 높이는 천혜 스킬."
      },
      {
        name: "불의 검", nameJp: "火の剣",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "1",
        effect: "대상이 행하는 무기 공격 데미지를 〈화〉 속성의 마법 데미지로 변경한다. 이 효과는 메인프로세스 종료까지 지속된다. 손에 든 무기에 불꽃을 깃드는 천혜 스킬."
      },
      {
        name: "검의 서약", nameJp: "剣の誓い",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "무기 공격의 데미지에 +1D한다. 글로비스의 이름 아래 검에 서약을 세워, 그 성능을 높이는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "lial",
    name: "리알",
    nameJp: "リアール",
    title: "바다의 신",
    parentage: "다그데모아와 다난의 아들",
    accent: "#2A7ABE",
    lore: [
      {
        heading: "여덟 번째 기둥의 신",
        text: "천지개벽 때 세계에 아직 바다가 없었다. 대지에 높낮이 차이가 생기자, 낮은 곳에 모인 물이 거대한 바다가 되었다. 다그데모아와 다난이 리알을 낳아 이 바다의 관리를 맡겼다. 리알은 이 바다를 바다라 이름 짓고, 물의 정령 마리드에 명하여 바다 속에 사는 동물들을 낳았다."
      },
      {
        heading: "바다와 폭풍의 신",
        text: "리알은 바다와 폭풍의 신으로, 삼지창을 들고 오른손에 거친 폭풍을 일으키는 강인한 장년 남성의 모습으로 묘사된다. 아에마 동방의 강과 샘의 여신 나키하사메와는 다른 존재로, 리알은 바다 그 자체를 관장한다."
      },
      {
        heading: "신봉자들",
        text: "신봉자로는 항해사나 어부뿐만 아니라 바다와 삶이 밀접한 자들이 많다. 항해 전 반드시 리알에게 기도를 드리고 출항하는 것이 풍습으로 남아 있다."
      },
    ],
    skills: [
      {
        name: "폭풍의 어령", nameJp: "嵐の御霊",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "8", slMax: "3",
        condition: "씬 SL회",
        effect: "무기 공격을 「대상: 범위(선택)」으로 변경하고, 데미지를 〈풍〉 속성의 마법 데미지로 변경한다. 리알의 폭풍을 이용해 공격하는 천혜 스킬."
      },
      {
        name: "분노의 닻", nameJp: "怒りの錨",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "무기 사용 시 금전판정 달성값에 +SL. 무기 공격의 데미지에 +[SL×2]한다. 리알의 거친 마음을 닻에 깃드는 천혜 스킬."
      },
      {
        name: "바다의 심", nameJp: "海の心",
        timing: "셋업프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "7", slMax: "1",
        effect: "수영 상태에 의한 페널티를 받지 않는다. 또한 수영 상태가 아니어도 「사용조건: 수영」의 스킬 효과를 받을 수 있다. 이 효과는 씬 종료까지 지속된다."
      },
    ] as Skill[],
  },
  {
    id: "merinusu",
    name: "메리뉴스",
    nameJp: "メリヌス",
    title: "상업의 신 · 도둑의 신",
    parentage: "칠대신의 사자",
    accent: "#8A7A28",
    lore: [
      {
        heading: "상업의 시작",
        text: "메리뉴스는 전직이 없을 때 에르다의 왕국에 잠입해 뛰어난 변장으로 섞여 살았다. 에르다들이 조물에 따라 만들어내는 물건들의 개성에 흥미를 느끼고, 어느 날 에르다의 남자가 다른 이가 만든 물건을 빼앗는 장면을 목격했다. 「원하는 것이 있다면 교환하면 된다」는 제안에 수긍한 에르다의 남자는 물물교환을 배웠다. 이 일화가 「물물교환」, 나아가 오늘날 상업의 기본 개념의 시작이라 전해진다."
      },
      {
        heading: "상업과 도둑의 신",
        text: "메리뉴스는 상업과 도둑의 신으로도 여겨진다. 검은 새 깃털을 두른 모자와 샌들을 신은 젊은 남성으로 묘사되며, 경계심이 강하고 지혜가 넘쳐 상황을 빠르게 파악한다. 상업이란 이익을 위해 상대와 교섭하는 것으로, 결국 상대를 설득하는 능력이 필요하다는 점이 도둑과의 연결로 이어졌다고 전해진다."
      },
    ],
    skills: [
      {
        name: "속임의 칼날", nameJp: "欺きの刃",
        timing: "마이너액션", judge: "자동성공", target: "자신",
        range: "─", cost: "5", slMax: "3",
        effect: "당신이 행하는 공격 대상의 【물리방어력】과 【마법방어력】을 -[SL×5]한다(최저0). 이 효과는 메인프로세스 종료까지 지속된다. 대상을 속여 허점을 만드는 천혜 스킬."
      },
      {
        name: "상기도래", nameJp: "商機到来",
        timing: "셋업프로세스", judge: "자동성공", target: "단체",
        range: "20m", cost: "3", slMax: "3",
        effect: "행동량 증가를 행한다. 「행동량」에 +[SL]한다. 이 효과는 라운드 종료까지 지속된다. 상거래를 중시하는 자에게 행운을 부르는 천혜 스킬."
      },
      {
        name: "거래의 심득", nameJp: "取引の心得",
        timing: "판정의 직전", judge: "─", target: "자신",
        range: "─", cost: "4", slMax: "1",
        condition: "씬1회",
        effect: "판정의 직전에 사용한다. 그 판정에 +1D한다. 다양한 상황에 대응하기 위한 냉정한 판단력을 발휘하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "tereya",
    name: "테레이아",
    nameJp: "テーレイア",
    title: "사랑과 미의 여신",
    parentage: "브리간티아의 자매신",
    accent: "#C04A82",
    lore: [
      {
        heading: "여명의 샛별",
        text: "예언의 여신 브리간티아에게는 특이한 점이 있었다. 「바람의 시대」의 아직 평화로운 때, 에르다들 사이에서 마음을 이어주는 목소리를 가진 소녀가 있었다. 신으로서의 임무에 방해가 될까 걱정한 브리간티아는 마음이 약해졌다. 스스로 어두운 밤하늘의 공간에서 그 소녀의 모습을 창조했다. 마치 그 광경을 잘라낸 것처럼, 아름다운 모습의 소녀 신을 테레이아라 이름 붙이고 「자매처럼 함께 움직이도록」 말했다."
      },
      {
        heading: "빛나는 별의 여신",
        text: "테레이아는 사랑과 아름다움, 어둠 속에 빛나는 별의 신으로 여겨진다. 브리간티아의 자매신으로도 전해지나, 전승에 따라서는 브리간티아의 별개 모습이라고도 한다. 밤하늘의 짙은 보라색 긴 머리카락과 금색 뺨, 금빛 큰 거울을 가진 젊은 여성의 모습으로 나타난다. 성격은 청결하며 사랑스럽게 구는 요염한 여성이지만, 내면보다는 외모에서 비롯된 사랑과 아름다움을 상징한다."
      },
      {
        heading: "신봉자들",
        text: "신봉자로는 외적인 아름다움을 추구하는 자, 아름다움을 사랑하는 귀족 계층 여성들, 연애를 성사시키려는 자들이 많다. 또한 테레이아가 가진 거울이 상대의 마음을 비추어 보는 것처럼, 상대의 진짜 말로 자신을 지키는 수단으로 삼는다."
      },
    ],
    skills: [
      {
        name: "사랑의 응원", nameJp: "愛の応援",
        timing: "메이저액션", judge: "자동성공", target: "범위(선택)",
        range: "20m", cost: "6", slMax: "3",
        effect: "데미지 증가를 행한다. 대상의 「분류: 식물·언데드·기계」 이외에 대한 공격의 데미지에 +[SL×2]한다. 이 효과는 씬 종료까지 지속된다."
      },
      {
        name: "미의 빛남", nameJp: "美の輝き",
        timing: "셋업프로세스", judge: "자동성공", target: "단체",
        range: "20m", cost: "3", slMax: "3",
        condition: "씬1회",
        effect: "「분류: 식물·언데드·기계」 이외에 대한 공격의 데미지에 +[SL]한다. 이 효과는 라운드 종료까지 지속된다. 아름다움으로 상대의 주의를 빼앗는 천혜 스킬."
      },
      {
        name: "별의 거울", nameJp: "星の鏡",
        timing: "판정의 직전", judge: "자동성공", target: "단체",
        range: "20m", cost: "7", slMax: "1",
        condition: "시나리오1회",
        effect: "대상이 판정을 행하는 직전에 사용한다. 대상은 그 판정에서 불리한 수정을 받지 않는다. 이 효과는 라운드 종료까지 지속된다."
      },
    ] as Skill[],
  },
  {
    id: "ribel",
    name: "리벨",
    nameJp: "リベル",
    title: "술의 신",
    parentage: "아에마의 아들",
    accent: "#8A4ABE",
    lore: [
      {
        heading: "술의 발견",
        text: "술은 「빛의 시대」에 리벨이라는 소신에 의해 발견됐다는 이야기가 있다. 어느 풍요로운 때 포도가 방치되어 자연스럽게 발효되었다. 이를 먹은 동물들이 비틀거리거나 즐거워하는 것을 보고, 리벨은 스스로 먹어봤더니 기분이 고양되고 행복감이 넘치는 느낌이 들었다. 그는 이 액체를 「술」이라 이름 붙여 제조하기 시작했다. 이것이 양조의 시작이라 전해진다."
      },
      {
        heading: "풍요와 술의 신",
        text: "리벨은 아에마의 아들로, 풍요와 술의 신으로 여겨진다. 포도주를 담은 금빛 잔을 손에 들고, 중성적인 분위기의 미청년 모습으로 나타난다. 성격은 자유분방하고 쾌락을 좋아하며, 풍요로운 것을 좋아한다고 전해진다. 어머니 아에마의 일을 거들지 않고, 연회를 열어 새벽까지 즐기다가 결국 아에마를 화나게 해 일에서 쫓겨났다고 한다."
      },
    ],
    skills: [
      {
        name: "전투의 술", nameJp: "戦の酒",
        timing: "효과 참조", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "3",
        effect: "마이너액션으로 자신에게 「분류: 포션」 아이템을 사용할 때 공격 데미지 증가를 행한다. 이 효과는 씬 종료까지 지속된다. 복수 사용 시 [SL] 횟수 중복. 음주로 자신의 전투력을 높이는 천혜 스킬."
      },
      {
        name: "친구의 잔", nameJp: "友の杯",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "길드원과 같은 인카운터에 있을 때 당신이 행하는 공격의 데미지에 +1D한다. 잔을 교환한 동료와의 연대를 높여, 공격력을 향상시키는 천혜 스킬."
      },
      {
        name: "미주의 샘", nameJp: "美酒の泉",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "당신이 사용하는 「분류: 포션」 아이템의 효과를 +[SL×2]한다. 술에서 비롯된 풍요로운 효과를 높이고, 맛도 더욱 좋게 하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "toteusu",
    name: "토테우스",
    nameJp: "トーテウス",
    title: "여행의 신",
    parentage: "다난의 아들",
    accent: "#3A8870",
    lore: [
      {
        heading: "인도의 신",
        text: "세계에 여혼을 가진 존재가 너무 적어, 동물들은 만들어질 때부터 죽음을 기피하게 되었다. 토테우스는 그것을 기회로 영혼을 다시 육체로 되돌리는 방법을 찾아냈다. 이것이 탄생의 시작이라 전해진다. 영혼을 저세계로 인도하는 역할을 맡았다가, 현재는 죽음의 여행뿐만 아니라 여행을 떠나는 자들에게 가호를 주는 신이 되었다고도 전해진다."
      },
      {
        heading: "여행의 수호신",
        text: "토테우스는 여행을 수호하는 신으로 여겨진다. 후드가 달린 망토를 두르고, 긴 지팡이와 불 없이 켜지는 랜턴을 든 젊은 남성으로 나타난다. 성격은 과묵하며 자애롭지만 냉담하다. 기본적으로 토테우스는 영혼을 육체에서 분리하여 저세계로 인도하는 역할을 맡았으나, 현재는 여행을 보호하는 신이 되었다."
      },
    ],
    skills: [
      {
        name: "안식의 여정", nameJp: "安息の旅路",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "당신이 취득하고 있는 스킬의 「코스트」를 -1한다(최저1). 영혼에 안식을 줘 차분하게 스킬을 사용할 수 있게 하는 천혜 스킬."
      },
      {
        name: "조의의 칼날", nameJp: "弔いの刃",
        timing: "셋업프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "데미지 증가를 행한다. 공격의 데미지에 +[SL×2]한다. 「분류: 언데드」를 대상으로 하는 경우, 추가로 데미지에 +5한다. 잘 다루기 어려운 언데드를 봉인하는 전술을 나타내는 천혜 스킬."
      },
      {
        name: "여행의 횃불", nameJp: "旅の灯火",
        timing: "효과 참조", judge: "─", target: "자신",
        range: "─", cost: "6", slMax: "1",
        effect: "이동의 직전에 사용한다. 이 이동은 적 캐릭터와 인게이지해도 그 장소에서 계속 이동할 수 있다. 당신의 여행이 누구에게도 방해받지 않음을 나타내는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "kerunosu",
    name: "케루노스",
    nameJp: "ケルノス",
    title: "사냥의 신",
    parentage: "아에마에게 파견된 소신",
    accent: "#4A8A38",
    lore: [
      {
        heading: "야생 동물의 신",
        text: "신들이 천계로 떠나 두 번의 서청을 거친 「땅의 시대」에, 동물의 수를 늘리고 기르는 방법을 편찬해냈다. 그러나 엄격한 서청 이후 살아남은 동물 중에는 생존을 위해 사람을 습격하는 것들도 적지 않았다. 어느 날 인간들 앞에 뿔을 달고 긴 머리카락을 가진 남성이 나타났다. 그는 야생 동물들을 이끌었고, 인간들에게 사냥의 방법을 전수해 주었다. 이 자를 케루노스라 이름 붙였고, 케루노스는 야생 동물들의 수를 유지하면서 사람을 위해 적당히 사냥하는 것을 허가했다."
      },
      {
        heading: "수수께끼에 싸인 신",
        text: "케루노스는 사냥의 신으로 여겨진다. 수사슴의 뿔을 달고 긴 머리카락을 가진 젊은 남성으로, 손에는 수사슴 뿔로 만든 지팡이와 동물과 함께하는 모습으로 묘사된다. 현재 케루노스에 대한 상세 정보는 거의 없다. 신인지조차 의심받고 있는데, 이는 현존하는 자료가 거의 없기 때문이다."
      },
    ],
    skills: [
      {
        name: "사냥꾼의 기도", nameJp: "狩人の祈り",
        timing: "효과 참조", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "시나리오 SL회",
        effect: "당신이 행하는 드롭 품목 결정 롤을 모두 다시 굴린다. 사냥이 성공하도록 기원하는 천혜 스킬."
      },
      {
        name: "헌상의 기도", nameJp: "獻上の祈り",
        timing: "셋업프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "3",
        effect: "당신이 소지하고 있는 「종별: 식량」 아이템을 1개 소비한다. 공격의 데미지에 +4한다. 이 효과는 씬 종료까지 지속된다. 복수 사용 시 SL 갯수 중복. 케루노스에게 음식을 바쳐 전투 능력을 얻는 천혜 스킬."
      },
      {
        name: "사냥의 눈", nameJp: "狩猟の瞳",
        timing: "셋업프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "에너미 인식을 행한다. 이 효과는 씬 종료까지 지속된다. 관찰력으로 사냥감을 신속하게 식별하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "dinakeito",
    name: "디나케이트",
    nameJp: "ディナケイト",
    title: "의술의 신",
    parentage: "아켄라브의 아들",
    accent: "#2A9AAA",
    lore: [
      {
        heading: "의술의 전승",
        text: "시절은 「땅의 시대」의 마지막. 마왕 바랄이 뿌린 역병이 세계에서 사라질 때가 되었지만, 사람들은 아픔의 절규와 죽음의 공포가 또 마물을 불러들이지 않을까 불안해했다. 어느 날, 네바프족의 집락을 찾아간 남자가 있었다. 집락에는 중병에 걸린 단야 장인이 있었다. 남자는 동료의 모습을 보고 특별한 처방으로 치료했고, 단야 장인은 며칠 후 쾌유해 작업에 복귀할 수 있었다. 이것이 의술의 시작이라 전해진다."
      },
      {
        heading: "신들을 치유한 신",
        text: "디나케이트는 아켄라브의 아들로 의술의 신으로 여겨진다. 손에 뱀이 감긴 지팡이를 들고 흰 의복을 두른 장년 남성의 모습으로 묘사된다. 성격은 진지하고 성실하지만 고집이 세다. 세계에 사신이 나타나 전쟁이 일어날 때, 신들도 큰 상처를 입었다. 디나케이트는 아버지 아켄라브의 권능과 치유의 술로 신들을 즉각적으로 치유하고 지탱했다고 전해진다."
      },
    ],
    skills: [
      {
        name: "의신의 손", nameJp: "医神の手",
        timing: "효과 참조", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "3",
        condition: "씬1회",
        effect: "HP 회복을 행하는 스킬과 동시에 사용한다. 그 효과에 +[SL×2]D한다. 치유 능력을 증폭시키는 천혜 스킬."
      },
      {
        name: "긴급치료", nameJp: "緊急治療",
        timing: "이니시아티브프로세스", judge: "자동성공", target: "범위(선택)",
        range: "지근", cost: "5", slMax: "1",
        condition: "씬1회",
        effect: "대상의 HP 회복을 행한다. 대상의 HP를 [3D+CL×2] 포인트 회복한다. 빠른 치료 행위를 나타내는 천혜 스킬."
      },
      {
        name: "정화결계", nameJp: "清浄結界",
        timing: "셋업프로세스", judge: "자동성공", target: "범위(선택)",
        range: "지근", cost: "5", slMax: "1",
        condition: "시나리오1회",
        effect: "대상이 나쁜 상태(배드 스테이터스)를 받지 않는다. 이 효과는 라운드 종료까지 지속된다. 병과 독을 막는 결계를 전개하는 천혜 스킬."
      },
    ] as Skill[],
  },
]

// ── 소신 섹션 ─────────────────────────────────────────────────────────────────

function MinorGodsSection() {
  return (
    <section>
      {/* 소개 + 공유 이미지 */}
      <div style={{ display: "flex", gap: 28, marginBottom: 36, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Prose text="에린을 창세했다고 전해지는 칠대신. 그러나 에린에는 그 외에도 다양한 신들이 신봉되고 있다. 이러한 신들을 「소신(小神)」이라 부른다." />
          <Prose text="소신이라 해도, 칠대신에 대해 소신이라 불리는 것일 뿐 「작은 신」이라는 의미는 아니다. 에린 서방을 중심으로 신봉되는 주요 8주의 소신을 소개한다." />
          <div style={{
            background: "#0C0A06", border: `1px solid ${ACCENT}`,
            borderRadius: 8, padding: "10px 14px", marginTop: 12
          }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>주요 소신 일람</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {minorGods.map(g => (
                <div key={g.id} style={{ fontSize: 12 }}>
                  <span style={{ color: g.accent, fontWeight: 700 }}>{g.name}</span>
                  <div style={{ color: "#8A7830", fontSize: 10 }}>{g.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 공유 이미지 슬롯 */}
        <div style={{
          width: 320, flexShrink: 0,
          border: `2px solid ${ACCENT}`, borderRadius: 10, overflow: "hidden",
          background: "#0C0A06"
        }}>
          <img
            src="/gods/minor-gods.jpg"
            alt="소신 일람"
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
                wrapper.style.height = "280px"
                wrapper.style.color = ACCENT
                wrapper.style.gap = "8px"
                wrapper.style.fontSize = "13px"
                wrapper.innerHTML = `<span style="font-size:40px">🖼</span><span>소신 일람</span><span style="color:#5A5030;font-size:11px">/gods/minor-gods.jpg</span>`
              }
            }}
          />
        </div>
      </div>

      {/* 각 소신 */}
      {minorGods.map((god, idx) => (
        <div key={god.id} style={{ marginBottom: idx < minorGods.length - 1 ? 48 : 0 }}>
          {/* 신 헤더 */}
          <div style={{
            background: `linear-gradient(135deg, ${god.accent}20 0%, ${god.accent}08 100%)`,
            border: `1px solid ${god.accent}`,
            borderRadius: 10, padding: "14px 22px", marginBottom: 20
          }}>
            <div style={{ fontSize: 10, color: god.accent, letterSpacing: 3, marginBottom: 4, textTransform: "uppercase" }}>
              소신 · {god.parentage}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 24, fontWeight: 700, color: god.accent,
                fontFamily: "'Noto Serif KR', serif"
              }}>{god.name}</span>
              <span style={{ color: "#8A7830", fontSize: 13 }}>{god.nameJp}</span>
              <span style={{ color: "#C8B870", fontSize: 13 }}>— {god.title}</span>
            </div>
          </div>

          {/* 본문 */}
          <div style={{ marginBottom: 16 }}>
            {god.lore.map((section, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <SecTitle title={section.heading} color={god.accent} />
                <Prose text={section.text} />
              </div>
            ))}
          </div>

          {/* 천혜 스킬 */}
          <div style={{
            background: god.accent + "18",
            borderLeft: `4px solid ${god.accent}`,
            padding: "8px 14px", marginBottom: 12, borderRadius: "0 6px 6px 0"
          }}>
            <span style={{ color: god.accent, fontWeight: 700, fontSize: 13 }}>✨ 천혜 스킬</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {god.skills.map(skill => (
              <SkillCard key={skill.name} skill={skill} accent={god.accent} />
            ))}
          </div>

          {idx < minorGods.length - 1 && (
            <div style={{ borderTop: "1px solid #2A2810", marginTop: 40 }} />
          )}
        </div>
      ))}
    </section>
  )
}

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
  { id: "minor",      label: "소신",       icon: "⭐" },
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
      case "minor":     return <MinorGodsSection />
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
