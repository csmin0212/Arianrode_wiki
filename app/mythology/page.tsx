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

// ── 신사 데이터 ───────────────────────────────────────────────────────────────

const divineMessengers = [
  {
    id: "ain",
    name: "아인",
    nameJp: "アイン",
    title: "순백룡",
    accent: "#E0DCC0",
    lore: [
      {
        heading: "흰 소녀",
        text: "어떤 수사관의 이야기다. 적의 시설을 조사하는 임무를 받은 수사관은, 순백의 용에 관한 정보를 어디서도 얻을 수 없었다. 그 시설에는 많은 독방이 늘어서 있었고, 거기에 끌려온 사람은 돌아오지 않는다 했다. 수사관이 문을 열고 들어서자 맞은편 독방에서 어린 소녀가 나타났다. 소녀는 수사관의 손을 잡고 탈출 경로를 찾기 시작했으나 두 사람은 괴물과 교전 상태에 빠져버린다. 체념한 수사관이 용의 모습에 익숙해질 무렵, 소녀는 시설 사람들을 바깥으로 이끌었다. 그리고 순백의 용으로 모습을 바꾸어 하늘 저편으로 날아갔다 한다."
      },
      {
        heading: "그라스웰즈의 수호룡",
        text: "\"순백룡\" 아인은 \"무지개의\" 세피로스의 화신이며, 세피로스가 지닌 파괴의 힘을 부여받았다 전해진다. 세피로스가 아리안로드를 떠난 이래 그라스웰즈의 수호신을 맡아왔다. \"심홍룡\" 아인·소프와 마찬가지로 인간과 직접 교류하지 않는 한편, 내정에 관한 상담에는 기꺼이 응했다. 그라스웰즈의 국장에는 얼음 결정과 함께 그려지며, 냉정 침착하고 사사로운 정을 끊는 냉혹한 존재로 전해진다. 아인은 그라스웰즈 가문의 상담역을 맡는 한편, 팔무이크의 거점을 찾아 격파하는 활동도 해왔다."
      },
    ],
    skills: [
      {
        name: "순백룡의 번판", nameJp: "純白竜の番判",
        timing: "셋업 프로세스", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 아인) 1로 취득 가능. 대상에게 10점의 HP 손실을 준다. '순백룡' 아인의 번판 힘에 의해 대상의 정신을 피폐하게 만드는 천혜 스킬."
      },
      {
        name: "절대의 뿔", nameJp: "絶対の角",
        timing: "데미지 롤의 직전", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "3",
        condition: "라운드 1회",
        effect: "(페이즈: 아인) 1로 취득 가능. 대상이 행하는 공격의 데미지 롤 직전에 대상에게 데미지 증가를 행한다. 이 공격의 데미지에 +[SL D]한다. 이 스킬은 당신을 대상으로 선택할 수 없다. '순백룡' 아인의 파괴 힘에 의해 공격의 위력을 높이는 천혜 스킬."
      },
      {
        name: "봉박의 어금니", nameJp: "封縛の牙",
        timing: "셋업 프로세스", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 아인) 1로 취득 가능. 대상에게 [스턴]을 부여한다. '순백룡' 아인의 번판 힘에 의해 대상의 동작을 묶는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "ain-soph",
    name: "아인·소프",
    nameJp: "アイン・ソフ",
    title: "심홍룡",
    accent: "#C03A5A",
    lore: [
      {
        heading: "심홍의 숲의 소녀",
        text: "레이월 어딘가에 있는 작은 숲에서, 미무라는 소녀가 살고 있었다. 전쟁으로 가족을 잃은 미무는 숲에서 홀로 살아가는 생활을 이어가던 중, 어느 날 앞에 붉은 옷을 입은 긴 머리 소녀가 나타나 미무에게 과일과 먹을 것을 주었다. \"고마워. 나는 미무야. 넌 이름이 뭐야?\" 그 물음에 붉은 눈의 소녀는 가슴을 활짝 펴고 자랑스럽게 이름을 밝혔다 한다. \"나는 '심홍룡' 아인·소프다.\" 그 후 미무가 아무리 찾아도, 붉은 옷의 소녀가 두 번 다시 나타나는 일은 없었다 한다."
      },
      {
        heading: "레이월의 수호룡",
        text: "\"심홍룡\" 아인·소프는 \"무지개의\" 세피로스에 의해 생명을 불어넣은 화신이며, 세피로스가 지상에서 모습을 감춘 뒤 레이월의 수호신으로서 역할을 부여받았다. 아인·소프의 용은 그 이름대로 심홍빛 비늘을 두른 드래곤이며, 레이월의 국장에서는 맹렬한 화염과 함께 그려진다. 세피로스가 지닌 창조의 힘을 지녔다 전해지며, 그 힘을 담은 마석을 만들어 빌려줌으로써 레이월 왕국을 지탱해왔다. 그러나 제국 400년경, 그라스웰즈의 아인이 용석에 봉인된 것을 계기로 모습을 감추었다."
      },
    ],
    skills: [
      {
        name: "재생의 날개", nameJp: "再生の翼",
        timing: "클린업 프로세스", judge: "자동성공", target: "범위(선택)",
        range: "근거리", cost: "─", slMax: "3",
        condition: "시나리오 SL회",
        effect: "(페이즈: 아인·소프) 1로 취득 가능. 대상에게 HP 회복을 행한다. 대상의 HP를 [2D+CL×2]점 회복한다. '심홍룡' 아인·소프의 재생 힘에 의해 자신이나 동료를 치유하는 천혜 스킬."
      },
      {
        name: "심홍룡의 번판", nameJp: "深紅竜の番判",
        timing: "셋업 프로세스", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "3",
        condition: "씬 1회",
        effect: "(페이즈: 아인·소프) 1로 취득 가능. 대상에게 [방심]을 부여한다. '심홍룡' 아인·소프의 번판 힘에 의해 대상의 정신을 피폐하게 만드는 천혜 스킬."
      },
      {
        name: "불가침의 비늘", nameJp: "不可侵の鱗",
        timing: "데미지 롤의 직후", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 아인·소프) 1로 취득 가능. 데미지 경감을 행한다. 당신이 데미지를 받는 데미지 롤 직후에 사용한다. 그 데미지에 -3D한다. '심홍룡' 아인·소프의 불가침의 결계 힘에 의해 자신을 지키는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "sephiros",
    name: "세피로스",
    nameJp: "セフィロス",
    title: "무지개의",
    accent: "#6A9AD8",
    lore: [
      {
        heading: "세피로스와 오베론",
        text: "에린디르 동방, 대황야와 대초원이 마주하는 경계 위에 높게 솟은 연산 라이잔 산이 있다. 이 산이 생긴 것은 '불의 시대' 초기, 성력전쟁 전후였다 한다. 당시 에린디르 대륙에서 마족과 싸우던 울프릭들은 폭주한 정령에게 인간의 생활권을 빼앗기고 있었다. 어느 날 황야 북쪽 황폐한 땅에 요정들의 집이 있다는 정보가 전해지고, 울프릭은 사막을 돌아 황야로 향해 불가시계에 뒤덮인 요정도시 틸미리에 다다른다. 요정도시의 왕 오베론과의 이야기 끝에, 서로 협력하여 냉정하고 서늘한 밤을 보낸다면 원조하겠다는 약속을 얻어냈다. 그리하여 세피로스가 모래사막의 가장자리를 따라 곧장 날아올랐고, 그 궤적을 따라 길고 큰 산맥이 생겨났다."
      },
      {
        heading: "신룡왕",
        text: "\"무지개의\" 세피로스는 일찍이 \"빛의 시대\"에 모든 생물의 왕 파르그레이에 의해 생겨난 최초의 용이며, 고대룡의 장이다. \"무지개\"라는 이름 그대로 일곱 빛깔로 빛나는 비늘을 가지며, 발휘하는 힘에 따라 비늘 색이 변한다고도 전해진다. 고대룡은 파르그레이에 의해 이어받은 강력한 힘을 가졌으며, \"바람의 시대\"에서도 많은 용들과 함께 마족과의 전투에 참가해 활약했다. 다만, 언제부턴가 대지의 심부로 모습을 감추었고, 신들은 고대룡의 힘 일부를 봉인하여 현세에의 지나친 개입을 금했다고 한다."
      },
    ],
    skills: [
      {
        name: "고대룡의 영기", nameJp: "古代竜の霊気",
        timing: "마이너 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 세피로스) 1로 취득 가능. 취득 시 능력값 중 하나를 선택한다. 그 능력값 다이스로 산출하는 스킬·파워에 유효. 공격·HP 회복·MP 회복·파워 효과에 선택한 능력값 다이스의 영향을 부여한다. 이 효과는 메인프로세스 종료까지 지속된다."
      },
      {
        name: "신룡왕의 어자", nameJp: "神竜王の御子",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 세피로스) 1로 취득 가능. [물리방어력]과 [마법방어력]에 +2한다. 또한 「분류」에 용을 추가한다. 신룡왕의 자식으로 태어났음을 나타내는 천혜 스킬. 당신의 육체에는 작은 뿔이나 비늘 같은 드래곤의 특징이 나타난다."
      },
      {
        name: "무지개의 비늘", nameJp: "虹の鱗",
        timing: "마이너 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "6", slMax: "3",
        condition: "씬 SL회",
        effect: "(페이즈: 세피로스) 1로 취득 가능. 사용 시 속성 중 하나를 선택한다. 당신이 행하는 공격을 마법 데미지로 변경한다. 이 효과는 메인프로세스 종료까지 지속된다. 신룡왕의 힘에 의해 마법의 속성을 변환하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "erika",
    name: "에리카",
    nameJp: "エリカ",
    title: "성스러운 히즈",
    accent: "#7ABE4A",
    lore: [
      {
        heading: "에리카의 가지",
        text: "펜족의 딸 리메라는 농촌에서 태어나 부모와 함께 대수(大樹) 에리카를 신앙하며 자랐다. 리메라가 15세가 되던 어느 날, 꿈에서 에리카를 이름으로 부르는 노인이 나타나 예언을 전했다. '곧, 대재앙이 펜족의 마을을 덮칠 것이다. 예언을 알리려면 왕의 앞에 가서 히즈의 꽃을 보여라. 그것을 보이면 믿어줄 것이다.' 리메라가 꿈에서 깨자 손에는 히즈의 가지가 쥐어져 있었다. 리메라는 부모에게 사정을 전하고 마을을 출발했다. 리메라가 작은 마을을 돌며 재앙의 소식을 전하려 했지만 아무도 믿지 않아 쓸쓸히 히즈 가지에 기대니, 꽃잎이 한 장 떨어지고 에리카의 환상이 나타났다 한다."
      },
      {
        heading: "펜족과 에리카",
        text: "아리안로드 대륙에서 예로부터 신앙되어온 대수(大樹)이며, 오늘날에는 성스러운 히즈라 불린다. 에리카라는 이름이 의미하는 것은 이 에린의 나무이며, 에리카에는 외계에서 오는 침략으로부터 지키는 힘이 있다 전해진다. 에리카는 예전에 펜족과 함께 이 땅에 뿌리내리고 있었으며, 펜족은 에리카를 숭상하여 그 주변에 정착하여 살았다. 에리카도 사람들에게 꿈이나 환상의 형태로 다양한 예언을 전함으로써 펜족을 지켜왔다. 예언을 받는 자는 히즈의 처녀라 불리며, 나부끼는 꽃잎 위에 나타난 자가 선택받는다. 히즈의 꽃은 환상의 꽃으로, 꿈속에서 나타나는 온화한 노인의 모습으로 나타나 여러 위기나 희망을 전한다 전해진다."
      },
    ],
    skills: [
      {
        name: "대수의 예언", nameJp: "大樹の予言",
        timing: "메이저 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "1",
        condition: "시나리오 1회",
        effect: "(페이즈: 에리카) 1로 취득 가능. GM에게 의문점을 직접 물을 수 있다. GM은 이 스킬의 사용을 거부해도 좋다. 사용이 인정되지 않은 경우 사용 횟수에 포함하지 않는다. 에리카의 예언에 의해 모험의 힌트를 얻는 천혜 스킬."
      },
      {
        name: "몽수(夢集)", nameJp: "夢集り",
        timing: "판정의 직후", judge: "자동성공", target: "단체",
        range: "20m", cost: "─", slMax: "1",
        condition: "시나리오 1회",
        effect: "(페이즈: 에리카) 1로 취득 가능. 페이트를 1점 소비한다. 대상이 행하는 다음 공격을 낮출 수 있다. 에리카의 예지에 의해 대상의 위기를 알고 있음을 나타내는 천혜 스킬. 당신은 이 위기를 피하기 위한 조언을 할 수 있지만, 실제로 피할 수 있는지는 대상 나름이다."
      },
      {
        name: "예지의 가지", nameJp: "予知の枝",
        timing: "셋업 프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "3",
        condition: "시나리오 SL회",
        effect: "(페이즈: 에리카) 1로 취득 가능. 리액션 판정에 +1D한다. 이 효과는 라운드 종료까지 지속된다. 에리카의 예언에 의해 적의 움직임을 아는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "felsia",
    name: "펠시아·브리간티아르",
    nameJp: "フェルシア・ブリガンティアル",
    title: "",
    accent: "#9A6AC8",
    lore: [
      {
        heading: "회색 머리카락의 감시자",
        text: "\"불의 시대\" 초반, 마족의 군세와 싸우는 자들이 있었다. 세인의 장인 울프릭이다. 세인들은 모두 뛰어난 전사였지만, 지상의 청정을 살아남은 마족들은 더욱 강대하고 전쟁은 극에 달했다. 그런 울프릭에게 협력하는 자가 있었다. 긴 회색 머리카락을 가진 여마술사는 \"불의 시대\"에 나타난 두 종족, 휴린과 엘그나인 양쪽의 특징을 갖추고 울프릭들이 모르는 지식을 가지고 있었다. 어느 때 세인 중 하나가 그녀에게 의심의 눈길을 보냈다. \"당신은 무엇이냐. 무엇을 알고, 무엇을 숨기고 있는가. 마족과 통하는 것이 아닌가?\" 그에 아무 말도 하지 않는 그녀를 향해 울프릭이 말했다. \"키미에게도 사정이 있겠지. 우리의 싸움은 마지막까지 신과 인류를 위해 계속하는 것뿐이다.\""
      },
      {
        heading: "전설의 여마술사",
        text: "펠시아·브리간티아르는 에린디르 서방에서는 클란=벨의 사영웅 중 하나로 알려진 마술사다. 그와 동시에 일찍이 울프릭 등의 영웅들과 함께 싸웠던 마술사이기도 하다. 역사를 더듬어보면, 실로 다양한 지역, 다양한 시대의 전승에 펠시아라는 마술사가 등장하는 것을 알 수 있다. 그녀는 곤경에 처한 사람들 앞에 나타나 의지할 동료가 되어 사람들을 지키는 감시자나 정해진 자의 입장을 취한다. 실은 그녀의 정체는 운명을 관장한다고도 하는 여신 아리안로드의 화신으로, 밤에 에린의 사람들을 지키기 위해 보내진 신사다. 현재는 아발론의 신전원을 관리하며, 내방자들을 맞이하는 신사들을 이끌고 있다."
      },
    ],
    skills: [
      {
        name: "운명의 점술", nameJp: "運命の占い",
        timing: "판정의 직후", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "시나리오 1회",
        effect: "(페이즈: 펠시아) 1로 취득 가능. 당신이 판정을 행한 직후에 사용한다. SL개의 다이스를 선택한다. 점술에 의해 미래의 곤란이나 비극의 힌트를 얻는 천혜 스킬. 당신 자신이 행하는 것이든, 어느 점술가가 행하는 것이든 상관없다."
      },
      {
        name: "영원의 비술", nameJp: "永遠の秘術",
        timing: "─", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "시나리오 1회",
        effect: "(페이즈: 펠시아) 1로 취득 가능. 메이지 스킬에 의한 마법 공격의 데미지 롤 직전에 사용한다. 데미지 증가를 행한다. 그 공격의 데미지에 +[SL×2]D한다. 영원의 도시 아발론에 전해지는 마술의 힘을 강화하는 천혜 스킬. 아발론의 힘을 불러내는 특수한 것이다."
      },
      {
        name: "구요정의 호위", nameJp: "九妖精の護護",
        timing: "판정의 직전", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "1",
        condition: "시나리오 1회",
        effect: "(페이즈: 펠시아) 1로 취득 가능. 당신이 행하는 판정 직전에 사용한다. 그 판정에 +2D한다. 펠시아의 부하인 9명의 요정 '나인시스터즈'가 모습을 드러내어 당신의 행동을 돕는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "bennet",
    name: "베네트",
    nameJp: "ベネット",
    title: "삼하여신",
    accent: "#4ABE70",
    lore: [
      {
        heading: "역병여신",
        text: "그날, 어부 타무트의 그물에는 어째서인지 단 한 마리의 물고기도 걸리지 않았다. 포기하려던 그가 마지막으로 그물을 던지자 세찬 당김과 함께 녹색의 여우 같은 소녀가 걸려들었다. 깜짝 놀란 타무트에게 소녀는 죄인인 듯 고분고분하면서도, 왕과 같은 엄청난 태도로 당당히 서서 에린의 안전을 지키는 여신 베네트라 이름을 밝혔다. 이 땅에 일어나는 재난을 막기 위해 모험자들과 함께 달려나갔다. 그러나 베네트가 혼자라는 것을 타무트가 묻자, 그녀는 불가사의한 표정으로 주변을 둘러보고 침묵했다 한다. 마을로 돌아온 타무트가 모험자들의 활약을 전해 듣게 되었을 때, 거기에 시끄러운 여우족 소녀가 함께하고 있었다."
      },
      {
        heading: "모험자로서의 베네트",
        text: "베네트의 이름은 에린딜에서는 클란=벨의 사영웅으로서 유명하고, 에린딜 서방의 나라들을 소개한 '트래블가이드'의 표지에 그려진 인물로도 알려져 있다. 그 후, 잃어버린 용석을 되찾으러 아리안로드 대륙으로 향한 그녀는 이상한 운명에 의해 아발론에 도달하여, 내방자들을 맞이하는 신사가 되었다 - 이는 에린딜 각지의 땅에서 때때로 목격되는 베네트 본인의 증언이다. 그 모습은 녹색 머리카락과 햇볕에 그을린 피부를 가진 젊은이이며, 가벼운 복장을 걸치고 활을 갖추고 있다. 말이 많고, 인사는 야! 한마디로 자신을 대신하는 것이 특징이다. 혼자서도 두려워하지 않고 강해지며, 방어구를 입지 않는 것이 더 강하다는 지론을 가진 것으로 전해진다."
      },
    ],
    skills: [
      {
        name: "희망의 빛남", nameJp: "希望の輝き",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "(페이즈: 베네트) 1로 취득 가능. 「페이트 사용 상한」에 +SL한다. 용기, 상냥함, 모험심 등, 당신이 계속 간직해온 빛남이 있음을 나타내는 천혜 스킬. 당신이 모험하는 한 베네트는 당신의 편이다."
      },
      {
        name: "삼하여신의 사죄술", nameJp: "三下女神の謝罪術",
        timing: "판정의 직전", judge: "자동성공", target: "단체",
        range: "20m", cost: "10", slMax: "1",
        condition: "시나리오 1회",
        effect: "(페이즈: 베네트) 1로 취득 가능. 대상이 「분류: 식물, 언데드, 기계」 이외일 때 유효. 대상이 메이저 액션에 사용하는 판정 다이스에 -2D한다. 베네트의 열렬한 토게자처럼 사죄를 행하는 스킬. 용서받을지는 모르지만, 상대의 허를 찌를 가능성은 없지도 않다."
      },
      {
        name: "벌거벗은 것처럼", nameJp: "裸のごとく",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "(페이즈: 베네트) 1로 취득 가능. 당신이 「부위」 머리·동체의 방어구를 하나도 장비하지 않을 때 유효. 회피 판정의 달성도에 +2, 「행동값」에 +[SL×3]한다. 방어구를 입지 않음으로써 강해질지 모르는 천혜 스킬. 실은 알몸이 아니다."
      },
    ] as Skill[],
  },
  {
    id: "voltemogai",
    name: "볼테모가이",
    nameJp: "ボルテモガイ",
    title: "태조룡",
    accent: "#CA8A3A",
    lore: [
      {
        heading: "길무이의 과오",
        text: "이전에 영민을 잘 다스리던 수령(한) 길무이가 있었다. 길무이라 이름 전해지는 그 한은 볼테모가이와 맹약을 맺어 그 위광을 초원에 퍼뜨리려 하며, 군세를 이끌고 자이란 산으로 향했다. 그러나 자이란 산에 들어서자마자 앞이 보이지 않는 짙은 안개가 길을 가렸다. 세 명이 퇴각을 진언했지만 길무이는 이를 허락지 않고 진격했다. 결국 병사의 20%가 흩어지고, 세 명도 행방불명이 되었다. 장로도 퇴각을 원하지 않았지만, 그날 밤 산은 몹시 차가워지고 병사의 20%가 죽어, 장로도 역시 차갑게 식어버렸다. 볼테모가이는 맹약 파기의 심판으로 길무이와 세 아들 중 하나인 아즈와르·한이 협력하기로 약속을 얻어냈다."
      },
      {
        heading: "초원의 백성의 수호자",
        text: "\"태조룡\" 볼테모가이는 \"지의 시대\"에 태어난 용이며, \"지의 청정\"으로 상처 입은 그를 초원의 백성이 도운 이래 초원의 백성을 지키는 수호자가 되었다. \"무지개의\" 세피로스에 의해 대초원과 라이잔 산 사이에 길이 생긴 이후로는 연산에 이주하여 이따금 사람 앞에 모습을 드러내기도 한다. 그 모습은 타르타르·한 국의 국장에도 그려지는 것처럼, 긴 앞발과 일대일 싸우는 모습을 지니고, 헤엄치듯 허공을 난다. 사람과 관계는 짧지만, 이를 인정한 자와 개별로 맹약을 맺고 협력을 제공한다."
      },
    ],
    skills: [
      {
        name: "안개의 길", nameJp: "霧の道",
        timing: "셋업 프로세스", judge: "자동성공", target: "효과 참조",
        range: "씬", cost: "4", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 볼테모가이) 1로 취득 가능. 씬의 인게이지 전부를 봉쇄한다. 이 효과는 씬 종료까지 지속된다. 주위에 안개를 만들어내어 길을 헤매게 하는 천혜 스킬."
      },
      {
        name: "기룡의 충의", nameJp: "騎竜の忠義",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "기승 시",
        effect: "(페이즈: 볼테모가이) 1로 취득 가능. 기승 상태일 때 유효. 당신이 행하는 무기를 사용한 판정의 성적과 「행동값」에 +[SL+1]한다."
      },
      {
        name: "태조룡의 포효", nameJp: "太祖竜の咆哮",
        timing: "셋업 프로세스", judge: "자동성공", target: "단체",
        range: "20m", cost: "9", slMax: "3",
        condition: "기승 시",
        effect: "(페이즈: 볼테모가이) 1로 취득 가능. 행동값 감소를 행한다. 대상의 「행동값」에 -[당신의 【감지】]한다. 이 효과는 라운드 종료까지 지속된다. 용의 포효에 의해 대상의 마음을 위축시키는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "ancestor",
    name: "조령",
    nameJp: "祖霊",
    title: "",
    accent: "#7AAA5A",
    lore: [
      {
        heading: "최초의 조령",
        text: "\"불의 시대\" 초기 \"무한의 모래사막\"에 살았던 도안족은, 모래사막의 위험을 피하기 위해 과혹한 유목 생활을 계속하고 있었다. 어느 부족이 이동을 시작하려 할 때, 부족의 연로한 장로가 자신의 생애가 끝나가고 있음을 깨닫고 그 자리에 남겠다고 말했다. 부족의 수장은 장로를 함께 데려가고자 하였으나 마음을 바꿀 수는 없어 어쩔 수 없이 출발했다. 수일 후, 장로가 머문 수원에 도달했을 때, 젊은 수장은 남겨두어야 했던 장로를 모래 위에서 발견했다. 수장이 황망히 이를 뒤쫓아 부족이 가까이 다가갈수록 장로는 모래사막 저편으로 사라졌다. 그날 밤 젊은 수장 앞에 장로가 나타나 이야기했다. 장로는 그가 믿는 신 그라이아인을 찬미하고, 사막에서 자손들이 살아갈 수 있도록 자손을 수호하는 역할을 맡게 되었다 전해졌다."
      },
      {
        heading: "사막의 백성의 수호령",
        text: "조령은 \"무한의 모래사막\"의 소수 부족에 전해지는 특수한 마술의 사용자, 샤먼들의 선조의 령이라 여겨진다. 부족의 령지에 잠든 그들은 조령이 되어 샤먼을 통해 말을 전한다. 조령의 열에 더해지는 자들은 부족 내에서도 죽음을 눈앞에 두고, 자신의 부족에 대한 생각이 깊어 많은 지식과 사혜를 갖춘 자만이 수장에게 인정받아 조령의 령지에서의 죽음을 맞이할 수 있다. 그리하여 뽑힌 령은 이계로 향하지 않고 현세에 머물 수 있는 것이다. 샤먼들은 자신들이 믿는 신을 토템돌이라 불리는 목인형으로 나타낸다. 이 인형을 통해 샤먼은 자신의 마음과 조령의 마음을 이을 수 있다 한다."
      },
    ],
    skills: [
      {
        name: "조령의 원한", nameJp: "祖霊の恨み",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 엔세스터) 1로 취득 가능. 당신이 부여하는 배드 스테이터스의 효과 강도에 +1한다. 조령의 분노와 원념에 의해 독이나 저주의 효과를 높이는 천혜 스킬."
      },
      {
        name: "조령의 수호", nameJp: "祖霊の守護",
        timing: "셋업 프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 엔세스터) 1로 취득 가능. [물리방어력]과 [마법방어력]에 +3한다. 이 효과는 씬 종료까지 지속된다. 조령의 지킴에 의해 대상의 위협을 감쇄시키는 천혜 스킬."
      },
      {
        name: "조령의 인도", nameJp: "祖霊の導き",
        timing: "마이너 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "7", slMax: "3",
        condition: "씬 SL회",
        effect: "(페이즈: 엔세스터) 1로 취득 가능. 당신이 행하는 판정에 +2D하며, 이 효과는 메인프로세스 종료까지 지속된다. 조령의 조력에 의해 당신의 공격이나 마술의 정확도를 높이는 천혜 스킬."
      },
    ] as Skill[],
  },
]

function DivineMassengersSection() {
  return (
    <section>
      {/* 섹션 헤더 */}
      <div style={{ borderBottom: `2px solid ${ACCENT}`, paddingBottom: 16, marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 28, color: "#F0E8C8", fontFamily: "'Noto Serif KR', serif" }}>
          신사 <span style={{ fontSize: 16, color: "#8A7830", fontWeight: 400 }}>神使</span>
        </h2>
        <p style={{ margin: "10px 0 0", color: "#B0A060", fontSize: 13 }}>
          신들의 사자(使者)로서 특수한 능력을 부여받은 자를 신사(神使)라 부른다.
        </p>
      </div>

      {/* 소개 + 공유 이미지 */}
      <div style={{ display: "flex", gap: 28, marginBottom: 36, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Prose text="신사란, 신의 사자로서 특수한 능력을 부여받은 존재를 가리킨다. 에린에서는 이러한 신의 사자는 드문 존재가 아니며, 직접 세계에 영향을 미칠 수 없는 신들의 대리자로서 사람들의 힘이 되거나 세계의 질서를 유지하기 위해 활동한다." />
          <Prose text="부족이나 민족, 혹은 국가를 수호하는 신사는 시나리오에도 등장시키기 쉽고, 캠페인 시나리오에서 활용하기에도 좋다. 이 섹션에서는 아래의 8기둥 신사를 소개한다." />
          <div style={{
            background: "#0C0A06", border: `1px solid ${ACCENT}`,
            borderRadius: 8, padding: "10px 14px", marginTop: 12
          }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>주요 신사 일람</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {divineMessengers.map(m => (
                <div key={m.id} style={{ fontSize: 12 }}>
                  <span style={{ color: m.accent, fontWeight: 700 }}>{m.name}</span>
                  <div style={{ color: "#8A7830", fontSize: 10 }}>{m.title}</div>
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
            src="/messengers/messengers.jpg"
            alt="신사 일람"
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
                wrapper.innerHTML = `<span style="font-size:40px">🖼</span><span>신사 일람</span><span style="color:#5A5030;font-size:11px">/messengers/messengers.jpg</span>`
              }
            }}
          />
        </div>
      </div>

      {/* 각 신사 */}
      {divineMessengers.map((m, idx) => (
        <div key={m.id} style={{ marginBottom: idx < divineMessengers.length - 1 ? 52 : 0 }}>
          {/* 헤더 배너 */}
          <div style={{
            background: `linear-gradient(135deg, #0A0808 0%, ${m.accent}1A 100%)`,
            border: `1px solid ${m.accent}`,
            borderRadius: 8, padding: "14px 20px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            {m.title && (
              <span style={{
                background: m.accent, color: "#0A0808",
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, flexShrink: 0,
              }}>{m.title}</span>
            )}
            <h3 style={{ margin: 0, fontSize: 22, color: m.accent, fontFamily: "'Noto Serif KR', serif" }}>
              {m.name}
            </h3>
            <span style={{ color: "#6A5820", fontSize: 13, marginLeft: 2 }}>{m.nameJp}</span>
          </div>

          {/* 로어 텍스트 */}
          <div style={{ marginBottom: 20 }}>
            {m.lore.map((section, i) => (
              <div key={i} style={{ marginBottom: i < m.lore.length - 1 ? 18 : 0 }}>
                <div style={{
                  color: m.accent, fontWeight: 700, fontSize: 14,
                  borderLeft: `3px solid ${m.accent}`, paddingLeft: 10, marginBottom: 8
                }}>
                  {section.heading}
                </div>
                <p style={{ margin: 0, color: "#C8B870", fontSize: 13, lineHeight: 1.85 }}>
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* 스킬 카드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {m.skills.map((skill, si) => (
              <SkillCard key={si} skill={skill} accent={m.accent} />
            ))}
          </div>

          {idx < divineMessengers.length - 1 && (
            <div style={{ borderTop: "1px solid #2A2810", marginTop: 44 }} />
          )}
        </div>
      ))}
    </section>
  )
}

// ── 영웅신 데이터 ─────────────────────────────────────────────────────────────

const heroGods = [
  {
    id: "baffel",
    name: "바펠",
    nameJp: "バッフェル",
    title: "초대황제",
    accent: "#C8A020",
    lore: [
      {
        heading: "다리즈가이르 추락",
        text: "핀지어스 섬의 '보이지 않는 검왕' 다리즈가이르는 후세에 십소왕 중 하나로 꼽히는 오우가족의 무왕이었다. 바힌 산맥의 지배 지역을 가진 다리즈가이르는 네바프족을 노예로 삼고, 그들에게 무기를 만들게 했다. 그중에서도 천익족의 싸움에 대비하여 다리즈가이르가 만들게 한 특제 동익전은, 상상조차 불가능한 신속의 비행 능력을 갖춘 자에게 주는 마도 기구라 전해진다. 그런데 해방자 네바프족의 두목 바노그가 당시 왕에 막 가담한 바펠에게 접촉하여, 동익전의 결점을 가르쳐주는 것과 맞교환으로 바펠의 보물을 빌리고자 거래를 제안했다."
      },
      {
        heading: "반스타의 초대황제",
        text: "황제 바펠은, 대륙에서 건너온 영웅이라 전해지며, 다세력이 다투던 핀지어스 섬을 통일하여 반스타 제국을 세운 초대황제이다. 핀지어스 섬에는 황제 바펠이 성공시켰다는 수많은 무공과 모략의 이야기가 전해진다. 그 대부분은 바펠의 당당한 풍채와 함께, 그를 지탱하는 부하들과 전우들의 지원을 강조하는 내용이다. 또한 그가 핀지어스에 오기 이전에, 대륙에서 어떤 인물이었는가에 관한 사료는 남아 있지 않고, 수많은 인물로 이야기되고 있다."
      },
    ],
    skills: [
      {
        name: "영광의 일격", nameJp: "栄光の一撃",
        timing: "메이저 액션", judge: "명중 판정", target: "단체",
        range: "무기", cost: "3", slMax: "3",
        condition: "씬 SL회",
        effect: "(페이즈: 바펠) 1로 취득 가능. 대상에게 무기 공격을 행한다. 그 공격의 데미지에 +2D한다. 영광을 거머쥐기 위한 운명에 의해 거대한 일격을 날리는 천혜 스킬."
      },
      {
        name: "승리의 명예", nameJp: "勝利の誉れ",
        timing: "판정의 직전", judge: "자동성공", target: "자신",
        range: "─", cost: "─", slMax: "1",
        condition: "시나리오 1회",
        effect: "(페이즈: 바펠) 1로 취득 가능. 당신이 행하는 명중 판정 직전에 사용한다. 그 판정에 +2D한다. 전투에서 승리하는 운명을 끌어당겨 공격을 명중시키는 천혜 스킬."
      },
      {
        name: "불멸의 명예", nameJp: "不滅の誉れ",
        timing: "셋업 프로세스", judge: "자동성공", target: "자신",
        range: "─", cost: "5", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 바펠) 1로 취득 가능. 당신의 [물리방어력]과 [마법방어력]에 +5한다. 이 효과는 라운드 종료까지 지속된다. 전투에서 승리하는 운명을 끌어당겨 공격에 견디는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "elluran",
    name: "에루란",
    nameJp: "エルーラン",
    title: "신의 어사",
    accent: "#6AAABE",
    lore: [
      {
        heading: "북풍의 여왕",
        text: "현재 에루란 왕국 국토의 북방 대부분은, 일찍이 13명의 마녀들이 지배하는 극락의 땅이었다. 그녀들은 1년마다 교대로 수장을 맡으며, 이 땅을 차지하고 있었다. 에루란은 12명의 신력을 빌려, 그때마다 에루란은 인간 세계에서 걸출한 공적을 성취하여 마녀들에게 승리했다. 이렇게 에루란이 승리하자 사람들이 살 수 없었던 극락의 땅은 마녀의 지배에서 해방되어 사람들이 생활하는 풍요로운 토지로 변해갔다. 마녀들은 패배할 때마다 남은 자매들에게 패배의 내용을 교육했지만, 13명의 마녀 중 12명의 마녀가 에루란의 앞에 쓰러지고, 12개의 빙원을 에루란에게 내주고 말았다."
      },
      {
        heading: "신의 어사",
        text: "에루란은 에린디르 서방에서 가장 오랜 역사를 가진 에루란 왕국을 연 인물이다. 그는 평범한 인물이 아닌 12개의 신력을 가진 신의 어사로서 신앙되고 있으며, 왕국의 각 지역에는 에루란과 그를 따른 국가가 신들과 함께 그려진 신화가 있다. 12의 신력이 무엇을 나타내는가에 관해서는, 문헌 내에서도 견해 차이가 보이는 외에 신력의 수 자체도 10이라 되기도 한다. 다양한 사정을 지녀 훌륭한 능력을 가지고 있었다는 것이 통설이며, 뛰어난 자라면 그 사람의 능력에 특화한 힘을 에루란이 수여한 것으로 알려진다."
      },
    ],
    skills: [
      {
        name: "개척자의 왕", nameJp: "開拓者の王",
        timing: "셋업 프로세스", judge: "자동성공", target: "범위(선택)",
        range: "시야", cost: "─", slMax: "3",
        condition: "시나리오 SL회",
        effect: "(페이즈: 에루란) 1로 취득 가능. 대상이 행하는 메이저 액션의 판정 달성도에 +2한다. 이 효과는 라운드 종료까지 지속된다. 이 스킬은 대상에 당신을 선택할 수 없다. 대상에게 승리를 위한 작전을 전하는 천혜 스킬."
      },
      {
        name: "승리의 비책", nameJp: "勝利の秘策",
        timing: "메이저 액션", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "1",
        effect: "(페이즈: 에루란) 1로 취득 가능. 대상에게 데미지 증가를 행한다. 대상이 행하는 공격의 달성도에 +2D한다. 이 스킬은 대상에 당신을 선택할 수 없다. 이 효과는 라운드 종료까지 지속된다."
      },
      {
        name: "인도하는 자", nameJp: "導く者",
        timing: "효과 참조", judge: "자동성공", target: "단체",
        range: "20m", cost: "─", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 에루란) 1로 취득 가능. 대상이 다이스 증가를 위해 페이트를 사용하는 직전에 사용한다. 페이트를 1점 소비한다. 대상의 다이스 롤에 +1D한다. 이 스킬은 당신을 대상으로 선택할 수 없다. 조언이나 격려에 의해 대상에게 운명을 개척하는 힘을 주는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "nareshu",
    name: "나레슈",
    nameJp: "ナレシュ",
    title: "용살자",
    accent: "#5A9A3A",
    lore: [
      {
        heading: "나레슈와 큰 거북",
        text: "나레슈가 \"마룡\" 브리토라를 쓰러뜨리기 이전에 육용사와 함께 마젤라니카를 탐색하던 중, 한 여성이 마수에 습격당하고 있었다. 그 여성은 요정 아브사라스로, 나레슈에게 청혼을 신청했다. 나레슈는 청혼을 거절했으나, 아브사라스의 수련은 깊어 하나의 보옥을 나레슈에게 주었다. 그것은 투상한 상대와 육체를 교환하는 마도 기구로, 가까운 장래 반드시 나레슈에게 도움이 될 것이라 전했다. 보옥을 받은 수일 후, 불현듯 나레슈의 몸에서 보옥이 사라지고, 나레슈가 저주받은 것처럼 잠들어버렸다. 보옥을 통해 거대 거북 아크바라의 몸과 나레슈의 몸이 교환되어버린 것이다."
      },
      {
        heading: "용살자의 영웅",
        text: "나레슈는 마젤라니카 대륙을 지배하던 \"마룡\" 브리토라를 쓰러뜨린 건국의 영웅이다. 브리토라 토벌 후 6명의 동료들과 함께 대륙을 개척하여, 현재의 마젤라니카 왕국의 주요 도시의 기초를 쌓았다. 이 도정의 다양한 사건은 나레슈의 모험담으로서 전승되고, 수도 카이라샤에 있는 대형 나레슈 신전의 벽화에도 그려져 있다. 신앙의 대상으로서의 나레슈는 휴린족으로 검고 아름다운 남성으로 그려지며, 허리에는 반다나를 두르고 허리 위는 맨몸인 차림이 많다. 허리에는 다양한 도구를 들고 있어 이것은 나레슈의 개척자로서의 측면과 사냥꾼으로서의 측면 양쪽을 나타낸 것이다."
      },
    ],
    skills: [
      {
        name: "영웅신의 활", nameJp: "英雄神の弓",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "활 사용",
        effect: "(페이즈: 나레슈) 1로 취득 가능. 무기를 사용한 명중 판정 달성도에 +SL, 데미지에 +[SL×2]한다. 영웅신 나레슈로부터 그의 활 솜씨를 부여받았음을 나타내는 천혜 스킬."
      },
      {
        name: "상약의 신체", nameJp: "常若の身体",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "8", slMax: "1",
        condition: "방어 중 1회",
        effect: "(페이즈: 나레슈) 1로 취득 가능. 당신이 배드 스테이터스를 받은 직후에 사용한다. 그때 받은 배드 스테이터스를 전부 회복한다. '상약신'이라고도 불리는 나레슈처럼 불로의 신체를 지닌 것을 나타내는 천혜 스킬."
      },
      {
        name: "마수 사냥", nameJp: "魔獣狩り",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "(페이즈: 나레슈) 1로 취득 가능. 공격 대상이 「분류: 마수」일 때 유효. 공격의 데미지에 +[SL×5]한다. 마수와 싸우기 위한 힘을 부여받았음을 나타내는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "piani",
    name: "피아니",
    nameJp: "ピアニィ・ルティナベール・フェリタニア",
    title: "",
    accent: "#C04A4A",
    lore: [
      {
        heading: "얼음에 갇힌 마물",
        text: "유각족의 카다르크는 마을 제일의 장난꾸러기 소년이다. 어른들의 말에는 귀를 기울이지 않으며, 오늘도 나쁜 짓을 일삼고 있었다. 어느 날, 카다르크가 항상의 굴 던전 놀이를 마치고 돌아가려 하자, 갑자기 주변이 음침해졌다. 근처가 한겨울처럼 서리가 내리고, 하늘까지 안개가 끼었다. 들어온 어머니의 말을 떠올린 카다르크는 두려워져 마을로 향하는 귀로를 서두르다, 딱딱하고 차가운 무언가에 부딪혔다. 올려다보니 발톱과 이빨을 드러낸 거대한 마물이었다. 그리고 그 마물은 1마리 2마리가 아니라 사방에 가득했다. 카다르크는 비명을 지르려 했지만 의식을 잃었다. 마을 촌장의 광고판에 장식된 그림 속 인물, 복숭아빛 머리카락을 묶은 소녀의 모습을……."
      },
      {
        heading: "구세의 왕녀",
        text: "피아니·루티나베루·페리타니아는, 전란이 계속되는 아리안로드 대륙의 역사 속에서 폭풍처럼 활약하여 두각을 나타낸 소녀다. 레이월의 왕녀로 태어났지만 기묘한 운명을 따라, 아리안로드를 다스리는 페리타니아 합중국의 통일제로서 군림한다. 왕국식으로 일어난 대재앙 '대붕괴'를 계기로, 피안에 사는 신사들을 맞이하게 되었다. 전쟁을 거쳐 아리안로드에 남겨진 피아니의 동료들과 동맹국 사람들은, 아리안로드를 마족들의 침략에서 지키기 위해 피아니가 제창한 전란을 끝낼 페리타니아 합중국 통일을 이루기 위한 노력을 계속하고 있다. 전장에서 알려진 그녀의 외모는 레이월에서 좋아하는 붉은 장식을 걸치고, 분홍빛 머리카락을 두 갈래로 묶은 소녀이며, 활을 갖추고 귀여운 외모의 마법사로 알려진다."
      },
    ],
    skills: [
      {
        name: "살의 있어라", nameJp: "殺意あれ",
        timing: "셋업 프로세스", judge: "─", target: "자신",
        range: "─", cost: "3", slMax: "3",
        condition: "시나리오 1회",
        effect: "(페이즈: 피아니) 1로 취득 가능. 당신이 행하는 공격의 명중 판정에 +[SL D]한다. 리액션 판정에 더해, 이 공격의 데미지에 +1D한다. 이 효과는 라운드 종료까지 지속된다. 적을 확실히 쓰러뜨린다. 그 살의로써 공격 전부에 거는 천혜 스킬."
      },
      {
        name: "전투 애호가", nameJp: "戦闘愛好者",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 피아니) 1로 취득 가능. 당신이 행하는 공격의 명중 판정에 +1D, 이 공격이 크리티컬에 의한 데미지 롤의 데미지 증가에 더해 데미지에 +2D한다. 당신의 전투에 거는 열정에 의해 공격의 위력을 이끌어내는 천혜 스킬."
      },
      {
        name: "평화의 염원", nameJp: "平和の願い",
        timing: "판정의 직후", judge: "─", target: "자신",
        range: "─", cost: "6", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 피아니) 1로 취득 가능. 당신이 행하는 공격의 명중 판정 직후에 사용한다. 이 공격이 크리티컬에 의한 데미지 증가에 더해 데미지를 추가한다. 당신의 공격을 강제로 명중시키는 천혜 스킬. 당신의 그 격렬함이 평화로 이어진다. 그 염원이 결과를 이끌어내는 것이다."
      },
    ] as Skill[],
  },
]

function HeroGodsSection() {
  return (
    <section>
      {/* 섹션 헤더 */}
      <div style={{ borderBottom: `2px solid ${ACCENT}`, paddingBottom: 16, marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 28, color: "#F0E8C8", fontFamily: "'Noto Serif KR', serif" }}>
          영웅신 <span style={{ fontSize: 16, color: "#8A7830", fontWeight: 400 }}>英雄神</span>
        </h2>
        <p style={{ margin: "10px 0 0", color: "#B0A060", fontSize: 13 }}>
          생전의 공적으로 신에게 불려 올라가 신이 된 자, 혹은 산 채로 신들로부터 역할과 힘을 부여받은 자를 영웅신이라 부른다.
        </p>
      </div>

      {/* 소개 + 공유 이미지 */}
      <div style={{ display: "flex", gap: 28, marginBottom: 36, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Prose text="그리스 신화의 영웅들을 예로 들 것도 없이, 사람에서 신이 된 자는 많다. 『아리안로드』의 무대가 되는 에린에서도 사람이 신이 되어 신앙의 대상이 되는 것은 드물지 않다." />
          <Prose text="영웅신의 신앙은 그 성립 상 수호에 중점을 두게 된다. 국가를 지키고, 토지를 지키고, 백성을 지킨다…… 그러한 면이 강하게 나타난다. 이 섹션에서는 아래의 4주의 영웅신을 소개한다." />
          <div style={{
            background: "#0C0A06", border: `1px solid ${ACCENT}`,
            borderRadius: 8, padding: "10px 14px", marginTop: 12
          }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>주요 영웅신 일람</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {heroGods.map(g => (
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
            src="/heroes/heroes.jpg"
            alt="영웅신 일람"
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
                wrapper.innerHTML = `<span style="font-size:40px">🖼</span><span>영웅신 일람</span><span style="color:#5A5030;font-size:11px">/heroes/heroes.jpg</span>`
              }
            }}
          />
        </div>
      </div>

      {/* 각 영웅신 */}
      {heroGods.map((g, idx) => (
        <div key={g.id} style={{ marginBottom: idx < heroGods.length - 1 ? 52 : 0 }}>
          {/* 헤더 배너 */}
          <div style={{
            background: `linear-gradient(135deg, #0A0808 0%, ${g.accent}1A 100%)`,
            border: `1px solid ${g.accent}`,
            borderRadius: 8, padding: "14px 20px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            {g.title && (
              <span style={{
                background: g.accent, color: "#0A0808",
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, flexShrink: 0,
              }}>{g.title}</span>
            )}
            <h3 style={{ margin: 0, fontSize: 22, color: g.accent, fontFamily: "'Noto Serif KR', serif" }}>
              {g.name}
            </h3>
            <span style={{ color: "#6A5820", fontSize: 13, marginLeft: 2 }}>{g.nameJp}</span>
          </div>

          {/* 로어 텍스트 */}
          <div style={{ marginBottom: 20 }}>
            {g.lore.map((section, i) => (
              <div key={i} style={{ marginBottom: i < g.lore.length - 1 ? 18 : 0 }}>
                <div style={{
                  color: g.accent, fontWeight: 700, fontSize: 14,
                  borderLeft: `3px solid ${g.accent}`, paddingLeft: 10, marginBottom: 8
                }}>
                  {section.heading}
                </div>
                <p style={{ margin: 0, color: "#C8B870", fontSize: 13, lineHeight: 1.85 }}>
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* 스킬 카드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {g.skills.map((skill, si) => (
              <SkillCard key={si} skill={skill} accent={g.accent} />
            ))}
          </div>

          {idx < heroGods.length - 1 && (
            <div style={{ borderTop: "1px solid #2A2810", marginTop: 44 }} />
          )}
        </div>
      ))}
    </section>
  )
}

// ── 정령의 왕 데이터 ──────────────────────────────────────────────────────────

const spiritKings = [
  {
    id: "dijini",
    name: "디지니",
    nameJp: "ディジニ",
    title: "대기의 왕",
    accent: "#7ABEDE",
    lore: [
      {
        heading: "금은보화의 도시",
        text: "아주 옛날, 욕심 많은 자들이 사는 메르엠이라는 도시가 있었다. 도시는 수많은 황금의 탑이 늘어서고, 대단히 화려하고 요란한 것이었다. 사람들은 탑에 금은보화를 넣어 살았으며, 한편으로 보물이 도난당하지 않을까 매일 아침 마음 졸이지 않으면 안 되었다. 도시의 상인 살루만은 자신들의 보물을 지킬 방법이 없을까 고민하여, 마법을 이용해 '대기의 왕' 디지니를 불러내어 말했다. '우리의 재물을 누구도 빼앗을 수 없도록 지켜주고, 우리가 안심하고 잘 수 있게 해 달라.' 디지니는 '원하는 것을 들어주겠다'고 큰 목소리로 모래폭풍을 일으켜 도시를 통째로 모래사막에 묻어버렸다 한다."
      },
      {
        heading: "대기의 왕",
        text: "\"대기의 왕\" 디지니는 '빛의 시대'에 신들이 낳은 정령에서 바람의 왕이 된 정령이다. 신들과 정령들의 싸움 중에 황폐해진 세계를 정화하여 '바람의 청정'을 일으킨 존재로 알려진다. 많은 민간 전승과 설화에서 디지니의 본래 모습은 그림자로만 보인다 한다. 그러나 시기에 따라 모습을 드러내는 예도 있다. 그 모습은 다양하다. 사막 전승에 등장하는 디지니는 노년의 마법사의 모습으로 그려지며, 도둑질을 한 인간을 모래바람에 휘말리게 하는 두려운 정령이다. 한편으로 박막을 두른 젊은 여성의 모습으로 나타나거나, 정기 있는 청년의 모습으로 나타나기도 한다 전해진다. 사막을 나는 흰 큰 매가 죽은 자의 혼을 하늘에 올려 보내는 신의 사자라 믿어진다."
      },
    ],
    skills: [
      {
        name: "폭풍과 화살의 무도", nameJp: "嵐と矢の舞踏",
        timing: "마이너 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "3",
        effect: "(페이즈: 디지니) 1로 취득 가능. 데미지 증가를 행한다. 당신이 행하는 사격 공격의 데미지에 +[SL×3]한다. 이 효과는 메인프로세스 종료까지 지속된다. 바람과 화살을 가속하는 천혜 스킬. 화살은 마치 춤추듯 적을 덮친다."
      },
      {
        name: "바람의 은총", nameJp: "風の恩寵",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 디지니) 1로 취득 가능. 〈바람〉 속성 마법 데미지를 주는 공격에 유효. 공격의 데미지에 +1D한다. 바람의 정령과 강한 연결이 있음을 나타내는 천혜 스킬."
      },
      {
        name: "바람의 옷", nameJp: "風の衣",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        condition: "비행 중",
        effect: "(페이즈: 디지니) 1로 취득 가능. 당신이 행하는 회피 판정의 달성값에 +3한다. 주위에 전개한 바람으로 공격을 흘려내어 회피하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "ifrit",
    name: "이프리트",
    nameJp: "イフリート",
    title: "화염의 왕",
    accent: "#DE5A28",
    lore: [
      {
        heading: "이프리트의 주문",
        text: "정령이나 정령왕에 대한 신앙은 에린디르 각지에서 지금도 민간에 남아 있다. 그중에서도 이프리트에 얽힌 것들이 많다고 한다. 예를 들어 에린디르 서방에서는 어머니가 아이에게 요리가 맛있어지는 주문을 가르치는 것이 있다. 화로 앞에서 손가락을 튕기며 '에푸리타·우에라'라고 외치는 것이 그 주문이다. 주문의 의미는 지금은 잊혀졌지만, 이는 여신 브리간티아가 이프리트에게 불의 향기를 불어넣었다는 고사에서 유래한다고 전해진다. 손가락을 튕기는 동작은 이 시대에 냄비의 뚜껑을 여는 동작에서 비롯된 것으로, 옛날에는 이나카도의 뚜껑이 사용되었다 전해진다."
      },
      {
        heading: "화염의 왕",
        text: "\"화염의 왕\" 이프리트는 '빛의 시대'에 신들이 낳은 정령에서 불의 왕이 된 정령이다. 물질계에 현현할 때는 불꽃을 두른 전신 갑주의 거대한 전사 같은 모습이나, 붉고 피부를 가진 거인 같은 모습, 타는 것 같은 검은 피부, 뿔과 꼬리, 발굽을 가진 모습으로 나타나기도 한다. 단, 이프리트는 싫어하는 것이 있으면 어떤 형태로도 변신하는 능력을 가졌다 한다. 불꽃의 힘이 남아 있는 한, 어떠한 모습으로도 변신하는 것이 가능하다. 단, 그 몸속에서는 불꽃의 기운이 흐르고, 주의를 기울이면 금방 알아챌 수 있다 한다. 성질은 돌발적으로 잔인하거나 우아하기 그지없는 극단을 달린다. 격렬한 기질이지만, 스스로 경의를 표하는 자에게는 충실하다 한다."
      },
    ],
    skills: [
      {
        name: "진화의 일격", nameJp: "真火の一撃",
        timing: "마이너 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "5", slMax: "1",
        effect: "(페이즈: 이프리트) 1로 취득 가능. 「분류: 마술(불)」 스킬·파워에 유효. 마법 공격은 대상의 [마법방어력]에 -5(최저 0)하여 HP 데미지를 산출한다. 이 효과는 메인프로세스 종료까지 지속된다. 불의 정령의 힘에 의해 방어를 초과한 공격을 행하는 천혜 스킬."
      },
      {
        name: "폭렬돌진", nameJp: "爆裂突進",
        timing: "무브 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "3",
        effect: "(페이즈: 이프리트) 1로 취득 가능. 데미지 증가를 행한다. 전투 이동을 행하는 경우, 당신이 행하는 무기 공격의 데미지에 +[SL×3]한다. 이 효과는 메인프로세스 종료까지 지속된다. 불의 폭발로 가속하여 직후의 공격 위력을 높이는 천혜 스킬."
      },
      {
        name: "불의 은총", nameJp: "火の恩寵",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 이프리트) 1로 취득 가능. 〈불〉 속성 마법 데미지를 주는 공격에 유효. 공격의 데미지에 +1D한다. 불의 정령과 강한 연결이 있음을 나타내는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "dao",
    name: "다오",
    nameJp: "ダオ",
    title: "대지의 왕",
    accent: "#9A8040",
    lore: [
      {
        heading: "다오와 정령의 산 만들기",
        text: "창세의 무렵, 신들의 '높은 것을 높게 세우라'는 말씀에 따라 대지의 정령왕인 다오는 정령들에게 앞다퉈 나아가도록 명했다. 처음에 대지의 정령들은 쉽게 높은 곳에 나아갈 수 없었다. 그래서 다오는 정령들에게 발파를 가하여, 누가 가장 높은 산을 솟구쳐 올릴 수 있는지 경쟁을 시켰다. 이리하여 세계 각지에 셀 수 없이 많은 산이 생겨났다. 지금도 산을 숭배하는 지역에서는 재앙이 일어났을 때 정령의 분노를 가라앉히기 위해 정령왕 다오에게 중재를 청하는 의식을 행한다 전해진다."
      },
      {
        heading: "대지의 왕",
        text: "\"대지의 왕\" 다오는 '빛의 시대'에 신들이 낳은 정령에서 땅의 왕이 된 정령이다. '지의 시대' 말에 마족왕 파라르와 마족들을 정화하여 '지의 청정'을 일으킨 존재로 알려진다. 에린의 대지 곳곳에 사는 동물들의 탄생에 중요한 역할을 한 존재로 여겨지며, 농가나 목동, 광산 노동자, 산에서 수행하는 승려, 숲에서 생활하는 레인저 등에게도 신앙을 모은다. 물질계에 현현할 때는 광택 있는 암석으로 만들어진 갑주와 같은 모습, 유쾌하고 중년 남성의 모습인 경우가 많다. 대지신 다난과 관련지어 신앙받는 경우가 많으며, 다오가 대지의 혜택을 상징하는 한편 다오에 대한 신앙은 산을 비롯한 자연에 대한 경외를 나타내는 신앙으로 남아 있는 경우가 많다."
      },
    ],
    skills: [
      {
        name: "땅의 은총", nameJp: "地の恩寵",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 다오) 1로 취득 가능. 〈땅〉 속성 마법 데미지를 주는 공격에 유효. 공격의 데미지에 +1D한다. 대지의 정령과 강한 연결이 있음을 나타내는 천혜 스킬."
      },
      {
        name: "땅의 강인함", nameJp: "地の剛力",
        timing: "무브 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "3", slMax: "1",
        condition: "비행 외",
        effect: "(페이즈: 다오) 1로 취득 가능. 당신이 비행 상태가 아닐 때 사용 가능. 데미지 증가를 행한다. 당신이 행하는 근접 공격의 데미지에 +5한다. 이 효과는 라운드 종료까지 지속된다. 지면에서 힘을 얻어 공격을 행하는 천혜 스킬."
      },
      {
        name: "융기의 주먹", nameJp: "隆起の拳",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        effect: "(페이즈: 다오) 1로 취득 가능. 공격 대상이 비행 상태가 아닐 때 유효. 당신이 행하는 근접 공격의 데미지에 +[SL×3]한다. 당신의 공격에 맞춰 융기한 지면이 추격하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "marid",
    name: "마리드",
    nameJp: "マリッド",
    title: "수류의 왕",
    accent: "#3A8ABE",
    lore: [
      {
        heading: "이계로의 문",
        text: "로흐라는 젊은이가 있었다. 어느 때 로흐가 숲의 나무 그늘에서 쉬고 있자, 근처의 풀을 뜯고 있던 자신의 말이 연못에 빠져버렸다. 연못에 뛰어들어 말을 구하려 하자 눈 깜짝할 사이에 어딘가로 날아갔다. 그러자 로흐는 어느새 의식을 잃고, 낯선 숲속에서 눈을 떴다. 놀라 주변을 둘러보던 로흐 앞에 젊은 여성이 나타났다. 그녀는 마리드라고 이름을 밝히고, 여기가 이계이며 일이 있어 돌아가고 싶다고 전했다. 그 이야기를 들은 로흐는 거대한 용감함과 성실함으로 원래 세계에 돌려보내주겠다고 답했다."
      },
      {
        heading: "수류의 왕",
        text: "\"수류의 왕\" 마리드는 '빛의 시대'에 신들이 낳은 정령에서 물의 왕이 된 정령이다. '물의 청정'을 일으킨 존재로 알려진다. 물질계에 현현할 때 그 모습은 물로 이루어진 신체를 가진 여성의 모습, 물의 의복을 두른 아름다운 유녀의 모습이라 한다. 앞서 언급한 로흐와 그의 애마 민화는 중원의 팔리스 동맹 제국에 널리 퍼진 것으로, 아마도 필버폴의 민간 전승을 원출전으로 한다. 여행하는 사람이 여행 도중 보이는 샘에 기도하는 관습이 있다. 여행자에게 물의 확보는 중요하며, 갈증을 달래주고 안전한 여행을 마칠 수 있게 해달라고 기도하는 장면도 있을 것이다. 元은 그렇다 쳐도, 여행 목적지도 모르는 땅에서 마리드의 신앙을 드러냄으로써 무사히 데려다 주는 자가 있을 것이라 믿는 자도 많다."
      },
    ],
    skills: [
      {
        name: "물의 은총", nameJp: "水の恩寵",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 마리드) 1로 취득 가능. 〈물〉 속성 마법 데미지를 주는 공격 스킬·파워에 유효. 공격의 데미지에 +1D한다. 물의 정령과 강한 연결이 있음을 나타내는 천혜 스킬."
      },
      {
        name: "물의 범람", nameJp: "水の氾濫",
        timing: "무브 액션", judge: "자동성공", target: "효과 참조",
        range: "─", cost: "4", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 마리드) 1로 취득 가능. 「대상: 단체」의 「분류: 마술(물)」 스킬·파워에 유효. 대상을 「사거리: [SL×10]m」로 하고, 「대상: 범위(선택)」으로 변경한다. 이 효과는 메인프로세스 종료까지 지속된다. 물로 소용돌이를 만들어 마술을 확대 발동하는 천혜 스킬."
      },
      {
        name: "물의 급류", nameJp: "水の奔流",
        timing: "메이저 액션", judge: "명중 판정", target: "단체",
        range: "효과 참조", cost: "4", slMax: "3",
        effect: "(페이즈: 마리드) 1로 취득 가능. 대상에게 근접 공격을 행한다. 그 사거리는 [SL×10]m가 되며, 인게이지하지 않은 대상에게도 행할 수 있다. 크리티컬: 다이스 증가. 휘두른 무기 끝에서 강렬한 수류를 발사하여 적을 공격하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "maraika",
    name: "마라이카",
    nameJp: "マライカ",
    title: "광휘의 왕",
    accent: "#E0C840",
    lore: [
      {
        heading: "빛의 성인",
        text: "라로이스가 살았던 것은 악명 높은 교황 파이레마이스가 신관 권력을 남용하는 사악한 시대였다. 400년의 이 시대, 소국의 출신으로 대주교가 된 라로이스는 가난한 자에게 시주를 잊지 않고, 산에 틀어박혀서는 산 사람들을 위해 설교를 이어가는 청렴한 성직자의 소리를 들었다. 그의 앞에 '광휘의 왕' 마라이카가 나타나 축복을 주는 것을 기회로 그는 산을 내려가 성도 디아스로시로 향했다. 라로이스 21세 때의 일이다. 처형 집행 바로 그 순간, 기적이 일어났다. 공중에 빛나는 물체가 나타나 처형장 너머로 날아갔다. 그 광경은 마치 하늘이 무너지는 듯했으며, 성스러운 불꽃이 가득 찬 것 같았다. 빛을 본 처형 집행인과 병사들은 갑자기 죄책감이 증대되어 모두 두려움을 느끼고 달아났다. 그래서 처형은 결국 집행되지 않았다."
      },
      {
        heading: "광휘의 왕",
        text: "마라이카는 '빛의 시대'에 신들이 낳은 정령에서 빛의 왕이 된 정령이다. '빛의 시대'에 세계를 비추는 존재로 여겨지며, '광휘의 왕'이라는 이름을 가진다. 그 본질은 맑고 어디까지나 깨끗한 빛이다. 정령들의 왕 중에서도 가장 선한 존재라 여겨지는 한편, 아르켄라그가 빛 그 자체인 존재라고도 풀이된다. 물질계에 현현할 때 마라이카의 모습은 보는 자에 따라 달라 보인다 한다. 어떤 자에게는 빛의 갑옷을 두른 여전사로 보여도, 그 옆에 있는 자에게는 빛의 신호 그 자체로 보인다는 것이다. 어느 쪽이든 그 모습을 보는 것만으로 마음을 빼앗겨, 그 목소리를 듣는 것만으로 시야가 열려 의지가 솟구친다 한다."
      },
    ],
    skills: [
      {
        name: "집속일섬", nameJp: "収束一閃",
        timing: "마이너 액션", judge: "자동성공", target: "자신",
        range: "─", cost: "4", slMax: "1",
        effect: "(페이즈: 마라이카) 1로 취득 가능. 「분류: 마술(빛)」 스킬·파워에 유효. 마법 공격의 대상을 「대상: 단체」로 변경하고 데미지에 +2D한다. 당신이 「암흑」[명도 1 이하]의 영향을 받는 경우 사용할 수 없다. 이 효과는 메인프로세스 종료까지 지속된다."
      },
      {
        name: "빛의 은총", nameJp: "光の恩寵",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 마라이카) 1로 취득 가능. 〈빛〉 속성 마법 데미지를 주는 공격에 유효. 공격의 데미지에 +1D한다. 빛의 정령과 강한 연결이 있음을 나타내는 천혜 스킬."
      },
      {
        name: "빛의 궤적", nameJp: "光の道筋",
        timing: "판정의 직전", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "3",
        condition: "씬 SL회",
        effect: "(페이즈: 마라이카) 1로 취득 가능. 대상이 행하는 근접 무기의 명중 판정 직전에 사용한다. 그 판정에 +1D한다. 공격을 명중시키기 위한 궤도를 빛으로 제시하는 천혜 스킬."
      },
    ] as Skill[],
  },
  {
    id: "diabolos",
    name: "디아볼로스",
    nameJp: "ディアボロス",
    title: "암흑의 왕",
    accent: "#9A5ABE",
    lore: [
      {
        heading: "디아볼로스의 전설",
        text: "'바람의 시대'. 아크시네라는 외모가 좋은 소녀가 신들의 아버지 다그데모아를 섬기고 있었다. 그러나 아크시네는 사악한 플레르그가 화한 모습임을 예언한 여신 브리간티아는 이프리트와 디아볼로스를 간파하고 있었다. 여신은 어둠의 정령을 넣은 자루를 준비하여, 위험이 가까워지면 사용하도록 다그데모아에게 전했다. 그 무렵, 아크시네는 다그데모아를 유혹하려는 행동을 시작했다. 아크시네의 매력에 넘어간 다그데모아가 자루를 열자, 디아볼로스가 날아나왔다. 순식간에 다그데모아의 눈이 어둠에 덮였다. 이로써 아크시네의 요염한 모습에 미혹당하지 않을 수 있게 된 것이다."
      },
      {
        heading: "암흑의 왕",
        text: "\"암흑의 왕\" 디아볼로스는 어둠의 왕이라 불리는 정령이다. 이 왕이 지배하는 '어둠의 시대'는 인류가 소멸한 '불의 시대' 뒤에 찾아오는 아무것도 없는 시대라 부르는 자도 있다. 이 정령의 왕은 도둑이나 암살자를 비롯하여 야음을 타서 일을 이루는 자들에게 가호를 준다 전해진다. 또한 자고 있는 사이에 꾸는 꿈을 관장한다는 전설도 있다. 디아볼로스는 물질계에 거의 현현하지 않는다고 전해진다. 그 모습은 항상 어둠에 싸여 있다. '무엇'이라는 것은 분명하지만, 그것이 무엇인지는 결코 알 수 없다……. 그런 존재라 한다."
      },
    ],
    skills: [
      {
        name: "어둠의 손", nameJp: "暗闇の手",
        timing: "판정의 직전", judge: "자동성공", target: "단체",
        range: "20m", cost: "6", slMax: "1",
        condition: "씬 1회",
        effect: "(페이즈: 디아볼로스) 1로 취득 가능. 대상이 행하는 회피 판정 직전에 사용한다. 대상의 판정에 -1D한다. 손바닥 크기의 어둠으로 대상의 시야를 막아 무기나 마법을 하나 숨기는 천혜 스킬."
      },
      {
        name: "어둠의 은총", nameJp: "闇の恩寵",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "1",
        effect: "(페이즈: 디아볼로스) 1로 취득 가능. 〈어둠〉 속성 마법 데미지를 주는 공격에 유효. 공격의 데미지에 +1D한다. 어둠의 정령과 강한 연결이 있음을 나타내는 천혜 스킬."
      },
      {
        name: "어둠 두르기", nameJp: "闇まとい",
        timing: "패시브", judge: "─", target: "자신",
        range: "─", cost: "─", slMax: "3",
        condition: "은밀",
        effect: "(페이즈: 디아볼로스) 1로 취득 가능. 공격의 데미지에 +[SL×3]한다. 당신의 모습을 감추고 있는 어둠을 이용하여 공격의 위력을 높이는 천혜 스킬."
      },
    ] as Skill[],
  },
]

function SpiritKingsSection() {
  return (
    <section>
      {/* 섹션 헤더 */}
      <div style={{ borderBottom: `2px solid ${ACCENT}`, paddingBottom: 16, marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 28, color: "#F0E8C8", fontFamily: "'Noto Serif KR', serif" }}>
          정령의 왕 <span style={{ fontSize: 16, color: "#8A7830", fontWeight: 400 }}>精霊の王</span>
        </h2>
        <p style={{ margin: "10px 0 0", color: "#B0A060", fontSize: 13 }}>
          세계를 구성하는 6개의 원소를 관장하는 정령. 이들 정령을 묶는, 신들에 준하는 권능자로서 창조된 '정령의 왕'이라 불리는 존재이다.
        </p>
      </div>

      {/* 소개 + 공유 이미지 */}
      <div style={{ display: "flex", gap: 28, marginBottom: 36, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Prose text="신들이 세계를 창조했던 '빛의 시대'. 〈지〉〈수〉〈화〉〈풍〉〈광〉〈암〉이라는 세계의 이치를 관장하는 것으로서, 신들은 정령을 창조했다. 신들은 이 정령들 중에서도 특히 빛나는 것들을 '왕'으로 정하고, 정령들을 묶도록 명했다. 이리하여 '정령의 왕'이 탄생한 것이다." />
          <Prose text="정령에게 의지는 없지만, 신들에 준하는 것으로서 창조된 정령의 왕에게는 자아와 의지가 있다. 그러나 신들에게는 결코 거역할 수 없다. 그들은 어디까지나 신들에 따라 세계의 이치를 관장하는 존재인 것이다. 이 섹션에서는 6주의 정령의 왕을 소개한다." />
          <div style={{
            background: "#0C0A06", border: `1px solid ${ACCENT}`,
            borderRadius: 8, padding: "10px 14px", marginTop: 12
          }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>6주의 정령의 왕</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {spiritKings.map(g => (
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
            src="/spirit-kings/spirit-kings.jpg"
            alt="정령의 왕 일람"
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
                wrapper.innerHTML = `<span style="font-size:40px">🖼</span><span>정령의 왕 일람</span><span style="color:#5A5030;font-size:11px">/spirit-kings/spirit-kings.jpg</span>`
              }
            }}
          />
        </div>
      </div>

      {/* 각 정령의 왕 */}
      {spiritKings.map((g, idx) => (
        <div key={g.id} style={{ marginBottom: idx < spiritKings.length - 1 ? 52 : 0 }}>
          {/* 헤더 배너 */}
          <div style={{
            background: `linear-gradient(135deg, #0A0808 0%, ${g.accent}1A 100%)`,
            border: `1px solid ${g.accent}`,
            borderRadius: 8, padding: "14px 20px", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{
              background: g.accent, color: "#0A0808",
              fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, flexShrink: 0,
            }}>{g.title}</span>
            <h3 style={{ margin: 0, fontSize: 22, color: g.accent, fontFamily: "'Noto Serif KR', serif" }}>
              {g.name}
            </h3>
            <span style={{ color: "#6A5820", fontSize: 13, marginLeft: 2 }}>{g.nameJp}</span>
          </div>

          {/* 로어 텍스트 */}
          <div style={{ marginBottom: 20 }}>
            {g.lore.map((section, i) => (
              <div key={i} style={{ marginBottom: i < g.lore.length - 1 ? 18 : 0 }}>
                <div style={{
                  color: g.accent, fontWeight: 700, fontSize: 14,
                  borderLeft: `3px solid ${g.accent}`, paddingLeft: 10, marginBottom: 8
                }}>
                  {section.heading}
                </div>
                <p style={{ margin: 0, color: "#C8B870", fontSize: 13, lineHeight: 1.85 }}>
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* 스킬 카드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {g.skills.map((skill, si) => (
              <SkillCard key={si} skill={skill} accent={g.accent} />
            ))}
          </div>

          {idx < spiritKings.length - 1 && (
            <div style={{ borderTop: "1px solid #2A2810", marginTop: 44 }} />
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
  { id: "messengers", label: "신사",       icon: "🕊️" },
  { id: "heroes",     label: "영웅신",     icon: "🦸" },
  { id: "spirits",    label: "정령의 왕",  icon: "✨" },
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
      case "minor":      return <MinorGodsSection />
      case "messengers": return <DivineMassengersSection />
      case "heroes":     return <HeroGodsSection />
      case "spirits":    return <SpiritKingsSection />
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
