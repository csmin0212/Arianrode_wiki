'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#2C5A7A";
const ACCENT_LIGHT = "#D3E6F0";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "kanan",         label: "카난",             icon: "⚙️" },
  { id: "structure",     label: "거리 구조",         icon: "🗺️" },
  { id: "facilities",    label: "주요 시설",         icon: "🏛️" },
  { id: "organizations", label: "조직",              icon: "🔧" },
  { id: "people",        label: "카난의 인물들",     icon: "👥" },
];

const kananStats = {
  population: "약 18만 명",
  raceComposition: [
    { race: "휴린",   pct: 45, color: "#2A5F9E" },
    { race: "엘다난", pct: 18, color: "#1A6B4A" },
    { race: "네바프",   pct: 16, color: "#8B6914" },
    { race: "필보르",   pct: 12, color: "#4A7A2E" },
    { race: "바나",     pct: 7,  color: "#B85C2A" },
    { race: "두앙",     pct: 2,  color: "#8B2D2D" },
  ],
  stats: [
    { label: "통치 형태", value: "상인 의회제" },
    { label: "현 수장",   value: "잔·데리다 (도시참사회 의장)" },
    { label: "종교",       value: "7대 신 신앙 (고바논 주신)" },
    { label: "언어",       value: "공통어, 라프어" },
    { label: "기후",       value: "온난" },
    { label: "수원",       value: "공공 수도 설비 이용" },
    { label: "수입",       value: "식료품, 광물, 석재, 목재, 귀금속 등" },
    { label: "수출",       value: "공예품, 마법 제품, 연금술 제품 등" },
  ],
};

const kananHistory = `카난은 동맹 중부, 넬수스 강 유역에 있는 도시 국가다. 파리스 동맹 최일의 공업 도시이며, 공예와 미술이 풍성한 예술 도시이기도 하다.

숲 속에 살며 소수의 네바프 직인들이 연금소를 경영하던 이 장소는 "땅의 시대"에서 살아남은 네바프들이 "불의 시대"의 엘다난들의 집락이었다고 생각된다. 당시에는 숲에 둘러싸인 공예 도시라 불렸다. 공업의 발달과 함께 주변 숲은 벌채되어, 이전의 숲의 면모는 이제 없다.

파리스 동맹 결성에 있어서는 "유적의 거리" 라인과 함께 주도적인 역할을 맡았으며, 초대 동맹 평의회 의장을 냈다.`;

const kananCurrentStatus = `발달한 연금술로 인해 숲의 거리에서 기계의 거리로 바뀐 지금도, 거리에 관련이 있는 네바프와 엘다난이 많이 볼 수 있다. 그들이 생산하는 연금 제품이나 마법 도구는 에린딜 전체에서도 높은 평가를 받고 있다.

거리의 정치 형태는 발달한 연금술에 의한 공업 도시를 중심으로 한 상인 대의제이다. 카난 도시참사회가 의사결정을 하며, 오래전부터 영주를 두지 않고 현재와 같은 도시 형태를 갖추어 왔다. 거리의 주요 산업은 연금술에 의한 공예와 중공업 제품으로, 거리 전체가 아름다운 경관을 이루고 있다. 이 거리에서 가장 뛰어난 건물은 고바논 신전이며, 이를 보기 위한 관광객이 끊이지 않는다.`;

const kananDistricts = [
  {
    name: "중심부",
    content: "카난 신전과 대성당, 연금철도 중앙역이 있는 카난의 중심부. 역을 중심으로 한 상업 지구이며, 유명한 관광지이기도 하다. 신전 근처에는 모험자들이 자주 들르는 가게나 여관이 풍부하다. 최근에는 대형 길드가 회관을 가까이 두는 경우도 많으며, 부유한 상인들이나 도시 귀족들의 저택이 밀집되어 있다.",
  },
  {
    name: "공업구",
    content: "카난의 선진적인 기술을 지탱하는 공업 구역. 연금 제품, 마법 도구, 무기와 방구를 만드는 연금로, 금속 공예를 만드는 직인의 집이나 다양한 공장이 빽빽이 들어서 있다. 직인 조합의 회관이나 시립 아트홀도 이 구역에 있다.",
  },
  {
    name: "항만구",
    content: "넬수스 강을 이용하는 선박이 정박하는 항구. 주변에는 시장과 선술집이 있으며, 많은 사람들이 바쁘게 일하고 있다. 항만 시장에서 거리 중심부로 이어지는 길의 주요 통행로는, 파리스 동맹에서도 유수의 상업 지구로 알려져 있다.",
  },
  {
    name: "주택구",
    content: "거리 중앙에서 북부까지 넓어지는 시민의 거주지. 연금철도의 골격에 의해 공업구와 항만구에 용이하게 접근할 수 있다. 공업구의 인구가 집중되어 주거지의 고층화 등으로 대응하고 있지만, 아직 지하 문제도 남아 있다.",
  },
];

