'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#6B4E28";
const ACCENT_LIGHT = "#F0E6D3";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "line",          label: "라인 왕국",       icon: "🏛️" },
  { id: "structure",     label: "거리 구조",        icon: "🗺️" },
  { id: "facilities",    label: "주요 시설",        icon: "🏠" },
  { id: "organizations", label: "조직",             icon: "⚔️" },
  { id: "people",        label: "라인의 인물들",    icon: "👥" },
];

const lineStats = {
  population: "약 15만 명",
  raceComposition: [
    { race: "휴린",   pct: 38, color: "#2A5F9E" },
    { race: "엘다난", pct: 20, color: "#1A6B4A" },
    { race: "네바프",   pct: 16, color: "#8B6914" },
    { race: "필보르",   pct: 10, color: "#4A7A2E" },
    { race: "바나",     pct: 10, color: "#B85C2A" },
    { race: "두앙",     pct: 6,  color: "#8B2D2D" },
  ],
  stats: [
    { label: "통치 형태", value: "왕정" },
    { label: "현 수장",   value: "에레원드 (국왕)" },
    { label: "종교",       value: "7대 신 신앙" },
    { label: "언어",       value: "공통어" },
    { label: "기후",       value: "온난" },
    { label: "수원",       value: "지하수 이용" },
    { label: "수입",       value: "곡물, 식료품, 목재, 광물 등" },
    { label: "수출",       value: "유적 발굴품, 지정 희귀성 생물 소재 등" },
  ],
};

const lineHistory = `라인은 파리스 동맹의 거의 중앙에 위치하는 라인 왕국의 수도이자, 동맹의 지도 도시 중 하나이다. 근교에 아직 미탐사 유적이 다수 남아 있어, 이 거리를 거점으로 하는 모험자가 많다.

에를랑 왕국의 기록에 의하면, 약 300년 전 중원으로의 행군 때 숲 속에서 고대 군대가 주둔지로 삼은 것이 라인의 기원이라 한다. 이윽고 영주 군주의 대두와 함께 라인 왕국으로서 이 일대는 독립했다. 현재 "유적의 거리"로 알려진 이 거리는, "땅의 시대"의 것으로 생각되는 고대 유적을 기반으로, 오랫동안 라인 왕국의 수도로서 번영해 왔다.

현재까지의 조사에 의해, 유적은 "땅의 시대"에 놓인 네바프족의 것으로 추측된다. 라인의 지하에는 광대한 유적이 펼쳐져 있으며, 그 절반 정도가 탐색 완료되어 있다. 또한 그 근방에도 다수의 유적이 발견되고 있어, 이전에 이 근방에 네바프의 국가가 존재했다는 설도 있다.`;

const lineCurrentStatus = `라인의 주요 산업은 국내외에 공개된 유적의 발굴 사업이며, 모험자를 돕는 상업과 유적에서 발굴된 물품의 수출이 도시의 재정을 지탱하고 있다.

국왕 에레원드는 형식적으로 군주의 위치에 있지만, 평민 출신으로 모험자로서 전국을 여행한 경력에 기반하여 선거로 우수한 인재를 폭넓게 확보하고, 왕을 결정하는 데에도 항상 민의를 광범위하게 청취하고 있다. 자유롭고 활기 넘치는 좋은 나라가 되도록 힘쓰고 있다. 신앙의 형식은 7대 신 신앙으로, 사실상 7대 신 전부가 신전에 모셔져 있다.`;

const lineDistricts = [
  {
    name: "모험자 거리",
    content: "남문에서 마을 중앙광장으로 이어지는 라인의 메인 스트리트. 그 이름 그대로 모험자를 위한 상점이 즐비하다. 라인에서 가장 활기찬 거리이다. 중앙광장은 인근의 농민·어부·사냥꾼 등이 야외 시장을 여는 장소이며, 기념일에는 연시도 열린다.",
  },
  {
    name: "서구",
    content: "남서문에서 북부 주택지로 이어지는 직인 거리를 중심으로 한 지구. 대장장이나 금속 제품 세공사 등 직인의 가게가 많다. 모험자 양성학교인 타니스와 비안나의 학교도 이 서구에 있다.",
  },
  {
    name: "동구",
    content: "모험자 거리의 동쪽 지구. 남부의 상점 거리 근처에 고급 상점이 나란히 서며, 마르파스 강을 이용한 배로만 들어갈 수 있는 선박 전용 입구를 갖추고 있다. 북부의 에루 거리는 도박장과 유흥업소가 번성한 번화가이다.",
  },
  {
    name: "주택구",
    content: "중앙광장 이외 대부분이 주택구로 되어 있으며, 북부 일대는 귀부인들의 저택으로도 사용되는 야외 궁전과 신전 등의 중요 시설이 집중되어 있다.",
  },
];

