'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#7A5A9A";
const ACCENT_LIGHT = "#EDE8F5";
const SIDEBAR_BG = "#181420";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character { name: string; role: string; age: string; gender: string; race: string; hair: string; eyes: string; skin: string; content: string; }

const navItems: NavItem[] = [
  { id: "overview",   label: "온천의 거리 루네스", icon: "♨️" },
  { id: "structure",  label: "거리 구조",          icon: "🏘️" },
  { id: "facilities", label: "주요 시설",          icon: "🛁" },
  { id: "orgs",       label: "조직",              icon: "⚜️" },
  { id: "people",     label: "루네스의 인물들",    icon: "👥" },
];

const stats = [
  { label: "인구",      value: "1만5천명" },
  { label: "통치형태", value: "영주제" },
  { label: "현재 수장", value: "에벤톤·슈펜거 (백작)" },
  { label: "종교",      value: "칠대신 신앙, 에를랑 신앙" },
  { label: "언어",      value: "공통어, 로그레스어" },
  { label: "기후",      value: "온난" },
  { label: "수입품",   value: "식료품, 모직물, 직물, 포도주, 특수 식재 등" },
  { label: "수출품",   value: "목재, 출판물, 토산물(온천의 원) 등" },
];

const population = [
  { race: "휴린",   pct: 90, color: "#2A5F9E" },
  { race: "엘다난", pct:  5, color: "#5B4A7A" },
  { race: "네바프",   pct:  4, color: "#2A7A5E" },
  { race: "기타",     pct:  1, color: "#888" },
];

const districts = [
  {
    name: "루네스 북구",
    content: "슈펜거 백작이 온천 정령과 계약하여 이 세상에서는 불가능한 몇 가지의 고급 온천이 공존하는 구역. 북구에 '배치'된 온천은 '황산수형'으로, 지하 깊은 곳에서 상승한 고온의 지하수와 지표수가 혼합된 온천이다.",
  },
  {
    name: "루네스 남구",
    content: "보통의 지하수가 지열에 의해 따뜻해진 온천이 위치한다. 성분에는 탄산칼슘, 탄산수소마그네슘을 함유하는 경우가 많다. '화석수형' 온천으로, 상처 치유를 위해 찾는 자도 많다.",
  },
  {
    name: "루네스 서구",
    content: "카난의 기술자 분석에 따르면, 서구의 온천은 메탄가스 혹은 탄산가스가 지하수에 혼입되어 온천이 된 '분기형' 온천이 많다. 독특한 향이 감돌며 미용 효과가 높다고 알려져 있다.",
  },
  {
    name: "루네스 동구",
    content: "온천 정령에 의해 이끌린 지하 해수가 열수와 혼합된 '화석수형' 온천. 별칭 '식염천'으로 불린다. 살균력이 강하여 상처 치유에도 효과가 있어 찾는 자가 많다.",
  },
  {
    name: "루네스 정상",
    content: "이전에 성이 있던 루네스 정상에 '배치'된 공공 욕장·온천. 향이 나는 것은 지금 없지만, 그래도 오래된 그리움 같은 것을 떠올리게 하는 성벽 밖에 위치하며, 황화천이다. 시민, 여행자를 불문하고 무료로 개방된다.",
  },
];

const facilities: Facility[] = [
  {
    name: "에를랑 대욕장",
    content: "루네스가 구릉 요새였던 시절, 그 구릉 위에 슈펜거 가문의 성이 있었다. 하지만 온천 정령과 계약한 조건으로 성의 위치를 한 단 낮추고, 온천 위의 것을 모두 공공 욕장으로 개조하게 됐다. 이것이 에를랑 대욕장이다. 시민과 관광객 모두에게 인기 있는 당대 슈펜거 백작도 사랑하는 꿈의 욕장.",
  },
  {
    name: "루네스 성문",
    content: "아침 일찍 에를랑 대욕장를 바라보는 각도에서, 태양이 비치는 방향으로 보이는 자는 항상 신분 상관없이 무기를 지닌 채 가벼운 몸으로 거리에 들어온다. 여기는 치유를 위한 장소이며, 대대로 슈펜거 가문이 무기 소지를 금지하는 약속을 지킬 수 있었다.",
  },
  {
    name: "브루켄하트 토산물점",
    content: "성문에서 가장 가까운 대로에 가게를 열고 있는 토산물 상점. 에린 지방의 풍경을 그린 패브릭과 에린 농업용 가사용 상품은 물론, 목욕 수건이나 온천 거리용 소품도 취급한다. 가게를 운영하는 요제프·브루켄하트는 원래 작은 잡화점을 운영하다 목욕 수건에 집중하여 사업을 키워, 지금은 거리에서 가장 큰 토산물 상점이 됐다.",
  },
  {
    name: "바덴베르크 인쇄점",
    content: "온천 보양지로 유명한 루네스지만, 사실 알 사람은 아는 석판 인쇄의 발상지이기도 하다. 약 100년 전, 대리석으로 네모꼴 인쇄를 개발한 것이 이 도시 거주 바덴베르크였다. 현재도 그 아틀리에 겸 인쇄점이 운영되고 있다. 석판 인쇄로 찍은 최신 지도도 취급하여 모험자들이 찾는 명소가 됐다.",
  },
];

