'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8B4A14";
const ACCENT_LIGHT = "#F5DFC0";
const SIDEBAR_BG = "#1C0E08";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character { name: string; role: string; age: string; gender: string; race: string; hair: string; eyes: string; skin: string; content: string; }

const navItems: NavItem[] = [
  { id: "overview",   label: "황금의 거리 칼칸드", icon: "🏺" },
  { id: "structure",  label: "거리 구조",           icon: "🏘️" },
  { id: "facilities", label: "주요 시설",           icon: "🏛️" },
  { id: "orgs",       label: "조직",               icon: "⚜️" },
  { id: "people",     label: "칼칸드의 인물들",     icon: "👥" },
];

const stats = [
  { label: "인구",      value: "2만명" },
  { label: "통치형태", value: "장로·라세트 족장·상인에 의한 합의제" },
  { label: "현재 수장", value: "산자니" },
  { label: "종교",      value: "칠대신 신앙 (그랑아인 주봉)" },
  { label: "언어",      value: "공통어, 고두앙어" },
  { label: "기후",      value: "아한랭 기후" },
  { label: "수입품",   value: "곡물, 식료품, 섬유물, 목재, 귀금속, 광석 등" },
  { label: "수출품",   value: "모직물, 소금, 희소 생물, 유적 발굴품 등" },
];

const population = [
  { race: "두앙",     pct: 49, color: "#8B5A14" },
  { race: "휴린",   pct: 30, color: "#2A5F9E" },
  { race: "엘다난", pct: 11, color: "#5B4A7A" },
  { race: "네바프",   pct:  7, color: "#2A7A5E" },
  { race: "버나",     pct:  2, color: "#9A3A3A" },
  { race: "필보르",   pct:  1, color: "#7A5230" },
];

const districts = [
  {
    name: "상업구",
    content: "거리 중심부에 위치한 교역소와 시장이 늘어선 구역. 동서에서 모여드는 품목, 유적에서 발굴된 물건들이 진열된다. 파리스 동맹에서 에를랑 왕국을 건국하기 이전부터 이 지역에는 진귀한 물건을 찾는 상인들이 정착했다. 발굴물 거래를 위한 상점들이 집중해 있어, 거리 전체가 하나의 큰 시장처럼 기능한다.",
  },
  {
    name: "유목민 지구",
    content: "칼칸드가 교역 도시로 발전하기 이전부터 이 장소를 유목지로 이용하던 라세트 족의 구역. 거리 북쪽에 위치한다. 목초지가 조금이나마 보호되어 있어, 유목민들이 떼 지은 텐트가 이따금 존재한다.",
  },
  {
    name: "조드리아인의 지하 도시 입구",
    content: "에린딜에 진보한 사람들이 오기 전, 에를랑 왕국을 건국하기 이전에, 조드리아라 불리는 사람들이 살았다. 휴린 민족이기는 하지만, 그들에 대해서는 잘 알려진 것이 없다. 다만 그들은 에린 산맥 기슭에 지하 도시를 건설했다. 칼칸드 지하에 고대 조드리아인의 지하 도시가 펼쳐지고 있으며, 그 입구가 거리 남쪽에 있다.",
  },
];

const facilities: Facility[] = [
  {
    name: "조드리아인의 지하 도시",
    content: "칼칸드 지하에 펼쳐지는 고대 조드리아인의 도시. 그 입구는 거리 남쪽에 있으며 거리의 주요 관광지가 됐다. 지하 도시에는 허가 없이 들어갈 수 없으며, 지하 도시 출입구는 엄하게 감시되고 있다. 지하에서는 고도의 기술로 만들어진 공예품을 비롯해 다양한 유물이 발굴되고 있으며, 발굴품을 원하는 모험자들이 자주 찾아온다.",
  },
  {
    name: "캐러밴 광장",
    content: "거리와 가까운 교역 광장. 수도 미스와 칼칸드를 왕래하는 캐러밴이 준비를 갖추는 데 이용한다. 낙타, 말, 마차 등 많은 행렬이 줄을 이루는 광경은 장관이다. 부근에는 상점과 교역소, 여관, 은행과 환전소 등이 늘어서, 상업과 금융의 중심지가 됐다. 광장에서 한 달에 한 번 꼴로 대규모 시장이 열린다.",
  },
  {
    name: "창이 사막정",
    content: "카린이 운영하는 주점. 중앙 통로에서 남정문으로 이어지는 흥행가에 있으며, 주변에 냄새와 바람이 찬 건물이 있어 반 지하층인 부분이 있다. 주점 카린은 거리 사정에 정통해 있으며, 특히 지하 도시에 관한 정보를 잘 모은다. 모험자들의 단골집으로, 숙박도 별도 요금으로 제공된다.",
  },
  {
    name: "중앙 시장 거리",
    content: "거리 중앙에 자리한 거대한 시장. 일용 식료품 등도 거래되고 있다. 지하에서 발굴된 각종 유물도 진열되는 곳이기도 하다. 캐러밴 광장으로도 이어지며, 상인과 모험자, 조드리아인의 유산에 흥미를 가진 귀족들도 자주 드나든다. 거리에서 일류 상인들이 여러 시간을 정한 거래 계약 토론을 열고 있으며, 늦은 교대로 상점이 입점한다.",
  },
];