const lineFacilities: Facility[] = [
  {
    name: "타니스와 비안나의 학교",
    content: "중앙문에서 거리로 들어서 대로를 왼쪽으로 따라가면 있는 학교. 훈련 중인 병사나 모험자 지원자에게 훈련 서비스를 제공한다. 현 국왕 에레원드 취임 이후 폭발적으로 증가한 모험자 수를 위해 원래 병사였던 타니스와 비안나가 경영하고 있다. 전사 기술은 타니스가, 마술과 마법의 지식은 비안나가 담당한다. 각 클래스에 전문 모험자들이 지도에 나서며 조직적인 모험자 양성이 이루어진다. 각지의 길드와의 유대도 강해, 졸업 후에도 안심할 수 있는 지원을 받을 수 있다.",
  },
  {
    name: "라인 신전 의뢰소",
    content: "거리 북쪽, 대로 근처에 있는 신전. 아켄라브 외 7대 신을 모시고 있으며, 특히 아켄라브를 주신으로 한다. 초대 에를랑 왕국식의 외관을 남기고 있어 품격 있는 분위기가 특징이다. 신전 옆에 세워진 모험자를 위한 의뢰소는 라인 왕국의 모험자 업무를 일괄 관리하는 곳이다. 근처에 많은 유적이 있어 유적 탐사 의뢰가 절반을 차지한다.",
  },
  {
    name: "춤추는 사슴새끼정",
    content: "도시 중앙문에서 들어서는 대로 인근의 주점 겸 여관. 모험자를 위한 무기와 갑옷도 판매하고 있다. 주인 바르트의 아내 메를리가 만드는 요리는 절품이며, 어떤 수준의 모험자도 많이 찾는 인기 있는 가게다. 뒤편 세계의 정보를 거래하는 정보 중개소로서도 알려져 있어, 그것을 목적으로 방문하는 모험자도 적지 않다. 베테랑 바르트는 다양한 전투 정보와 유용한 기술을 모험자들에게 전수한다.",
  },
  {
    name: "월야정",
    content: "동구의 에루 거리에 있는 도박장. 트리오토, 쌍두 육, 다트, 룰렛 등 다양한 도박을 즐길 수 있다. 경영자는 아기이라라는 여성으로, 그밖에도 여관이나 음식점 사업체를 다수 보유하고 있다. 뒤편 세계의 정보를 거래하는 정보 중개소로서도 알려져 있어, 그것을 목적으로 방문하는 모험자도 적지 않다.",
  },
];

const lineOrganizations: Org[] = [
  {
    name: "라인 경비대",
    type: "군사 조직",
    base: "라인 왕국, 라인 경비대 본부",
    leader: "요르그·그라이스",
    content: "경찰 조직이라 할 수 있는 것이지만, 자경단이 아닌 라인의 주력 전력이다. 벨프인이 육성했던 용사나 원래 경비대원들로 구성되어 있으며, 훈련도가 높다. 대장 요르그·그라이스라는 기사가 대장을 맡고 있다.",
  },
  {
    name: "모험 상인 조합",
    type: "상인 조합",
    base: "라인, 해안 근처",
    leader: "마르티나·필마르니",
    content: "라인을 중심으로 활동하는 모험자들과 계약을 맺어, 유적에서의 발굴품 및 지정 희귀성 생물 소재를 항상 입수할 수 있도록 하는 조합. 주로 동방 세계와 거래를 하고 있다.",
  },
  {
    name: "레이루스 상점",
    type: "개인 상회",
    base: "서구, 직인 거리",
    leader: "레이루스",
    content: "주로 일용품을 취급하는 작은 상점. 창업 100년의 역사를 자랑한다. 가게 주인 레이루스는 네바프 계통의 혈통이 있어 특주품을 받아들이지 않는 경우가 있다. 하지만 가게 뒤편에는 항상 많은 모험자들이 물건을 판매하러 찾아온다.",
  },
  {
    name: "아데스 무구점",
    type: "개인 상회",
    base: "모험자 거리",
    leader: "아데스",
    content: "모험자 거리에 입지하는 큰 설비와 공장을 가진 무구점. 검과 방구는 이곳에서 구입한다. 특수품도 대응해주지만, 가게 주인 아데스는 두앙족 계통의 혈통이 있어 주문을 받아들이지 않는 경우도 있다. 가게 뒤편에는 항상 많은 모험자들이 찾아온다.",
  },
  {
    name: "지도점 안타레스",
    type: "개인 상회",
    base: "모험자 거리",
    leader: "안타레스",
    content: "모험자, 교역 상인, 여행자 등의 정보를 모아 지도를 만들고 판매하는 점포. 신전의 의뢰소에서 정보 수집 작업을 받는 경우도 많다. 던전 내부를 기록한 고대 지도의 정보 등을 거래하는 모험자도 있다.",
  },
];

