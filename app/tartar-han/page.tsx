'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#7A4A14";
const ACCENT_LIGHT = "#F5E8D0";
const SIDEBAR_BG = "#1A1008";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "타루타루 개요",       icon: "🐎" },
  { id: "politics",  label: "정치·사회·군사",       icon: "⚔️" },
  { id: "haru",      label: "수도 하루",            icon: "🏯" },
  { id: "faith",     label: "신앙과 전설",          icon: "🐉" },
  { id: "relations", label: "타국과의 관계",        icon: "🌐" },
  { id: "orgs",      label: "조직",                icon: "🏕️" },
  { id: "people",    label: "타루타루의 인물들",    icon: "👥" },
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
function PopBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: 2 }}>
        <span style={{ color: "#555" }}>{label}</span>
        <span style={{ color: "#888", fontFamily: "monospace" }}>{pct}%</span>
      </div>
      <div style={{ background: "#E8E3DA", borderRadius: 4, height: 8 }}>
        <div style={{ background: color, borderRadius: 4, height: "100%", width: `${pct}%` }} />
      </div>
    </div>
  );
}

function OverviewSection() {
  const stats = [
    { label: "국명",      value: "타루타루" },
    { label: "수도",      value: "하루 (유동적 — 대한의 캠프)" },
    { label: "통치 형태", value: "통합합의제 (수장회의)" },
    { label: "현 수장",   value: "푸루그·한 (대한)" },
    { label: "인구",      value: "약 120만 명" },
    { label: "위치",      value: "동방 세계 북부 중원 대초원, 무한의 사막 일부" },
    { label: "종교",      value: "태조룡 신앙 (주류), 7대 신 신앙" },
    { label: "언어",      value: "타루타루어, 세리아어, 서방 공용어" },
    { label: "수입품",    value: "곡물, 해산물, 식품, 광물, 목재 등" },
    { label: "수출품",    value: "말, 양, 직물, 원재료·가공품 (발톱·이빨 등을 가공한 장식품과 약품) 등" },
  ];
  const pops = [
    { label: "휴린",   pct: 50, color: "#8B6914" },
    { label: "엘다난", pct: 14, color: "#2A6B5A" },
    { label: "네바프", pct:  7, color: "#7A5A2A" },
    { label: "필보르", pct:  9, color: "#5A3A7A" },
    { label: "버나",   pct: 10, color: "#7A2A4A" },
    { label: "두앙",   pct: 10, color: "#3A5A7A" },
  ];
  return (
    <div>
      <Prose text={"타루타루·한국은 동방 세계 북부 중원의 대초원을 영역으로 하는 국가이다. 이동 생활을 영위하는 유목 기마민족의 나라로, 서방에서 \"무한의 사막\"을 건너 육로로 동방에 입국했을 경우, 처음으로 발을 들이게 되는 나라이기도 하다."} />
      <Prose text={"국가라고 하지만 명확한 국경은 없다. 타루타루의 민들은 유목 생활을 하는 탓에 정착하지 않고 부락 단위로 이동을 계속하기 때문이다. \"한(ハン)\"은 왕·황제에 상당하는 말이며, 타루타루 족이 수장을 맡는 나라라는 의미이다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px",
            borderLeft: `3px solid ${ACCENT}`,
            ...([8, 9].includes(i) ? { gridColumn: "1 / -1" } : {}),
          }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <SecTitle title="인구 구성" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px" }}>
        {pops.map((p, i) => <PopBar key={i} label={p.label} pct={p.pct} color={p.color} />)}
      </div>
      <SecTitle title="기후와 풍토" />
      <Prose text={"타루타루의 영역은 대초원을 중심으로, 서쪽 사막의 일부, 남쪽 고산 지대, 북쪽의 대황야까지 포함한다. 대초원은 빈약한 토질이지만 어디까지나 풀이 자라 있다. 우기에는 약간의 빗물이 내리지만, 강우량은 매우 적다. 기온의 낮과 밤의 차이가 크고 겨울은 전 지역이 얼어붙을 만큼 춥다. 이 일대에는 천지대산맥에서 흘러내려 오는 강이 몇 개 있지만 그 흐름은 일정하지 않다.\n\n사막 지대에는 오아시스가 점재하며, 주변에 도시나 취락이 존재한다. 대초원의 북쪽에는 대황야가 펼쳐지며, 연간 내내 동사할 만큼 추운 기후이다. 빙하가 형성된 부분도 있다."} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="정치" />
      <Prose text={"타루타루는 적극적으로 외연에 있는 정착 사회에 침략을 개시하고 있다. 그 영향으로 오늘날에는 이동 생활이 아닌 정착 도시 생활을 하는 자들도 적지 않게 됐다. 현재 타루타루의 각 도시는 지방의 유력 부족 수장(한)이 독자적으로 지배하고 있다. 단 최근의 합의제는 부족 수장들의 합의에 의한 것이었지만, 수장인 타루타루 대한의 힘이 강해 현상은 독재에 가깝다."} />
      <Prose text={"도시에 사는 자들은, 유목민이 이동 생활에 지쳐 도시 생활에 적응하여 이주하는 경우가 많다. 현재 타루타루의 도시는 각 지역의 유력 부족 수장들이 지배하고 있으며, 도시 생활로 이주하게 되면 타민족의 풍습/법을 받아들인다.\n\n세금은 타지 사람들에게는 약 10%, 군역 의무로 성인 가족 1명을 징수하는 것이 일반적인 기준이다."} />
      <SecTitle title="사회" />
      <Prose text={"타루타루는 크게 나눠보면, 이동 생활을 행하는 유목 전사들 과 도시에 정착하여 사는 도시 사회가 있다. 유목 사회는 아직도 고원의 풍습을 지키며 생활하고, 도시 사회는 여러 타 도시에서 조직화된 상업 연계 사회가 있다. 유목 사회는 크게 조직화되어 정착 사회에 임하는 경우가 있다.\n\n동방에서 인접하는 교역처는 군사적인 야영 루트와 겹친다. 중요 거점에는 주로 두앙이 주관하는 タルタル 군사 총독부가 배치된다. 점령지에는 역참이 놓이고, 말의 관리 역관(역관)이 숙박, 식사, 군사적인 연락을 신속히 할 수 있도록 한다."} />
      <SecTitle title="군사" />
      <Prose text={"타루타루·한국에서는 14세 이상의 의사, 묘파기, 장례, 제사 이외에는 병역의 의무가 있다. 군은 부락 단위로 편성되며 습관적으로 부족마다 훈련 장소가 결정되어 있다."} />
      <Prose text={"군의 기본은 백인대·천인대·만인대로 재편되어, 부족을 바바라(10명), 백인대, 천인대, 만인대로 재편성됐다.\n\n일반적인 병사는 말과 활로 무장한 경기병이다. 그들은 세리아 발상의 개량 활을 사용하며, 손에는 창이나 만곡도(刀)를 들거나, 갑옷과 흉갑을 장비한 중무장병도 동원된다. 그들은 진영에서 군사 연습을 계속하며 조직화된 운동으로 무장의 강함을 발휘하는 것으로 알려진다."} />
      <Prose text={"다만 타루타루·한국의 주력 전사에는 중장병이 아닌, 타루타루 고유의 종룡 무가모리와 계약한 용기병이라 불리는 특수 병종이 있다. 그 외에 유명한 부대에는, 제국 친위대가 거론된다. 제국 친위대는 대한 직속 친위대이며 타루타루 중에서도 대한 이상의 경비를 담당하는 정예 경비대이다."} />
      <SecTitle title="산업과 문화" />
      <Prose text={"타루타루의 주요 교역품은 양과 말이다. 양은 식육으로도 가공되고, 말은 가축으로 이용된다. 타루타루는 대단히 우량한 말을 생산하는 것으로도 유명하다. 양이나 말에서 얻는 젖이나 우유를 사용한 향토 요리가 다양하게 발달한다. 이 외에도 용의 발톱이나, 이빨 등을 사용한 공예품이나 가공품이나 특산품이 있다.\n\n유목 사회가 도시 사회와 접촉하는 교역처는 군사적인 야영 루트와 겹친다. 세리아 정복지에서 빼앗은 직물·금·은의 가공품은 주로 세리아 대제국 영지에서 암암리에 매매되므로, 서방 교역 품목으로 취급된다."} />
    </div>
  );
}