const orgs: Org[] = [
  {
    name: "문스타 예단",
    type: "흥행 조직",
    base: "동구, 문스타 예단 극장",
    leader: "미라르나",
    content: "행진 궤도도 가지는 잡예단. 원래 떠돌이 극단이었지만, 입체적인 예술을 발현하기 위해 대형 텐트를 사들인 미라르나는 지금도 공연 배치를 연구하고 있다. 여러 차례에 걸쳐 새 단장으로 갈반이 취임했다.",
  },
  {
    name: "루네스 자경단",
    type: "군사 조직",
    base: "남구, 루네스 자경단 본부",
    leader: "갈반",
    content: "문자 그대로 온천 도시를 자치적으로 지키는 자경단. 자방적인 온천 도시에 대한 경계가 강하다. 무기 제한으로 대처할 수 없는 상황을 걱정한 강인하고 의리심 깊은 새 단장 갈반이 취임했다.",
  },
  {
    name: "루네스 온천 동업조합",
    type: "상인 조직",
    base: "북구",
    leader: "온천 정령인",
    content: "두 가지 목적을 가진 조합. 하나는 온천을 중심으로 한 관광, 요양지를 더욱 발전시키는 것. 또 하나는 에를랑 왕국 전역의 온천 자원 개발자(온천 탐험가)를 모아 대항하는 것이다.",
  },
  {
    name: "에린 삼림 관리단",
    type: "정부 기관",
    base: "동구",
    leader: "더글라스·레드우드",
    content: "영지의 약 1/3이 삼림 지대인 에를랑에서는 숲에 이용 가치가 높은 침엽수 대삼림이 있다. 이에 전문 삼림 관리 단체를 조직하여 슈펜거 백작과 함께 계획적인 삼림 관리를 행하고 있다.",
  },
  {
    name: "슈펜거 수도 사무소",
    type: "정부 기관",
    base: "북구",
    leader: "아니오·베타스",
    content: "공공 수도 시설의 관리를 담당하는 사무소. 루네스에서는 음료수뿐만 아니라 온천수로 야외 분수도 만들어 어디서나 수도가 필요하다. 어떤 상황에도 신속히 대응하기 위해 전문 연금 기사를 교대로 배치하고 있다.",
  },
];