const kananFacilities: Facility[] = [
  {
    name: "카난 중앙역",
    content: '"기계의 거리"의 상징이라 할 수 있는 도시 내 연금철도역. 카난 대성당의 맞은편에 있다. 이것을 기점으로 3개사의 철도가 거리 전체를 달리며, 시민을 항만구와 공업구로 이어준다. 관광객에게는 기념 스탬프 시스템이 인기이며, 이리아스 사의 인기가 특히 높다. 역사 내에는 식당, 잡화점, 토산물 가게가 즐비하여 아케이드 같은 역할을 한다. 최근에는 테스트 운행의 장갑열차도 운행 중이다.',
  },
  {
    name: "항만 시장",
    content: "거리 남서쪽에서 항만 쪽으로, 거리 중심부를 향해 뻗는 시장 거리. 항만에서 들어오는 신선한 생선, 야채, 곡물 등을 파는 항만 시장이다. 거리의 다양한 사람들이 이용하며, 도로에서는 살 손님을 불러 세우는 행상인과 여관 앞에서 호객하는 직원들이 활기를 더한다. 최근에는 철도 여행 확대를 통해 항만의 수출도 동쪽 방향으로 확장하려는 계획이 진행 중이다.",
  },
  {
    name: "카난 대성당",
    content: "100년에 1초도 빠진 것이 없다는 시계가 유명하다. 현재 모험자를 위한 의뢰 창구를 담당하고 있기도 하여 많은 사람들이 모인다. 방금 신관장에 취임한 실바라는 여성이 활기차게 운영하고 있다. 공사 시작으로부터 250년이 경과한 것으로 여겨지는 고바논 신전으로서도 이름이 높다.",
  },
  {
    name: "시립 아트홀",
    content: "공업구 중심에 있는 고급 연예를 즐기는 오락 시설. 연주회, 강연 등에 이용되는 대형 홀, 거대한 전시장이 있는 도서관, 레스토랑, 와인 바 등을 갖추고 있다. 각국의 악단과 귀족들이 즐겨 찾는 관광 스폿이며, 최근에는 연금술 미술을 뽐낸 다양한 아트 설치가 진행되고 있다.",
  },
];

const kananOrganizations: Org[] = [
  {
    name: "카난 직인 조합",
    type: "직인 조합",
    base: "카난, 카난 직인 조합의 관",
    leader: "아드윈·스미스",
    content: "거리에서 물건을 만들어 내는 직인들의 조합. 거리에서 만들어지는 공예품과 연금 기술의 운영, 미술관이나 박물관의 관리도 담당하고 있다. 대표 이외에도 연금술 기술의 지도와 연습 교육을 행하는 학교를 경영하고 있다.",
  },
  {
    name: "이리아스 철도회사",
    type: "회사",
    base: "공업구, 이리아스 철도회사 본사",
    leader: "이리아스·뮈레레이",
    content: "카난의 연금철도 운영을 담당하는 회사. 중앙역에서 공업구에 이르는 철도를 관리한다. 사장 이리아스는 엘다난의 남성으로, 관광용 PR과 서비스 제공에도 열심이어서 카난의 철도회사 3사 중 가장 인기가 높다.",
  },
  {
    name: "강철 연금병단",
    type: "군사 조직",
    base: "서문 근처, 강철의 관",
    leader: "다그란·퀸",
    content: "카난의 중심 전력이 되는 전사단. 연금에 의한 뛰어난 무기를 활용하는 연금 기사단으로, 도시 외벽을 수비하는 부대와 도시 내부의 경찰 및 수비 전문 부대로 구성되어 있다. 최근에는 거대한 연금 로봇과 연금열차를 조합한 전차를 개발 중이라는 소문도 있다.",
  },
  {
    name: "산림 경비대",
    type: "군사 조직",
    base: "중앙역 근처, 숲의 돌이 회관",
    leader: "페임·오닐",
    content: "카난 인근의 산림에서 출현하는 마수들로부터 거리를 지키는 부대. 산림 경비대라 이름 붙여졌지만, 실제의 임무는 카난 인근의 산림에서 출현하는 마족의 감시와 탐색이 되고 있다.",
  },
  {
    name: "카난 도시참사회",
    type: "정무 기관",
    base: "중앙역 근처, 도시참사회 건물",
    leader: "잔·데리다",
    content: "카난의 의사결정 기관. 도시 상인들에 의한 선거를 통해 의장을 임명하는 방식으로 전통적인 형태를 이루고 있다. 의원들의 이해 관계에 의해 항상 다양한 정치 분쟁이 발생하는 실태는 변하지 않는다.",
  },
];

