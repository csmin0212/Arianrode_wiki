'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#4A3A8A";
const ACCENT_LIGHT = "#E0DAFA";
const SIDEBAR_BG = "#0C0A1C";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "동방 개요",            icon: "🌏" },
  { id: "nations",   label: "3대 국가",             icon: "🏛️" },
  { id: "culture",   label: "동방의 문명",           icon: "📜" },
  { id: "exchange",  label: "동서 교류",             icon: "🚢" },
  { id: "others",    label: "기타 소국들",           icon: "🌴" },
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
  return (
    <div>
      <Prose text={"에린딜 대륙은 서방만이 아니다. 에린딜 대륙의 동쪽에 광대한 세계가 펼쳐져 있으며, 서방의 인물들은 이 지역을 \"동방\" 혹은 \"동방 세계\"라 부른다. 동방에는 다양한 나라들이 존재하지만, 주요한 나라에는 다음 3개가 있다."} />
      <Prose text={"서방과 동방은 이제까지 긴밀한 외교 관계를 구축하지 않고 있으며, 큰 충돌을 일으켜 온 것도 아니다. 그렇다고 서로의 존재를 몰랐던 것도 아니다. 적어도 구 서방의 모험자들 사이에서는, 동방의 끝에 사무라이나 닌자, 몬크의 기술 유래가 있다는 소문은 근거가 있다며 알려져 있었다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginTop: 24 }}>
        {[
          { name: "타루타루·한국", en: "Tartar Han", icon: "🐎", desc: "동방 북부 중원의 대초원을 영역으로 하는 유목 기마민족의 나라. 서방에서 사막을 건너면 처음으로 만나게 되는 동방 국가.", href: "/tartar-han", color: "#7A4A14" },
          { name: "세리아 대제국", en: "Seria Empire", icon: "⛩️", desc: "에린딜 대륙 동해 연안을 따라 존재하는 대제국. 가장 풍요로운 평야를 지배하며, 서방 국가들이 모두 들어갈 만큼의 광대한 영토를 자랑한다.", href: "/seria", color: "#8A3A4A" },
          { name: "다이와 군도국", en: "Daiwa Islands", icon: "⚔️", desc: "에린딜 대륙 동해에 떠 있는 섬들을 영토로 하는 나라. 사무라이와 닌자의 발상지로도 유명하다. 타이쿤을 정점으로 다이묘들이 각지를 통치한다.", href: "/daiwa", color: "#4A5A8A" },
        ].map((n, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${n.color}` }}>
            <div style={{ fontSize: "22px", marginBottom: 8 }}>{n.icon}</div>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 2 }}>{n.name}</div>
            <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.1em", marginBottom: 8 }}>{n.en}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.7, color: "#555", marginBottom: n.href ? 12 : 0 }}>{n.desc}</div>
            {n.href && (
              <a href={n.href} style={{ fontSize: "12px", color: n.color, textDecoration: "none", borderBottom: `1px solid ${n.color}50` }}>자세히 보기 →</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NationsSection() {
  return (
    <div>
      <SecTitle title="타루타루·한국 (タルタル・ハン国)" />
      <Prose text={"타루타루·한국은 동방 세계 중원 북부의 대초원을 중심으로 활동하는 유목 기마민족의 나라이다. 무한의 사막의 일부도 판도에 포함되기 때문에, 육로로 동방 세계에 들어간 경우 처음으로 발을 들이는 나라이기도 하다.\n\n유목민족인 그들은 명확한 도시나 국경을 갖지 않는다. 하지만 그 세력권은 동방 세계의 중앙에 광대한 대초원과 그 북쪽으로 광대한 황야에까지 이른다."} />
      <div style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}30`, borderRadius: 8, padding: "12px 16px", marginTop: 8, marginBottom: 20 }}>
        <a href="/tartar-han" style={{ fontSize: "13px", color: ACCENT, textDecoration: "none", fontWeight: 600 }}>🐎 타루타루·한국 상세 페이지 →</a>
      </div>

      <SecTitle title="세리아 대제국 (セーリア大帝国)" />
      <Prose text={"세리아 대제국은 에린딜 대륙 동해 연안을 따라 존재하는 대제국이다. 동방 중에서도 가장 풍요로운 평야부를 지배하고 있으며, 서방 제국이 모두 들어갈 정도의 광대한 국토 면적을 가지기 때문에, 서방에서도 그 이름은 알려져 있다.\n\n현존하는 국가 중에서 가장 인구가 많고 풍요로운 나라라 할 수 있을 것이다. 황제를 정점으로 하는 엄격한 관료제가 채택되어 있으며, 세계에서 최첨단의 문명을 가진 나라라고 생각되고 있다."} />

      <SecTitle title="다이와 군도국 (ダイワ群島国)" />
      <Prose text={"다이와 군도국은 에린딜 대륙 동해에 떠 있는 섬들을 영토로 하는 나라이다. 동방의 중심이 되는 세리아와는 또한 다른 문화가 꽃피고 있다. 사무라이와 닌자의 발상지로서도 유명하다.\n\n이 나라에서는, 타이쿤이라 불리는 군주를 정점으로 다이묘라 불리는 봉건 영주가 각지를 통치하고 있다. 타이쿤에 의한 정권을 막부, 각 다이묘의 영역을 번이라 부른다. 다이묘의 힘이 매우 강하고, 다이와 군도국 내에서 소규모 항쟁이 계속되고 있다."} />
    </div>
  );
}

function CultureSection() {
  return (
    <div>
      <Prose text={"동방 세계에는 서방과 마찬가지로 6종족(휴린, 엘다난, 네바프, 버나, 필보르, 브나)이 거주한다. 대부분을 차지하는 것은 역시 휴린이며, 동방에 존재하는 나라의 대부분은 휴린의 나라이다."} />
      <SecTitle title="동방인의 특징" />
      <Prose text={"동방인과 서방인 사이에는 기본적으로 큰 외견상 차이는 없다. 단, 생활하는 지역이나 그 땅의 자연 환경에 따라 다양한 특징을 가진다.\n\n특히 \"불의 시대\" 이후에 태어났다고 여겨지는 휴린과 엘다난의 경우, 서방과 비교해 골격이 낮고, 골수가 빽빽한 경우가 많고, 얼굴이 작고 눈이 가는 경향이 있다. 또 피부색은 서방에 비교적 흰 경우가 많은 반면, 남부 온대 지역에 가까울수록 피부색이 짙어진다. 눈과 머리카락의 색은 갈색이나 검정색으로 농암색 계통이 두드러진다."} />
      <SecTitle title="언어" />
      <Prose text={"동방인은 서방과는 다른 언어 체계를 가진다. 언어 체계는 복잡하며, 큰 나라에서는 같은 국가라도 지역이 달라지면 다른 언어를 사용하는 경우도 있다. 다만 많은 나라의 대도시에서는 교역 언어로서 공용어가 있으며, 동방의 중심 국가인 세리아 대제국을 중심으로 넓어진 서방의 공용어를 사용하면 대체로 도시에서는 의사소통이 된다."} />
      <SecTitle title="역법·도량형" />
      <Prose text={"동방 세계의 나라들은 각각 독특한 기년법을 가진다. 타루타루·한국에서는 통일 원년을 원년으로 한 한(汗) 력을 이용하고, 세리아 대제국은 황제가 탄생한 성력 33년을 원년으로 하는 황력을 이용한다. 다이와 군도국에 이르러서는, 원수인 타이쿤의 대가 바뀔 때마다 연호가 바뀐다.\n\n또한 물건의 크기나 무게, 수량이나 분량을 나타내는 단위에 관해서도 나라마다 다양하게 존재한다. 따라서 국제적으로 활동하는 상인은 그들의 환산법을 익혀두는 것이 상식이 되고 있다."} />
      <SecTitle title="신앙" />
      <Prose text={"서방에 전해지는 신들의 전승은, 다소의 차이를 보이면서 동방 각지에도 전해져 있으며, 7대 신 신앙은 넓게 알려져 있다. 그 외에도 각각의 나라에서의 독자적인 신앙도 있다. 타루타루·한국의 태조룡 신앙이나 세리아 대제국의 황제 신앙이 그 대표적인 예이다.\n\n동방 세계의 모든 사람들이 서방 성교를 신앙하는 것은 아니기 때문에, 서방과 비교하면 신전의 영향력은 작다. 단, 신전은 신앙 이외의 의뢰를 받는 등 지역 사회 공헌을 목표로 하고 있기 때문에, 일정한 경의는 받고 있다."} />
      <SecTitle title="동방 독특의 문화" />
      <Prose text={"서방에서도 지역에 따라 풍습이 다른 것처럼, 동방에는 서방과 다른 독특한 문화가 존재한다. 언어나 생활에서 사용하는 다양한 것들, 신앙 이외에도 동방 세계에는 많고 독자적인 문화가 꽃피어 있다."} />
    </div>
  );
}

function ExchangeSection() {
  return (
    <div>
      <SecTitle title="동서 교역" />
      <Prose text={"서방과 동방은 이제까지 긴밀한 외교 관계를 구축하지 않았으며, 큰 충돌도 없었다. 서방의 모험자들 중에서는 동방까지 가서 그 나라 사람들과 함께 모험에 나섰다는 자들이 있어, 서방의 모험자들 사이에서는 사무라이나 닌자, 몬크 등의 기술 유래를 동방에서 구하는 근거 있는 소문이 있었다.\n\n세리아 대황제에 보호받은 모험자들은, 그 후 수십 년을 세리아 국내에서 보내고, 그 후 조상 땅으로 돌아오는 여행에서 당시의 지식을 바탕으로 처음으로 세계 지도를 작성하여 서방에도 가져왔다."} />
      <SecTitle title={`"사막의 길" 탄생`} />
      <Prose text={"동방의 \"불의 시대\" 이후 단절된 역사가 다시 번영하기 시작한 이래, \"무한의 사막\"은 동서의 교역로의 방해가 되어 왔다. 사막을 넘는 것은 사람들의 모험심을 이끌었으며, 사람들은 조금씩 사막의 깊은 곳에 발자취를 남기게 되었다.\n\n이 시기, 서방의 모험자가 에루란 왕국에서 산을 넘어, 천지대산맥 근방의 고산 지대를 지나 그 지도를 바탕으로 동쪽에 출발하는 탐색을 개시하였다. 이 지도가 기점이 되어 개척된 것이 \"사막의 길\"이다. \"사막의 길\"이라 불리는 이 교역로는 현재도 동서를 연결하는 주요 교역로가 되어 있다."} />
      <SecTitle title="ギルマン 해적단" />
      <Prose text={"동방 세계로의 항해에는 크게 두 가지 위험이 있었다. 하나는 항로 정보가 없는 것, 또 하나는 해적이다.\n\n상품을 대량으로 싣고 있는 둔중한 교역선은, 그 화물이나 운반되는 재보를 노리는 해적들에게 있어 맛있는 먹이감이다. 더구나 상선을 습격하는 해적에도 2종류가 있었다. 하나는 돈과 상품을 빼앗으러 오는 인간의 해적이며, 또 하나는 인간의 배를 침몰시키려는 길만들을 중심으로 한 몬스터의 해적이다.\n\n길만들은 인간 해적과 달리 교섭의 여지가 거의 없다. 그들은 자신들의 영역을 침범하는 인간의 배를 침몰시키는 것이 목적이기 때문에, 화물은 부차적인 것에 불과하다. 현재도 동방을 향한 배의 4할 이상이 행방불명이 되고 있다."} />
      <SecTitle title="모험 항해와 중간 무역" />
      <Prose text={"항해 기술이 발달하고 조선 기술에도 발전이 있는 현재, 서방에서 동방으로의 해로에 의한 이동도 현실적인 것이 되어가고 있다. 여러 번의 항해로 축적된 노하우에 의해 위험성이 경감되어, 선박 성능의 향상이 더욱 단기간의 항해를 가능하게 하는 속도와, 장기간의 선박 여행을 극복하는 내구력을 가져왔다.\n\n서방에서 동방까지 한 번에 이동할 수 있는 배나 선원은 없다. 당연히 물이나 식량이 끊기기 전에 기항해야 하며, 그것들을 입수하는 것에는 대가를 지불해야 한다. 많은 상선은 들르게 된 항구 도시에서 중간 무역을 행하며, 물이나 식량, 그리고 이 앞의 정보를 얻게 된다."} />
    </div>
  );
}

function OthersSection() {
  const pops = [
    { label: "휴린",   pct: 70, color: "#4A3A8A" },
    { label: "엘다난", pct: 20, color: "#2A6B5A" },
    { label: "기타",   pct: 10, color: "#7A7A8A" },
  ];
  return (
    <div>
      <Prose text={"동방 세계의 대표적인 국가는 타루타루·한국, 세리아 대제국, 다이와 군도국 3개이지만, 그 외에도 무수한 나라들이 존재한다."} />

      <SecTitle title="미개척 밀림 지대" />
      <Prose text={"남부의 밀림 지대는 사막과 함께 오랜 세월 인간의 발길을 막아왔다. 사막은 모래와 바위, 한낮의 열기와 야간의 혹독한 냉기 외에는 아무것도 없다. 아무것도 없다는 것 자체가 두려움이다. 밀림은 '무엇이 있는지 모른다'는 것이 두렵다. 어떤 자연의 덫이 기다리고 있는지, 어떤 루트를 잡아야 목적지에 다다를 수 있는지, 인간은 밀림에 대해 알아야 할 모든 것을 모른다. 이 때문에 이 일대는 두렵고 사람들의 접근을 막고 있다."} />
      <Prose text={"대육상 해안에 이르게 된 탐험대는 해안 곳곳에 집락을 쌓아 나갔다. 그들은 주로 세리아 대제국의 평야부에서 찾아온 탐험대로, 밀림 깊은 곳의 미지의 땅을 조사하고 밀림으로의 진입을 추진했다."} />

      <SecTitle title="밀림 지대의 소국가군" />
      <Prose text={"밀림 지대에는 수많은 나라들이 난립해 있다. 대부분은 주요 도시와 그 주변 집락으로 구성되는 도시국가급의 소국으로, 국가와 국가 사이에는 생사를 걸 만큼 치열한 영토 분쟁이 자주 발생한다. 거의 대부분의 도시는 다종족으로 구성되지만, 휴린, 네바프, 뷔르나에는 단일 민족에 의한 집락도 존재한다.\n\n이들 소국은 세리아나 다이와의 도시들과 비교해도 매우 소박하다. 주민들은 원시적인 수렵채집 생활을 주로 하며, 마술사나 연금술사가 만든 과학적인 물품에는 별로 접한 일이 없다."} />
      <Prose text={"예부터 폐쇄된 환경의 밀림에 사는 사람들은 이방인에 대한 경계심이 강하고, 멀리서 온 자에게서 기술을 습득하려는 경향이 있다. 또한 내부에서는 독자적인 문화나 언어를 구축하고 있어, 대도시에서도 통상이 확립된 근접 도시들과의 교역 루트가 있어 어느 정도의 무역을 하고 있다."} />

      <SecTitle title="밀림의 역사" />
      <Prose text={"'수의 시대' 당시, 밀림 지대는 특유의 동식물과 마물들이 우거지는 땅이었다. 인간이 집락을 형성한 기록은 없으며, 오히려 엘다난이 도시를 세우기 시작했다고 볼 수 있을 정도이다.\n\n시간이 지남에 따라 인간이 모여들기 시작하여, 휴린이 도시를 쌓아 나갔다. 그들은 주로 세리아 대제국의 평야부에서 찾아온 탐험대로, 도중에 다양한 동료를 얻어 위험을 헤치며 미지의 땅에 발을 디디게 되었다."} />

      <SecTitle title="밀림의 기후와 풍토" />
      <Prose text={"밀림 지대는 사막 남쪽, 만년설 산맥의 기슭에서도 가장 짙은 지역이다. 세리아 남쪽의 산지와 그 사이에 펼쳐지는 부분은 인간의 손에 의한 개척이 진행되고 있어, 밀림 지대와 습지 지대가 서로 교차하는 지형이 되어 있다. 에린딜 대륙 중에서도 최대 규모의 열대우림으로, 연중 기온과 강우량이 높다. 숲의 자원은 보고이며, 풍부한 수목과 생태계가 형성되어 있다. 또한 내부에서는 다른 어디에서도 볼 수 없는 동식물이 생식하고 있다."} />

      <SecTitle title="메나므마이 왕국 (メーナームヤイ王国)" />
      <Prose text={"남부 소국들 중에서 가장 번창한 항구도시를 가진 나라로, 메나므마이가 있다. 에린딜 대륙의 대육상 해안에 위치하는 이 나라는 '대여신'이라 불리는 여성을 위주로 한 나라다. 그 중에서도 해안가에 있는 샨이라 불리는 마을은 외국 선박에 개방된 무역 도시로서 번창하고 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16, marginBottom: 20 }}>
        {[
          { label: "국명",      value: "다양 (나라마다 상이)" },
          { label: "수도",      value: "다양" },
          { label: "통치 형태", value: "왕정 내지 연립제" },
          { label: "현 수장",   value: "나라마다 상이" },
          { label: "인구",      value: "추정 약 200만 명" },
          { label: "주요 항구", value: "샨 (외국 선박 개방 무역항)" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", marginBottom: 20 }}>
        {pops.map((p, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: 2 }}>
              <span style={{ color: "#555" }}>{p.label}</span>
              <span style={{ color: "#888", fontFamily: "monospace" }}>{p.pct}%</span>
            </div>
            <div style={{ background: "#E8E3DA", borderRadius: 4, height: 8 }}>
              <div style={{ background: p.color, borderRadius: 4, height: "100%", width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <Prose text={"무한의 모래사막과 밀림 지대에 끼인 케무르트강 유역에는 비교적 풍요로운 토지가 많이 있다. 이 지역에는 메나므마이 왕국이 성립되어 있으며, 메나므마이 왕국 이북의 평야 지역에는 다양한 소국들이 존재한다. 무한의 사막이 점차 넓어짐에 따라 땅은 줄어들고, 황야에 변해간다. 그리고 케무르트강의 지류가 더 이상 동쪽으로 넓어지는 것을 막는 방벽 역할을 한다."} />

      <SecTitle title="세리아와의 관계" />
      <Prose text={"메나므마이는 3대 전에 세리아 대제국으로부터 朝貢을 요구하는 정책을 취해, 여러 나라가 조공을 바치러 와서 헌금을 요구하는 정책을 시행하고 있다. 많은 나라들이 조공관에 복종하는 것처럼 보이지만, 밀림 깊은 나라들 중에는 자국의 풍습과 문화에 고집하여 가혹한 자연 속에서 살아남는 것을 자부심으로 여기는 자들도 있다. 특히 밀림 깊은 도시나 집락 중에서는 자신들이 뜨거운 열대에 적합한 생활을 유지하는 것에 자부심을 가진 자도 있어, 세리아풍의 관습을 따르는 도시가 증가하고 있다."} />

      <SecTitle title="다이와와의 관계" />
      <Prose text={"샨의 항구는, 다이와 군도국의 배가 서방으로 향하는 중간 기착지로서 이용되고 있다. 다이와를 출발하여 서방에 향하는 배는 거의 예외 없이 샨의 항구에 기항하여 물자를 보충한다. 이 항구에서 무역을 행하며, 중에는 이 마을에 정착하는 자도 있어, 마을에는 다이와 민가街가 형성되어 다이와풍의 거리 분위기를 좋아한 사람들이 일상 풍경에 녹아들고 있다.\n\n최근, 새롭게 발견된 교역도(交易島)는 고무 분리를 가능하게 하는 고무나무가 자라는 특산물 산지로, 다이와와의 무역이 확대되어 특별한 거래 계약이 맺어지기도 했다."} />
    </div>
  );
}

export default function EasternWorldPage() {
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
      case "nations":   return <NationsSection />;
      case "culture":   return <CultureSection />;
      case "exchange":  return <ExchangeSection />;
      case "others":    return <OthersSection />;
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
        <a href="/" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 아리안로드 위키</div>
        </a>
        <div style={{ padding: "20px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#1A1830", marginBottom: 6 }}>에린딜 대륙 · 동방 세계</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>동방 세계<br />東方世界</div>
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
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#8A8AC8", marginBottom: 10 }}>
              EASTERN WORLD — ERINDIL CONTINENT
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#0C0A1C", marginBottom: 8, letterSpacing: "0.04em" }}>
              에린딜 대륙 — 동방 세계
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#1a1830", marginBottom: 4 }}>
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
