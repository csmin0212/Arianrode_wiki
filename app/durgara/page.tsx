'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#3A5070";
const ACCENT_LIGHT = "#C8D8E8";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "durgara",       label: "두르가라",           icon: "🏴‍☠️" },
  { id: "structure",     label: "거리 구조",           icon: "🗺️" },
  { id: "facilities",   label: "주요 시설",            icon: "🏛️" },
  { id: "organizations", label: "조직",                icon: "⚓" },
  { id: "people",        label: "두르가라의 인물들",   icon: "👥" },
];

const durgStats = {
  population: "약 1만 5천 명",
  raceComposition: [
    { race: "휴린",   pct: 78, color: "#2A5F9E" },
    { race: "두앙",     pct: 9,  color: "#8B2D2D" },
    { race: "엘다난", pct: 8,  color: "#1A6B4A" },
    { race: "네바프",   pct: 3,  color: "#8B6914" },
    { race: "바나",     pct: 1,  color: "#B85C2A" },
    { race: "필보르",   pct: 1,  color: "#4A7A2E" },
  ],
  stats: [
    { label: "통치 형태", value: "상공평의회에 의한 합의제" },
    { label: "현 수장",   value: "드레이크·볼가르니 (시장)" },
    { label: "종교",       value: "아에마, 그란아인, 고바논" },
    { label: "언어",       value: "공통어, 반즈어" },
    { label: "기후",       value: "온난" },
    { label: "수원",       value: "지하수 이용" },
    { label: "수입",       value: "식료품, 목재, 대갈 등" },
    { label: "수출",       value: "선박, 포도주, 금세공품 등" },
  ],
};

const durgHistory = `두르가라는 핀지아스 섬과 에린딜 본토 대륙 사이에 떠 있는 고립 섬(孤島)의 도시이다. 바이킹(*) 의 거점으로 발달했던 유서 깊은 집락이 그 기원이며, "해상의 도시"라 부르는 이도 있다.

(*) 에린딜에서의 바이킹은 배의 보유에 능하고, 교역과 용병, 약탈 등 돈벌이를 생업으로 삼는 자들을 가리킨다. 그들은 항해와 전투 기술을 대대로 전하며 바다를 누빈다.

약 60년 전, 일제히 해적 토벌에 나선 반즈탄 제국이 공략해 들어오기 전까지, 어느 도시의 지배자도 도저히 손을 쓸 수 없었다. 항복의 대가로 자치를 인정받은 두르가라는, 표면상 제국의 종속 도시가 됐지만 오래된 자치 경향을 유지하고 있다. 현재도 도시의 거리 곳곳에 바이킹 시대의 성채나 항구의 흔적이 남아 있으며, 지금은 수수께끼로 여겨지는 정도이다.`;

const durgCurrentStatus = `거리의 주민 대부분은 바이킹 혹은 바이킹 관계자이며, 생업은 교역과 선박 건조가 중심이다. 신앙은 항구를 중심으로 한 대로 주변에 성행하며, 다양한 사람들이 모여드는 분위기는 크게 변하지 않았다. 거리는 항구를 중심으로 혼잡스럽고 활기가 넘친다.

정치는 상공평의회에 의한 합의제. 의원은 입후보 혹은 추천으로 일어서며, 시민의 투표로 선출된다. 의원으로 선발되는 자는 관례적으로 바이킹의 실력자가 많다.

거리는 상공평의회와 통일하는 형태로 성립되고 있다. 의원들의 이해관계에 의해 항상 다양한 정치 분쟁이 일어나는 실태는 변하지 않는다.`;

