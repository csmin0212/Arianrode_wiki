'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#7A4A1A";
const SIDEBAR_BG = "#1A0E04";

const navItems = [
  { id: "overview",  label: "마쥬라니카 개요", icon: "🌴" },
  { id: "history",   label: "역사와 영웅",     icon: "📜" },
  { id: "kingdom",   label: "마쥬라니카 왕국", icon: "👑" },
  { id: "regions",   label: "8개 영역",        icon: "🗺️" },
  { id: "events",    label: "사건과 전승",      icon: "⚡" },
  { id: "varuna",    label: "바루나",           icon: "⚓" },
  { id: "kailasha",  label: "카이라샤",         icon: "🗻" },
  { id: "people",    label: "인물",             icon: "👤" },
];

function Prose({ text }: { text: string }) {
  return (
    <p style={{ fontSize: "14px", lineHeight: 2, color: "#444", margin: "0 0 16px" }}>
      {text}
    </p>
  );
}

function SecTitle({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0 12px" }}>
      <div style={{ width: 4, height: 20, background: ACCENT, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#1a1a1a" }}>{title}</div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div>
      <Prose text={"마쥬라니카 대륙은 에린딜 대륙의 훨씬 남쪽에 있는 대지다. 대자연이 넓어지고, 많은 마수들이 활보하는 야생의 세계이며, 아직 보이지 않는 자원의 보고라고도 여겨지고 있다."} />
      <SecTitle title="개요" />
      <Prose text={"마쥬라니카 대륙은, 에린딜 대륙의 남방에 존재하는 대륙이다. 오래전부터 에린딜 서방에 그 이름이 알려져 왔으나, 조류와 바람의 관계로 인해 왕래하기 어렵고, 실태는 좀처럼 전해지지 않았다. 현재는 에린딜 서방에서의 항로도 개척되어, 남방 양 대륙의 교류도 서서히 늘어나고 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8, marginBottom: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, marginBottom: 8, color: "#2a2a2a" }}>규모와 기후</div>
          <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>마쥬라니카는 대단히 큰 대륙으로, 그 크기는 에린딜 서방이라 불리는 영역 전역이 대륙 중에 3분의 1은 들어갈 것이라고 일컬어진다. 광대한 마쥬라니카에는 다양한 기후가 분포하고 있어, 북부의 해안가는 뜨거운 열대에서 아열대에 이르며, 내륙 고지대나 습지대와 사막을 포함한 대륙 중앙부에는 고산 지대가 펼쳐진다. 대륙의 남부 끝은 다시 비교적 험준한 고산 지대가 되며, 화산이 활발하게 활동하고 있다.</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, marginBottom: 8, color: "#2a2a2a" }}>마쥬라니카의 주민</div>
          <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>현재 마쥬라니카에 사는 인간들은, 예전에 에린딜에 있던 인간의 자손이라고 여겨진다. 에린딜 서방에서 동방을 향한 해상 여행을 하려는 인간 중에서, 바다에 표류하여 우연히 마쥬라니카에 도착한 인간들이 있었던 것이 아닌가 추측된다. 마쥬라니카인이 말하는 언어는 지금도 꽤 많은 부분이 에린딜 서방의 언어에 통하고 있다. 칠대신 신앙도 전해지고 있어, 그 신앙에는 남방 대륙에 독자적으로 전해지는 영웅 신화가 있고, 그 영웅신을 신봉하는 것이 주류다.</div>
        </div>
      </div>
      <SecTitle title="대륙 독자의 직종" />
      <Prose text={"마쥬라니카의 도시나 집락은, 어디에나 야생 마수의 위협에 처해져 있다. 그 때문에 마수 사냥—마수 사냥을 생업으로 삼는 자들이 존재한다. 이 땅에서 특기인 마수 헌터는 독특한 전투 기술을 발달시키고 있다. 또한 형태를 바꾸는 특수한 단금술을 쓰는 자들은 가드나라 불린다. 마쥬라니카의 모험자 중에서는 일반적인 직종으로, 대륙의 각지에 그들의 모습이 보인다."} />
      <SecTitle title="다른 나라와의 관계" />
      <Prose text={"마쥬라니카 대륙은 알디온 대륙이나 노르탄디 대륙과의 사이에는 「대해의 균열」이라는 장애가 있어, 두 대륙 간의 교류는 거의 없다. 그러나 비교적 가까운 에린딜 대륙 동방과의 교류는, 왕성하지는 않지만 행해지고 있다. 해상 교역이 발달한 다이와 군도와 에린딜 동방의 남부에 위치하는 메나아므마이 왕국은, 마쥬라니카 대륙과의 거리가 비교적 가깝기 때문에 교역도 늘어나고 있다. 또한, 대륙의 북동부 해역에는 인어와 친밀한 어민 사하긴이 사는 캇카루도 교역이 행해지고 있다."} />
    </div>
  );
}

function HistorySection() {
  return (
    <div>
      <SecTitle title="마쥬라니카의 역사" />
      <Prose text={"마쥬라니카의 휴린 역사는 오래되어, 성력으로 말하자면 100년대에까지 거슬러 올라간다."} />
      <SecTitle title="「불의 시대」 이전" />
      <Prose text={"마쥬라니카 대륙은, 신이 6종류의 동물을 위해 마련한 땅이라고 일컬어진다. 「불의 시대」 이전에 인간에 대해서는 알려져 있지 않다. 하지만 유적이 소수나마 발견되고 있어, 「불의 시대」 이전의 종족들도, 어떤 형태로든 이 대륙을 발견하고 있었던 것으로 추측된다."} />
      <SecTitle title="「불의 시대」의 시작" />
      <Prose text={"휴린을 중심으로 한 「불의 시대」의 「신의 자녀」가 마쥬라니카 대륙에 닿은 것은, 성력 128년경이라 추측된다. 예년에 에린을 향한 탐험대가 마쥬라니카에 표류하는 일이 이어졌으며, 이 탐험대가 마쥬라니카에 집락을 만든 것으로 여겨진다. 그들은 마쥬라니카 대륙의 북방 북쪽 해안에 자리를 잡아, 이곳에 거주했다."} />
      <SecTitle title="영웅 나레슈의 탄생" />
      <Prose text={"마쥬라니카 대륙에 최초로 출현한 인간 영웅은 나레슈라는 이름의 휴린이다. 성력 180년경의 생이라 추측된다. 나레슈는 14세의 당시 인간들의 거처를 위협하고 있었던 밀림의 마수를 벌하고, 마수들의 왕인 「마룡」 브리트라의 복수를 사고 말았다. 나레슈는 「마룡」의 복수를 받아, 대해에 수몰됐다. 그러나 그 곳에서 「바다의 아리아르」에 도움을 받아, 요정의 나라에 도달하게 된다."} />
      <Prose text={"나레슈는 요정들의 나라에서 불사의 과실을 입에 넣어 목숨을 불어넣었다. 이 때 먹은 과실의 영향으로, 나레슈는 육체적으로 늙지 않는 특성을 얻게 됐다. 마쥬라니카에 돌아온 나레슈는, 「마룡」 브리트라를 격퇴하고 대륙 중앙부의 메루 산에 자리를 잡아, 一大를 지배하게 됐다. 그 후 10년 남짓한 세월을 거쳐, 미지의 땅을 모험하고, 이윽고 「마룡」을 쓰러뜨린다. 그리고 그 공적을 신들에게 인정받아, 나레슈는 신계에 오르고, 신이 됐다고 일컬어진다."} />
      <SecTitle title="6인의 용사" />
      <Prose text={"나레슈가 자리를 잡은 뒤, 인간을 이끈 것은 나레슈와 고생을 함께한 6인의 용사라 한다. 6인의 용사란 에르다나오의 여성 교사「눈의」 니도라, 네바프의 성자「성자」 마우네야, 필볼의 시인「박식한」 나키라르, 바르나 족「신의 딸」 사비야사르치, 도앙 족의 전사「한쪽 날개의」 드로나 등의 자손이라 한다. 그 후도 마쥬라니카를 모험했다고 한다."} />
      <Prose text={"세대가 정해지고, 마쥬라니카 왕국이 세워진 것이 마쥬라니카 력으로 원년(1年)이라 한다. 6개의 번을 모두 거느리는 대번왕에 나레슈의 자손이 임명되고, 마쥬라니카 력으로 278년의 일이라고 한다."} />
      <SecTitle title="신이 된 나레슈" />
      <Prose text={"브리트라를 물리친 나레슈는, 밀림 지대를 답파하고 마쥬라니카의 내부를 계속 개척했다. 대륙 중앙부에 있는 메루 산에 한발을 들여놓은 나레슈는, 거기에서 거대한 신 아르케라브를 만나게 된다. 그리고 마쥬라니카의 인간들을 번영으로 이끌어 달라는 가르침을 받아, 신의 일원이 될 것을 허락됐다. 나레슈는 천계에 오르고, 신이 됐다. 나레슈가 탄생하고 60년 경과했다고 전해진다. 천계에 올라간 나레슈는, 이후 인간들로부터 누구나 숭배받게 됐다. 현재 마쥬라니카 대륙에서는, 칠대신 신앙 이외에도 「상약왕」 나레슈를 신봉하는 신앙이 깊다."} />
    </div>
  );
}

function KingdomSection() {
  const lords = [
    { name: "사무드라 지방", lord: "니도라의 말예", race: "에르다나오", note: "대륙 북서부 해안 지방. 니도라의 자손이 다스린다. 에르다나오가 많이 모인다." },
    { name: "라사 지방", lord: "마우네야의 말예", race: "네바프", note: "대륙 서부 내륙의 라사 지방을 파라슈의 말예가 다스린다. 네바프가 많다." },
    { name: "아디 지방", lord: "나키라르의 말예", race: "필볼", note: "밀림 서남부에 넓은 아디 지방을 나키라르의 말예가 다스린다." },
    { name: "마루토와나 지방", lord: "사비야사르치의 말예", race: "바르나", note: "대륙 중앙부에 넓은 마루토와나 지방을 사비야사르치의 말예가 다스린다." },
    { name: "네디에라 지방", lord: "드로나의 말예", race: "도앙", note: "대륙 동북부에 위치하는 네디에라 지방을 드로나의 말예가 관할한다." },
    { name: "바루카 지방", lord: "드로나의 말예 (별파)", race: "혼합", note: "대륙 남동부의 사막 지대. 타루야나 사막 일대를 드로나 별파가 다스린다." },
  ];
  return (
    <div>
      <SecTitle title="마쥬라니카 왕국" />
      <Prose text={"현재 마쥬라니카 왕국은 대륙의 거의 전역에 걸쳐 넓은 영역을 6개로 나눠 각 번왕이 지배하고 있다. 6개 지방에는 각각 크고 작은 도시가 있어, 지방을 통치하는 번왕이 그곳에 있다."} />
      <Prose text={"6인의 번왕은 6인의 용사들의 자손. 6인의 번왕이 각각 다스리는 땅은, 동종족이 많이 집결하는 땅이기 때문에, 각 번왕의 지배 지역에는 동종족이 많이 살고 있다. 휴린의 번왕에게는 휴린이 많이 사는 영역에 번왕이 있다. 에르다나오의 지배 지역에는 에르다나오가 많이 사는 영역이 있다."} />
      <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>대번왕 수도 — 카이라샤 (라사 지방)</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>대번왕이 거처하는 수도는, 예전에 대륙 북방에 있었으나, 마쥬라니카 력으로 100년쯤 전에 천재에 의해 침수되어 버렸다. 현재는 라사 지방의 도시 카이라샤가 새로운 수도가 되고 있다.</div>
      </div>
      <SecTitle title="6인의 번왕" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginTop: 8 }}>
        {lords.map((l, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{l.name}</div>
            <div style={{ fontSize: "11px", color: ACCENT, marginBottom: 6 }}>{l.lord} · {l.race}</div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{l.note}</div>
          </div>
        ))}
      </div>
      <SecTitle title="마수의 왕들" />
      <Prose text={"인간이 왕이 되어 대륙에 뻗어 나가도록, 마수들도 하나의 몸에 하나의 대륙에 뻗어 나가는 능력을 갖고 있다는 사실로 같다. 마수의 왕들은, 브리트라가 힘을 잃어버린 이후로 스스로를 위해 각각의 영역을 지배하며, 인간들의 진격을 막아내고 있다. 왕에게는 나름의 우두머리가 있으며, 그 능력은 인간의 왕 이상이라 말해진다. 현재, 마쥬라니카 대륙에서는 왕과 인간 사이의 커다란 싸움이 더욱 넓어지고 있다고 한다."} />
    </div>
  );
}

