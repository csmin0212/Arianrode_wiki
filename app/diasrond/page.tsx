'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8B6914";
const ACCENT_LIGHT = "#F5E8C0";
const SIDEBAR_BG = "#1C1408";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "성도 개요",         icon: "⛪" },
  { id: "structure", label: "도시 구조",          icon: "🏯" },
  { id: "faith",     label: "7대 신 신앙",        icon: "✨" },
  { id: "orgs",      label: "성도의 조직",        icon: "⚔️" },
  { id: "people",    label: "성도의 인물들",      icon: "👥" },
];

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
  const stats = [
    { label: "위치",   value: "에를랑 왕국 동쪽, 무한의 사막 남단, 에린딜 산맥 기슭" },
    { label: "형태",   value: "독립 도시 국가 (신전 직할령)" },
    { label: "지도자", value: "제62대 교황 팔·밀리티아스" },
    { label: "역사",   value: "약 800년 (초대 교황 루키아노스 창건)" },
    { label: "기능",   value: "7대 신 신앙의 총본산, 성직자 양성, 성지 순례" },
    { label: "특산",   value: "성유물, 신관 파견, 성전(聖典) 편찬" },
  ];
  return (
    <div>
      <Prose text={"\"성도(聖都)\" 디아스론드는 에를랑 왕국 동쪽, 무한의 사막 남단에 위치하는 에린딜 산맥 기슭에 세워진 독립 도시 국가이다. 7대 신 신앙의 총본산으로서 에린딜 서방 전역의 신관들이 이 땅을 성지로 경건하게 우러른다."} />
      <Prose text={"초대 교황 루키아노스가 신의 계시에 이끌려 이 땅에 이른 것이 디아스론드의 시작이다. 루키아노스는 이 땅이 신성한 힘을 가진다는 것을 감지하고, 황야 한복판에 성당을 건립하며 그 주위를 육각형 성벽으로 두르는 도시를 설계했다. 창건으로부터 약 800년, 디아스론드는 에린딜 서방에서 어떤 세력도 감히 침범할 수 없는 성역으로 지금도 굳건히 서 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px",
            borderLeft: `3px solid ${ACCENT}`,
            ...(i === 0 ? { gridColumn: "1 / -1" } : {}),
          }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StructureSection() {
  const towers = [
    { name: "제1탑 — 루키아노스의 탑", note: "초대 교황의 이름을 딴 탑. 교황청이 위치하며, 대성당과 바로 연결된다." },
    { name: "제2탑 — 다그데스 탑",     note: "천공신 다그데모아에게 봉헌된 탑. 신성 기사단 본부가 설치되어 있다." },
    { name: "제3탑 — 다난 탑",         note: "대지의 여신 다난에게 봉헌된 탑. 성전 도서관과 역사 기록실이 있다." },
    { name: "제4탑 — 아에마 탑",       note: "샘의 여신 아에마에게 봉헌된 탑. 치유 신관들의 수련 장소이자 성내 병원이다." },
    { name: "제5탑 — 고바논 탑",       note: "대장신 고바논에게 봉헌된 탑. 무기고와 성유물 보관실이 설치되어 있다." },
    { name: "제6탑 — 그랑아인 탑",     note: "뇌신 그랑아인에게 봉헌된 탑. \"긴 발톱\" 집행부 시설이 있으며 비공개 구역이 많다." },
  ];
  return (
    <div>
      <Prose text={"디아스론드의 도시 구조는 육각형 성벽과 6개의 탑, 그리고 중앙의 대성당으로 이루어진다. 도시 전체가 하나의 요새이자 신전으로 기능하도록 설계되어 있으며, 각 탑에는 7대 신의 이름이 붙어 있다."} />
      <SecTitle title="성대문 (聖大門)" />
      <Prose text={"디아스론드 서쪽 성벽에 있는 거대한 정문. \"성대문(聖大門)\"이라 불리며, 이 문에서 진입할 수 있는 자는 신관, 성직자, 그리고 공인된 순례자뿐이다. 문 양쪽에는 신성 기사단원이 상시 배치되어 있다."} />
      <SecTitle title="중앙 대성당" />
      <Prose text={"도시 정중앙에 우뚝 솟은 대성당. 7대 신의 좌상(坐像)이 제단에 봉안되어 있으며, 교황이 주재하는 종교 의식의 중심지이다. 교황 취임식을 비롯하여 대규모 종교 행사가 이곳에서 거행된다."} />
      <SecTitle title="6개의 탑" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
        {towers.map((t, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 16px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{t.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{t.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaithSection() {
  const gods = [
    { name: "다그데모아", role: "천공신", domain: "하늘, 바람, 지배" },
    { name: "다난",       role: "대지의 여신", domain: "대지, 생명, 풍요" },
    { name: "마라이카",   role: "빛의 왕",     domain: "빛, 정의, 진실" },
    { name: "아에마",     role: "샘의 여신",   domain: "물, 치유, 자애" },
    { name: "고바논",     role: "대장신",      domain: "불, 단련, 창조" },
    { name: "그랑아인",   role: "뇌신",        domain: "번개, 전쟁, 힘" },
    { name: "디지니",     role: "바람의 정령왕", domain: "바람, 변화, 이동" },
  ];
  return (
    <div>
      <Prose text={"디아스론드는 에린딜 서방 전역에 널리 신봉되는 7대 신 신앙의 총본산이다. 7대 신은 에린의 역사 속에서 세계를 창조하고 수호해 온 신들로, 각각 고유한 영역과 성격을 지닌다."} />
      <Prose text={"신앙의 정점에는 교황이 서며, 교황은 에린딜 서방 각지의 신전 신관장들 위에 군림한다. 교황의 말은 신의 말과 동등하게 여겨지며, 그 결정은 서방 전역의 신관 조직을 통해 전달된다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginTop: 20 }}>
        {gods.map((g, i) => (
          <div key={i} style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}40`, borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 4 }}>{g.name}</div>
            <div style={{ fontSize: "11px", color: "#7A5A14", marginBottom: 4 }}>{g.role}</div>
            <div style={{ fontSize: "12px", color: "#5a4a2a" }}>{g.domain}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrgsSection() {
  const orgs = [
    {
      name: "교황청 (聖廷)",
      role: "최고 통치 기관",
      content: "교황을 정점으로 하는 디아스론드의 행정·종교 통합 기관. 각지 신전으로의 신관 파견, 성전(聖典) 편찬, 성도 순례자 관리 등 폭넓은 업무를 담당한다.",
    },
    {
      name: "신성 기사단",
      role: "성도 수호 군사 조직",
      content: "디아스론드를 지키는 성기사들의 조직. 제2탑(다그데스 탑)에 본부를 두며, 성도 경비와 교황의 호위, 순례로 보호를 주 임무로 한다. 성기사들은 7대 신 신앙에 맹세를 바친 정예들로 구성된다.",
    },
    {
      name: "긴 발톱 (라봐르다)",
      role: "성도 집행 기관",
      content: "교황청 직속의 비밀 집행 기관. 신앙의 적이나 이단, 내부 반역자를 색출하고 처단하는 역할을 맡는다. 제6탑(그랑아인 탑)에 시설을 두며, 일반 신관들조차 그 구성원과 활동을 정확히 알지 못한다. \"긴 발톱\"이라는 이름은 보이지 않는 곳에서 신속하게 대상을 낚아채는 것에서 유래했다.",
    },
    {
      name: "마제스타 신전",
      role: "성도 연계 신전",
      content: "\"수호의 거리\" 마제스타에 있는 신전. 신관장은 구위니드(엘다난 남, 894세). 디아스론드와 긴밀하게 연계하여 베르베 섬의 감시와 동방 지역 신앙 관리를 담당한다.",
    },
  ];
  return (
    <div>
      <Prose text={"성도 디아스론드에는 종교 통치, 군사 수호, 비밀 집행이라는 세 축으로 이루어진 독특한 조직 체계가 갖추어져 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10 }}>{o.role}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const characters = [
    {
      name: "팔·밀리티아스",
      role: "제62대 교황",
      race: "휴린",
      gender: "여",
      age: "23세",
      hair: "금발",
      eyes: "황금색",
      note: "역대 최연소 교황. 23세라는 나이에도 불구하고 강인한 의지와 탁월한 정무 능력으로 교황청을 통솔한다. 카리스마적인 존재감을 지니며, 성도 내외에서 절대적인 신망을 받는다. 그 판단은 항상 신앙과 현실 정치 양면에서 날카롭다.",
    },
    {
      name: "가베라",
      role: "탐정 (성도 출신)",
      race: "휴린",
      gender: "여",
      age: "불명",
      hair: "흑발",
      eyes: "흑색",
      note: "성도에서 탐정 업을 영위하는 독특한 여성. 신관도 기사도 아니지만 교황청과 일정한 관계를 유지하며, 성도 내외의 미해결 사건이나 수상한 움직임을 조사한다. 냉정하고 직설적인 성격이며, 의뢰를 받으면 반드시 결론을 낸다.",
    },
    {
      name: "구위니드",
      role: "마제스타 신관장",
      race: "엘다난",
      gender: "남",
      age: "894세",
      hair: "백발",
      eyes: "은색",
      note: "\"수호의 거리\" 마제스타의 신관장. 894세라는 장수한 엘다난으로, 수백 년에 걸쳐 성도와 마제스타 사이의 연계를 지탱해 온 인물이다. 베르베 섬의 감시 임무를 담당하며, 그 깊은 지식과 경험은 교황청에서도 중시된다.",
    },
  ];

  return (
    <div>
      <Prose text={"성도 디아스론드와 관련된 주요 인물들을 소개한다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 6 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#888", marginBottom: 8 }}>
              <span>종족: {c.race}</span>
              <span>성별: {c.gender}</span>
              <span>나이: {c.age}</span>
              {c.hair && <span>머리: {c.hair}</span>}
              {c.eyes && <span>눈: {c.eyes}</span>}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiasrondPage() {
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
      case "overview":  return <OverviewSection />;
      case "structure": return <StructureSection />;
      case "faith":     return <FaithSection />;
      case "orgs":      return <OrgsSection />;
      case "people":    return <PeopleSection />;
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
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#3A2A10", marginBottom: 6 }}>독립 도시 국가 · 신앙의 총본산</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>「성도」<br />디아스론드</div>
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
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "11px", color: "#5A5040" }}>
          <a href="/erindil-west" style={{ color: "#7A6850", textDecoration: "none" }}>← 에린딜 서방</a>
        </div>
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "48px 48px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#B0997A", marginBottom: 10 }}>
              DIASROND — HOLY CITY
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#1a1208", marginBottom: 8, letterSpacing: "0.04em" }}>
              <span style={{ fontSize: "18px", color: ACCENT, marginRight: 8 }}>「성도」</span>디아스론드
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#3a3022", marginBottom: 4 }}>
              {activeNav.icon} {activeNav.label}
            </h2>
            <div style={{ height: 1, background: "#E8E3DA", marginBottom: 28 }} />
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
