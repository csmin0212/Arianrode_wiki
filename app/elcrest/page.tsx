'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#3A6B48";
const ACCENT_LIGHT = "#D0EDD8";
const SIDEBAR_BG = "#0A1A10";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "현자의 거리 엘크레스트", icon: "🏙️" },
  { id: "districts", label: "지역 구성",              icon: "🗺️" },
  { id: "orgs",      label: "조직",                   icon: "⚜️" },
  { id: "college",   label: "엘크레스트 칼리지",       icon: "🎓" },
  { id: "people",    label: "엘크레스트의 인물들",     icon: "👥" },
];

const stats = [
  { label: "인구",      value: "약 1만명" },
  { label: "휴린",    value: "50%" },
  { label: "엘다난",  value: "21%" },
  { label: "네바프",    value: "11%" },
  { label: "필보르",    value: "8%" },
  { label: "두앙",      value: "6%" },
  { label: "바나",      value: "4%" },
  { label: "정치형태",  value: "평의회에 의한 합의제" },
  { label: "현재 수장", value: "알프레드·요크 (대행)" },
  { label: "신앙",      value: "브리간티아 신앙" },
  { label: "언어",      value: "공통어, 뱅센어, 로그레스어" },
  { label: "물",        value: "지하수 이용" },
  { label: "기후",      value: "온화" },
  { label: "수입품",    value: "곡물, 식료품, 섬유물, 석재, 목재, 향신료류" },
  { label: "수출품",    value: "연금술 제품, 마술 제품, 출판물 등" },
];

interface District { name: string; content: string; }

const districts: District[] = [
  {
    name: "중앙부",
    content: "\"현자의 광장\"을 중심으로 평의회장과 상공회의소 등 도시 운영의 중추가 되는 건물이 늘어서 있다. 광장에는 예로부터 로아셀 호수 탐사를 위해 모인 현자들이 밤새 토론을 나누었다는 유서 있는 광장이다.\n\n광장에서 동서의 정문으로 이어지는 큰 길과 남쪽 호수로 향하는 큰 길 두 줄기가 있어, 거리 상업의 중심지로 연중 활기를 띠고 있다.",
  },
  {
    name: "엘크레스트 칼리지 구역",
    content: "도시 북쪽 절반을 차지하는 전기제(全寮制) 대학 엘크레스트 칼리지의 부지이다. 칼리지를 가르는 외벽이 도시 북부를 덮고 있다. 칼리지 북쪽 정면은 정문인 곳도 있어, 광장 북쪽에는 일찍이 유명했던 엘크레스트 칼리지에 이어지는 정문이 있다.\n\n칼리지에 관한 자세한 내용은 엘크레스트 칼리지 페이지를 참고할 것.",
  },
  {
    name: "공업지대",
    content: "상업부 주위에 넓게 펼쳐지는 것이 마술 제품과 연금술 제품을 제조하는 공장 지구이다. 칼리지를 나와 이 구역에 정착하는 자도 많으며, 칼리지와는 깊은 인연이 있다.",
  },
  {
    name: "호수 주변",
    content: "도시 남쪽에 펼쳐지는 로아셀 호수에는 로아셀 유적이라 불리는 고대 유적이 가라앉아 있다. 호수 부근에는 이 유적 탐사를 위해 찾아오는 학자나 모험자를 위한 상업 시설과 숙박 시설이 늘어서 있다. 또한 호수 주변에는 시민 주거도 있어 아담하게 생활이 영위되고 있다.",
  },
  {
    name: "농촌부",
    content: "도시 서쪽, 특히 북서쪽은 비교적 색 짙게 옛 촌락의 면모를 남기고 있으며, 오래된 민가나 별장 등이 점재하고 있다.",
  },
];

interface Org { name: string; type: string; base: string; leader: string; content: string; }