const durgDistricts = [
  {
    name: "항만지구",
    content: "고도의 관문이 되는 항구와 그 주변 지구. 고대부터 두르가라의 주민들이 거주해 온 장소이자, 현재는 성행하는 무역항으로서의 역할을 하고 있다. 항만 시장과 창고가 즐비하며, 역무소를 겸한 화물 검사소도 이곳에 있다. 교역이 번성한 두르가라에서 가장 활기찬 지역이다.",
  },
  {
    name: "마레 대로",
    content: "항구에서 이어지는 마레 대로라 불리는 일대에는, 여행자나 뱃사람들을 대상으로 한 음식점 거리가 있다. 상조회라 불리는 상인들의 호조 조합이 구역의 운영을 담당하고 있다. 선술집과 도박장이 늘어서 있으며, 밤이 되면 더욱 활기를 띠는 이 도시의 핵심 오락 구역이다.",
  },
  {
    name: "신전지구",
    content: "항구에서 완만한 언덕길을 올라 거리 중심에 위치하는 언덕에는 두르가라 대신전이 있다. 시의 중심을 내려다볼 수 있는 이 언덕 주변에는 두르가라 상공평의회 등의 행정 기관이나 교역 창구 등의 상업 시설이 집중되어 있다.",
  },
  {
    name: "황금 골목",
    content: "신전지구에서 동쪽의 주택 지역 방향으로 뻗는 작은 골목. 거리 이름대로 금속 세공과 무구를 만드는 공방이 많이 서 있다. 고급품부터 실용품까지 폭넓게 취급하며, 두르가라산 금세공품은 제국 전역에 유통된다.",
  },
  {
    name: "고급 주택지구",
    content: "신전지구보다 높은 곳에 넓어지는 부유층 주택가. 넓은 정원을 갖춘 별장이 늘어서 있다. 또한 이곳에는 이 부유층의 저택들이 소유하는 농지와 목장이 있으며, 포도와 올리브 등도 재배되고 있다.",
  },
  {
    name: "주택지구",
    content: "거리 동쪽에 펼쳐지는 주거 구역. 밭과 농업 종사자의 집들이 성기게 모인 전원 풍경이 펼쳐진다. 두르가라 주민의 일상 생활의 중심이 되는 조용한 구역이며, 소규모 가내 수공업이나 어업 종사자들도 많이 거주한다.",
  },
];

const durgFacilities: Facility[] = [
  {
    name: "마레 대환락가",
    content: "거리 남쪽에 있는 마레 대로를 중심으로 한 환락가. 음식점이나 주점, 도박장, 기묘한 숙소가 많고, 무기를 다루는 직인의 점포와 뱃사람들의 집합 주거도 늘어서 있다. 수많은 점포들이 즐비하고 거리의 분위기는 혼잡스럽다. 해적들이 협박으로 얻은 황금을 마구 쏟아붓는 광경도 보이며, 거대하게 부풀어 오른 음식점으로 보아 오래전부터 사람들이 모여 오는 것을 알 수 있다.",
  },
  {
    name: "해적항",
    content: "거리 남쪽에 있는 항구와 그 주변 지구. 과거에는 두르가라 주민들이 거주하던 곳이었지만, 해적선이 숨겨두던 것에서 유래한 이름이다. 현재는 많은 무역선이나 어선이 정박하는 교역항으로 변모했다. 그 규모는 핀지아스 섬의 항구나 에를랑 왕국의 연안 도시들과 비교해, 큰 것이 아니다. 오히려, 원래부터 외적을 목표로 하여 넓지 않게 만들어졌기 때문에, 항구가 외부로 파고들게 되어 있다.",
  },
  {
    name: "두르가라 신전",
    content: "두르가라가 자랑하는 거대한 신전. 항구를 내려다볼 수 있는 언덕 위에 세워진다. 이 신전에 아에마 신전, 서쪽에 그란아인 신전, 동쪽에 고바논 신전이 나란히 위치하는 3개의 신전 광장이 있어, 시민들에게 열린 대정원이기도 하다. 관광 명소이며, 다양한 거래 창구와 모험자를 위한 의뢰 창구도 갖추고 있다. 신관장은 필보르족의 멜노스이다.",
  },
  {
    name: "칼간 조선소",
    content: "네바프의 칼간이 경영하는 조선소. 거리의 남문 앞에 도크를 갖추어, 비밀리에 수리도 할 수 있는 장소이다. 지금은 두르가라에서 가장 큰 조선소로 성장하고 있으며, 천 명 이상의 인원이 이 조선소에 관여하고 있다. 칼간이 배운 배의 지식은 폭넓고, 각종 선박에서 대형 조선소에 이르기까지 모든 제조를 담당한다. 여기서 나온 배를 가지는 것은, 두르가라의 지위의 하나가 됐다.",
  },
];

