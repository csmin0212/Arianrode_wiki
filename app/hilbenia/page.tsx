'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#2A6B5A";
const ACCENT_LIGHT = "#C8E8E0";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "hilbenia",      label: "힐베니아",           icon: "⚓" },
  { id: "structure",     label: "거리 구조",           icon: "🗺️" },
  { id: "facilities",   label: "주요 시설",            icon: "🏛️" },
  { id: "organizations", label: "조직",                icon: "🌊" },
  { id: "people",       label: "힐베니아의 인물들",    icon: "👥" },
];

const hilbeniaStats = {
  population: "약 1만 명",
  raceComposition: [
    { race: "휴린",   pct: 80, color: "#2A5F9E" },
    { race: "네바프",   pct: 8,  color: "#8B6914" },
    { race: "엘다난", pct: 7,  color: "#1A6B4A" },
    { race: "필보르",   pct: 3,  color: "#4A7A2E" },
    { race: "버나",     pct: 1,  color: "#B85C2A" },
    { race: "두앙",     pct: 1,  color: "#8B2D2D" },
  ],
  stats: [
    { label: "통치 형태", value: "영주에 의한 통치" },
    { label: "현 수장",   value: "코레스트·아조스 (영주)" },
    { label: "소속",       value: "아레스타 종속 도시" },
    { label: "종교",       value: "7대 신 신앙" },
    { label: "언어",       value: "공통어" },
    { label: "기후",       value: "해양성 기후" },
    { label: "주요 산업", value: "해상 교역, 어업, 모험자 지원" },
  ],
};

const hilbeniaHistory = `힐베니아는 파리스 동맹의 항구 도시로, 상위 도시 아레스타의 종속 도시이다. "모험의 항구"라는 별명대로 모험자들이 집결하는 거점 도시로 알려져 있으며, 파리스 동맹 전역에서 의뢰를 찾아 온 모험자들이 이 항구를 통해 출발하거나 귀환한다.

도시 지하에는 네바프의 고대 유적이 잠들어 있어, 유적 탐색을 목적으로 하는 모험자들도 꾸준히 방문한다. 네바프 유적을 활용한 지하 상가가 형성되어 있어, 독특한 지하 문화권도 발달해 있다.`;

const hilbeniaCurrentStatus = `영주 코레스트·아조스가 도시를 통치하고 있으며, 아레스타의 상위 지배 구조 아래서도 독자적인 운영을 유지하고 있다. 신전장 로렌스·헌터와의 협력 아래 도시의 질서와 종교 행정도 안정적으로 운영되고 있다.

항구를 통한 해상 교역이 도시 경제의 중심이며, 어업도 활발하다. 모험자들의 통과세와 의뢰 수수료도 도시 재정의 중요한 수입원이다. 지하 상가는 네바프 유적의 발굴품을 거래하는 특수 시장으로도 기능하고 있다.`;

const hilbeniaDistricts = [
  {
    name: "성채 구역",
    content: "영주 코레스트·아조스의 거처이자 도시 통치의 중심 구역. 성채를 중심으로 위병소, 관료 시설, 금고가 집중되어 있다. 도시 전체를 한눈에 내려다볼 수 있는 망루가 있어 항만 감시에도 사용된다.",
  },
  {
    name: "주택 구역",
    content: "시민들이 생활하는 주거 구역. 비교적 여유 있는 구획으로 조성되어 있으며, 소규모 상점과 선술집도 분포한다. 오래된 집 중에는 네바프 유적과 이어지는 지하 공간이 있는 경우도 있어, 비밀 유통로가 존재한다는 소문도 있다.",
  },
  {
    name: "상업 구역",
    content: "힐베니아의 상업 활동이 집중된 구역. 모험자 장비점, 여관, 음식점, 잡화점 등이 줄지어 있으며 항시 활기차다. 신전도 이 구역에 위치하여 치유나 의뢰 접수를 위해 방문하는 모험자들이 끊이지 않는다.",
  },
  {
    name: "직인 구역",
    content: "무기 수리점, 갑옷점, 연금 공방 등 전문 기술직 장인들이 모여 있는 구역. 상업 구역과 가깝게 붙어 있어 모험자들이 장비 정비와 구입을 한 번에 처리할 수 있다.",
  },
  {
    name: "항구 구역",
    content: "힐베니아의 핵심 경제 구역으로 선박이 오가는 항만. 어선, 상선, 모험자 의뢰선이 뒤섞여 상시 분주하다. 통관 시설과 선박 수리소가 있으며, 항구 주변에는 선원 전용 선술집과 숙박 시설이 밀집해 있다.",
  },
  {
    name: "지하 상가 구역 (네바프 유적)",
    content: "도시 지하에 펼쳐지는 네바프 고대 유적을 활용한 독특한 지하 상가. 유적의 석조 구조물을 그대로 이용한 가게들이 늘어서 있으며, 지상에서는 구하기 힘든 특수한 물품들이 거래된다. 깊은 구역은 아직 미탐색 상태로, 탐험 의뢰가 종종 발생한다.",
  },
];

