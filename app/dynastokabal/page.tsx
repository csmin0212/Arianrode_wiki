'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#7A2A6B";
const ACCENT_LIGHT = "#F0D0EC";
const SIDEBAR_BG = "#180814";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "결사 개요",         icon: "🕵️" },
  { id: "structure", label: "조직 구성",          icon: "🗂️" },
  { id: "kaijin",    label: "괴인과 전투원",      icon: "⚗️" },
  { id: "activity",  label: "활동 방침",          icon: "📋" },
  { id: "people",    label: "결사의 인물들",      icon: "👥" },
];

function Prose({ text }: { text: string }) {
  return (
    <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a" }}>
      {text.split("\n\n").map((p, i) => <p key={i} style={{ marginBottom: 12 }}>{p}</p>)}
    </div>
  );
}
function SecTitle({ title }: { title: string }) {
  return (
    <h3 style={{
      fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "15px", fontWeight: 600,
      letterSpacing: "0.1em", borderBottom: `2px solid ${ACCENT}`, paddingBottom: 6,
      marginBottom: 16, marginTop: 28, color: ACCENT,
    }}>{title}</h3>
  );
}

function OverviewSection() {
  return (
    <div>
      <Prose text={"\"네오·다이나스토카발\"은 에린딜 서방에서 활동하는 반신전 비밀 결사이다. 결사의 공식 목적은 신전 조직의 악폐와 부패를 세상에 폭로하고, 그 개혁을 촉구하는 것이라고 알려져 있다."} />
      <Prose text={"그러나 그 실태는 불투명한 부분이 많다. 조직 지도자인 \"대수령\"의 신원은 결사 내부에서도 상층부를 제외하고는 아무도 모른다. 결사는 피라미드형 비밀 조직 구조를 취하며, 각 계층 사이에는 정보 차단이 철저하게 이루어진다."} />
      <Prose text={"이름의 \"다이나스토카발\"은 에린의 역사 속에서 신전 권력에 대항했다고 전해지는 고대 결사의 이름을 딴 것이다. \"네오\"라는 접두사는 이것이 그 정신적 계보를 잇는 새로운 조직임을 스스로 표방하는 것이다."} />
      <div style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}40`, borderRadius: 10, padding: "16px 18px", marginTop: 20 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>기본 정보</div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 16px", fontSize: "13px" }}>
          {[
            ["분류",   "비밀 결사 (반신전)"],
            ["공식 목적", "신전의 악폐 폭로 및 개혁 촉구"],
            ["진짜 목적", "세계의 숙청 장치(滅清装置) 파괴"],
            ["지도자", "「대수령」 (구 다이나스토카발 수령과 동일인)"],
            ["조직",   "대수령 → 대간부 3명 → 3대 지부"],
            ["특기",   "괴인(怪人) 운용, 정보 공작, 대중 선동"],
          ].map(([k, v], i) => (
            <>
              <span key={`k${i}`} style={{ color: "#5A1A50", fontWeight: 600 }}>{k}</span>
              <span key={`v${i}`} style={{ color: "#3a2a38" }}>{v}</span>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function StructureSection() {
  const levels = [
    {
      tier: "최상층",
      name: "대수령 (大首領)",
      icon: "👁️",
      bg: `${ACCENT}18`,
      border: ACCENT,
      content: "결사의 최고 지도자. 그 신원은 대간부 이상의 극히 일부만이 알고 있으며, 일반 구성원에게는 완전히 베일에 싸여 있다. 모든 방침과 작전의 최종 결정권을 가진다.",
    },
    {
      tier: "제2층",
      name: "3대 간부",
      icon: "🎭",
      bg: "#F5D0F0",
      border: "#A04090",
      content: "대수령 직속의 세 명의 최고 간부. 각각 \"괴인박사\", \"이재장군\", \"정보대사\"라 불린다. 괴인박사는 연금술로 괴인을 만드는 것을 책임지며, 이재장군은 군사 작전을 지휘하고, 정보대사는 첩보와 공작을 총괄한다.",
    },
    {
      tier: "제3층",
      name: "3대 지부",
      icon: "🏴",
      bg: "#EDD0F0",
      border: "#804880",
      content: "결사의 활동 거점은 \"서방 지부\", \"중앙 지부\", \"극동 지부\"의 3개로 나뉜다. 각 지부에는 지부장이 있으며, 그 아래에 괴인, 전투원, 연락원 등 다수의 구성원이 소속된다.",
    },
    {
      tier: "최하층",
      name: "일반 구성원",
      icon: "🥷",
      bg: "#E8D8F0",
      border: "#604860",
      content: "괴인, 전투원, 공작원, 노점 운영원 등 다양한 형태로 결사의 활동을 지원하는 인원. 대부분은 신전에 불만을 가진 자들이거나, 지부 단위에서 스카우트된 자들이다.",
    },
  ];

  return (
    <div>
      <Prose text={"네오·다이나스토카발은 철저한 피라미드형 비밀 조직 구조를 취한다. 각 계층 간의 정보는 엄격히 차단되어 있어, 아래 계층의 구성원은 위 계층의 실상을 거의 알 수 없다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {levels.map((l, i) => (
          <div key={i} style={{ background: l.bg, border: `1px solid ${l.border}40`, borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${l.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: "16px" }}>{l.icon}</span>
              <span style={{ fontSize: "11px", background: `${l.border}20`, color: l.border, padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>{l.tier}</span>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{l.name}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#444" }}>{l.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KaijinSection() {
  return (
    <div>
      <SecTitle title="괴인 (怪人)" />
      <Prose text={"\"괴인\"은 네오·다이나스토카발의 핵심 전력이다. 동물이나 식물의 특성을 인간에게 이식하는 연금술적 시술을 통해 만들어진 인공적인 존재이다."} />
      <Prose text={"괴인은 원칙적으로 인간을 기반으로 하며, 고도로 발달한 연금술 기술 없이는 만들 수 없다. 그들은 강화된 신체 능력이나 특수한 감각, 혹은 독특한 전투 기술을 지니며, 결사의 각종 임무에 운용된다. 그러나 괴인화 시술은 당사자에게도 심대한 부담을 주며, 시술에 실패하거나 부작용이 생기는 경우도 있다."} />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}`, marginTop: 8 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>괴인의 분류 (예시)</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["조류 계열 (비행 능력)", "충류 계열 (독, 경갑)", "어류 계열 (수중 활동)", "수목 계열 (재생, 독소)", "수류 계열 (청각, 후각 강화)"].map((t, i) => (
            <span key={i} style={{ fontSize: "12px", background: ACCENT_LIGHT, color: ACCENT, padding: "4px 10px", borderRadius: 12, border: `1px solid ${ACCENT}30` }}>{t}</span>
          ))}
        </div>
      </div>

      <SecTitle title="전투원" />
      <Prose text={"괴인 외에도, 결사는 「전투원」이라 불리는 일반 전투 요원을 보유하고 있다. 전투원은 연금술적 개조를 받지 않은 보통의 인간이지만, 조직으로부터 훈련과 무장을 제공받는다.\n\n전투원은 결사 각지의 지부에 소속되며, 정보 수집, 팸플릿 배포, 노점 운영, 필요시 전투 임무 등 폭넓은 역할을 담당한다."} />
    </div>
  );
}

