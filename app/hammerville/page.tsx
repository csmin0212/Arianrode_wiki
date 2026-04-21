'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#7A3A14";
const ACCENT_LIGHT = "#F0DDD0";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "hammerville",   label: "하마르빌",           icon: "🔨" },
  { id: "facilities",   label: "주요 시설",            icon: "🏛️" },
  { id: "organizations", label: "조직",                icon: "⚒️" },
  { id: "people",       label: "하마르빌의 인물들",    icon: "👥" },
];

const hammervilleStats = {
  population: "약 5,000명",
  raceComposition: [
    { race: "휴린",   pct: 70, color: "#2A5F9E" },
    { race: "엘다난", pct: 15, color: "#1A6B4A" },
    { race: "네바프",   pct: 12, color: "#8B6914" },
    { race: "필보르",   pct: 1,  color: "#4A7A2E" },
    { race: "바나",     pct: 1,  color: "#B85C2A" },
    { race: "두앙",     pct: 1,  color: "#8B2D2D" },
  ],
  stats: [
    { label: "통치 형태", value: "대장간 조합에 의한 합의제" },
    { label: "위치",       value: "루디온 산맥 서측" },
    { label: "종교",       value: "7대 신 신앙" },
    { label: "언어",       value: "공통어" },
    { label: "기후",       value: "냉량, 산악성" },
    { label: "주요 산업", value: "단조, 무기 제작, 암즈 크리스탈 합성" },
  ],
};

const hammervilleHistory = `하마르빌은 루디온 산맥 서측 기슭에 자리 잡은 소규모 산악 도시다. "대장간의 거리"라는 별명이 나타내듯, 도시 전체가 단조와 무기 제작을 중심으로 발달해 왔다.

파리스 동맹에 속하는 도시 중에서는 가장 작은 편에 속하지만, 여기서 만들어지는 무기와 방구의 질은 에린딜 서방 전체에서도 최고 수준으로 인정받는다. 특히 암즈 크리스탈을 금속에 합성하는 기술은 하마르빌만의 전매특허로, 이를 목적으로 먼 거리를 마다않고 찾아오는 모험자와 귀족도 적지 않다.`;

const hammervilleCurrentStatus = `도시 통치는 대장간 조합이 합의제 방식으로 이끌고 있다. 가장 뛰어난 장인이 조합장을 맡는 전통이 있으며, 현재는 엘다난 노장 마곤로가 그 자리를 맡고 있다.

매년 열리는 "금추 축제"는 하마르빌 최대의 행사로, 이 도시 출신의 최강 대장장이 열 명을 가리는 "십금추(十金槌)" 경연이 개최된다. 축제 기간 동안에는 파리스 동맹 각지에서 모험자와 상인이 찾아오며, 도시는 한 해 중 가장 활기를 띤다.`;

const hammervilleFacilities: Facility[] = [
  {
    name: "대장간 조합 회관",
    content: "하마르빌 통치의 중심이자 도시에서 가장 큰 건물. 회의실, 기술 도서관, 수련장을 갖추고 있으며, 연간 십금추 경연의 심사도 이곳에서 진행된다. 의뢰 접수 창구도 마련되어 있어, 무기 제작이나 수리를 원하는 모험자들이 자주 방문한다. 접수 담당 넬리아가 항상 밝게 맞아준다.",
  },
  {
    name: "암즈 크리스탈 공방",
    content: "하마르빌 독자 기술인 암즈 크리스탈 합성을 전문으로 하는 공방. 크리스탈을 금속 무기에 융합하는 고도의 연금 기술이 구사되며, 완성된 무기는 일반 무기보다 훨씬 강력한 성능을 발휘한다. 조합원이 아니면 내부를 볼 수 없으며, 기술 유출을 방지하기 위한 철저한 보안이 유지된다.",
  },
  {
    name: "금추 광장",
    content: "십금추 경연과 금추 축제가 열리는 도시 중앙 광장. 평소에는 단련장과 시장으로 이용되며, 축제 시즌에는 임시 관람석이 설치되어 도시 인구의 몇 배에 달하는 관람객을 수용한다. 광장 한편에는 역대 십금추 수상자의 이름이 새겨진 기념비가 세워져 있다.",
  },
  {
    name: "무기점 (아데스 계열 지점)",
    content: "라인의 아데스 무구점 계열로, 하마르빌에서 만들어진 무기를 파리스 동맹 전역에 유통하는 거점 점포. 일반적인 무기류부터 특주 주문 무기까지 폭넓게 취급한다. 모험자 전용 할인 제도가 있으며, 신뢰할 수 있는 무기를 적정 가격에 구입할 수 있어 모험자들의 필수 방문처로 알려져 있다.",
  },
];

