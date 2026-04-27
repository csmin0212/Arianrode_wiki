'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8A3A2A";
const ACCENT_LIGHT = "#F5DDD8";
const SIDEBAR_BG = "#1C0A08";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "세리아 개요",        icon: "🏯" },
  { id: "society",   label: "정치·사회·군사",      icon: "⚔️" },
  { id: "culture",   label: "문화·산업·신앙",      icon: "🎎" },
  { id: "fuwangjin", label: "수도 프완진",         icon: "🏙️" },
  { id: "legends",   label: "전승과 사건",         icon: "📜" },
  { id: "relations", label: "타국과의 관계",       icon: "🌐" },
  { id: "orgs",      label: "조직",               icon: "🗂️" },
  { id: "people",    label: "세리아의 인물들",     icon: "👥" },
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
    { label: "국명",      value: "세리아 대제국" },
    { label: "수도",      value: "프완진 (인구 약 200만)" },
    { label: "통치 형태", value: "제국제 (황제 중심 중앙 집권)" },
    { label: "현 황제",   value: "리파 (\"화왕제\")" },
    { label: "인구",      value: "약 1억 명" },
    { label: "위치",      value: "에린딜 대륙 동해 연안, 동방 세계 중심" },
    { label: "수입품",    value: "향신료, 향료, 목재, 광물 등" },
    { label: "수출품",    value: "무기, 갑옷, 장식품, 견사품, 출판물, 가공식품 등" },
  ];
  const pops = [
    { label: "휴린",   pct: 90, color: "#8A3A2A" },
    { label: "기타",   pct: 10, color: "#A08060" },
  ];
  return (
    <div>
      <Prose text={"세리아 대제국은 동방 세계의 평야에 넓게 펼쳐진 거대 국가이다. 에린딜 대륙에 존재하는 나라 중에서도 장대한 역사를 자랑하며, 그 흥망은 \"불의 시대\" 초기까지 거슬러 올라간다."} />
      <Prose text={"동방 세계에서도 가장 번성한 문화 대국인 세리아 대제국. 초인적인 힘을 가진 황제에 의해 번성해 온 이 나라는, 에린딜 전체를 봐도 선진국이라 여겨지고 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px",
            borderLeft: `3px solid ${ACCENT}`,
            ...([6, 7].includes(i) ? { gridColumn: "1 / -1" } : {}),
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
      <SecTitle title="건국과 역사" />
      <Prose text={"\"땅의 숙청\"에 의해 황폐해진 세계 속에서, 동방의 휴린들이 풍요로운 평야 부분을 중심으로 재흥을 목표로 했다. 숙청의 영향으로 고향을 잃은 네바프나 두앙 등 다른 종족도 유입하여, 다수의 소취락이 농경을 중심으로 형성되었다."} />
      <Prose text={"그리고 성력 33년, 초대 황제가 갑자기 현현하여, 주변의 취락들을 그 지혜와 무력 아래 통합하며, 불과 15년 남짓으로 현재 영토 3분의 2에 달하는 영역을 지배하게 되었다. 그 이후 황위를 계승하는 황제로 왕조가 바뀌기도 했으나, 각 왕조는 일관하여 세리아 대제국의 이름을 계속 이어왔다."} />
      <SecTitle title="기후와 풍토" />
      <Prose text={"세리아는 동방의 평야에 넓게 펼쳐진다. 그 영토는 에린딜 서방 제국을 합쳐도 더 넓다. 동쪽은 바다에 접하고, 서쪽과 남쪽은 사람이 미치지 않는 높은 산지와 밀림에 접한다. 동부와 중앙부는 온난 습윤 기후이다."} />
      <Prose text={"동쪽 해안에 접하는 천지대산맥에서는 다종다양한 광물 자원이 산출되며, 세리아 영토를 가로지르는 샨 강과 다쟝 대강의 풍요로운 흐름이 각지에 혜택을 가져다준다. 남쪽에 갈수록 강우량이 많고 기온이 높아 아열대 기후가 된다. 서쪽과 북쪽은 비교적 건조한 온대 영역이다."} />
    </div>
  );
}

