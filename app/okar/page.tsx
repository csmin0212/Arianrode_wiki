'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A6B7A";
const ACCENT_LIGHT = "#D0ECF5";
const SIDEBAR_BG = "#0E1C20";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",   label: "대학 도시 오카",   icon: "🎓" },
  { id: "life",       label: "오카에서의 생활",  icon: "🏫" },
  { id: "facilities", label: "주요 시설",        icon: "🏛️" },
  { id: "orgs",       label: "조직",            icon: "⚜️" },
  { id: "people",     label: "오카의 인물들",   icon: "👥" },
];

const stats = [
  { label: "위치",      value: "디아스론드 근교 산중" },
  { label: "설립",      value: "성력 1010년" },
  { label: "인구",      value: "약 2만명" },
  { label: "특징",      value: "현대 지구에서 이전된 대학 시설" },
  { label: "종교",      value: "없음 (에린 신앙과 공존)" },
  { label: "언어",      value: "공통어, 일본어 (지구어)" },
  { label: "통신",      value: "유그드라실 네트워크 이용 가능" },
];

const subjects = [
  "일반교양", "에린 교양", "지구 교양",
  "모험자 양성 강좌", "모험자 연수", "에린학",
  "지구학", "마도과학", "부 활동",
];

interface Facility { name: string; content: string; }

const facilities: Facility[] = [
  {
    name: "콜로세움",
    content: "원래 대학의 체육관이었던 것을 개조한 시설. 훈련용 소형 시설과 대형 돔 회장이 있으며, 대인원을 수용할 수 있어 학교 전체 집회에도 사용된다.\n\n주된 목적은 집단에 의한 전투 훈련이다. 그 성과를 보기 위해 매달 1회 기숙사 대항전이 치러지며, 이 전투에서 좋은 성적을 거둔 자는 대학 도시의 아이돌적 존재가 된다. 그 대표적인 예로 블랙 로터스의 길드 마스터 가트루드를 들 수 있다.\n\n학내에서는 결투가 금지되어 있어, 학생끼리 분쟁이 생겼을 때는 대리로 모의 전투가 콜로세움에서 이루어지는 경우도 있다.",
  },
  {
    name: "연구동",
    content: "현재 오카에서 가장 주목받는 시설. 원래는 공학부의 학부棟 및 연구 시설이었던 곳이다.\n\n계기는 연금술사·대장장이들과 현대 지구 학생들이 골렘으로 발전기를 개발한 것이다. 급전에 성공하고 가동하기 시작한 현대 지구의 기기에 접속받은 에린 기술자들과, 에린에서는 없었던 동력·에너지의 존재에 견식을 키운 현대 지구 기술자들이 다양한 공작 기계·측량 기계·제조 기계를 개발했다.\n\n여기서 개발된 기술은 처음 스폰서인 신전과 제국에 보내져, 그 후 제품이 학교 운영 예산의 일부가 되고 있다. 건물 내에는 흑탑의 실험탑이 솟아 있어 연구동의 랜드마크 역할을 다하고 있다.",
  },
  {
    name: "학생 기숙사",
    content: "일반 학생들이 거주하는 기숙사. 기본적으로 방 하나에 두 명이 배정되며, 학년에 따라 정원이 부족해 대인원 생활을 강요받는 경우도 있다.\n\n학년·클래스의 대표로서 집단 행동이나 연락 전달의 연락원으로 기능하는 기숙사 반장이 각 동에서 선출된다. 예를 들어 학생들에게의 전달은 각 기숙사에 배치된 게시판을 이용하는 것이 관례이다. 콜로세움에서의 각 학기 대항 시합 등에서는 기숙사 단위로 대항전이 이루어진다.",
  },
  {
    name: "흑련 회관",
    content: "길드 블랙 로터스의 본거지. 오카 내 작은 언덕 위에 있는 성채. 국내외의 연락원 대부분이 여기에 거주하고 있으며, 성채 안에는 뜻밖의 어둠이 숨겨져 있을지도 모른다.\n\n대학에 속한 왕후 귀족의 자제와 그 수행원 대부분이 여기에 살고 있다. 성채 안의 식당은 솜씨 좋은 요리사가 엄선한 식재료로 만들어 낸 요리가 제공되는 것이 본거지의 명물이다.\n\n호화로운 성채이지만 현대 지구인도 참가할 수 있는 파티가 개최되는 등 사람의 출입이 많다. 물론 그 안에는 대학 도시에 스파이를 잠입시킨 자들도 있을지 모른다.",
  },
];

const orgs = [
  {
    name: "블랙 로터스",
    type: "비밀 결사 (길드)",
    base: "불명",
    leader: "불명",
    content: "현대 지구인에 대해 의혹의 눈초리를 보내는 세력이 결성한 길드. 그들은 현대 지구인과 교류하면서도 경계한다. 일부는 음모를 꾸미고 스파이 활동을 하는 자도 있다. 또 독자적인 제복도 만들고 있다.",
  },
  {
    name: "오카 경비대",
    type: "군사 조직",
    base: "오카",
    leader: "복수 모험자",
    content: "오카에는 거리 경비 명목으로 에린 출신의 모험자들이 다수 배치되어 있다. 공개적으로는 경비 임무이지만, 실제로는 현대 지구인을 폭력이나 방해로부터 지키는 사명도 맡고 있다.",
  },
];

