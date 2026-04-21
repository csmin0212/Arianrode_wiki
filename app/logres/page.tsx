'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A5F9E";
const ACCENT_LIGHT = "#D4E4F7";
const SIDEBAR_BG = "#141C24";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character { name: string; role: string; age: string; gender: string; race: string; hair: string; eyes: string; skin: string; content: string; }

const navItems: NavItem[] = [
  { id: "overview",   label: "불야의 거리 로그레스", icon: "🌙" },
  { id: "structure",  label: "거리 구조",            icon: "🏛️" },
  { id: "facilities", label: "주요 시설",            icon: "🏰" },
  { id: "orgs",       label: "조직",                icon: "⚜️" },
  { id: "people",     label: "로그레스의 인물들",    icon: "👥" },
];

const stats = [
  { label: "인구",      value: "50만명" },
  { label: "통치형태", value: "국왕이 임명한 시장에 의한 통치" },
  { label: "현재 수장", value: "로렌스·윈즈로트 (시장)" },
  { label: "종교",      value: "칠대신 신앙, 에를랑 신앙" },
  { label: "언어",      value: "공통어, 로그레스어" },
  { label: "기후",      value: "온난" },
  { label: "수입품",   value: "황금, 모직물, 석재, 향신료 등" },
  { label: "수출품",   value: "곡물, 식료품, 직물, 포도주, 출판물 등" },
];

const population = [
  { race: "휴린",   pct: 70, color: "#2A5F9E" },
  { race: "엘다난", pct: 22, color: "#5B4A7A" },
  { race: "네바프",   pct:  5, color: "#2A7A5E" },
  { race: "필보르",   pct:  1, color: "#7A5230" },
  { race: "바나",     pct:  1, color: "#9A3A3A" },
  { race: "두앙",     pct:  1, color: "#4A6A3A" },
];

const districts = [
  {
    name: "흰 벽 (제1구역)",
    content: "은령성을 지키는 산자수(霰石) 성벽. 궁정 소재지. 밤에 흰 인광(燐光)을 발하는 신비로운 벽. 본래 네바프들이 지하 시설로 통하기 위해 파 놓은 지하 도로의 지상부를 왕궁으로 이용하고 있다. 언뜻 예상치 못한 신비한 내부는 바람마저 통하는 공간이다.",
  },
  {
    name: "회색 성벽 (제2구역)",
    content: "귀족 계급과 도시 귀족의 저택이 줄지어 선 구역. 월광 거리도 이 구역에 위치한다. 밤이 되면 짙은 황색으로 빛나며 귀족들의 연회 소리로 가득 찬다. 오래된 성벽을 그대로 이용하고 있어 곳곳에 고대 면상의 조각이 남아있다.",
  },
  {
    name: "흙의 벽 (제3구역)",
    content: "국왕과 귀족이 보유한 방어력을 의지하여 로그레스 주변에 거주하던 이들이 스스로 비용을 들여 구축한 성벽. 그 놀라운 강도 때문에 '현자의 성벽'이라 불리기도 한다. 시민들이 거주하는 생활 구역.",
  },
];

const facilities: Facility[] = [
  {
    name: "은령성",
    content: "에를랑 왕가의 거처이자 국가 행정기관. 눈처럼 흰 돌로 지어진 성. 저녁에 주황빛으로 물드는 아름다움은 어린아이도 넋을 잃게 한다. 높은 성벽 위에 있는 무수한 성가퀴(흉벽)와 그것보다 두 배는 높은 시계탑처럼 보일 정도의 첨탑을 가진 내부 구조는 화려하다. 다만 거기에 출입하는 사람들이 국왕의 경호를 위해 간첩을 파견한다거나 한다면, 당연히 성내의 공기는 항상 긴장돼 있다.",
  },
  {
    name: "로그레스 대학",
    content: "거리 서부에 넓은 부지를 가진 학술기관. 신학·법학·의학·교양의 4학부를 갖추고, 전위 군사를 학습하기 위한 사관학교도 부설되어 있다. 대학을 중심으로 도시 내에 소형 학원 군이 형성되어, 이른바 '대학 도시'라 부를 정도로 학술 활동이 활발하다. 시민들이 '대학'이라 말할 때 로그레스 전 지역을 가리키는 경우도 많다. 거리 내 도서관은 늘 개방되어 있으며, 각 분야의 전문가들이 상주해 있어 모험자들의 힘이 되기도 한다.",
  },
  {
    name: "성 에를랑 대성당",
    content: "왕성에 인접하여 건립된 성부신전. 로그레스의 왕이 이 땅에 남긴 것으로 전해지며, 봉납 신전이 아닌 이 성 에를랑 대성당이 지어진 것은 에를랑이 처음이라는 설도 있다. 왕가와 성직자의 관계는 오랜 세월 동안 우호적이었지만, 케스트너와 그 추종자들의 감시 속에서 긴장이 감돈다.",
  },
  {
    name: "월광 거리",
    content: "거리 북쪽의 환락가. 술집, 극장, 도박장, 매음굴이 즐비하다. 항상 야간에 환락가가 되며, 밤에 빛나는 야광석 덕분에 화려하면서도 그늘이 진다. 귀족과 성직자도 공공연하게 다니며, 도시의 사교 정보를 얻는 장소이다. 모험자들 사이에서도 이 거리의 의사 조직과 교섭하거나 '제3구역으로 내려가는 것'을 '불을 건넌다'고 부른다.",
  },
];

