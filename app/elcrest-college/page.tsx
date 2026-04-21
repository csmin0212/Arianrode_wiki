'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#7A5A2A";
const ACCENT_LIGHT = "#F5EAD0";
const SIDEBAR_BG = "#1A1408";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",    label: "칼리지 개요",        icon: "🏰" },
  { id: "campus",      label: "캠퍼스 구성",         icon: "🗺️" },
  { id: "facilities",  label: "주요 시설",           icon: "🏛️" },
  { id: "dorms",       label: "6개 기숙사",          icon: "🏠" },
  { id: "life",        label: "학교 생활",           icon: "📅" },
  { id: "people",      label: "칼리지의 인물들",      icon: "👥" },
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

function OverviewSection() {
  return (
    <div>
      <Prose text={"엘크레스트 칼리지는 에린딜 서방 중남부의 \"현자의 거리\" 엘크레스트에 있는 전기제 대학이다. 칼리지는 거리 대부분의 북쪽 절반을 차지하는 넓은 부지를 가진다."} />
      <SecTitle title="칼리지의 역사" />
      <Prose text={"호수의 유적이 발견된 이래 많지 않아, 유적 탐사 길드 \"빛의 검\"의 류·마쿨(*)이 모험자나 연구자를 불러들여 유적 탐사를 위한 인재를 양성하는 큰 조직을 만들었다. 이윽고 여기에 수련자와 제자들이 모이면서 학교의 형태로 변해갔다. 그 무렵의 일로 보아, 당시는 이미 로아셀 호수 근처에 불과했던 엘크레스트라는 도시는 칼리지의 성장과 함께 태어나고 확대해 갔다고 이를 수 있다.\n\n엘크레스트 칼리지는 창립 당초 로아셀 호수 탐사의 인재 양성을 목적으로 하고 있었다. 하지만 현재에는 모험자 양성 외에도 일반 학문, 정령마법, 연금술, 전투 기술 등 다양한 지식과 실기를 배우는 7년제 교육 기관이 되어 있다. 역사는 100년에 채 미치지 않는 학교지만 그 실적은 빛나고 있다. 특히 정령마법 연구에 대해서는 에린딜에서도 두 번째를 다투는 것으로 알려져 있으며, 졸업생들이 다양한 나라에서 궁정 마술사로서 활약하고 있다."} />
      <SecTitle title="칼리지의 운영" />
      <Prose text={"엘크레스트 칼리지의 운영은 10인의 이사에 의한 이사회에 의해 이루어지며, 학장의 임명이나 정지 권한도 이사회가 가진다. 이사회의 멤버로는 엘크레스트 평의회 대표인 알프레드·요크, 엘크레스트 신사의 신관장 야스퍼·에무로드 등 엘크레스트의 유력자들이 이름을 올리고 있다.\n\n현재의 학장은 엘비라·알디리케. 정령마법학의 교단에 서 있는 현역 교수이며, 일류 마법사이기도 하다."} />
      <SecTitle title="칼리지의 학생" />
      <Prose text={"칼리지에는 12세 이상의 남녀라면 누구나 입학 가능하다. 종족이나 국적, 신분의 제한도 없다. 수업료는 학생 보조, 혹은 전액 부담하는 장학 제도도 충실하다. 칼리지는 배움의 길을 지향하는 자를 넓게 받아들이는 곳이다.\n\n다만 입학하기 위해서는 몇 가지 시험을 통과할 필요가 있다. 시험을 일정 이상의 성적으로 합격하지 못하면 그 문을 들어설 수 없다. 에린딜 유수의 학교인 만큼, 시험은 매우 어렵다. 매년 정원의 몇 배나 되는 응모가 있지만, 및 격점에 달하여 실제로 입학이 허가된 자는 약 200명 정도이다.\n\n학생 수는 약 1,500명. 연 약 200명이 입학하며, 입학 시험은 1개월 이상에 걸친다. 입학 전에 학부를 선택하고, 시험 내용은 일률적으로 같지만, 필기시험에 더해 실제 던전을 상정한 실기 시험도 있다."} />
      <SecTitle title="졸업 후의 진로" />
      <Prose text={"모든 과정을 수료하여 졸업한 학생의 진로는 다양하다. 신학부나 법학부의 학생이라면 각지의 신사나 궁정을 목표로 하거나, 혹은 성도 디아스론드에 봉사하기도 한다. 마법학부나 연금술학부의 학생은, 어딘가의 연구 기관이나 국가에 속하는 궁정 마술사로서 임용된다. 사도학부의 학생 대부분은 모험자가 된다."} />
    </div>
  );
}

