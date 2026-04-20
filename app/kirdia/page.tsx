'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8B6914";
const ACCENT_LIGHT = "#F5E8C8";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "키르디아 공화국",  icon: "🏜️" },
  { id: "history",   label: "역사",             icon: "📜" },
  { id: "geography", label: "지세와 산업",       icon: "🌵" },
  { id: "politics",  label: "정치와 군사",       icon: "⚜️" },
  { id: "relations", label: "타국과의 관계",     icon: "🤝" },
];

const capitalData = {
  stats: [
    { label: "국가 형태", value: "공화국" },
    { label: "정치 체제", value: "공화제" },
    { label: "위치",       value: '"무한의 사막"' },
    { label: "건국",       value: "성력 996년" },
    { label: "주요 언어", value: "공통어" },
  ],
};

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
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>키르디아 공화국 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {capitalData.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <Prose text={'광대한 "무한의 사막"에 건국된 공화국. 성력 996년에 건국됐다.\n\n사막을 기반으로 독자적인 문화와 정치 체계를 발전시켜, 4대국의 균형에서 독특한 위치를 차지하고 있다. 4국 중 가장 신생 국가이지만, 사막 지형을 활용한 독자 노선으로 영향력을 키워왔다.'} />
    </div>
  );
}

function HistorySection() {
  const events = [
    { year: "성력 996년", content: '키르디아 공화국 건국. 같은 해 "이중의 거리" 다브를 건설.' },
    { year: "성력 1002년", content: "파리스 동맹 결성으로 4대국 체제가 확립. 공화국도 이 균형의 일각을 담당하게 된다." },
  ];
  return (
    <div>
      <Prose text={'키르디아 공화국은 성력 996년에 건국된 비교적 신생 국가이다. 건국 장소는 "무한의 사막"으로 불리는 광대한 사막 지대이며, 이 특수한 환경에서 독자적인 문명을 발전시켜 왔다.'} />
      <div style={{ position: "relative", marginTop: 20 }}>
        <div style={{ position: "absolute", left: 100, top: 0, bottom: 0, width: 2, background: `${ACCENT}25` }} />
        {events.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 0, marginBottom: 14, position: "relative" }}>
            <div style={{ width: 100, flexShrink: 0, textAlign: "right", paddingRight: 16, paddingTop: 5 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, fontFamily: "monospace", whiteSpace: "nowrap" }}>{e.year}</span>
            </div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, flexShrink: 0, marginTop: 5, marginLeft: -5, marginRight: 10, border: "2px solid #F7F4EE", position: "relative", zIndex: 1 }} />
            <div style={{ flex: 1, background: "#fff", border: "1px solid #E8E3DA", borderRadius: 6, padding: "8px 14px" }}>
              <div style={{ fontSize: "13px", color: "#3a3a3a", lineHeight: 1.7 }}>{e.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeographySection() {
  return (
    <div>
      <SecTitle title='"무한의 사막"' />
      <Prose text={'키르디아 공화국이 위치하는 "무한의 사막"은 에린디르 서방과 동방 사이를 가르는 광대한 사막 지대이다. 이름 그대로 끝이 보이지 않을 만큼 넓어, 이 사막을 횡단하는 것은 상당한 준비와 경험을 필요로 한다.\n\n한낮의 극심한 더위와 밤의 혹독한 추위 사이에서 독자적인 생존 방식을 발전시켜 온 공화국 사람들은 사막의 지식에 있어 타의 추종을 불허한다.'} />
      <SecTitle title="이중의 거리 다브를" />
      <Prose text={'건국과 함께 건설된 "이중의 거리" 다브를은 키르디아 공화국의 중요 도시 중 하나이다. "이중의 거리"라는 별명은 도시가 두 구획으로 나뉘어 있어 각기 다른 문화권이 공존하는 독특한 구조에서 유래한다.'} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="정치 체제" />
      <Prose text={"키르디아 공화국은 공화제를 채택한 에린디르 서방의 유일한 주요 국가이다. 왕이나 황제가 아닌 선출직 대표자들이 국정을 운영하며, 이 독특한 정치 구조가 공화국에 특별한 정체성을 부여하고 있다.\n\n공화제라는 체제는 4대국 중 유일하며, 이것이 다른 국가들과의 외교에서 독특한 입장을 만들어내기도 한다."} />
      <SecTitle title="군사" />
      <Prose text={"사막을 기반으로 한 키르디아 공화국의 군사 전략은 독특하다. 사막 지형을 최대한 활용한 방어 전술을 발전시켜, 외세의 침략을 막아내는 데 특화되어 있다.\n\n직접적인 군사 충돌보다는 상업적 교류나 외교를 통한 세력 유지를 선호하는 경향이 있다."} />
    </div>
  );
}

function RelationsSection() {
  const relations = [
    { name: "에를랑 왕국",       content: "무한의 사막을 사이에 두고 있어 직접 접경하지 않는다. 기본적으로 중립적인 관계를 유지하며, 교역로를 통한 경제적 교류가 주를 이룬다." },
    { name: "신성 번스터 제국", content: "제국의 동방 진출 루트 상에 위치하기 때문에 미묘한 관계에 있다. 사막이 천연 방벽 역할을 하므로 직접 충돌보다는 외교적 교섭이 중심이다." },
    { name: "파리스 동맹",       content: "번스터 제국에 대항하는 공통 이해관계를 가지고 있어 우호적인 관계에 있다. 공화국의 독자 노선 덕분에 동맹에 직접 가입하지 않으면서도 협력 관계를 유지한다." },
  ];
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {relations.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 6 }}>{r.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{r.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- 메인 컴포넌트 ----

export default function KirdiaPage() {
  const [activeId, setActiveId] = useState("overview");
  const [showNav, setShowNav] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const check = () => setMob(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
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
      case "history":   return <HistorySection />;
      case "geography": return <GeographySection />;
      case "politics":  return <PoliticsSection />;
      case "relations": return <RelationsSection />;
      default:          return null;
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
        width: 248, minWidth: 248, background: "#1C1A10", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#807050", marginBottom: 6 }}>ERINDIL WEST · REPUBLIC</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>키르디아 공화국</div>
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
              <span style={{ fontSize: "15px", width: 22, textAlign: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#504830", lineHeight: 1.6 }}>
          <a href="/erindil-west" style={{ color: "#807050", textDecoration: "none", fontSize: "11px" }}>← 에린디르 서방으로</a>
          <div style={{ marginTop: 6 }}>異床同夢 · 이상동몽<br />아리안로드 2E 캠페인</div>
        </div>
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT_LIGHT}80 100%)`,
          borderBottom: `3px solid ${ACCENT}25`,
          padding: mob ? "60px 20px 28px" : "40px 48px 36px",
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>ERINDIL WEST · REPUBLIC OF KIRDIA</div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8, letterSpacing: "0.02em" }}>
              {activeNav.icon} {activeNav.label}
            </h1>
            <div style={{ width: 40, height: 2, background: ACCENT, borderRadius: 1, opacity: 0.5 }} />
          </div>
        </div>
        <div style={{ maxWidth: 760, padding: mob ? "24px 20px 60px" : "32px 48px 80px" }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
