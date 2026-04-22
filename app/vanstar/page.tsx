'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8B2D2D";
const ACCENT_LIGHT = "#F5D5D5";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "신성 번스터 제국",  icon: "⚔️" },
  { id: "history",   label: "역사",              icon: "📜" },
  { id: "geography", label: "지세와 산업",        icon: "🏝️" },
  { id: "politics",  label: "정치와 군사",        icon: "⚜️" },
  { id: "cities",    label: "주요 도시",          icon: "🏙️" },
  { id: "events",    label: "전설과 사건",        icon: "📖" },
  { id: "relations", label: "타국과의 관계",      icon: "🤝" },
];

const overviewStats = [
  { label: "국가 형태", value: "제국" },
  { label: "정치 체제", value: "제정 (신성 황제제)" },
  { label: "현재 황제", value: "제단" },
  { label: "거점",       value: "핀지아스 섬" },
  { label: "건국",       value: "성력 719년 (번스터 제국)" },
  { label: "개칭",       value: "성력 999년 (신성 번스터 제국)" },
  { label: "신성 황제검", value: "크라우·소라스" },
  { label: "국가 종교",  value: "아르케라브 신앙" },
  { label: "주요 언어",  value: "공통어, 반즈어, 라프어, 고두앙어" },
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
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>신성 번스터 제국 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {overviewStats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 80 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <Prose text={"서쪽 바다의 핀지아스 섬을 본거지로 하는 제국. 성력 719년에 번스터 제국으로 건국되어, 999년에 신성 번스터 제국으로 개칭했다. \"바람의 시대\"의 신성왕 알트리우스의 혈통을 이었다고 자처하는 황가가 강력한 중앙집권 체제로 통치하고 있다.\n\n동방 진출을 노리며 에를랑 왕국 및 파리스 동맹과 오랜 긴장 관계를 유지해 왔다. 성력 1002년 파리스 동맹 결성으로 동방 침공이 일단 저지됐지만, 성력 1009년 마족 대침공으로 동맹이 피해를 입은 이후 제국이 다시 전쟁 준비에 나섰다는 소문이 끊이지 않는다.\n\n아르케라브 신앙을 국교로 정하고 황제의 신성 권위를 종교와 결합시킨 지배 체계가 특징이다. 미스릴과 오리하르콘 등 희귀 금속의 산지를 장악하고 있어 경제적·군사적 잠재력이 매우 높다."} />
    </div>
  );
}