const durgOrganizations: Org[] = [
  {
    name: "두르가라 상공평의회",
    type: "정부 기관",
    base: "신전지구, 상공평의회 회관",
    leader: "드레이크·볼가르니",
    content: "두르가라의 상공 회의에 의한 통치 조직. 도시 전체가 해상 교역으로 성장하는 두르가라에서, 의원들의 이해관계에 의한 정치적 합의로 도시를 운영한다. 시장 드레이크 볼가르니의 행정 능력과 바이킹 지도자로서의 카리스마가 이 합의제의 중심 역할을 한다.",
  },
  {
    name: "해전비병단",
    type: "군사 조직",
    base: "해적항 근처, 해전비병단 파수소",
    leader: "레인·오코너",
    content: "바이킹을 중심으로 하는 군사 조직으로, 상공평의회와의 계약으로 도시를 지키고 있다. 의원은 선거로 선출되며, 시장이 승인한다. 의원의 외부 사람을 향한 강함을 발휘하는 것으로 알려져 있다. 계약에 의해서 도시의 외부로도 군사 도움을 제공하며, 교역의 호위나 적대 세력에 대응하기도 한다.",
  },
  {
    name: "산호회",
    type: "상인 조합",
    base: "마레 대환락가, 산호의 관",
    leader: "아만다·반필드",
    content: "환락가의 점주들로 구성된 상인 조합. 환락가를 정리하는 역할로서, 환락가 도처에서 가게들이 결성하여, 힘을 합쳐 강해지기 위한 목적으로 구성됐다. 조합은 거래에 있어 표면상 편의를 제공하는 동시에, 표면에서 볼 수 없는 뒷사회와도 연결되어 있다. 뒷사회와의 관계에 의해 두르가라의 모든 정보가 그녀 아래에 집결한다고 알려져 있다.",
  },
  {
    name: '해적단 "상어의 이빨"',
    type: "사병 조직",
    base: "두르가라 근교의 은거지",
    leader: "캐러웨이",
    content: "두르가라 근교의 은거지를 거점으로 하는 해적단. 두르가라 근처의 5개 은거지를 탈출구로 구성되어 있다. 과거에 해적업에 종사했던 자들이나 그 후계자들로 구성된다. 한때 해적업에 헌신했던 두르가라 시민의 전통을 계승하여, 제국 해군의 배를 중심으로 약탈과 역습을 수행하고 있다.",
  },
  {
    name: "토르바인 해운상회",
    type: "개인 상회",
    base: "마레 대환락가",
    leader: "라이라·토르바인",
    content: "두르가라의 해운상회. 수척의 선박으로 포도주와 보존 식품을 주로 운반하는 것이 중심이다. 상회의 회장 라이라 토르바인이 뒤를 잇게 되어, 상회 확대에 나서고 있다. 신규 항로의 개척이나 사업주의 모집, 새로운 건술의 건설 등 다양한 신규 사업을 추진하고 있다.",
  },
];

