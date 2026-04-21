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
  { id: "cities",    label: "주요 도시",          icon: "🏙️" },
  { id: "events",    label: "전설과 사건",       icon: "📖" },
  { id: "relations", label: "타국과의 관계",     icon: "🤝" },
];

const capitalData = {
  stats: [
    { label: "국가 형태", value: "왕국" },
    { label: "정치 체제", value: "왕정" },
    { label: "현재 국왕", value: "엘13세" },
    { label: "왕도",       value: "로그레스" },
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
    { year: "성력 1002년", content: "파리스 동맹 결성. 신성 반즈탄 제국을 견제하는 4대국 체제가 확립된다." },
    { year: "성력 1004년", content: "왕녀 아나 및 국왕 엘13세에 대한 암살 미수 사건 발생." },
    { year: "성력 1010년", content: "왕도 로그레스에서 '전설의 스파이' 프렛차가 격퇴됐다는 소문이 돈다." },
    { year: "성력 1012년", content: "왕도 로그레스에서 마족 그시온에 의한 크리처 사건이 저지된다." },
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
      <Prose text={"에를랑 왕국은 에린디르 대륙 서방의 중부에 위치한다. 넓은 평원과 산지를 포함하는 광대한 영토를 가지며, 왕도 로그레스는 교통의 요지에 세워졌다.\n\n기후는 온화하며 농업에 적합하다. 곡물과 포도주 등의 농산물 생산이 왕성하고, 지하에서는 철광석과 각종 광물도 채굴된다. 또한 에린디르 서방의 내륙 무역로가 왕도를 통과하고 있어 상업도 발달해 있다."} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="정치 체제" />
      <Prose text={"에를랑 왕국은 왕정 국가로, 에를랑 왕가가 대대로 통치해 왔다. 현 국왕은 엘13세이며, 왕녀 아나와 함께 왕국의 앞날을 이어 나가고 있다.\n\n귀족 의회가 존재하여 국정에 참여하지만, 최종 결정권은 국왕이 쥐고 있다. 오래된 왕국인 만큼 귀족들의 정치적 영향력도 상당하다."} />
      <SecTitle title="군사" />
      <Prose text={"에를랑 왕국의 군사력은 에린디르 서방에서도 손꼽히는 수준이다. 왕도 로그레스를 중심으로 한 왕국 기사단이 편성되어 있으며, 유사시에는 각 지방의 귀족군도 동원된다.\n\n오래된 전통과 역사에서 비롯된 강고한 군사 기반을 보유하고 있으나, 근래에는 마족의 활성화에 대응하기 위해 방위력 강화에 주력하고 있다."} />
    </div>
  );
}

