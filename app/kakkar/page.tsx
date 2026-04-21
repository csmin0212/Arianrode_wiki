'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#1A5A7A";
const SIDEBAR_BG = "#040C18";

const navItems = [
  { id: "overview", label: "캇카르 개요",  icon: "🌊" },
  { id: "city",     label: "도시 구조",    icon: "🏙️" },
  { id: "orgs",     label: "조직",         icon: "🐟" },
  { id: "people",   label: "인물",         icon: "👤" },
];

function Prose({ text }: { text: string }) {
  return <p style={{ fontSize: "14px", lineHeight: 2, color: "#444", margin: "0 0 16px" }}>{text}</p>;
}

function SecTitle({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0 12px" }}>
      <div style={{ width: 4, height: 20, background: ACCENT, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>{title}</div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div>
      <Prose text={"에린딜 대륙과 마제라니카 대륙의 사이 바다 밑에는, 「해저 도시」 캇카르라 불리는 도시 국가가 있다. 그 도시에는, 언어를 해독하고 문명을 갖추고, 사하긴이라 불리는 어민이 살고 있다."} />
      <SecTitle title="개요" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { label: "인구", value: "1만인 (사하긴 거의 100%)" },
          { label: "통치 형태", value: "입헌 군주제" },
          { label: "현 수장", value: "아프칼루 7세 (국왕)" },
          { label: "종교", value: "리아르 신앙" },
          { label: "언어", value: "사하긴어" },
          { label: "기후", value: "아열대 수중" },
          { label: "수입품", value: "철·강·구리·식료품" },
          { label: "수출품", value: "어개분·장식품 소재·진주·해저 유물·액체 연료" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <SecTitle title="역사" />
      <Prose text={"캇카르는, 마제라니카 대륙 북쪽 해안에 세워져 있다. 거주민은 사하긴 뿐이지만, 드물게 교역이나 관광 목적의 인간이 방문한다. 사하긴들의 선조는, 마제라니카 대륙의 강이나 늪에 서식하는 어족——「뼈를 가진 자들」이라 한다. 그들은 500년여 전, 길만에게 혼란과 교란을 받아 대해로 빠져나가, 「해의 신」 리아르에 구원을 호소했다."} />
      <Prose text={"리아르는 가호를 받은 사하긴들의 선조를, 길만으로부터 도망치는 것에 성공하게 해 주었다. 그리하여, 대해의 깊은 곳에 사하긴들은 자신들의 땅을 찾아내고, 해수면 아래 200m 정도의 장소에 도시 캇카르를 구축했다."} />
      <SecTitle title="현황" />
      <Prose text={"긴 세월을 걸쳐 사하긴들은 늘어나, 각지에 수많은 해저 도시를 세웠다. 그러나 최초의 도시인 캇카르는, 가장 번성한 해저 도시로 알려져 있다. 캇카르는 다른 해저 도시들과의 교류를 수행하는 상업지이기도 하다. 동시에, 마제라니카 대륙에 있는 길만과의 싸움을 촉진하기 위한 군의 거점이기도 하다."} />
      <Prose text={"특히 육상의 인간들과의 경제적·군사적 연락을 중시하고 있으며, 적극적으로 육상으로부터 손님을 초대하는 등, 다양한 시도가 행해지고 있다. 주요 산업은 심해로 향해 채굴되는 해산물과, 마제라니카 해안의 화산 근처에서 채굴되는 다양한 금속 가공이다."} />
    </div>
  );
}

function CitySection() {
  const districts = [
    { name: "행정구", desc: "도시 중심부에서, 행정에 관련된 기관이나 건물이 집중하고 있다. 왕의 궁전이나 관리들이 모이는 집회 장소, 사하긴이 신앙하는 「해의 신」 리아르를 모시는 신사, 육상으로부터 초대된 이방인들이 모이는 이방인관도 모여 있다." },
    { name: "상업구", desc: "행정구에 인접하는 구역. 사하긴들의 주요 상업이 이루어지며 육상 또는 타 해저 도시로부터 가져오는 물품을 취급하는 교환 장소이기도 하다." },
    { name: "거주구", desc: "거리의 대부분을 차지하는, 도시 시민들의 생활 장소. 일반적인 사하긴의 주거는, 석재나 암반 속에 공동을 뚫어 만들어진 개인 공간과 인접한 교류 공간이 세트가 되어 있는 구조다." },
    { name: "군사구", desc: "거리 남쪽에는 군사 시설이 많다. 사하긴 병사들의 훈련소, 전쟁에서 활용되는 이르카와 가자마구로의 사육장, 전망탑과 해상 탐색 기지, 작전 본부 등이 존재한다." },
    { name: "지하 블록", desc: "해병을 파고 들어가 도시 지하로 파내려간 공업 구역. 공기가 있는 구역도 있으며, 무기를 비롯하여 모든 금속 가공이 행해지는 공방과, 그리고 연금술의 연구소가 이 장소에서 이루어진다." },
  ];
  const facilities = [
    { name: "캇카르 궁전", desc: "거리 중앙부에 있는 왕의 거처. 무골의 석재가 몇 겹이나 겹쳐 쌓여, 작은 산처럼 된 건축물로, 거리 일대에서 압도적인 크기를 자랑한다. 관문이나 해조류가 암반에 우거져 있어, 곳곳에 날카로운 바위의 돌출이 건물의 입구가 되어 있다." },
    { name: "에엔그라", desc: "거리 중심부에 있는 신전. 해와 바람의 신 리아르를 모시는, 대암석으로 만들어진 에엔그라라 불리는 건물 중에, 예배실이나 기도실·신관실 등이 있다. 도시 시민들이 일상적으로 참배하는 장소인 동시에, 관광지이기도 하다." },
    { name: "해저 거신상", desc: "리아르 신을 모델로 만들어진 정교한 대형 조각상. 높이 70m에도 미치는 크기로, 사하긴들의 대부분이 그 크기를 실감하고, 진지하게 정면을 마주하는 것이 청산하게 됐다. 군사구에 세워진 이 상은, 해류를 관측하고 외부를 감시하는 첨탑의 역할도 겸하고 있다. 내부에는 몇 개의 열린 공간이 있어, 그 안에서 근무하는 자들의 집무실·왕의 침실·왕의 접견실 등에 할당되고 있다." },
    { name: "고래 정박소", desc: "바다를 자유로 헤엄칠 수 있는 자들에게는, 거리에는 도시 전체를 에워싼 반구형의 지도를 따라 넓게 구획이 잡혀, 거리에 있는 고래들의 유영 공간으로 사용되고 있다. 거리 중앙에는 연이라 불리는 살아있는 것 같은 잠수 殿堂가 있다. 사하긴은 대형 마제라니카구의 입구에서 고래에게 인사를 건네는 풍습이 있어 육상에서 오는 인간들에게는 이 고래들이 정박소로 견인하는 관광선이기도 하다." },
  ];
  return (
    <div>
      <SecTitle title="5개 구역" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginTop: 8 }}>
        {facilities.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{f.name}</div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrgsSection() {
  const orgs = [
    { name: "캇카르 궁정", type: "정부 조직", base: "캇카르 궁전", leader: "아프칼루 7세", content: "캇카르를 다스리는 행정 기구. 장로들이 서로 상담하고, 최종적인 결론은 아래에서 구의 행정이 이루어진다. 국왕은 후대에 영리하다고 알려지는 현명한 왕으로 불린다. 적극적으로 땅에서 오는 인간의 부담을 경감하려 하여, 육상과의 교류를 이끌고 있다." },
    { name: "서방 신전 캇카르 교구", type: "종교 조직", base: "에엔그라", leader: "타라트", content: "캇카르에 있는 서방 신전의 거점. 하지만 여기서는 오히려 신전이 건설되어 있다는 쪽으로서 있어, 도시의 외곽에서 종교 시설이라기 보다는, 관청처럼 편안한 통로의 거리가 되고 있다. 주변에는 여행자 숙소들도 있고, 외부에서 도시로 와서 탐험자들에게도 이용되고 있다." },
    { name: "캇카르 수군", type: "군사 시설", base: "수군 기지", leader: "문무레우슈", content: "캇카르의 군족을 장악하고 절단하는 어민이다. 왕의 종복에 해당하는 무인. 극한의 솜씨는 거리 안에서 높은 평가를 받고 있다. 냉담하고 신중한 성격이지만, 토벌 길만에게 향하는 정열은 비할 데가 없다. 도시의 안전과 방어를 굳히기 위해 활동하고 있다." },
    { name: "이기기의 공방", type: "개인 공방", base: "지하 블록", leader: "이기기", content: "캇카르의 지하에 만들어진 공동 속에서, 금속 가공을 하는 공방이다. 이기기와 그 이름을 따른 나마즈 같은 직인 기질로 유명한 집단이 특기를 발휘하고 있다. 그 솜씨는 깊은 바다에서도 그 이름을 빛나게 하는 명인이며, 재료가 있으면 어떠한 것이든 소재를 찾을 때 이기기를 방문하면 좋을 것이다." },
    { name: "남방 해류 동맹", type: "상인 조합", base: "상업구", leader: "닌사르", content: "육상과의 통상을 행하는 상인들의 조합. 메나아므마이나 마제라니카와의 교역을 중심으로, 상인들이 모여 있다. 해양 도시에서의 교류를 활성화하려 하고 있으며, 거래의 교환이나 이동 수단의 확보를 중시하고 있다. 어업의 동반 모험자들을 보내는데 마음을 쓰고 있으며, 역경을 피하지 않고, 탐험자들을 해저에 안내하는 경우도 있다." },
  ];
  return (
    <div>
      <SecTitle title="캇카르의 조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 8px", borderRadius: 8, flexShrink: 0 }}>{o.type}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: 8 }}>본거지: {o.base} · 대표: {o.leader}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const people = [
    {
      name: "아프칼루 7세",
      nameJp: "アプカルル7世",
      role: "캇카르 국왕",
      race: "사하긴",
      gender: "남",
      age: "43세",
      hair: "없음",
      eyes: "흑색",
      skin: "적색",
      quote: "\"바다의 밑 세계에 오신 것을 환영한다, 천천히 이야기를 들려주시오\"",
      note: "캇카르의 종주가 되는 국왕. 타에 비해 눈에 띄는 날카로운 이빨을 가진 어민이다. 정치적으로는 화목을 꾀하는 자세로, 장로들의 의견을 잘 듣는 현명한 왕으로 불린다. 적극적으로 땅에서 오는 인간의 방문을 장려하여, 접견에 다가와 인간의 부담을 줄이고자 노력한다.",
    },
    {
      name: "타라트",
      nameJp: "タラット",
      role: "캇카르 신관장",
      race: "사하긴",
      gender: "남",
      age: "69세",
      hair: "없음",
      eyes: "흑색",
      skin: "청백색",
      quote: "\"우~음, 그것은, 그……어떻게든, 저것이로구나\"",
      note: "에엔그라를 다스리는 노어민이다. 신중하고 두터운 종교인으로서 인기가 높다. 하지만 나이 탓인지 말의 수가 적고 길다는 평판이 있다. 「불의 시대」 이전에 지상에 존재했던 것의 유사 도구를 연구하는 것이 취미이며, 탐험자를 신전 내에 파견하는 경우가 있다. 탐험자들을 신전 내에 배치하는 것도 그의 역할이다.",
    },
    {
      name: "문무레우슈",
      nameJp: "ムンムレウシュ",
      role: "캇카르 군지휘관",
      race: "사하긴",
      gender: "남",
      age: "36세",
      hair: "없음",
      eyes: "흑색",
      skin: "적색",
      quote: "\"길만 타도는 선조의 숙원이다\"",
      note: "캇카르의 군족을 이끄는 어민이다. 왕의 종복에 해당하는 무인이다. 극한의 솜씨는 거리 안에서 높은 평가를 받고 있다. 냉담하고 신중한 성격이지만, 토벌 길만에게 향하는 열정은 비할 데가 없다. 여러 구의 안전과 방어를 굳히기 위해, 도시의 안팎에 걸쳐 불순분자의 침투를 막는 것에도 힘쓰고 있다.",
    },
    {
      name: "이기기",
      nameJp: "イギギ",
      role: "열련의 대장장이",
      race: "사하긴",
      gender: "여",
      age: "62세",
      hair: "없음",
      eyes: "금색",
      skin: "회색",
      quote: "\"단순한 쇠덩어리 만드는 건 질렸어\"",
      note: "캇카르의 지하 블록에서 철을 두드리기를 멈추지 않는 노어민이다. 나마즈 같은 직인 기질로 유명한 집단 중에서도 특기를 발휘하여 솜씨는 깊은 바다에서도 그 이름을 빛나게 하는 명인이다. 재료가 있으면 어떠한 것이든 소재를 찾을 때, 무기를 비롯해 소재를 찾기 위해 이기기를 방문하면 좋을 것이라 한다.",
    },
    {
      name: "닌사르",
      nameJp: "ニンサル",
      role: "캇카르의 상인",
      race: "사하긴",
      gender: "여",
      age: "32세",
      hair: "없음",
      eyes: "회색",
      skin: "청백색",
      quote: "\"해저를 보지 않고서, 세계는 말할 수 없어\"",
      note: "캇카르의 상인 조합을 이끄는 닌사르 여인. 육상과의 인간 교류를 활성화하려 하고 있어, 탐험의 동반자를 중시하고 있다. 적극적인 동반자들을 보내는데 마음을 쓰고 있으며, 탐험자들을 해저에 안내하는 경우가 있다. 자매들이 姉妹들의 장사를 맡고 있는 다재다능한 여인이다.",
    },
  ];
  return (
    <div>
      <Prose text={"캇카르를 거점으로 활동하는 주요 인물들."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
        {people.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a2a" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", marginTop: 2 }}>{p.nameJp}</div>
              </div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "3px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 12 }}>{p.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#666", margin: "10px 0" }}>
              {[
                { label: "종족", value: p.race }, { label: "성별", value: p.gender },
                { label: "나이", value: p.age }, { label: "발색", value: p.hair },
                { label: "눈색", value: p.eyes }, { label: "피부", value: p.skin },
              ].map((attr, j) => (
                <span key={j} style={{ background: "#F7F4EE", border: "1px solid #E8E3DA", borderRadius: 6, padding: "2px 8px" }}>
                  <span style={{ color: "#aaa" }}>{attr.label}: </span>{attr.value}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "13px", fontStyle: "italic", color: ACCENT, margin: "8px 0", paddingLeft: 12, borderLeft: `2px solid ${ACCENT}50` }}>{p.quote}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KakkarPage() {
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
      case "overview": return <OverviewSection />;
      case "city":     return <CitySection />;
      case "orgs":     return <OrgsSection />;
      case "people":   return <PeopleSection />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE", color: "#2a2a2a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
      {mob && (
        <button onClick={() => setShowNav(!showNav)} style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: "13px", cursor: "pointer" }}>
          {showNav ? "✕" : "☰"}
        </button>
      )}
      {(!mob || showNav) && (
        <nav style={{ width: mob ? "100vw" : 220, flexShrink: 0, background: SIDEBAR_BG, display: "flex", flexDirection: "column", padding: "24px 0", overflowY: "auto", position: mob ? "fixed" : "relative", top: 0, left: 0, height: "100vh", zIndex: 999 }}>
          <a href="/" style={{ display: "block", padding: "0 20px 20px", textDecoration: "none" }}>
            <div style={{ fontSize: "10px", color: "#888", letterSpacing: "0.12em", marginBottom: 4 }}>← 이상동몽 위키</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Noto Serif KR', serif" }}>캇카르</div>
            <div style={{ fontSize: "10px", color: "#aaa", marginTop: 2 }}>カッカル — 해저 도시</div>
          </a>
          <div style={{ height: 1, background: "#333", margin: "0 16px 16px" }} />
          {navItems.map(n => (
            <button key={n.id} onClick={() => setActiveId(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 20px", background: activeId === n.id ? `${ACCENT}30` : "transparent", border: "none", borderLeft: activeId === n.id ? `3px solid ${ACCENT}` : "3px solid transparent", color: activeId === n.id ? "#fff" : "#aaa", fontSize: "13px", fontWeight: activeId === n.id ? 600 : 400, cursor: "pointer", textAlign: "left" }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </nav>
      )}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "40px 48px", maxWidth: 860 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.12em", marginBottom: 6 }}>{activeNav.icon} {activeNav.label}</div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>캇카르</h1>
          <div style={{ fontSize: "12px", color: "#aaa", marginTop: 4 }}>カッカル — 에린딜·마제라니카 사이 해저 도시</div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 16, borderRadius: 1 }} />
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