const lineCharacters: Character[] = [
  {
    name: "エレウォンド",
    nameKo: "에레원드",
    quote: "이 사명, 그대라면 이룰 수 있을 것이오",
    race: "휴린", gender: "남", age: "53",
    hairColor: "검은", eyeColor: "검은", skinColor: "흰",
    title: "라인 왕국 국왕",
    content: "폭군 벨프인에 맞서 싸워 라인 왕국의 국왕이 된 원래 모험자. 전투로 이름을 알린 인물로, 견문이 높고 냉정하며 뛰어난 정치 수완을 갖추고 있다. 가장 적합한 인물을 폭넓게 등용하며, 파리스 동맹의 주요 인물 중 하나이다. 모든 모험자들에게 아버지 같은 존재이기도 하다.",
  },
  {
    name: "ランディア",
    nameKo: "란디아",
    quote: "당신의 힘을 빌리고 싶습니다",
    race: "하프 (엘다난)", gender: "남", age: "134",
    hairColor: "붉은", eyeColor: "파란", skinColor: "흰",
    title: "라인 신전 신관장",
    content: "라인 신전의 신관장. 엘다난과의 혼혈로 100세를 넘는 오래 사는 현자이다. 오랜 생활 경험에서 얻은 고요하고 침착한 인품으로, 항상 적절히 행동한다. 국왕 에레원드와 함께 여러 위험한 모험 사건을 겪어온 동료로, 국왕의 두터운 신뢰를 받고 있다.",
  },
  {
    name: "ヴィアンナ",
    nameKo: "비안나",
    quote: "중요한 것은 지식과 응용이야",
    race: "엘다난", gender: "여", age: "불명",
    hairColor: "금", eyeColor: "녹색", skinColor: "흰",
    title: "타니스와 비안나의 학교 교원",
    content: "원래 기병사이자 마술사. 여전사 타니스와 함께 모험자 양성학교를 경영하고 있다. 풍부한 경험과 지식을 가진 여성으로, 마법 분야를 담당하고 있다. 다만 자신의 나이를 숨기고 있으며, 이에 관련된 자는 저주를 받는다는 소문도 있다.",
  },
  {
    name: "バルト",
    nameKo: "바르트",
    quote: "손님이 왔어요. 이야기를 들어드릴게요",
    race: "휴린", gender: "남", age: "60",
    hairColor: "흰", eyeColor: "갈색", skinColor: "붉은",
    title: '"춤추는 사슴새끼정" 주인',
    content: '"춤추는 사슴새끼정"의 주인. 전에는 이름난 전사였지만 부상을 계기로 모험자 생활을 줄였다. 강인한 외모에 반해 초보자에서 베테랑까지 많은 모험자들이 상담해 오는 인물이다. 다양한 전투 정보와 유용한 기술을 모험자들에게 전수해 준다.',
  },
  {
    name: "フィリス",
    nameKo: "필리스",
    quote: "여러분에게 딱 좋은 의뢰가 있습니다",
    race: "바나 (묘족)", gender: "여", age: "25",
    hairColor: "갈색", eyeColor: "갈색", skinColor: "흰",
    title: "라인 신전 의뢰소 접수원",
    content: "라인 신전 의뢰소의 접수원 중 하나. 붙임성이 좋고 말이 잘 통하지만, 한 번 본 사람의 얼굴과 이름을 잊지 않는 뛰어난 기억력의 소유자로 알려져 있다. 신전에 들어온 사람을 반드시 기억해 두는 정보 역할이기도 하다.",
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

function LineSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>라인 왕국 수도 라인 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {lineStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {lineStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {lineStats.raceComposition.map((r, i) => (
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
      <SecTitle title="라인의 역사" />
      <Prose text={lineHistory} />
      <SecTitle title="라인의 현황" />
      <Prose text={lineCurrentStatus} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"라인 왕국의 수도이자 '모험자의 거리'라고도 불리는 라인은, 근처에 많은 유적이 있는 도시로 알려져 있어 많은 모험자들이 항상 머물고 있다.\n\n남쪽은 마르파스 강에 접하고, 북쪽은 험한 절벽이 된다. 거리 전체를 성벽으로 둘러싸고 있으며, 왕성은 거리 밖에 만들어져 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {lineDistricts.map((d, i) => (
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
        라인의 주요 시설을 소개한다. 많은 유적과 모험자들로 활기찬 이 거리의 중요 거점들이다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {lineFacilities.map((f, i) => (
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
        라인과 관련이 깊은 조직을 소개한다. PC의 의뢰나 지시를 수행하는 조직으로서 시나리오에 활용하거나, 커넥션으로 취득할 수 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lineOrganizations.map((o, i) => (
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
        "유적의 거리" 라인의 주요 인물들을 소개한다. PC의 의뢰인이나 협력자, 혹은 적대자로서 시나리오에 등장할 수 있다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {lineCharacters.map((c, i) => (
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
                  { label: "연령", value: c.age === "불명" ? "불명" : `${c.age}세` },
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

export default function LinePage() {
  const [activeId, setActiveId] = useState("line");
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
      case "line":          return <LineSection />;
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
        width: 248, minWidth: 248, background: "#1C1710", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#7a6850", marginBottom: 6 }}>PARIS ALLIANCE · LINE KINGDOM</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "유적의 거리"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>라인</span>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#4a3820", lineHeight: 1.6 }}>
          <a href="/gran-felden" style={{ color: "#7a6850", textDecoration: "none", fontSize: "11px" }}>← 파리스 동맹으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE · "RUINS CITY" LINE</div>
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
