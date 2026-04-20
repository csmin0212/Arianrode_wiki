'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8B2D2D";
const ACCENT_LIGHT = "#F5D5D5";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "신성 반즈탄 제국",  icon: "⚔️" },
  { id: "history",   label: "역사",              icon: "📜" },
  { id: "geography", label: "지세와 산업",        icon: "🏝️" },
  { id: "politics",  label: "정치와 군사",        icon: "⚜️" },
  { id: "relations", label: "타국과의 관계",      icon: "🤝" },
];

const capitalData = {
  stats: [
    { label: "국가 형태", value: "제국" },
    { label: "정치 체제", value: "제정" },
    { label: "현재 황제", value: "제단" },
    { label: "거점",       value: "피지아스 섬" },
    { label: "건국",       value: "성력 719년 (반즈탄 제국)" },
    { label: "개칭",       value: "성력 999년 (신성 반즈탄 제국)" },
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
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>신성 반즈탄 제국 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {capitalData.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <Prose text={"서쪽 바다의 피지아스 섬을 거점으로 하는 제국. 성력 719년에 반즈탄 제국으로 건국되어, 999년에 신성 반즈탄 제국으로 개칭했다.\n\n동방 진출을 노리며 에루란 왕국 등과 긴장 관계에 있다. 4대국의 세력 균형 아래 상호 견제 상태에 있으나, 최근 다시 개전을 준비하고 있다는 소문이 돌고 있어 긴장이 고조되고 있다."} />
    </div>
  );
}

function HistorySection() {
  const events = [
    { year: "성력 719년", content: "반즈탄 제국 건국. 피지아스 섬을 거점으로 세력을 확대하기 시작한다." },
    { year: "성력 799년", content: "반즈탄—히유린 일족, 마물 아스트로테에 의해 침략을 당한다." },
    { year: "성력 949년", content: '"유적의 거리" 두르가르, 반즈탄 제국에 복종.' },
    { year: "성력 999년", content: '반즈탄 제국, 신성 반즈탄 제국으로 개칭. 동방으로의 침공 시작.' },
    { year: "성력 1002년", content: '파리스 동맹 결성으로 동방 침공에 제동이 걸린다. 4대국 체제 확립.' },
    { year: "성력 1006년", content: '"성도" 디아스론드의 "비밀 결사"가 다이나스타파르에 의한 "장폐의 도구" 탐색을 활성화함.' },
    { year: "성력 1007년", content: '황제 제단에 대한 암살 미수 사건 발생.' },
    { year: "성력 1009년", content: '파리스 동맹 그랑펠덴 왕국에 마족 대침공이 발생. 이를 계기로 제국이 다시 개전을 준비한다는 소문이 돈다.' },
  ];
  return (
    <div>
      <Prose text={"반즈탄 제국은 에린디르 서방의 서쪽 바다에 있는 피지아스 섬을 근거지로 하여 성립된 섬나라 제국이다. 건국 이래 에린디르 대륙 동방으로의 진출을 목표로 세력 확장을 거듭해 왔다."} />
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
      <SecTitle title="피지아스 섬" />
      <Prose text={"신성 반즈탄 제국의 본거지인 피지아스 섬은 에린디르 대륙에서 서쪽 바다를 건넌 곳에 위치하는 큰 섬이다. 섬이라는 지형적 특성 덕분에 제국은 해군력을 발전시켜, 서방 해역의 제해권을 장악하고 있다.\n\n기후는 해양성으로 비교적 온화하며, 서쪽에서 부는 바람으로 인해 풍부한 수자원을 갖추고 있다. 섬 내부에는 농경지와 목축지가 넓게 펼쳐져 있어 자급자족이 가능하다."} />
      <SecTitle title="산업과 경제" />
      <Prose text={"피지아스 섬은 해상 무역로의 요충에 위치하고 있어 무역이 활발하다. 제국은 해상 무역을 통해 다양한 재화를 수입하고 있으며, 특히 광물 자원이나 군수물자의 조달에 힘을 쏟고 있다.\n\n대륙 동방에도 일부 영토를 보유하고 있으며, 이 지역에서는 농업과 광업이 이루어진다."} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="정치 체제" />
      <Prose text={"신성 반즈탄 제국은 황제가 정점에 서는 제정 국가이다. 현 황제 제단이 통치하고 있으며, 신성 제국의 이름이 나타내듯 종교와 정치가 강하게 결합된 체제를 갖추고 있다.\n\n황제의 권위는 신에 의해 수여된 것이라는 이념이 지배적이며, 이를 토대로 한 강력한 중앙집권 체제를 형성하고 있다."} />
      <SecTitle title="군사" />
      <Prose text={"신성 반즈탄 제국은 에린디르 서방에서도 손꼽히는 군사 강국이다. 해군을 비롯한 강대한 군사력을 보유하고 있으며, 동방 진출을 위한 원정 능력을 갖추고 있다.\n\n육군도 강력하며, 과거 동방 침공 시에는 파리스 동맹국들을 크게 위협했다. 현재는 재개전을 준비하고 있다는 정보가 있어, 파리스 동맹을 비롯한 주변국들이 경계를 강화하고 있다."} />
    </div>
  );
}

function RelationsSection() {
  const relations = [
    { name: "에루란 왕국",   content: "에루란 왕국과는 동방 진출을 둘러싸고 전통적으로 긴장 관계에 있다. 에루란 왕국이 에린디르 서방의 중심 세력인 만큼, 제국의 동방 진출을 저지하는 가장 큰 장벽이 되고 있다." },
    { name: "파리스 동맹",   content: "파리스 동맹은 제국의 동방 침공에 대항하기 위해 결성된 연합체다. 제국에게 있어 파리스 동맹은 동방 진출의 주된 장애물이며, 동맹의 약체화를 항상 노리고 있다. 최근 마족의 대침공으로 동맹이 피해를 입은 것을 계기로 재개전을 준비한다는 소문도 있다." },
    { name: "키르디아 공화국", content: "무한의 사막을 통한 우회로 확보 등을 놓고 이해관계가 얽혀 있다. 현재는 표면상 불간섭 원칙을 유지하고 있다." },
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

export default function VanstarPage() {
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
        width: 248, minWidth: 248, background: "#1E1414", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#806070", marginBottom: 6 }}>ERINDIL WEST · EMPIRE</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>신성 반즈탄 제국</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#504040", lineHeight: 1.6 }}>
          <a href="/erindil-west" style={{ color: "#806070", textDecoration: "none", fontSize: "11px" }}>← 에린디르 서방으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>ERINDIL WEST · HOLY VANSTAR EMPIRE</div>
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
