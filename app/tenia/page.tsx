'use client'
import { useState } from 'react'

const ACCENT = "#6A3A8A"
const SIDEBAR_BG = "#080410"

function Prose({ text }: { text: string }) {
  return (
    <p style={{ margin: "0 0 10px", lineHeight: 1.8, color: "#CFC4E0" }}>
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
  { id: "overview",   label: "테니아 개요",   icon: "🏰" },
  { id: "history",    label: "역사와 추락",   icon: "📜" },
  { id: "city",       label: "도시 구조",     icon: "🗺️" },
  { id: "orgs",       label: "조직",          icon: "⚙️" },
  { id: "people",     label: "인물",          icon: "👤" },
  { id: "scenarios",  label: "시나리오",      icon: "⚔️" },
]

function OverviewSection() {
  const stats = [
    { label: "인구",       value: "540인 (휴린 66%, 엘다나 15%, 네바프 7%, 필볼 6%, 바르나 3%, 도앙 3%)" },
    { label: "통치형태",   value: "위기관리위원회에 의한 합의제" },
    { label: "현재 수장",  value: "루프트 도벨 (위기관리위원장, 신관장 대행)" },
    { label: "종교",       value: "7대신 신앙" },
    { label: "언어",       value: "공통어" },
    { label: "물",         value: "마계의 물을 정화해 저수지에 저장" },
    { label: "기후",       value: "한냉 습지" },
    { label: "수입/수출",  value: "없음 (지상과의 교역 루트 없음)" },
  ]
  return (
    <section>
      <Prose text="테니아는 고대의 공중 도시였으나, 수많은 모험가들과 함께 마계로 추락했다. 지상으로 돌아가려는 모험가들이 지금도 분투하고 있다." />
      <div style={{ background: "#120620", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
          {stats.map(s => (
            <div key={s.label} style={{ display: "flex", gap: 8, fontSize: 13 }}>
              <span style={{ color: ACCENT, fontWeight: 700, minWidth: 80, flexShrink: 0 }}>{s.label}</span>
              <span style={{ color: "#CFC4E0" }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#200818", border: "1px solid #8A2A4A", borderRadius: 8, padding: 14, marginBottom: 20 }}>
        <div style={{ color: "#FF7777", fontWeight: 700, marginBottom: 6, fontSize: 14 }}>⚠️ 현재 상황: 마계 표류 중</div>
        <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          성력 1006년, 테니아는 마계의 습지대로 추락했다. 추락 충격으로 지면과 건물 곳곳에 균열이 생겼다.
          거주민들은 지상 귀환을 위해 「대탈출」 작전을 진행 중이며, 마계라는 낯선 환경 속에서도 생활을 이어가고 있다.
        </p>
      </div>
      <SecTitle title="도시 개요" />
      <Prose text="테니아는 중앙섬을 중심으로 4개의 부속 섬이 전송기로 연결된 공중 정원 도시다. 각지에는 농장과 목장이 있어 어느 정도의 식량 자급이 가능하다. 추락 전에는 신전이 일반적인 텔레포트 거점 역할을 했으나, 지금은 각 신전에 설치된 특수 마법진을 통한 전송만 가능하다." />
      <Prose text="추락 이후에도 테니아의 방어 기제는 일부 작동하고 있다. 바람 장벽은 물리적인 것이어서 조류·도앙족 같은 날개를 가진 종족이 테니아에 접근하기 어렵다. 마계의 결계 또한 통상적인 텔레포트를 방해하고 있다. 그러나 지면 아래 방향의 바람 장벽은 소멸하여, 현재는 마계와 테니아를 직접 오갈 수 있는 봉쇄 지역이 생겨났다." />
    </section>
  )
}

function HistorySection() {
  return (
    <section>
      <SecTitle title="테니아의 역사" />
      <Prose text="공중 정원이 재발견된 것은 성력 997년, 알베르트·테니아라는 모험가가 고대 문서를 해독해 전설 속 공중 정원에 도달한 것이 계기였다. 정원 발견자의 이름을 따 「테니아」라 명명되었고, 그의 모험을 스폰서한 신전에 의해 영세 중립 도시로 선포되었다." />
      <Prose text="알베르트·테니아와 모험가들은 공중 정원 조사에 착수했다. 성력 1006년, 에린디일 각지에서 하늘을 날아다니는 새들의 목격 사례가 이어지고, 그 무렵 대규모 마법 기관이 차단되면서 전송기와 테니아를 연결하는 마법진이 끊겼다. 신전의 신관 루프트 도벨은 상부에 이 이상 징후를 보고했지만, 결국 상황은 최악으로 치달아 테니아는 마계로 추락했다." />

      <SecTitle title="대공의 지배자: 다임·다라무" />
      <div style={{ background: "#200818", border: "1px solid #8A1A3A", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#FF7777", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>👹 大空の支配者 — ダイム·ダラム</div>
        <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          성력 1006년 테니아 추락의 원인은 「대공의 지배자」 다임·다라무라는 마족이다.
          공중에 떠 있는 테니아 자체를 자신의 몸으로 삼는 거대한 마족이었다.
        </p>
        <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          500년 전, 패왕이 정령과 신의 힘으로 봉인했던 다임·다라무는 오랜 세월을 거쳐 각성했다.
          에린디일의 하늘을 구름으로 뒤덮으려 했지만 모험가들이 저지했고, 그의 죽음과 함께 테니아는 마계로 추락했다.
        </p>
      </div>

      <SecTitle title="기어다니는 균류: 가라무·다라무" />
      <div style={{ background: "#0C180A", border: "1px solid #3A6A1A", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#88CC44", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🍄 這い寄る菌類 — ガラム·ダラム</div>
        <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          테니아 추락 시 대규모 전송 마법진이 오작동한 것은, 다임·다라무가 죽음 직전에 자신의 분신을 시스템에 주입했기 때문이다.
          가라무·다라무는 동물과 식물 양쪽의 성질을 가진 마족으로, 균사로 동물·건물의 내부에 침투해 안에서부터 지배한다.
        </p>
        <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          마계에서 점차 성장하며 다시금 테니아를 장악하려 하고 있다.
          동시에 자신의 분신을 중앙 진료원의 에트나·프로렌에게 기생시켜, 그녀를 통해 테니아 내부에 불화의 씨앗을 뿌리고 모험가들을 파멸시키려 하고 있다.
        </p>
      </div>

      <SecTitle title="추락 이후의 테니아" />
      <Prose text="테니아가 착지한 곳은 마계의 습지대였다. 추락 시 충격이 컸으나, 테니아 내부에 봉인되어 있던 시설들이 발견되어 주민들의 생존을 가능케 했다." />
      <Prose text="다행히 추락으로 생긴 균열 안에서 식료품과 약재가 가득 찬 창고, 동물과 가축이 냉동 보존된 창고가 발견되어 식량 문제가 어느 정도 해결되었다. 현재는 봉쇄 지역을 훈련장 대용으로 활용하는 한편, 전송기를 이용한 마계 던전 조사와 물질계 귀환 방법 탐색이 진행되고 있다." />
    </section>
  )
}

function CitySection() {
  const facilities = [
    {
      name: "테니아 신전", nameJp: "テニア神殿", icon: "⛩️",
      desc: "테니아에서 가장 중요한 시설. 추락 전에는 일반 텔레포트 거점이었으나, 마계 추락 후에는 위기관리위원회의 본부가 되었다. 신관, 모험가, 상인의 각 분야 대표 3인 체제로 운영된다. 신전 지하에서는 개량·강화가 이어져 방어의 요충지가 되었다.",
    },
    {
      name: "전송기", nameJp: "転送機", icon: "✨",
      desc: "테니아에는 중앙섬과 연결된 4개의 섬에 각각 1기씩 전송기가 있다. 전송 코드를 입력하면 마계 각지의 던전 7~9개와 연결된다. 전송기를 통과한 모험가는 기력을 막는 필드로 감싸여 마계에서도 물질계와 동일하게 행동할 수 있다. 최대 6명까지 전송 가능.",
    },
    {
      name: "보리야 상회", nameJp: "ボリーヤ商会", icon: "🏪",
      desc: "공중에 떠 있을 때부터 무기에서 일용품까지 취급하던 도매상. 마계 추락 후에는 지상 공급처를 잃었으나, 전송기를 통해 마계 던전에서 아이템을 입수하는 방식으로 적응했다. 위험도는 높지만 희귀한 마계 물품을 갖추고 있다. 점주 볼의 장사 수완 덕분에 어느 정도 물자 확보가 가능하다.",
    },
    {
      name: "테레자의 주점", nameJp: "テレーザの酒場", icon: "🍺",
      desc: "공중 정원 시대부터 모험가들을 위한 미션 거점으로 이름난 주점. 마계 추락 후에는 정보 허브 역할이 더욱 강해졌다. 점주 루치아가 마계 신문을 발행하며, 신전으로부터 의뢰 업무도 위탁받아 의뢰소 기능을 겸하고 있다.",
    },
    {
      name: "농장·목장", nameJp: "農場·牧場", icon: "🌾",
      desc: "추락 전 테니아에는 훈련장 주변을 원과 정원으로 만든 농장들이 도처에 있었다. 지금은 봉쇄 지역 훈련장의 대용으로 활용되고 있다. 목장에서는 닭과 양이 생존해 있어 달걀과 유제품을 공급한다. 농업협동조합이 운영을 맡고 있다.",
    },
    {
      name: "저수지 (ため池)", nameJp: "ため池", icon: "💧",
      desc: "추락 전 테니아는 공중에 있었기 때문에 우수(雨水)만이 유일한 수원이었다. 지금은 마계의 습지에서 길어 올린 물을 정화해 저수지에 저장하고, 우물로 끌어올려 생활용수로 활용하고 있다. 비가 오면 대기권에 들어오지 못하게 되어 있으나 비의 수질은 거의 문제없다.",
    },
  ]
  return (
    <section>
      <Prose text="테니아는 중앙섬을 중심으로 4개의 부속 섬이 전송기로 연결된 구조다. 중앙섬에는 신전을 비롯한 주요 시설이 집중되어 있다. 도시 전역은 바람 장벽과 마술 결계에 의해 부분적으로 보호되고 있다." />
      <SecTitle title="봉쇄 지역 (封鎖地区)" />
      <Prose text="공중에 떠 있을 때 테니아 전방위로 바람 장벽이 쳐져 있었다. 현재는 지면 아래 방향의 장벽이 소멸해 마계와 테니아를 직접 오갈 수 있는 구멍이 생겼다. 지하에서 하위 마물들이 침입하는 탓에 봉쇄 지역은 자경단의 상시 경계 구역이다." />
      <SecTitle title="주요 시설" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {facilities.map(f => (
          <div key={f.name} style={{ background: "#120820", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, color: "#E0D0F0", marginBottom: 2, fontSize: 14 }}>
              {f.name}
              <span style={{ color: "#8A6AAA", fontSize: 11, marginLeft: 6 }}>{f.nameJp}</span>
            </div>
            <p style={{ color: "#CFC4E0", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function OrgsSection() {
  const orgs = [
    {
      name: "위기관리위원회", nameJp: "危機管理委員会",
      type: "정부 기관",
      base: "중앙섬, 테니아 신전",
      leader: "루프트 도벨",
      desc: "마계에 떨어진 테니아에 사는 인원을 총괄하는 조직. 테니아 신전, 모험가, 상인의 각 분야 대표 3인 체제로 구성된다. 위원장은 루프트 도벨. 마계라는 비상 상황이 배경인 만큼 개인의 생명과 재산에도 강한 명령권을 갖는다.",
    },
    {
      name: "테니아 자경단", nameJp: "テニア自警団",
      type: "군사 조직",
      base: "중앙섬, 테니아 신전",
      leader: "테드 라이마",
      desc: "용감한 모험가들을 모아 만든 자경단 조직. 예비역도 포함하면 모험가의 거의 전원이 어떤 형태로든 자경단에 소속되어 있다. 소수 정예 전력을 갖추며, 정기적으로 봉쇄 지역을 이용해 군사 훈련을 실시한다.",
    },
    {
      name: "테니아 농업협동조합", nameJp: "テニア農業協同組合",
      type: "동업 조합",
      base: "중앙섬",
      leader: "—",
      desc: "테니아 각지에 점재하는 농장과 목장을 관리하는 단체. 동시에 식료품의 공급 관리와 음식점의 식재료 가격 결정을 담당한다. 마계의 가축도 사육하고 있으며, 마수 헌팅 용역에도 종사한다.",
    },
    {
      name: "중앙섬 진료원", nameJp: "中央島診療院",
      type: "정부 기관",
      base: "중앙섬, 테니아 신전",
      leader: "에트나 프로렌",
      desc: "테니아 신전의 의료반이 위기관리위원회 설립에 맞춰 독립한 의료 기관. 마계에서는 미지의 병·부상·감염이 많다. 에트나는 사람들의 신뢰를 얻는 자애로운 힐러로 알려져 있지만, 내부에 가라무·다라무의 분신이 기생 중이라는 사실은 알려지지 않았다.",
    },
    {
      name: "밤꾀꼬리의 소리", nameJp: "夜鳴鶯の声",
      type: "비밀 결사",
      base: "불명",
      leader: "「知」 (이름 불상)",
      desc: "마족의 힘을 빌려 물질계로 돌아가려는 그룹. 구성원은 신원 불명인 경우가 많지만, 위기관리위원회의 기밀 정보를 보유하고 있다. 리더는 「知」라는 코드네임을 가지며, 강력한 설득력으로 조직원을 모은다.",
    },
  ]
  return (
    <section>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {orgs.map(o => (
          <div key={o.name} style={{ background: "#110720", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ fontWeight: 700, color: "#E0D0F0", fontSize: 15 }}>{o.name}</span>
                <span style={{ color: "#8A6AAA", fontSize: 11, marginLeft: 8 }}>{o.nameJp}</span>
              </div>
              <span style={{ background: "#2A1040", color: ACCENT, fontSize: 11, padding: "2px 8px", borderRadius: 12, border: `1px solid ${ACCENT}` }}>{o.type}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto 1fr", gap: "4px 12px", marginBottom: 8, fontSize: 12 }}>
              <span style={{ color: ACCENT, fontWeight: 700 }}>본거지</span>
              <span style={{ color: "#CFC4E0" }}>{o.base}</span>
              <span style={{ color: ACCENT, fontWeight: 700 }}>대표자</span>
              <span style={{ color: "#CFC4E0" }}>{o.leader}</span>
            </div>
            <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{o.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function PeopleSection() {
  const people = [
    {
      name: "루프트 도벨", nameJp: "ルフト·ドーベル",
      role: "테니아 신관장 / 위기관리위원장",
      race: "휴린", gender: "남", age: "64",
      hair: "어두운 회갈색", eyes: "갈색", skin: "동색",
      quote: "원래 세계로 돌아가기 위해서라면 수단을 가리지 않겠다",
      note: "테니아 신전의 신관장이자 위기관리위원회 위원장. 마계로 추락하기 전후를 모두 경험하며 테니아의 지도력을 유지하고 있다. 강한 리더십으로 귀환을 강하게 주장하며, 고민이 많아 지쳐 보이는 경우도 있지만 신뢰는 무너지지 않는다.",
    },
    {
      name: "볼 보리야", nameJp: "ボル·ボリーヤ",
      role: "보리야 상회 점주",
      race: "필볼", gender: "남", age: "72",
      hair: "연한 금색", eyes: "녹색", skin: "백색",
      quote: "마계의 물건은 희귀하니 지상에 돌아간 후엔 비싸게 팔 수 있지",
      note: "보리야 상회의 점주. 테니아가 마계에 추락한 후에도 약삭빠른 장사를 계속하며 모험가들이 던전에서 가져온 마계 물품을 사들인다. 마음에 드는 희귀 상품은 직접 마계 던전에서 구해 오기도 한다. 서민들 사이의 평판은 그다지 좋지 않다.",
    },
    {
      name: "루치아 테레자", nameJp: "ルチア·テレーザ",
      role: "테레자의 주점 점주",
      race: "휴린", gender: "여", age: "36",
      hair: "적색", eyes: "청색", skin: "백색",
      quote: "오늘의 마계 신문, 톱 뉴스는 새로운 던전 발견이야",
      note: "테레자의 주점 주인. 마계 추락 후 주점에 모이는 정보를 수집해 마계 신문을 발행하기 시작했다. 신전으로부터 의뢰 업무도 위탁받으며, 최근 고민은 마력이 부족한 것과 젖소·양이 줄어든 것이다.",
    },
    {
      name: "새벽의 소녀", nameJp: "暁の少女",
      role: "전송기 수호 정령",
      race: "—", gender: "여", age: "?",
      hair: "백색", eyes: "금색", skin: "백색",
      quote: "모험자 여러분, 부탁드려요. 저를 찾아주세요",
      note: "다임·다라무에게 지배되기 전 테니아를 관리하던 정령. 신들과 정령이 만들어 올린 箱船(상선) 5호선으로서의 테니아를 관리하는 정령이었다. 공중 정원 시대부터 모험가들의 눈에 목격되어 왔다. 투명한 소녀의 모습으로 전송기 던전에 출몰하며, 위기에 처한 모험가들에게 탈출 방법을 알려준다. 점점 모험가들에게 자연스럽게 알려지게 되었다.",
    },
    {
      name: "디미트리아스 블랙번", nameJp: "ディミトリアス·ブラックバーン",
      role: "우연히 갇힌 모험가",
      race: "휴린", gender: "남", age: "24",
      hair: "금색", eyes: "청색", skin: "백색",
      quote: "증거는 모험자로서의 내 도움이야",
      note: "마계 추락 직전, 강행하던 모험가들과 함께 테니아에 왔다가 갇힌 귀족 자녀. 스스로를 훌륭한 모험가라고 생각하지만 실제로는 그렇지 않다. 그래도 성심껏 도움을 자청하며, 최근의 던전 탐색에서 새벽의 소녀에게 도움을 받은 이후 그녀를 꿈에 그리고 있다.",
    },
  ]
  return (
    <section>
      <p style={{ color: "#8A6AAA", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        「실락원」 테니아의 주요 인물들을 소개한다. 이들은 PC의 의뢰인, 정보 제공자, 또는 협력자로서 시나리오에 등장할 가능성이 높다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {people.map(p => (
          <div key={p.name} style={{ background: "#110720", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <span style={{ fontWeight: 700, color: "#E8D8FF", fontSize: 16 }}>{p.name}</span>
                <span style={{ color: "#8A6AAA", fontSize: 11, marginLeft: 8 }}>{p.nameJp}</span>
              </div>
              <span style={{ color: "#CFC4E0", fontSize: 12 }}>{p.race} / {p.gender} / {p.age}세</span>
            </div>
            <div style={{ color: ACCENT, fontSize: 12, marginBottom: 6 }}>{p.role}</div>
            <div style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 12 }}>
              <span style={{ color: "#8A6AAA" }}>머리: <span style={{ color: "#CFC4E0" }}>{p.hair}</span></span>
              <span style={{ color: "#8A6AAA" }}>눈: <span style={{ color: "#CFC4E0" }}>{p.eyes}</span></span>
              <span style={{ color: "#8A6AAA" }}>피부: <span style={{ color: "#CFC4E0" }}>{p.skin}</span></span>
            </div>
            <div style={{ background: "#1A0C2C", borderLeft: `3px solid ${ACCENT}`, padding: "6px 10px", marginBottom: 8, borderRadius: "0 4px 4px 0" }}>
              <p style={{ color: "#D4B8F0", fontSize: 12, fontStyle: "italic", margin: 0 }}>「{p.quote}」</p>
            </div>
            <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{p.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ScenariosSection() {
  const scenarios = [
    {
      title: "공중 정원이 추락하기까지",
      sub: "空中庭園が落ちるまで",
      desc: "구 아리안로드 RPG 상급 룰북에 수록된 랜덤 던전 캠페인의 무대. 공중에서 발견된 테니아를 탐색해 진상을 밝혀나가는 이야기다. 현행 2E 개정판에서는 이 아이디어를 참고해 GM이 자유롭게 시나리오를 구성할 수 있다.",
    },
    {
      title: "배신자를 찾아라",
      sub: "裏切り者を探せ",
      desc: "테니아 내부에는 마족의 힘을 끌어들여 물질계로 돌아가려는 세력이 있다. 위기관리위원회 사람들의 뒤통수를 치려 하고 있으며, PC는 내부 적의 정보를 빼내는 임무를 받게 된다.",
    },
    {
      title: "새벽의 소녀의 수수께끼를 쫓아",
      sub: "暁の少女の謎を追う",
      desc: "공중 정원 시대부터 모험가들의 눈에 목격되어 온 새벽의 소녀. 그녀는 箱船 5호선이었던 테니아를 관리하던 정령이다. 전송기의 닫힌 능력으로 탈출하지 못하고 있는 그녀를 찾는 것이 목표다.",
    },
    {
      title: "마계 도시 탐색",
      sub: "魔界都市の探索",
      desc: "테니아 주변에는 마족이 지배하는 도시들이 산재해 있다. 각 세력의 균형에 따라 충돌이 끊이지 않는다. 마계 도시 내부 탐색, 파벌의 실태 조사, 물자 조달 임무 등이 준비될 수 있다.",
    },
    {
      title: "영웅을 찾아서",
      sub: "英雄の探索",
      desc: "공중 정원 테니아를 재발견한 모험가 알베르트·테니아. 그는 동료들과 함께 테니아를 탐색하던 중 행방불명이 되었다. PC가 그를 찾아내어 지상 귀환을 위한 중요 정보를 얻는 것이 목적이다.",
    },
    {
      title: "대탈출 작전",
      sub: "大脱出作戦",
      desc: "테니아 거주민 전원의 공통 목표는 원래 세계로 귀환하는 것이다. 마계 탈출 루트를 확인하고, 신전이 대규모 전송 마법진을 수복해 테니아와 물질계를 다시 연결하는 것이 최종 목표다. 기상 탈출 루트에는 다름 아닌 箱船 기능의 복구가 필요하다.",
    },
  ]
  return (
    <section>
      <Prose text="「실락원」 테니아는 다양한 어드벤처 시나리오의 무대가 된다. GM은 이하의 아이디어를 활용해 시나리오를 자유롭게 구성할 수 있다." />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {scenarios.map(s => (
          <div key={s.title} style={{ background: "#100820", border: "1px solid #4A2A6A", borderRadius: 8, padding: 14 }}>
            <div style={{ fontWeight: 700, color: "#E0D0F0", fontSize: 14, marginBottom: 2 }}>
              {s.title}
              <span style={{ color: "#7A5A9A", fontSize: 11, marginLeft: 8 }}>{s.sub}</span>
            </div>
            <p style={{ color: "#CFC4E0", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function TeniaPage() {
  const [active, setActive] = useState("overview")

  function renderContent() {
    switch (active) {
      case "overview":  return <OverviewSection />
      case "history":   return <HistorySection />
      case "city":      return <CitySection />
      case "orgs":      return <OrgsSection />
      case "people":    return <PeopleSection />
      case "scenarios": return <ScenariosSection />
      default:          return <OverviewSection />
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE" }}>
        {/* Sidebar */}
        <aside style={{ width: 220, background: SIDEBAR_BG, color: "#E0D8F0", display: "flex", flexDirection: "column", padding: "24px 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #2A1A3A" }}>
            <div style={{ fontSize: 11, color: "#6A4A8A", letterSpacing: 2, marginBottom: 4 }}>ARIANROD 2E</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#E8D8FF", lineHeight: 1.3 }}>
              「실락원」<br />테니아
            </div>
            <div style={{ fontSize: 11, color: "#6A4A8A", marginTop: 4 }}>失楽庭園·テニア</div>
          </div>
          <nav style={{ padding: "12px 0", flex: 1 }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 20px",
                  background: active === item.id ? "#220E38" : "transparent",
                  color: active === item.id ? "#E8D8FF" : "#8A6AAA",
                  border: "none", borderLeft: active === item.id ? `3px solid ${ACCENT}` : "3px solid transparent",
                  cursor: "pointer", fontSize: 13, fontFamily: "'Noto Sans KR', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "16px 20px", borderTop: "1px solid #2A1A3A" }}>
            <a href="/" style={{ color: "#6A4A8A", fontSize: 12, textDecoration: "none" }}>← 메인으로</a>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 860, overflowY: "auto" }}>
          <header style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: "#8A6AAA", marginBottom: 4 }}>영세 중립 도시 · 마계 표류 중</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1A0828", fontFamily: "'Noto Serif KR', serif", margin: "0 0 4px" }}>
              「실락원」 테니아
            </h1>
            <div style={{ fontSize: 14, color: "#5A3A7A" }}>永世中立都市テニア — 마계에 추락한 공중 정원 도시</div>
            <div style={{ width: 60, height: 3, background: ACCENT, marginTop: 12, borderRadius: 2 }} />
          </header>
          {renderContent()}
        </main>
      </div>
    </>
  )
}
