'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#1A6080";
const ACCENT_LIGHT = "#C8E0EC";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "clanvel",       label: "크란벨",           icon: "💧" },
  { id: "structure",     label: "거리 구조",            icon: "🗺️" },
  { id: "facilities",    label: "주요 시설",            icon: "🏛️" },
  { id: "organizations", label: "조직",                 icon: "🔱" },
  { id: "people",        label: "크란벨의 인물들",   icon: "👥" },
];

const clanvelStats = {
  population: "약 2만 명",
  raceComposition: [
    { race: "휴린",   pct: 60, color: "#2A5F9E" },
    { race: "엘다난", pct: 19, color: "#1A6B4A" },
    { race: "네바프",   pct: 10, color: "#8B6914" },
    { race: "필보르",   pct: 9,  color: "#4A7A2E" },
    { race: "버나",     pct: 2,  color: "#B85C2A" },
    { race: "두앙",     pct: 1,  color: "#8B2D2D" },
  ],
  stats: [
    { label: "통치 형태", value: "신전에 의한 통치" },
    { label: "현 수장",   value: "웰치 (신관장)" },
    { label: "종교",       value: "7대 신 신앙 (아에마 주신) + 정령 신앙" },
    { label: "언어",       value: "공통어" },
    { label: "기후",       value: "온난" },
    { label: "수원",       value: "운하 수계 이용" },
    { label: "수입",       value: "식료품, 포도주, 목재" },
    { label: "수출",       value: "모직물, 공예품" },
  ],
};

const clanvelHistory = `크란벨는 파리스 동맹 남부, 강과 운하가 교차하는 수상 도시다. 도시 이름은 창건의 전설에 유래하는데, "아버지 클란"과 "어머니 베르"라 불리는 두 영웅이 이 땅을 개척하여 도시를 세웠다고 전해진다.

고대부터 수계 교통의 요충으로 기능해 왔으며, 정령 신앙과 7대 신 신앙이 융합된 독자적인 신앙 문화를 발전시켜 왔다. 현재도 신전이 도시 통치를 맡고 있으며, 신관장 웰치가 도시 전반의 행정을 주관한다.`;

const clanvelCurrentStatus = `운하와 수문이 거리 전체에 그물처럼 얽혀 있어 배를 이용한 이동이 일상적인 도시이다. 수면을 오가는 작은 배들과 아치형 돌다리, 수문이 어우러진 경관이 이 도시만의 분위기를 자아낸다.

모험자들에게는 몬스터 콜로세움과 F리그로 알려진 도시이기도 하다. 전투 경기를 즐기는 문화가 뿌리 깊게 자리 잡고 있어, 파리스 동맹 전역에서 관람객이 모여든다.`;

const clanvelDistricts = [
  {
    name: "수문 지구",
    content: "도시 입구에 해당하는 수문과 그 주변을 중심으로 발달한 구역. 외부에서 유입되는 물자와 사람이 가장 먼저 통과하는 곳으로, 상인과 뱃사람들이 북적인다. 수운 조합의 사무소가 이 지구에 위치하며, 화물 검사와 통행세 징수도 이곳에서 이루어진다.",
  },
  {
    name: "신전 지구",
    content: "크란벨 대신전을 중심으로 한 종교적 중심 구역. 신관들의 숙소와 수련 시설, 의료 시설이 밀집해 있다. 도시 통치의 실질적인 중심이기도 하며, 신관장 웰치의 집무실도 이곳에 있다. 아에마 신앙과 정령 신앙의 의식이 수시로 열린다.",
  },
  {
    name: "주택 지구",
    content: "시민들이 거주하는 구역. 운하에 면한 건물들이 늘어서 있으며, 집집마다 작은 선착장을 갖추고 있는 경우도 많다. 그란데 대로를 따라 상점가가 형성되어 있어, 시민들의 일상적인 쇼핑과 교류의 장이 되고 있다.",
  },
  {
    name: "투기장 지구",
    content: "몬스터 콜로세움을 중심으로 한 오락 구역. 경기가 열리는 날이면 파리스 동맹 각지에서 관람객이 몰려들어 도시 전체가 활기를 띤다. 콜로세움 주변에는 선술집, 무기점, 모험자 숙소 등이 즐비하다. F리그의 본부도 이 지구에 있다.",
  },
];

