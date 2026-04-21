'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#4A6741";
const ACCENT_LIGHT = "#E8EFE6";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview", label: "지역 개요", icon: "🗺️" },
  { id: "nations",  label: "서방 4대국",  icon: "⚔️" },
];

interface Nation {
  name: string; nameEn: string; tag: string;
  color: string; accentBg: string;
  founded: string; capital: string; government: string;
  summary: string; href: string; icon: string;
}

const nations: Nation[] = [
  {
    name: "에를랑 왕국",
    nameEn: "Kingdom of Erlan",
    tag: "에린딜 서방 최고(最古)의 왕국",
    color: "#2A5F9E", accentBg: "#D4E4F7",
    founded: "성력 300년경", capital: "왕도 로그레스", government: "왕정",
    summary: "에린딜 서방에서 가장 오래된 역사를 자랑하는 왕국. 성력 300년경에 건국된 것으로 알려져 있으며, 오랫동안 에린딜 서방의 정치적 중심 역할을 담당해 왔다. 전통과 권위를 상징하는 나라로, 4대국 중 가장 강고한 역사적 기반을 가진다.",
    href: "/erlan", icon: "👑",
  },
  {
    name: "신성 번스터 제국",
    nameEn: "Holy Vanstar Empire",
    tag: "서쪽 바다의 섬 제국",
    color: "#8B2D2D", accentBg: "#F5D5D5",
    founded: "성력 719년 (번스터 제국)", capital: "핀지아스 섬", government: "제정",
    summary: "서쪽 바다의 핀지아스 섬을 거점으로 하는 제국. 성력 999년에 신성 번스터 제국으로 개칭하고 동방 진출을 노리며 에를랑 왕국 등과 긴장 관계에 있다. 최근 다시 개전을 준비하고 있다는 소문이 돌아 긴장이 고조되고 있다.",
    href: "/vanstar", icon: "⚔️",
  },
  {
    name: "파리스 동맹",
    nameEn: "Paris Alliance",
    tag: "신성 번스터 제국에 대항하는 연합",
    color: "#1A6B4A", accentBg: "#D5EDDF",
    founded: "성력 1002년", capital: "그랑펠덴 (그랑펠덴 왕국)", government: "도시 연합",
    summary: "신성 번스터 제국의 침략에 대항하기 위해 성립된 국가 연합. 에린딜 서방 중원의 도시 국가들로 구성된다. 북방에서 마족의 대침공을 받은 이후, 동맹의 결속과 방위 강화가 과제가 되고 있다.",
    href: "/gran-felden", icon: "🤝",
  },
  {
    name: "키르디아 공화국",
    nameEn: "Republic of Kirdia",
    tag: '"무한의 사막"에 건국된 공화국',
    color: "#8B6914", accentBg: "#F5E8C8",
    founded: "성력 996년", capital: "불명", government: "공화제",
    summary: '광대한 "무한의 사막"에 건국된 공화국. 사막을 기반으로 독자적인 문화와 정치 체계를 발전시켜, 4대국의 균형에서 독특한 위치를 차지하고 있다.',
    href: "/kirdia", icon: "🏜️",
  },
];

// ---- 컴포넌트 ----

function Prose({ text }: { text: string }) {
  return (
    <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a" }}>
      {text.split("\n\n").map((p, i) => <p key={i} style={{ marginBottom: 12 }}>{p}</p>)}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
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
      <Prose text={"에린딜 대륙 서방은 약 800만 평방킬로미터의 광대한 지역으로, 에린딜 대륙의 서쪽 절반에 해당한다. 서방 남쪽은 빙원, 북동쪽은 사막이 넓게 분포하며, 중앙 부근에는 광대한 저지가 펼쳐진다.\n\n목초 성장이 빠르며 소·말·염소 등의 목축이 왕성하다. 주요 농작물은 밀, 호밀, 귀리, 오트밀, 감자 등이다.\n\n문명은 지구의 15~16세기 유럽에 가까우며, 마법이 당연하게 사용되고 황야에는 위험한 몬스터가 존재한다. 대륙 각지에 신화·전설 시대의 유적이 남아 있으며, 유물과 연금술 덕분에 일부 기술 레벨은 18세기 수준에 달한다."} />
      <SectionTitle title="현재 세력 구도" />
      <Prose text={"현재는 신성 번스터 제국, 에를랑 왕국, 파리스 동맹, 키르디아 공화국의 4국 세력이 크다. 성력 1002년 파리스 동맹 성립 이후 국가 간의 큰 싸움은 거의 일어나지 않고 있지만, 현재도 많은 국가 간 경계선 부근에서 마찰이 빈번히 일어나며 다양한 교섭이 이루어지고 있다.\n\n더욱이 북방에서 마족의 대규모 침략을 받은 파리스 동맹은 가까스로 쫓겨난 상태이며, 이를 계기로 신성 번스터 제국이 다시 개전을 준비하고 있다는 소문도 있어 예단을 허용하지 않는 상황이다."} />
    </div>
  );
}

function NationsSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        에린딜 서방에서 가장 큰 세력을 가진 4개 국가. 각 국가 카드를 클릭하면 상세 정보를 볼 수 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
        {nations.map((n, i) => (
          <a key={i} href={n.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{
              background: "#fff",
              border: `1px solid ${n.color}30`,
              borderLeft: `5px solid ${n.color}`,
              borderRadius: 10,
              padding: "18px 22px",
              transition: "box-shadow 0.15s",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: "18px" }}>{n.icon}</span>
                    <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "18px", fontWeight: 700, color: n.color }}>{n.name}</span>
                  </div>
                  <span style={{ fontSize: "11px", background: n.accentBg, color: n.color, padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>{n.tag}</span>
                </div>
                <span style={{ fontSize: "12px", color: n.color, fontWeight: 500, flexShrink: 0, background: n.accentBg, padding: "4px 12px", borderRadius: 6 }}>자세히 보기 →</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px 12px", marginBottom: 12 }}>
                {[
                  { label: "건국", value: n.founded },
                  { label: "수도", value: n.capital },
                  { label: "정치", value: n.government },
                ].map((d, j) => (
                  <div key={j} style={{ fontSize: "12px", borderBottom: `1px solid ${n.color}20`, paddingBottom: 4 }}>
                    <span style={{ color: "#999" }}>{d.label}: </span>
                    <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{d.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{n.summary}</div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 600, color: ACCENT, borderBottom: `2px solid ${ACCENT}`, paddingBottom: 6, marginBottom: 16 }}>독립 도시 국가</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { name: '"현자의 거리" 엘크레스트', tag: "학술·유적 탐사 거점의 독립 도시", href: "/elcrest", note: "에린딜 서방 중남부, 로아셀 호수 기슭에 위치한 독립 도시 국가. 전기제 대학 엘크레스트 칼리지를 보유하며, 정령마법 연구에서 에린딜 최고 수준을 자랑한다. 에를랑·번스터·파리스 동맹 3국의 완충지대에 위치해 중립을 유지한다." },
        ].map((city, i) => (
          <a key={i} href={city.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ background: "#fff", border: "1px solid #3A6B4830", borderLeft: "5px solid #3A6B48", borderRadius: 10, padding: "16px 20px", transition: "box-shadow 0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <div>
                  <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#3A6B48" }}>{city.name}</span>
                  <div style={{ fontSize: "11px", background: "#D0EDD8", color: "#3A6B48", padding: "2px 8px", borderRadius: 4, fontWeight: 500, display: "inline-block", marginTop: 4 }}>{city.tag}</div>
                </div>
                <span style={{ fontSize: "12px", color: "#3A6B48", fontWeight: 500, flexShrink: 0, background: "#D0EDD8", padding: "4px 12px", borderRadius: 6 }}>자세히 보기 →</span>
              </div>
              <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{city.note}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ---- 메인 컴포넌트 ----

export default function ErindilWestPage() {
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
      case "overview": return <OverviewSection />;
      case "nations":  return <NationsSection />;
      default:         return null;
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

      {/* 사이드바 */}
      <nav style={{
        width: 248, minWidth: 248, background: "#1A2018", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#7a8070", marginBottom: 6 }}>ERINDIL CONTINENT · WEST</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>에린딜 대륙<br /><span style={{ fontSize: "13px", opacity: 0.7 }}>서방 지역</span></div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#4a5040", lineHeight: 1.6 }}>
          <a href="/" style={{ color: "#7a8070", textDecoration: "none", fontSize: "11px" }}>← 월드 섹션으로</a>
          <div style={{ marginTop: 6 }}>異床同夢 · 이상동몽<br />아리안로드 2E 캠페인</div>
        </div>
      </nav>

      {/* 메인 */}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT_LIGHT}90 100%)`,
          borderBottom: `3px solid ${ACCENT}25`,
          padding: mob ? "60px 20px 28px" : "40px 48px 36px",
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>ERINDIL CONTINENT · WEST</div>
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
