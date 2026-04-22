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
  { id: "cities",    label: "주요 도시",         icon: "🏙️" },
  { id: "events",    label: "전설과 사건",       icon: "📖" },
  { id: "relations", label: "타국과의 관계",     icon: "🤝" },
];

const capitalData = {
  stats: [
    { label: "국가 형태", value: "공화국" },
    { label: "정치 체제", value: "장로 합의제" },
    { label: "현재 주석", value: "킬드" },
    { label: "수도",       value: "미스" },
    { label: "성도",       value: "디아스론드 (공동 관리)" },
    { label: "건국",       value: "성력 996년" },
    { label: "주요 언어", value: "공통어, 고두앙어" },
    { label: "주요 종교", value: "칠대신 신앙 (그랑아인 주봉)" },
    { label: "기후",       value: "건조, 연간 강수량 극소" },
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
      <Prose text={'광대한 "무한의 사막"에 건국된 공화국. 성력 996년에 건국됐다.\n\n국민 대다수는 사막에서 유목 생활을 영위하는 이들로, 중원과는 다른 문화를 지닌다. 7개 사막 부족(에르그, 하마드, 호가르, 티베스, 타만, 라세트, 라주르)이 연대하여 각 부족의 족장이나 그 대리인, 상인 등 유력자들에 의한 장로 합의 정치가 이루어진다.\n\n동서 무역의 중계점으로서 급속히 발전하고 있다. 4대국 중 가장 신생 국가이지만, 사막 지형을 활용한 독자 노선과 경제력으로 에린딜 서방에서 독특한 위치를 차지하고 있다.'} />
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
      <Prose text={'키르디아 공화국이 위치하는 "무한의 사막"은 에린딜 서방과 동방 사이를 가르는 광대한 사막 지대이다. 이름 그대로 끝이 보이지 않을 만큼 넓어, 이 사막을 횡단하는 것은 상당한 준비와 경험을 필요로 한다.\n\n한낮의 극심한 더위와 밤의 혹독한 추위 사이에서 독자적인 생존 방식을 발전시켜 온 공화국 사람들은 사막의 지식에 있어 타의 추종을 불허한다.'} />
      <SecTitle title="이중의 거리 다브를" />
      <Prose text={'건국과 함께 건설된 "이중의 거리" 다브를은 키르디아 공화국의 중요 도시 중 하나이다. "이중의 거리"라는 별명은 도시가 두 구획으로 나뉘어 있어 각기 다른 문화권이 공존하는 독특한 구조에서 유래한다.'} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="정치 체제" />
      <Prose text={"키르디아 공화국은 공화제를 채택한 에린딜 서방의 유일한 주요 국가이다. 왕이나 황제가 아닌 선출직 대표자들이 국정을 운영하며, 이 독특한 정치 구조가 공화국에 특별한 정체성을 부여하고 있다.\n\n공화제라는 체제는 4대국 중 유일하며, 이것이 다른 국가들과의 외교에서 독특한 입장을 만들어내기도 한다."} />
      <SecTitle title="군사" />
      <Prose text={"사막을 기반으로 한 키르디아 공화국의 군사 전략은 독특하다. 사막 지형을 최대한 활용한 방어 전술을 발전시켜, 외세의 침략을 막아내는 데 특화되어 있다.\n\n직접적인 군사 충돌보다는 상업적 교류나 외교를 통한 세력 유지를 선호하는 경향이 있다."} />
    </div>
  );
}