const orgs: Org[] = [
  {
    name: "엘크레스트 평의회",
    type: "행정기관",
    base: "평의회장",
    leader: "알프레드·요크 (대행)",
    content: "엘크레스트의 행정기관. 도시의 발전과 함께, 칼리지로부터는 독립한 자유 공정한 조직임을 표방하고 있다. 이곳에 소개된 조직은 평의회와 연결 있는 조직이며, PC가 모험의 중요한 임무를 받을 수 있다.",
  },
  {
    name: "엘크레스트 칼리지",
    type: "전기제 대학",
    base: "엘크레스트 북부",
    leader: "엘비라·알디리케",
    content: "도시의 심볼이기도 하며, 에린딜 유수의 학술 기관이기도 한 전기제 대학. 6개의 학생 기숙사에서 1,500명 이상의 학생이 공동 생활을 하고 있다. 신학부, 법학부, 마법학부, 연금술학부, 사도학부, 정찰학부의 5개 학부가 있으며, 학자나 정치가, 모험자의 여러 인재를 배출하고 있다. 또한 칼리지 상부와의 관련도 깊다.",
  },
  {
    name: "로아셀 유적 탐사 조사회",
    type: "설립 기관",
    base: "로아셀 호수 근처",
    leader: "보아라·블레이트",
    content: "로아셀 호수 깊은 곳에 있는 유적을 조사하는 모험자들의 창구가 되는 단체. 간단한 정도라면 통상 규정 범위 내에서 수행 가능하다. GM는 데이터를 적절히 수정하여 사용해도 좋다. 칼리지와 평의회의 공동 운영으로 관리되어, 조사 결과를 칼리지에 가져온다.",
  },
  {
    name: "엘크레스트 학생회",
    type: "학내 조직",
    base: "엘크레스트 칼리지",
    leader: "팜리시아",
    content: "엘크레스트 칼리지 내에서 학생의 자치 활동을 통괄하는 기관. 학내 행사, 학생 생활에 관련된 일 등을 주로 학생 생활 전반에 관련한다. 아래에는 여러 개의 학내 위원회가 있어, 학생의 거리에서 행동을 감시하는 외에 거리의 자경단으로서도 활동하고 있다.",
  },
  {
    name: "엘크레스트 중앙상회",
    type: "상인 조합",
    base: "현자의 광장 근처",
    leader: "오윈",
    content: "엘크레스트의 거리에 넓게 뻗은 상업 조합. 동쪽에서 찾아오는 상인들에 의해 운영되고 있다. 에를랑 왕국이나 번스터에서 찾아오는 행상인들의 중개 역할도 하며, 칼리지 내의 생활 협동 길드와도 상품을 조달하고 있다. 잡화나 무기 제품도 깊이 관련되고 있다.",
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

function PopBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: "12px", color: "#666", minWidth: 72, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, background: "#E8E3DA", borderRadius: 4, height: 10, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: ACCENT, height: "100%", borderRadius: 4, opacity: 0.8 }} />
      </div>
      <span style={{ fontSize: "12px", color: ACCENT, fontWeight: 600, minWidth: 36, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

function OverviewSection() {
  const popData = [
    { label: "휴린",   pct: 50 },
    { label: "엘다난", pct: 21 },
    { label: "네바프",   pct: 11 },
    { label: "필보르",   pct: 8 },
    { label: "두앙",     pct: 6 },
    { label: "바나",     pct: 4 },
  ];
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>엘크레스트 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {stats.filter(s => !["휴린","엘다난","네바프","필보르","두앙","바나"].includes(s.label)).map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6, gridColumn: ["수입품","수출품"].includes(s.label) ? "1 / -1" : undefined }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 80 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <SecTitle title="인구 구성 (약 1만명)" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
        {popData.map((d, i) => <PopBar key={i} label={d.label} pct={d.pct} />)}
      </div>
      <SecTitle title="에를랑·번스터·파리스 동맹 3국의 완충지대" />
      <Prose text={"에를랑 왕국, 번스터, 파리스 동맹의 3국이 강하게 맞붙는 완충 지대라는 지리적 관계에 있는 도시 국가이다. 에를랑 왕국과 신성 번스터 제국에 속하는 상대들이 중계 지점으로 이용하기 때문에 상업 도시로서도 주목받고 있다.\n\n가장 널리 알려진 이유는 도시 내에 전기제 대학인 엘크레스트 칼리지가 있다는 것이다. 로아셀 호수 탐사를 계기로 발전한 칼리지는, 대다수의 학자 수의 인재 양성 기관으로 알려져 있으며, 특히 정령마법 분야에서는 에린딜과도 두 번째를 다투는 것으로 알려져 있다. 거리에는 칼리지 입학을 지망하는 소년 소녀들이 많이 방문하며, 여름부터 가을에 걸쳐서의 수험·입학 시즌에는 거리 전체가 수험생들로 넘쳐난다." } />
      <SecTitle title="역사" />
      <Prose text={"에를랑·번스터·파리스 동맹 3국의 국경이 강하게 맞붙는 완충 지대라는 지리에 있는 도시 국가이지만, 평의회라는 조직을 중심으로 합의제 정치를 전개하고 있다. 어느 나라에도 속하지 않은 자유 공정한 조직임을 표방하고 있으며, 많은 연구자나 학생들, 혹은 그 자손만이 살면서 거리의 일상 상공업 제품은 마술 제품과 연금술 제품, 그것에 에를랑 왕국과 신성 번스터 제국에 속하는 상대들이 중계 지점으로 이용하기 때문에 상업 도시로서도 주목받고 있다.\n\n원래 작은 마을만이 있던 호수 주변에 100년 정도 전부터 서서히 사람이 모이기 시작하고, 도시가 형성됐다. 호수 기슭에 \"거리의 민\" 엘다가 행한다고 전해지는 고대 유적이 발견되어 연구자들이 많이 모이기 시작한 것이 계기였다." } />
    </div>
  );
}

function DistrictsSection() {
  return (
    <div>
      <Prose text={"엘크레스트는 로아셀 호수 기슭에 퍼진 작은 도시다. 도시 내는 호수에 가장 근접한 남쪽을 제외하면 도시 벽으로 둘러싸여 있다. 도시 내에서 갈 수 있는 문은 동서로 하나씩 있으며, 각각 「지식의 문」이라고 불린다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT, marginBottom: 10 }}>{d.name}</div>
            <Prose text={d.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OrgsSection() {
  return (
    <div>
      <Prose text={"여기서는 엘크레스트와 깊이 관련된 조직을 소개한다. 이곳에 소개된 조직은 PC가 모험의 임무를 받거나, 혹은 PC가 그 조직에 소속되어 행동하는 조직으로 이용할 수 있다."} />
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

function CollegeSection() {
  return (
    <div>
      <Prose text={"엘크레스트 칼리지는 에린딜 서방 중남부에 있는 전기제 대학으로, 칼리지는 거리의 대부분 북쪽 절반을 차지하는 넓은 부지를 가진다."} />
      <SecTitle title="칼리지의 역사" />
      <Prose text={"호수의 유적이 발견되어 오래지 않아 유적 탐사 길드 \"빛의 검\"의 류·마쿨(*)이 모험자나 연구자를 불러들여, 유적 탐사를 위한 인재를 양성하는 큰 조직을 만들었다. 이내 여기에 수련자와 제자들이 모이고, 학교의 형태로 변해갔다. 그 무렵의 흔적은 이미 다소 마을에 불과했던 엘크레스트라는 도시는 칼리지의 성장과 함께 태어나고 확대해 갔다고 이를 수 있다.\n\n엘크레스트 칼리지는 창립 당초, 로아셀 호수 탐사의 인재 양성을 목적으로 하고 있었다. 하지만 현재에는 모험자 양성 외에도, 일반 학문, 정령마법, 연금술, 전투 기술 등 다양한 지식과 실기를 배우는 7년제 교육 기관이 되고 있다. 역사는 100년에 채 미치지 않는 학교지만, 그 실적은 빛나고 있다. 특히 정령마법의 연구에 대해서는 에린딜과도 두 번째를 다투는 것으로 알려져 있으며, 졸업생들이 다양한 나라에서 궁정 마술사로 달리고 있다."} />
      <SecTitle title="수강 과목" />
      <Prose text={"칼리지에는 신학부, 법학부, 마법학부, 연금술학부, 사도학부의 5개 학부가 있다. 입학 시에 소속 학부를 선택하며, 졸업에 필요한 필수 과목(*)은 학부마다 다르다. 그 이외의 과목에 대해서는 학생이 자유롭게 선택할 수 있는 시스템이 되고 있다.\n\n또한 세미나(*)라고 하는 소인수 수업도 있다. 세미나는 소속 학부별로 수강할 수 있는 과목이 정해져 있으며, 더욱 집중된 분야의 연구를 받을 수 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8, marginBottom: 20 }}>
        {["신학부","법학부","마법학부","연금술학부","사도학부","정령마법","연금술","전투 기술","유적 탐사"].map((s, i) => (
          <span key={i} style={{ fontSize: "13px", background: `${ACCENT}15`, color: ACCENT, padding: "5px 10px", borderRadius: 14, border: `1px solid ${ACCENT}30`, textAlign: "center" }}>{s}</span>
        ))}
      </div>
      <SecTitle title="칼리지의 1년" />
      <Prose text={"엘크레스트 칼리지의 학기 시작은 가을의 시작인 9월이다. 6월 말까지 1년간의 과정이 있어, 연말과 여름에 방학이 있지만 방학이 명항 후에는 학력 고사를 치르는 수업도 있어 그다지 편하게 깃털을 펴고 있을 여유가 없다.\n\n1년의 학교 행사 중에서 비교적 학생이 즐기는 행사가 4개 있다. 첫 번째는 매년 11월에 치러지는 다그데마 마법 주간. 두 번째는 4월에 치러지는 학원제에 해당하는 \"엘크레스트 제\". 세 번째는 각 학기 대항에서 경쟁 포인트를 겨루는 마쿨 제로, 연 6회 치러진다. 마지막으로 로그레스 대학·키르디아 국립학교·문스톤 엔터테인먼트 아카데미·단스&비안나 학교와의 5대학 교류 대회로, 4년에 1번 치러진다."} />
      <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, borderRadius: 8, padding: "14px 18px", marginTop: 16, fontSize: "13px", lineHeight: 1.8, color: "#555" }}>
        <strong style={{ color: ACCENT }}>자세한 정보:</strong> 엘크레스트 칼리지의 인물 및 캠퍼스 지도에 대해서는{" "}
        <a href="/elcrest-college" style={{ color: ACCENT, fontWeight: 600 }}>엘크레스트 칼리지 페이지</a>에서 확인할 수 있다.
      </div>
    </div>
  );
}

interface Person { name: string; role: string; race: string; gender: string; age: string; hair: string; eyes: string; skin: string; content: string; }

const people: Person[] = [
  {
    name: "알프레드·요크",
    role: "엘크레스트 평의회 의장",
    race: "휴린", gender: "남", age: "57",
    hair: "회색", eyes: "회색", skin: "흰색",
    content: "거리의 정점에 있는 엘크레스트 평의회의 현 의장. 낙향한 기사 겸 학자로, 세계 각지를 여행하는 모험자로 활동하다가 칼리지 교수가 되어 인재를 양성하고, 마침내 평의회 대표가 됐다. 항상 지식과 냉정한 판단으로 거리를 이끌고 있다. 공정함으로 알려져 있으며 카리스마적인 지도자이다.",
  },
  {
    name: "엘비라·알디리케",
    role: "엘크레스트 칼리지 학장",
    race: "엘다난", gender: "여", age: "191",
    hair: "청자색", eyes: "갈색", skin: "흰색",
    content: "칼리지의 학장이자 정령마법학을 가르치는 현역 교수이기도 하다. 온화하고 자주적이며 가르치는 것을 좋아하는 분위기로 학생 인기가 높다. 엄격한 시험을 부과하는 것으로도 알려져 있다. 칼리지 창설자의 유지를 지금도 이어받으며, 이 거리의 소수 인재 중 한 명이다.",
  },
  {
    name: "카미유라·셰필드",
    role: "칼리지 신학 준교수",
    race: "엘다난", gender: "여", age: "불명",
    hair: "금발", eyes: "녹색", skin: "흰색",
    content: "엘크레스트 칼리지에서 신학을 가르치는 준교수. 자신이 17대 \"대현인\"이라 불리는 세습 영웅 중 한 명이다. 한때 자신의 기억을 잃기도 했지만, 최근 되찾았다. 다른 사람에게 친절하고, 간혹 딱딱한 말을 하기도 하지만, 왜인지 학생으로부터 인기가 높다.",
  },
  {
    name: "샤를로트·이에미츠",
    role: "칼리지 소환마법학 준교수",
    race: "휴린", gender: "여", age: "24",
    hair: "검은색", eyes: "파란색", skin: "황색",
    content: "엘크레스트 칼리지에서 소환마법을 가르치는 준교수. 동방인의 피를 이어받고 있다. 열의를 보이면 미인이다. 밝고 호기심 넘치는 성격이지만, 놀랍게도 프라이드가 낮으며 지는 것을 상당히 싫어한다. 대다수의 눈에는 비밀결사 \"오르가니스타카발\"의 하수인처럼 보인다고 한다.",
  },
  {
    name: "팜리시아",
    role: "오를란도 기숙사 프리펙트 (감독생) / 학생회 회장",
    race: "휴린", gender: "여", age: "22",
    hair: "녹색", eyes: "금색", skin: "흰색",
    content: "오를란도 기숙사의 프리펙트(감독생). 밝고 천진난만한 소녀로, 학생회 회장이기도 하다. 애칭은 팜. 청결하고 침착하며 친절할 뿐만 아니라, 다른 학생들과 학년을 넘어 두루두루 교류하는 인기 인물이다. 높은 수준의 마법사이기도 하다. 간혹 평원을 지배했던 패왕의 자손이라는 소문이 있다.",
  },
];

function PeopleSection() {
  return (
    <div>
      <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        여기서는 "현자의 거리" 엘크레스트의 주요 인물을 소개한다. 그들은 PC의 의뢰인이나 협력자, 혹은 적대자로서 시나리오에 등장할 수 있다.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 8 }}>
        {people.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#2a2a2a" }}>{p.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}18`, color: ACCENT, padding: "2px 8px", borderRadius: 12, flexShrink: 0 }}>{p.role}</span>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: "12px", color: "#888", marginBottom: 8, flexWrap: "wrap" }}>
              <span>종족: {p.race}</span><span>성별: {p.gender}</span>
              <span>나이: {p.age.includes("세") || p.age === "불명" ? p.age : `${p.age}세`}</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              {[["머리", p.hair], ["눈", p.eyes], ["피부", p.skin]].map(([lbl, val], j) => (
                <span key={j} style={{ fontSize: "11px", background: "#F5F0E8", color: "#666", padding: "2px 8px", borderRadius: 10 }}>{lbl}: {val}</span>
              ))}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ElcrestPage() {
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
      case "districts": return <DistrictsSection />;
      case "orgs":      return <OrgsSection />;
      case "college":   return <CollegeSection />;
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
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#1A4028", marginBottom: 6 }}>독립 도시 국가 · 에린딜 서방</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>"현자의 거리"<br />엘크레스트</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#1A4028", lineHeight: 1.6 }}>
          <a href="/erindil-west" style={{ color: "#3A6B48", textDecoration: "none", fontSize: "11px" }}>← 에린딜 서방으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>INDEPENDENT CITY · ERINDIL WEST</div>
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
