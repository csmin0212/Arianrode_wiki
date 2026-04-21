'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A6A1A";
const SIDEBAR_BG = "#060E04";

const navItems = [
  { id: "overview", label: "틸미리이 개요", icon: "🧚" },
  { id: "city",     label: "도시 구조",     icon: "🌳" },
  { id: "orgs",     label: "조직",          icon: "🍄" },
  { id: "people",   label: "인물",          icon: "👤" },
];

function Prose({ text }: { text: string }) {
  return <p style={{ fontSize: "14px", lineHeight: 2, color: "#444", margin: "0 0 16px" }}>{text}</p>;
}

function SecTitle({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0 12px" }}>
      <div style={{ width: 4, height: 20, background: ACCENT, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>{title}</div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div>
      <Prose text={"에린의 대지를 모습을 바꾸며 살아가는 요정들의 거처는, 요정향이라 불리는 이세계라고 말해진다. 하지만 넓은 세계 속에는, 지상에 존재하는 요정들의 집락이 있다. 틸미리이는 그러한 요정 사회 중 하나다."} />
      <SecTitle title="개요" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { label: "인구", value: "5천인 (요정 거의 100%)" },
          { label: "통치 형태", value: "대리공에 의한 통치" },
          { label: "현 수장", value: "「대보」 로빈 (대리공)" },
          { label: "종교", value: "요정왕 신앙" },
          { label: "언어", value: "각종 요정의 언어" },
          { label: "기후", value: "온대" },
          { label: "수입품", value: "없음" },
          { label: "수출품", value: "없음" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <SecTitle title="역사" />
      <Prose text={"에린딜 대륙. 서방과 동방을 나누는 끝없는 사막의 북쪽, 타르타르·한국의 황야를 넘은 산맥 저편에, 그 도시는 있다고 한다. 사람이 발을 들여놓기 어렵다는 험준한 황야의 한가운데에 있지만, 기묘하게도 항상 도시는 있다. 하지만 「확실히」 이 도시가 존재한다는 것을 확인한 자는 거의 없다."} />
      <Prose text={"틸미리이는, 지상에 존재하는 요정의 거점 중에서도 특별한 의미를 가진다. 그것은 이 도시가, 요정왕 오베론에 의해 에린 안에 있는 모든 요정의 주거지와 연결하는 전이 장치로서 만들어졌기 때문이다. 오베론은 이 도시를 에린의 중계 기지로 정한 모양이다."} />
      <SecTitle title="현황" />
      <Prose text={"도시는 요정왕 오베론이 지배하는 것으로 여겨지고 있지만, 오베론이 도시에 있다는 것은 아니다. 아들 쪽을 대리의 관리자로서 보내어, 운영을 위탁하고 있다. 도시에 사는 요정들은, 기본적으로 외부와의 접촉을 줄이고, 숨어서 살고 있다. 하지만 인간 사회와 관계가 없지는 않다."} />
      <Prose text={"도시의 주변에는, 요정이라 불리는 마법의 나무가 있다. 이것들은 에린과 틸미리이를 연결하는 전이 장치이며, 도시를 황야에서 외부로부터 숨기는 마술 장치이기도 하다. 또한 도시의 바깥쪽에는, 밖에서 도시에 들어오려는 자가 있으면 적대적으로 그들을 추적하는, 도시의 수호를 위해 조직된 전사 집단이 기다리고 있다."} />
    </div>
  );
}

function CitySection() {
  const spots = [
    { name: "디나시의 숲", jp: "ディナシーの園", desc: "도시 중심부에서, 숲으로 덮여 있다. 숲에는 디나시가 많이 살고 있어, 디나시의 숲이라고 명명되어 있다. 숲의 중심에는 거대한 나무가 서 있으며, 도시의 대리공——「대보」의 로빈이 사는 궁전이 되고 있다." },
    { name: "리야난시의 샘", jp: "リャナンシーの泉", desc: "도시 근방의 샘에는 샘이 솟아 있고, 수변에는 닉시·엘살카·리야난시라는 물을 좋아하는 요정들이 살고 있다. 이 아름다운 샘은 리야난시들의 집 수영장이자 음수 용도로 이용된다. 샘물에 특별한 효능이 있다는 것은 알려져 있지 않지만, 그 마법의 물은 인간과의 교역에 사용되는 경우가 있다." },
    { name: "브라우니의 언덕", jp: "ブラウニーの丘", desc: "도시 외곽에, 녹음이 우거진 언덕이 존재한다. 언덕에는 둥근 형태의 주거가 즐비하게 서 있으며, 브라우니나 야키모라는 집에 사는 요정들이 살고 있다. 레프라콘 등 직인의 공방도 이 장소에 세워져 있다." },
    { name: "스프라이트의 춤터", jp: "スプライトの踊り場", desc: "도시 외곽에, 열린 빈 공터이기도 한 넓은 광장이 있다. 페어리나 스프라이트가 날아다니고, 샌드맨이 일하는 장소로, 도시 내부에 있으며, 아스란에서 야생의 정령들이 모이기도 한다." },
    { name: "요정나무", jp: "妖精樹", desc: "거리 주변을 원환처럼 둘러싸듯이 서 있는 요정나무. 전체 12그루라고 한다. 이것들은 에린과 틸미리이를 연결하는 전이 장치이며, 도시를 황야에서 외부로부터 숨기는 마술 장치이기도 하다. 요정들은 이 나무를 사용하여 이 쪽에서 에린을 순찰하러 가기도 한다. 인간도 이 나무를 사용하는 것은 가능하다." },
  ];
  const facilities = [
    { name: "한가운데의 커다란 나무", jp: "まんなかの大きな木", desc: "거리 중앙에 있는 거목. 나무의 수령은 몇 백 년이나 됐는지 알 수 없다. 오래된 나무로 둘레의 나무 수는 수십 미터나 있어, 내부에는 커다란 우코의 공동이 있어, 틸미리이에 사는 요정들의 집 장소로 많은 경우는 도시의 주민들이 모여드는 연회 장소로서 이용되고 있다. 하지만 이 장소는, 요정왕 오베론이 로빈에게 이 도시의 자유를 위임한 대리공——「대보」 로빈이 사는 궁전이다. 평소에는 연회 장소의 주민들이 모이고 있지만, 로빈이 목소리를 낼 때에는, 대리공이 공사를 중단하고 명령을 전달하는 정치의 장소가 된다." },
  ];
  return (
    <div>
      <SecTitle title="5개 스폿" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {spots.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{s.name} <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400 }}>{s.jp}</span></div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      {facilities.map((f, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", marginBottom: 12 }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{f.name} <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400 }}>{f.jp}</span></div>
          <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

function OrgsSection() {
  const orgs = [
    { name: "전처녀기사단 발키리루루", type: "군사 조직", base: "디나시의 숲", leader: "「교훈하고 싶어하는」 아르비트", content: "틸미리이를 수호하는 방어 조직. 발키리로 구성된 전비 날아다니는 기사단이다. 도시 안의 요정이나, 도시를 위협하는 마수들에게 맞서기 위해 조직되어 있다. 주로 방위가 주요 임무이지만, 때에 따라 기사들을 외부에 파견하는 경우도 있다." },
    { name: "카하리셴", type: "정치 조직", base: "요정나무", leader: "「수호인」 에이라", content: "틸미리이를 에워싸는 요정나무를 관리하는 자들로, 다양한 요정나무를 중심으로 모여있는 거대한 집단. 디나시들을 중심으로, 다채다양하게 요정들로 구성되어 있다. 에린의 각지에 산재하는 요정나무를 관리하고, 나무를 이용하는 자들을 안내하고 있다." },
    { name: "샨노스 예단", type: "공연 단체", base: "스프라이트의 춤터", leader: "카린", content: "틸미리이에 존재하는 악단이나 시인·노래단을 포함하는 예능 단체. 도시 내에서 활동하고 있으며, 도시에 찾아온 인간이나 탐험자들을 대상으로 공연하는 경우가 있다. 악단으로서, 거리의 외부에서 행동하는 것도 없지는 않다." },
    { name: "그레믈린 도적단", type: "범죄 조직", base: "불명", leader: "잭래빗", content: "틸미리이에 사는 그레믈린이나 렙라콘으로 구성된 도적 부대. 정기적으로 마제라니카로부터 이상한 광석을 모으고 있다. 각 지방의 도중에 함정을 걸어 물건을 빼앗거나, 도중에 함정을 쳐서 인간들을 깊이 밀어넣는다." },
    { name: "펌프킨헤즈", type: "비밀 결사", base: "반시의 숲", leader: "불명", content: "틸미리이에 사는 잭·오·랜터른이나 고블린을 중심으로 하여 이루어진 비밀 결사. 숨어서 인간들을 놀라게 하려는 자들이 모이고 있다. 스스로의 계획이나 조직은 말하지 않는다. 리더는 좀처럼 사람들 앞에 나타나지 않는다." },
  ];
  return (
    <div>
      <SecTitle title="틸미리이의 조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 8px", borderRadius: 8, flexShrink: 0 }}>{o.type}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: 8 }}>본거지: {o.base} · 대표: {o.leader}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const people = [
    {
      name: "「대보」 로빈",
      nameJp: "「大股の」ロビン",
      role: "틸미리이 대리공",
      race: "요정 (디나시)",
      gender: "남",
      age: "405세",
      hair: "녹색",
      eyes: "비취색",
      skin: "백색",
      quote: "\"빠른 자네, 모처럼이니까, 지혜를 팔아 부탁을 들어주겠나\"",
      note: "틸미리이의 창설자이자 지배자인 요정왕 오베론에게 위임을 받아, 도시의 관리를 맡고 있는 요정인 「대보」의 로빈이라 불리는 것은, 오베론보다 한층 더 강하게 두드러지고, 머리의 회전이 빠르다고 알려져 있다. 수완은 좋지만 진지한 고민을 하기 싫어하고 있는 것처럼 보인다. 여유로운 태도로 담소를 즐기고 있다.",
    },
    {
      name: "「교훈하고 싶어하는」 아르비트",
      nameJp: "「教えたがり」アルヴィト",
      role: "전처녀기사단 단장",
      race: "요정 (벨나리)",
      gender: "여",
      age: "257세",
      hair: "금색",
      eyes: "청회색",
      skin: "백색",
      quote: "\"그런데, 이것에는 재미있는 일화가 있어서 말이야\"",
      note: "틸미리이를 수호하는 기사단의 단장. 새하얀 날개를 가진 발키리들을 솔선하여 이끌고 있다. 기사단을 진행하기를 바라면서, 거친 성격에서 단원의 인원 집중이 모이고 있다. 기사단의 우두머리를 맡으려고 하는 수고로운 직무이기도 하나, 기억에 남기고, 박식한 교양을 갖고 있다고도 알려져 있다. 지식을 남에게 가르치고 싶어하는 경향이 있다.",
    },
    {
      name: "「수호인」 에이라",
      nameJp: "「守り人」エイラ",
      role: "요정나무의 수호인",
      race: "요정 (디나시)",
      gender: "여",
      age: "136세",
      hair: "수색",
      eyes: "비취색",
      skin: "백색",
      quote: "\"이쪽의 가지는, 클란=베르행이 되겠습니다\"",
      note: "요정나무의 관리인 중 한 사람이다. 에린 안의 다양한 장소로 이동하는 요정나무를 관리하고, 이용하는 자들을 안내하고 있다. 에린의 지리에 밝고, 가는 길을 상냥하게 안내하는 모습으로 관광안내서처럼 이동 안내를 제공한다. 술을 마시게 되면 성격이 바뀌게 됩니다라고 대리공에게 꼰대처럼 끌려다니는 것도 있다.",
    },
    {
      name: "「구두쇠」 파트리지",
      nameJp: "「けちんぼ」パトリッジ",
      role: "틸미리이의 행상인",
      race: "요정 (렙라콘)",
      gender: "남",
      age: "360세",
      hair: "적갈색",
      eyes: "진한 차색",
      skin: "백색",
      quote: "\"나는, 그 황금빛 코인 5장으로 결론 짓도록 하지\"",
      note: "도구 가게를 운영하는 렙라콘이다. 요정이 만드는 불가사의한 도구들 수를 팔고 있다. 금화를 비롯하여 반짝이는 석재를 모으는 것이 좋아, 젊은 시절에는 도중의 거래지나 동굴에 들어가 물건을 빼앗고 했다고 한다. 하지만 중에는 진짜 물건의 정보가 오래되어 있어, 탐험자가 찾아오면 그 정보를 제공해 주는 경우도 있다.",
    },
    {
      name: "「느긋한 자」 그위·크리",
      nameJp: "「のんびりもの」グィー・クリ",
      role: "틸미리이에 미로처럼 들어온 여행자",
      race: "필볼",
      gender: "남",
      age: "102세",
      hair: "차색",
      eyes: "차색",
      skin: "백색",
      quote: "\"여기는 왠지 거주하기 편하네\"",
      note: "틸미리이에 살아 버린 필볼의 여유 여행자. 성력 960년대에 도착했다고 하는 것이니까, 이미 50년 가까이 거주하고 있다. 요정들에 둘러싸인 생활이 몸에 들어와 버린 것이지만, 도시를 나오는 것도 싫지는 않다. 인간과 비슷한 성격으로, 새로 찾아온 인간을 안내하는 것이 취미이다.",
    },
  ];
  return (
    <div>
      <Prose text={"틸미리이에서 활동하는 주요 인물들."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
        {people.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a2a" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", marginTop: 2 }}>{p.nameJp}</div>
              </div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "3px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 12 }}>{p.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#666", margin: "10px 0" }}>
              {[
                { label: "종족", value: p.race }, { label: "성별", value: p.gender },
                { label: "나이", value: p.age }, { label: "발색", value: p.hair },
                { label: "눈색", value: p.eyes }, { label: "피부", value: p.skin },
              ].map((attr, j) => (
                <span key={j} style={{ background: "#F7F4EE", border: "1px solid #E8E3DA", borderRadius: 6, padding: "2px 8px" }}>
                  <span style={{ color: "#aaa" }}>{attr.label}: </span>{attr.value}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "13px", fontStyle: "italic", color: ACCENT, margin: "8px 0", paddingLeft: 12, borderLeft: `2px solid ${ACCENT}50` }}>{p.quote}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TilmiriyPage() {
  const [activeId, setActiveId] = useState("overview");
  const [showNav, setShowNav] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const check = () => setMob(window.innerWidth <= 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    if (mob) setShowNav(false);
  }, [activeId, mob]);

  const activeNav = navItems.find(n => n.id === activeId) ?? navItems[0];

  const renderContent = () => {
    switch (activeId) {
      case "overview": return <OverviewSection />;
      case "city":     return <CitySection />;
      case "orgs":     return <OrgsSection />;
      case "people":   return <PeopleSection />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE", color: "#2a2a2a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
      {mob && (
        <button onClick={() => setShowNav(!showNav)} style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: "13px", cursor: "pointer" }}>
          {showNav ? "✕" : "☰"}
        </button>
      )}
      {(!mob || showNav) && (
        <nav style={{ width: mob ? "100vw" : 220, flexShrink: 0, background: SIDEBAR_BG, display: "flex", flexDirection: "column", padding: "24px 0", overflowY: "auto", position: mob ? "fixed" : "relative", top: 0, left: 0, height: "100vh", zIndex: 999 }}>
          <a href="/" style={{ display: "block", padding: "0 20px 20px", textDecoration: "none" }}>
            <div style={{ fontSize: "10px", color: "#888", letterSpacing: "0.12em", marginBottom: 4 }}>← 이상동몽 위키</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Noto Serif KR', serif" }}>틸미리이</div>
            <div style={{ fontSize: "10px", color: "#aaa", marginTop: 2 }}>ティルミリィ — 원환의 도시</div>
          </a>
          <div style={{ height: 1, background: "#333", margin: "0 16px 16px" }} />
          {navItems.map(n => (
            <button key={n.id} onClick={() => setActiveId(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 20px", background: activeId === n.id ? `${ACCENT}30` : "transparent", border: "none", borderLeft: activeId === n.id ? `3px solid ${ACCENT}` : "3px solid transparent", color: activeId === n.id ? "#fff" : "#aaa", fontSize: "13px", fontWeight: activeId === n.id ? 600 : 400, cursor: "pointer", textAlign: "left" }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </nav>
      )}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "40px 48px", maxWidth: 860 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.12em", marginBottom: 6 }}>{activeNav.icon} {activeNav.label}</div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>틸미리이</h1>
          <div style={{ fontSize: "12px", color: "#aaa", marginTop: 4 }}>ティルミリィ — 에린딜 황야 속 요정 도시</div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 16, borderRadius: 1 }} />
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