function EventsSection() {
  const events = [
    {
      title: "소멸한 마술서",
      content: "로그레스의 모험자들 사이에 떠도는 이야기다. 청명한 곳에서 온 도망자들이 있는데, 말하자면 그들은 사악한 신앙 단체다. 그러니까 그들은 신성 마물이라고 불리는 자들이다. 그리고 그들은 죽어 가고 있다. 이 세상과 피안 세계를 가르는 열쇠로 불리는 \"마술서\"를 지니고 도망치며, 지켜 낸 것은 아닐까 하는 이야기다.\n\n어머니의 이름은 슬라바. 궁정 도서관의 사서였던 여성이다. 그 슬라바가 은룡성에 사악한 신앙 단체가 잠입하는 것을 알게 되어, 딸 아마리를 데리고 귀중한 마술서와 함께 궁정에서 자취를 감췄다. 슬라바를 찾는 모험자들도 많다. 슬라바카, 딸 아마리에게 만약 자신에게 절대적인 힘을 빌릴 수 없다면, 은금 이후로 절대로 그에게 힘을 빌리지 말라고, 이미 개인적으로 이 모녀를 보호하려 하고 있다.",
    },
    {
      title: "비웃음 치는 북풍",
      content: "남쪽에 인접하는 에를랑 왕국의 겨울은 그다지 춥지 않다. 하지만 13년을 주기로, 해가 바뀌면 왕국 어딘가의 뒤쪽에서 냉기가 찾아온다. 대하 사르브스는 얼어붙고, 피요르드의 항구도 이용할 수 없게 되어 버린다.\n\n이것은 고대 마녀 \"북풍의 여왕\"이 선전포고를 하는 것이다. 어떤 마을은 도망을 치고, 어떤 자는 스스로 마녀가 사는 다누스 산악을 찾아갔지만, 돌아온 모험자는 아직 아무도 없다.",
    },
    {
      title: "그림자 드리운 왕궁",
      content: "에를랑 왕국의 왕은 신의 대사인 에를랑이 발하는 혈통을 이어받으며, 그 혈통에는 특별한 힘이 있었다. 창업 이래 역대의 왕들은 에를랑을 이름으로 관련된 이름이 붙은 강고한 중앙집권 정치를 굳혀왔다.\n\n하지만 무릇 왕의 권위가 신분에 의해 줄어드는 것이라면, 절대 군주여야 할 왕의 실권은 귀족에게 넘어가 버린다. 실제로 귀족들에게 넘어가는 실권이 이동하며, 왕도 귀족 파벌 간의 아(阿) 씨에 묶여 있어, 실질적인 권한은 이미 귀족에게 옮겨가고 있다. 왕의 딸아이가 아직 소녀라는 것 또한 위기적인 상황으로 만들고 있다. 조정은 지금, 강한 청풍을 원하고 있다.",
    },
    {
      title: "요마의 무리",
      content: "에를랑 왕국과 신성 반즈탄 제국 사이의 평화는, 벌레가 먹은 목재와 같다. 언제가는 부러진다. 신성 제국이 에린디르를 통일하는 것을 목표로 하는 한, 언젠가는 어려운 시련을 겪게 될 것이다.\n\n전쟁이 되면 피가 흘린다. 이 두 나라의 긴장이 고조되는 것에 맞추어, 요마에 의한 재해가 증가하고, 마족이 에를랑 왕국을 공격하고 있는 것이 아닐까라는 의심이 왕국 내에 싹트고 있다. 왕국 시민들의 이 제국에 대한 원망은 그들의 눈을 가리고 있으며, 민심이 옆으로 향하지 않는다는 것을 왕국은 알고 있다.",
    },
    {
      title: "요마의 선봉",
      content: "요마가 최초로 힘으로 내습하는 것은 드물다. 그들은 반드시 선봉을 보낸다.\n\n에를랑 왕국은 지금, 조용히 이 선봉에 의해 내부에서 갉아먹히고 있다. 이것은 쥐와 같다. 다만 꼬리가 두 개다. 그들에게 다가가는 것에 능하여, 작은 의혹들이 계속 생겨난다는 것을 알게 될 것이다. 이 마수의 이름은 \"기억 먹는 자\"다. 사람의 기억에 이빨을 박아, 조금씩 그 사람의 과거에 작은 구멍을 파 열어 간다. 한번에 너무 많이 먹어서는 안 된다. 기름 단지가 비어 버리면 안 된다.",
    },
    {
      title: '"공예의 거리" 콜름',
      content: "에를랑 왕국 서남부로 돌출된 뷰르탈 반도. 그 서쪽에는 산악 지대로 둘러싸인 거리가 있다. 반도 남부에서 산출되는 석회와 광석, 서쪽 습지대에서 채취되는 점토, 하이·브라젤 섬의 도석 등을 원료로 하는 공예품과 미술품으로 유명하다. 고대부터 요마가 배회하던 장소였지만, 현재는 \"고블린의 왕\" 루다그가 이끄는 대군의 침공을 받아, 사방이 막혀 버릴 위기에 처해 있다.",
    },
  ];
  return (
    <div>
      <Prose text={"에를랑 왕국에 얽힌 전설, 진행 중인 사건들을 소개한다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
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
    { name: "신성 반즈탄 제국", content: "동방 진출을 노리는 반즈탄 제국과는 전통적으로 긴장 관계에 있다. 4대국 체제 아래 상호 견제 상태이나, 반즈탄 제국이 다시 개전을 준비하고 있다는 소문이 돌아 경계를 강화하고 있다." },
    { name: "파리스 동맹",     content: "파리스 동맹에는 직접 가입하지 않지만 우호 관계를 유지하고 있다. 동맹과의 교역과 외교를 통해 반즈탄 제국을 함께 견제하는 구도를 형성하고 있다." },
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
