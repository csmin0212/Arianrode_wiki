'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A4A8A";
const ACCENT_LIGHT = "#D8E0F5";
const SIDEBAR_BG = "#080C1C";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "다이와 개요",         icon: "⛵" },
  { id: "society",   label: "정치·사회·군사",       icon: "⚔️" },
  { id: "culture",   label: "문화·산업·신앙",       icon: "⛩️" },
  { id: "oodo",      label: "수도 오오도",          icon: "🏯" },
  { id: "orgs",      label: "조직",                icon: "🗡️" },
  { id: "people",    label: "인물",                icon: "👤" },
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
    { label: "국명",      value: "다이와 군도국" },
    { label: "수도",      value: "오오도 (王都オオド)" },
    { label: "통치 형태", value: "막번제 (다이묘·번 체제)" },
    { label: "현 타이쿤", value: "아오이·카게유키" },
    { label: "인구",      value: "약 2,500만 명" },
    { label: "위치",      value: "에린딜 대륙 동해, 세리아 대제국 동방" },
  ];
  const pops = [
    { label: "휴린",   pct: 50, color: "#2A4A8A" },
    { label: "네바프", pct: 28, color: "#4A6A8A" },
    { label: "엘다난", pct: 12, color: "#2A6B5A" },
    { label: "기타",   pct: 10, color: "#7A7A8A" },
  ];
  return (
    <div>
      <Prose text={"에린딜 대륙의 동해에 떠 있는 섬들을 영역으로 하는 다이와 군도국. 사무라이와 닌자의 발상지라고 알려져 있으며, 에린딜 서방에도 그 이름은 전해지고 있다."} />
      <Prose text={"대륙에서 격리된 환경에서 긴 전란 시대를 거친 다이와는, 세리아 대제국이나 타루타루와는 다른 독특한 문화 풍습이 근간에 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <SecTitle title="인구 구성" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px" }}>
        {pops.map((p, i) => <PopBar key={i} label={p.label} pct={p.pct} color={p.color} />)}
      </div>
      <SecTitle title="건국의 역사" />
      <Prose text={"\"불의 시대\" 이전부터, 이 지역에는 네바프를 필두로 한 선주민이 살고 있었다. 그들은 섬의 해안을 따라 취락을 형성하고, 채집이나 수렵, 어업으로 생계를 유지하는 소박한 생활을 보내왔다."} />
      <Prose text={"\"불의 시대\"가 되어 대륙에서 이주해 온 휴린과 엘다난이 세력을 갖게 되어, 이동 집단이 부족 사회를 형성했다. 부족마다 소국이 그 다음을 반복하여 다투어, 약 200년 전 아오이 가(家)의 대두에 의해 하나의 다이와 군도국으로서 통일되었다. 그러나 통일 이후에도 지방 세력의 힘이 강하여, 여전히 내분이 끊이지 않는다."} />
      <SecTitle title="기후와 풍토" />
      <Prose text={"다이와 군도국은 에린딜 대륙 동해에서 해를 건너 대육상에 위치한다. 대·소 합쳐 수백 개의 섬들이 밀집해 있다. 기후는 온난하여 4계절의 변화가 있으며, 강우량도 풍부하고, 농경에 적합한 땅이라 할 수 있다. 바다로 둘러싸여 있어 바람이 강하고, 계절의 변화 때에 큰 폭우나 쓰나미가 마을을 휩쓸어 버리는 일도 있다."} />
      <Prose text={"장마가 이어지면 관개나 토사 재해가 발생할 위험성도 높다. 산악 지역에는 화산이 많고, 분화나 지진도 정기적으로 발생한다."} />
      <SecTitle title="타국과의 관계" />
      <Prose text={"다이와는 해운 사업이 발달한 섬나라다. 정치적으로도 항상 해상으로의 호기심이 강하고, 외국으로부터의 진귀한 물건이나 기술을 들여오고 싶다는 의욕이 강하다. 그래서 에린딜 대륙 각지에서 소국을 경유하여 동방 각지로 상인들이 빈번히 이동한다."} />
      <Prose text={"세리아와는 남쪽 교역로를 통해 활발히 교류하며, 서방 마제라니카 대륙까지의 교역에도 적극적이다. 도서 국가로서 직접 침략을 받은 경험이 없으나, 밀무역선이나 해적의 피해는 있다. 특히 인접 세리아에서는 상당한 피해가 발생하기도 했다."} />
      <SecTitle title="사건과 전승" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {[
          {
            title: "전국 마왕의 부활",
            text: "다이와 군도국에서 일어난 큰 사건으로, 전국시대의 마왕 오와리·노부카타의 부활이 언급된다. 노부카타는 한때 다이와 통일을 목표로 하면서 마왕으로 변해버렸다. 그 후 수세에 몰리고 최후에는 초대 타이쿤인 아오이·미트테루가 노부카타를 상대하여 다이와의 일정한 평화를 되찾게 됐다. 사건의 상세는 불명이나, 최근 노부카타의 혼이 되살아나고 있다는 말이 있으며, 각 번이 경계를 강화해 막부도 밀정을 보내 정보를 수집하고 있다.",
          },
          {
            title: "동방의 네오·다이나스토카발 극동지부",
            text: "네오·다이나스토카발은 크게 두 가지 목적으로 다이와 군도국에서 활동한다. 하나는 서방신전과 오랜 싸움을 계속해 온 다이나스토카발 극동지부로서, 그 활동 거점이기도 하다. 또, 본래의 활동과 별개로 자금 조달을 목적으로 한 비즈니스 활동도 행한다. 서방의 영향력이 다이와에서는 비교적 작다는 것을 고려하면, 유명하지 않은 이름인 '민간기업 그룹'이라는 것도 있다. 이는 어느 의미에서 정체를 숨기는 것이기도 하다.",
          },
        ].map((ev, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>🔱 {ev.title}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{ev.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocietySection() {
  return (
    <div>
      <SecTitle title="사회 계층" />
      <Prose text={"전란이 많은 다이와에서는 계급 최상위에 다이묘를 섬기는 '武家'라 불리는 사무라이 일족이 온다. 다이와에 있어서 사무라이는 다른 계급과는 일선을 긋는 존재로 여겨지며, 사무라이 일족의 사회를 구성하고 있다.\n\n영주도 지방마다 풍속이 다르다. 농촌이나 어촌은 집락 단위로 관리하고, 세금은 번이 집행하며 번이 세금 징수 단위를 맡는다. 다이와 국민의 대부분을 차지하는 농민은 농산물이나 특산품을, 도시부의 상인이나 장인은 금전으로 세금을 납부하며, 납세는 한 해 두 번 정도 분납하여 관리에 납부하는 것이 관행이다."} />
      <SecTitle title="지방 통치" />
      <Prose text={"다이묘는 지역에 뿌리 내린 가족이며, 각 영지의 독자적 통치법을 보유한다. 영주들, 즉 역대 타이쿤도 현 다이묘에 대한 신뢰 의존의 편이 강하다. 유력 번(有力藩)은 막부군에 상당하는 병력을 보유하여, 대등하게 다툴 수 없는 번에 대한 구속력은 약하다. 변경에서는 다이묘 간의 분쟁도 빈발하여, 반란이나 도망한 자들도 많이 존재한다.\n\n일부 다이묘는 막부의 군사력을 이용하여, 자신의 소재지에서 병사를 늘려 전력을 구비하는 경우가 있다. 그러나 직접 지시는 타이쿤에게 전달할 수 없어, 반란을 두려워하는 막부는 대형선 건조 등의 일부 번의 무기나 전략을 제한하고, 각 번의 비밀스런 능력을 확대하려는 번들이 많이 보인다."} />
      <SecTitle title="사무라이" />
      <Prose text={"다이와 군대의 중심은 철도(鐵刀)와 다이와 독자의 근접 전투 부대 — 사무라이다. 사무라이는 전문적인 근접 전투부대로, 나, 다른 국가들이 군대를 묘사하는 것과는 다른 독특한 감각으로 전쟁에 임하는 것이 이 나라의 특징이다. 칼뿐만 아니라 다른 무기, 활과 화살도 사용한다.\n\n현재 다이와에서는 상대적으로 전시 중에는 목표로 하여 자신의 검술 도장에 다가가 연습을 쌓으며, 각종 전투 기술과 전법을 연마하여 여러 전쟁을 이기게 한다. 지금에 이르기까지는, 다른 국가들의 무기는 있어도, 현지의 전사들은 오늘도 땅에 잠들어 있다."} />
      <SecTitle title="닌자" />
      <Prose text={"닌자는, 다이와에 있어서 척후와 첩보를 담당하는 경보병이다. 사무라이와 달리, 전장의 표면에 나서지 않으며, 평시의 정보수집이나 적지 잠입 담당으로서 공작 활동에 종사한다. 그들은 법외라 불리는 여러 가지 비술을 사용하며, 무기를 사용한 싸움과 함께, 암살이나 혼란 조성 등의 임무를 맡을 수 있다.\n\n닌자의 기량은 법외라고도 불리는 특수한 기법에 있으며, 그 기술은 높은 평가를 받는다. 실력주의인 닌자 조직 내에서, 그들의 기량에 따라 대우가 결정된다."} />
      <SecTitle title="군사" />
      <Prose text={"다이와에 있어서는, 전투는 지배 계층인 사무라이들이 중심적 역할을 맡는다. 그들은 태어날 때부터 군인이며, 검술 도장에서 가르침을 받기 시작한다.\n\n사무라이의 군대는 막부를 위한 의용군이나 다름없다. 다이묘들은 직접 징병을 행하지 않고, 병사들을 교육하여 유사시에 대비한다. 다만 반란을 두려워하는 막부의 대부분은, 다른 번이나 막부를 제압하기 위해 독자적인 병력을 구축하는 번들이 많이 보인다."} />
    </div>
  );
}

function CultureSection() {
  const gods = [
    { west: "아르켄라브",   east: "아데테루",   faith: "태양신",          gender: "남성" },
    { west: "리아르",       east: "스사노오",   faith: "바다의 신, 폭풍의 신", gender: "남성" },
    { west: "그라신아인",   east: "타카후츠",   faith: "뇌신, 검의 신",   gender: "남성" },
    { west: "고바조논",     east: "카구츠치",   faith: "불의 신, 대장장이의 신", gender: "남성" },
    { west: "다단",         east: "이자나미",   faith: "신의 어머니",     gender: "여성" },
    { west: "다그데모아",   east: "이자나기",   faith: "신의 아버지",     gender: "남성" },
    { west: "브리간티아",   east: "츠키코미",   faith: "달의 신",         gender: "여성" },
    { west: "아에마",       east: "나키하메스",  faith: "우물의 신",       gender: "여성" },
  ];
  return (
    <div>
      <SecTitle title="산업과 문화" />
      <Prose text={"다이와의 중심 산업은 농업, 임업, 어업 등으로, 지역에 따라 명산이 있다. 광산은 각 번의 막부 관리하에 있어 제한이 있으나, 다이와 특산인 구리·황철·도검 등이 해외로 수출되고 있다.\n\n부채, 병풍, 자기, 도검 등 독특한 풍취를 가진 미술품이나 공예품이 각지에서 만들어지고 있으며, 이것들은 다른 나라에서도 높은 평가를 받고 있다."} />
      <SecTitle title="칸나기 (カンナギ)" />
      <Prose text={"다이와의 신사는 신사라고 불리며, 서방의 신전과는 다른 분위기를 갖고 있다. 그곳에서 행해지는 의례나 의식은 서방의 것과도 이질적이다.\n\n서방에 있어서 아코라이트에 해당하는 일을 칸나기라 불리는 신관이 행한다. 칸나기는 원래 신탁을 다른 이들에게 전하는 역할을 맡고 있었으나, 현재는 그 외에도 특수한 마술의 사용을 능숙히 활용하여, 전장에서도 사람들을 지키기 위한 기원을 올리고, 사람들을 치유하는 술을 행하는 칸나기도 있다."} />
      <SecTitle title="서방의 신과 동방의 신" />
      <Prose text={"다이와 군도국의 신앙은 서방의 7대신과는 별개의 신들로 이루어져 있다. 바다에 둘러싸인 다이와에서는 海에 관한 신들이 많이 신앙된다는 것도 특징이다. 이 신앙이 서방과 별개로 발전해 왔다고 하지만, 신들의 형상이 서방의 신들과 유사한 경우도 있어, 나하스·사메를 믿는 사람은 비교적 적다."} />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, overflow: "hidden", marginTop: 8 }}>
        <div style={{ background: ACCENT, color: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr 2fr 60px", padding: "8px 14px", fontSize: "12px", fontWeight: 600 }}>
          <span>서방 이름</span><span>동방 이름</span><span>다이와에서의 신앙</span><span>신격</span>
        </div>
        {gods.map((g, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr 60px", padding: "8px 14px", fontSize: "13px", borderTop: "1px solid #F0EBE3", background: i % 2 === 0 ? "#fff" : "#FAFAF7" }}>
            <span style={{ color: "#555" }}>{g.west}</span>
            <span style={{ fontWeight: 600, color: "#2a2a2a" }}>{g.east}</span>
            <span style={{ color: "#444" }}>{g.faith}</span>
            <span style={{ color: g.gender === "여성" ? "#8A2A5A" : "#2A4A8A", fontSize: "12px" }}>{g.gender}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OodoSection() {
  const stats = [
    { label: "인구",        value: "약 10만 명" },
    { label: "통치 형태",   value: "봉건제" },
    { label: "현재 수장",   value: "아오이·카게유키" },
    { label: "종교",        value: "7대신 신앙" },
    { label: "공용어",      value: "다이와語, 서방공통어" },
    { label: "수원",        value: "오오카미강 수취" },
    { label: "기후",        value: "온대" },
    { label: "수입",        value: "식료품·석재·목재·자연광물도료" },
    { label: "수출",        value: "해산물·무기·공예품·장식품·반물" },
  ];
  const pops = [
    { label: "휴린",   pct: 67, color: "#2A4A8A" },
    { label: "엘다난", pct: 10, color: "#2A6B5A" },
    { label: "네바프", pct:  8, color: "#4A6A8A" },
    { label: "뷔르나", pct:  6, color: "#7A6A4A" },
    { label: "필볼",   pct:  5, color: "#6A4A8A" },
    { label: "도안",   pct:  4, color: "#7A7A8A" },
  ];
  const districts = [
    {
      name: "一の掘 (이치노호리)",
      desc: "오오도의 중추를 수호하는 '이치노호리'. 그 내부에는 오오도 성과 행정기관이 집중되어 있다. 당연히 경비가 삼엄하며, 이치노호리에 설치된 橋를 건너는 것은 아오이 일족에 명을 올린 자, 혹은 허가를 받은 용인만이 가능하다.",
    },
    {
      name: "二の掘 (니노호리)",
      desc: "城 외벽 외곽에 해당하는 구역. 무가 저택이 밀집하는 곳으로, 아오이 가에 봉사하는 사무라이들이 살고 있다. 또한, 지방 다이묘가 오오도를 방문할 때 거처하는 저택도 이 구역에 있다. '이치노호리' 내부처럼 진입에 제한은 없으나, 볼 일이 없으면 가까이 다가가지 않는 것이 좋다.",
    },
    {
      name: "三の掘 (산노호리)",
      desc: "城下 전체를 둘러싸는 것이 삼노호리로, 니노호리와의 사이에는 성하 주민들이 생활하는 城下 전반의 구역이 있다. 대부분에는 다이와 특유의 집합주택인 長屋가 늘어서며, 그 옆에 밀집한 상점가가 이어지고, 그 집들 사이에 장인이 일하는 대장간 등도 있다. 町 곳곳에 설치된 우물은 수원으로 이용된다. 또는 교통로로도 이용 가능하여, 町을 이어주는 운하도 보인다.",
    },
  ];
  const orgs = [
    {
      name: "아오이 家 (타이쿤 家)",
      type: "왕족",
      base: "오오도 성 혼마루",
      leader: "아오이·카게유키",
      content: "다이와를 통일한 다이묘 일족이자 현재 타이쿤 가문. 오랜 세월 군림해 왔지만, 오늘날에는 통치 능력이 저하되어 가고 있다는 인상도 있다. 그것은 오랜 세월을 경험하고도 통치의 길에서 벗어나고 있는 것이 그 이유로 여겨진다.",
    },
    {
      name: "다이와 음양료 (ダイワ陰陽寮)",
      type: "정부 조직",
      base: "오오도 성 외곽",
      leader: "앙가·미요켄",
      content: "전통 점복, 역법 편찬을 담당하는 막부 직할 기관. 온미묘지라고도 불린다. 마술에 관한 연구기관이기도 하며, 마술사가 많이 소속되어 있다. 다이와에서 가장 큰 학부이기도 하며, 마술사를 양성하는 군도국 최대의 학부다.",
    },
    {
      name: "아사기리 류 도장 (アサギリ流道場)",
      type: "개인 단체",
      base: "아사기리 류 도장",
      leader: "2대 소우에몬 (창설자)",
      content: "전설의 검객 아사기리·소우에몬이 창설했다고 전해지는 검술 도장. 현재 검술의 핵심 도장. 3대부터 타이쿤 가문의 검술 사범 역을 담당하고 있다. 庶民이나 사무라이도 입문할 수 있으며, 문하에는 10년 이상의 경험을 가진 훌륭한 칸나기도 한 명 있다.",
    },
    {
      name: "이로하 組 (いろは組)",
      type: "정부 조직",
      base: "마치부교쇼 (町奉行所)",
      leader: "타마가키·타다노부",
      content: "오오도 각지에 배치된 다이와 소방 조직. 마치부교쇼 관할하의 48분대로 구성되며, 토목·건축가를 중심으로 5000명 이상의 규모. 원래 두 파로 나뉘어 싸우고 있었지만, 해산에 성공하여 지금은 하나의 조직으로 통합되었다.",
    },
    {
      name: "네오·다이나스토카발 극동지부",
      type: "범죄 조직",
      base: "불명",
      leader: "파우스타 교수",
      content: "서방신전에 대항하는 지역 밀착형 악의 비밀결사. 주요 활동은 서방과의 지하 연결망, 서방 신탁 비법서 유통, 비행선·옥상·요리·연예 등 다양한 사업 경영. 자금력과 연줄로 다이와에 깊이 뿌리를 내리고 있다. 최근 두 파로 나뉘어 있었지만 해산에 성공한 것으로 알려지고 있다.",
    },
  ];
  return (
    <div>
      <Prose text={"오오도는, 에린딜 대륙 동해에 떠 있는 군도 중에서도 가장 큰 섬인 혼토우의 동쪽에 위치하는 다이와 군도국의 왕도다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <SecTitle title="인구 구성" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px" }}>
        {pops.map((p, i) => <PopBar key={i} label={p.label} pct={p.pct} color={p.color} />)}
      </div>
      <SecTitle title="오오도의 역사" />
      <Prose text={"오오도는 일찍이 아오이 가(家)가 지방 다이묘 중 하나에 불과했던 무렵에는, 어디에나 있는 田舍 번의 성 아래 마을이었다. 그러나 전국시대에 마왕 오와리·노부카타와 동맹 관계를 맺음으로써 아오이 가의 세력은 증가해 갔다. 그리고 아오이 가가 타이쿤 가문이 되어, 오오도는 신생 다이와 군도국의 수도로서 태어나게 되었다.\n\n오오도 성 중심의 성 확장 혹은 증축이 행해지고, 일찍이 지방 도시였던 이곳은 다이와 군도국의 수도로서 대도시로 탈바꿈했다. 현재의 오오도는 다이와에서 가장 인구가 많은 곳으로, 문화와 유행의 발신지이기도 하다."} />
      <SecTitle title="오오도의 구조" />
      <Prose text={"타이쿤이 거주하는 오오도 성을 중심으로 한 동심원형 구조를 갖는다. 이 구조는 서방에서도 볼 수 있으나, 거리의 동쪽을 북에서 남으로 흐르는 오오카미강이, 그 물을 끌어들인 해자로 둘러싸인 독특한 거리 경관을 형성하고 있다. 입지하는 건물은 대부분이 목조로, 기와나 석조의 것은 거의 볼 수 없다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>{d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="오오도의 조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 10 }}>{o.type}</span>
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

function OrgsSection() {
  const orgs = [
    {
      name: "호크토 번 (ホクト藩)",
      type: "정부 조직 (번)",
      base: "사노우",
      leader: "아오이·메코히메",
      content: "북구의 대도시 사노우를 쥐고 있는 유력 번. 메코히메는 타이쿤과 군사 관계가 두터운 집안 출신으로, 장성해서도 군사력을 유지하고 있다. 타이쿤의 세력에 의존하면서도 군사력 확대를 계속하고 있어, 아오이(타이쿤) 가와 긴장 관계를 유지하고 있다.",
    },
    {
      name: "우쓰미야 번 (ウツミヤ藩)",
      type: "정부 조직 (번)",
      base: "우쓰미야",
      leader: "온다·아야메",
      content: "풍요롭고 발달된 관광 도시 우쓰미야를 중심으로 한 번. 교류 주둔이나 지역 해역의 안전 유지를 공식 목표로 한다. 번주 아야메는 전 타이쿤 선대의 인척이기도 하며, 아오이 타이쿤 가문과도 인맥을 갖고 있다.",
    },
    {
      name: "다이와 大社",
      type: "종교 조직",
      base: "야치요",
      leader: "진기 (8명)",
      content: "다이와 군도국 고유의 신앙을 총괄하는 중심 신사. 서방의 7대신에 대응하는 동방 신들을 봉헌하는 8개의 신전으로 구성된다. 8명의 진기라 불리는 사람들이 각 신전을 관리하며, 조직으로서의 기능을 담당한다.",
    },
    {
      name: "쿠로나미슈 (黒波衆)",
      type: "정부 조직 (직속)",
      base: "오오도 (활동: 다이와 전역·해외)",
      leader: "불명",
      content: "다이와 군도국 타이쿤 직속의 정보기관. 구성원 「고니와반(御庭番)」은 신분을 숨기고 다이와 각지 및 해외에 잠입하여 정보 수집과 비밀 임무를 수행한다. 평시에는 상인·여행자 등의 겉 직업을 가장하며, 일부는 진짜 미와반으로서 정체를 감추기도 한다. 주요 임무는 다이묘의 동향, 국민의 불만, 국외에서의 금지품 밀수 정보 수집 등. 잠입을 위해 일견 무기처럼 보이지 않는 「암기(暗器)」를 사용한다.",
    },
    {
      name: "요도 屋 (요도야)",
      type: "개인 상회",
      base: "코카니",
      leader: "요도야 고로우자",
      content: "다이와 항만 도시 코카니에 본점을 두는 대형 상가. 무역업과 금융 대여도 영위하며, 고객에는 시민 외에도 다이묘가 많이 있다. 겉으로는 평온하고 타인에게 금전을 빌려주는 상가이지만, 상당한 다이묘에게 금전을 빌려주고 다이와를 배후에서 조종하려는 야심을 품고 있다. 어떤 다이묘든 필요할 때에 손을 내밀지 않을 수 없는 상황이다.",
    },
    {
      name: "카이라기 해적단",
      type: "범죄 조직",
      base: "니시키지마",
      leader: "\"노해주\" 고토·소우린",
      content: "노해주로 불리는 선장 아래 100명 이상의 해적 병력과 3척 이상의 함선을 보유한 해적단. 세리아 해안선에서 이어지는 다이와 서방 해역에 큰 세력권을 갖고 있다. 세리아 방면 선박 납치, 세리아 서부 해역 통행 방해, 소규모 강제 교역 등 잔혹한 방법으로 악명이 높다.",
    },
  ];

  return (
    <div>
      <Prose text={"다이와 군도국과 관련된 주요 조직들을 소개한다. PC의 의뢰인, 협력자, 혹은 적대자로 등장할 수 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 10 }}>{o.type}</span>
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
  const people = [
    {
      name: "아오이·카게유키",
      nameJp: "アオイ・カゲユキ",
      role: "다이와 군도국 8대 타이쿤",
      race: "휴린",
      gender: "남",
      age: "29세",
      hair: "흑발",
      eyes: "흑색",
      skin: "황색",
      quote: "\"항상 수고를 끼치는군. 그대들의 도움, 감사한다\"",
      note: "다이와 군도국 8대 타이쿤. 어릴 때부터 연구를 쌓아온 총명하고 과단성 있는 젊은이. 생사와 내정 면에서 아오이 가문 충신들의 신뢰는 두텁지 않으나, 그 압박 속에서도 일족을 설득하고 화해 방안을 찾고 있다. 현재는 다이묘들과의 화평을 추구하며 날마다 노력 중.",
    },
    {
      name: "아오이·오토하",
      nameJp: "アオイ・オトハ",
      role: "타이쿤의 여동생",
      race: "휴린",
      gender: "여",
      age: "20세",
      hair: "흑발",
      eyes: "흑색",
      skin: "황색",
      quote: "\"그래! 서방으로 가자!!\"",
      note: "카게유키의 여동생. 시에이 류 검술을 배운 모험가 기질의 여성. 겉으로는 타이쿤 가문의 아가씨이지만 비밀이 있다 — 타이쿤의 감시를 피해 조용히 퇴치하고 있는 「헌법」이 있다는 것. 서방의 사정에도 밝고, 머지않아 서방으로 여행을 떠나고 싶다고 생각하고 있다.",
    },
    {
      name: "레오날다·엔브리우스",
      nameJp: "レオナルダ・エンブリウス",
      role: "서방신전의 신관",
      race: "엘다난",
      gender: "여",
      age: "32세",
      hair: "은발",
      eyes: "청색",
      skin: "백색",
      quote: "\"흠, 그것은 흥미로운 이야기군요\"",
      note: "타이쿤의 보호를 구하는 「성녀」. 디아스론드에서 온 교단 사절. 실은 다이와의 상황을 시찰하는 첩보원으로, 때로 서방과 동방을 향하는 정보 수집에 종사한다. 냉정한 겉모습 속에 강한 호기심을 품고 있으며, 특히 동방 문화에 강한 관심을 갖고 있다.",
    },
    {
      name: "파우스타 교수",
      nameJp: "ファウスタ教授",
      role: "네오·다이나스토카발 극동지부장",
      race: "필볼",
      gender: "여",
      age: "19세",
      hair: "청흑발",
      eyes: "흑색",
      skin: "백색",
      quote: "\"나를 교수라고 부르세요\"",
      note: "네오·다이나스토카발의 간부 중 하나. 괴인 조직의 매니지먼트와 컨설팅까지 광범위하게 담당한다. 강인함과 소소한 능력의 소유자. 서로 경쟁하는 라이벌 프로이라인·셉터와 대신 교체되어 극동지부의 지도를 담당하게 되었다.",
    },
    {
      name: "요도야 고로우자",
      nameJp: "ヨド屋ゴロウザ",
      role: "대상인",
      race: "네바프",
      gender: "남",
      age: "45세",
      hair: "흑발",
      eyes: "황색",
      skin: "황색",
      quote: "\"크흐흐, 돈만 있으면 다이묘도 움직일 수 있지\"",
      note: "다이와 항만 도시 코카니에 본점을 둔 대상인. 번을 위해 다른 이들에게 대금을 빌려주는 겉모습과 달리, 상당한 다이묘에게 금전을 빌려주고 다이와를 배후에서 조종하려는 야심을 품고 있다. 어떤 다이묘든 필요할 때에 손을 내밀지 않을 수 없게 만든다.",
    },
  ];
  return (
    <div>
      <Prose text={"다이와 군도국의 주요 인물들을 소개한다. PC의 의뢰처·협력자, 혹은 적대자로 시나리오에 등장시킬 수 있다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
        {people.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a3a" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.08em", marginTop: 2 }}>{p.nameJp}</div>
              </div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "3px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 12 }}>{p.role}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "12px", color: "#666", margin: "10px 0" }}>
              {[
                { label: "종족", value: p.race },
                { label: "성별", value: p.gender },
                { label: "나이", value: p.age },
                { label: "발색", value: p.hair },
                { label: "눈색", value: p.eyes },
                { label: "피부", value: p.skin },
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
    </div>
  );
}

export default function DaiwaPage() {
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
      case "society":   return <SocietySection />;
      case "culture":   return <CultureSection />;
      case "oodo":      return <OodoSection />;
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
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#0A1030", marginBottom: 6 }}>동방 세계 · 도서 국가</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>다이와 군도국<br />ダイワ群島国</div>
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
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "11px", color: "#3A4858" }}>
          <a href="/eastern-world" style={{ color: "#5A6888", textDecoration: "none" }}>← 동방 세계</a>
        </div>
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "48px 48px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#6A7AC8", marginBottom: 10 }}>
              DAIWA ISLANDS — EASTERN ARCHIPELAGO
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#080C1C", marginBottom: 8, letterSpacing: "0.04em" }}>
              다이와 군도국
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#1a1a3a", marginBottom: 4 }}>
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