function CitiesSection() {
  const cities = [
    {
      name: '"새로운 거리" 미스',
      href: "/mises",
      desc: "키르디아 공화국의 수도. 킬드가 그랑아인의 신탁을 받아 건설한 성스러운 거리. 두앙 문화의 중심지.",
      icon: "🌵",
      sub: "수도 · 인구 5만명",
    },
    {
      name: '"황금의 거리" 칼칸드',
      href: "/kalkand",
      desc: "키르디아 공화국 남부의 교역 도시. 에린 산맥과 사막 사이에 위치하며, 고대 조드리아인의 지하 도시 위에 건설된 발굴품 거래의 중심지.",
      icon: "🏺",
      sub: "교역 도시 · 인구 2만명",
    },
    {
      name: '"대학 도시" 오카',
      href: "/okar",
      desc: "성력 1010년에 설립된 신생 학술 도시. 현대 지구의 중해대학이 에린으로 이전되어 탄생한 특별한 거리.",
      icon: "🎓",
      sub: "디아스론드 근교 · 인구 약 2만명",
    },
  ];
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        키르디아 공화국에 속하거나 그 영향권 내에 있는 주요 거리들을 소개한다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cities.map((c, i) => (
          <a key={i} href={c.href} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ background: "#fff", border: `1px solid ${ACCENT}30`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
              <span style={{ fontSize: "30px", flexShrink: 0 }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: "11px", color: "#999", marginBottom: 5 }}>{c.sub}</div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.7 }}>{c.desc}</div>
              </div>
              <span style={{ fontSize: "16px", color: `${ACCENT}60`, flexShrink: 0 }}>→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  const events = [
    {
      title: "장로 회의",
      content: "키르디아 공화국은 소속 부족의 대표(*)에 의한 합의제로 운영된다. 이 회의는 '고도의 민(古の民)' 엘다가 남긴 수정 텔레크루스에 의해 중계되어, 장로들은 원격지에서도 회의에 출석할 수 있다.\n\n회의는 대외적·국내 정치 두 가지에 관해서 장로들의 의견을 청취하는 형태를 취한다. 주석 킬드가 현황과 방침을 보고하고 그에 대한 반박 응수가 이루어진다. 기본적으로 킬드에 이의를 제기하는 일은 없다. 다만 장로들의 대다수는 유목에 필요한 정보 교환과 조율을 우선하며, 외교 국정을 중시하지 않는 경향이 있다.\n\n(*) 소속 부족의 대표: 그 부족의 족장, 또는 족장을 대행하는 역할을 맡는 자를 '장로'라고 부른다.",
    },
    {
      title: "마족의 전생",
      content: "사막의 전승에는 '요마의 여왕' 바라르와 함께 신에 반기를 든 신과 정령왕 들을 괴롭힌 '그라브베아의 여왕' 에프네의 이야기가 전해진다. 에프네는 신의 손에 의해 두앙의 도시로 다시 태어나, 현재는 사막에 존재하는 두앙의 거리에 봉인되어 있다고 한다. 현재 그 거리의 모래 속에는 두앙의 도시에 태어나 사라진 에프네의 '잔여 기억'이 잠들어 있다고 알려진다.",
    },
    {
      title: "사룡",
      content: "사막 상인들이 모래 속에서 움직이는 재앙으로 두려워하는 것이 사드웜이다. 지렁이를 닮은 모습에 불어오는 거대한 생물로, 군집을 이루어 거대한 행상을 습격한다. 더욱이 사드웜의 몸 안에는 생명력을 결집한 용석이라 불리는 것이 있다. 동방 세계에서는 불로불사의 사약과 마찬가지로, 약학이나 연금 기사적 가치가 높은 일품이다. 그 용석을 구하여, 모험자들은 위험하지만 성공하면 큰돈이 되는 사룡 사냥에 나선다.",
    },
    {
      title: "뱀파이어의 왕",
      content: "사막 한가운데 홀연히 솟은 백아의 성이 있다. 기묘하게도 그 성 주변에는 짙은 안개가 자욱하며, 햇빛이 들지 않는 불가사의한 성. 뱀파이어 왕 블레아스의 거처, 시딘벨 성이다.\n\n시딘벨 성의 주변에는 마기에 의해 썩은 늪이 둘러싸고, 마성에 도전하는 자는 먼저 이 악마의 습지를 통과해야 하며, 그 다음은 두 겹으로 둘러싼 벽, 민족 간의 관문이 계속된다. 그 선봉에 이르는 방법에 관해서는 살아서 정보를 가지고 돌아온 자가 없다고 한다.",
    },
    {
      title: "그랑아인의 발톱을 둘러싼 싸움",
      content: "패왕의 민이 전하는 전설검 '패왕의 발톱 듀란달'은, 대를 이은 수호자들에 의해 그랑아인의 발톱의 하나로 '미행의 거리' 멘달의 신전에 보관되어 있었다.\n\n이 아이템은 '진행의 거리' 멘달의 신전에 보관되어 있어, 대대로 멘달의 '어둠의 달' 리리스가 관리해 왔다. 리리스는 저주한 타자의 정신을 빼앗는 능력을 가지고 있어, 문을 지키는 병사나 고문이 간단히 신관에 홀려 버렸다. 더욱이 그녀는 아리팡이라는 능력의 여성이며, 수천의 모래 주머니를 사용하여 마을을 공격하였다.",
    },
  ];
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        키르디아 공화국에 얽힌 전설과 현재 진행 중인 사건들을 소개한다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {events.map((e, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "16px 20px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{e.title}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#555" }}>{e.content}</div>
          </div>
        ))}
      </div>
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
      case "cities":    return <CitiesSection />;
      case "events":    return <EventsSection />;
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