const kananCharacters: Character[] = [
  {
    name: "ミューズ・アルドゥーラ",
    nameKo: "뮤즈·알두라",
    quote: "마티아스…… 심중을 알 수가 없어",
    race: "휴린", gender: "여", age: "35",
    hairColor: "금", eyeColor: "갈색", skinColor: "흰",
    title: "파리스 동맹 평의회 의장 대리",
    content: "파리스 동맹의 평의장 대리. 권력을 순회하는 각 도시 참사인들 간의 협상 관계 속에서 평의원회와 동맹의 평화를 위해 확실히 자신의 권력 기반을 다지고 있다. 직전 평의장 선거에서 마티아스의 상담을 받아 간신히 대리로 승격됐다.",
  },
  {
    name: "シルヴァ",
    nameKo: "실바",
    quote: "당신과는 코드가 맞을 것 같아",
    race: "휴린", gender: "여", age: "34",
    hairColor: "보라", eyeColor: "갈색·청", skinColor: "흰",
    title: "카난 신전 신관장",
    content: "대담한 판단력과 행동력으로 알려진 카난의 신관장. 행동파이며, 서류 업무는 부하에게 맡기고 스스로는 현장에 나가 탐색이나 모험자를 이끌고 일을 하고 있다. 그랑펠덴 왕국과 함께 일하는 것으로 알려져 있으며, 항상 뛰어난 인재를 찾고 있다.",
  },
  {
    name: "ジャン・デリダ",
    nameKo: "잔·데리다",
    quote: "손자는 나한테 맡겨줄 것이지요!?",
    race: "네바프", gender: "남", age: "65",
    hairColor: "흰", eyeColor: "검은", skinColor: "황갈색",
    title: "카난 도시참사회 대표",
    content: "카난의 도시 행정관이자 도시참사회 대표. 선거를 통해 사무 일을 맡아 재임을 거듭해 왔다. 원래는 유명한 엔지니어였으며, 기술력을 주변에 전수하여 도시 행정의 수뇌에 올라왔다. 17세의 손녀를 눈에 넣어도 아프지 않을 정도로 사랑한다고 한다.",
  },
  {
    name: "モエラド",
    nameKo: "모에라드",
    quote: "자랑의 연구품을 보여줄게요",
    race: "휴린", gender: "남", age: "69",
    hairColor: "적갈색", eyeColor: "갈색", skinColor: "흰",
    title: "자칭 희대의 발명가",
    content: "카난 근교에 사는 노장 마법사 쿠·발칸의 제자. 스승이 이미 세상을 떠나 카난 교외에 '모에라드 하우스'라 불리는 자신의 집을 세우고 살고 있다. 다양한 마법 제작에 여념이 없고, 최근에는 마족·대마족을 위한 마법 도구 개발을 담당하고 있다. 천재적인 재능은 전문가도 인정하지만 그 감각은 타인이 이해하기 어렵다.",
  },
  {
    name: "フィリポス・フィルノス",
    nameKo: "필리포스·필르노스",
    quote: "스승께서는 이렇게 말씀하셨습니다",
    race: "필보르", gender: "남", age: "23",
    hairColor: "금", eyeColor: "갈색", skinColor: "흰",
    title: "쿠·발칸의 제자",
    content: "카난 근교에 사는 노장 마법사 쿠·발칸의 제자. 스승이 돌아가신 후에도 원만하게 소통하는 희귀한 인물이기도 하다. 동문 선배인 모에라드를 '선생님'이라 부르며 따르고 있다. 열심히 쿠·발칸의 가르침을 이어받으려 하고 있다.",
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

function KananSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>파리스 동맹 도시 카난 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {kananStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {kananStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {kananStats.raceComposition.map((r, i) => (
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
      <SecTitle title="카난의 역사" />
      <Prose text={kananHistory} />
      <SecTitle title="카난의 현황" />
      <Prose text={kananCurrentStatus} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"파리스 동맹에서도 가장 많은 인구를 자랑하는 이 거리는 항만구, 공업구, 주택구로 나뉘며, 잡다하고 활기가 넘쳐흐른다. 거리의 가장 큰 특색은 연금철도의 존재로, 거리 머리 위를 무수히 달리는 연금철도에 의해 어느 구역에서도 간편히 이동하는 것이 가능하다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {kananDistricts.map((d, i) => (
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
        카난의 주요 시설을 소개한다. 연금철도가 달리는 기계 문명의 도시답게 각 시설도 독특한 특색을 가지고 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {kananFacilities.map((f, i) => (
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
        카난과 관련이 깊은 조직을 소개한다. PC의 의뢰나 지시를 수행하는 조직으로서 시나리오에 활용하거나, 커넥션으로 취득할 수 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {kananOrganizations.map((o, i) => (
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
        "기계의 거리" 카난의 주요 인물들을 소개한다. PC의 의뢰인이나 협력자, 혹은 적대자로서 시나리오에 등장할 수 있다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {kananCharacters.map((c, i) => (
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

export default function KananPage() {
  const [activeId, setActiveId] = useState("kanan");
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
      case "kanan":         return <KananSection />;
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
        width: 248, minWidth: 248, background: "#101820", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#507090", marginBottom: 6 }}>PARIS ALLIANCE · KANAN</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "기계의 거리"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>카난</span>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#305060", lineHeight: 1.6 }}>
          <a href="/gran-felden" style={{ color: "#507090", textDecoration: "none", fontSize: "11px" }}>← 파리스 동맹으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE · "MACHINE CITY" KANAN</div>
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