const hilbeniaFacilities: Facility[] = [
  {
    name: "힐베니아 신전",
    content: "상업 구역에 위치한 7대 신 신앙의 거점. 신전장 로렌스·헌터가 주관하며, 모험자들에게 치유 시술과 의뢰 중개 서비스를 제공한다. 도시 공중 보건에도 관여하고 있으며, 영주와의 협력 관계도 원만하다.",
  },
  {
    name: "모험자 길드 힐베니아 지부",
    content: "파리스 동맹 공인 모험자 길드의 힐베니아 지부. 항구를 통한 해상 의뢰, 지하 유적 탐색 의뢰, 경호 의뢰 등 다양한 의뢰가 항시 게시된다. 모험자 등록과 랭크 관리도 이곳에서 이루어진다.",
  },
  {
    name: "네바프 유적 지하 상가",
    content: "도시 지하의 고대 네바프 유적을 활용한 지하 상가. 유적에서 발굴된 고대 유물이나 지상에서는 취급하지 않는 마법 도구들이 거래된다. 미탐색 구역으로 이어지는 통로도 있어 모험자들의 탐색 거점으로도 활용된다.",
  },
  {
    name: "항만 시장",
    content: "항구 구역에 인접한 해산물 및 잡화 시장. 매일 아침 신선한 어류가 들어오며, 각지에서 수입된 물산도 이곳에서 거래된다. 행상인과 상인들이 뒤섞여 항시 활기가 넘치며, 모험자들도 식료품이나 소모품 조달을 위해 자주 방문한다.",
  },
];

const hilbeniaOrganizations: Org[] = [
  {
    name: "힐베니아 항만 경비대",
    type: "군사 조직",
    base: "항구 구역, 경비대 본부",
    leader: "코레스트·아조스 (겸임)",
    content: "영주 직속의 항만 경비 및 도시 치안 유지 조직. 입항선 검사, 항구 순찰, 도시 내 질서 유지를 담당한다. 소규모이지만 훈련도가 높으며, 영주의 신임이 두텁다.",
  },
  {
    name: "유적 탐사대",
    type: "탐사 조직",
    base: "지하 상가 구역 입구",
    leader: "순환 담당제",
    content: "네바프 지하 유적의 안전 탐색과 관리를 담당하는 민간 조직. 모험자 길드와 협력하여 미탐색 구역의 개척 의뢰를 발주하기도 한다. 유적에서 발굴된 유물의 평가와 거래 인증도 담당한다.",
  },
  {
    name: "힐베니아 어업 조합",
    type: "상업 조합",
    base: "항구 구역, 조합 창고",
    leader: "조합장 (선출제)",
    content: "힐베니아 어민들의 이익을 대표하는 조합. 어획량 관리, 어장 구역 조정, 해산물 가격 협의를 담당한다. 항만 시장과 긴밀하게 연계되어 있으며, 도시 경제에서 중요한 위치를 차지하고 있다.",
  },
];

const hilbeniaCharacters: Character[] = [
  {
    name: "コレスト・アゾス",
    nameKo: "코레스트·아조스",
    quote: "이 항구는 내가 지킨다. 그게 영주의 의무다",
    race: "휴린", gender: "남", age: "48",
    hairColor: "어두운 갈색", eyeColor: "회색", skinColor: "구릿빛",
    title: "힐베니아 영주",
    content: "힐베니아를 다스리는 영주. 상위 도시 아레스타의 임명을 받았으나, 힐베니아 시민들에게도 두텁게 신뢰받는 인물이다. 실무 능력이 뛰어나고 공정한 행정으로 알려져 있으며, 모험자들에 대해서도 우호적인 입장을 취한다. 항만 경비대를 직접 지휘하며 도시의 안전에 강한 책임감을 가지고 있다.",
  },
  {
    name: "ローレンス・ハンター",
    nameKo: "로렌스·헌터",
    quote: "여신의 가호가 당신의 항해를 인도할 것이오",
    race: "휴린", gender: "남", age: "55",
    hairColor: "회갈색", eyeColor: "파란", skinColor: "흰",
    title: "힐베니아 신전장",
    content: "힐베니아 신전을 주관하는 신관장. 영주 코레스트와 오랜 신뢰 관계를 유지하며 도시 행정의 정신적 지주 역할을 하고 있다. 온화하고 사려깊은 성격으로 시민들에게도 친근하다. 모험자들이 의뢰를 받기 전 신전에 참배하는 관습이 생길 정도로, 그의 덕望이 도시에 깊이 뿌리내리고 있다.",
  },
  {
    name: "ミラ・ダスカル",
    nameKo: "미라·다스카르",
    quote: "유적 안에서 무언가가 기다리고 있어요",
    race: "네바프", gender: "여", age: "28",
    hairColor: "청흑색", eyeColor: "금색", skinColor: "연황색",
    title: "유적 탐사대 선임 탐험가",
    content: "힐베니아 지하 네바프 유적을 누구보다 잘 아는 탐험가. 어린 시절부터 유적 내부를 탐색해 왔으며, 현재는 탐사대에서 선임으로 활동하고 있다. 고대 네바프어를 독학으로 해독할 수 있어, 유물 평가에서 없어서는 안 될 존재다. 미탐색 구역에 강한 관심을 가지고 있으며, 모험자들의 안내를 맡기도 한다.",
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

function Card({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "16px 20px", marginBottom: 10, borderLeft: `4px solid ${ACCENT}` }}>
      {children}
    </div>
  );
}

