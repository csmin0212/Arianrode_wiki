'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

// ---- 타입 정의 ----
interface NavItem { id: string; label: string; icon: string; }

// ---- 상수 ----
const ACCENT = "#3B5E45";
const ACCENT_LIGHT = "#E6EFE9";

// ---- 네비게이션 ----
const navItems: NavItem[] = [
  { id: "paris", label: "파리스 동맹", icon: "⚔️" },
];

const cityLinks = [
  { name: '"유적의 거리" 라인',       href: "/line",        icon: "🏛️" },
  { name: '"기계의 거리" 카난',       href: "/kanan",       icon: "⚙️" },
  { name: '"물의 거리" 크란벨',       href: "/clan-vel",    icon: "💧" },
  { name: '"대장간의 거리" 하마르빌', href: "/hammerville", icon: "🔨" },
  { name: '"모험의 항구" 힐베니아',   href: "/hilbenia",    icon: "⚓" },
  { name: "그랑펠덴 왕국",            href: "/granfelden",  icon: "🏰" },
];

// ---- 데이터 ----

const parisEvents = [
  {
    name: "패왕의 무구",
    content: `성력 500년경 중원을 통일한 파리스 왕국은, 현재에도 전설적인 국가로 이야기가 전해지고 있다. 왕국의 창업자는 "패왕"이라 불리며, 그 무구를 노래한 시 "패왕의 노래"는 지금도 여러 형태로 바뀌며 계승되고 있다.\n\n전설에 의하면, 패왕은 신에게 받았다는 7개의 무구를 동료에게 나누어 주고, 중원 통일을 위해 싸웠다고 전해진다. 패왕 자신이 휘둘렀다는 "전도 신검"을 비롯한 도구는 오랫동안 소재 불명이었지만, 엘크레스트·카렛지가 마족에게 점령된 사건에서, 그 대부분은 엘크레스트·카렛지가 관리하게 됐다.`,
  },
  {
    name: "크란벨의 사영웅",
    content: `성력 1004년, 크란벨에 봉인되어 있던 물의 대정령왕이 해방된 것을 계기로, 마족의 음모가 밝혀지게 됐다. "부서진 영웅" 가이아를 모델로 "다음 시대의 막을 고하는" 부정 정화 활동을 시작한 것이 사건의 발단이었다. 이 사건은 마물과의 전쟁으로 이어졌으며, "크란벨의 사영웅"이라 불리고 있다.`,
  },
  {
    name: "지하에 펼쳐지는 유적",
    content: `"유적의 거리" 라인 부근에는 주로 당대의 지형에서 유래한 유적 발굴이 많이 이루어지고 있다. 유적의 조사가 진행됨에 따라, 이것들이 "땅의 시대"의 네바프들의 손으로 만들어졌다는 것이 밝혀졌다. 이 일대는 밀집한 지하 제국의 잔재라고 하는 설도 있다. 지하에 구조물을 만든 네바프들에게 연결되는, 세계 각지에 지하 통로가 만들어져 있을 가능성도 있다고 한다.\n\n현재 가장 농도가 있는 것으로 알려진 것은 라프 대동굴 부근으로, "땅의 시대"의 지세가 정해지는 것은 아니지만, 추측되는 한, 북방의 산맥에서부터 방대한 광물 자원을 운반하는 수단을 갖추기 위해 네바프 문명을 지탱하는 것은 틀림없다고 보이고 있다. 동일하게 신성 번스터 제국이나 에를랑 왕국 방면에도 지하 통로가 있다 하더라도 아무런 이상할 것이 없다.`,
  },
  {
    name: "마물의 습격",
    content: `"불의 시대"가 1000년을 넘긴 이래, 세계의 정세는 서서히 암흑으로 향하고 있다고 전해진다. 그 증거 중 하나로, 마물의 활성화가 꼽힌다.\n\n성력 1004년, 파모루 왕 에루사핀데르의 부활이 저지됐다. 특히 북부 평원의 산맥에서 나타나는 마물의 무리에, 파리스 동맹 국가들은 대응에 쫓기고 있다. 현재 대규모 마물의 역할은 피할 수 없는 것으로 보이며, 전투는 앞으로도 격화할 가능성이 있다.`,
  },
  {
    name: "동맹 평의회 선거",
    content: `파리스 동맹 평의회는 2년에 한 번, 의장을 결정하는 선거를 실시하고 있다. 최근에 치러진 선거에서는 크란벨의 의장 후보인 마티아스가 당선됐다. 현 의장은 무즈라는 인물도 선거를 위해 입후보하고 있다.\n\n마티아스는 이전 선거에서 평가되어 의장에 선출됐지만, 이번 선거에서 역할에 대한 의구심도 있어, 의장을 사임(*) 한 후 이번 선거에 입후보(역할)으로 입후보했기 때문에, 만일 선출된다면 하겠다는 생각이라고.`,
  },
];

