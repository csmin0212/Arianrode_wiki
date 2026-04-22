'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A6B5A";
const ACCENT_LIGHT = "#C8EDE6";
const SIDEBAR_BG = "#081A14";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "숲 개요",            icon: "🌲" },
  { id: "spiarzon",  label: "스피아르존",           icon: "🏘️" },
  { id: "places",    label: "숲 속의 장소들",      icon: "🗺️" },
  { id: "people",    label: "숲의 인물들",         icon: "👥" },
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
  const stats = [
    { label: "위치",   value: "에린딜 북부, 파리스 동맹 북부, 코나카타 산맥·힐레디온 산맥 사이" },
    { label: "형태",   value: "엘다난 자치령 (스피아르 엘다난의 거주지)" },
    { label: "지도자", value: "숲의 여왕 에아르핀" },
    { label: "특징",   value: "연중 안개가 자욱하여 외부인이 미로 속에서 헤맨다" },
    { label: "도시",   value: "스피아르존 (숲 유일의 도시)" },
    { label: "위협",   value: "북쪽 마군(魔軍)의 동향을 항상 감시 중" },
  ];
  return (
    <div>
      <Prose text={"\"안개의 숲\"은 에린딜 북부, 파리스 동맹 북쪽에 펼쳐지는 광대한 숲이다. 코나카타 산맥과 힐레디온 산맥 사이에 위치하며, 그 이름대로 연중 짙은 안개가 숲 전체를 뒤덮고 있어 외부인은 길을 잃기 쉽다."} />
      <Prose text={"이 숲은 스피아르 엘다난이라 불리는 엘다난 씨족의 거주지이다. 스피아르 엘다난은 안개의 숲 깊은 곳에서 대대로 살아온 씨족으로, 수백 년에 걸쳐 이 숲을 지켜왔다. 그들이 이 땅에서 단절된 삶을 선택한 것은, 북쪽 코나카타 산맥 너머에서 끊임없이 남하를 노리는 마군(魔軍)을 감시하기 위해서라고 전해진다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px",
            borderLeft: `3px solid ${ACCENT}`,
            ...(i === 0 ? { gridColumn: "1 / -1" } : {}),
          }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpiarzonSection() {
  return (
    <div>
      <Prose text={"스피아르존은 안개의 숲 내부에 존재하는 유일한 도시이다. 도시 인구의 약 90%가 스피아르 엘다난으로 이루어져 있으며, 외부인이 이 도시를 방문하는 일은 극히 드물다."} />
      <SecTitle title="도시의 구성" />
      <Prose text={"스피아르존은 안개의 숲 깊은 곳, 수백 년 수령의 거목들에 의해 자연스럽게 형성된 광장을 중심으로 발전한 도시이다. 엘다난 특유의 건축 양식으로 지어진 목조 건물들이 나무들 사이사이에 배치되어 있어, 숲과 도시의 경계가 뚜렷하지 않다.\n\n시장과 공방, 신전, 여왕 에아르핀의 거처인 수령(樹齡) 2,000년이 넘는 고목 \"여왕목\" 등이 도시의 중심을 이룬다."} />
      <SecTitle title="외부와의 관계" />
      <Prose text={"스피아르존은 외부 세계와의 교류를 최소화하는 방침을 유지한다. 상인이나 모험자가 안개의 숲에 발을 들이는 일이 없지는 않으나, 도시에 다다르는 것은 매우 어렵고 설령 도달하더라도 엘다난들은 경계심을 늦추지 않는다.\n\n파리스 동맹과는 불가침 협정이 맺어져 있으며, 긴급 사태 시 서로 연락을 취하는 관계이기도 하다."} />
    </div>
  );
}

function PlacesSection() {
  const places = [
    {
      name: "돌아올 자들의 언덕",
      icon: "🪨",
      content: "스피아르존 외곽에 있는 언덕. 역대 스피아르 엘다난 중 마군과의 싸움이나 탐색 임무에서 귀환하지 못한 자들을 기리는 추모의 장소이다. 돌비석들이 줄지어 서 있으며, 가족을 잃은 엘다난들이 꽃과 공물을 바치러 찾아온다. 이름은 \"떠난 자들은 언젠가 돌아온다\"는 스피아르 엘다난의 믿음에서 유래했다.",
    },
    {
      name: "안개의 심연",
      icon: "🌫️",
      content: "숲의 북쪽 깊은 곳, 코나카타 산맥의 기슭 근처에 있는 구역. 안개가 특히 짙고 마력 반응이 감지되는 지역으로, 스피아르 엘다난의 정찰대가 항상 이 구역을 감시한다. 마군이 이 구역을 거점으로 남하를 시도한 사례가 과거에도 있었다.",
    },
    {
      name: "여왕목 (女王木)",
      icon: "🌳",
      content: "스피아르존 중심부에 우뚝 선 수령 2,000년 이상의 거목. 숲의 여왕 에아르핀의 거처이자 스피아르 엘다난의 성소(聖所)이다. 나무 자체가 강한 정령력을 내뿜고 있으며, 에아르핀이 이 나무와 연결되어 숲 전체의 상황을 감지할 수 있다고 전해진다.",
    },
  ];
  return (
    <div>
      <Prose text={"안개의 숲 곳곳에는 스피아르 엘다난에게 특별한 의미를 지닌 장소들이 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {places.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>
              {p.icon} {p.name}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const characters = [
    {
      name: "에아르핀",
      role: "숲의 여왕",
      race: "엘다난 (스피아르)",
      gender: "여",
      age: "909세",
      hair: "은록색(銀綠)",
      eyes: "심록색(深綠)",
      note: "안개의 숲을 통치하는 스피아르 엘다난의 여왕. 909세라는 오랜 세월을 이 숲과 함께해 온 인물이다. 북쪽 마군의 동향을 관찰하는 것을 최우선 임무로 삼으며, 필요에 따라 파리스 동맹 등 외부 세력과도 연락을 취한다. 조용하고 사려 깊은 성격으로, 말수는 적지만 그 판단은 항상 정확하다. 여왕목과 정령적으로 연결되어 있어 숲 전체의 움직임을 감지할 수 있다.",
    },
  ];

  return (
    <div>
      <Prose text={"안개의 숲과 스피아르 엘다난에 관련된 주요 인물들을 소개한다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 6 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#888", marginBottom: 8 }}>
              <span>종족: {c.race}</span>
              <span>성별: {c.gender}</span>
              <span>나이: {c.age}</span>
              {c.hair && <span>머리: {c.hair}</span>}
              {c.eyes && <span>눈: {c.eyes}</span>}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MistForestPage() {
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
      case "spiarzon":  return <SpiarzonSection />;
      case "places":    return <PlacesSection />;
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
        <a href="/" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 아리안로드 위키</div>
        </a>
        <div style={{ padding: "20px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#1A3A2A", marginBottom: 6 }}>엘다난 자치령 · 에린딜 북부</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>「안개의 숲」</div>
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
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "48px 48px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#4A9A8A", marginBottom: 10 }}>
              MIST FOREST — ELDA-NAN TERRITORY
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#081A14", marginBottom: 8, letterSpacing: "0.04em" }}>
              「안개의 숲」
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#1a3a2a", marginBottom: 4 }}>
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