function SocietySection() {
  return (
    <div>
      <SecTitle title="정치 — 황제와 육부" />
      <Prose text={"황제 중심의 중앙 집권적 세리아에서는 육부(六部)가 국가 정책을 관장하지만, 모든 결정권은 황제가 가진다. 황제를 보좌하는 내각의 인물들이 대소 행정을 담당하는 것이 일반적이다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        {[
          { name: "이부 (吏部)", role: "관료 임용·인사 관리" },
          { name: "호부 (戸部)", role: "재무·지방 과세 관장" },
          { name: "예부 (禮部)", role: "국내외 도덕·법률 관장" },
          { name: "병부 (兵部)", role: "군사 참모 조직" },
          { name: "형부 (刑部)", role: "법·경찰 역할 겸비" },
          { name: "공부 (工部)", role: "외교 및 대형 국가 사업" },
        ].map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "10px 12px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: ACCENT, marginBottom: 2 }}>{d.name}</div>
            <div style={{ fontSize: "12px", color: "#555" }}>{d.role}</div>
          </div>
        ))}
      </div>
      <SecTitle title="지방 통치" />
      <Prose text={"세리아의 광대한 영토는 동천, 남천, 서천, 북천의 4개 행정 구역으로 분류되어 있다. 각 지방은 지방 총독이 통치하며, 총독은 각 지방의 성(省)들에 대한 행정을 감독하고 군사 감독도 겸한다.\n\n지방에 설치된 관료는 중앙에서 파견되는 감찰관이 감시하지만, 실제로는 지방 인재가 등용되는 경우가 많다. 지방에서 관리가 되기 위해서는 관료 시험을 치러야 한다."} />
      <SecTitle title="사회와 교육" />
      <Prose text={"세리아는 엄밀한 관료 제도와 그에 맞는 교육 제도가 발달한다. 각 지방의 私塾이나 官立 학교를 거쳐, 관료 시험을 치르는 것이 엘리트의 길이다. 사립 학교에는 지방 학교와 高等 학교로 나뉜다. 어느 쪽이든 엄격하게 불리는 관료 시험의 학습에 집중하며, 거기에 많은 금전과 시간을 쏟아가지 않으면 좁은 문을 통과하기 어렵다."} />
      <Prose text={"그 외에도, 황제와 관련이 없는 것을 손에 넣기 위해, 치유술, 약학술, 외과술을 연구하는 의학이 발달하고 있다. 더불어 무술이 발달하여 다양한 병파가 있으며, 사중(寺中), 경호를 계승받은 무술 수련소가 시중 곳곳에 있다."} />
      <SecTitle title="군사" />
      <Prose text={"세리아에는 크게 5개의 군단이 있다. 중앙군과 북천군, 남천군, 서천군, 동천군이다. 중앙군은 황제 직속의 군단이다. 4개 천군은 각 총독이 통괄한다.\n\n세리아의 군대는 대포나 포차에 의해 물량을 활용한 대규모 일제 공격을 특기로 한다. 또한 무술이 발달하여 병사들은 손과 발에 의한 근접 격투도 수행하며, 빠른 공격을 특기로 한다."} />
    </div>
  );
}