function CampusSection() {
  const zones = [
    {
      name: "서구 (西区)",
      icon: "🏪",
      items: ["학생 협동조합 (생활 협동 길드)", "클럽하우스", "의원", "승마장", "운동장"],
      note: "정문을 지나 눈앞에 보이는 대형 도서관을 에워싸듯, 2개의 길이 방사형으로 뻗어 있다. 이것이 「성자의 길 (①)」과 「賢者の道 (②)」라 불리는 길이다. 이 2개의 큰 길을 경계로 칼리지의 부지는 서구, 중앙구, 동구 3개로 크게 나눠진다.",
    },
    {
      name: "중앙구 (中央区)",
      icon: "📚",
      items: ["대형 도서관 ⑧", "칼리지 본관 1호동 ⑨", "2~10호동 (강의동)", "대형 실험실 ⑪", "실습동 ⑫", "골렘 보관고 ⑬"],
      note: "엘크레스트 칼리지의 중앙부이며, 안면이 되는 구역이다. 학생들에게는 하루의 대부분을 수업으로 보내는 구역이 된다. 안쪽에는 다양한 용도로 사용되는 대형 실험실, 실습동, 골렘 보관고 등이 있어 독특한 건물이 눈에 띈다.",
    },
    {
      name: "동구 (東区)",
      icon: "🌿",
      items: ["교원실", "약초원 ⑭", "야금 공방 ⑮", "실습동", "산책로가 있는 숲 ⑯"],
      note: "교원실 뒤쪽에 있는 시설들이 성자의 길 이동으로 펼쳐지는 동구이다. 정원 ⑭나 야금 공방 ⑮ 등 실제 실습에 사용되는 시설이 많이 모여 있다. 약초학을 배우는 학생이나 연금술을 실습하는 학생이 오가고 있다. 또 휴식의 장으로 산책로가 있는 숲 ⑯도 학생에게 인기가 높다.",
    },
  ];
  return (
    <div>
      <Prose text={"엘크레스트 칼리지는 거리 북쪽 절반 정도에 넓게 원형의 부지를 가진다. 끝에서 끝까지 걷고 보면 30분 이상 걸린다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
        {zones.map((z, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: "18px" }}>{z.icon}</span>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT }}>{z.name}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {z.items.map((item, j) => (
                <span key={j} style={{ fontSize: "12px", background: `${ACCENT}12`, color: ACCENT, padding: "3px 10px", borderRadius: 12, border: `1px solid ${ACCENT}25` }}>{item}</span>
              ))}
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{z.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitiesSection() {
  const facilities = [
    {
      name: "대형 도서관",
      icon: "📚",
      content: "에린딜에서도 두 번째를 다투는 장서량을 자랑하는 대형 도서관. 칼리지 부지 안에 위치한다.\n\n신학과 법학, 마법과 천문학 관련 서적을 수장하는 별 마구, 연금술 및 미술·건축 관련 서적을 수장하는 수은 마구, 역사·지리·생물학 관련 서적을 수장하는 시간 마구, 시나 물어 수장 마구의 관장에 더해 접수 및 열람실을 겸한 종합 접수 창구로 구성된다.\n\n에를랑 왕립 도서관이나 번스터 제국 도서관에 비하면 역사는 얕지만, 마법과 마물에 관련하여 귀중한 서적을 많이 소장하고 있다. 학교 관계자라면 자유롭게 이용 가능. 외부인이라도 학교 관계자의 소개가 있으면 열람할 수 있다. 관장 대리 로지—ヴァーナ 일족의 소녀가 운영하고 있다.",
    },
    {
      name: "대형 실험장",
      icon: "⚗️",
      content: "칼리지 북쪽에 위치한 매우 큰 건물. 일부러 라프 대동굴의 사람들을 불러들여 만든 건물로, 내부에 광대한 그라운드가 있다.\n\n새로운 마법 사용이나 정령마법 등 大掛かりな 마법 실험, 인조생물의 성능 테스트 등에 사용된다. 새로운 마도 도구를 시험할 때는 바깥에서 모험자를 불러들여 실제로 실습 전투를 수행하는 경우도 있다.\n\n실험장 바닥 아래에는 모험자 지망생 학생이 연수를 위한 시험 던전이 있다. 이 던전은 입학 시험에도 사용되며, 재학생이 수업의 일환으로 탐사하는 경우도 있다. 교직원 테오도라·다이아나가 관리를 담당한다.",
    },
    {
      name: "평의회장",
      icon: "⚖️",
      content: "현자의 광장에 인접하여 세워진 엘크레스트의 행정을 운영하는 정치 기관. 도시의 발전과 함께 칼리지로부터 독립한 자유 공정한 조직임을 표방하고 있다.\n\n평의원은 선거에 의해 결정된다. 평의원으로 선출되는 것은 이 도시에서 매우 명예로운 일로, 칼리지 교직원들이 대부분 평의원 출신이거나 현역 교수라는 사정이 있다. 현재 이 거리를 중립 지점으로 이용하기 시작한 상인들도 세력을 키우고 있다.",
    },
    {
      name: "로아셀 유적",
      icon: "🏛️",
      content: "엘크레스트 최대의 볼거리. 로아셀 호수 밑에서 발견된 고대 유적. 발굴된 고대 엘다가 지은 것이 아닌가 추측되는 유적으로, 오랜 조사가 진행되어 왔다.\n\n현재도 연구가 진행 중이며, 전문 팀이 유적 탐사와 발굴품의 감정 등을 수행하고 있다. 현재 연구에서는 이 유적에 봉인된 것이 있고, 봉인을 해제하는 힘이 있다는 결론이 나오고 있다. 하지만 유적 자체에는 봉인되어 있는 형태는 발견되지 않았다. 유적이 사용되지 않은 것인지, 혹은 이미 봉인이 어떤 방법으로 해제되어 있는 것인지, 현재 그 조사 결과가 기다려지고 있다.",
    },
  ];
  return (
    <div>
      <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        엘크레스트 칼리지 및 도시의 주요 시설들. PC의 행동 거점이나 시나리오 무대로 활용할 수 있다.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {facilities.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "20px 24px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: "20px" }}>{f.icon}</span>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: ACCENT }}>{f.name}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.9, color: "#555" }}>
              {f.content.split("\n\n").map((p, j) => <p key={j} style={{ marginBottom: 10 }}>{p}</p>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DormsSection() {
  const dorms = [
    {
      name: "루키아노스 기숙사",
      symbol: "✝",
      origin: "성도 디아스론드의 전신 \"대성인\" 루키아노스",
      content: "가장 오래된 기숙사라고 전해지며, 입주한 자들은 그것을 긍지로 여기는 경향이 있다.",
    },
    {
      name: "아우덴리트 기숙사",
      symbol: "🦅",
      origin: "최초의 탐사자 \"성사도\" 아우덴리트",
      content: "마쿨 제에 힘을 쏟는 전통이 있으며, 매년 상위를 차지한다.",
    },
    {
      name: "셰필드 기숙사",
      symbol: "⚔",
      origin: "성력 500년경 중원을 지배했던 패왕 \"대현인\" 셰필드",
      content: "역대 명성의 영향인지 다른 기숙사에 대한 대항 의식이 강한 경향이 있다.",
    },
    {
      name: "부르기니옹 기숙사",
      symbol: "🗺",
      origin: "에린딜의 상세한 지도를 만든 \"여행자\" 부르기니옹",
      content: "독서와 독처럼 한가로운 기숙사 분위기. 실제로도 어딘가 조용한 모양이다.",
    },
    {
      name: "그라나도스 기숙사",
      symbol: "🎵",
      origin: "전설의 음유시인 \"가인\" 그라나도스",
      content: "전통적으로 축제를 좋아하며, 엘크레스트 제에서는 매번 가장 흥겨워진다.",
    },
    {
      name: "오를란도 기숙사",
      symbol: "❓",
      origin: "유래 불명",
      content: "가장 최근에 만들어진 기숙사. 건물과 설비가 새롭다는 것이 특징. 어떤 인물도 교직원도 유래를 아는 자가 거의 없다. 현 프리펙트는 팜리시아.",
    },
  ];
  return (
    <div>
      <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 16 }}>
        엘크레스트 칼리지에는 6개의 기숙사(*)가 있다. 각 기숙사에는 시볼이 정해져 있으며, 입학 시 어느 기숙사에 배정받는지는 학교 측의 판단으로 무작위다. 학문 앞에서는 평등하다는 취지로, 이곳에서는 종족이나 신분의 차이가 배려되지 않는다. 남녀 공통으로 기숙사가 분리되는 경우도 있다.
      </div>
      <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}25`, borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: "13px", color: "#555", lineHeight: 1.7 }}>
        기숙사 생활: 기상은 7:00, 소등 시간은 21:00. 소등 전에 점호가 있으며, 어기면 기숙사장이나 프리펙트에게 주의를 받는다. 식사는 각 기숙사에 설치된 카페테리아에서 한다. 카페테리아 영업 시간은 아침 7:00~9:00, 저녁 18:00~20:00이며, 식단은 생활 협동 길드가 관리한다.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {dorms.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: "22px", width: 32, textAlign: "center" }}>{d.symbol}</span>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT }}>{d.name}</span>
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: 8 }}>유래: {d.origin}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifeSection() {
  const festivals = [
    { name: "다그데마 마법 주간", timing: "매년 11월", content: "마법과 연금술을 주제로 한 발표회·시연회가 개최된다. 일반 시민도 방문 가능하며 도시 전체가 들뜨는 행사이다." },
    { name: "엘크레스트 제", timing: "매년 4월", content: "학원제에 해당하는 축제. 학생들이 직접 기획·운영하며, 다양한 부스와 공연, 마법 쇼 등이 펼쳐진다." },
    { name: "마쿨 제", timing: "연 6회", content: "각 학기 대항으로 경쟁 포인트를 겨루는 행사. 창설자 류·마쿨의 이름을 따서 마쿨 제라 불리며, 6개 기숙사 단위로 대항전이 이루어진다." },
    { name: "5대학 교류 대회", timing: "4년에 1회", content: "로그레스 대학, 키르디아 국립학교, 문스톤 엔터테인먼트 아카데미, 단스&비안나 학교와의 공동으로 개최되는 5대학 교류 대회. 4년에 1회 치러진다." },
  ];
  const clubs = [
    "유적탐사부", "성가 클럽", "선거관리위원회", "도서위원회", "이벤트실행위원회",
    "오컬트연구부", "귀택부", "풍기위원회", "봉사활동부", "보건위원회",
    "검술부", "골렘연구부", "사격부", "마법통신부", "육상부", "요리클럽",
  ];
  return (
    <div>
      <SecTitle title="학사 일정" />
      <Prose text={"엘크레스트 칼리지의 학기 시작은 가을의 시작인 9월이다. 6월 말까지 1년간의 과정이 있으며, 연말과 여름에 방학이 있다. 방학 후에는 학력 고사를 치르는 수업도 있어 그다지 편하게 쉴 여유가 없다."} />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "14px 18px", marginBottom: 20 }}>
        {[["9월","학기 시작·신입생 환영회·오리엔테이션"],["11월","다그데마 마법 주간"],["12월","연말 방학"],["4월","엘크레스트 제 (학원제)"],["6월","여름 방학·학기 종료"]].map(([month, ev], i) => (
          <div key={i} style={{ display: "flex", gap: 14, fontSize: "13px", borderBottom: i < 4 ? "1px solid #F0ECE5" : "none", paddingBottom: 8, marginBottom: 8 }}>
            <span style={{ color: ACCENT, fontWeight: 700, minWidth: 36 }}>{month}</span>
            <span style={{ color: "#555" }}>{ev}</span>
          </div>
        ))}
      </div>
      <SecTitle title="4대 축제" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {festivals.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT }}>{f.name}</span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 8px", borderRadius: 10 }}>{f.timing}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{f.content}</div>
          </div>
        ))}
      </div>
      <SecTitle title="성적 심사" />
      <Prose text={"성적은 기본적으로 정기적으로 부과되는 논문이나 연구 리포트의 평가로 결정된다. 어학 등의 교육 분야에서는 학력 고사 결과로 평가가 내려지는 경우도 있으며, 마법이나 전투 기술 등의 분야에서는 실기 시험이 이루어지는 경우도 있다.\n\n성적 단계는 A+, A, A마이너스에서 C까지 9등급, 거기에 불합격 D가 추가되어 전 10단계이다."} />
      <SecTitle title="학생회와 위원회" />
      <Prose text={"학생들은 기숙사 생활을 의무화하며, 졸업 때까지 칼리지 내에서 지낸다. 다만 학교 운영 전부를 학생이 관리하는 것은 아니다.\n\n칼리지의 교직원 조합은 유적 탐사 연구를 위해 모인 연구자들의 상호 부조에 의해 성립된 것이다. 학생을 기르는 것은 후세의 육성이나 조수·제자의 확보를 위한 측면이 강하며, 수업이나 실습 관리를 제외하면 사생활 관리를 잘하지 않는다. 그래서 학생들의 과외 활동 및 사생활 부분에 대해서는 학생 자치 단체인 학생회가 운영한다.\n\n학생회의 아래에는 몇 가지 위원회가 있다. 풍기위원회, 보건위원회, 각 이벤트마다 설치되는 운영 위원회 등, 이것들은 입후보한 유지 학생에 의해 구성된다."} />
      <SecTitle title="클럽 활동" />
      <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555", marginBottom: 14 }}>
        칼리지에는 클럽이라는 조직이 존재한다. 동호인 학생들이 자발적으로 결성하는 자치 기관이다. 클럽 수는 매년 증감하지만, 대략 수십에서 백여 개가 된다. 대표적인 클럽들은 다음과 같다:
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {clubs.map((c, i) => (
          <span key={i} style={{ fontSize: "13px", background: `${ACCENT}12`, color: ACCENT, padding: "4px 12px", borderRadius: 14, border: `1px solid ${ACCENT}25` }}>{c}</span>
        ))}
      </div>
      <SecTitle title="방과 후 생활" />
      <Prose text={"1일 수업을 마친 학생들은 다음날 아침까지는 개인적으로 행동할 수 있다. 단 기숙사의 소등 시간은 21:00이며, 그 30분 전에는 점호가 있어 그 시각에는 기숙사로 돌아가 있지 않으면 기숙사장이나 감독생에게 꾸중을 듣게 된다. 제한된 시간 안에 학생들은 다양한 방과 후를 보낸다.\n\n학생 과외 활동의 중심이 되는 것은 동호인 클럽에서의 활동이다. 기숙사 근처에는 클럽하우스가 있으며, 학생들은 이른 아침, 수업 합간, 방과 후에 클럽 활동을 하고 있다.\n\n부지 내에는 정원이나 광장, 숲이나 샘이 있어 조용히 산책하거나 연인들이 함께 걷기도 한다. 소등 전의 포인트까지 나는 도시에 나가도 좋다는 말을 듣는 경우도 있다. 단 외출 시에도 학생에게는 제복 착용이 의무화된다."} />
    </div>
  );
}

interface Character { name: string; role: string; race?: string; gender?: string; age?: string; note: string; }

const characters: Character[] = [
  { name: "오레스테스·모즐레이",  role: "역사학 교수",       race: "휴린(추정)",  gender: "남", note: "마치 알고 있는 것처럼 과거를 이야기한다. \"고민족\" 엘다의 살아있는 전설이라는 소문이 있다." },
  { name: "피네",                role: "연금술 강사",       race: "휴린",       gender: "여", note: "쌍둥이 교사의 여동생. 무관심해 보이지만 내면은 의심이 강하고 샌님 같은 면이 있다." },
  { name: "리이나",               role: "약초학 강사",       race: "휴린",       gender: "여", note: "쌍둥이 교사의 언니. 꽃을 좋아하고 다소 소녀 취향을 가지고 있다." },
  { name: "란도·그린힐",          role: "팔리야어 교수",     race: "휴린",       gender: "남", note: "군대 교육을 받은 엄격한 외모를 하고 있다. 실력은 의외로 온화하여 학생을 잘 돌본다." },
  { name: "그라함·스타일",        role: "수학자",            race: "휴린",       gender: "남", note: "냉담한 성격. 쌍둥이 교사에게 호감이 있는 것 같다. 취미 음료는 홍차." },
  { name: "테오도라·다이아나",    role: "신학 교수",         race: "휴린",       gender: "여", note: "온화하고 인정 깊은 오빠 같은 분위기. 실험 장소인 던전의 관리도 맡고 있다." },
  { name: "루서·해밀턴",          role: "감정사·강사",       race: "휴린",       gender: "남", note: "쌍둥이 교사의 오빠. 칼리지 내 수집 활동을 좋아하는 것으로 알려져 있다. 하우리를 모으는 것을 좋아한다." },
  { name: "고돈",                 role: "학내 골렘 정비사",  race: "바나",         gender: "남", note: "직인 기질의 바나. 학교의 골렘을 자식처럼 소중히 한다." },
  { name: "미아·에이린",          role: "공동판매소 담당",   race: "휴린",       gender: "여", note: "쌍둥이 여동생. 입이 험한 편. 자체 건강 음료를 좋아한다. 취미는 요리." },
  { name: "로지",                 role: "도서관 관장 대리",  race: "휴린(추정)", gender: "여", note: "도서관에 사는 작은 키의 소녀. 고풍스럽게 「~이오」 식의 말투로 말한다." },
  { name: "라그루",               role: "개방적 교사",       race: "두앙(추정)",   gender: "남", note: "개방적인 성격의 교사. 학생들과 격의 없이 지내며 오랜 경험을 가지고 있다." },
  { name: "테레즈·엘렌마이어",    role: "칼리지 창설자 / 유적탐사 강화위원장", race: "휴린", gender: "여", note: "칼리지 창설자 중 한 명. 현 관리자로 유적탐사 강화위원장을 겸임한다. 무뚝뚝하고 접근하기 어려운 분위기로 두려움을 받는다." },
  { name: "니크롬·란스리드",      role: "진료 교수",         race: "휴린",       gender: "남", note: "문진, 수술, 고민 상담 등 학생의 문제를 해결해 주는 상담사. 극도로 날씬한 체형. 금전 앞에서는 자제력을 잃는다." },
  { name: "로롯트",               role: "신학 강사",         race: "두앙",         gender: "불명", note: "두앙 신의 연구자. 농밀한 지식으로 유명하다. 강의는 도저히 알 수 없다는 평판이다." },
  { name: "마텔",                 role: "무기제조학 강사",   race: "휴린",       gender: "여", note: "\"단조의 거리\" 하머빌 출신의 무기제조학 강사. 재능이 있으며 강의 중에 구령을 자주 사용하는 것이 특징이다." },
];

function PeopleSection() {
  return (
    <div>
      <Prose text={"여기서는 엘크레스트 칼리지의 교직원을 비롯하여 학교에 관련된 인물 중 대표적인 자들을 소개한다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14, marginTop: 20 }}>
        {characters.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>
                <span style={{ fontSize: "11px", color: ACCENT, fontFamily: "'Noto Sans KR', sans-serif", marginRight: 6, opacity: 0.8 }}>({i + 1})</span>
                {c.name}
              </span>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 6 }}>{c.role}</span>
            </div>
            {(c.race || c.gender) && (
              <div style={{ display: "flex", gap: 10, fontSize: "12px", color: "#888", marginBottom: 8 }}>
                {c.race && <span>종족: {c.race}</span>}
                {c.gender && <span>성별: {c.gender}</span>}
              </div>
            )}
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ElcrestCollegePage() {
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
      case "campus":     return <CampusSection />;
      case "facilities": return <FacilitiesSection />;
      case "dorms":      return <DormsSection />;
      case "life":       return <LifeSection />;
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
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#3A2A10", marginBottom: 6 }}>엘크레스트 · 전기제 대학</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>엘크레스트<br />칼리지</div>
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
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px", color: "#3A2A10", lineHeight: 1.6 }}>
          <a href="/elcrest" style={{ color: "#7A5A2A", textDecoration: "none", fontSize: "11px" }}>← 엘크레스트로</a>
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
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>ELCREST · COLLEGE</div>
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