interface Character { name: string; role: string; age: string; gender: string; race: string; hair: string; eyes: string; skin: string; content: string; }

const characters: Character[] = [
  {
    name: "프레데릭",
    role: '"성녀" · 에를랑 왕국 왕녀',
    age: "불명 (전생자)",
    gender: "여",
    race: "휴린",
    hair: "금발",
    eyes: "파란색",
    skin: "흰색",
    content: "에를랑 왕국의 왕녀이자 성 에를랑 대성당 소속 신관. 에를랑 신앙의 '성녀'라는 이명을 가진다. 실은 현대 지구로부터의 전생자이며, 대학과 함께 이전된 건물 안의 사람들과 인연이 있다. 적극적으로 전이자(轉移者) 지원과 보호에 힘쓰며, 디아스론드를 설득하여 대학 도시 설립을 촉진했다.",
  },
  {
    name: "고교 세이슈",
    role: "오카 학생회장",
    age: "19",
    gender: "남",
    race: "아샨",
    hair: "검은색",
    eyes: "검은색",
    skin: "황색",
    content: "대학 도시 오카의 학생회장을 맡고 있는 아샨. 두뇌가 명석하지만 그것을 자랑하는 언동이 눈에 띄어, 경계받는 경우도 많다. 그런 그이지만 본심으로는 학생들의 직무에 힘쓰는 성실함도 지니고 있다. 은밀한 취미는 폭발물(폼)이며, 가트루드에게 마음을 기탁하고 있는 것 같다.",
  },
  {
    name: "가트루드 크로이첼",
    role: "오카 학생회 부회장 / 블랙 로터스 길드 마스터",
    age: "18",
    gender: "여",
    race: "휴린",
    hair: "홍자색",
    eyes: "파란색",
    skin: "흰색",
    content: "각종 귀족 자녀들이 모이는 하이 소사이어티 길드 블랙 로터스의 길드 마스터. 그란펠덴 왕가의 연줄이 있다고 하며, 카리스마와 무력을 겸비한 소녀 검사이다. 어떤 일에도 진지하게 임하는 성격으로, 자신을 희생하면서도 교류하는 능력이 있어 사람들로부터 공감을 얻고 있다.",
  },
  {
    name: "유키 스미레",
    role: "바이올렛 길드 마스터",
    age: "18",
    gender: "여",
    race: "아샨",
    hair: "검은색",
    eyes: "빨간색",
    skin: "황색",
    content: "현대 지구에서 평범한 일상을 보내고 있었지만, 어느 날 수수께끼의 여신에 의해 에린딜에 소환되어 탐험자가 됐다. 함께 이동한 친구 미사토를 찾고, 지구로 돌아가는 방법을 찾기 위해 길드 '바이올렛'을 만들었다. 참고로 연예인이 되는 것이 꿈인 것 같다.",
  },
  {
    name: "루인 슈레딩거",
    role: "오카 대학 학생",
    age: "19",
    gender: "남",
    race: "엘다난",
    hair: "금발",
    eyes: "파란색",
    skin: "흰색",
    content: "오카 대학의 학생. 엘리트 귀족이었지만, 지구 기술의 유입으로 집안이 몰락 위기에 처했다. 집안을 재건할 기술을 배우기 위해 본교에 다니고 있다. 고집이 강하고 자존심이 높으며 고압적인 말투를 쓰기 쉽지만, 근본적으로는 상대를 좋아하게 된다. 왜인지 불쌍한 처지에 놓이기 쉬운 인물이다.",
  },
  {
    name: '"마인" 지란트',
    role: '"마인"으로 불리는 마족',
    age: "불명",
    gender: "남(추정)",
    race: "불명",
    hair: "불명",
    eyes: "불명",
    skin: "불명",
    content: "불길한 가면을 쓰고 불온한 기운을 두른 수수께끼의 인물. 현재 에린딜 곳곳에서 목격되고 있으며, 그 땅에서 마족 이외의 사건이 연이어 일어나고 전투가 빈발한다. 또한 돌연 마족의 기습이 빈발하는 등의 사건이 잇따라 발생하고 있다. 그가 누구인지 알 수 있는 단서는 현재까지 발견되지 않았다.",
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
      <div style={{ background: `${ACCENT}12`, border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "16px 20px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: ACCENT, marginBottom: 10 }}>⚠ 기밀 정보</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>
          오카의 진실은 일반 에린 주민에게는 공개되지 않는다. 에린 주민 대부분은 '현대 지구에서 온 이들'이 이세계에서 온 래방자라고 생각하는 경우가 많으며, 이것이 알려지면 혼란은 불가피하다. 이에 관련된 비밀에 관해서는 GM이 자유롭게 설정할 수 있다.
        </div>
      </div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>오카 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <SecTitle title="시작" />
      <Prose text={"성력 1009년 9월. 모험자 일단이 디아스론드 근교의 산에서 마인 지란트를 추격하던 중, 지금까지 본 적 없는 건물을 발견하고 그 건물의 사람들이 괴물에게 습격당하는 상황에 조우했다.\n\n모험자들은 건물 안에 있던 사람들과 함께 괴물을 격퇴했다. 그리고 모험자 일원이었던 에를랑 왕국의 왕녀 '성녀' 프레데릭이 왜인지 미지의 언어를 사용해 서로의 상황을 쌍방에 전했다. 실제로 그녀는 현대 지구의 기억을 가진 '전이자(轉移者)'였으며, 그 건물은 현대 지구의 일본에 존재했던 중해대학과 그 주변 시설이었다."} />
      <SecTitle title="오카의 존재 의의" />
      <Prose text={"성력 1010년. 디아스론드로부터 새로운 학교 설립이 발표됐다. 학교 이름은 오카. 그 진짜 목적은 대학과 현대 지구인의 존재를 세상에서 숨기는 것에 있었다. 에린 주민들 중에는 '이세계에서 온 자는 모두 래방자'라고 생각하는 자들이 많아, 사정이 알려지면 혼란은 불가피하다. 현대 지구인을 지키기 위한 필요한 조치였다.\n\n오카에는 경비 명목으로 많은 에린의 모험자들이 배치되어 있으며, 현대 지구인에 의한 폭력이나 방해를 막는 사명을 함께 맡고 있다. 한편 현대 지구인들도 원래 세계로 돌아가는 방법을 찾으면서 교류를 원하고 있으며, 다양한 인물들이 모여 지금은 '대학 도시'에 약 2만 명의 사람들이 거주하고 있다."} />
      <SecTitle title="유그드라실 네트워크" />
      <Prose text={"마법적인 인터넷과 유사한 정보 네트워크의 명칭. 해커라면 에린 어디서나 정보의 수발신이 가능하다. '대학 도시' 오카 내부에서는 휴대폰 사용도 가능하며, 유그드라실 네트워크 사용도 가능하다."} />
    </div>
  );
}

function LifeSection() {
  return (
    <div>
      <SecTitle title="주요 자금원" />
      <Prose text={"주요 자금원은 기부금이지만, 학교에서 개발한 제품 판매, 모험자가 되어 버는 송금 등으로 경제적으로 자립하고 있다. 음식에 관해서는 지원 외에 밭과 닭장에서 자급자족하며, 대학 근교의 사냥으로도 충당하고 있다."} />
      <SecTitle title="복장" />
      <Prose text={"옷은 원래 입고 있던 것 외에도, 대학에서 제복을 지급하고 있다. 다만 그 중에는 에린 주민의 옷을 흉내 내어 입는 자들도 있다."} />
      <SecTitle title="수강 가능 과목" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {subjects.map((s, i) => (
          <span key={i} style={{ fontSize: "13px", background: `${ACCENT}15`, color: ACCENT, padding: "4px 12px", borderRadius: 14, border: `1px solid ${ACCENT}30` }}>{s}</span>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "16px 20px", fontSize: "13px", lineHeight: 1.8, color: "#555" }}>
        <strong style={{ color: ACCENT }}>Note:</strong> 학생이 아닌 모험자도 강의에 참여하는 경우가 있으며, 각 분야 전문가들이 상주해 있어 에린과 지구 양쪽의 지식을 배울 수 있다. 졸업생 대다수는 공화국 정부 관료로 채용된다.
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <div>
      <Prose text={"여기서는 오카의 주요 시설을 소개한다. 이 시설들은 PC의 의뢰나 협력 장소, 혹은 적대자의 무대로서 시나리오에 등장할 수 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 16 }}>
        {facilities.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "20px 24px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT, marginBottom: 12 }}>{f.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.9, color: "#555" }}>
              {f.content.split("\n\n").map((p, j) => <p key={j} style={{ marginBottom: 10 }}>{p}</p>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrgsSection() {
  return (
    <div>
      <Prose text={"여기서는 오카와 깊이 관련된 조직을 소개한다."} />
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
      <Prose text={"여기서는 오카와 깊이 관련된 주요 인물을 소개한다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}18`, color: ACCENT, padding: "2px 8px", borderRadius: 12 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: "12px", color: "#888", marginBottom: 10, flexWrap: "wrap" }}>
              <span>종족: {c.race}</span><span>성별: {c.gender}</span>
              <span>나이: {c.age}</span>
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

export default function OkarPage() {
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
      case "overview":    return <OverviewSection />;
      case "life":        return <LifeSection />;
      case "facilities":  return <FacilitiesSection />;
      case "orgs":        return <OrgsSection />;
      case "people":      return <PeopleSection />;
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
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#204858", marginBottom: 6 }}>디아스론드 근교 · 학술 도시</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>"대학 도시"<br />오카</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#183040", lineHeight: 1.6 }}>
          <a href="/kirdia" style={{ color: "#2A6B7A", textDecoration: "none", fontSize: "11px" }}>← 키르디아 공화국으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>DIASROND VICINITY · UNIVERSITY CITY</div>
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