const orgs: Org[] = [
  {
    name: "칼칸드 연합 회의",
    type: "정부 기관",
    base: "유목민 지구, 연합 회의소",
    leader: "산자니",
    content: "라세트 족장과 유력 상인들로 구성된 합의제. 단, 두앙 부족 전통의 유목민 우선 정신이 강하여, 유력 상인들도 발언권이 있다. 회의는 외교와 국내 행정 두 가지에 대해 장로들의 의견을 청취하는 형식이다. 기본적으로 킬드에 이의를 제기하는 일은 없지만, 칼칸드 자치의 특성도 지키려 한다.",
  },
  {
    name: "벨타자 캐러밴",
    type: "개인 상회",
    base: "상업구",
    leader: "벨타자",
    content: "7년 경력의 모험자인 벨타자라는 두앙의 남성이 이끄는 캐러밴. 캐러밴 대장이 됐으며 그 후 독자적인 사병 조직을 갖추고 있다. 교역 외에도 미스와 칼칸드를 오가는 정기편도 운행한다. 의뢰인의 안전을 최우선으로 하며, 아직까지 의뢰인 피해는 전무하다.",
  },
  {
    name: "칼칸드 용사단",
    type: "사병 조직",
    base: "상업구, 칼칸드 용사단 본부",
    leader: "마찰충 (摩擦衝)",
    content: "칼칸드의 상설 민간 병단 조직. 중심은 두앙 전사들이지만, 타 부족 인원도 다수 재적하고 있다. 거리 탐문 및 도시의 치안 유지 등을 주요 임무로 한다. 두앙 전통의 스타일과 강함으로 전투력은 기사단에 필적한다고 알려져 있다.",
  },
  {
    name: "진풍 용병대",
    type: "사병 조직",
    base: "도시 입구 근처, 진풍 용병대 병소",
    leader: '"도적 사냥 사무라이"라고도 불림',
    content: "지하 도시의 경비를 맡는 사병단. 동방에서 건너온 투사들로 구성되어, 사무라이 스타일 전투를 구사한다. 의리를 중시하는 이들로, 고용주가 계약을 준수하는 한 결코 주인을 배신하지 않는다.",
  },
  {
    name: "지하 도시 관리 협회",
    type: "정부 기관",
    base: "지하 도시 입구 근처",
    leader: "아프트·헤이니엔",
    content: "조드리아인의 지하 도시를 관리하는 협회. 무분별한 탐험자가 거리 지하 도시에서 위협을 가져오는 일이 늘었기 때문에, 지하 도시 출입에는 협회의 허가가 필요하다. 불법 탐험자는 체포된다.",
  },
];

