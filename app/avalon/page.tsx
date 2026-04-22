'use client'
import { useState } from 'react'

const ACCENT = "#C8A830"
const SIDEBAR_BG = "#06080E"

function Prose({ text }: { text: string }) {
  return (
    <p style={{ margin: "0 0 10px", lineHeight: 1.8, color: "#D8CCA8" }}>
      {text}
    </p>
  )
}

function SecTitle({ title }: { title: string }) {
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color: ACCENT,
      borderBottom: `2px solid ${ACCENT}`, paddingBottom: 4,
      margin: "24px 0 12px", fontFamily: "'Noto Serif KR', serif"
    }}>
      {title}
    </h3>
  )
}

const navItems = [
  { id: "overview",   label: "아발론 개요",  icon: "🌟" },
  { id: "history",    label: "역사",         icon: "📜" },
  { id: "city",       label: "도시 구조",    icon: "🏛️" },
  { id: "orgs",       label: "조직",         icon: "⚙️" },
  { id: "yukai",      label: "유계·전설",    icon: "👻" },
  { id: "godcallers", label: "신환자",       icon: "⚔️" },
  { id: "sisters",    label: "자매 도시",    icon: "🏙️" },
  { id: "people",     label: "인물",         icon: "👤" },
]

function OverviewSection() {
  const stats = [
    { label: "인구",      value: "불명" },
    { label: "통치형태",  value: "대표자에 의한 통치" },
    { label: "현재 수장", value: "펠르샤·브리간티아르 (신전원 원장)" },
    { label: "종교",      value: "브리간티아, 아에마" },
    { label: "언어",      value: "공통어" },
    { label: "물",        value: "불명" },
    { label: "기후",      value: "온화" },
    { label: "수입/수출", value: "없음" },
  ]
  return (
    <section>
      <Prose text="아발론은 다른 세계로부터의 침입을 막기 위해 신들이 만든 도시다. 여기에는 신환자(神喚者)라 불리는 신들이 선택한 자들이 거주하며, 신들의 명을 받아 싸우고 있다." />
      <div style={{ background: "#12100A", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
          {stats.map(s => (
            <div key={s.label} style={{ display: "flex", gap: 8, fontSize: 13 }}>
              <span style={{ color: ACCENT, fontWeight: 700, minWidth: 70, flexShrink: 0 }}>{s.label}</span>
              <span style={{ color: "#D8CCA8" }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#10100A", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: ACCENT, fontWeight: 700, marginBottom: 6, fontSize: 14 }}>✨ 신환자(神喚者)란</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          신들에게 선택된 영웅들. 신들에게 명받아 유계에서 다른 세계로부터의 침입자들과 싸운다.
          이들은 사람들에게 신과 동등하게 여겨질 만큼 숭고한 존재로, 이른바 준신(准神)이라 불러야 할 존재로 승화되어 있다.
          언젠가는 진정한 신이 되어 신계로 올라가게 된다.
        </p>
      </div>
      <SecTitle title="도시의 위치와 접근" />
      <Prose text="아발론은 이주신(二柱の女神) 브리간티에와 아에마가 유계(幽界) 안에 만든 소대지 위에 존재한다. 그 소대지의 외관은 인간이 아닌 신의 몸으로는 알 수 없으며, 안개가 낀 공간이 펼쳐진다고 한다." />
      <Prose text="아발론으로의 입구는 두 곳이다. 광장 정면에 있는 거대한 문이 정문이다. 또 하나는 문 반대편의 귀향항(帰郷港)으로, 여기에는 수척의 万能船이 정박해 있으며 안개 속을 부유하는 기묘한 모양새를 하고 있다. 물질계의 바다에서 안개 속으로 들어가면 유계의 바다로 나오며, 이 배들을 만능선(万能帆船)이라 부른다." />
    </section>
  )
}

function HistorySection() {
  return (
    <section>
      <SecTitle title="아발론의 역사" />
      <Prose text="아발론은 이주신(二柱の女神)에 의해 세워진 세계의 탑 중 하나다. 이 도시에는 신환자라 불리는 신들이 선택한 영웅들이 모여들었다." />
      <Prose text="에린딜의 여러 지역에는 요정·아바르·안개 지킴이 같은 다양한 존재들이 있으며, 행방을 알 수 없는 곳도 있다. 적어도 그 일부는 「영원의 거리」 아발론의 것이라는 공통된 이야기가 전해진다." />
      <SecTitle title="창설의 경위" />
      <Prose text="아발론은 月の女神 브리간티에와 河と泉の女神 아에마가 유계(幽界) 위에 만들었다. 이 여신들로부터 다양한 지역에서 들어오는 다른 세계의 침략과 마족·요마(妖魔)가 에린딜로 나오는 것을 막기 위한 방책이었다." />
      <Prose text="여신들이 세계를 저지하는 「次元回廊」을 파괴해줄 인간에게 역할을 맡기기로 하고, 주신 아르켄라체에게 제안했다. 주신은 이를 받아들였고, 여신들은 유계에 일곱 개의 방새 도시를 건설했다. 아발론은 그 방새 도시 중에서 최초로 건설된 도시다." />
      <SecTitle title="세이블씨스터즈 구상" />
      <Prose text="당초 아발론을 비롯한 일곱 개의 방새 도시가 건설되었다 (「세븐시스터즈 구상」). 서로 보완하면서 에린 전체를 방위한다는 발상 아래, 각 도시에는 건설된 순서대로 번호가 매겨지고 건설된 토지의 이름이 붙었다. 그러나 현재는 침략자들에 의해 세 곳이 함락되어 세 도시가 남아 있다." />
      <SecTitle title="현재의 아발론" />
      <Prose text="현재 이 도시는 여신의 의사에 동조한 영웅들 — 신환자들이 거주하고 있다. 유계에서 물질계로 향하는 次元回廊에 대항하는 것이 환상 도시의 본래 역할이다." />
      <div style={{ background: "#10100A", border: `1px solid #6A5A18`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: ACCENT, fontWeight: 700, marginBottom: 6, fontSize: 13 }}>ℹ️ 아발론의 등장</div>
        <p style={{ color: "#D8CCA8", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
          「영원의 거리」 아발론은 아리안로드 RPG의 상위 캐릭터 레벨 PC를 대상으로 한 모험의 무대다.
          AR2E에서는 국가·도시 레벨의 플레이어 PC가 이 거리를 거점으로 모험할 수 있도록 마련되어 있다.
        </p>
      </div>
    </section>
  )
}

function CitySection() {
  const facilities = [
    {
      name: "아발론 대신전", nameJp: "アヴァロン大神殿", icon: "⛩️",
      desc: "아발론의 거리 중심에 있는 신전. 月の女神 브리간티에와 河と泉の女神 아에마를 모신다. 신전 앞 광장에는 이주신의 두 여신상이 세워져 있다. 신의 화신인 펠르샤 브리간티아르와 나인시스터즈 요정들이 지키는 경우가 많다.",
    },
    {
      name: "귀향항", nameJp: "帰郷港", icon: "⚓",
      desc: "아발론 유일의 항구. 아발론 북단의 작은 대지로, 「흰 안개의 배」를 비롯한 만능선이 정박해 있다. 항구 주변은 항상 유기(幽気)로 가득 찬 안개로 뒤덮여 있으며 해면은 보이지 않는다. 항구에서 뛰어내린 자가 며칠 후 아무 기억도 없이 돌아왔다는 일화가 전해진다.",
    },
    {
      name: "시련장", nameJp: "試練場", icon: "⚔️",
      desc: "신전원 수호단이 관리하는 훈련장. 제파·프린지콜트가 지도를 맡아 많은 신환자들이 이곳에서 훈련을 받는다. 기초 체력을 높이는 곳은 물론, 무기를 사용한 히토리고 수련을 위한 고대의 훈련장도 있다. 매월 1일에는 경기대회가 열리며, 우승자에게는 귀중한 마법 아이템도 주어진다.",
    },
    {
      name: "「성배의 인도」 주점", nameJp: "「聖杯の導き」亭", icon: "🍺",
      desc: "아발론 유일의 주점. 항상 활기가 넘쳐 밤낮 없이 대단한 신환자들로 북적인다. 에린딜·아르디온 등지의 음식이 갖춰져 있다. 점주 가르파가 조달한다고 여겨지지만, 주인이 가게를 비운 적이 없다. 에린딜과 아르디온의 각지에서 비슷한 사람이 주인을 맡는 가게가 있다고 한다.",
    },
    {
      name: "웨이랜드 단금 공방", nameJp: "ウェイランド鍛金工房", icon: "🔨",
      desc: "신환자가 사용하는 무구 제조를 전담하는 장인 집단. 신구(神具) 이외라면 어떤 마법 아이템도 만들 수 있다고 호언장담한다. 아르켄라베 대로에 있으며, 대표인 미스티·웨이랜드는 전설의 단금 술사 티안의 직제자다.",
    },
    {
      name: "시련탑", nameJp: "試練塔", icon: "🗼",
      desc: "유계를 마주하는 높은 탑. 고대부터 살고 있는 위대한 영웅들이 모여 있어, 자진해서 강한 신환자들에게 실력을 쌓아줄 수 있다. 흉부 시험을 통해 단기간에 뛰어난 전사를 찾아볼 수 있는 장소이기도 하다.",
    },
    {
      name: "요정의 숲", nameJp: "妖精の森", icon: "🌲",
      desc: "아발론 안의 소규모 숲. 유계에 거주하는 신들의 분신인 요정 종족과 거인 종족이 여기에 서식한다. 수호 임무 중 휴식을 취하는 신환자들이 종종 들린다.",
    },
    {
      name: "허무의 샘", nameJp: "虚しの泉", icon: "💫",
      desc: "유계 안에 있는 신비로운 샘. 반신(半神)이 된 존재들이 수행하는 장소다. 물을 마시면 일시적으로 유계의 진상에 접근할 수 있다고 전해지지만, 실태는 불분명하다.",
    },
  ]
  return (
    <section>
      <Prose text="아발론은 거의 원형 구조로, 중심에 신전이 있다. 신전 앞에는 광장이 있으며 이주신의 두 여신상이 서 있다. 광장에서 뻗은 넓은 도로(아르켄라베 대로)가 거리 전체를 에워싸고, 그 끝에 거대한 문이 있다." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {facilities.map(f => (
          <div key={f.name} style={{ background: "#10100A", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, color: "#E8D890", marginBottom: 2, fontSize: 14 }}>
              {f.name}
              <span style={{ color: "#8A7830", fontSize: 11, marginLeft: 6 }}>{f.nameJp}</span>
            </div>
            <p style={{ color: "#D8CCA8", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
      <SecTitle title="만능선 (万能帆船)" />
      <Prose text="각 방새 도시에는 수척씩 만능선이 배치되어 있다. 이 배는 유계를 자유롭게 항행할 수 있으며, 물질계와 오갈 수도 있다. 또한 공중 비행도 가능하고, 霧精의 바람을 받아 바람이 없어도 원하는 방향으로 나아갈 수 있다. 아발론의 「흰 안개의 배」가 가장 유명하다." />
      <Prose text="만약 만능선을 쓸 수 없는 경우, 방새 도시 자체가 물질계로 이동하는 것도 가능하다. 이때 도시 주변의 유계와 물질계가 일시적으로 연결되는 불가사의한 상태가 된다." />
    </section>
  )
}

function OrgsSection() {
  const orgs = [
    {
      name: "신전원", nameJp: "神院院",
      type: "정부 기관",
      base: "아발론 대신전",
      leader: "펠르샤·브리간티아르",
      desc: "신환자를 운영하는 조직. 아발론을 총괄하는 정부적 기관으로, 비정치적인 활동은 담당하지 않는다. 특히 정치적 측면에서는 「크라슈-노벨의 네 영웅」 중 한 명으로 명성 높은 펠르샤 브리간티아르가 총괄한다.",
    },
    {
      name: "신전원 수호단", nameJp: "神殿院守護団",
      type: "군사 조직",
      base: "아발론 대신전",
      leader: "「안개의 소녀」 에레인",
      desc: "신환자를 모은 신전원 직속 전투 집단. 신환자 중에서도 실력 있는 자들을 맡는다. 보통 신환자로는 대응이 어려운 임무를 맡는 한편, 신환자의 격 수여도 담당한다. 단장은 두 가지 이름을 가진 「안개의 소녀」, 요정족 에레인이다.",
    },
    {
      name: "웨이랜드 단금 공방", nameJp: "ウェイランド鍛金工房",
      type: "장인 조합",
      base: "아르켄라베 대로",
      leader: "미스티·웨이랜드",
      desc: "신환자가 사용하는 무구 제조를 전담하는 장인 집단. 신구(神具) 이외라면 어떤 마법 아이템도 만들 수 있다고 호언장담한다. 대표 미스티·웨이랜드는 전설의 단금 술사 티안의 직제자로, 그 기술을 계승했다고 한다.",
    },
    {
      name: "나인시스터즈", nameJp: "ナインシスターズ",
      type: "정부 기관",
      base: "아발론 대신전",
      leader: "모르간·르·페이",
      desc: "신전원 원장 펠르샤가 가장 아끼는 요정들. 주로 신환자에게 명령을 전달하고, 그 외에도 신전의 잡무와 아발론 내 순찰 등을 맡는다. 현재 대응 수가 한정되어 있어 우수한 모험가를 신환자로 스카우트하는 일도 한다. 멤버는 모르간 외에 로노에, 마지에, 그리테 등이 있다.",
    },
    {
      name: "흰 안개의 배", nameJp: "白き霧の船",
      type: "선박",
      base: "귀향항",
      leader: "캡틴",
      desc: "아발론의 만능선 중 1척. 순백의 아름다운 범선으로, 유계 항행은 물론 물질계와 오가는 것도 가능하다. 승무원은 선장인 캡틴 한 명뿐이다. 단지 「캡틴」이라고만 불리며, 一船長이라 불린다.",
    },
  ]
  return (
    <section>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {orgs.map(o => (
          <div key={o.name} style={{ background: "#100E06", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ fontWeight: 700, color: "#F0E090", fontSize: 15 }}>{o.name}</span>
                <span style={{ color: "#8A7830", fontSize: 11, marginLeft: 8 }}>{o.nameJp}</span>
              </div>
              <span style={{ background: "#1A1808", color: ACCENT, fontSize: 11, padding: "2px 8px", borderRadius: 12, border: `1px solid ${ACCENT}` }}>{o.type}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto 1fr", gap: "4px 12px", marginBottom: 8, fontSize: 12 }}>
              <span style={{ color: ACCENT, fontWeight: 700 }}>본거지</span>
              <span style={{ color: "#D8CCA8" }}>{o.base}</span>
              <span style={{ color: ACCENT, fontWeight: 700 }}>대표자</span>
              <span style={{ color: "#D8CCA8" }}>{o.leader}</span>
            </div>
            <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{o.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function YukaiSection() {
  return (
    <section>
      <SecTitle title="유계(幽界)란" />
      <Prose text="신들의 주거 신계(神界), 인간·동물들의 주거 물질계(物質界). 이 두 세계 사이에 존재하는 것이 幽界다. 幽界에는 시간이나 공간 같은 개념이 통용되지 않는다. 次元回廊이 시간·공간적으로 불안정한 성질을 가지는 이유도 이 때문이다." />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {[
          { num: "①", title: "고위 존재의 거주지", desc: "「정령의 왕」이나 「동물의 왕」 같은 물질계를 지배하는 고위 존재들의 거처. 이들은 사람들에게 신과 동등하게 여겨질 만큼 숭고하며, 신에 가까운 존재로 신계에 오르는 과정에 있다." },
          { num: "②", title: "영혼의 정화",       desc: "물질계의 생물들의 영혼이 정화되는 장소. 물질계에서 선을 행한 자들은 幽界로 불려가 정화되고, 다시 물질계에 새로운 생명으로 돌아간다. 이 정화의 모습이 천국과 지옥 이미지의 원천이 되었다고 한다." },
          { num: "③", title: "영웅의 승화",       desc: "영웅적 행위를 한 자가 신지신앙(神知信仰)을 받으면 신지에 더욱 가까워지고, 언젠가는 진정한 신이 되어 신계에 올라갈 수 있다." },
        ].map(r => (
          <div key={r.num} style={{ background: "#10100A", border: "1px solid #6A5A18", borderRadius: 8, padding: 14 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: ACCENT, fontWeight: 700, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{r.num}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#E8D890", fontSize: 14, marginBottom: 4 }}>{r.title}</div>
                <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SecTitle title="요정과 유계의 대지" />
      <Prose text="영적 세계인 幽界에는 물질계와 같은 대지가 없었다. 그런데 언젠가부터 물질계와 같은 대지가 존재하게 되었다. 그 이유는 어느 시기에 물질계로 밀려든 요정들 때문이라고 한다. 요정들은 자신들이 관리하는 나무·집·자연 현상 등을 幽界에 무의식적으로 만들어버렸다. 따라서 幽界에도 일부이기는 하나 물질계와 같은 대지가 광범위하게 펼쳐지게 되었다." />

      <SecTitle title="방새 도시의 전설" />
      <Prose text="방새 도시는 물질계와 유계를 오가기 때문에, 그것을 목격한 자, 혹은 사정을 모르고 끌려 들어간 자들에 의해 다양한 전설이 에린에 전해지고 있다." />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          {
            name: "妖精郷",
            title: "요정향 (妖精郷)",
            desc: "요정들이 사는 곳이라고 일컬어지며 유계 안에 있다고 한다. 모든 요정들의 고향이고, 요정들은 이곳에서 태어나 물질계로 가는 것으로 여겨진다. 키노나산(페어리서클로 불리는 곳)을 통해 갈 수 있다고 하지만, 요정에게 이끌려 요정향까지 데려가져 버렸다는 전설도 있다.",
          },
          {
            name: "リエナンテ",
            title: "「방황의 거리」 리에나테",
            desc: "에린딜 서쪽 방면에서 쫓겨다니고 있다고 소문난 거리. 그래서 「방황의 거리」 두 가지 이름으로 불린다. 모험가나 상인 등 비교적 많은 사람들에게 목격되며, 안개와 함께 나타나고 안개가 걷히면 사라진다고 한다. 리에나테에는 신들이 남긴 신구가 있다고 전해지며, 그것을 찾아 모험가들이 이 거리를 탐색하고 있다.",
          },
          {
            name: "アヴァル",
            title: "아발 (アヴァル)",
            desc: "아르디온에 남는 신화와 전설 가운데, 아발이라 불리는 장소를 찾아 불로불사를 구하는 영웅들의 이야기가 전해진다. 그 땅에는 향기와 안개의 강이 흐르며, 열매를 먹을 뿐으로 몇 번이고 배가 채워지고 사람들은 영원의 삶을 보낼 수 있다고 한다. 전설에 따르면, 아발은 봄이 태어나는 장소로서 그 땅은 3명의 봄의 요정에게 지켜지고 있다고 한다.",
          },
        ].map(l => (
          <div key={l.name} style={{ background: "#0E0E08", border: "1px solid #6A5A18", borderRadius: 8, padding: 14 }}>
            <div style={{ fontWeight: 700, color: "#E8D890", fontSize: 14, marginBottom: 6 }}>{l.title}</div>
            <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{l.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function GodcallersSection() {
  return (
    <section>
      <SecTitle title="신환자의 역할" />
      <Prose text="다른 세계 침략자들이 에린에 침입하기 위해 만든 次元回廊의 대부분은 幽界에 열린다. 幽界에는 시간이나 공간 개념이 통용되지 않기 때문에 次元回廊은 불안정하다. 幽界 내에서는 때때로 시간과 공간 개념이 혼란스러워지기도 한다." />
      <Prose text="아발론의 경우, 次元回廊 발생 알림은 신전원 원장인 펠르샤가 받는다. 펠르샤가 즉시 次元回廊으로 날아가 봉쇄·파괴한다. 펠르샤가 부재 중인 경우엔 그 부하 나인시스터즈가 대신한다." />

      <SecTitle title="미궁화된 次元回廊" />
      <Prose text="유계의 次元回廊은 때때로 변질되어 미궁이 된다. 변질된 次元回廊은 그야말로 미궁 — 던전화되어 침략자들이 신환자에게 이빨을 세우기 위한 수단으로 삼는 것이다." />
      <Prose text="次元回廊의 미궁 형태와 내용은 실로 다양하다. 次元回廊을 만든 來訪者의 성격에 기인하는 경우가 많고, 더욱 많은 것은 침입한 신환자의 사고를 이용해 에린딜의 유적과 같은 모습을 현현시키는 것이다." />

      <SecTitle title="물질계에 열린 次元回廊" />
      <div style={{ background: "#1A0A08", border: "1px solid #8A3A1A", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#FF8866", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>⚠️ 극히 위험한 상황</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          간혹 물질계에 次元回廊이 열리는 경우가 있다. 이것은 극히 위험한 상황이다.
          규모가 가장 작은 次元回廊이라도 복수의 고레벨 모험가가 아니면 대응할 수 없을 정도다.
          실제로 신들이 예언을 하사해 겨우 次元回廊을 막아낸 적도 과거에는 있었다.
        </p>
      </div>

      <SecTitle title="신환자의 일상" />
      <Prose text="싸움을 명받지 않을 때, 신환자들의 행동은 자유다. 특별한 이유가 없는 한 자유롭게 움직일 수 있으며, 다음 싸움을 향해 기력을 기르거나 수행을 쌓거나 자유롭게 생각하는 경우도 있다. 원하면 물질계로 일시적으로 돌아가는 것도 가능하다." />
      <Prose text="신환자의 수행 장소로서 대표적인 것은 방새 도시 안에 있는 시련장이다. 고대부터 살고 있는 위대한 영웅들이 모여 있어, 자신보다 강한 신환자에게 실력을 쌓아줄 수 있다. 幽界라면 수행의 장소가 이가 없다." />

      <SecTitle title="시나리오에서의 활용" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { title: "레귤레이션", desc: "아발론을 무대로 플레이하는 경우, GM은 모든 에리어 데이터를 사용할 수 있도록 기본 캐릭터 레벨 20 이상을 추천한다. 全員神喚者 클라스로 아발론을 홈타운으로 삼아 플레이한다." },
          { title: "운명 클라스가 되기 위해 방문하다", desc: "운명 클라스로의 클라스 체인지를 위한 시련을 받기 위해 아발론을 방문하는 방법도 있다. 神知信仰을 받은 PC는 신환자 클라스 체인지가 가능하고, 그 내용은 次元回廊을 파괴·幽界에 있는 고위 거인이나 용 같은 신들의 권속과 싸우는 것이다." },
          { title: "아발론에 숨어들다", desc: "아발론에는 안전하게 가까이 다가갈 수 없다. 그래서 지금까지 신환자가 아닌 인간이 미로를 헤매다 들어온 경우가 있다. 이런 인물을 NPC로 등장시켜, 아발론에 들어온 PC가 귀환을 위해 여러 가지 활동을 하는 시나리오도 흥미롭다." },
        ].map(s => (
          <div key={s.title} style={{ background: "#0E0E08", border: "1px solid #6A5A18", borderRadius: 8, padding: 14 }}>
            <div style={{ fontWeight: 700, color: "#E8D890", fontSize: 14, marginBottom: 4 }}>{s.title}</div>
            <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SistersSection() {
  const cities = [
    { num: "壱", name: "아발론", nameJp: "アヴァロン",      status: "건재",   color: ACCENT,   area: "에린딜 서방 + 아르디온 서방 + 중앙 담당" },
    { num: "弐", name: "호우라이", nameJp: "ホウライ",      status: "건재",   color: "#4A9A4A", area: "에린딜 동방 담당. 신환자는 에린딜 동방의 세리아 대제국 출신이 많다." },
    { num: "参", name: "엘·도라도", nameJp: "エル·ドラード", status: "함락",   color: "#8A3A1A", area: "아르디온 대륙 서방 담당. 신구(神具)를 많이 보유해 「보물의 새」 이명을 가졌다. 성력 799년, 격렬한 공방 끝에 자폭·폭산. 신구는 에린 각지로 흩어졌다." },
    { num: "肆", name: "자나두", nameJp: "ザナドゥ",         status: "함락",   color: "#8A3A1A", area: "에린딜 대륙 중앙 담당. 기동력·공격력이 가장 높은 도시였다. 사상 최초로 침략자에게 함락된 방새 도시 — 성력 753년." },
    { num: "伍", name: "라퓨타", nameJp: "ラピュータ",       status: "포위 중", color: "#C87A18", area: "아르디온 대륙 동방 담당. 단금술과 마법을 조합한 자동 방어 기구를 개발. 성력 898년 자동 방어 시스템이 침략자에게 탈취되어 현재 전투 중." },
    { num: "陸", name: "샴발라", nameJp: "シャンバラ",       status: "건재",   color: "#4A9A4A", area: "남방 대륙 담당. 영령(靈獸)이 방어에 협력하는 것이 특징. 현재는 잔존 2개 도시의 백업을 담당." },
    { num: "柒", name: "티르·나·노그", nameJp: "ティル·ナ·ノグ", status: "함락", color: "#8A3A1A", area: "에린딜 대륙 북방 담당. 요정과 친화성이 높은 도시. 성력 799년 함락." },
  ]
  return (
    <section>
      <Prose text="아발론만이 아닌, 물질계에는 아발론과 다른 방새 도시들이 있다. 「세븐시스터즈 구상」이라 불렸으며, 당초부터 아발론의 나인시스터즈와 혼동이 많았다고 한다." />
      <Prose text="각 도시에는 건설될 때마다 번호가 할당되고, 건설된 토지의 이름이 붙었다." />

      <SecTitle title="7개 자매 도시" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {cities.map(c => (
          <div key={c.num} style={{ background: "#0E0E08", border: `1px solid ${c.color}`, borderRadius: 8, padding: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ background: c.color, color: "#060606", fontWeight: 700, fontSize: 13, padding: "4px 8px", borderRadius: 4, flexShrink: 0, minWidth: 28, textAlign: "center" }}>{c.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: "#E8D890", fontSize: 14 }}>{c.name}</span>
                <span style={{ color: "#8A7830", fontSize: 11 }}>{c.nameJp}</span>
                <span style={{
                  fontSize: 11, padding: "1px 8px", borderRadius: 10,
                  background: c.status === "건재" ? "#0A2A0A" : c.status === "포위 중" ? "#2A1A06" : "#2A0A0A",
                  color: c.status === "건재" ? "#66CC66" : c.status === "포위 중" ? "#FFAA44" : "#FF6666",
                  border: `1px solid ${c.status === "건재" ? "#2A6A2A" : c.status === "포위 중" ? "#6A4A18" : "#6A1A1A"}`,
                }}>{c.status}</span>
              </div>
              <p style={{ color: "#D8CCA8", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{c.area}</p>
            </div>
          </div>
        ))}
      </div>

      <SecTitle title="7도시에서 3도시로" />
      <Prose text="에린딜 서방과 아르디온 동서방을 아발론이, 에린딜 동방과 남방 대륙을 호우라이가, 샴발라는 잔존 2개 도시의 백업을 담당하는 체제가 되었다." />
      <Prose text="「3개 도시에서 2지역」이 아닌 「2개 도시에서 3지역을 담당하고 1개 도시를 백업으로 돌리는」 체제를 취한 이유는 그 한계를 요마에게 빼앗긴 것을 반성해, 필요한 경우 1개 도시 분량의 전력을 집중 투입할 수 있는 시스템을 선택했기 때문이다." />

      <SecTitle title="라퓨타에서의 전투 (伍番都市ラピュータ)" />
      <div style={{ background: "#100A06", border: "1px solid #8A5A18", borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", marginBottom: 12, fontSize: 12 }}>
          {[
            { label: "번호", value: "5번 도시" },
            { label: "인구", value: "불명" },
            { label: "수장", value: "레무리아·아에마리아" },
            { label: "종교", value: "브리간티아, 아에마" },
            { label: "언어", value: "공통어" },
            { label: "기후", value: "온화" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", gap: 6 }}>
              <span style={{ color: "#C87A18", fontWeight: 700, minWidth: 50, flexShrink: 0 }}>{s.label}</span>
              <span style={{ color: "#D8CCA8" }}>{s.value}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          5번째로 건설된 방새 도시. 단금술과 마법을 조합한 자동 방어 기구를 발달시켜, 가능한 한 인간에 의존하지 않는 방어 시스템 확립을 목표로 만들어졌다.
        </p>
        <div style={{ borderTop: "1px solid #4A3A18", paddingTop: 10 }}>
          <div style={{ color: "#FF8844", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>⚔️ 성력 898년 — 라퓨타 전투</div>
          <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
            성력 898년, 라퓨타의 자동 방어 시스템이 침략자들에게 탈취되었다. 라퓨타는 단금술과 마법을 조합한 방어 기구를 발달시켰으나, 그것이 역으로 이용된 것이다.
          </p>
          <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
            라퓨타의 대표자 레무리아·아에마리아는 즉각 자동 방어 시스템을 포기했다. 탈취된 제어 기구를 마법으로 물리적으로 파괴함과 동시에, 방어 시스템의 폭주를 이용해 침략자 군대가 침입한 지역을 도시 시설과 함께 폭파했다.
          </p>
          <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            시간을 번 레무리아는 아직 침입을 허용하지 않은 지역과의 경계에 결계를 쳐 침략자들의 도시 중추로의 침입을 막았다. 현재는 공방이 일진일퇴의 교착 상태가 이어지고 있다.
          </p>
        </div>
      </div>

      <SecTitle title="엘·도라도 신구 탐색" />
      <Prose text="흩어진 엘·도라도의 파편이 에린에 표착하는 경우가 있다. 그 표착물 중에 엘·도라도에 있던 신구가 포함되어 있는 경우도 있다. 신구에 따라서는 너무 강력하기 때문에 때로는 시공간의 균형을 무너뜨리려 할 수 있다. 그 위협은 신구의 자동 방어 시스템으로 인해, 에린의 일반인이 위험에 노출되는 경우도 적지 않다." />
      <Prose text="따라서 신환자에 대해서는 엘·도라도에서 유출된 신구의 회수 임무가 명해지는 경우가 있다. 신구를 회수하게 되지만, 그 중에는 회유와 설득을 요하는 경우도 있어 회수까지 수 년이 걸리는 케이스도 있다." />

      <SecTitle title="주요 특수 지역" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
        {[
          {
            name: "용궁성 (竜宮城)", city: "호우라이",
            icon: "🐉",
            desc: "호우라이의 대표 오토히메의 성채이자 도시 중추. 동방 문화의 색채가 짙은 구조가 특징이다. 오토히메가 파티를 즐기기 때문에 성내에는 많은 신환자들로 늘 북적인다. 광장에는 마술로 사계절 풍경이 재현되어 있으며, 성내에는 대내외 마술 연구소도 있어 대래구저 전략 전술 연구가 이루어진다.",
          },
          {
            name: "경계 전장 (境界戦場)", city: "라퓨타",
            icon: "⚔️",
            desc: "라퓨타 거리 안에 펼쳐지는 전장. 신환자 측과 침략자 측 각각의 진영이 구역 단위로 결계를 사용해 서로의 지역을 공격한다. 결계를 파괴함으로써 구역을 빼앗고, 자진의 결계를 친다. 공방은 일진일퇴의 교착 상태가 이어지며, 타개의 기미가 보이지 않는다.",
          },
          {
            name: "미디르 성채 (ミディール城砦)", city: "티르·나·노그",
            icon: "🏰",
            desc: "티르·나·노그에 건설된 방어용 성채. 침략자에 의해 도시 일부가 함락된 후, 적의 수중으로 떨어져 티르·나·노그의 대표 다-나를 비롯한 요인들의 수용 시설이 되었다. 또한 성채는 지하에도 통해 있어 신환자들에 의한 잠입 구출 작전이 행해질 것으로 예상된다.",
          },
          {
            name: "「방황의 거리」 리에나테", city: "추정: 엘·도라도 잔해",
            icon: "❓",
            desc: "에린딜 서방 각지를 방황하는 전설의 거리. 안개와 함께 나타나고 안개가 걷히면 사라진다. 방새 도시가 물질계로 이동할 때의 현상과 유사하며, 아발론은 이 거리의 정체가 폭산한 엘·도라도의 잔해일 가능성을 검토하고 있다. 내부에 다수의 신구가 보관되어 있다는 전설도 있다.",
          },
        ].map(f => (
          <div key={f.name} style={{ background: "#0E0E08", border: "1px solid #6A5A18", borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, color: "#E8D890", fontSize: 13, marginBottom: 2 }}>{f.name}</div>
            <div style={{ color: ACCENT, fontSize: 11, marginBottom: 6 }}>소재: {f.city}</div>
            <p style={{ color: "#D8CCA8", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function PeopleSection() {
  const avalonPeople = [
    {
      name: "펠르샤·브리간티아르", nameJp: "フェルシア·ブリガンティアル",
      role: "신전원 원장",
      race: "휴린 (하프엘다나)", gender: "여", age: "?",
      hair: "회색", eyes: "적색", skin: "백색",
      quote: "……이게 이번 일이야. 잘 부탁해",
      note: "「크라슈-노벨의 네 영웅」 중 한 명. 神化分身 아바타로서 竜記憶을 겨우 되찾아 오래 자리를 비운 아발론으로 귀환했다. 정령 마술을 특기로 하는 마법사로, 말수가 적고 사려 깊지만 뜬금없는 말을 하는 면이 있다.",
    },
    {
      name: "제파·프린지콜트", nameJp: "ゼパ·フリンジコルト",
      role: "시련장 지남역",
      race: "네바프", gender: "남", age: "?",
      hair: "없음", eyes: "금색", skin: "녹색",
      quote: "데미지는 0이지☆",
      note: "일찍이 에린딜 대륙에서 마족과 요마와 싸운 세인(誓人) 중 한 명. 「아르디온 대륙의 대영웅」으로 불리는 사건 당시, 深紅의 아인·조우에 의해 구출되어 아발론으로 데려와졌다. 세인으로서의 맹세를 이루고, 현재는 신전원 수호단에 소속되어 시련장 지도를 맡고 있다.",
    },
    {
      name: "미스티·웨이랜드", nameJp: "ミスティ·ウェイランド",
      role: "웨이랜드 단금 공방 대표",
      race: "엘다나", gender: "여", age: "?",
      hair: "녹색", eyes: "청색", skin: "백색",
      quote: "그래서, 이번엔 어떤 무기를 원하시나요?",
      note: "웨이랜드 단금 공방의 대표. 신구 이외라면 어떤 마법 아이템도 만들어낼 수 있다고 호언장담한다. 에린딜 서방에서 모르는 자가 없다는 전설의 단금 술사 티안의 직제자로, 그 기술을 이을 수 있다고 한다.",
    },
    {
      name: "가르파", nameJp: "ガーファー",
      role: "「성배의 인도」 주점 주인",
      race: "드라고넷", gender: "남", age: "?",
      hair: "흑색", eyes: "흑색", skin: "백색",
      quote: "물론이죠, 당신에 대해서는 알고 있습니다",
      note: "「성배의 인도」 주점의 점주. 수수께끼 많은 인물로, 그가 모르는 것은 없다고 여겨질 만큼의 정보통이다. 아르디온 대륙의 헥스포드 거리를 비롯해 에린딜과 아르디온의 각지에서 그와 비슷한 사람을 만난 모험가도 적지 않다.",
    },
    {
      name: "모르간·르·페이", nameJp: "モルガン·ル·フェイ",
      role: "나인시스터즈 리더",
      race: "요정", gender: "여", age: "?",
      hair: "핑크색", eyes: "녹색", skin: "백색",
      quote: "네 정도의 실력으로 정말 괜찮겠어~?",
      note: "신전원 원장 펠르샤가 가장 아끼는 요정. 나인시스터즈의 리더. 펠르샤가 신환자 대응을 맡는 경우가 많기 때문에 구수한 성격의 착실한 존재다. 나인시스터즈는 그 이름대로 시에 요정이며, 모르간 외에 로노에, 마지에, 그리테 등이 있다.",
    },
  ]
  const otherCityPeople = [
    {
      name: "오토히메·브리간티아르", nameJp: "オトヒメ·ブリガンティアル",
      role: "호우라이 대표 / 용궁성 성주",
      race: "휴린", gender: "여", age: "?",
      hair: "흑색", eyes: "흑색", skin: "상아색",
      accent: "#4A9A4A",
      quote: "아시던가요? 사실은……",
      note: "아발론의 펠르샤와 마찬가지로 브리간티아의 아바타 중 한 명. 책사, 지혜자, 지략가 등 좋은 면과 나쁜 면 양쪽을 나타내는 다수의 형용사를 가진다. 하지만 실은 수다스럽고 파티를 좋아하는 소녀다. 단지, 나이에 대해 물어보면 진심으로 화를 낸다.",
    },
    {
      name: "레무리아·아에마리아", nameJp: "レムリア·アエマリア",
      role: "에리크시르 협회 사모 (라퓨타 통치 기관)",
      race: "네바프", gender: "여", age: "?",
      hair: "흑색", eyes: "홍옥색", skin: "갈색",
      accent: "#C87A18",
      quote: "포기하기엔……아직 이르다",
      note: "라퓨타의 통치 기관 에리크시르 협회의 대표(사모). 침략자들과 100년 이상 싸워오고 있다. 말수는 적지만 결단력이 있고, 냉정하지만 용감한 인물. 자신의 도시 상황이 다른 도시의 신환자들의 부담이 되고 있는 것을 걱정한다. 향신료를 사용한 요리가 특기인 인간적인 면도 있다.",
    },
    {
      name: "베넷", nameJp: "ベネット",
      role: "삼하 여신 (에린의 안전을 지키는 여신)",
      race: "바르나 (늑대족)", gender: "여", age: "?",
      hair: "녹색", eyes: "녹색", skin: "백색",
      accent: "#2A7A8A",
      quote: "삼하 여신이란 바로 나 말이야 그랬어요!!",
      note: "원래 별것 없는 부하였던 베넷였지만, 수많은 모험과 업적을 이루어 여신 아리안로드의 화신 펠르샤의 천거로 에린의 안전을 지키는 여신이 되었다. 그러나 지금도 그 「삼하」 티가 변하지 않아, 지금도 「나」「~했어요」라는 말투가 빠지지 않는 삼하 여신이다.",
    },
  ]
  const invaders = [
    {
      name: "세첸", nameJp: "セチェン",
      role: "래구저 (침략자)",
      race: "마족", gender: "?", age: "?",
      hair: "없음", eyes: "홍색", skin: "금속색",
      accent: "#8A1A1A",
      quote: "……죽여라",
      note: "기묘한 외모를 한 마족. 강대한 전투력을 갖추며, 자나두 공략 시에는 선봉에 서서 신환자들을 베어쓰러뜨렸다. 외견과 달리 비인간적인 사고 패턴을 갖고 있어, 결과적으로 인간들이 행동을 읽을 수 없다. 한편 압도적으로 유리한 상황에서도 왜인지 후퇴하는 등 이해하기 어려운 행동을 취하는 경우가 있다.",
    },
    {
      name: "메이브", nameJp: "メーブ",
      role: "래구저 (침략자)",
      race: "마족", gender: "여", age: "?",
      hair: "금색", eyes: "암갈색", skin: "요염한 백색",
      accent: "#6A1A6A",
      quote: "네 춤은, 여기서 끝이야",
      note: "요염한 미녀의 외모를 한 마족. 조종하는 것을 즐기며, 적대자가 자멸하는 것을 최대의 기쁨으로 삼는다. 티르·나·노그를 빼앗을 때, 신환자들의 피해망상을 이용해 자멸하는 형태로 거의 피해 없이 공략했다. 세첸과는 사이가 나빠 연계가 전혀 없다. 이것은 인류에게 다행스러운 일이다.",
    },
  ]

  function CharCard({ p, ac }: { p: typeof avalonPeople[0] & { accent?: string }, ac: string }) {
    return (
      <div style={{ background: "#100E06", border: `1px solid ${ac}`, borderRadius: 8, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <span style={{ fontWeight: 700, color: "#F0E898", fontSize: 16 }}>{p.name}</span>
            <span style={{ color: "#8A7830", fontSize: 11, marginLeft: 8 }}>{p.nameJp}</span>
          </div>
          <span style={{ color: "#D8CCA8", fontSize: 12 }}>{p.race} / {p.gender} / {p.age}</span>
        </div>
        <div style={{ color: ac, fontSize: 12, marginBottom: 6 }}>{p.role}</div>
        <div style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 12 }}>
          <span style={{ color: "#8A7830" }}>머리: <span style={{ color: "#D8CCA8" }}>{p.hair}</span></span>
          <span style={{ color: "#8A7830" }}>눈: <span style={{ color: "#D8CCA8" }}>{p.eyes}</span></span>
          <span style={{ color: "#8A7830" }}>피부: <span style={{ color: "#D8CCA8" }}>{p.skin}</span></span>
        </div>
        <div style={{ background: "#1A1808", borderLeft: `3px solid ${ac}`, padding: "6px 10px", marginBottom: 8, borderRadius: "0 4px 4px 0" }}>
          <p style={{ color: "#ECD870", fontSize: 12, fontStyle: "italic", margin: 0 }}>「{p.quote}」</p>
        </div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{p.note}</p>
      </div>
    )
  }

  return (
    <section>
      <p style={{ color: "#8A7830", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        방새 도시들의 주요 인물들을 소개한다. PC의 의뢰인, 정보 제공자, 또는 협력자 혹은 적으로서 시나리오에 등장할 수 있다.
      </p>

      <div style={{ background: "#0E0C06", borderLeft: `4px solid ${ACCENT}`, padding: "8px 14px", marginBottom: 14, borderRadius: "0 6px 6px 0" }}>
        <span style={{ color: ACCENT, fontWeight: 700, fontSize: 13 }}>🌟 아발론 인물</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {avalonPeople.map(p => <CharCard key={p.name} p={p} ac={ACCENT} />)}
      </div>

      <div style={{ background: "#060E06", borderLeft: "4px solid #4A9A4A", padding: "8px 14px", marginBottom: 14, borderRadius: "0 6px 6px 0" }}>
        <span style={{ color: "#4A9A4A", fontWeight: 700, fontSize: 13 }}>🏯 다른 방새 도시 인물</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {otherCityPeople.map(p => <CharCard key={p.name} p={{ ...p }} ac={p.accent} />)}
      </div>

      <div style={{ background: "#0E0606", borderLeft: "4px solid #8A1A1A", padding: "8px 14px", marginBottom: 14, borderRadius: "0 6px 6px 0" }}>
        <span style={{ color: "#FF6666", fontWeight: 700, fontSize: 13 }}>👹 래구저 (来寇者) — 침략자</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {invaders.map(p => <CharCard key={p.name} p={{ ...p }} ac={p.accent} />)}
      </div>
    </section>
  )
}

export default function AvalonPage() {
  const [active, setActive] = useState("overview")

  function renderContent() {
    switch (active) {
      case "overview":   return <OverviewSection />
      case "history":    return <HistorySection />
      case "city":       return <CitySection />
      case "orgs":       return <OrgsSection />
      case "yukai":      return <YukaiSection />
      case "godcallers": return <GodcallersSection />
      case "sisters":    return <SistersSection />
      case "people":     return <PeopleSection />
      default:           return <OverviewSection />
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE" }}>
        {/* Sidebar */}
        <aside style={{ width: 220, background: SIDEBAR_BG, color: "#E0D8B0", display: "flex", flexDirection: "column", padding: "24px 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <a href="/" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: "11px", color: "#888" }}>← 아리안로드 위키</div>
          </a>
          <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid #2A2808" }}>
            <div style={{ fontSize: 11, color: "#8A7830", letterSpacing: 2, marginBottom: 4 }}>ARIANROD 2E</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#F0E090", lineHeight: 1.3 }}>
              「영원의 거리」<br />아발론
            </div>
            <div style={{ fontSize: 11, color: "#8A7830", marginTop: 4 }}>永遠の街·アヴァロン</div>
          </div>
          <nav style={{ padding: "12px 0", flex: 1 }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 20px",
                  background: active === item.id ? "#1A1808" : "transparent",
                  color: active === item.id ? "#F0E090" : "#A89040",
                  border: "none", borderLeft: active === item.id ? `3px solid ${ACCENT}` : "3px solid transparent",
                  cursor: "pointer", fontSize: 13, fontFamily: "'Noto Sans KR', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 860, overflowY: "auto" }}>
          <header style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: "#8A7830", marginBottom: 4 }}>방새 도시 · 유계(幽界)</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1A1408", fontFamily: "'Noto Serif KR', serif", margin: "0 0 4px" }}>
              「영원의 거리」 아발론
            </h1>
            <div style={{ fontSize: 14, color: "#6A5820" }}>永遠の街·アヴァロン — 신환자들의 방새 도시</div>
            <div style={{ width: 60, height: 3, background: ACCENT, marginTop: 12, borderRadius: 2 }} />
          </header>
          {renderContent()}
        </main>
      </div>
    </>
  )
}