const hammervilleOrganizations: Org[] = [
  {
    name: "대장간 조합",
    type: "직인 조합 (통치 기관)",
    base: "대장간 조합 회관",
    leader: "마곤로",
    content: "하마르빌의 모든 대장장이와 금속 공예 직인이 소속된 조합이자 도시 통치 기관. 가장 뛰어난 장인이 조합장을 맡는 전통이 있으며, 현 조합장 마곤로는 수백 년을 살아온 엘다난 노장이다. 조합은 기술 전수, 품질 관리, 의뢰 중개, 도시 행정을 모두 담당한다.",
  },
  {
    name: "십금추 (十金槌)",
    type: "명예 칭호 보유자 집단",
    base: "금추 광장 (연간 경연)",
    leader: "매년 경연으로 선발",
    content: "매년 금추 축제에서 개최되는 경연을 통해 선발되는 하마르빌 최강의 대장장이 열 명. 십금추로 선발되는 것은 이 도시 최고의 명예로 여겨지며, 선발된 자는 조합 내에서 특별한 지위와 발언권을 얻는다. 이들이 만든 무기는 특별히 높은 가격에 거래되며, 파리스 동맹 각국 귀족들의 주문이 끊이지 않는다.",
  },
  {
    name: "산악 경비대",
    type: "군사 조직",
    base: "루디온 산맥 기슭 초소",
    leader: "하마르빌 조합 파견 대장",
    content: "루디온 산맥에서 출현하는 마수로부터 하마르빌을 지키는 경비 조직. 대부분의 대원이 대장간 조합의 장인 출신으로, 자신들이 만든 무기를 직접 사용하는 강력한 전투 집단이다. 도시가 작은 만큼 전원 전투 능력이 높으며, 산악 지형에 대한 풍부한 지식을 갖추고 있다.",
  },
];

const hammervilleCharacters: Character[] = [
  {
    name: "マゴンロ",
    nameKo: "마곤로",
    quote: "쇠는 거짓말을 하지 않아. 두드린 만큼 단단해지지",
    race: "엘다난", gender: "남", age: "수백",
    hairColor: "흰", eyeColor: "은색", skinColor: "흰",
    title: "대장간 조합장",
    content: "하마르빌 대장간 조합의 조합장을 맡고 있는 엘다난 노장. 긴 세월 동안 무수히 많은 무기를 만들어 왔으며, 암즈 크리스탈 합성 기술을 이 도시에 뿌리내린 장본인이기도 하다. 말수가 적고 작업에만 집중하는 성격이지만, 재능 있는 젊은 장인을 발굴하는 눈을 가지고 있다.",
  },
  {
    name: "ネリア",
    nameKo: "넬리아",
    quote: "어서오세요! 어떤 무기가 필요하신가요?",
    race: "휴린", gender: "여", age: "24",
    hairColor: "적갈색", eyeColor: "갈색", skinColor: "흰",
    title: "대장간 조합 접수 담당",
    content: "대장간 조합 회관의 접수를 담당하는 휴린 여성. 밝고 활달한 성격으로 방문자들에게 인기가 높다. 무기 지식도 상당하여 고객의 필요에 맞는 무기를 적절히 추천하는 능력이 뛰어나다. 조합장 마곤로에게도 신뢰받고 있어, 접수 이외의 각종 잡무도 폭넓게 담당하고 있다.",
  },
  {
    name: "クレイグ・ハマー",
    nameKo: "크레이그·해머",
    quote: "십금추에 뽑히는 날까지 절대 멈추지 않는다",
    race: "휴린", gender: "남", age: "31",
    hairColor: "검은", eyeColor: "갈색", skinColor: "구릿빛",
    title: "대장장이 / 십금추 도전자",
    content: "대장간 조합에 소속된 젊은 장인으로, 십금추 선발을 목표로 매일 단조에 매진하고 있다. 특히 장검 제작에 뛰어난 재능을 보이며, 지난 금추 축제에서 처음으로 상위권에 이름을 올렸다. 마곤로에게 직접 암즈 크리스탈 합성 기술을 전수받으려 지원했지만 아직 허락을 받지 못했다.",
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

function HammervilleSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>파리스 동맹 도시 하마르빌 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {hammervilleStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {hammervilleStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {hammervilleStats.raceComposition.map((r, i) => (
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
      <SecTitle title="하마르빌의 역사" />
      <Prose text={hammervilleHistory} />
      <SecTitle title="하마르빌의 현황" />
      <Prose text={hammervilleCurrentStatus} />
      <SecTitle title="암즈 크리스탈 합성" />
      <Prose text={"하마르빌 특유의 기술인 암즈 크리스탈 합성은, 특수한 마력을 지닌 크리스탈을 무기나 방구에 융합시키는 연금 기술이다. 이 기술로 만들어진 무기는 통상 무기보다 훨씬 강력하며, 에린딜 서방 전체에서 수요가 높다.\n\n기술 습득에는 수년의 수련이 필요하며, 대장간 조합이 기술 유출을 엄격하게 관리하고 있다. 조합의 허가 없이 이 기술을 배우거나 사용하는 것은 도시 법으로 금지되어 있다."} />
    </div>
  );
}

function FacilitiesSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        하마르빌의 주요 시설을 소개한다. 소규모 도시이지만 단조 기술에 특화된 독특한 시설들이 갖춰져 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {hammervilleFacilities.map((f, i) => (
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
        하마르빌과 관련이 깊은 조직을 소개한다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {hammervilleOrganizations.map((o, i) => (
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
        "대장간의 거리" 하마르빌의 주요 인물들을 소개한다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {hammervilleCharacters.map((c, i) => (
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
                  { label: "연령", value: c.age === "수백" ? "수백 세" : `${c.age}세` },
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

export default function HammervillePage() {
  const [activeId, setActiveId] = useState("hammerville");
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
      case "hammerville":   return <HammervilleSection />;
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
        width: 248, minWidth: 248, background: "#1C100A", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#704028", marginBottom: 6 }}>PARIS ALLIANCE · HAMMERVILLE</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "대장간의 거리"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>하마르빌</span>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#503020", lineHeight: 1.6 }}>
          <a href="/gran-felden" style={{ color: "#704028", textDecoration: "none", fontSize: "11px" }}>← 파리스 동맹으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE · "FORGE CITY" HAMMERVILLE</div>
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