// ---- 섹션 ----

function HilbeniaSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>힐베니아 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {hilbeniaStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {hilbeniaStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {hilbeniaStats.raceComposition.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 48, fontSize: "12px", color: "#555", textAlign: "right", flexShrink: 0 }}>{r.race}</span>
              <div style={{ flex: 1, height: 16, background: "#F1EFE8", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${r.pct}%`, height: "100%", background: r.color, borderRadius: 4 }} />
              </div>
              <span style={{ width: 36, fontSize: "12px", fontWeight: 600, color: r.color, textAlign: "right", flexShrink: 0 }}>{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <SecTitle title="힐베니아의 역사" />
      <Prose text={hilbeniaHistory} />
      <SecTitle title="힐베니아의 현황" />
      <Prose text={hilbeniaCurrentStatus} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"힐베니아는 성채 구역, 주택 구역, 상업 구역, 직인 구역, 항구 구역, 지하 상가 구역의 여섯 구역으로 나뉜다. 지상과 지하가 유기적으로 연결된 독특한 도시 구조를 갖추고 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {hilbeniaDistricts.map((d, i) => (
          <Card key={i}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 6 }}>{d.name}</div>
            <Prose text={d.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        힐베니아의 주요 시설을 소개한다. 항구 도시 특유의 해양 문화와 고대 유적이 공존하는 독특한 시설 구성이다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {hilbeniaFacilities.map((f, i) => (
          <Card key={i}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: ACCENT, marginBottom: 10 }}>{f.name}</div>
            <Prose text={f.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function OrganizationsSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        힐베니아와 관련이 깊은 조직을 소개한다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {hilbeniaOrganizations.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT }}>{o.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 8px", borderRadius: 4 }}>{o.type}</span>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: "12px", color: "#888", marginBottom: 8 }}>
              <span>본거지: <strong style={{ color: "#555" }}>{o.base}</strong></span>
              <span>대표: <strong style={{ color: "#555" }}>{o.leader}</strong></span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        "모험의 항구" 힐베니아의 주요 인물들을 소개한다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {hilbeniaCharacters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, overflow: "hidden", borderTop: `3px solid ${ACCENT}` }}>
            <div style={{ padding: "14px 18px 10px", background: ACCENT_LIGHT }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: ACCENT, marginBottom: 2 }}>
                {c.nameKo ?? c.name}
              </div>
              <div style={{ fontSize: "11px", color: "#888", marginBottom: 6 }}>{c.name}</div>
              <div style={{ fontSize: "13px", fontStyle: "italic", color: "#5a5a5a", background: "#fff", padding: "5px 10px", borderRadius: 4, borderLeft: `3px solid ${ACCENT}50` }}>
                &ldquo;{c.quote}&rdquo;
              </div>
            </div>
            <div style={{ padding: "10px 18px", borderBottom: "1px solid #F0ECE5" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", fontSize: "12px" }}>
                {[
                  { label: "종족", value: c.race },
                  { label: "성별", value: c.gender },
                  { label: "연령", value: `${c.age}세` },
                  { label: "머리", value: c.hairColor },
                  { label: "눈",   value: c.eyeColor },
                  { label: "피부", value: c.skinColor },
                ].map((d, j) => (
                  <span key={j}>
                    <span style={{ color: "#aaa" }}>{d.label}: </span>
                    <span style={{ color: "#3a3a3a", fontWeight: 500 }}>{d.value}</span>
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 6, fontSize: "11px", fontWeight: 600, color: ACCENT, padding: "3px 8px", background: `${ACCENT}15`, borderRadius: 4, display: "inline-block" }}>
                {c.title}
              </div>
            </div>
            <div style={{ padding: "12px 18px", fontSize: "13px", lineHeight: 1.8, color: "#555" }}>
              {c.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- 메인 컴포넌트 ----

export default function HilbeniaPage() {
  const [activeId, setActiveId] = useState("hilbenia");
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
      case "hilbenia":      return <HilbeniaSection />;
      case "structure":     return <StructureSection />;
      case "facilities":    return <FacilitiesSection />;
      case "organizations": return <OrganizationsSection />;
      case "people":        return <PeopleSection />;
      default:              return null;
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
        width: 248, minWidth: 248, background: "#0E1E1A", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <a href="/gran-felden" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 파리스 동맹으로</div>
        </a>
        <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#285848", marginBottom: 6 }}>PARIS ALLIANCE · HILBENIA</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "모험의 항구"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>힐베니아</span>
          </div>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE · "ADVENTURE PORT" HILBENIA</div>
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