function HaruSection() {
  const places = [
    {
      name: "하루 궁전 (ハル宮殿)",
      icon: "🏛️",
      content: "중앙구에 위치한 궁전. 대한의 거처이자 행정 기관을 겸한다. 대한이 없을 때는 제1부인 오루크나가 대행하여 각종 행정을 맡는다. 대한이 부재하는 일이 잦아 타국과 비교해 출입이 자유롭지는 않다. 다만 신전의 의뢰를 수행한 모험자라면, 신전이 보증해 주면 모험자가 궁전에 들어갈 가능성도 있다.",
    },
    {
      name: "대야영지 (大野営地)",
      icon: "⛺",
      content: "街의 동쪽, 3분의 1을 차지하는 초원으로, 유목민이 캠프를 열 때 이용된다. 여름에는 타루타루 부족의 대부분이 초원에서 유목 생활을 하고 있어 별로 이용되지 않으나, 겨울이 되면 풀이 없는 곳 외에 적합한 장소에서 많은 부족이 이곳에서 동영을 즐긴다.\n\n연 2회 개최되는 수장회의 때는 각 부족의 한이 수행단을 이끌고 방문, 대야영지에 각자가 천막을 치고 대기한다. 그 광경은 기간 한정 관광 명소가 될 정도이다.",
    },
    {
      name: "타수마 광장 (打手操広場)",
      icon: "🏪",
      content: "서문 앞의 광장으로 동서 교역의 준비를 하는 상인들이 모이는 장소. 타루타루 군을 볼 수 있다는 소문이 있어 여행자로 붐비는 일도 많다. 광장 주변에는 외부인을 대상으로 한 숙소나 식당 외에도, 서방 신전의 지부도 軒을 이으며 동서 교류의 장으로도 이용된다. 서방 신전의 지부가 있는 관계로, 행선지 불명의 상인이나 모험자, 정보가 뒤섞이어 있다.",
    },
    {
      name: "창풍정 (蒼き風亭)",
      icon: "🍶",
      content: "동구 중앙 부근에 있는 식당 겸 주점. 가게는 필보르 여성이 경영하고 있으며, 후에는 서방과 동방 양쪽 요리에 정통하여 레퍼토리가 많다. 메뉴에는 동서의 다양한 음식이 줄지어 있으며, 가게 주인은 술을 좋아하지는 않지만 술의 종류는 항상 보충하고 있어 원하는 요리를 만드는 서비스도 있다. 맛과 양의 균형이 좋아 현지 평판도 높다.",
    },
  ];

  const districts = [
    {
      name: "중앙구",
      icon: "🏯",
      note: "하루의 중심부이자 대한의 거처이며, 행정 기관도 겸하는 궁전 단지가 들어서는 구역. 또한 제국 친위대의 거점 및 정착 민간인의 주거가 집결. 북문은 외래인도 자유로이 출입할 수 있으나, 수장회의 기간에는 요인 경호로 일부 지역의 출입이 제한된다.",
    },
    {
      name: "서구",
      icon: "🏪",
      note: "식당·주막·숙소·각종 상점이 줄지어 늘어선 구역. 서방식 건물도 섞여 있어 독특한 분위기를 자아낸다. 서문 앞 광장은 에린딜 서방에서 방문하는 여행자들이 처음으로 찾는 장소이며, 그들을 상대로 하는 상점이 즐비하다. 타수마 광장은 이 구역에 있다.",
    },
    {
      name: "동구",
      icon: "🌾",
      note: "초원으로 이어지는 구역으로 야마와 말의 방목, 대이동하는 유목민들의 캠프에 이용된다. 특산품을 취급하는 상점이 있으며 유목민이 가져온 말이나 장식품의 판매가 이루어진다. 대야영지에 직통하는 동문은 유목민 전용으로, 동쪽에서 온 여행자가 街에 들어서려면 북문을 경유하지 않으면 안 된다.",
    },
  ];

  return (
    <div>
      <Prose text={"\"초원의 왕도\" 하루는 초원의 계곡에 건설된 도시이다. 자연스럽게 사람들이 모여 생긴 것이 아니라, 처음부터 행정 기능을 위해 계획적으로 건설됐다. 원래는 겨울 이외에는 군용 야영지의 하나에 불과했으나, 혹설의 안방을 피하기 위한 은신처로서의 기능도 갖는 인공적인 구릉 위에 도시의 기반을 설치했다고 전해진다."} />
      <Prose text={"타루타루·한국의 수도로서 행정, 군사, 무역의 3가지를 담당하는 도시이나, 그에 대응한 도시 자체를 유목민족은 독자적으로 건설하는 기술을 갖고 있지 않았기 때문에, 도시화에 임해서는 에린딜 서방이나 세리아 대제국 등 외부에서 인재가 모집됐다. 그러나 강제 연행이라고 해도 처우는 나쁘지 않아, 불평불만이 있던 자들도 있었지만, 큰 사고가 발생하지는 않았다."} />
      <SecTitle title="3개 구역" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{d.icon} {d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.note}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {places.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{p.icon} {p.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaithSection() {
  return (
    <div>
      <SecTitle title="태조룡 신앙" />
      <Prose text={"타루타루에는 고유의 종룡 무가모리, 그리고 그 왕인 「태조룡」 볼데모가이가 신앙되고 있다. 볼데모가이에게 인정받은 자는 한(수장)이 될 수 있다고 여겨지며, 직접 여행의 자식을 만드는 안내가 되어준다. 타루타루의 사람들은 신앙에 관대하며, 교역처 도시에는 서방 신관 파견도 있다."} />
      <Prose text={"또한 볼데모가이에게 인정받은 자가 한(수장)이 된다는 것으로, 용에 대한 믿음의 신앙은 타루타루 사람들에게 매우 중요한 의미를 가진다. 신전으로부터 의뢰를 받은 사람들과 함께 볼데모가이는 초원을 돌아다니며 계약을 맺으러 다닌다. 타루타루의 신앙은 신앙에 그다지 관대하지 않으며 서방 신전도 인정받고 있는 것이 일반적으로 인정받고 있는 것이다."} />
      <SecTitle title="초원의 기룡 — 무가모리" />
      <Prose text={"동방 초원에는 무가모리라 불리는 소 뿔 정도의 크기를 가진 용이 있다. 사람과 동물의 공진화적으로 태어났다고 알려진 이 생물은, 어릴 때는 1m 이하이지만, 전투용 탈 것으로 쓰이는 만큼 성장 속도가 빠르다. 성숙하면 수 미터까지 성장하며, 달리기와 비행 모두에 뛰어나다."} />
      <div style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}40`, borderRadius: 10, padding: "16px 18px", marginTop: 12, marginBottom: 12 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>🐉 진화하는 용</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#5a4a2a" }}>
          계약자를 찾은 무가모리는 신체적으로 크게 변화하여 역할에 맞는 부위가 발달한다. 계약자와 인연을 맺음으로써 사역수가 된다. 무가모리는 100년 이상을 산다고 알려져 있다. 타루타루는 무가모리를 가축으로 기르는 전통이 있지만, 계약한 무가모리는 전투에서도 협력하며, 독자적으로도 많은 사역수 능력을 갖는다.
        </div>
      </div>
      <SecTitle title="태조룡의 무기 (太祖竜の武具)" />
      <Prose text={"타루타루·한국은 세리아 황제가 소유하는 특별한 무기 「태조룡의 무기」 7점을 찾고 있다. 이것들은 원래 무가모리가 사막 중에 숨기고 있었던 것이지만, 세리아 황제의 수중에 들어가 버렸다."} />
      <Prose text={"\"태조룡의 무기\"는 전부 7점이다. 유목 사회에는 모든 부족이 집결하면 세계 최강의 군사력을 발휘한다는 전설이 있으며, 많은 부족이 \"태조룡의 무기\"를 찾아왔다. 타루타루·한국도 예외가 아니며, 세리아 황제로부터의 반환을 강하게 요구하고 있다."} />
      <SecTitle title="족장 암살 사건 (族長暗殺事件)" />
      <Prose text={"최근 유목민족들 사이에서 소란이 된 사건이 족장 암살 사건이다. 그 이름대로, 유목민 부족의 집락에서 족장이 암살됐다는 사건이다. 암살된 족장들의 배후는 파-나도른 잔당으로 여겨지고 있다."} />
      <Prose text={"암살자는 결국 특정되지 않았지만, 사건의 흑막은 파-나도른 잔당으로 추정된다. 파-나도른은 일찍이 번성을 자랑했던 사막의 나라였으며, 타루타루·한국의 침략에 의해 멸망한 나라이다. 단 수장의 나-즈필 나이만이 막대한 재산을 기반으로 잠복 거점을 가지며, 타루타루·한국에 대한 복수와 방해를 획책하고 있다."} />
    </div>
  );
}

function RelationsSection() {
  const relations = [
    {
      name: "에린딜 서방",
      status: "우호적 교역",
      color: "#2A6B5A",
      content: "에린딜 서방과는 \"무한의 사막\"을 통해 교역을 행하고 있다. 사막에서는 전송 마법이 방해가 되어, 이동은 사막에 적응한 탈 것에 발을 딛는 것이 필수이다. 옆 나라와의 관계 외에도 행위상의 복잡한 이해관계가 복잡하게 얽혀 있다.",
    },
    {
      name: "세리아 대제국",
      status: "적대 (전쟁 중)",
      color: "#8A2A2A",
      content: "악관계인 이웃 나라이다. 타루타루는 방목지를 구해 세리아의 평야부에 침략을 가하고 있다. 그러나 세리아는 장성을 쌓고 기마 침략에 대항하고 있다. 공격 기술이 부재한 타루타루는 공략하기 어려운 상태이다. 현재도 타루타루·한국은 대규모 수색대를 편성해 세리아 방면으로 침공을 진행 중이다.",
    },
    {
      name: "다이와 군도국",
      status: "중립 (소교류)",
      color: "#5A5A2A",
      content: "다이와 군도국과는 거의 교역을 하고 있지 않다. 단 대륙에 찾아오는 다이와의 여행자들은 초원에서 인정받는 존재이며, 다이와의 商人이나 용병은 타루타루의 도시들에도 산재해 있다.",
    },
    {
      name: "사막 관계 소국들",
      status: "전쟁·속국화 진행",
      color: "#7A4A14",
      content: "그 외에 사막 관련으로는 몇몇 소국이 있다. 타루타루·한국은 압도적인 군사력으로 전쟁 중이거나 속국이 되고 있는 나라가 있다. 해당 나라들은 서방 편에 정보를 제공하고 협력자를 구하는 등 복수의 계획을 진행하고 있다.",
    },
  ];
  return (
    <div>
      <Prose text={"타루타루·한국과 각국 세력과의 관계를 소개한다. 타루타루는 강력한 군사력을 배경으로 적극적인 영토 확장 정책을 취하고 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {relations.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${r.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{r.name}</span>
              <span style={{ fontSize: "11px", background: `${r.color}15`, color: r.color, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>{r.status}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{r.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrgsSection() {
  const orgs = [
    {
      name: "대한의 일족",
      type: "왕족",
      base: "하루 궁전",
      leader: "푸루그·한",
      content: "타루타루 대한과 그 혈족들. 유목 민족의 습관에 따라 동맹과 복종을 강요하는 일족. 후계자는 수십 명에 이르며, 자녀도 100명을 넘는다. 조직 내부에서의 세력 다툼은 피할 수 없으며 현재 대한 푸루그는 그것을 통제하는 강력한 수완을 보유하고 있다.",
    },
    {
      name: "제국 친위대",
      type: "군사 조직",
      base: "하루 궁전",
      leader: "오구루바토우",
      content: "타루타루의 대한 호위 및 방위를 담당하는 정예 경비대. 대한의 조카 오구루바토우는 대한의 신뢰를 받는 무인으로, 配下 전사들도 각자 명문 출신이거나 자신의 용맹함으로 친위대에 들어온 자들이다.",
    },
    {
      name: "세리아 방면군",
      type: "군사 조직",
      base: "대초원",
      leader: "죠안도우",
      content: "대한 푸루그·한 아래 있는 3명의 장군이 이끄는 세리아 대제국 침공군. 대병력으로 세리아에 침공 중이며, 총병력은 2만 5천을 넘는다. 전황이 치열해지고 있다.",
    },
    {
      name: "성지 경비대",
      type: "군사 조직",
      base: "대황야",
      leader: "토르룸",
      content: "타루타루·한국의 성지 자이란 산을 수호하는 만인 이상의 경비대. 자이란 산에 주재하는 태조룡 볼데모가이를 지키며, 대황야 북부에 부대를 전개하는 것과 동시에 적대 세력의 감시를 담당한다.",
    },
    {
      name: "하루 초원 중개사",
      type: "개인 상사",
      base: "대야영지",
      leader: "파루칸",
      content: "대야영지 북쪽에 위치한 하루의 상인과 유목 민족 사이를 연결하는 중개 사무소. 유목민이 도시 사회에 불익한 행위를 할 경우 그 대신 교역 상품의 매입·판매를 대행한다. 유목민과 자주 교류하므로 타루타루·한국 내정에 밝다.",
    },
    {
      name: "서방 신전 타루타루 교구",
      type: "종교 조직",
      base: "타수마 광장, 하루 신전",
      leader: "카루피나·브라니아",
      content: "타루타루·한국 내 7대 신 신앙의 서방 거점. 무한의 사막 탐색에도 열심히 임하며, 유목 민족의 내정 파악도 목표로 한다. 대표 카루피나는 대한 및 각 부족 수장들과의 관계를 우호적으로 유지하고 있다.",
    },
    {
      name: "동서 무역 추진 조합",
      type: "상인 조합",
      base: "타수마 광장",
      leader: "마스우드",
      content: "동서 교역에서 가장 유력한 조직. \"무한의 사막\" 저편과의 무역 지원에 적극적. 조합 자신도 뭔가로 사막을 넘는 안내나 용병을 발굴·조달한다. 광범한 인맥을 가지며, 사막 경험이 풍부한 안내자의 소개나 기항지 정보를 제공한다.",
    },
    {
      name: "니세프 캐러밴",
      type: "개인 상사",
      base: "대초원",
      leader: "니세프·하두",
      content: "대초원을 돌아다니며 복수의 유목민 부족을 상대로 상행위를 하는 일행 상사. 각지를 돌며 물자를 매입하고 사막의 길도 이용해 서방과의 교역도 행한다.",
    },
    {
      name: "사냥단 (砂狼団)",
      type: "범죄 조직",
      base: "자를루트 근교",
      leader: "아비카",
      content: "필보르의 소녀 아비카를 수령으로 하는 집단. 유목민이나 상인을 습격하는 산적 행위를 하며, 그 악명은 서방에도 알려져 있다. 사막의 길에서 활동하기가 어렵다.",
    },
    {
      name: "파-나도른 잔당",
      type: "비밀 결사",
      base: "불명",
      leader: "나-즈필·나이만",
      content: "타루타루·한국 침략에 의해 멸망한 파-나도른의 귀족이 이끄는 복수 집단. 막대한 자금과 잠복 거점을 가지며, 타루타루·한국에 대한 방해와 복수를 획책하고 있다. 족장 암살 사건의 배후로 의심받고 있다.",
    },
  ];

  return (
    <div>
      <Prose text={"타루타루·한국과 관련된 주요 조직들을 소개한다. PC와 의뢰인, 협력자 또는 적대자로 코넥션을 맺을 수 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</span>
              <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 10 }}>
                <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10 }}>{o.type}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: "12px", color: "#888", marginBottom: 8 }}>
              <span>본거지: {o.base}</span>
              <span>대표: {o.leader}</span>
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
      name: "푸루그·한",
      role: "타루타루·한국 대한",
      race: "휴린",
      gender: "남",
      age: "46세",
      hair: "다갈색",
      eyes: "다갈색",
      quote: "\"초원의 민이 자유롭게 살 수 있는 세계를 내가 만든다\"",
      note: "타루타루·한국의 대한. 훌륭한 재질과 두터운 신뢰를 가진 남성. 소년 시대에 부족 간 전투로 부족 전원을 잃었으나, 자이란 산에서 태조룡 볼데모가이와 계약하여, 유목민을 설득하는 철학을 이끌어내어 에린딜 전체를 끌어들이는 계획을 차근차근 추진하고 있다.",
    },
    {
      name: "오루크나",
      role: "대한의 제1부인",
      race: "버나 (여우)",
      gender: "여",
      age: "43세",
      hair: "다갈색",
      eyes: "다갈색",
      quote: "\"그래서, 대한은 어떤 모양으로 계셨습니까?\"",
      note: "대한의 유일한 정처(正妻). 뛰어난 지도력과 관리 능력을 갖춘 여성. 남편의 부재 중에 궁정을 지키고 각종 행정을 대행한다. 성격은 의심스럽고 대한의 행동을 확인하려는 성향이 있으나, 젊은 사람들에게는 뭐든 솔직하게 말을 건네는 다정함도 있다.",
    },
    {
      name: "\"태조룡\" 볼데모가이",
      role: "초원의 수호룡",
      race: "용",
      gender: "남",
      age: "불명",
      hair: "은회색",
      eyes: "반",
      quote: "\"초원과 유목민들에게 영광 있으라\"",
      note: "대초원의 북쪽, 자이란 산을 거점으로 하는 은빛의 용. 타루타루 고유의 종룡 무가모리를 낳은 유일한 존재. 조용히 초원을 돌아다니며 계약을 맺을 상대를 찾아다닌다. 대한 푸루그에게 재능을 발견하고 계약을 맺었다. 현재도 자이란 산에 주재하며 초원의 파수꾼 역할을 담당한다.",
    },
    {
      name: "카루피나·브라니아",
      role: "서방 신전 타루타루 교구 신관장",
      race: "휴린",
      gender: "여",
      age: "35세",
      hair: "다갈색+녹색",
      eyes: "녹색",
      quote: "\"그 족장님은 금세공품을 좋아하신다고요. 준비해 두도록 하지요\"",
      note: "서방 신전에서 타루타루에 파견된 교구 신관장. 타루타루의 문물을 귀중품으로 받으며, 대한과 각 부족 수장들과의 관계를 우호적으로 유지하고 있다. 겉으로는 상냥하고 친절한 미녀이지만, 타루타루·한국 내부의 정보 수집 활동도 하고 있다.",
    },
    {
      name: "하와루·소롱고",
      role: "신미 모험자",
      race: "필보르",
      gender: "여",
      age: "23세",
      hair: "다갈색",
      eyes: "다갈색",
      quote: "\"저기, 괜찮으면 같이 일하지 않을래요?\"",
      note: "최근 외출 중의 서방 모험자. 타루타루·한국과 세리아 대제국 간의 무역 관계가 중심이 되는 의뢰를 맡는 경우가 많다. 대초원 출신이라 유목민 사정에 밝으며 신뢰도가 높다. 교역을 중심으로 한 의뢰 성공률이 높고, 타 모험자에게 일을 이야기해 오는 경우도 있다.",
    },
  ];

  return (
    <div>
      <Prose text={"타루타루·한국의 주요 인물들을 소개한다. PC의 의뢰인이나 협력자, 혹은 적대자로 시나리오에 등장시킬 수 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{c.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 6 }}>{c.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#888", marginBottom: 6 }}>
              <span>종족: {c.race}</span>
              <span>성별: {c.gender}</span>
              <span>나이: {c.age}</span>
              {c.hair && <span>머리: {c.hair}</span>}
              {c.eyes && <span>눈: {c.eyes}</span>}
            </div>
            {c.quote && <div style={{ fontSize: "12px", fontStyle: "italic", color: ACCENT, marginBottom: 8, borderLeft: `2px solid ${ACCENT}50`, paddingLeft: 8 }}>{c.quote}</div>}
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TartarHanPage() {
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
      case "politics":  return <PoliticsSection />;
      case "haru":      return <HaruSection />;
      case "faith":     return <FaithSection />;
      case "relations": return <RelationsSection />;
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
        <a href="/eastern-world" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 동방 세계</div>
        </a>
        <div style={{ padding: "20px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#3A2808", marginBottom: 6 }}>동방 세계 · 유목 기마민족 국가</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>타루타루·한국<br />タルタル・ハン国</div>
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
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "48px 48px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#B08040", marginBottom: 10 }}>
              TARTAR HAN — EASTERN NOMADIC NATION
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#1A1008", marginBottom: 8, letterSpacing: "0.04em" }}>
              타루타루·한국
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#3a2a0a", marginBottom: 4 }}>
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
