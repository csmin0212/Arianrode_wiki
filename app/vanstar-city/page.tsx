'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

const ACCENT = "#8B2D2D";
const ACCENT_LIGHT = "#F5D5D5";

interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; content: string; }
interface Org { name: string; type: string; base: string; leader: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: string; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

const navItems: NavItem[] = [
  { id: "vanstar",       label: "천공의 거리 반즈탄", icon: "🌟" },
  { id: "structure",     label: "거리 구조",           icon: "🗺️" },
  { id: "facilities",   label: "주요 시설",            icon: "🏛️" },
  { id: "organizations", label: "조직",                icon: "⚔️" },
  { id: "people",        label: "반즈탄의 인물들",     icon: "👥" },
];

const vanstarCityStats = {
  population: "약 20만 명",
  raceComposition: [
    { race: "히유린",   pct: 61, color: "#2A5F9E" },
    { race: "네바프",   pct: 10, color: "#8B6914" },
    { race: "두앙",     pct: 22, color: "#8B2D2D" },
    { race: "바나",     pct: 3,  color: "#B85C2A" },
    { race: "엘다나안", pct: 2,  color: "#1A6B4A" },
    { race: "필보르",   pct: 2,  color: "#4A7A2E" },
  ],
  stats: [
    { label: "통치 형태", value: "황제에 의한 직접 통치" },
    { label: "현 수장",   value: "제단 (황제)" },
    { label: "종교",       value: "아르케라브 신앙" },
    { label: "언어",       value: "공통어, 반즈어, 라프어, 고두앙어" },
    { label: "기후",       value: "한랭 (산악 기후)" },
    { label: "수원",       value: "지하수 이용" },
    { label: "수입",       value: "곡물, 식료품, 향신료, 섬유 제품 등" },
    { label: "수출",       value: "모직물, 석재, 목재, 귀금속, 무구 등" },
  ],
};

const vanstarCityHistory = `반즈탄은 핀지아스 섬이 초대 황제 바펠에 의해 통일되기 약 300년 전에, 새 수도로 계획된 도시이다. 반즈 산 중턱에 위치하여 산 경사면을 이용한 다층 구조의 도시 경관이 특징적이며, 항상 전방위를 감시하는 8개의 감시탑을 갖추고 있어 \"천공의 거리\"라 불린다.

도시 내부에도 성벽이 성채를 동심원처럼 에워싸도록 배치되어 있으며, 시가지도 성벽에 맞춰 구획이 나뉘어 있다. 거리 걸음 마다 도시 전체가 바라보이는 장소가 있어, 도시 아래의 풍경을 볼 수 있다.`;

const vanstarCityCurrentStatus = `제단의 즉위 이후 도시의 모습은 크게 바뀌었다. 새 황제에 반대하는 귀족 상인들은 일소되고, 대신 많은 연금술사들이 유입되어 대형 구획을 형성하고 있다. 제단의 장려 정책에 힘입어, 제국에서는 연금술에 한정하지 않고 모든 분야에서 뛰어난 인재들이 모여들고 있다.

또한 제국이라는 특성상 보안 시설도 매우 엄중하다. 순찰 병사의 수가 많고, 검문소도 갖춰져 있어 신분과 목적이 명확한 여행자에게는 비교적 안전하게 지낼 수 있는 환경이 마련되어 있다.`;

const vanstarCityDistricts = [
  {
    name: "제1성벽 (황궁 구역)",
    content: "도시 중심에 있는 황제의 거처이자 신성 제국의 궁전. 제1성벽으로 둘러싸인 이 구역은 왕후 귀족과 그들을 지키는 병사들만이 출입할 수 있다. 황제의 궁전은 도시 중심의 작은 언덕 위에 세워져 있으며, 언덕 위에서 도시 아래 전체를 내려다볼 수 있다. 언덕은 황제의 언덕이라 불리며, 역대 황제의 능묘가 지하에 펼쳐진다는 소문도 있다.",
  },
  {
    name: "중앙구",
    content: "제1성벽을 에워싸듯 8개의 광장이 도로로 연결된 구역. 이 내측이 중앙구가 된다. 중앙구는 고급 주택가로 귀족과 부유한 상인·직인들이 살고 있다. 신전이나 연금술 협회 등의 시설도 이 중앙구에 있다. 광장에는 이야기를 나눌 수 있는 장소가 있으며, 병사가 경비하고 있지만 경계 자세가 아닐 때는 거닐면서 교류하기도 한다.",
  },
  {
    name: "제2성벽 (시민 거주 구역)",
    content: "도시의 방어 성벽은 팔망성 형태로 뻗어 있으며, 각각의 꼭대기에는 감시탑이 존재한다. 제1성벽의 거점과 연계하는 천공 병단의 병사들도 경비에 임한다. 중앙구의 사이에는 일반 시민의 주거지, 공방, 음식점 등이 있다. 반즈탄 시민의 90%가 이 구역에서 생활한다.",
  },
];

const vanstarCityFacilities: Facility[] = [
  {
    name: "제국 연금술 협회",
    content: "신성 제국이 자랑하는 연금술의 연구 기관. 설립자인 황제 제단의 의향에 따라 주로 군사적 활용에 대해 추구하고 있다. 네바프의 대형 연금 공업마 강화, 인공 공업마, 총탄 강화 등 에린디르에서 二지를 다투는 규모의 연금술 병기 개발이 진행되고 있다.\n\n협회에 가입하면 국가에서 보조금이 나오는 장점이 있다. 다만, 가입하려면 어려운 시험을 통과해야 하며, 정기적인 성과를 내지 않으면 자격 박탈도 있는 엄격한 환경이다.",
  },
  {
    name: "반즈탄 신전",
    content: "아르케라브를 모시는 제도 최대의 신전. 한 신관장과 3명의 인장의 합의로 운영된다. 신앙 형태, 사업 활동, 훈련자 관리 등을 독자적으로 담당하며, 독자적으로 기사단을 조직하고 있는 것이 특징이다.\n\n신전 직속의 3개 기사단 사이에는 예전에는 의미 있는 대립이 없었지만, 대형 신전 상부가 관련된 \"장미의 화재\" 이후 신관장이 집결의 중심인물이었던 마티아스를 대신하여 조엘이라는 인물이 되었다. 3개의 성기사단은 이후 더욱 분열되는 결과가 됐다.",
  },
  {
    name: "오를란도 무구점",
    content: "제도에서 한 세력을 자랑하는 무기 판매상. 회장은 귀족 기사단과도 대규모 거래가 있는 많은 무기 상인들과의 인맥을 통해, 다양한 상품을 구비하려 시도하고 있다. 회장은 원래 궁정에서 근무했던 인물이다. 정치 싸움에서 패배하여 무기 거래로 재기를 도모하고 있다. 세력 관계에 관해 알고 있는 현재의 역할로서도 살기 위해 험악한 뒷세계의 교류도 이어가고 있다.",
  },
  {
    name: "토니오의 전송소",
    content: "신전 관계 이외에는 친하지 않지만, 전송 서비스를 행하는 회사. 제도의 뱅스터를 본거지로, 에린디르 서방으로의 주요 거점을 연결하는 전송 거점으로 삼고 있다. 특히 대형 화물의 수송이나 비밀 이동에 관해 광범위하게 서비스를 제공하고 있지만, 1회의 전송 비용은 1000G 정도로, 일반 시민에게는 쉽게 이용하기 어려운 가격이다. 경영자 토니오는 군사 관계의 일은 받지 않는다.",
  },
];

const vanstarCityOrganizations: Org[] = [
  {
    name: "천공 병단",
    type: "군사 조직",
    base: "반즈탄 성",
    leader: '"하늘의 눈" 아로이스',
    content: "반즈 산맥에 서식하는 두앙 천익족으로 구성된 항공 부대. 강력한 전투력과 정찰 능력을 갖추고 있다. 두앙 천익족이 날아다니는 항공 부대로서의 역할을 담당한다. 단장 아로이스는 두앙 천익족의 지도자 중 한 명이다.",
  },
  {
    name: "클란의 광견",
    type: "황제 직속 특수 조직",
    base: "반즈탄 성",
    leader: '"신성 황제" 제단',
    content: "황제 직속의 특수 부대. 활동의 대부분은 수수께끼에 싸여 있다. 단원 구성은 하나로 통합된 전투 능력을 갖는다고 알려져 있다. 정보부 제13반은 이 조직의 첩보 담당부서이다.",
  },
  {
    name: "제국 기사단",
    type: "군사 조직",
    base: "중앙구, 제국 기사단 본부",
    leader: '"신성 황제" 제단',
    content: "신성 제국의 주력 부대. 귀족 자제만으로 구성되어 있으며, 사기, 훈련도, 제단에 대한 충성심 어느 것을 봐도 최고의 수준이다. 서쪽 세계에서 역사상 이 기사단에 정면 대결로 이긴 군대는 없다고 전해지는 강력한 군사 조직이다.",
  },
  {
    name: "고우라 성기사대",
    type: "군사 조직",
    base: "반즈탄 신전",
    leader: "고우라·노던레이들",
    content: "반즈탄 신전이 보유하는 3개의 성기사대 중 하나. 기사대의 전투력은 실제로도 제국에서 가장 강력한 기사단 중 하나로 평가된다. 대장 고우라 노던레이들은 품행 바른 기사이며, 적에게도 예의를 잊지 않는다.",
  },
  {
    name: "반즈탄 석공 조합",
    type: "직인 조합",
    base: "남문 앞, 석공 조합관",
    leader: "오린·헤리",
    content: "제도 반즈탄의 성벽, 건물의 관리, 유지에 종사하는 석공들의 조합. 일의 로테이션 조정, 가격 협의, 부품이나 중간 관리자와의 교류를 담당하고 있다. 오래된 인맥을 가지고 있어, 경찰관과 접하는 기회가 많기 때문에 의외로 사정통이다.",
  },
  {
    name: "정보부 제13반",
    type: "황제 직속 첩보 조직",
    base: "반즈탄 (극비)",
    leader: "재뉴어리",
    content: "클란의 광견 산하의 첩보 조직. 표면상 해산된 것으로 알려져 있으나, 실제로는 재뉴어리라는 엘다나안 여성의 지휘 아래 활동이 지속되고 있다. 에린디르 전역의 정보망을 통해 각국의 동향을 파악하고 있으며, 조직의 요원 줄라이가 현장 공작을 담당한다.",
  },
];

const vanstarCityCharacters: Character[] = [
  {
    name: "ゼダン",
    nameKo: "제단",
    quote: "짐은 신의 뜻에 따라 에린디르를 통일하리라",
    race: "히유린", gender: "남", age: "32",
    hairColor: "금", eyeColor: "파란", skinColor: "흰",
    title: "신성 반즈탄 제국 황제",
    content: "황위 계승 후보들이 잇따라 몰락한 끝에 황제의 자리에 앉게 된 젊은 황제. 아르케라브 신앙에 기반한 강력한 신념을 가지고 있으며, 에린디르 통일을 신의 뜻으로 인식하고 있다. 반대파를 일소하고 연금술사들을 대거 등용하는 등 과감한 개혁을 단행했다. 그 수수께끼 같은 즉위 과정에 대해서는 아직도 다양한 소문이 끊이지 않는다.",
  },
  {
    name: "アロイス",
    nameKo: "아로이스",
    quote: "이야이야, 황제 폐하도 사람 부리기가 거칠다니까",
    race: "두앙천익족", gender: "남", age: "37",
    hairColor: "검은", eyeColor: "갈색", skinColor: "주황색",
    title: "천공 병단장 · \"하늘의 눈\"",
    content: "핀지아스 섬의 두앙 천익족을 이끄는 장. 거칠다고 하면 거친 부분도 있으나, 우수한 무력으로 알려져 있다. 제단에게 젊은 시절부터 개인적으로 알려진 인물이기도 하다. 두앙 천익족으로 구성된 일군을 지휘하며, 반제파의 활성화와 함께 의심의 눈길을 받는 일도 있다고 한다.",
  },
  {
    name: "ジャニュアリー",
    nameKo: "재뉴어리",
    quote: "흠, 수상쩍구만. 좀 조사해보지",
    race: "엘다나안", gender: "여", age: "불명 (200세 이상으로 추정)",
    hairColor: "흰", eyeColor: "파란", skinColor: "갈색",
    title: "정보부 제13반장",
    content: "壊滅된 것으로 알려진 정보부 제13반을 이끄는 여성. 제단에게 그 재능을 인정받아 부하가 됐다는 소문이 있는데, 포장이 두껍다. 연령은 적어도 200세 이상으로 추산되며, 뒷사회에 막대한 인맥을 갖추어 온갖 정보를 확실히 수집하고 있다. 마도사이면서 일류 전사이기도 하다.",
  },
  {
    name: "ゴウラ・ノーザンレイドル",
    nameKo: "고우라·노던레이들",
    quote: "그 기개, 나쁘지 않아",
    race: "히유린", gender: "남", age: "33",
    hairColor: "금", eyeColor: "갈색", skinColor: "흰",
    title: "고우라 성기사대장",
    content: "신전 소속 성기사단 중 하나를 이끄는 기사. 선발된 백금 기사단원으로 품행 정직하며, 굳은 의지에 적에게도 예의를 잊지 않는 인물이지만, 임무에 충실할 때는 잔인하다고 판단받는 경우도 있다. 기사단의 가르침에 따라 강함과 부드러움을 갖추고 반즈탄을 지키고 있다.",
  },
  {
    name: "ジュライ",
    nameKo: "줄라이",
    quote: "나야말로 에이스! ...켁",
    race: "히유린", gender: "여", age: "불명",
    hairColor: "검은", eyeColor: "갈색", skinColor: "흰",
    title: "정보부 제13반 공작원",
    content: "정보부 제13반의 공작원. 골드·스냅이라는 이명을 가지고 있으며, 스몰 드래곤을 데리고 다닌다. 조직의 에이스를 자칭하고 있지만, 실제로는 다소 역량이 모자란 첩보 활동을 하고 있다. 하지만 정보 수집에는 나름의 강점을 보이며, 자신을 잘 드러내지 않는 행동도 할 수 있다.",
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

function VanstarSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14 }}>신성 반즈탄 제국 수도 반즈탄 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {vanstarCityStats.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {vanstarCityStats.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {vanstarCityStats.raceComposition.map((r, i) => (
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
      <SecTitle title="반즈탄의 역사" />
      <Prose text={vanstarCityHistory} />
      <SecTitle title="반즈탄의 현황" />
      <Prose text={vanstarCityCurrentStatus} />
    </div>
  );
}

function StructureSection() {
  return (
    <div>
      <Prose text={"반즈탄의 거리는 제국의 중요 거점으로서 계획적으로 건설됐다. 외부로부터 몸을 지키기 위해 세운 외벽은 팔망성(八芒星) 형태를 하고 있으며, 8개의 감시탑이 모든 방향을 항상 경계한다. 도시 내부에도 성벽이 지어져, 중앙에 가까울수록 고급스러운 건물들이 늘어선다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {vanstarCityDistricts.map((d, i) => (
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
        제국 수도 반즈탄의 주요 시설을 소개한다. 황제의 뜻이 직접 반영된 강력한 군사·종교 시설들이 도시의 중심을 이루고 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {vanstarCityFacilities.map((f, i) => (
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
        반즈탄과 관련이 깊은 조직을 소개한다. PC의 의뢰나 커넥션 대상으로 활용하거나, 적대 세력으로서 시나리오에 등장시킬 수 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {vanstarCityOrganizations.map((o, i) => (
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
        "천공의 거리" 반즈탄의 주요 인물들을 소개한다. 이들은 PC의 의뢰인, 협력자 혹은 강력한 적대자로서 시나리오에 등장할 수 있다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {vanstarCityCharacters.map((c, i) => (
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
                  { label: "연령", value: c.age.includes("세") || c.age === "불명" || c.age.includes("불명") ? c.age : `${c.age}세` },
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

export default function VanstarCityPage() {
  const [activeId, setActiveId] = useState("vanstar");
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
      case "vanstar":       return <VanstarSection />;
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
        width: 248, minWidth: 248, background: "#1E1414", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#806070", marginBottom: 6 }}>HOLY VANSTAR EMPIRE · CAPITAL</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>
            "천공의 거리"<br /><span style={{ fontSize: "13px", opacity: 0.8 }}>반즈탄</span>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#504040", lineHeight: 1.6 }}>
          <a href="/vanstar" style={{ color: "#806070", textDecoration: "none", fontSize: "11px" }}>← 신성 반즈탄 제국으로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>HOLY VANSTAR EMPIRE · "SKY CITY" VANSTAR</div>
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