const orgs: Org[] = [
  {
    name: "원탁의 기사단",
    type: "군사 조직",
    base: "은령성, 원탁의 방",
    leader: "루파스·라케슈",
    content: "국왕의 명령에 따르는 것을 대의로 하는 기사단. 단장 포함 3명의 간부는 비상시 에린딜에서도 손꼽히는 전투력을 가진 자들이라 전해진다. 단장 루파스는 국왕 수행 임무를 맡아, 현재 신성 반즈탄 제국에 대한 국경 경비에도 신경을 기울이고 있다.",
  },
  {
    name: "적지의 기사단",
    type: "군사 조직",
    base: "적지의 관",
    leader: "루시디티·윈슬렛",
    content: "에를랑 왕국의 상설군. 단장을 맡는 것은 대대로 윈슬렛 가의 장녀. 대를 거듭해 출전해 온 윈슬렛 가의 루시디티를 '적지의 벗'이라 부르는 목소리는 높고, 그녀를 섬기는 기사단의 사기 또한 높다. 현재는 신성 반즈탄 제국에 대한 국경 경비 및 왕도 수비를 맡고 있다.",
  },
  {
    name: "야미구미 (闇組)",
    type: "사병 조직",
    base: "불명",
    leader: "불명",
    content: "국왕과 귀족이 비밀리에 소유하는 사병 조직. 아무리 봐도 케스트너가 의뢰하는 단체가 틀림없지만, 케스트너는 절대 행동하지 않는다고 한다. 의뢰자는 자신의 '개인적인 친구'라는 모호한 말로 부른다.",
  },
  {
    name: "로그레스 학술협회",
    type: "학술 조직",
    base: "로그레스 대학",
    leader: "루뎃·리인",
    content: "학술 연구의 상호 부조와 연구 성과 공유를 목적으로 하는 단체. 왕도에 소재하는 이점을 살려 각지에서 정보 수집 및 연구 활동을 활발히 진행 중이다. 외부보다 5년 이상 앞선 지식과 기술을 보유한 자를 회원으로 받아들인다.",
  },
  {
    name: "녹토링",
    type: "범죄 조직",
    base: "불명",
    leader: "불명",
    content: "에를랑 최대 범죄 조직. 폭력 없이 야비한 방식으로 야간 활동에 특화되어 로그레스의 뒷세계를 장악하고 있다. 대규모 조직인 것은 알려져 있으나 내부 구조는 철저히 비밀에 부쳐진다. 뒷거래를 원한다면 '세계의 저편에서 좋은 사업'이라는 말을 통해 접촉할 수 있다는 소문이 있다.",
  },
];

