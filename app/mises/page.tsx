'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#9B7014";
const ACCENT_LIGHT = "#F5E8C0";
const SIDEBAR_BG = "#1C1608";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character { name: string; role: string; age: string; gender: string; race: string; hair: string; eyes: string; skin: string; content: string; }

const navItems: NavItem[] = [
  { id: "overview",   label: "새로운 거리 미스", icon: "🌵" },
  { id: "structure",  label: "거리 구조",         icon: "🏛️" },
  { id: "facilities", label: "주요 시설",         icon: "🏟️" },
  { id: "orgs",       label: "조직",             icon: "⚜️" },
  { id: "people",     label: "미스의 인물들",     icon: "👥" },
];

const stats = [
  { label: "인구",      value: "5만명" },
  { label: "통치형태", value: "장로에 의한 합의제" },
  { label: "현재 수장", value: "킬드 (공화국 주석 겸임)" },
  { label: "종교",      value: "칠대신 신앙 (그란아인 주봉)" },
  { label: "언어",      value: "공통어, 고두앙어" },
  { label: "기후",      value: "사막 기후" },
  { label: "수입품",   value: "곡물, 식료품, 섬유물, 목재, 귀금속, 광석 등" },
  { label: "수출품",   value: "모직물, 소금, 희소 생물, 두앙 제조물 등" },
];

const population = [
  { race: "두앙",     pct: 90, color: "#8B5A14" },
  { race: "휴린",   pct:  7, color: "#2A5F9E" },
  { race: "필보르",   pct:  2, color: "#7A5230" },
  { race: "기타",     pct:  1, color: "#888" },
];

const districts = [
  {
    name: "중앙구",
    content: "킬드가 신탁을 받은 성지가 있는 구역. 그란아인 신전을 필두로 7대신 신전이 모두 이 구역에 위치한다. 신전 주변에는 행정 관련 중요 시설이 세워져, 도시의 모든 주민에게 영혼의 안식처가 되기도 한다. 신전 주위에는 건국 기념 공원도 있어 녹지 공간으로 가꿔져 있다.",
  },
  {
    name: "4개의 대로",
    content: "거리 중앙의 신전에서 뻗는 4개의 대로가 미스의 주요 가로이다. 북서쪽은 전사의 거리로 훈련장과 기사단 시설이 늘어서 있고, 북동쪽은 교역의 거리로 상점과 교역소가 밀집해 있다. 남동쪽에는 씨족 거주지가 자리하며, 남서쪽 중앙 통로는 시민들의 일상 생활과 연결된다.",
  },
  {
    name: "두 개의 정문",
    content: "거리 북동쪽과 남서쪽에 동정문(東正門)과 남정문이 있다. 동정문은 사막을 넘어 동방에서 오는 여행자들의 입구이며, 남정문은 서방으로 이동하는 이들이 들어오는 관문이다. 두 문 사이에는 여행자의 숙소, 행인이 자주 들르는 교역소나 상회 본부가 대로 상업가를 이루고 있다.",
  },
];

const facilities: Facility[] = [
  {
    name: "미스 신전",
    content: "거리 중심에 세워진 신전. 킬드가 그란아인의 신탁을 받은 것으로 알려진 성지이며, 그 주변 성역이 미스 건설의 출발점이다. 미스 신전은 주로 그란아인을 봉납하지만, 파리스 동맹의 신전을 참고하여 7대신 신전이 모두 병설되어 있어 다른 신들도 함께 모신다. 신전 주위에는 모험자들의 숙박지 및 의뢰처가 있다.",
  },
  {
    name: "미스 유적",
    content: "미스의 대지가 된 고대 도시 유적. 일반에는 잘 알려져 있지 않지만, '물의 시대'의 것으로 추정되는 유적으로, 수십 년 전부터 탐험이 이루어지고 있다. 지하에 어마어마한 지하 도로가 발견되어 있으며, 현재 그 지하 도로가 어떤 것인지 아직 밝혀지지 않았다. 지표 위와는 달리 지하에는 낙타나 안데드 등의 위험한 생물이 출몰한다.",
  },
  {
    name: "동정문 광장",
    content: "미스 동쪽의 관문. 동방 교역의 거리와 이어지는 중요한 관문이 되어 있다. 유사시에는 키르디아 기사단 본부가 광장으로 나와 경비를 강화한다. 광장에는 상인과 모험자가 물건을 사고파는 시장이 서고, 동방에서 가져온 희귀한 상품과 유적 발굴품이 거래된다.",
  },
  {
    name: "사막의 토끼집",
    content: "미스 신전에서 남정문으로 이어지는 중앙 흥행가에 있는 주점. 주변에는 최근 젊은 필보르 여성을 목격하는 사람이 늘고 있다. 낮에는 손님이 적지만, 해 질 무렵부터는 사람이 많이 모인다. 주점 마스터인 클리거는 유각족의 두앙. 온후한 인품에 지지 않는 강인함을 가지고 있다.",
  },
];