const clanvelFacilities: Facility[] = [
  {
    name: "몬스터 콜로세움",
    content: "크란벨의 명물이자 파리스 동맹 최대 규모의 전투 경기장. 모험자와 몬스터가 맞붙는 경기가 정기적으로 개최되며, 강함을 겨루는 문화가 이 도시에 깊이 뿌리내리고 있다는 증거이기도 하다. 경기는 F리그가 운영을 맡고 있으며, 우승자에게는 큰 상금과 명예가 주어진다. 도시를 방문한 모험자라면 한 번쯤 도전하거나 관전하게 되는 도시의 상징적인 시설이다.",
  },
  {
    name: "아버지 클란과 어머니 베르의 문",
    content: "도시의 정문에 해당하는 거대한 수문. 도시 창건의 전설에 나오는 두 영웅 \"아버지 클란\"과 \"어머니 베르\"의 이름을 딴 것으로, 수백 년의 역사를 자랑한다. 연간 도시 축제 때는 이 문을 중심으로 화려한 의식이 거행되며, 크란벨 시민들에게는 가장 소중한 상징물 중 하나다.",
  },
  {
    name: "크란벨 대신전",
    content: "아에마를 주신으로 모시는 크란벨의 종교적 중심. 건물 전체가 흰 석재로 지어졌으며, 운하에 면한 정면 파사드가 수면에 반사되는 모습이 이 도시의 대표적인 절경이다. 신관장 웰치가 이곳을 거점으로 도시 행정과 종교 업무를 동시에 관할한다. 치유 마법과 정령 의식이 정기적으로 행해지며, 시민들의 신앙 생활의 중심이 된다.",
  },
  {
    name: "그란데 대로",
    content: "크란벨를 남북으로 관통하는 주요 가로. 수문 지구에서 시작하여 신전 지구까지 이어지는 이 도로는 도시의 대동맥으로, 각종 상점과 시장이 늘어서 있다. 정기 시장이 서는 날에는 파리스 동맹 각지에서 상인들이 모여 물산을 교역한다. 도로 곳곳에 운하와 연결되는 소형 선착장이 마련되어 있어 수로 이동과의 환승도 편리하다.",
  },
];

const clanvelOrganizations: Org[] = [
  {
    name: "안다인 의용대",
    type: "군사 조직",
    base: "수문 지구, 의용대 본부",
    leader: "리오나·칼리",
    content: "크란벨의 방위와 질서 유지를 담당하는 의용대. 도시 내 치안 활동을 주로 맡으며, 콜로세움 경기 때의 경비도 이들의 몫이다. 대장 리오나·칼리는 젊고 패기 넘치는 전사로, 부하들에게 깊이 신뢰받고 있다.",
  },
  {
    name: "크란벨 수상 경비대",
    type: "군사 조직",
    base: "수문 지구, 경비대 선착장",
    leader: "리오나·모니",
    content: "도시를 둘러싼 운하와 수계를 감시하고 보호하는 전문 경비 조직. 소형 경비선을 운용하며 수상 밀수나 침입자를 단속한다. 안다인 의용대와는 별도의 계통으로 운영되며, 신전 지구와의 연계도 깊다.",
  },
  {
    name: "F리그",
    type: "스포츠 기관",
    base: "투기장 지구, 콜로세움 관리동",
    leader: "산토스",
    content: "몬스터 콜로세움의 전투 리그를 주관하는 기관. 경기 일정, 참가자 모집, 심판, 상금 지급까지 모든 운영을 담당한다. 대표 산토스는 전직 투기사 출신의 버나묘족 남성으로, 공정한 운영으로 파리스 동맹 전역에서 신뢰를 얻고 있다.",
  },
  {
    name: "크란벨 수운 조합",
    type: "상업 조합",
    base: "수문 지구, 조합 사무소",
    leader: "핀바·파렐",
    content: "도시 내외의 수운 교역을 관리하는 상인 조합. 수입품인 식료품, 포도주, 목재의 유통과 수출품인 모직물 및 공예품의 선적을 조율한다. 조합장 핀바·파렐은 교섭 능력이 뛰어난 베테랑 상인으로, 수계 무역 전반에 큰 영향력을 가지고 있다.",
  },
  {
    name: "마티아스 친위대",
    type: "사설 경호 조직",
    base: "주택 지구, 마티아스 저택",
    leader: "마티아스·아딘셀",
    content: "크란벨의 실력자 마티아스·아딘셀이 직접 이끄는 사설 경호 및 정보 조직. 표면상 마티아스 본인과 그 자산의 보호를 목적으로 하지만, 도시 정치에 보이지 않는 영향력을 행사한다는 소문이 끊이지 않는다.",
  },
];