function HistorySection() {
  const events = [
    { year: "성력 719년",  content: "초대 황제 바펠이 핀지아스 섬을 통일하여 번스터 제국을 건국. \"바람의 시대\"의 신성왕 알트리우스의 혈통임을 선포한다." },
    { year: "성력 799년",  content: "번스터—휴린 일족, 마물 아스트로테에 의해 침략을 당한다. 제국 내부에 큰 혼란이 일어났지만 격퇴에 성공한다." },
    { year: "성력 949년",  content: '"유적의 거리" 두르가르, 번스터 제국에 복종하다. 제국의 대륙 진출이 본격적으로 시작된다.' },
    { year: "성력 999년",  content: "번스터 제국, 신성 번스터 제국으로 개칭. 아르케라브 신앙을 국교로 확립하고 황제의 신성 권위를 선포. 동방으로의 침공을 시작한다." },
    { year: "성력 1002년", content: "파리스 동맹 결성으로 동방 침공에 제동이 걸린다. 4대국 체제 확립. 제국은 잠시 팽창을 멈추고 내부를 다진다." },
    { year: "성력 1006년", content: '"성도" 디아스론드의 "비밀 결사"가 "장폐의 도구" 탐색을 활성화한다. 신구(神具) 탐색이 본격화된다.' },
    { year: "성력 1007년", content: "황제 제단에 대한 암살 미수 사건 발생. 제단은 이를 계기로 반대파를 더욱 강하게 숙청하고 연금술사들을 대거 등용한다." },
    { year: "성력 1009년", content: "파리스 동맹 그랑펠덴 왕국에 마족 대침공이 발생. 동맹의 전력이 소진된 틈을 노려 제국이 재개전을 준비한다는 정보가 에린딜 전역에 긴장을 일으키고 있다." },
  ];
  return (
    <div>
      <Prose text={"번스터 제국은 에린딜 서방의 서쪽 바다, 핀지아스 섬을 근거지로 하여 성력 719년에 성립된 섬나라 제국이다. \"바람의 시대\"의 신성왕 알트리우스의 혈통을 이었다는 황가의 주장을 토대로, 건국 이래 에린딜 대륙 동방으로의 진출을 목표로 세력 확장을 거듭해 왔다."} />
      <div style={{ position: "relative", marginTop: 20 }}>
        <div style={{ position: "absolute", left: 100, top: 0, bottom: 0, width: 2, background: `${ACCENT}25` }} />
        {events.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 0, marginBottom: 14, position: "relative" }}>
            <div style={{ width: 100, flexShrink: 0, textAlign: "right", paddingRight: 16, paddingTop: 5 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: ACCENT, fontFamily: "monospace", whiteSpace: "nowrap" }}>{e.year}</span>
            </div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, flexShrink: 0, marginTop: 5, marginLeft: -5, marginRight: 10, border: "2px solid #F7F4EE", position: "relative", zIndex: 1 }} />
            <div style={{ flex: 1, background: "#fff", border: "1px solid #E8E3DA", borderRadius: 6, padding: "8px 14px" }}>
              <div style={{ fontSize: "13px", color: "#3a3a3a", lineHeight: 1.7 }}>{e.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeographySection() {
  return (
    <div>
      <SecTitle title="핀지아스 섬" />
      <Prose text={"신성 번스터 제국의 본거지인 핀지아스 섬은 에린딜 대륙에서 서쪽 바다를 건넌 곳에 위치하는 거대한 섬이다. 섬이라는 지형 덕분에 제국은 해군력을 크게 발전시켜, 에린딜 서방의 서쪽 해역 제해권을 장악하고 있다.\n\n기후는 해양성으로 비교적 온화하고, 섬 내부에는 농경지와 목축지가 펼쳐져 있어 식량 자급이 가능하다. 수도 번스터은 섬 내부의 반즈 산 중턱에 자리하고 있어 \"천공의 거리\"라는 별명으로 불린다."} />
      <SecTitle title="반즈 산맥과 광물 자원" />
      <Prose text={"핀지아스 섬 내부를 관통하는 반즈 산맥은 에린딜 서방에서도 희귀한 특수 금속의 보고(寶庫)이다. 미스릴과 오리하르콘을 비롯한 고급 금속이 채굴되며, 이것이 제국의 경제적 기반이자 연금술 연구의 핵심 자원이 되고 있다.\n\n산맥의 깊은 곳은 아직 탐사되지 않은 미지의 구역이 남아 있으며, 고대의 금기가 잠들어 있다는 전설도 전해진다."} />
      <SecTitle title="대륙 영토" />
      <Prose text={"핀지아스 섬 외에 제국은 에린딜 대륙에도 영토를 보유하고 있다. 동쪽으로는 \"죽은 자의 늪지\"까지, 북쪽으로는 라셀 강까지가 제국의 세력권으로 여겨진다.\n\n이 대륙 영토에서는 농업과 광업이 이루어지며, 파리스 동맹과의 경계를 이루는 라셀 강 유역은 상시 군사적 긴장이 높은 지역이다."} />
      <SecTitle title="산업과 교역" />
      <Prose text={"미스릴, 오리하르콘 등의 희귀 금속과 이를 원재료로 한 연금술 제품이 주요 수출품이다. 또한 섬 주변 바다에서는 수산물이 풍부하게 잡혀 어업도 중요 산업 중 하나다. 반면 곡물과 식료품은 수입에 의존하는 부분이 있다.\n\n수출품으로는 모직물, 석재, 목재, 귀금속, 무구 등이 있으며, 해상 무역로를 통해 에린딜 각지로 유통된다."} />
    </div>
  );
}

function PoliticsSection() {
  return (
    <div>
      <SecTitle title="황제 제단과 신성 황제제" />
      <Prose text={"신성 번스터 제국은 황제가 신의 대리인이라는 아르케라브 신앙에 기반한 신성 황제제를 채택하고 있다. 현 황제 제단은 즉위 이전에 위계 계승 후보들이 잇따라 몰락한 끝에 황제 자리에 오른 32세의 젊은 황제다.\n\n제단 황제의 즉위와 함께 이전 체제를 지지했던 구세력의 귀족 상인들이 일소됐고, 연금술사들을 중심으로 한 새로운 지배층이 형성됐다. 제단은 연금술에 한정하지 않고 모든 분야에서 뛰어난 인재를 구하고 있으며, 이는 제국의 국력 강화에도 크게 기여하고 있다."} />
      <SecTitle title="아르케라브 신앙" />
      <Prose text={"제국의 국교인 아르케라브 신앙은 황제의 신성 권위와 불가분하게 결합되어 있다. 황제의 명령은 신의 뜻으로 해석되며, 이 신앙적 권위가 제국 지배의 정통성을 뒷받침한다.\n\n번스터 신전은 제국 최대의 신전으로 제국 수도에 위치하며, 신관장 체제가 황제의 의향에 따라 운영된다. 신전 직속 성기사단도 독자적인 전투 능력을 갖추고 있다."} />
      <SecTitle title="군사 — 제국 기사단과 연금 기병" />
      <Prose text={"신성 번스터 제국은 에린딜 서방에서도 손꼽히는 군사 강국이다. 제국 기사단이 주전력이며, 귀족 자제만으로 구성되어 사기, 훈련도, 황제에 대한 충성심 모두 최고 수준을 자랑한다.\n\n연금술을 활용한 강화 무장과 연금 전마(戰馬)를 갖춘 연금 기병 부대가 특히 강력하다. 역사상 이 부대에 정면 대결로 이긴 군대는 없다고 전해진다."} />
      <SecTitle title="군사 — 천공 병단 (두앙 천익족)" />
      <Prose text={"제국의 또 다른 핵심 전력이 \"천공 병단\"이다. 핀지아스 섬의 반즈 산맥에 서식하는 두앙 천익족(天翼族)으로 구성된 항공 부대로, 하늘에서의 정찰과 공중 타격을 담당한다. 에린딜 서방에서 이 규모의 항공 전력을 보유한 국가는 제국 외에 없어, 다른 국가들에게 큰 위협이 된다.\n\n천공 병단장 \"하늘의 눈\" 아로이스는 제단 황제와 오래전부터 개인적인 인연이 있는 인물로, 강한 무력으로 알려진 두앙 천익족의 지도자이다."} />
      <SecTitle title="제국 연금술 협회" />
      <Prose text={"제국이 운영하는 연금술 연구 기관. 황제 제단의 의향에 따라 주로 군사적 활용을 추구하며, 네바프의 대형 연금 공업마 강화, 인공 공업마, 총탄 강화 등 다양한 연금 병기를 연구·개발하고 있다. 협회에 가입하면 국가의 보조금 지원을 받을 수 있지만, 까다로운 시험을 통과해야 하고 정기적인 성과도 요구되는 엄격한 조직이다."} />
    </div>
  );
}

function CitiesSection() {
  const cities = [
    {
      name: '"천공의 거리" 번스터',
      href: "/vanstar-city",
      icon: "🌟",
      tag: "제국 수도",
      desc: "핀지아스 섬 중심의 반즈 산 중턱에 자리 잡은 제국 수도. 여덟 방향을 향하는 별 모양의 성벽이 특징적이며, 황제 제단의 거처이자 제국의 심장부.",
    },
    {
      name: '"고도의 거리" 두르가라',
      href: "/durgara",
      icon: "⚓",
      tag: "제국 종속 도시",
      desc: "핀지아스 섬과 본토 대륙 사이에 떠 있는 고립 섬의 도시. 바이킹의 전통이 남아 있는 항구 도시로, 마레 대환락가와 해적 문화로 알려진 자유로운 분위기.",
    },
  ];
  return (
    <div>
      <Prose text={"신성 번스터 제국은 핀지아스 섬을 중심으로 여러 도시를 보유하고 있다. 그 중에서도 제국 수도 번스터과 해항 도시 두르가라는 특히 중요한 위치를 차지한다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {cities.map((c, i) => (
          <a key={i} href={c.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 18px", borderLeft: `4px solid ${ACCENT}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT }}>{c.icon} {c.name}</span>
                  <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 8px", borderRadius: 4 }}>{c.tag}</span>
                </div>
                <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>{c.desc}</div>
              </div>
              <span style={{ fontSize: "11px", color: ACCENT, flexShrink: 0, marginLeft: 14, background: `${ACCENT}15`, padding: "3px 10px", borderRadius: 6 }}>자세히 →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function EventsSection() {
  const events = [
    {
      title: "신구 탐색",
      content: "제국은 에린딜 각지에 흩어진 \"신구(神具)\"라 불리는 신성 유물들의 행방을 쫓고 있다. 이 탐색은 황제 직속 기관인 \"클란의 광견\"과 \"성도\" 디아스론드의 비밀 결사가 담당하며, 에린딜 전역에 요원이 파견되어 있다. 신구를 통해 신성한 힘을 손에 넣고 에린딜 통일을 이루는 것이 황제 제단의 궁극적 목표라는 소문이 끊이지 않는다.",
    },
    {
      title: "신성 황제의 수수께끼 — 장미의 화재",
      content: "현 황제 제단의 즉위 경위에는 여러 수수께끼가 있다. 즉위 이전에 황위 계승 후보들이 잇따라 몰락했고, 그 과정에서 \"장미의 화재\"라 불리는 불명의 대사건이 제국을 뒤흔들었다. 이 사건을 계기로 구세력의 귀족 상인들이 일소되고 연금술사들이 대거 등용되기 시작했다. 이 일련의 사건들이 자연적인 것인지, 아니면 특정 세력의 공작인지는 아직 밝혀지지 않았다.",
    },
    {
      title: "초대 번스터 황제 바펠",
      content: "번스터 제국 건국황제 바펠은 \"바람의 시대\"의 신성왕 알트리우스의 혈통을 이었다는 전설을 가지고 있다. 성력 719년 핀지아스 섬을 통일하여 제국을 세운 바펠은, 역대 황제들이 정통성을 주장할 때 반드시 언급되는 이상적 군주상으로 추앙받는다. 신성 황제검 \"크라우·소라스\"도 바펠이 알트리우스로부터 전승받았다는 전설이 있다.",
    },
    {
      title: "반즈 산맥의 수수께끼",
      content: "핀지아스 섬 내부의 반즈 산맥 깊은 곳은 아직 탐사되지 않은 미지의 구역이 남아 있다. 미스릴과 오리하르콘 등의 희귀 금속이 채굴되는 것으로 알려져 있지만, 더 깊은 곳에는 고대의 금기가 잠들어 있다는 전설이 전해진다. 제국은 이 구역의 탐사를 극비리에 진행하고 있으며, 탐사대가 여러 차례 파견됐으나 결과는 공개된 바 없다.",
    },
    {
      title: '"성배의 거리" 라크렐',
      content: "제국 내의 도시 라크렐은 \"성배의 거리\"라는 별명으로 알려진 아르케라브 신앙의 성지이다. 신성한 유물들의 관리와 신관 교육이 이루어지는 거점으로, 신관 계층의 훈련 기관도 이곳에 있다. 신성한 황제검 크라우·소라스의 원래 봉납처이기도 했다는 설이 있어 역사 연구자들의 관심이 높다.",
    },
    {
      title: "정보부 제13반 — 클란의 광견",
      content: "황제 직속 비밀 조직 \"클란의 광견\" 중에서도 가장 수수께끼가 많은 부서가 \"정보부 제13반\"이다. 표면상 해산된 것으로 알려져 있지만, 실제로는 나이가 200세를 넘는다고 추정되는 엘다난 여성 재뉴어리의 지휘 아래 활동이 지속되고 있다는 소문이 있다. 에린딜 전역에 구축된 정보망을 통해 각국의 동향을 파악하며, 제13반이 접촉해 왔다는 것은 황제가 직접 개입했다는 의미이다.",
    },
  ];
  return (
    <div>
      <Prose text={"신성 번스터 제국에 얽힌 전설, 비밀, 현재 진행 중인 사건들을 소개한다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
        {events.map((e, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "16px 20px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>{e.title}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.85, color: "#555" }}>{e.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelationsSection() {
  const relations = [
    { name: "에를랑 왕국",    content: "에를랑 왕국과는 동방 진출을 둘러싸고 전통적으로 긴장 관계에 있다. 에를랑 왕국이 에린딜 서방의 최고(最古) 세력인 만큼, 제국의 동방 진출을 저지하는 가장 큰 장벽이 되고 있다. 양국 사이에는 \"죽은 자의 늪지\" 등 완충 지대가 존재하여 직접 충돌을 피해 왔으나, 제국이 다시 전쟁 준비를 갖추고 있다는 소문이 에루란 측의 경계를 높이고 있다." },
    { name: "파리스 동맹",    content: "파리스 동맹은 제국의 동방 침공에 대항하기 위해 결성된 연합체다. 제국에게 있어 파리스 동맹은 동방 진출의 주된 장애물이며, 동맹의 약체화를 항상 노리고 있다. 성력 1009년 그랑펠덴 마족 대침공으로 동맹이 피해를 입은 것을 계기로 재개전 준비에 박차를 가하고 있다는 정보가 있어, 동맹 각국은 방위 강화에 분주하다." },
    { name: "키르디아 공화국", content: "무한의 사막을 통한 우회로 확보나 사막 교역로를 둘러싸고 이해관계가 얽혀 있다. 현재는 표면상 불간섭 원칙을 유지하고 있으나, 제국이 동방 진출 루트를 넓히기 위해 키르디아에 접근하고 있다는 소문도 있다." },
  ];
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {relations.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 6 }}>{r.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{r.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VanstarPage() {
  const [activeId, setActiveId] = useState("overview");
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
      case "overview":  return <OverviewSection />;
      case "history":   return <HistorySection />;
      case "geography": return <GeographySection />;
      case "politics":  return <PoliticsSection />;
      case "cities":    return <CitiesSection />;
      case "events":    return <EventsSection />;
      case "relations": return <RelationsSection />;
      default:          return null;
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
        <a href="/erindil-west" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 에린딜 서방으로</div>
        </a>
        <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#806070", marginBottom: 6 }}>ERINDIL WEST · EMPIRE</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>신성 번스터 제국</div>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>ERINDIL WEST · HOLY VANSTAR EMPIRE</div>
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