const orgs: Org[] = [
  {
    name: "키르디아 장로 회의",
    type: "정부 기관",
    base: "수도, 장로 회의소",
    leader: "킬드",
    content: "키르디아 공화국의 최고 정치 기관. 대표자는 킬드. 주로 각 부족의 족장들로 구성된다. 회의는 수정 텔레크루스에 의해 원격으로도 진행된다. 현재 킬드가 공화국 주석으로서 회의를 이끌지만, 각 부족 족장의 발언권도 크다. 대의는 에린딜 서방 전체의 두앙 민족 자립과 자기 방위다.",
  },
  {
    name: "키르디아 기사단",
    type: "군사 조직",
    base: "동정문 광장, 기사단 회관",
    leader: "반드",
    content: "에린딜 최대의 상설군. 단장 반드는 매우 신중한 두앙 남성이다. 본부는 동정문 광장에 있으며, 구성원은 주로 두앙 전사들이다. 예의 바름에 관해서는 다른 국가에서도 칭찬이 자자하며, 혹독한 훈련을 거듭한다. 단원 중에서도 능력이 뛰어난 자는 킬드를 국왕 호위대로서도 수행하기도 한다.",
  },
  {
    name: "사막의 여우",
    type: "모험자 길드",
    base: "남구 광장, 사막의 토끼집",
    leader: "다이슈",
    content: "'무한의 사막'을 중심으로 활동하는 모험자 길드. 미스를 거점으로 사막 탐험을 행하고 있다. 미스 유적의 탐험도 의뢰를 받아 진행한다. 파리스 동맹의 모험자 길드보다 규모는 크지 않지만, 사막 탐험에 관해서는 전문성이 높다. 사룡 사냥에도 대응하며 주목받는 길드로 성장하고 있다.",
  },
  {
    name: "사룡 수렵단",
    type: "사병 조직",
    base: "상업구, 암석 주거",
    leader: "수르리야",
    content: "미스에 있는 사룡 수렵 전문 사병 조직. 사드웜 사냥은 위험하기 때문에 마법과 근접전을 병용하는 대규모 전투가 필요하다. 수르리야는 동방으로 이동할 때도 사막 전투를 활용하는 한 명이다. 사드웜 사냥에 위험하기 때문에 마법과 용병 고용이 잦다. 사룡 수렵단은 광장에서 의뢰를 받는다.",
  },
  {
    name: "동방 통상 연합",
    type: "상인 조합",
    base: "남구 광장",
    leader: "글라스",
    content: "사막의 캐러밴 상호 조합. 동방 세계와 에린딜를 연결하는 유일한 교역로, '무한의 사막'으로부터 동방의 나라들과 무역 통로의 개척 및 유지를 행하고 있다. 수송 수단인 낙타와 당나귀의 보호 정책도 취하고 있다. 동방 교역상인들을 많이 보호하는 정책을 취하고 있어, 미스의 상인 및 여행자의 동반자도 된다.",
  },
];