function ActivitySection() {
  const activities = [
    {
      name: "인재 모집",
      icon: "🤝",
      content: "결사는 신전 조직이나 현체제에 불만을 가진 인재를 적극적으로 찾아 스카우트한다. 특히 연금술사, 정보원, 전투 기술을 보유한 자가 중시된다. 가입 후에는 단계적으로 더 깊은 비밀에 접근 가능해진다.",
    },
    {
      name: "신전 비방 팸플릿 배포",
      icon: "📜",
      content: "신전 조직의 부패나 부정 행위를 고발하는 내용이 담긴 팸플릿을 각지에서 인쇄하여 배포한다. 일반 민중을 대상으로 한 여론 공작의 일환이며, 신전에 대한 불신감을 조장하는 것이 목적이다.",
    },
    {
      name: "정보 공작",
      icon: "🔍",
      content: "정보대사가 지휘하는 첩보 활동. 각지 신전 내부에 공작원을 잠입시키거나, 신전 관계자를 포섭하여 내부 정보를 수집한다. 수집한 정보는 팸플릿 자료나 협박 수단으로 활용된다.",
    },
    {
      name: "노점 운영",
      icon: "🏪",
      content: "결사의 일부 구성원은 각지의 시장이나 거리에서 노점을 운영한다. 표면상 평범한 상행위로 위장하면서 연락망 유지, 정보 수집, 인재 발굴 등을 수행하는 거점 역할을 한다.",
    },
  ];

  return (
    <div>
      <Prose text={"네오·다이나스토카발은 무력 충돌을 최소화하면서도 신전 조직에 타격을 주기 위해 다양한 간접적 수단을 조합하여 운용한다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {activities.map((a, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>
              {a.icon} {a.name}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{a.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const characters = [
    {
      name: "대수령",
      role: "네오·다이나스토카발 대수령",
      race: "휴린",
      gender: "남",
      age: "불명",
      hair: "적발",
      eyes: "불명",
      skin: "백색",
      quote: "\"너의 활약에 기대하고 있다. 가거라!\"",
      note: "결사의 최고 지도자. 그 신원은 결사 내부의 극히 일부만이 안다. 구(舊) 다이나스토카발의 대수령과 동일 인물이며, 일찍이 신전에 봉사했던 휴린 남성이라고도 전해진다. 자신의 모습을 드러낼 때도 정체를 알기 어렵게 하며, 소문으로만 알려진 인물이다.",
    },
    {
      name: "도크토르·셉터",
      role: "대간부 \"괴인박사\"",
      race: "휴린",
      gender: "남",
      age: "불명",
      hair: "백발",
      eyes: "흑색",
      skin: "백색",
      quote: "\"ㅋㅋ, 역시 이 몸이야. 이런 괴인을 만들다니!\"",
      note: "네오·다이나스토카발에 속하는 노련한 연금술사. 거물급 간부의 위에 서 있는 3대 간부 중 한 명. 구 시대부터 조직에 몸담아 온 중진으로, 딸 프로이라인·셉터를 조직에 참여시킨다. 극도로 뛰어난 연금술 실력으로 특수한 전투원인 \"괴인\"의 개발에 깊이 관여하며, 현재도 본부에서 괴인 제작에 전념하고 있다.",
    },
    {
      name: "프로이라인·셉터",
      role: "네오·다이나스토카발 간부",
      race: "휴린",
      gender: "여",
      age: "17세",
      hair: "금발",
      eyes: "흑색",
      skin: "백색",
      quote: "\"가거라, 나의 새로운 괴인이여!\"",
      note: "원래 네오·다이나스토카발 극동 지부장. 配下로부터는 친근하게 \"아가씨(お嬢)\"라 불리며, 존경과 두려움을 한 몸에 받는다. 천재적 발명가로 알려지며, 현재는 본부로 옮겨 아버지 도크토르·셉터와 함께 괴인 제작에 종사하고 있다.",
    },
    {
      name: "마구로오오카미",
      role: "네오·다이나스토카발 괴인",
      race: "인조생물",
      gender: "남",
      age: "불명",
      hair: "다갈색",
      eyes: "다갈색",
      skin: "황색",
      quote: "\"멈춰 서는 건 저한테는 못 하겠어요\"",
      note: "파우스타 박사(도크토르·셉터)에 의해 만들어진 괴인. 본체는 참다랑어(마구로)와 늑대(오오카미)가 합쳐진 존재다. 몸에 붙어 떨어지지 않고 늘 뛰어다니고 싶어하는 습성이 있다. 성격은 순수하고 낙천적이며, 연락 임무도 맡고 있다.",
    },
    {
      name: "전투원 제로",
      role: "네오·다이나스토카발 전투원 리더",
      race: "인조생물 (원래 인간)",
      gender: "남",
      age: "불명",
      hair: "불명",
      eyes: "흑색",
      skin: "불명",
      quote: "\"우리는 명령에 따를 뿐이다\"",
      note: "네오·다이나스토카발의 전투 부대를 이루는 검은 마스크의 전투원들. 전투원을 각 지부의 임무에 파견하고 지시하는 것이 주 임무다. 가끔씩 직접 전선에 나오기도 한다. 원래는 인간이었으며, 모든 전투원의 정체도 모호하다. 본인 자신도 기억의 대부분이 사라져 있다.",
    },
  ];

  return (
    <div>
      <Prose text={"다이나스토카발 및 네오·다이나스토카발과 관련된 주요 인물들을 소개한다. PC의 의뢰인이나 협력자, 혹은 적대자로 등장할 수 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 6 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#888", marginBottom: 6 }}>
              <span>종족: {c.race}</span>
              <span>성별: {c.gender}</span>
              <span>나이: {c.age}</span>
              {c.hair !== "불명" && <span>머리: {c.hair}</span>}
            </div>
            {c.quote && <div style={{ fontSize: "12px", fontStyle: "italic", color: ACCENT, marginBottom: 8, borderLeft: `2px solid ${ACCENT}50`, paddingLeft: 8 }}>{c.quote}</div>}
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DynastokabalPage() {
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
      case "overview":  return <OverviewSection />;
      case "structure": return <StructureSection />;
      case "kaijin":    return <KaijinSection />;
      case "activity":  return <ActivitySection />;
      case "people":    return <PeopleSection />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE", color: "#2a2a2a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
      {mob && (
        <button onClick={() => setShowNav(!showNav)} style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: "13px", fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          {showNav ? "✕" : "☰"}
        </button>
      )}
      <nav style={{
        width: 248, minWidth: 248, background: SIDEBAR_BG, color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#2A0820", marginBottom: 6 }}>반신전 비밀 결사</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>네오·<br />다이나스토카발</div>
        </div>
        <div style={{ padding: "10px 0", flex: 1, overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveId(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 20px",
              border: "none", cursor: "pointer", textAlign: "left", fontSize: "13px",
              fontWeight: activeId === item.id ? 500 : 400,
              background: activeId === item.id ? "rgba(255,255,255,0.07)" : "transparent",
              color: activeId === item.id ? "#E8E2D4" : "#A09888",
              borderLeft: activeId === item.id ? `3px solid ${ACCENT}` : "3px solid transparent",
              transition: "all 0.15s ease", fontFamily: "'Noto Sans KR', sans-serif",
            }}>
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "11px", color: "#3A2838" }}>
          <a href="/" style={{ color: "#6A4868", textDecoration: "none" }}>← 이상동몽 위키</a>
        </div>
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "48px 48px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#9A5A90", marginBottom: 10 }}>
              NEO DYNASTOKABAL — SECRET SOCIETY
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#180814", marginBottom: 8, letterSpacing: "0.04em" }}>
              네오·다이나스토카발
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#2a1a28", marginBottom: 4 }}>
              {activeNav.icon} {activeNav.label}
            </h2>
            <div style={{ height: 1, background: "#E8E3DA", marginBottom: 28 }} />
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