const characters: Character[] = [
  {
    name: "산자니",
    role: "칼칸드 대표",
    age: "52",
    gender: "여",
    race: "두앙 (유각족)",
    hair: "갈색",
    eyes: "검은색",
    skin: "황갈색",
    content: "칼칸드를 대표하는 유목 여성. 지금은 물자 조달과 유통의 온화하고 여유로운 여성이다. 이전에는 모험자로서 지하 도시에서 발굴 활동을 했던 경험을 가진다. 오늘 갑자기 지하 도시에 나올 수 있다는 것도 있다. 지하 도시 탐험을 통해 많은 모험자나 상인과 접촉해 왔기 때문에 외부 사람들에게도 이해가 있다.",
  },
  {
    name: "아프트·헤이니엔",
    role: "칼칸드 유력 상인",
    age: "56",
    gender: "남",
    race: "휴린",
    hair: "검은색",
    eyes: "갈색",
    skin: "흰색",
    content: "칼칸드의 상인 대표. 상회의 규모라면 자신만큼은 어느 곳에도 지지 않는다고 자부하는 인물. 교역 면에서는 공정하면서 냉정한 평판을 얻고 있다. 장로 회의에도 얼굴이 있으며, 이익이 발생하는 사업에는 아집 없이 뛰어드는 면도 있어, 칼칸드에서 비즈니스를 하려면 반드시 그를 통해야 한다는 말도 있다.",
  },
  {
    name: "카린",
    role: '"창이 사막정" 점주',
    age: "38",
    gender: "여",
    race: "필보르",
    hair: "흰색",
    eyes: "적갈색",
    skin: "황갈색",
    content: "인사성 좋은 성격의 여성이다. 광대한 사막 생활을 이어온 필보르. 많은 모험자나 캐러밴과 관계를 맺고 있어, 거리의 사정에 정통하다. 사람이 드나드는 것에 익숙하고, 특히 칼칸드에서 사업을 벌이려면 그녀를 아는 것이 좋다고 알려져 있다. 돈에 눈이 밝아, 음식값 외에도 별도 요금을 청구한다.",
  },
  {
    name: "에우게니오스",
    role: "사무라이 요리사",
    age: "47",
    gender: "남",
    race: "두앙 (발톱족)",
    hair: "금발",
    eyes: "검은색",
    skin: "연갈색",
    content: "고대로부터의 대장부. 겉보기에는 날카로운 용병으로밖에 보이지 않지만, 사실은 출장 요리인이다. 조드리아인에 의해 전해진 전설 레시피를 구하려 탐색하고 있다. 더 맛있는 요리를 제공하기 위해 스스로 탐험에 나서는 강한 남자. 칼칸드에서 간신히 세심한 요리를 만든다.",
  },
  {
    name: "벨타자",
    role: "캐러밴 대장",
    age: "31",
    gender: "남",
    race: "두앙 (천익족)",
    hair: "연갈색",
    eyes: "담청색",
    skin: "황갈색",
    content: "벨타자 캐러밴의 대장. 원래는 모험자였지만, 캐러밴 대장으로 눈에 띈 후 독자 사업을 일으켰다. 교역 외에도 미스와 칼칸드를 오가는 정기편도 운행한다. 자신의 사병 조직을 가지고 있다. 의뢰인의 안전을 최우선으로 한다.",
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

function OverviewSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>칼칸드 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <SecTitle title="인구 구성" />
      <div style={{ marginBottom: 20 }}>
        {population.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 70, fontSize: "12px", color: "#555", textAlign: "right", flexShrink: 0 }}>{r.race}</span>
            <div style={{ flex: 1, background: "#EDE8DF", borderRadius: 4, height: 14, overflow: "hidden" }}>
              <div style={{ width: `${r.pct}%`, background: r.color, height: "100%", borderRadius: 4, opacity: 0.75 }} />
            </div>
            <span style={{ width: 36, fontSize: "12px", color: "#555", flexShrink: 0 }}>{r.pct}%</span>
          </div>
        ))}
      </div>
      <Prose text={"키르디아 공화국 남부, '무한의 사막'과 에린 산맥 사이에 위치하는 교역 도시. 산과 구릉이 솟은 고개가 있는 곳으로, 겨울에는 계곡이 한기와 혹한으로부터 지면을 보호해 주는 덕분에 지면이 얼지 않는 우수한 지형이다. 그 때문에 원래는 라세트 족이 유목 거점의 하나로 이용하고 있었다.\n\n라세트 족의 영지에 조드리아인의 지하 도시가 발견되어, 탐험자들이 이주하기 시작했다. 유적으로부터의 발굴물을 판매하기 위해 상인도 정착하게 되어, 거리는 교역 도시로 발전하게 됐다.\n\n칼칸드는 고대 유적의 발굴물 판매로 번성하고 있다. 많은 캐러밴이 거점을 두고 있으며, 지하 도시에서 발굴되는 황금을 비롯, 귀중한 물건들이 있기 때문에 시장은 연일 다수의 상인과 모험자로 성황이다. 거리는 자신들의 방위력을 스스로 유지하고 있다."} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"칼칸드의 거리는 에린 산맥 기슭의 계곡과 구릉 사이의 장소에 있다. 계곡 사이가 좁아서 여름에는 햇볕이 강하게 들지 않고, 겨울에는 계곡에서 한기를 막아 지내기 좋다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "16px 20px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#555" }}>{d.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {facilities.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{f.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#555" }}>{f.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrgsSection() {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT }}>{o.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}18`, color: ACCENT, padding: "2px 8px", borderRadius: 12, fontWeight: 500 }}>{o.type}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: 8 }}>본거지: {o.base}　·　대표자: {o.leader}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  return (
    <div>
      <Prose text={"여기서는 '황금의 거리' 칼칸드의 주요 인물을 소개한다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}18`, color: ACCENT, padding: "2px 8px", borderRadius: 12 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: "12px", color: "#888", marginBottom: 10, flexWrap: "wrap" }}>
              <span>종족: {c.race}</span><span>성별: {c.gender}</span>
              <span>나이: {c.age.includes("세") || c.age === "불명" ? c.age : `${c.age}세`}</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              {[["머리", c.hair], ["눈", c.eyes], ["피부", c.skin]].map(([lbl, val], j) => (
                <span key={j} style={{ fontSize: "11px", background: "#F5F0E8", color: "#666", padding: "2px 8px", borderRadius: 10 }}>{lbl}: {val}</span>
              ))}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KalkandPage() {
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
      case "overview":   return <OverviewSection />;
      case "structure":  return <StructureSection />;
      case "facilities": return <FacilitiesSection />;
      case "orgs":       return <OrgsSection />;
      case "people":     return <PeopleSection />;
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
        <a href="/kirdia" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 키르디아 공화국으로</div>
        </a>
        <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#703010", marginBottom: 6 }}>키르디아 공화국 · 교역 도시</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>"황금의 거리"<br />칼칸드</div>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>REPUBLIC OF KIRDIA · TRADING CITY</div>
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