const clanvelCharacters: Character[] = [
  {
    name: "ウェルチ",
    nameKo: "웰치",
    quote: "이 도시의 물은 아에마 여신의 은총입니다",
    race: "휴린", gender: "여", age: "22",
    hairColor: "붉은 갈색", eyeColor: "호박색", skinColor: "흰",
    title: "크란벨 신관장",
    content: "크란벨 대신전의 수장이자 도시 전체의 통치자. 약관의 나이에 신관장에 취임했으나, 아에마 여신에 대한 깊은 신앙심과 침착한 판단력으로 시민들의 신뢰를 얻고 있다. 신전 업무와 도시 행정을 동시에 처리하는 능력자이며, 정령과 교신할 수 있다는 소문도 있다.",
  },
  {
    name: "マティアス・アディンセル",
    nameKo: "마티아스·아딘셀",
    quote: "힘이란 가진 자가 사용하는 것이오",
    race: "휴린", gender: "남", age: "46",
    hairColor: "없음 (대머리)", eyeColor: "갈색", skinColor: "갈색",
    title: "크란벨의 실력자",
    content: "크란벨에서 막대한 부와 인맥을 가진 실력자. 자신의 친위대를 거느리며 도시의 이면에서 큰 영향력을 행사한다. 표면상으로는 상인이자 후원자로서 콜로세움과 F리그를 지원하고 있지만, 그 진짜 목적은 불분명하다. 카난의 파리스 동맹 평의회 대리 뮤즈·알두라와도 접점이 있는 것으로 알려져 있다.",
  },
  {
    name: "サントス",
    nameKo: "산토스",
    quote: "최강을 가리는 것이 내 사명이지",
    race: "버나묘족", gender: "남", age: "53",
    hairColor: "갈색", eyeColor: "검은", skinColor: "황색",
    title: "F리그 대표",
    content: "몬스터 콜로세움 F리그의 운영 대표. 원래는 투기사 출신으로 콜로세움에서 이름을 날렸으나, 부상을 계기로 은퇴하여 리그 운영에 전념하게 됐다. 공정한 운영 방침으로 파리스 동맹 전역의 투기사들에게 신뢰받고 있다. 마티아스와의 관계는 복잡하다는 소문이 있다.",
  },
  {
    name: "アニエス・バラティエ",
    nameKo: "아니에스·바라티에",
    quote: "물의 목소리를 들어보세요",
    race: "엘다난", gender: "여", age: "30",
    hairColor: "금", eyeColor: "파란", skinColor: "흰",
    title: "크란벨 신전 사제",
    content: "크란벨 대신전에서 정령 신앙 의식을 담당하는 엘다난 사제. 수계 정령과의 교신에 뛰어난 재능을 가지고 있으며, 신관장 웰치의 최측근이기도 하다. 도시의 운하를 관리하는 수계 정령들과 정기적인 의식을 통해 소통하며, 수문 조작이나 홍수 예방에도 기여하고 있다.",
  },
  {
    name: "ディガム・マクギガン",
    nameKo: "디감·막기간",
    quote: "하늘에서 보면 이 도시가 제일 아름답지",
    race: "두앙천익족", gender: "남", age: "39",
    hairColor: "금", eyeColor: "갈색", skinColor: "갈색",
    title: "수상 경비대 정찰 대원",
    content: "크란벨 수상 경비대 소속의 두앙천익족 정찰 대원. 날개를 이용한 하늘에서의 감시 임무를 주로 담당하며, 수계 전반의 이상 탐지에 활약한다. 경쾌한 성격으로 경비대 내에서 인기가 높으며, 도시 지리를 하늘과 수면 양쪽에서 파악하는 몇 안 되는 인물이다.",
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

function ClanvelSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>파리스 동맹 도시 크란벨 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {clanvelStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {clanvelStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {clanvelStats.raceComposition.map((r, i) => (
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
      <SecTitle title="크란벨의 역사" />
      <Prose text={clanvelHistory} />
      <SecTitle title="크란벨의 현황" />
      <Prose text={clanvelCurrentStatus} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"크란벨는 운하를 중심으로 네 개의 주요 지구로 나뉜다. 수문 지구, 신전 지구, 주택 지구, 투기장 지구가 각각의 기능을 담당하며, 운하와 다리로 유기적으로 연결되어 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {clanvelDistricts.map((d, i) => (
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
        크란벨의 주요 시설을 소개한다. 수상 도시 특유의 경관과 활기찬 투기 문화를 반영한 시설들이 이 도시의 매력을 이루고 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {clanvelFacilities.map((f, i) => (
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
        크란벨와 관련이 깊은 조직을 소개한다. PC의 의뢰나 커넥션 대상으로 활용할 수 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {clanvelOrganizations.map((o, i) => (
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
        "물의 거리" 크란벨의 주요 인물들을 소개한다. PC의 의뢰인이나 협력자, 혹은 적대자로서 시나리오에 등장할 수 있다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {clanvelCharacters.map((c, i) => (
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

export default function ClanVelPage() {
  const [activeId, setActiveId] = useState("clanvel");
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
      case "clanvel":       return <ClanvelSection />;
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
        width: 248, minWidth: 248, background: "#0C1C28", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <a href="/gran-felden" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 파리스 동맹으로</div>
        </a>
        <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#305870", marginBottom: 6 }}>PARIS ALLIANCE · CLAN-VEL</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "물의 거리"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>크란벨</span>
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
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT_LIGHT}80 100%)`,
          borderBottom: `3px solid ${ACCENT}25`,
          padding: mob ? "60px 20px 28px" : "40px 48px 36px",
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE · "WATER CITY" CLAN-VEL</div>
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