const durgCharacters: Character[] = [
  {
    name: "ドレイク・ボルガーニ",
    nameKo: "드레이크·볼가르니",
    quote: "자잘한 것은 괜찮아",
    race: "네바프", gender: "남", age: "90",
    hairColor: "흰", eyeColor: "갈색", skinColor: "담흑색",
    title: "두르가라 시장",
    content: "두르가라의 시장. 원래는 바이킹의 용병으로, 젊은 시절 체력을 밑천으로 해운 회사를 설립하여, 산업과 상업을 성공시켰다. 현재는 상점으로서도 활약을 계속하며, 호방한 성격을 싫어하는 자는 적지 않지만, 두르가라의 젊은 바이킹들을 잘 아우르는 인물이다.",
  },
  {
    name: "アマンダ・バンフィールド",
    nameKo: "아만다·반필드",
    quote: "이 도시에는 이 도시의 방식이라는 게 있어",
    race: "휴린", gender: "여", age: "72",
    hairColor: "회백색", eyeColor: "파란", skinColor: "흰",
    title: "산호회 대표 · 환락가 실력자",
    content: "마레 대환락가에서 고급 유곽을 비롯한 여러 점포를 경영하는 노파. 환락가를 아우르는 역할로서, 뒷사회도 정통한 여장부. 두르가라의 온갖 정보가 그녀 아래에 모인다고 알려져 있다. 늙었다고는 해도, 당당한 거동에는 사람의 눈을 끌어당기는 아름다움과 말할 수 없는 위엄이 있다.",
  },
  {
    name: "ライラ・トルバイン",
    nameKo: "라이라·토르바인",
    quote: "이번 아이디어야말로 될 것 같지 않나요!",
    race: "바나묘족", gender: "여", age: "30",
    hairColor: "갈색", eyeColor: "갈색", skinColor: "연한 황색",
    title: "토르바인 해운상회 회장",
    content: "토르바인 해운상회의 회장. 최근 아버지에게서 뒤를 이었다. 패기 넘치는 성격의 소유자. 주변의 기대에 부응하려 의욕을 불태우고 있다. 사업 확대를 향해 신규 항로의 개척이나 사업주 모집, 새로운 건술의 건설 등 다양한 신수를 펼치고 있지만, 다소 서두르는 감이 없지 않은 것도 사실이다.",
  },
  {
    name: "キャラウェイ",
    nameKo: "캐러웨이",
    quote: "그것도 또한, 재미있겠는걸…",
    race: "휴린", gender: "남", age: "40",
    hairColor: "빨간", eyeColor: "녹색", skinColor: "적동색",
    title: '"상어의 이빨" 해적단장',
    content: "최근 드물어진 해적. 두르가라 근처를 중심으로 신성 제국의 배 등을 습격하여 약탈 행위를 하고 있다. 약탈적인 면도 많고, 재미있으면 전부 좋다는 인물. 해적 행위가 바다 생활을 위해서라기보다는, 항상 위험과 맞서는 것이 목적에 맞아있다고 생각된다.",
  },
  {
    name: "レイン・オコナー",
    nameKo: "레인·오코너",
    quote: "결국 어느 쪽이 좋아? 헐값은 사절이야",
    race: "휴린", gender: "남", age: "46",
    hairColor: "검은", eyeColor: "파란", skinColor: "흰",
    title: "해전비병단 대표",
    content: "해전이라면 무적을 자랑하는 해전비병단의 대표. 그 자신과 상처 자국이 남은 전투에 달려들고 싶어하는 용감한 바이킹. 해상의 부대를 이끌며, 계약에 의한 경우에만 군사 교섭에도 응해야 한다. 보수에 대해서는 냉정하여, 상인들도 그 값어치를 알고 있어 응승이 많다.",
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

function DurgSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>신성 반즈탄 제국 도시 두르가라 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {durgStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {durgStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {durgStats.raceComposition.map((r, i) => (
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
      <SecTitle title="두르가라의 역사" />
      <Prose text={durgHistory} />
      <SecTitle title="두르가라의 현황" />
      <Prose text={durgCurrentStatus} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"두르가라의 거리는 고도의 중앙에 복잡하게 뻗은 만 입구에 항구가 위치하며, 거기서 방사상으로 거리가 넓어진다. 섬은 산지가 많으며, 거리도 경사를 따라 언덕이 많고 대부분은 언덕 위에 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {durgDistricts.map((d, i) => (
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
        두르가라의 주요 시설을 소개한다. 바이킹 문화와 제국의 영향이 혼재하는 독특한 시설 구성이 이 도시의 매력이다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {durgFacilities.map((f, i) => (
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
        두르가라와 관련이 깊은 조직을 소개한다. PC의 의뢰나 커넥션으로 활용할 수 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {durgOrganizations.map((o, i) => (
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
        "고도의 거리" 두르가라의 주요 인물들을 소개한다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {durgCharacters.map((c, i) => (
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

export default function DurgaPage() {
  const [activeId, setActiveId] = useState("durgara");
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
      case "durgara":       return <DurgSection />;
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
        width: 248, minWidth: 248, background: "#111820", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#405870", marginBottom: 6 }}>HOLY VANSTAR EMPIRE · DURGARA</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "고도의 거리"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>두르가라</span>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#283848", lineHeight: 1.6 }}>
          <a href="/vanstar" style={{ color: "#405870", textDecoration: "none", fontSize: "11px" }}>← 신성 반즈탄 제국으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>HOLY VANSTAR EMPIRE · "ISOLATED ISLAND CITY" DURGARA</div>
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