const characters: Character[] = [
  {
    name: "엘13세",
    role: "에를랑 왕국 국왕",
    age: "71",
    gender: "남",
    race: "휴린",
    hair: "흰색",
    eyes: "파란색",
    skin: "흰색",
    content: "아들들이 사고나 병으로 전부 세상을 떠나 절망 속에서 후계자를 찾는 국왕. 허약하고 비탄에 잠겨 있으면서도 무언가를 보고 무언가를 느끼지만, 무엇도 할 수 없는 것처럼 보인다. 단, 왕녀 아나와 이야기하거나 작가 F·F·플렛처의 작품 이야기를 할 때만큼은 환하게 미소를 짓는다고 한다.",
  },
  {
    name: "아나",
    role: "에를랑 왕국 왕녀",
    age: "26",
    gender: "여",
    race: "휴린",
    hair: "금발",
    eyes: "파란색",
    skin: "흰색",
    content: "에라잔델 사건을 계기로 천진난만한 성격은 남아있으면서도 현실을 제대로 직시하게 됐다. '나'와 '사랑'을 다루는 것이 서투르지만, 다양한 지식을 익히려 노력하고 있다. 특히 용법에 관해서는 학자급이라 할 정도이며, 그 능력으로 원탁의 기사단 루파스에게 의뢰를 한 적도 있다고 전해진다.",
  },
  {
    name: "케스트너",
    role: "에를랑 왕국 왕제",
    age: "45",
    gender: "남",
    race: "휴린",
    hair: "갈색",
    eyes: "검은색",
    skin: "흰색",
    content: "방탕과 간계에 빠진 왕제. 엘13세를 물러나게 하려는 7인 왕위 후보 중 하나. 자신을 위험하지 않은 인물로 보이도록 특별한 역할을 연기한다. 아나 왕녀의 능력을 높이 평가하고 있으며, 자신의 자리를 빼앗길 수 있다는 것도 잘 알고 있다. 하지만 그래도 케스트너는 움직이지 않는다. 그렇게 생각하고 있는 것이다.",
  },
  {
    name: "베아트리스",
    role: "추기경",
    age: "37",
    gender: "여",
    race: "휴린",
    hair: "갈색",
    eyes: "검은색",
    skin: "흰색",
    content: "성 에를랑 대성당 책임자 중 하나. 엄격하고 깊이 있는 눈을 가진 관념적 이상주의자. 사물의 본질을 한눈에 꿰뚫어 보는 날카로운 눈빛을 지녔다. 왕 케스트너와 손을 잡는 것을 걱정하고 있지만, 현재 베아트리스 자신은 아직 행동하지 않는다고 생각하고 있다.",
  },
  {
    name: "루시디티·윈슬렛",
    role: "적지의 기사단장",
    age: "31",
    gender: "여",
    race: "휴린",
    hair: "금발",
    eyes: "주황색",
    skin: "흰색",
    content: "대대로 에를랑 왕국 상설 기사단장을 배출해 온 윈슬렛 가의 현재 당주. 기사로서의 탁월한 실력이 그녀를 뛰어나게 하며, 자부심 넘치는 공중 검법을 구사한다. 기사도 정신이 드높아 많은 이가 그녀를 아끼지만, 자신의 정의를 위해 냉철하게 움직인다. 그 격이 높아 많은 것을 알고 있기 때문에, 자신의 정의를 관철한다.",
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
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>로그레스 기본 데이터</div>
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
      <Prose text={"에린딜에서 가장 오래된 휴린 왕국인 에를랑 왕국의 왕도. 밤에는 야광석으로 아름답게 채색되어 '불야(不夜)의 거리'라는 이름으로 불린다. 단순히 역사가 깊을 뿐만 아니라 항상 새로운 문화를 받아들이며 시대를 초월해 온 왕도이다.\n\n이 거리가 건설된 곳은 '땅의 시대'에 네바프들이 번성한 지하 대로의 지상부이다. 현재의 로그레스 지하 부분 중 오래된 부분은 네바프들이 이용하던 지하 시설의 지상부이며, 통상의 오드돔과는 크게 다른 특이한 구조를 가진다.\n\n현재의 국왕 엘13세는 허약하지만 귀족들의 욕망 가득한 로그레스는 일에 열의 넘치는 곳이기도 하다. 모험자들에게도 귀족의 의뢰는 끝이 없다."} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"로그레스의 주민들은 멀리 옛날부터 전사로서의 피를 이어받고 있다. 그들이 건설한 로그레스는 거리이면서 당연히 구릉 요새(오드돔)로서의 기능도 갖추고 있다. 통상의 오드돔은 구릉 위에 방어용 높은 벽을 세운 구조이지만, 로그레스의 경우 이 구릉이 네바프들의 지하 도로에 분단된 지상부인 점이 통상의 오드돔과 크게 다른 특징이다."} />
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
      <Prose text={"여기서는 로그레스와 깊이 관련된 주요 조직을 소개한다. PC가 소속하거나, PC에게 의뢰를 행하거나, PC와 대립하는 조직으로서 시나리오에 등장시킬 수 있다."} />
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
      <Prose text={"여기서는 '불야의 거리' 로그레스의 주요 인물을 소개한다. PC의 의뢰인이나 협력자, 적대자 등으로 시나리오에 등장시킬 수 있다."} />
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
export default function LogresPage() {
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
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#506070", marginBottom: 6 }}>에를랑 왕국 · 왕도</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>"불야의 거리"<br />로그레스</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#405060", lineHeight: 1.6 }}>
          <a href="/erlan" style={{ color: "#607080", textDecoration: "none", fontSize: "11px" }}>← 에를랑 왕국으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>KINGDOM OF ERLAN · CAPITAL CITY</div>
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