function CultureSection() {
  const foods = [
    { name: "세리아 사대 요리", desc: "북방 요리(粗食·담백), 서방 요리(향신료·기름진), 동방 요리(해산물 중심), 남방 요리(아열대 식재·절임)를 세리아 사대 요리라 부른다." },
    { name: "차 (茶)", desc: "동방 세계를 대표하는 음료. 차는 동방에서 최초로 재배되어, 타루타루·한국에도 보급되었을 가능성이 있다." },
    { name: "珍珠奶茶 (진주 밀크티)", desc: "세리아 고유의 달콤한 음료. 세리아 남방에서 채취되는 芋의 텐푼을 가루로 만들어 우유와 발효차에 넣은 것이다. 최근 크게 유행하고 있으며 북방의 타루타루·한국에도 보급되고 있다." },
    { name: "京菜 (경채)", desc: "수도 프완진의 고급 요리. 강이나 호수에서 채취되는 민물 요리가 中心에, 동서에서 들어온 재료를 더한 화려한 요리가 많다. 맛은 섬세하고 달콤한 것에 중점을 두는 경향이 있다." },
  ];
  return (
    <div>
      <SecTitle title="산업" />
      <Prose text={"세리아의 주요 산물은 면, 면포, 생사, 남 등의 섬유 제품이 거론된다. 양잠과 면방 재배가 민간에서 이루어지고, 소규모 집업에서 대규모 도시로까지 발전한 경우도 있다. 국내외에서 고급품으로 인정되는 비단이나 면의 최고급 제조 거점은 세리아가 중심이다.\n\n도자기나 목제품의 산지가 전국에 점재한다. 관영 공방과 민간 공방이 경쟁적으로 발달하여 정밀 기계, 제련, 금은 세공에까지 민간이 발달하여 대규모 제품이 다수 만들어진다. 출판업도 서화를 중시하는 문화와 관료 시험의 수요로 발달해 있다."} />
      <SecTitle title="신앙" />
      <Prose text={"세리아는 7대 신을 신앙하지만 독자적으로 발전시킨 신앙이 다수 있다. 신전의 역할은 서방과 다르지 않으며, 신전은 황제가 직접 운영한다. 각지에 다수의 転送 진을 설치하는 등 통신의 강화에 힘쓰고 있다. 사실상 서방의 신전과 같은 형태로 거의 비슷해져 있다.\n\n한편 황제 신앙도 강하게, 황제는 신의 화신(化身)으로 여겨지며, 황제의 치세가 곧 신의 의지라는 관념이 뿌리 깊게 남아 있다."} />
      <SecTitle title="세리아의 식문화" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        {foods.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{f.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FuwangjinSection() {
  const places = [
    {
      name: "금자궁 (金紫宮)",
      icon: "🏛️",
      content: "황제의 거처이자 집무전(執務殿). 황제의 세설(世說)과 내각의 내관(內官)만이 출입할 수 있다. 황궁 주문대회(무술 대회나 음악 경연)나 내각이 거행하는 의식 때는 정전(正殿) 앞 광장에 회장이 설치되어 일반 입장도 허가된다. 대대로 황제마다 그 모습이 달라져, 현재 황제 리파가 집무 권한을 대부분 직접 파악하고 있다.",
    },
    {
      name: "천봉전 (天宝殿)",
      icon: "⛩️",
      content: "서방 신전 세리아 교구의 거점. 세리아 대제국 내에 존재하는 서방 신전의 총본부로서 기능한다. 10개 이상의 전송 진이 있으며, 세리아 남서부의 주요 도시들과 연결된다. 천봉전은 탈탈 지방에서도, 동남 방면의 지방들에서도 모험자들이 모이는 장소이며, 모험자는 천봉전에 방진을 써서 전지로 비행이 가능하다.",
    },
    {
      name: "무파관 (武破館)",
      icon: "⚔️",
      content: "세리아 앙천군의 본거지. 대규모 주둔지로, 병사들의 군부, 훈련장 등이 갖추어져 있다. 도시 경비를 위한 병사가 주둔하며, 근년에는 천마 출현 기록에서 훈련 기회가 줄고 있는 추세이다. 평시에는 수련소 유지가 주 업무가 되어 훈련이 부족한 병사도 있는 것 같다.",
    },
    {
      name: "프완진 고등학교",
      icon: "📚",
      content: "선대 황제 사이펜이 세운 국립 학교 중 하나. 수석 교사만이 가르치며, 엄선된 특별 의무 교육을 받을 수 있다. 세리아에서 최고 수준의 교육을 받을 수 있으며, 관료 시험 합격률이 높다. 입학 시험의 난이도는 높다고 여겨지지만, 이 학교에 입학하기를 원하는 자는 끊이지 않는다.",
    },
  ];

  const districts = [
    { name: "천의 성벽 (天城壁)", icon: "🏯", note: "도시 중심부. 황제의 거처인 금자궁과, 황제를 보좌하는 내관이 머무는 궁정이 있다. 중앙부에 금자궁, 그 주변에 내궁용 행정 시설이 들어선다. 대황제 등의 관저, 경호역, 내각 소속의 각료 관청, 극히 일부의 고위 관료들이 드나들 수 있으며, 주변에는 밤낮으로 무거운 경계 태세가 깔려 있다." },
    { name: "지의 성벽 (地城壁)", icon: "🏙️", note: "주거 지역·상가 지역·오락·시민이 모이는 공원이나 광장, 서방 신전 세리아 교구의 거점인 천봉전 등 주요 시설이 집결하는 구역. 도시 얼굴이라고도 할 수 있는 구역으로, 서문 앞 광장이나 상점가에 방문하는 여행자들이 처음 찾는 장소이기도 하다." },
    { name: "인의 성벽 (人城壁)", icon: "🌾", note: "주택가, 상가 지역, 교외. 그 외곽에는 공업 지역이 되어 있다. 또한 동쪽에는 세리아 앙천군의 본거지인 무파관이 있다. 농업용 토지에서는 곡물, 야채, 약초 등 다양한 농작물 재배 외에 소나 말·양 등의 가축도 이루어지고, 교도에 식량을 공급한다." },
  ];

  return (
    <div>
      <Prose text={"\"통치하는 제도\" 프완진은 세리아 대제국의 중앙에 있는 거대 도시이다. 에린딜 대륙 현재의 나라 중에서도 최대의 규모를 가지는 세리아 대제국은, 그 수도 역시 비교되는 나라가 없을 정도로 거대하다. 그 規模는 세계 최초급의 대도시로, 동방 세계의 중심이 되어 있다."} />
      <Prose text={"세리아 대제국의 건국으로부터 수백 년 후, \"불의 시대\" 초기에 초대 황제의 지시에 의해 건설된 도시가 프완진이다. \"불의 시대\"에 생겨난 도시 중 가장 부품이 세련되어 있으며, 그 거리 행사는 따라갈 수 없을 정도이다. 오랜 역사를 이야기하는 도시이며, 新旧의 건물이 뒤섞이지만 그 건축 방식에는 차이가 있다."} />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 16px", marginTop: 16, marginBottom: 16, display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 16px", fontSize: "13px" }}>
        {[
          ["인구", "약 200만 명 (휴린 92%, 기타 8%)"],
          ["기후", "온난 습윤"],
          ["언어", "세리아어, 서방 공용어"],
          ["수도용수", "공공 수도 시설 이용"],
        ].map(([k, v], i) => (
          <>
            <span key={`k${i}`} style={{ color: ACCENT, fontWeight: 600 }}>{k}</span>
            <span key={`v${i}`} style={{ color: "#3a2a28" }}>{v}</span>
          </>
        ))}
      </div>
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

function LegendsSection() {
  return (
    <div>
      <SecTitle title="황제 전설" />
      <Prose text={"세리아의 초대 황제는 보통 인간이 아니다. 그 용모는 당대 땅에서 \"출사\"하여 순식간에 세리아를 통일했다는 전설이 전해진다. 현현 당시의 인간에게 맹렬한 초고도의 기술과 지식을 이미 기억하고 있었다. 그 후 황제 자신은 손수 전장에 나서는 격투 전사이기도 했다."} />
      <SecTitle title="전생 (転生)" />
      <Prose text={"황제는 전생(転生)으로 하나의 의식을 유지하며, 실제로 1,000년 이상에 걸쳐 세리아에 군림해 왔다. 이것은 일부의 비밀로 되어 있으며, 황제는 현재의 세계의 사망 소식과 황궁 교외에 있는 「황상 의탁자의 언덕 (帝溜이고모리)」에서 죽음을 기다린다고 한다. 이 언덕에서 누가 일어나는가를 아는 자는 없다. 단 최근, \"황상의 전생체\"라는 이름의 특이한 행자가 드러나는 사례가 확인되고 있다."} />
      <SecTitle title="천마 습래 (天魔襲来)" />
      <Prose text={"세리아와 타루타루·한국 양국 간에 대대로 전해지는 전설. 옥토천마(玉兎天魔)라고 불리는 존재가 있다. 옥토천마는 동방 세계의 패비(覇匪)이다. 천지대산맥의 아오이 산을 중심으로 수많은 패비가 서식하고 있다고 한다."} />
      <Prose text={"옥토천마의 군주가 산을 내려 배하를 거느리고 천마의 중심부를 향해 이동을 개시하였다. 최근 들어, 마침내 옥토천마의 모습이 아카오 부근에서 확인됐다는 것이다. 옥토천마는 아카오에 내려 배하와 함께 아카오를 정복하고 거리에 피해를 주었다. 이 영향으로 서방 천군이 출전되어 있으며, 아카오의 동요를 막는 데 활약한 것이 아카오 뇨사 행회라고 한다."} />
      <div style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT}40`, borderRadius: 10, padding: "14px 18px", marginTop: 12 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: ACCENT, marginBottom: 6 }}>⚠️ 현재 상황</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#5a2a18" }}>
          아카오는 에린딜 서방을 연결하는 중요한 교역 거점이다. 만약 옥토천마의 손에 떨어지면 그 부정적 영향은 크다. 아카오에서는 옥토천마 대책 연락 위원회가 구성되고 있으며, 서방 신전은 남천군과 연계하여 대응책을 마련하고 있다.
        </div>
      </div>
    </div>
  );
}

function RelationsSection() {
  const relations = [
    {
      name: "타루타루·한국",
      status: "적대 (전쟁 중)",
      color: "#8A3A14",
      content: "타루타루·한국과는 지속적인 무력 충돌 상태에 있다. 타루타루는 방목지를 구해 세리아의 평야부에 침략을 가하고 있으며, 세리아는 장성을 쌓고 기마 군대의 침입에 대항하고 있다. 북천군이 최전선에서 방어를 담당한다.",
    },
    {
      name: "다이와 군도국",
      status: "중립 (소교류)",
      color: "#5A5A2A",
      content: "다이와 군도국과는 직접적인 대규모 교류가 없다. 해금 정책으로 상호 간의 공식 왕래는 제한적이나, 비공식 루트로 상인들이 오가고 있다. 카이라기 해적단의 활동이 세리아 서부 해역에서 문제가 되고 있다.",
    },
    {
      name: "에린딜 서방",
      status: "소교류 (해금 정책)",
      color: "#2A5A8A",
      content: "서방과의 교류는 해금 정책으로 인해 제한적이다. 세리아 근해에서는 밀무역 상인을 금지하며, 강의 통행에도 엄한 세관과 세금이 부과된다. 다만 서방 신전은 세리아 내에 교구를 두고 활동 중이며, 황제를 구하는 사절이 에를랑 왕국을 찾아온 일도 있다.",
    },
    {
      name: "주변 소국들",
      status: "흡수·종속 (진행 중)",
      color: "#5A2A5A",
      content: "세리아에 인접한 소국들에는 세리아 문화를 흡수하여 사실상 속국화된 나라도 많다. 세리아는 이들 소국에 관리를 파견하거나 군사 지원을 제공하는 형태로 영향력을 행사하고 있다.",
    },
  ];
  return (
    <div>
      <Prose text={"세리아 대제국은 광대한 국토와 많은 인구로 동방에서 주도적 위치를 차지하고 있다. 많은 소국들이 세리아의 문화를 흡수하고 있다."} />
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
    { name: "내각 (内閣)", type: "정부 조직", base: "금자궁", leader: "역대 황제", content: "황제를 보좌하는 최고 행정 기관. 황제를 둘러싼 다양한 결정을 보좌하며 대소의 정무를 처리한다. 당대 황제 리파에 의해 실질적인 권력 행사가 거의 황제 한 사람에게 집중되어 있어, 내각의 실권에 대한 평가가 엇갈린다." },
    { name: "세리아 앙천군 (仰天軍)", type: "군사 조직", base: "금자궁", leader: "역대 황제", content: "제국 직속 황제 직속의 군단. 정예임을 공식적으로 표방하지만, 실제 전력은 불명확하다. 무한한 권세의 자제들에게도 자리를 내주는 대가로 뇌물을 받는 경우가 있어, 공식적인 전력을 실제로 발휘할 수 있는가에 대한 의구심도 있다." },
    { name: "북천군 (北天軍)", type: "군사 조직", base: "베이톤멘", leader: "류·란마", content: "북쪽 타루타루·한국과의 전쟁에서 실전 경험을 쌓아 온 최강의 군사 집단. 타루타루의 기마 군세를 막는 데 중심적 역할을 담당하며, 총 병력은 2만 5천을 넘는다. 전황이 치열해지고 있는 최전선 부대이다." },
    { name: "남천군 (南天軍)", type: "군사 조직", base: "우샨", leader: "완·리리", content: "해전에 특화된 세리아 서부 군사력. 군선을 중심으로 공중·수중 전쟁을 상정한 훈련을 한다. 독자적인 발전을 이루고 있으나, 낙오자들이 조직 내 자리를 얻기 위해 뇌물을 사용하는 사례가 많아 군기 문란이 심하다는 평가도 있다." },
    { name: "고한 (鵠敵)", type: "첩보 기관", base: "불명", leader: "쟝·쟝", content: "황제 직속의 비밀 첩보 기관. 국내외의 비밀 정보 수집과 흑막 추적을 담당한다. 수장 쟝·쟝은 사람들에게 음식을 공급하는 방식 등으로 정보를 획득하며 밀고 시스템도 운용한다. 궁정 내에 배신자를 색출하는 「배치(裝置)」라는 조직도 존재한다." },
    { name: "우샨 잠행회 (潜行会)", type: "상인 조합", base: "우샨", leader: "라오·만", content: "남천 지방을 중심으로 활동하는, 상류와 하류의 변두리 거래를 관리하는 행회(조합). 서방에서 온 상인들의 업무를 대행하는 경우도 많다. 또한 강을 통과하는 항행 허가증이나 관소에서의 통행 허가를 취득하는 창구 역할도 한다." },
    { name: "아카오 뇨사 행회 (闘師行会)", type: "장인 조합", base: "아카오", leader: "바오·웨이", content: "서방의 무역 도시 아카오에 본점을 둔 조합. 고객에는 시민 외에도 다이묘도 있다. 요리 연구에도 적극적이며, 최근 아카오를 습격한 옥토천마의 공격을 막아낸 것으로도 알려진다." },
    { name: "호랑이 각 (虎牙覚)", type: "범죄 조직", base: "불명", leader: "폰·란푸", content: "동방을 중심으로 활동하는 범죄 조직. 마을을 습격하여 약탈하는 행위를 하면서도 불법 행위에 일관성이 없다. 명목 없이는 겁주지 않는 편이지만 악법에서 역행하는 자에게는 금전적 보상을 약속하는 경우도 많아 그 악명이 서방에도 알려져 있다." },
    { name: "서방 신전 세리아 교구", type: "종교 조직", base: "천봉전", leader: "리치·마테우스", content: "세리아 대제국에서의 서방 신전 총본부. 선대 황제가 이 지역에 파견한 이래 계속 활동하고 있다. 세리아 대제국의 7대 신 신앙을 연구하고, 서방 신전과의 가교 역할을 담당한다." },
    { name: "프완진 민영 공방 조합", type: "공인 조합", base: "공업구", leader: "호완·챠오진", content: "프완진에서 활동하는 민영 공방들의 상호 부조 조합. 기술 공유나 자재 공동 구입 등 효율적인 운용을 목적으로 한다. 조합원 중에는 행정 기관 내부에 정통한 자도 있다." },
  ];

  return (
    <div>
      <Prose text={"세리아 대제국과 관련된 주요 조직들을 소개한다. PC의 의뢰인, 협력자, 적대자로 등장할 수 있다."} />
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
  const characters = [
    {
      name: "\"화왕제\" 리파",
      role: "세리아 대황제",
      race: "불명",
      gender: "여",
      age: "불명",
      hair: "은발",
      eyes: "금색",
      quote: "\"……좋다. 그리 하라. 마음대로 하라\"",
      note: "외모는 어린 소녀이지만, 절대적인 권력을 가지는 대황제. 여제를 모시는 대부분의 업무를 내부에서 담당하며, 황제 직속 부하들의 끼어들기에 냉담하게 결정을 행한다. 방종하게 즐기며 점점 방기 관리도 나오고 있지만, 그래도 황제의 명분은 변하지 않으며, 그 마음속은 좀처럼 알 수 없다.",
    },
    {
      name: "류·란마",
      role: "북천왕 (北天王)",
      race: "휴린",
      gender: "남",
      age: "38세",
      hair: "흑발",
      eyes: "청색",
      quote: "\"세리아에 원한 가진 자들이여, 내 손으로 상대해 주겠다!\"",
      note: "지방에서 북천군에 실력으로 올라온 장수. 냉정하고 현실적인 군사가. 의형제를 맺은 모험자로서도 알려져 있다. 전투 마술사이기도 하며, 직접 전장에 나서 타루타루·한국의 침략을 막아왔다. 조상의 땅을 지킨다는 신조로 황제를 신봉하는 충성심 깊은 인물.",
    },
    {
      name: "바오·웨이",
      role: "초일류 요리사",
      race: "휴린",
      gender: "남",
      age: "67세",
      hair: "백발",
      eyes: "흑색",
      quote: "\"비전 쌍호포(雙虎包)! 하이야!\"",
      note: "서쪽에서 활동하는 마카오 유파의 수장. 선대 황제 사이펜의 유언을 이어받았다. 세리아에 열 손가락 안에 드는 것으로 알려진 초일류 요리사. 어린 시절부터 세계를 여행한 경험이 있으며, 지방 요리에도 깊은 식견을 갖고 있다. 늙어도 식욕을 잃지 않아 항상 새로운 음식을 찾으며 모험자와 함께 탐색을 행하는 경우도 있다.",
    },
    {
      name: "완·리리",
      role: "남천왕 (南天王)",
      race: "네바프",
      gender: "여",
      age: "34세",
      hair: "다갈색",
      eyes: "다갈색",
      quote: "\"네 몸을 지키는 것은 너 자신이다. 약함은 죄다\"",
      note: "군인 명문 완씨 출신의 남천군 총독. 서방 생활에 능하다. 武를 신봉하며 강함을 추구하는 여성. 판단을 바꾸지 않는 완고함이 있으나, 군사적 능력은 확실하다. 야망에 불타 있는 것처럼 보이며 남천왕이라는 불안한 주변의 시선을 받기도 한다.",
    },
    {
      name: "리치·마테우스",
      role: "서방 신전 세리아 교구 대표",
      race: "네바프",
      gender: "남",
      age: "110세",
      hair: "백발",
      eyes: "다갈색",
      quote: "\"오오, 5대 황제 무렵의 자료가 아닌가\"",
      note: "세리아 대제국에서의 서방 신전 대표. 서방 출신으로 이 지역에 파견되어 활동하고 있으며, 선대 황제가 파견한 이래 계속 활동하고 있다. 세리아 대제국의 7대 신 신앙을 연구하며, 서방 신전과의 가교 역할을 해온 인물이기도 하다. 학술파의 노인으로 방에서 문서를 읽고 있는 모습이 인상적이다.",
    },
  ];

  return (
    <div>
      <Prose text={"세리아 대제국의 주요 인물들을 소개한다. PC의 의뢰인, 협력자, 혹은 적대자로 시나리오에 등장시킬 수 있다."} />
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
            </div>
            {c.quote && <div style={{ fontSize: "12px", fontStyle: "italic", color: ACCENT, marginBottom: 8, borderLeft: `2px solid ${ACCENT}50`, paddingLeft: 8 }}>{c.quote}</div>}
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SeriaPage() {
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
      case "overview":   return <OverviewSection />;
      case "society":    return <SocietySection />;
      case "culture":    return <CultureSection />;
      case "fuwangjin":  return <FuwangjinSection />;
      case "legends":    return <LegendsSection />;
      case "relations":  return <RelationsSection />;
      case "orgs":       return <OrgsSection />;
      case "people":     return <PeopleSection />;
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
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#3A1808", marginBottom: 6 }}>동방 세계 · 동방 최대 국가</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>세리아 대제국<br />セーリア大帝国</div>
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
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#C07060", marginBottom: 10 }}>
              SERIA EMPIRE — EASTERN GREAT NATION
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#1C0A08", marginBottom: 8, letterSpacing: "0.04em" }}>
              세리아 대제국
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#3a1a0a", marginBottom: 4 }}>
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