function RegionsSection() {
  const regions = [
    {
      name: "해양 지역의 마수",
      jp: "海洋地域",
      color: "#2A5A8A",
      content: "마쥬라니카 대륙 주변의 해양에는 아난타라 불리는 커다란 뱀의 마수가 살고 있다. 아난타에 닮은 대형 생물이 상륙하거나, 연안에 있는 사무드라 지방의 도시를 습격하는 일이 있다.",
    },
    {
      name: "밀림 지역의 마수",
      jp: "密林地域",
      color: "#2A6A2A",
      content: "대륙 북부 마루토와나 지방에 넓어지는 슌도르라 불리는 빽빽한 밀림 지대. 야크샤, 라크샤샤 등의 정령의 일종이 모여들고 있으며, 격렬하게 인간을 공격하고 있다. 현재, 야크샤의 왕 마니바드라가 세력을 강화하고 있다고 한다.",
    },
    {
      name: "평원 지역의 마수",
      jp: "平原地域",
      color: "#6A5A2A",
      content: "아무것도 없는 것처럼 기후가 온화한 대륙 북서부 네디에라 지방의 스타란 평원에, 샤라라 불리는 마수의 무리가 사람을 뒤쫓는다. 미지의 자연 속에는 두려워해야 할 마수들의 땅이다.",
    },
    {
      name: "고산 지역의 마수",
      jp: "高山地域",
      color: "#5A5A6A",
      content: "만년 설의 내리는 대륙 중앙부 라사 지방의 쿠슈 고산에, 원래 마룡 브리트라의 지배 하에 있었던 타조가라 불리는 마수의 무리가 현재 쿠슈가트라는 이름의 세력을 형성하여 일대를 지배하고 있다고 일컬어진다.",
    },
    {
      name: "늪지 지역의 마수",
      jp: "沼地地域",
      color: "#3A5A3A",
      content: "마쥬라니카 서부 아디 지방의 카차라트 습지에는, 연기의 왕 요요우이트라 불리는 괴물의 무리가 집. 이 생물은 곤충도 파충류도 구별되지 않는 불가사의한 존재이다.",
    },
    {
      name: "화산 지역의 마수",
      jp: "火山地域",
      color: "#8A3A1A",
      content: "라사 지방 남부의 부티라 불리는 화산 지대는, 아직 인류가 문명의 광을 미치지 않은 지역이다. 여기에는 츠나라 불리는 거대한 뱀장어가 있어, 약 70미터가 되는 것도 있다고 전해진다.",
    },
    {
      name: "사막 지역의 마수",
      jp: "砂漠地域",
      color: "#8A6A2A",
      content: "마수들에게도 살기 어려운 대륙 남서부 바루카 지방의 타루야나 사막을 거니는 것은, 마케카라 불리는 악어 같은 괴물이라고 한다. 사막 속에서 자유롭게 헤엄치고 있다고 전해진다.",
    },
    {
      name: "지하 지역의 마수",
      jp: "地下地域",
      color: "#4A3A5A",
      content: "대륙의 지하에는 광대한 지하 동굴이 넓어지고, 파라타라라 불리는 지하 세계가 존재한다. 거기에는 야미라 불리는 마수가 주인이며, 어두운 지하의 거주자를 지배하고 있다고 전해진다.",
    },
  ];
  return (
    <div>
      <SecTitle title="마쥬라니카의 8개 영역" />
      <Prose text={"마쥬라니카 대륙은 크게 8개의 영역으로 나눌 수 있다. 대륙을 에워싸는 대양과 그 경계가 되는 해안선, 빽빽한 밀림, 광대한 평원, 험준한 고산 지대, 다양한 기후를 담은 늪지 지대, 혹독한 환경과 주변에 생식하는 마수들에게 제압 당하여, 아직도 대규모 인간의 집락이 없는 지역이다. 그리고 그것들에 더해, 대륙의 광대한 지하가 퍼져 있는 것이 라사 지방의 어딘가에 그 입구 중 하나로 여겨지는 것이 있으나, 거의 아무에게도 숨겨진 지역이다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {regions.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${r.color}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>{r.name} <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>{r.jp}</span></div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{r.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div>
      <SecTitle title="마쥬라니카에 전해지는 사건과 전승" />
      <Prose text={"마쥬라니카 대륙에 전해지는 사건과 전승에는, 이하의 것들이 있다."} />
      <SecTitle title="신이 된 나레슈" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", marginBottom: 16, borderLeft: `4px solid ${ACCENT}` }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>「상약왕」 나레슈의 전설</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>브리트라를 물리친 나레슈는, 밀림 지대를 답파하고 마쥬라니카의 내부를 계속 개척했다. 대륙 중앙부에 있는 메루 산에 발을 들여놓자, 거대한 신 아르케라브를 만나게 됐다. 마쥬라니카의 인간들을 번영으로 이끌어 달라는 가르침을 받아, 신의 일원이 될 것을 허락됐다. 이 영웅은 현재 「상약왕」이라는 이름으로 마쥬라니카에서 가장 깊이 신앙받고 있다.</div>
      </div>
      <SecTitle title="「세계를 나누는 구」" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>글로비스 령과 세르노그 령의 경계에는, 지의 깊은 곳에 가볍다고 일컬어지는 계곡이 있다. 그레브르라 불리는 이 깊은 계곡은, 각각의 진영이 걸친 다리 사이에 어느 쪽의 영역도 아닌 중립 지대가 그 경계를 두고 있어, 인간들이 살고 있다는 점에서는 죽음의 구역으로 여겨지고 있다. 邪神의 기운에서 죽자를 빼앗는 마소가 그 구역에 충만하다고 하여, 글로비스 령에서는 사자를 빼앗는 장소로 여겨지고 있다.</div>
      </div>
      <SecTitle title="전설의 신구를 소환한 자" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>세계를 파괴하는 것이 가능한 3가지의 신구가 있다. 어딘가에 그 이름을 이어받은 에르다의 하나인 것이, 이 중의 하나의 신구를 소환했다. 글로비스와 싸우겠다고 맹세한 에르다를 두려워한 에르고의 전사들은, 이 3가지 신구의 소환에 관련하는 기술을 아는 자를 찾아 보고 있으나, 아스란 전역에서 빈틈없이 소문은 퍼져있다고 전해진다. 신구를 부르는 방법이 어딘가에 남아 있지 않는가, 찾아 구하는 마물도 많다고 한다.</div>
      </div>
      <SecTitle title="「마룡」 브리트라의 부활" />
      <div style={{ background: "#1A0808", border: "1px solid #5A1A1A", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#EEA090", marginBottom: 8 }}>마룡 복활의 소문</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#CCC" }}>수 년 전부터, 마쥬라니카 대륙의 곳곳에서 마을과 촌락에서 불길한 소문이 떠돌기 시작하고 있다. 새벽달이 지면, 집을 뒤흔드는 것 같은 낮은 울음소리가 어딘가에서 들리는 것이다. 그 날 밤에는 반드시 소수의 인간이 행방불명이 된다고 한다. 이 소문이 퍼지게 된 후로, 각 지역에서 마수들의 움직임이 활성화되고 있어, 예언자를 자처하는 자들 중에는, 나레슈에게 쓰러뜨린 「마룡」 브리트라가 부활할 조짐이라 말하는 자도 있다. 대번왕은 일단 침묵을 지키고 있는 선언을 내놓았으나, 이 뒤에서 몇몇인가의 모험자를 조사에 보내고 있다고 전해진다. 과연 진실은 어떻게 되고 있는 것인가…….</div>
      </div>
    </div>
  );
}

function VarunaSection() {
  const districts = [
    { name: "에캄 항구구", desc: "해안 어업과 그 주변의 구역. 오래되고 소박한 민가로 구성되어 있으며, 거리 끝쪽에는 「해신」 리아르를 모시는 작은 신사가 있다." },
    { name: "두베 항구구", desc: "근해 어업 항구와 그 주변의 구역. 항구 근처에 도시가 형성되어, 그 주변 거리가 넓어진다. 네바프 거리를 포함하는 공업 지구이기도 하다." },
    { name: "트리니 항구구", desc: "거리를 흐르는 아르나다 하의 하안에 있다. 에린딜 동방과의 무역 항로로 사용되는 항구로, 그 주변에 환락가·상업 지역이 포함된다. 대륙 내부로 이어지는 도시 문까지 이 구역에 포함된다." },
    { name: "차트바리 항구구", desc: "트리니 항구구에서 강을 사이에 두고 맞은편 일대를 차지하는 구역. 원거리를 오가며 상품을 실어 나르는 선박이 정박하는 항구로, 현지의 선원들이 거주하는 주택가로 이루어진다." },
    { name: "판차 항구구", desc: "거리의 정치적 중심지 근처에 있다. 번왕이 거처하는 궁전과 신전 등 중요한 건물이 집중해 있다. 사냥꾼 거리라 불리며, 마수를 찾아 구하는 헌터들이 모이는 거리이기도 하다." },
    { name: "샤트 항구구", desc: "해저 해역과의 교역을 담당하는 항구. 거리의 선진 부분이며, 민가가 눈에 띄고 사하긴들의 수입선인 마젤란기라가 정박하기도 하며, 수중을 다룬 특수한 뱃사람들의 거리로 알려진다." },
  ];
  const orgs = [
    { name: "마쥬라니카 해군", type: "군사 조직", base: "판차 항구구·마쥬라니카 해군 본부", leader: "라-4세", content: "마쥬라니카의 민과 해역을 마수로부터 지키는 국가 방위군의 해군. 해양과 해안선의 안전을 지키는 활동을 하고 있다. 대표자는 바루나 番王 라-4세이며, 현재는 45대 번왕의 라-4세가 이름 상으로는 톱 자리에 있다." },
    { name: "해양 수렵단", type: "업무 조합", base: "판차 항구구", leader: "신하·마하르시", content: "세르노그의 대신이 주도하는 헌터들의 조합. 주로 해양의 마수를 겨냥하는 헌터들의 집단으로 여겨지고 있어, 배를 타고 바다로 나가서 마수를 퇴치하는 자들을 관리하는 조직. 수렵선에 탑승하는 모험자들의 대부분이 소속되어 있다." },
    { name: "마쥬라니카 무장여단", type: "무역 연합", base: "트리니 항구구", leader: "수잔·누레", content: "마쥬라니카 대륙 도시를 오가는 행상인들의 통상 동맹. 위험한 도중을 해파하여 도시 사이를 이동하기 위해 정보 수집과 경비 조달을 하고 있다. 또한 신들과 협력하여, 보호 영역 전체에서 무기 조달 의뢰를 보내는 업무를 행하고 있다." },
    { name: "스자타 목욕탕 상회", type: "상인 조합", base: "바루나 궁전", leader: "칸티·사라우크", content: "바루나 궁전에 근무하는 귀족들과 부유층이 공들이는 상업 커뮤니티. 내외의 희귀 물품이나 미술품 등을 수집하는 호사가들이 교류하는 조합. 진기한 물건을 손에 넣으려는 자도 많고, 모험자의 정보도 처리된다." },
    { name: "바이퍼즈 네스트", type: "비밀 조직", base: "불명", leader: "「백의 여」", content: "라-4세의 치세로 시작된 비밀 범죄 결사. 1세의 단기 독재 통치가 무너진 후, 반동적인 민들과 귀족들을 역으로 노리는 어두운 범죄 단체들이 번영을 다해, 前 통치에 돌아온 일부가 그 조직을 되살리고 있다. 현재 정치에 맞서는 활동을 시작하고 있다." },
  ];
  return (
    <div>
      <SecTitle title="바루나 (ヴァルーナ) — 시작의 항구 도시" />
      <Prose text={"마쥬라니카 대륙의 북방 북쪽 해안에 위치하는 항구 도시. 마쥬라니카에 휴린이 처음 도착했다고 여겨지는 대륙 북방의 해안 도시이며, 대륙에서도 손에 꼽히는 번영을 이루고 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { label: "인구", value: "2만인" },
          { label: "통치 형태", value: "번왕에 의한 통치" },
          { label: "현 수장", value: "라-4세 (番王)" },
          { label: "종교", value: "나레슈·리아르·칠대신 신앙" },
          { label: "기후", value: "아열대 기후" },
          { label: "수출", value: "어류·해산물·향신료·귀금속" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: "13px", lineHeight: 1.8, color: "#555" }}>
        <strong style={{ color: ACCENT }}>종족 구성:</strong> 휴린 73% / 에르다나오 6% / 네바프 10% / 필볼 6% / 바르나 3% / 도앙 2%
      </div>
      <SecTitle title="6개 항구 구역" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{d.name}</div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {[
          { name: "바루나 궁전", desc: "6개의 항구를 내려다보는 해안 고지대에 건설된 화려한 궁전. 왕국 지배하에 있는 주변 지방의 자치를 감시하는 기능을 한다. 궁전의 내부는 번왕의 저택·행정을 담당하는 역할이며, 그것들 이외에도 해신을 경배하는 신전이 존재한다." },
          { name: "바루나 신전", desc: "바루나의 종교부문이자 모험자 관리를 담당하는 국가 신전. 판차 항구구의 궁전 가까이에 있다. 지하를 파서 올린 인공 수로가 있으며, 수신의 이름을 내건 마쥬라니카에 있는 신전 중에서도 유수의 아름다운 신전이다." },
          { name: "아닐 무구 상회", desc: "바루나의 두베 항구구에 있는 대형 무구 상회. 네바프·헌터용 무기와 방어구 등, 헌터용 전투 용품을 생산·판매한다. 아닐과 파드마의 부부가 시작한 가게로 현재는 도베 항구구의 가게를 본점으로, 밀림이나 사막의 곳곳에도 자매점을 거느릴 정도로 성장했다." },
          { name: "바루나 연금술 학교", desc: "가드나라 불리는 마쥬라니카 대륙 특유의 연금술사를 양성하는 국가 학교. 번왕 라-4세의 목소리에 의해 샤트 항구구에 건설됐다. 역사는 수십 년이지만, 각지에서 가드나와 연금술 스킬 강사가 초청되어, 수준 높은 교육을 하는 것을 목표로 하고 있다." },
        ].map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{f.name}</div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 8 }}>{o.type}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: 6 }}>본거지: {o.base} · 대표: {o.leader}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KailashaSection() {
  const orgs = [
    { name: "카이라샤 궁정", type: "정부 조직", base: "비슈라파스 구역", leader: "바-7세", content: "마쥬라니카를 다스리는 대번왕의 거처로서, 국가 중요 사항을 결정한다. 현재는 45대 대번왕인 바-7세가 다스리고 있으며, 역대 왕에게 봉사한 가신들이 많다. 그 수는 수십 명에 이른다고 일컬어지며, 궁전의 넓이는 구역의 대부분을 차지한다." },
    { name: "마쥬라니카 국방군", type: "군사 조직", base: "비슈라파스 구역·국방군 주둔 기지", leader: "아비지타·테이르발발", content: "마쥬라니카의 민과 마을을 마수의 위협으로부터 지키는 국방군. 도시나 마을의 방위, 그리고 마수 연구나 무기 연구 등도 행해진다. 마쥬라니카 군의 임무는 마수 부여가 되는 것과 경우에 따라 위험에 처했을 때만 동원된다." },
    { name: "단마사타", type: "모험자 길드", base: "비루-다키 구역", leader: "아감·샤지-바", content: "카이라샤에서 가장 많은 규모의 모험자 길드. 이 수로 팔린 새로운 모험자 길드로, 아감·샤지-바라는 두 쌍둥이 형제의 여성 헌터가 중심 인물로 되어 있다. 나레슈가 신이 됐다는 메루 산으로 인간을 이끄는 것을 목적으로 하고 있다." },
    { name: "샨타 목욕탕 상인 조합", type: "상인 조합", base: "비루-다키 구역", leader: "니바미히", content: "목욕탕이나 사우나, 온천이나 음식점, 치료 토산 전문점 등이 일체가 된 구역에 있는 조합. 비루-다키 항구의 상가가 거리가 되어 있는 목욕탕 거리의 상인 조합. 원래는 목욕탕을 경영하는 필볼의 일파로, 현재는 장로라 불리는 노인이 다스린다." },
    { name: "나레슈 묘", type: "종교 조직", base: "도리타라슈트람 구역·대나레슈 신전", leader: "우르미사", content: "「상약왕」 나레슈를 신봉하는 종교 조직. 6인의 용사 중 성자 마우네야의 자손이 대신을 맡고 있다. 왕국이 수도가 되기 전에는, 대신이 번왕에 영향을 강하게 미쳤다고 한다. 지금도 도시들에 대한 신앙심의 영향력은 강하다." },
  ];
  return (
    <div>
      <SecTitle title="카이라샤 (カイラーシャ) — 성산 도시" />
      <Prose text={"성산이라 불리는 메루 산의 기슭에 존재하는 마쥬라니카 왕국의 수도에 해당하는 대도시. 「수도」로서의 역사는 그다지 깊지 않지만, 그 자체의 역사적 기원은 대륙 최고의 역사를 가진다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { label: "인구", value: "5만인" },
          { label: "통치 형태", value: "대번왕에 의한 왕제" },
          { label: "현 수장", value: "바-7세 (大番王)" },
          { label: "종교", value: "나레슈 신앙·칠대신 신앙" },
          { label: "기후", value: "아한대 기후" },
          { label: "수출", value: "직물·유제품·희소 생물·귀금속" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: "13px", lineHeight: 1.8, color: "#555" }}>
        <strong style={{ color: ACCENT }}>종족 구성:</strong> 휴린 37% / 에르다나오 48% / 네바프 8% / 필볼 2% / 도앙 3% / 바르나 2%
      </div>
      <SecTitle title="시가지 구조" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { name: "신시가지", desc: "약 100년 전, 새로 생긴 시가지. 지금은 구 시가지보다도 크고 넓은 구역이 됐다. 이 구역은 크게 나눠 북쪽의 비슈라파스 구역과 그 남쪽의 필-파르크시 구역으로 나뉘어진다. 비슈라파스 구역은 원래 구 도시 요가야에 살고 있던 귀족이나 왕족이 거주하는 토지이며, 고급 저택이나 잡목림이 많은 풍요로운 토지다. 대번왕의 대형 궁전을 비롯하여, 왕족이나 귀족의 토지, 국영으로 있는 연습병 학교나 병사의 주둔지, 몇 개의 공방이나 상점 등이 있다." },
          { name: "통로의 거리", desc: "신시가지와 구 시가지를 연결하는 구역이다. 비루-다키 구역, 혹은 「통로의 거리」라고 불리고 있다. 구 시가지에서 빠져나온 인간들을 받아들이는 주거 구역이 되는 동시에, 신시가지에서 새로운 인구가 모여드는 상업 구역으로 번성하고 있다. 구역 주변에 있는 비루-다키 신전 주변에는, 주로 모험자들을 대상으로 한 숙박 시설이나 상가가 있다." },
          { name: "구 시가지 (도리타라슈트람 구역)", desc: "구 시가지는 「성자의 거리」라고도 불린다. 이 구역에는 나레슈 신전을 비롯하여, 종교 시설이 몇 곳 건설되어 있다. 에르다나오가 많이 거주하고 있다." },
        ].map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {[
          { name: "마수 연구소", desc: "마쥬라니카의 인간들에게 천적인 마수를 연구하는 국가 기관. 비슈라파스 구역의 대형 궁전 근처에 있으며, 대대로 마드바 박사의 가문이 운영하고 있다. 연구소의 중요한 임무는 마쥬라니카의 각지에 탐험대를 파견하여, 마수의 생태를 조사하는 것이다." },
          { name: "비루-다키 신전", desc: "비루-다키 구역에 건설된 신전. 구 시가지에 있는 대신전의 지부로 여겨지고 있다. 통로의 거리와 그 주변의 거리에 접하는 신전으로서, 에린딜 동방과의 무역에 종사하는 상인들이 많이 봉납에 찾아오는 곳이기도 하다." },
          { name: "산바라 마수 레스토랑", desc: "비루-다키 구역의 환락가에 있는 식당. 7중의 별로 유명한 이색 레스토랑이며, 일상에서 먹지 못하는 각 지방의 마수 식재료를 이용한 요리를 제공한다. 특색은 마수에 특화된 요리가 풍부하다는 것이다. 신선한 식재료를 얻기 위해, 헌터를 고용해 마수를 사냥해 오도록 하는 것이 이 레스토랑의 특기이기도 하다." },
          { name: "대나레슈 신전", desc: "카이라샤의 구 시가지, 도리타라슈트람 구역 중앙에 건설된 신전이다. 계산으로 240년 전의 역사를 가지는 마쥬라니카의 성지이며, 나레슈를 신앙하는 총본사. 신전 안은 대부분이 공개된 예배장이 됐으며, 관광지로서도 알려져 있다. 내부에 있는 한쪽 벽면에는 영웅 나레슈의 신화를 그린 벽화가 그려져 있다." },
        ].map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{f.name}</div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 8 }}>{o.type}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: 6 }}>본거지: {o.base} · 대표: {o.leader}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const varuna = [
    {
      name: "라-4세",
      nameJp: "ラーム4世",
      role: "마쥬라니카 왕국 바루나 番王",
      race: "휴린",
      gender: "남",
      age: "45세",
      hair: "흑색",
      eyes: "흑색",
      skin: "갈색",
      quote: "\"오오, 모험자냐! 잘 왔다!\"",
      note: "마쥬라니카 왕국의 바루나를 다스리는 番王. 왕위에 오르기 전에는 스스로도 탐험가로서 대륙 탐험을 하고 있었다. 마수를 불러들이는 큰 사건이 있을 때는 스스로 병사들을 이끌고 나아갔다. 대번왕이 되어서부터는 민과 싸운다는 표현 자체를 하지 않아, 그 자신은 '난 알고 있다'는 것을 보이며 상당히 영리한 인물로 알려진다. 도시를 위해 모험자를 보호하고 있어, 모험자에게는 배짱 있게 배려를 보여주는 것으로 알려진다.",
    },
    {
      name: "달샤나·디-파-",
      nameJp: "ダルシャナ・ディーパー",
      role: "바루나 신전 신관장",
      race: "휴린",
      gender: "남",
      age: "38세",
      hair: "흑색",
      eyes: "차색",
      skin: "갈색",
      quote: "\"뭐든지, 뭐, 대강 해봐\"",
      note: "바루나 신전의 총괄 신관. 신들 신관장을 대대로 맡는 집안에서 태어나, 원래는 신관으로서 도리를 걸을 예정이었다. 분수에 맞지 않은 여행 경험이 많아, 너무나 빨리 여러 곳에 배치되어 지나치게 유연하여, 그 순간의 파도 방향에 따라 행동하는 것 같은 남자로 경멸받고 있다. 만사에 있어 신전 내에는 자유로운 기운이 흐른다.",
    },
    {
      name: "벤디·티파니·그레이즈",
      nameJp: "ヴェンディ・ティファニー・グレーズ",
      role: "수렵의 여신",
      race: "페이·발키리",
      gender: "여",
      age: "18세",
      hair: "금색",
      eyes: "녹색",
      skin: "백색",
      quote: "\"응, 사냥이라면 맡겨라\"",
      note: "강력한 마수의 집단 「칠의 봉인」을 격파한 발키리의 소녀. 마수에게 걸린 저주를 해방하는 마법을 쉽게 풀 수 있다. 현재는 바루나 주변에서, 동료와 함께 인근 마수 집단을 우선적으로 토벌하고, 관련 정보를 헌터들에게 제공하고 있다.",
    },
    {
      name: "「빈약 가드나」 라크슈만",
      nameJp: "「貧弱ガーデナー」ラクシュマン",
      role: "바루나 연금술 학교 강사",
      race: "휴린",
      gender: "남",
      age: "22세",
      hair: "금색",
      eyes: "청색",
      skin: "백색",
      quote: "\"야, 타격에 효과 있는 약을 찾고 있어\"",
      note: "바루나 연금술 학교에서 강의하는 강사. 항상 몸이 약하여, 항상 어딘가의 기분이 나쁘고, 어떻게든 그 기분을 풀기 위한 약을 탐구하고 있으며, 모험가가 되는 꿈을 지닌 강사를 하고 있다. 가드나로서의 솜씨는 일류 제일이고, 가르치는 방식도 훌륭하다고 정평이 나있다. 각 지방의 약초를 부지런히 찾고 있으며, 방문하는 자에게서 약초 등에 대해 귀를 기울인다.",
    },
    {
      name: "「백의 여」",
      nameJp: "「白の女」",
      role: "테러리스트 수괴",
      race: "휴린",
      gender: "여",
      age: "불명",
      hair: "흑색",
      eyes: "흑색",
      skin: "백색",
      quote: "\"番王에게는 언젠가 심판의 때가 찾아올 것이야\"",
      note: "악정이 이어지는 혼란한 시대에 이름을 날린 바이퍼즈 네스트라 불리는 비밀 결사의 「백의 여」라 불리는 자. 그 이름은 후-드로 얼굴을 숨기는 것으로, 이름도 거의 알려져 있지 않다. 하지만 도시 곳곳에서 범죄의 그림자에 이 소녀가 관계하고 있다는 소문이 있다.",
    },
  ];
  const kailasha = [
    {
      name: "바-7세",
      nameJp: "バーサフ7世",
      role: "마쥬라니카 왕국 대번왕",
      race: "휴린",
      gender: "남",
      age: "42세",
      hair: "흑색",
      eyes: "흑색",
      skin: "유색",
      quote: "\"나는 민을 구하기 위해 검을 쓸 수는 없다. 그러나 민을 모을 수는 있다.\"",
      note: "마쥬라니카 왕국을 다스리는 대번왕. 뛰어난 영웅 나레슈의 혈통이라 여겨지고 있다. 초기에는 전사로서도 뛰어나지 않고, 영웅이라 불리기에는 아무래도 뒤처지는 자신을 알면서도, 갑자기 영리한 인물로 알려져 있다. 도시를 위해 모험자를 보호하기 위해 모험자를 후원하고 있다.",
    },
    {
      name: "자가드·카루나타카",
      nameJp: "ジャガド・カルナータカ",
      role: "비루-다키 신전 신관장",
      race: "에르다나오",
      gender: "남",
      age: "533세",
      hair: "은색",
      eyes: "차색",
      skin: "갈색",
      quote: "\"헌터라면 규칙은 규칙, 지켜달라\"",
      note: "비루-다키 신전의 신관장. 헌터들이 이용하게 되어, 오래전부터 경건한 역사를 가진 신전에는 독특한 관습이나 의례도 있었다. 대신전보다 자가드 신관장이, 그 역할을 이어받도록 하는 규범에 맞게, 작은 자들을 보살피는 신관장이기도 하다. 근처 헌터들의 대부분이 거의 모이는 신전이기도 하며, 신관 내에는 자유로운 기운이 흐른다.",
    },
    {
      name: "마쥬라니카·조-",
      nameJp: "マジェラニカ・ジョー",
      role: "영웅 탐험가의 2대째",
      race: "휴린",
      gender: "남",
      age: "21세",
      hair: "차색",
      eyes: "청색",
      skin: "백색",
      quote: "\"너도 꿈과 로맨스를 좋아하지?\"",
      note: "대륙에서 이름을 날린 위대한 탐험가 마쥬라니카·조-의 손자. 후계자로서, 행하는 도중에 어려운 사정에 처하게 되기도 하지만, 꿈과 로맨스를 향해 돌진하고, 선대 마쥬라니카·조-가 기록한 탐험 일지에는, 대륙 각지의 미지 통로 탐험에 관한 정보가 있으며, 그 정보를 찾는 탐험자들도 많다. 그 정보를 발견한 탐험자에게는 그 정보가 전해진다고 한다.",
    },
    {
      name: "니베-사·마드바",
      nameJp: "ニヴェーサ・マドヴァ",
      role: "마수 연구소 소장",
      race: "네바프",
      gender: "남",
      age: "79세",
      hair: "적색",
      eyes: "흑색",
      skin: "백색",
      quote: "\"무히히……귀엽고 귀여운 마수 쨩……\"",
      note: "마수 연구소를 대대로 맡는 마드바 가문의 현 당주. 마수에 대해 편집적인 애정을 갖고 있어, 연구에 있어서는 다른 모든 것과 타협하는 변인이다. 이미 연구의 많은 배경과 마대와 교류한 부분이 있다. 이미 연구소를 세우는 것이 가장 좋은 바이탈리티를 발휘하여, 필요하다면 스스로가 각지에 발을 운반한다고 한다.",
    },
    {
      name: "바드라·스웨다",
      nameJp: "バドラ・スウェダ",
      role: "비루-다키 신전 사무원",
      race: "휴린",
      gender: "여",
      age: "19세",
      hair: "차색",
      eyes: "흑색",
      skin: "갈색",
      quote: "\"새 일, 하고 있어요~\"",
      note: "마수 퇴치 의뢰를 받으러 오는 모험자들을 돕는 비루-다키 신전의 사무원. 카이라샤 태생의 휴린. 아직 경험 1년 정도의 신참 사무원이지만, 최근 마수 증가에 따라 일이 늘어나고 있다. 지닌 것 있는 활동적인 성격을 무기 삼아, 많이 모여드는 모험자들을 상대하고 있다.",
    },
  ];
  return (
    <div>
      <SecTitle title="바루나의 인물들" />
      <Prose text={"바루나에서 활약하는 주요 인물들."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
        {varuna.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a2a" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", marginTop: 2 }}>{p.nameJp}</div>
              </div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "3px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 12 }}>{p.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#666", margin: "10px 0" }}>
              {[
                { label: "종족", value: p.race }, { label: "성별", value: p.gender },
                { label: "나이", value: p.age }, { label: "발색", value: p.hair },
                { label: "눈색", value: p.eyes }, { label: "피부", value: p.skin },
              ].map((attr, j) => (
                <span key={j} style={{ background: "#F7F4EE", border: "1px solid #E8E3DA", borderRadius: 6, padding: "2px 8px" }}>
                  <span style={{ color: "#aaa" }}>{attr.label}: </span>{attr.value}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "13px", fontStyle: "italic", color: ACCENT, margin: "8px 0", paddingLeft: 12, borderLeft: `2px solid ${ACCENT}50` }}>{p.quote}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.note}</div>
          </div>
        ))}
      </div>
      <SecTitle title="카이라샤의 인물들" />
      <Prose text={"카이라샤에서 활약하는 주요 인물들."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
        {kailasha.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: "4px solid #4A6A1A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a2a" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", marginTop: 2 }}>{p.nameJp}</div>
              </div>
              <span style={{ fontSize: "11px", background: "#4A6A1A15", color: "#4A6A1A", padding: "3px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 12 }}>{p.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#666", margin: "10px 0" }}>
              {[
                { label: "종족", value: p.race }, { label: "성별", value: p.gender },
                { label: "나이", value: p.age }, { label: "발색", value: p.hair },
                { label: "눈색", value: p.eyes }, { label: "피부", value: p.skin },
              ].map((attr, j) => (
                <span key={j} style={{ background: "#F7F4EE", border: "1px solid #E8E3DA", borderRadius: 6, padding: "2px 8px" }}>
                  <span style={{ color: "#aaa" }}>{attr.label}: </span>{attr.value}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "13px", fontStyle: "italic", color: "#4A6A1A", margin: "8px 0", paddingLeft: 12, borderLeft: "2px solid #4A6A1A50" }}>{p.quote}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MajelanicaPage() {
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
      case "history":   return <HistorySection />;
      case "kingdom":   return <KingdomSection />;
      case "regions":   return <RegionsSection />;
      case "events":    return <EventsSection />;
      case "varuna":    return <VarunaSection />;
      case "kailasha":  return <KailashaSection />;
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
      {(!mob || showNav) && (
        <nav style={{ width: mob ? "100vw" : 220, flexShrink: 0, background: SIDEBAR_BG, display: "flex", flexDirection: "column", padding: "24px 0", overflowY: "auto", position: mob ? "fixed" : "relative", top: 0, left: 0, height: "100vh", zIndex: 999, boxShadow: mob ? "2px 0 16px rgba(0,0,0,0.3)" : "none" }}>
          <a href="/" style={{ display: "block", padding: "0 20px 20px", textDecoration: "none" }}>
            <div style={{ fontSize: "10px", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>← 이상동몽 위키</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Noto Serif KR', serif" }}>마쥬라니카</div>
            <div style={{ fontSize: "10px", color: "#aaa", marginTop: 2 }}>マジェラニカ — 魔獣の大陸</div>
          </a>
          <div style={{ height: 1, background: "#333", margin: "0 16px 16px" }} />
          {navItems.map(n => (
            <button key={n.id} onClick={() => setActiveId(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 20px", background: activeId === n.id ? `${ACCENT}30` : "transparent", border: "none", borderLeft: activeId === n.id ? `3px solid ${ACCENT}` : "3px solid transparent", color: activeId === n.id ? "#fff" : "#aaa", fontSize: "13px", fontWeight: activeId === n.id ? 600 : 400, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
              <span>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </nav>
      )}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "40px 48px", maxWidth: 860 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{activeNav.icon} {activeNav.label}</div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1.3 }}>마쥬라니카</h1>
          <div style={{ fontSize: "12px", color: "#aaa", marginTop: 4 }}>マジェラニカ — 남방 대륙 · 마수의 땅</div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 16, borderRadius: 1 }} />
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