// ---- 공통 컴포넌트 ----

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

function Card({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8,
      padding: "16px 20px", marginBottom: 10,
      borderLeft: accent ? `4px solid ${accent}` : undefined,
    }}>{children}</div>
  );
}

// ---- 섹션 컨텐츠 ----

function ParisSection() {
  return (
    <div>
      <SecTitle title="개요" />
      <Prose text={`파리스 동맹은 에린딜 중원에 있는 국가들이 신성 번스터 제국에 대항하기 위해 연합한 동맹체이다. 주립 7개국을 중심으로 각각 역사와 문화가 다른 나라들이 교류하고 있다.\n\n파리스 동맹은 에린딜 서방의 중원에 있는 국가 연합이다. 남방에서 세력을 강화하는 신성 번스터 제국에 대한 억지력이 되도록 성력 1002년에 발족됐다. 그 본체는 넬수스 강 유역의 중원 도시 동맹으로, 신흥의 세력이면서도 경제 대국으로서 서방 국가들의 주목을 모으고 있다.\n\n정치적 입장의 중심에는 "유적의 거리" 라인을 비롯하여, "기계의 거리" 카난, "물의 거리" 크란벨 등의 넬수스 강 유역 도시와 중핵 7국, 그 주변 도시들이 있다.`} />

      <SecTitle title="기후와 풍토" />
      <Prose text={`3개의 강 사이에 있는 이 일대는 에린딜 서방 중부에서 "중원(中原)"이라 불리는 평탄한 땅이다. 풍부한 산림과, 남방은 다습한 토지이다. 약간의 저지에서 서해에서의 따뜻한 바람의 영향으로 온화한 기후가 되고 있다. 북방에서 냉기가 흘러내리고, 일부에서는 겨울에도 눈이 내리는 경우가 드물다.\n\n지질은 많이 이탄질이지만, 군데군데 화성암의 대지나 석회암, 화강석 지역도 있고, 크란벨 주변에는 붉은 사암 지역도 볼 수 있다. 각지에서 화산 외에 빙정암 등의 희귀한 광석이 채굴되며, 북방을 흐르는 강의 거대한 벨루아그 협곡 계곡을 이용해 무역을 활발히 행하고 있다.`} />

      <SecTitle title="타국과의 관계" />
      <Prose text={`중원에는 파리스 동맹에 참가하지 않은 도시 국가들도 있다. 이러한 국가들은, 현재로서는 대체로 적대적이지 않다. 하천을 교통로로 이용하여 서로 상업 목적의 교류를 하는 주요 3개 강 유역 및 남쪽의 라셀 강까지 광범위하게 이루어지고 있다. 파리스 동맹에 가입하고 있는지 여부와 관계없이, 통행이 용이하며 통행세에도 차이가 있다. 모험자는 모험자의 증거를 소지하여 길드가 일괄 관리하고 있어, 모험자의 증거를 가진 자는 거의 대부분의 도시 사이를 이동할 수 있다.\n\n라셀 강을 경계로 하여, 남방의 중원 평야에는 신성 번스터 제국의 영토가 인접하고 있다. 중원 국가들은 한편으로 제국의 영향력을 경계하면서도 동맹의 방위 강도를 높이고 있어, 동맹의 대제국 방위선이 될 것이라 예상된다.`} />

      <SecTitle title="주요 도시" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {[
          { name: '"유적의 거리" 라인',       href: "/line",        desc: "라인 왕국의 수도. 파리스 동맹의 지도 도시 중 하나로, 미탐사 유적이 다수 남아 있는 모험자의 거리.", icon: "🏛️" },
          { name: '"기계의 거리" 카난',       href: "/kanan",       desc: "파리스 동맹 최일의 공업 도시이자 예술 도시. 연금철도가 달리는 기계 문명의 중심.", icon: "⚙️" },
          { name: '"물의 거리" 크란벨',       href: "/clan-vel",    desc: "운하와 수문이 얽힌 수상 도시. 몬스터 콜로세움 F리그로 유명하며, 아에마 신앙의 신전이 도시를 다스린다.", icon: "💧" },
          { name: '"대장간의 거리" 하마르빌', href: "/hammerville", desc: "루디온 산맥 서측에 자리 잡은 단조 도시. 암즈 크리스탈 합성 기술과 십금추 경연으로 알려진 장인들의 거리.", icon: "🔨" },
          { name: '"모험의 항구" 힐베니아',   href: "/hilbenia",    desc: "아레스타 종속 항구 도시. 네바프 고대 유적이 지하에 펼쳐져 있어 탐험 의뢰가 끊이지 않는 모험자의 기항지.", icon: "⚓" },
          { name: "그랑펠덴 왕국",            href: "/granfelden",  desc: "파리스 동맹의 핵심 왕국. 동맹 북방에 위치하며 연금술과 기사단으로 유명한 왕정 국가.", icon: "🏰" },
        ].map((city, i) => (
          <a key={i} href={city.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 18px", borderLeft: `4px solid ${ACCENT}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 4 }}>
                  {city.icon} {city.name}
                </div>
                <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{city.desc}</div>
              </div>
              <span style={{ fontSize: "11px", color: ACCENT, flexShrink: 0, marginLeft: 12, background: `${ACCENT}15`, padding: "3px 10px", borderRadius: 6 }}>자세히 →</span>
            </div>
          </a>
        ))}
      </div>
      <SecTitle title="사건과 전승" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {parisEvents.map((ev, i) => (
          <Card key={i} accent={ACCENT}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>
              {ev.name}
            </div>
            <Prose text={ev.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---- 메인 컴포넌트 ----

export default function GranFeldenWiki() {
  const [activeId, setActiveId] = useState("paris");
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
        <a href="/" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 아리안로드 위키</div>
        </a>
        <div style={{ padding: "20px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#7a8070", marginBottom: 6 }}>PARIS ALLIANCE</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>파리스 동맹</div>
        </div>
        <div style={{ padding: "10px 0", flex: 1, overflowY: "auto" }}>
          {/* 파리스 동맹 메인 아이템 */}
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
          {/* 주요 도시 서브 링크 */}
          <div style={{ padding: "6px 20px 4px", fontSize: "10px", letterSpacing: "0.12em", color: "#5a6858", textTransform: "uppercase", marginTop: 4 }}>주요 도시</div>
          {cityLinks.map((city, i) => (
            <a key={i} href={city.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 20px 7px 32px", fontSize: "12px", color: "#8a9888", borderLeft: "3px solid transparent", transition: "color 0.15s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#C8D4C4"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8a9888"; }}>
              <span style={{ fontSize: "13px", width: 18, textAlign: "center", flexShrink: 0 }}>{city.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{city.name}</span>
            </a>
          ))}
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE</div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8, letterSpacing: "0.02em" }}>
              {activeNav.icon} {activeNav.label}
            </h1>
            <div style={{ width: 40, height: 2, background: ACCENT, borderRadius: 1, opacity: 0.5 }} />
          </div>
        </div>
        <div style={{ maxWidth: 760, padding: mob ? "24px 20px 60px" : "32px 48px 80px" }}>
          <ParisSection />
        </div>
      </main>
    </div>
  );
}