const characters: Character[] = [
  {
    name: "에벤톤·슈펜거",
    role: "슈펜거 백작",
    age: "50",
    gender: "남",
    race: "휴린",
    hair: "갈색",
    eyes: "초록색",
    skin: "흰색",
    content: "현직 슈펜거 백작. 온화한 성격의 인물로, 신분에 의한 오만함이 없는 대인 관계를 가진다. 자타공인 온천 애호가. 루네스의 거리를 사랑하며, 그 수호와 발전을 위해서라면 노력을 아끼지 않는다. 현재는 새로운 온천을 찾아내기 위해 정령과의 교섭을 추진하고 있다고 한다.",
  },
  {
    name: "F·F·플렛처",
    role: "인기 작가",
    age: "28",
    gender: "남",
    race: "휴린",
    hair: "금발",
    eyes: "파란색",
    skin: "흰색",
    content: "스파이 소설이 히트한 인기 작가. 그와 그의 친구들이 루네스에 온 것은 여기가 창작과 연기의 거리이기 때문이다. 사실 그의 정체는 외설적인 스파이이며, 루네스 외부로부터의 공략전을 펼치고 있다는 설도 있다. 팬인 국왕 엘13세가 신작을 학수고대하고 있다.",
  },
  {
    name: "플레이즈",
    role: '"청의 선정" 점주',
    age: "23",
    gender: "여",
    race: "휴린",
    hair: "빨간색",
    eyes: "갈색",
    skin: "흰색",
    content: "사고로 죽은 아버지의 가게를 이어받아 14세부터 가게 주인이 됐다. 밤새 생존한 4년간, 손님의 눈에 띄이는 것을 거의 알아보지 못하게 됐다. 목소리가 크고 애정이 넘치지만 사랑받고 있다는 것은 잘 모른다. 다만 가게 운영 실력만큼은 확실히 인정받고 있으며, 손님들의 마음을 편안하게 해준다.",
  },
  {
    name: "갈반",
    role: "루네스 자경단장",
    age: "30",
    gender: "남",
    race: "두앙 (유각족)",
    hair: "검은색",
    eyes: "검은색",
    skin: "흰색",
    content: "이 자경단의 신임 단장. 항상 앞을 향한 굳은 의지를 가진 인물. 의리심이 깊고 사람에게 주먹을 던질 정도의 강인한 남자다. 여성에게는 한쪽 눈으로 볼 수밖에 없다. 남성들로부터 '날카롭다'고 일컬어지고, 여성들에게는 '귀엽다'고 불린다. 남녀 간 문제의 최전방에 서는 역할을 맡는 것이 고민이다.",
  },
  {
    name: "사비네",
    role: "문스타 예단 댄서",
    age: "26",
    gender: "여",
    race: "버나 (묘족)",
    hair: "빨간색",
    eyes: "파란색",
    skin: "흰색",
    content: "불꽃이 타오르는 듯한 벨리댄스를 추는 무용수. 지금은 문스타 예단에 소속되어 있다. 보통은 무표정하게 연기하지만, 춤출 때는 태양처럼 빛나는 미소를 보인다. 이질적으로 술에 취하지 않는 체질이며, 그녀를 취하게 하려는 남성은 지금까지 세 명이라고 한다.",
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

// ---- 섹션 컴포넌트 ----
function OverviewSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>루네스 기본 데이터</div>
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
      <Prose text={"온천이나 샘, 용출 형식의 구분만 해도 80가지를 넘는 수많은 온천을 보유한 '백탕(百湯)'이라 불리는 온천 마을로, 입욕이 주요 산업인 거리.\n\n원래는 에린딜의 휴린들이 목욕 좋아하는 국민인 덕에, 몸을 씻는 것을 게을리하지는 않지만, 온천은 그냥 뜨거운 물이 아니다. 루네스는 원래 경관과 전망을 관광 자원으로 하는 거리였지만, 온천 개발을 시도하면서 20종류 이상의 형식이 다른 온천이 발견되어 온천이 주된 시설이 됐다.\n\n현재는 에린딜 최대의 요양지로 발전하고 있다. 슈펜거 백작 가문이 대대로 이 거리를 다스리고 있으며, 현재의 에벤톤·슈펜거 백작 역시 루네스 발전에 열정을 기울이고 있다."} />
      <div style={{ background: "#F5F0E8", border: "1px solid #E0D8CC", borderRadius: 8, padding: "14px 18px", marginTop: 16, fontSize: "13px", color: "#555", lineHeight: 1.8 }}>
        <strong style={{ color: ACCENT }}>※ 무기 반입 금지</strong><br />
        슈펜거 백작령에서는 치유의 마을임을 이유로 무기를 소지한 채 들어가는 것을 금지하고 있다. 모험자라도 마찬가지로 무기를 맡겨야 한다. 신전도 그 예외가 아니며 신관조차 호신용 무기 소지에 대한 제한이 있다.
      </div>
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"루네스의 거리는 왕도와 같이 구릉 요새가 변화하여 도시화된 것으로, 이 시대에 많이 보이는 거리의 형태이다. 다만 현재는 구릉 위 성에서 아래가 아닌, 공공 욕장인 구조가 특이한 면모를 보인다."} />
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
      <Prose text={"여기서는 루네스와 깊이 관련된 주요 조직을 소개한다. PC가 소속하거나, PC에게 의뢰를 행하거나, PC와 대립하는 조직으로서 시나리오에 등장시킬 수 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
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
      <Prose text={"여기서는 '온천의 거리' 루네스의 주요 인물을 소개한다. PC의 의뢰인이나 협력자, 적대자 등으로 시나리오에 등장시킬 수 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}18`, color: ACCENT, padding: "2px 8px", borderRadius: 12 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: "12px", color: "#888", marginBottom: 10, flexWrap: "wrap" }}>
              <span>종족: {c.race}</span>
              <span>성별: {c.gender}</span>
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

// ---- 메인 컴포넌트 ----
export default function RunesPage() {
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
        <a href="/erlan" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 에를랑 왕국으로</div>
        </a>
        <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#604870", marginBottom: 6 }}>에를랑 왕국 · 슈펜거 백작령</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>"온천의 거리"<br />루네스</div>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>KINGDOM OF ERLAN · COUNTY OF SHUPENGGAR</div>
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