const characters: Character[] = [
  {
    name: "킬드",
    role: "키르디아 공화국 주석",
    age: "45",
    gender: "남",
    race: "두앙 (유각족)",
    hair: "검은색",
    eyes: "검은색",
    skin: "황갈색",
    content: "키르디아 공화국의 건국자이자 현 주석. 원래는 병사였으며, 동료들과 연대하여 건국에 이바지했다. 무력을 사용하지 않고 끈질긴 교섭으로 주변 각 부족을 아군으로 만들었다. 한편 '고대의 유목 생활 방식'을 고수하고 있어, 유목 문화에 애착이 강하다. 반즈탄 제국에 대한 경계는 게을리하지 않고, 반(反)킬드파에 대한 대응에도 고심하고 있다.",
  },
  {
    name: "하리두르",
    role: "키르디아 주석 보좌",
    age: "42",
    gender: "남",
    race: "휴린",
    hair: "검은색",
    eyes: "검은색",
    skin: "황갈색",
    content: "킬드의 참모 역할이자 외교 담당. 무력으로 국가를 유지할 수 없다고 킬드에게 진언한 인물이기도 하다. 독특한 재주로, 속국 중 하나의 최강자인 킬드에게 진언한 자다. 최근 요마와 마족의 활성화에 주목하여, 파리스 동맹의 움직임에 눈을 기울이고 있다. 자신의 영향력을 손에 넣으려 하고 있다.",
  },
  {
    name: "반드",
    role: "키르디아 기사단장",
    age: "44",
    gender: "남",
    race: "두앙 (아족)",
    hair: "금발",
    eyes: "검은색",
    skin: "황갈색",
    content: "키르디아 기사단의 단장. 킬드가 신뢰하는 가장 신중한 두앙 남성. 함부로 얼굴 표정을 드러내는 경우는 없지만, 동료들과 다툼이 발생할 경우에는 틀림없이 단체를 수습한다. 평화를 열망하지만, 악을 세상에서 몰아낸다는 강한 열망도 가지고 있다.",
  },
  {
    name: "헤레인",
    role: "미스 신전 신관장",
    age: "39",
    gender: "여",
    race: "엘다난",
    hair: "금발",
    eyes: "파란색",
    skin: "흰색",
    content: "키르디아가 미스를 건설하는 때 협력한 신관. 미스 신전의 신관장을 맡는다. 킬드의 오랜 친구 중 하나로, 용병 경험도 있다. 전사로서의 측면도 있어 후배들의 훈련에도 힘을 쏟는다. 반(反)킬드파의 반응에 주목하고, 이에 대한 안전 유지에 힘쓴다.",
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
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>미스 기본 데이터</div>
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
      <Prose text={"미스는 역사의 전쟁에서 킬드가 국가를 일으키면서, 수도로 삼기 위해 사막의 토지에 세워진 거리다. 키르디아 공화국과 마찬가지로, 역사는 아직 20년밖에 안 되어 완성이라 부를 수 없을 정도지만, 이미 10년은 지났으니 역사라고도 할 수 있다. 지금 미스가 있는 곳에는 '땅의 시대'의 것으로 보이는 고대 도시의 흔적이 있었다.\n\n미스는 '새로운 거리'라는 별명이 보여주듯, 두앙 부족민들 사이에서 '새로운 거리'라고 불린다. 거리는 주인공 킬드가 신탁을 받았다고 하는 성지를 기점으로 발전했다. 그란아인의 계시를 이해한 킬드는, 이 땅에 그란아인의 신전을 설치하고, 키르디아 국가를 하나로 이을 것을 선포했다.\n\n거리의 건물 대부분은 햇볕에 말린 흙 벽돌로 만들어졌으며, 지역 내 건물에는 이따금 특이한 무늬가 새겨져 있다. 수리·보수가 쉬운 것 때문에 지금도 건물은 오래가지 않는다. 현재 미스는 새 도시지만 건물이 낡아가는 속도가 빠르다."} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"미스의 거리는 주신 킬드가 신탁을 받은 성지를 발점으로 한다. 그 성지를 성지로 삼고, 제단의 주변에 신전이 건립되어, 더 그 주변에 방사형으로 거리가 펼쳐진다."} />
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
      <Prose text={"여기서는 미스와 깊이 관련된 주요 조직을 소개한다."} />
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
      <Prose text={"여기서는 '새로운 거리' 미스의 주요 인물을 소개한다."} />
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

export default function MisesPage() {
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
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#806010", marginBottom: 6 }}>키르디아 공화국 · 수도</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>"새로운 거리"<br />미스</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#504010", lineHeight: 1.6 }}>
          <a href="/kirdia" style={{ color: "#907020", textDecoration: "none", fontSize: "11px" }}>← 키르디아 공화국으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>REPUBLIC OF KIRDIA · CAPITAL CITY</div>
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
