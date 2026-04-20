'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A5F9E";
const ACCENT_LIGHT = "#D4E4F7";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "에를랑 왕국",      icon: "👑" },
  { id: "history",   label: "역사",             icon: "📜" },
  { id: "geography", label: "지세와 산업",       icon: "🏔️" },
  { id: "politics",  label: "정치와 군사",       icon: "⚜️" },
  { id: "relations", label: "타국과의 관계",     icon: "🤝" },
];

const capitalData = {
  stats: [
    { label: "국가 형태", value: "왕국" },
    { label: "정치 체제", value: "왕정" },
    { label: "현재 국왕", value: "에루트 13세" },
    { label: "왕도",       value: "프로글레스" },
    { label: "건국",       value: "성력 300년경" },
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
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>에를랑 왕국 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {capitalData.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <Prose text={"에린디르 서방에서 가장 오래된 역사를 자랑하는 왕국. 성력 300년경에 건국된 것으로 알려져 있으며, 오랫동안 에린디르 서방의 정치적 중심 역할을 담당해 왔다.\n\n성력 1002년 파리스 동맹 성립 이후 4대국의 세력 균형이 유지되고 있으며, 전통과 권위를 상징하는 나라로 자리잡고 있다."} />
    </div>
  );
}

function HistorySection() {
  const events = [
    { year: "성력 300년경", content: "에를랑 왕국 건국. 에린디르 서방 최고(最古)의 왕국으로 알려진다." },
    { year: "성력 370년경", content: "에를랑 왕국과 하트파스 왕국의 전쟁. '사자공자전쟁'이라 불린다." },
    { year: "성력 500년경", content: "에를랑 왕국의 중원 출병. 파리스 왕국과의 전쟁(파리스 전쟁)이 발발하였으나 에를랑이 승리하였다." },
    { year: "성력 600년경", content: "에를랑 왕국과 '돌의 거리' 바르데르와의 전쟁." },
    { year: "성력 700년경", content: "에를랑 왕국의 각 지역이 자립하기 시작해 왕국의 판도가 축소된다." },
    { year: "성력 1002년", content: "파리스 동맹 결성. 신성 번스터 제국을 견제하는 4대국 체제가 확립된다." },
    { year: "성력 1004년", content: "국왕 여왕 에안나 및 국왕 에루트 13세에 대한 암살 미수 사건 발생." },
    { year: "성력 1010년", content: "왕도 프로글레스에서 '전설의 스파이' 프렛차가 격퇴됐다는 소문이 돈다." },
    { year: "성력 1012년", content: "왕도 프로글레스에서 마족 그시온에 의한 크리처 사건이 저지된다." },
  ];
  return (
    <div>
      <Prose text={"에를랑 왕국은 에린디르 서방에서 가장 오래된 역사를 가진 왕국이다. 성립 이후 에린디르 서방의 정치적 중심으로서 수백 년에 걸쳐 그 영향력을 유지해 왔다."} />
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
      <Prose text={"에를랑 왕국은 에린디르 대륙 서방의 중부에 위치한다. 넓은 평원과 산지를 포함하는 광대한 영토를 가지며, 왕도 프로글레스는 교통의 요지에 세워졌다.\n\n기후는 온화하며 농업에 적합하다. 곡물과 포도주 등의 농산물 생산이 왕성하고, 지하에서는 철광석과 각종 광물도 채굴된다. 또한 에린디르 서방의 내륙 무역로가 왕도를 통과하고 있어 상업도 발달해 있다."} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="정치 체제" />
      <Prose text={"에를랑 왕국은 왕정 국가로, 에를랑 왕가가 대대로 통치해 왔다. 현 국왕은 에루트 13세이며, 왕비 에안나와 함께 왕국을 다스리고 있다.\n\n귀족 의회가 존재하여 국정에 참여하지만, 최종 결정권은 국왕이 쥐고 있다. 오래된 왕국인 만큼 귀족들의 정치적 영향력도 상당하다."} />
      <SecTitle title="군사" />
      <Prose text={"에를랑 왕국의 군사력은 에린디르 서방에서도 손꼽히는 수준이다. 왕도 프로글레스를 중심으로 한 왕국 기사단이 편성되어 있으며, 유사시에는 각 지방의 귀족군도 동원된다.\n\n오래된 전통과 역사에서 비롯된 강고한 군사 기반을 보유하고 있으나, 근래에는 마족의 활성화에 대응하기 위해 방위력 강화에 주력하고 있다."} />
    </div>
  );
}

function RelationsSection() {
  const relations = [
    { name: "신성 번스터 제국", content: "동방 진출을 노리는 번스터 제국과는 전통적으로 긴장 관계에 있다. 4대국 체제 아래 상호 견제 상태이나, 번스터 제국이 다시 개전을 준비하고 있다는 소문이 돌아 경계를 강화하고 있다." },
    { name: "파리스 동맹",     content: "파리스 동맹에는 직접 가입하지 않지만 우호 관계를 유지하고 있다. 동맹과의 교역과 외교를 통해 번스터 제국을 함께 견제하는 구도를 형성하고 있다." },
    { name: "키르디아 공화국", content: "무한의 사막을 사이에 두고 있어 직접 충돌은 적지만, 교역로의 이해관계가 얽혀 있다. 기본적으로 불간섭 원칙을 유지하고 있다." },
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

export default function ErlanPage() {
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
        width: 248, minWidth: 248, background: "#141C24", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#607080", marginBottom: 6 }}>ERINDIL WEST · KINGDOM</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>에를랑 왕국</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#4a5060", lineHeight: 1.6 }}>
          <a href="/erindil-west" style={{ color: "#607080", textDecoration: "none", fontSize: "11px" }}>← 에린디르 서방으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>ERINDIL WEST · KINGDOM OF ERLAN</div>
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
