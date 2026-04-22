'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

// ---- 타입 정의 ----
interface NavItem { id: string; label: string; icon: string; }
interface Facility { name: string; ruby?: string; content: string; }
interface Character {
  name: string; nameKo?: string; quote: string; race: string;
  gender: string; age: number; hairColor: string; eyeColor: string; skinColor: string;
  title: string; content: string;
}

// ---- 상수 ----
const ACCENT = "#3B5E45";
const ACCENT_LIGHT = "#E6EFE9";

// ---- 네비게이션 ----
const navItems: NavItem[] = [
  { id: "gran",       label: "그랑펠덴 왕국",      icon: "🏰" },
  { id: "capital",    label: "왕도 그랑펠덴",      icon: "🏙️" },
  { id: "facilities", label: "주요 시설",           icon: "🏛️" },
  { id: "people",     label: "그랑펠덴의 인물들",  icon: "👥" },
];

// ---- 데이터 ----

const granHistory = `그랑펠덴 왕국의 흥기는 성력 300년 전후이다. 당시, 북방 평원에서 활동하던 기마 민족 중 하나인 그랑펠덴 씨족의 영웅 셀기쿠스가 나타났다. 강한 의지와 카리스마를 가진 그는, 다양한 부족을 규합하여 불과 30세의 나이로 그랑펠덴 왕국을 탄생시켰다. 국가의 이름은 건국의 영웅 셀기쿠스가 "위대한 펠덴"이라 불린 것에서 유래한다.

그 후, 파리스 왕국이 출현하여 이에 패배함으로써 종속국이 됐다. 건국으로부터 약 200년 후, 성력 500년 전후에 파리스 왕국의 멸망과 동시에 왕도와 주변 토지를 영토로 독립. 이후 에를랑 왕국에 이어, 혹은 이에 필적하는 세력을 가지게 됐다.

현재는 파리스 동맹에 소속된 도시 국가 중 하나로, 여러 위성 도시를 넘어서는 소국이 되어 있다.`;

const granGeography = `그랑펠덴 왕국은 대륙 북방에 있기 때문에, 기후는 한랭하며 겨울에는 눈이 내리는 경우도 있다. 작물을 키우기에는 혹독한 환경이기도 하여, 식량 자급률은 그다지 높지 않다.

주변은 눈을 녹인 물이 흐르는 평야이다. 한편, "땅의 시대"의 대지진의 영향으로, 현무암이나 빙정암 등의 광산 자원이 산출되는 장소가 산재하며, 이 때문에 북방 평원의 말과 산양의 목축이나, 국영 연금술 협회에 의한 약품의 종류 제조도 활발히 이루어지고 있다. 또한 북방 평원을 흐르는 벤갈드 강을 이용한 무역이 이루어지고 있다. 이 상품들은 북방을 흐르는 벤갈드 강을 이용한 무역으로 수출되어, 나라를 지탱하는 생명선이 되고 있다.`;

const granPolitics = `그랑펠덴 왕국은 왕정 국가이지만, 귀족 의회가 존재하고 오래전부터 섬겨온 귀족이 강한 발언권을 가지고 있다.

최종적인 결정을 내리는 것은 어디까지나 국왕이지만, 귀족 의회의 의견을 무시하면 국내에 내분이 생길 가능성이 있기 때문에, 왕도 대응에 고심하고 있다는 것이다. 최근에는 신흥의 개혁파와, 과거의 영광을 재현하려는 보수파, 귀족파라는 새로운 개혁 세력이 대립하고 있어, 다양한 의혹 사건이 일어나고 있다. 코라드 국왕의 고심은 늘어나기만 한다.`;

const granMilitary = `그랑펠덴의 주전력은 국왕을 지키는 상비 전력의 왕립기사단이다. 또한 그것과는 별도로 "왕국의 검"이라고도 불리는 호위 기사단이 존재한다.

왕립기사단은 레이몬 왕자(*)를 단장으로 전귀자녀와 전문 병사들로 편성되어 있으며, 유사시에는 민병도 가담한다. 평시의 주요 임무는 도시와 주변 지역의 경비, 토목 공사 등이다.

호위 기사단은 국가의 질서 유지와 반역자들의 숙청이 임무인 특수 부대이다. 단원들의 정보는 비밀에 부쳐져 있으며, 정체를 아는 자는 극히 소수이다. 사람 앞에 모습을 나타낼 때는 전신을 울트레이머나 가면으로 정체를 숨기고 임무에 임한다. 그들의 상징, 즉 손바닥에 얽혀있는 뱀의 문장은 범죄자들의 공포의 대상이 되고 있다.`;

const capitalData = {
  population: "약 10만 명",
  raceComposition: [
    { race: "휴린",   pct: 50, color: "#2A5F9E" },
    { race: "엘다난", pct: 24, color: "#1A6B4A" },
    { race: "네바프", pct: 12, color: "#8B6914" },
    { race: "필보르", pct: 6,  color: "#4A7A2E" },
    { race: "바나",   pct: 5,  color: "#B85C2A" },
    { race: "두앙",   pct: 3,  color: "#8B2D2D" },
  ],
  stats: [
    { label: "통치 형태",   value: "왕정" },
    { label: "현재 수장",   value: "코라드·그랑펠덴 (국왕)" },
    { label: "종교",         value: "7대 신 신앙 (아켄라브 주신)" },
    { label: "언어",         value: "공통어" },
    { label: "기후",         value: "한랭" },
    { label: "수입",         value: "곡물, 식료품, 향신료 등" },
    { label: "수출",         value: "광석, 농경마, 약품류 등" },
  ],
};

const capitalHistory = `파리스 동맹뿐만 아니라 에린딜 서방 전체를 통틀어도 오랜 역사를 자랑하는 그랑펠덴 왕국의 왕도. 그것이 "옛 왕도"라고도 불리는 그랑펠덴의 거리다.

왕도 그랑펠덴이 탄생한 것은 왕국 건국으로부터 약 100년 후. 북방 평원을 넘어 중원까지 판도를 넓히는 중에서였다.

원래는 에린딜 중원으로의 전략 거점으로서 태어난 성곽 도시였으며, 북방을 흐르는 벤갈드 강으로부터 처음에는 벤갈드 성곽이라 불렸다. 에린딜 중원의 근거지가 어느 정도 갖춰지자, 벤갈드 강의 이점에서 이 성곽 도시에 많은 사람들이 모여들었으며, 이내 무역 도시로서의 기능도 갖추게 됐다.

이렇게 이 거리는, 전략 거점으로서만이 아닌, 그랑펠덴 왕국의 흐름의 요충으로서 그 중요도를 높여갔다.

그리고, 성력 420년 전후. 천도가 이루어져, 수도 기능이 이 거리로 이전되는 동시에, 거리 이름도 왕도 그랑펠덴으로 개칭됐다.`;

const districts = [
  {
    name: "직인가",
    content: `연금술사의 공방이나 무기 직인의 단조 공방, 석공 등의 가게가 즐비. 국영의 연금술 협회가 있으며, 오래전부터 거래가 있는 라프 대동굴에서 온 연금술사들이 공방을 갖추고 있다. 연금술 관련 시설이 특히 많다.`,
  },
  {
    name: "주택가",
    content: `일반 시민에게 개방된 주택 지구. 오랜 역사를 자랑하는 만큼 문화재 지정 건물이 있기도 하다. 모험자들의 유입에도 따라 주택 수요가 높아졌으며, 새로운 주택 시설의 건설과 지구 확장이 계획되고 있다.`,
  },
  {
    name: "상점가",
    content: `일용품이나 식료품을 취급하는 상점, 무역상 등이 늘어서는 구획. 최근에는 모험자 상대 가게도 늘어나고 있어 활기가 가득하다. 생활용품부터 모험의 도구까지 대부분은 이곳에서 구할 수 있다. 무역상 중에는 여관을 내거나 말 대여를 하는 곳도 있어 이동 수단을 찾는 곳으로도 좋다.`,
  },
  {
    name: "고급 주택가",
    content: `그 이름 그대로, 부유층이 사는 구획. 대부분은 귀족이나 상인의 저택이 볼 수 있다. 일반인은 거의 발을 들이지 못하기 때문에, 대로를 걸어도 인적이 드물고, 들어가면 놀랄 만큼 인기가 적다.`,
  },
];

const surroundings = [
  {
    name: "아이레스 항",
    content: `왕도 그랑펠덴의 동쪽에 있는, 벤갈드 강을 이용한 항구. 그랑펠덴에서 유일한 항구 형태로, 무역뿐만 아니라 여객선도 출입하고 있으며, 무역업자 외에도 사람과 모험자들의 여행 출입구로 이용되고 있다. 또한 이 항구에는 카누를 이용한 쪽배도 있다. 벤갈드 강을 건너고 싶을 때도 이 항구를 이용하는 것이 좋다.`,
  },
  {
    name: "카르가나 산",
    content: `그랑펠덴 근교에 있는 작은 산. 일찍이는 광산 자원의 채굴장으로 이용됐지만, 수십 년 전부터 산출량이 줄어들어 현재는 방치되어 있다. 방치된 후 대형 곰이나 다양한 동물이 살게 되어, 일부 모험자들이 고급 식재로서 진귀한 곰의 손을 구하기 위해 방문하는 경우도 있다고 한다.`,
  },
  {
    name: "에첸의 숲",
    content: `벤갈드 강을 따라 펼쳐지는 숲. 규모는 그다지 크지 않지만, 왕도 그랑펠덴에서 북쪽 방향으로 반나절 정도의 비교적 가까운 장소에 있기 때문에 사냥터로 이용되는 경우가 있다. 벤갈드 강 방면에는 목재 벌채 작업이 이루어지고 있다. 힘이 강한 동물도 다수 서식하고 있어 상급 사냥터가 되기도 한다.`,
  },
];

const facilities: Facility[] = [
  {
    name: "그랑펠덴 왕성",
    ruby: "おうじょう",
    content: `거리의 중심부에 솟아 있는 고성. 그랑펠덴 왕가의 거주지이며 동시에 국왕의 행정 기구도 겸하고 있다. 성에는 허가를 받은 자나 왕족·고위 귀족 등의 관계자만이 들어갈 수 있으며, 허가 없이 침입을 시도하면 용서 없는 경비병에게 구금된다.\n\n외견은 놀라울 만큼 탄탄하며 내부에는 철저한 경비가 이루어지고 있다. 그 내부에는 신흥 국가의 방식을 본뜬 개혁파와 과거 영광을 되찾으려는 수구파가 대립하고 있어, 다양한 소문이 끊이지 않는다. 코라드 국왕이 열쇠를 쥐고 있지만 중요한 일에는 나서지 못하고 있어, 언젠가는 중대한 문제로 발전할 가능성이 충분히 있다.`,
  },
  {
    name: "그랑펠덴 대신전",
    ruby: "だいしんでん",
    content: `왕도 그랑펠덴 탄생부터 존재하는 유서 깊은 신전. 7대 신을 모시고 있으며, 주신은 아켄라브이다. 쌓아올린 역사의 길이는 파리스 동맹 내에서도 가장 오래된 신전 중 하나로, 정교한 조각이 돋보이는 장려한 외관은 관광의 명물이기도 하다.\n\n현재의 신관장은 소른다이크라는 인물로, 널리 문호를 개방하고 있어 거리의 관광 명소 중 하나로 꼽힌다. 내부에는 신전과 함께 모험자의 길드나 훈련 시설도 설치되어 있다. 최근에는 마물 활성화에 따라 신전에 기도하는 사람이 늘고 있으며 매일같이 많은 사람들이 기도하고 있다.`,
  },
  {
    name: "왕립기사단 본부",
    ruby: "おうりつきしだん",
    content: `거리의 중앙, 왕성 가까이에 건설. 그랑펠덴 왕국의 왕립기사단의 본부이자 도시 중에서도 규모가 가장 크다. 단장·부단장실을 비롯하여 각종 임무를 수행하기 위한 부서가 마련되어 있다.\n\n이곳에는 왕립기사단의 단원이 도시 내외에 다수 배치되어 있으며, 각지의 명령이나 정보를 전달하는 역할을 하고 있다. 비상사태에 대비하여 아침저녁으로 전령이 바쁘게 오가며, 때로는 수백 명의 기사가 달려 나가 거리의 경계 업무를 도맡기도 한다.`,
  },
  {
    name: "왕립도서관",
    ruby: "おうりつとしょかん",
    content: `왕성 근처에 세워진 큰 도서관. 입관 허가는 원래 신전이 발행하며, 원래는 왕성과 함께 설치될 예정이었지만 왕성의 확장과 함께 입관 허가 수속이 너무 번거로워져, 왕성과는 별도 건물로 건설됐다.\n\n오랜 역사를 자랑하는 그랑펠덴의 역사 자료가 이곳에 집중되어 있으며, 에린딜에서도 둘째가라면 서러울 자료의 보고이다. 타 국가에서도 학자나 연구자들이 방문한다. 옛날에는 왕성의 관리 하에 있었지만, 현재는 신전에 업무를 위탁하고 있다.`,
  },
  {
    name: "왕국연금술협회",
    ruby: "おうこくれんきんじゅつきょうかい",
    content: `그랑펠덴 왕국이 경영하는 국내의 연금술 협회. 회장은 에리야·아린가므, 전 18개 창고의 거대한 탑을 자랑하며, 탑의 총칭은 "마탑"이라 불린다.\n\n시설은 오래됐지만 라프 대동굴이나 신성 번스터 제국의 선진 연구 시설에 비하면 낡아도, 그만큼 우수한 인재가 다수 재직하고 있다. 그랑펠덴 주변 유적의 발굴을 추진하는 것 외에, 의료 관련 연구가 진행되고 있다. 특히 포션을 비롯한 약초계 아이템의 연구가 과제이며, 현재 시장에서 유통하는 종류의 포션은 모두 이곳의 조제법으로 제조 가능하게 됐다. 도시 내에 합쳐서 그 수는 50개를 넘는다고 한다.`,
  },
  {
    name: "용의 골격정",
    ruby: "りゅうのがいこつてい",
    content: `원조 모험자였던 주인 가우르테리오가 경영하는 주점 겸 여관. 주식은 반숙 고기를 주문 구이로 한 특별한 풍미와 다소 독특한 향이 나는 것을 자랑한다. 모험자에게 이해심이 깊어 신참부터 베테랑까지 많은 모험자들이 모이는 장소가 됐다. 이용법은 명확하고 요령껏 인맥을 넓히거나 정보를 수집하는 등 다양하다. 정기적으로 모험자 모임이 개최되며, 그날의 메뉴는 육류 요리가 대폭 늘어난다. 가게의 명물은 티본 스테이크.`,
  },
  {
    name: "카르니세르 상회",
    ruby: "しょうかい",
    content: `모험자의 유입에 따라 신흥 상품의 판로를 개척한 상회. 회장은 바네사·카르니세르. 모토는 항상 히죽히죽 현금 결제. 메인 고객은 모험자들. 드롭 아이템의 매입이나 각종 아이템의 판매를 하고 있으며, 일반 물건에서 마법 아이템까지 광범위하게 취급하며 대부분은 이 가게에서 구할 수 있다.\n\n또한 가게 주인 바네사는 이런저런 의뢰를 걸어오는 경우가 있다. 이 의뢰는 보수도 충분히 주어지므로 의뢰에 응하는 모험자도 있다고 한다.`,
  },
  {
    name: "가든 마레트",
    ruby: "がーでんまれっと",
    content: `고급 주택가 근처에 있는 찻집. 입장은 가게 주인 다프네의 소개나 동행이 필요하다. 다양한 차 종류가 줄지어 있으며 합리적인 가격으로 제공된다. 특히 한쪽에서 팔리는 양과자 품목은 맛이 좋다는 평판으로 왕가나 귀족도 사러 온다.\n\n또한 이곳의 일부에서는 정보의 매매도 이루어지고 있으며, 흥미가 있다면 로열 밀크티와 함께 "잼 들어갑니다"라는 합언어로 통한다. 알고 싶은 것이 있으면 찾아보는 것이 좋다.`,
  },
  {
    name: "개선광장",
    ruby: "がいせんひろば",
    content: `남대문에서 왕성까지 직접 이어지는 큰 대로에 있는 광장. 축일에는 이벤트 회장으로 이용되어 많은 거리 사람들의 만남의 장소가 된다. 대로와 직접 이어지고 있어 관광객이나 여행자들이 많이 지나다닌다. 그들을 노리는 도둑이나 노상강도도 많이 볼 수 있어 주의가 필요하다.\n\n또한 가게를 출점하는 데에는 신전의 허가가 필요하며, 무허가로 출점하면 안전하지 않고 저렴한 벌금을 납부하게 되므로 주의.`,
  },
];

const characters: Character[] = [
  {
    name: "コーラッド・グランフェルデン",
    nameKo: "코라드·그랑펠덴",
    quote: "나는 변하지 않으면 안 된다",
    race: "휴린", gender: "남", age: 56,
    hairColor: "붉은", eyeColor: "갈색", skinColor: "흰",
    title: "그랑펠덴 왕국 국왕",
    content: `파리스 동맹 주요 도시 중 하나인 그랑펠덴 왕국의 국왕. 다른 나라와의 교류를 중요하게 여기며 타국과의 우호와 교류를 적극적으로 추진하고 있다. 코라드는 이에 반대하는 개혁파 보수파와 불화를 겪고 있으며, 과거에도 여러 소문이 있었다. 이에 따른 개혁파는 점진적으로 세력을 키워오고 있으며, 상황을 더욱 악화시키려는 세력도 있어, 왕도 내에서 다양한 의혹 사건이 터지는 등 코라드 국왕의 고심은 늘어나기만 한다.`,
  },
  {
    name: "レティシア・グランフェルデン",
    nameKo: "레티시아·그랑펠덴",
    quote: "해야 할 일을 할 뿐이야",
    race: "휴린", gender: "여", age: 22,
    hairColor: "붉은", eyeColor: "회색", skinColor: "흰",
    title: "그랑펠덴 왕국 왕녀",
    content: `그랑펠덴 왕국의 왕녀이며, 왕립기사단 부단장의 소녀로 "약혼녀"라고도 불린다. 젊으며 용감하고 뛰어난 기술을 가지며, 국가의 발전을 목적으로 하고 있어 보수파와는 자주 의견이 맞지 않는다. 귀한 달의 분위기가 있으며, 특히 가든·마레트의 케이크를 즐겨 찾는다.`,
  },
  {
    name: "ソーンダイク",
    nameKo: "소른다이크",
    quote: "조금 이야기를 해 보실까요?",
    race: "휴린 (하프 엘다난)", gender: "남", age: 34,
    hairColor: "금", eyeColor: "녹색", skinColor: "흰",
    title: "그랑펠덴 대신전 신관장",
    content: `그랑펠덴 왕국 대신전의 신관장. 이름 높은 성품을 가진 온화하고 좋은 성격의 인물. 다양한 장소의 인물들과 친밀한 관계를 가지며, 왕녀 레티시아를 위기에서 여러 번 구하기도 했다. 마물의 활성화에 대해 모험자들을 장려하고, 대책 검토와 실시를 이행하고 있다.`,
  },
  {
    name: "アリエッタ",
    nameKo: "아리에타",
    quote: "도와주세요~!",
    race: "필보르", gender: "여", age: 18,
    hairColor: "분홍", eyeColor: "황갈색", skinColor: "흰",
    title: "그랑펠덴 대신전 접수원",
    content: `신전에 딸린 의뢰소의 전진한 접수원. 모험자들을 진지하게 상대해주기 때문에 어디서도 무리한 의뢰를 떠안기지 않으며, 신전도 착실하게 의뢰를 봐주고 있다. 의뢰 시간을 보면 검은 의뢰를 받아버리는 모험자도 많기 때문에, 모험자와의 교우 관계나 지식이 생각 이상으로 넓다.`,
  },
  {
    name: "ガウルテリオ",
    nameKo: "가우르테리오",
    quote: "오늘의 스페셜 메뉴야!",
    race: "두앙 (유각족)", gender: "남", age: 62,
    hairColor: "갈색", eyeColor: "검은", skinColor: "살구색",
    title: '"용의 골격정" 가게 주인',
    content: `"개선광장 부근"에 있는 주점 "용의 골격정" 가게 주인. 이전 직업이 마물 토벌 전문으로 기이한 성격의 소유자. 가게 안에는 용의 골격이 장식되어 있다. 그것이 진짜인지 모조품인지는 알 수 없지만, 많은 모험자들이 찾아오고 있다. 가게의 명물은 티본 스테이크.`,
  },
  {
    name: "伊王野友唯",
    nameKo: "이오노 유이",
    quote: "어려운 일이 있으면 뭐든 상담해줘",
    race: "아시안", gender: "여", age: 20,
    hairColor: "갈색", eyeColor: "차색", skinColor: "황",
    title: "팝베리 가게 주인",
    content: `에린에 흘러들어 온 현대 지구인으로, 그랑펠덴에서 현대 보존 상점 "팝베리"를 경영하고 있다. 어떤 사람에게도 친절해서 곤란하고 외로운 사람들의 고민 상담을 기꺼이 들어주는 성격이다. 같은 처지에 있는 사람들의 고민 상담도 행하고 있으며, 이세계의 생존 방식에 대해 선구자로서 지혜를 빌려줄 것이다.`,
  },
  {
    name: "アマンド・オーディアール",
    nameKo: "아만도·오디아르",
    quote: "국왕도 힘드셨겠군요",
    race: "엘다난", gender: "여", age: 42,
    hairColor: "은", eyeColor: "회색", skinColor: "흰",
    title: "그랑펠덴 왕국 귀족",
    content: `그랑펠덴 왕국 건국부터 섬겨온 오디아르 가문의 현 당주. 성격은 과묵하고 무슨 일에도 과거의 영광을 입에 올린다. 개혁파를 넘어설 뿐 아니라 마물에 대해서도 자국만의 힘으로 싸워야 한다고 믿으며, 왕국에 모험자 파견을 금지하는 것을 주도하고 있다고 한다.`,
  },
  {
    name: "エリヤ・アリンガム",
    nameKo: "에리야·아린가므",
    quote: "한 가지 일을 부탁받고 싶군",
    race: "네바프", gender: "남", age: 64,
    hairColor: "흰", eyeColor: "검은", skinColor: "살구색",
    title: "국영 연금술사 협회장",
    content: `그랑펠덴 국영, 왕국 연금술 협회장 소속의 연금술사. 현재 호기심이 왕성하고 여유로운 성격의 인물이다. 정보 조사에도 관심이 많아 현재는 모험자를 고용하여 조사를 시키고 있다. 사례는 넉넉하다고 한다.`,
  },
  {
    name: "バネッサ・カルニセール",
    nameKo: "바네사·카르니세르",
    quote: "이 가격으로 사 가세요!",
    race: "필보르", gender: "여", age: 22,
    hairColor: "검은", eyeColor: "녹색", skinColor: "흰",
    title: "카르니세르 상회 회장",
    content: `그랑펠덴에 가게를 연 카르니세르 상회의 회장. 독자적인 상재(商才)의 소유자로, 타인을 압도하는 강압적인 성격을 가지고 있다. 모험에 필요한 아이템이라면 거의 손에 넣을 수 있다. 다만 가격도 그다지 싸지 않으며 할인도 일체 하지 않는다. 언젠가 세계를 건 규모의 상거래를 하기 위해 기를 쓰고 있다.`,
  },
  {
    name: "エリク・バドエル",
    nameKo: "에리크·바도에르",
    quote: "이 거리에서의 승리는 허락하지 않겠어",
    race: "바나 (묘족)", gender: "남", age: 30,
    hairColor: "붉은", eyeColor: "파란", skinColor: "황",
    title: '"뱀의 눈" 간부',
    content: `파리스 동맹을 중심으로 활동하는 도적 길드 "뱀의 눈"의 간부. 이면 사회의 연줄도 갖고 있으며, 이면 사회를 배반하는 사람이 있다면 중재가 필수다. 냉정하고 피를 흘리는 것도 마다하지 않는다. 하지만 불필요한 폭력은 하지 않는다. 현재는 국가 내 범죄 활동의 방어를 목적으로 활동하고 있다.`,
  },
  {
    name: "ダフネ・マレット",
    nameKo: "다프네·마레트",
    quote: "오늘은 좋은 잎이 들어왔어요",
    race: "휴린", gender: "여", age: 50,
    hairColor: "밀색", eyeColor: "차색", skinColor: "황",
    title: "가든 마레트 가게 주인",
    content: `그랑펠덴의 고급 주택가 거리에 있는 찻집 가든·마레트의 스마트하고 강인한 여성. 왕족이나 귀족에게도 상당히 친한 편이며, 그런 그녀는 또한 정보원이기도 하다. 가게에서 로열 밀크티를 주문하며 합언어를 말하면 정보의 매매가 가능하다.`,
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

function Card({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8,
      padding: "16px 20px", marginBottom: 10,
      borderLeft: accent ? `4px solid ${accent}` : undefined,
    }}>{children}</div>
  );
}

// ---- 섹션 컨텐츠 ----

function GranSection() {
  return (
    <div>
      <SecTitle title="그랑펠덴 왕국의 역사" />
      <Prose text={granHistory} />
      <SecTitle title="지세" />
      <Prose text={granGeography} />
      <SecTitle title="정치" />
      <Prose text={granPolitics} />
      <SecTitle title="군사" />
      <Prose text={granMilitary} />
      <SecTitle title="타국과의 관계" />
      <Prose text={`남방의 신성 번스터 제국과는, 파리스 동맹의 관계로 긴장 관계에 있지만, 그랑펠덴 왕국은 동맹 내에서도 북방에 위치하고 있어 간접적 관련에 그치고 있다.\n\n파리스 동맹 내에서는, 국왕의 정책상 기술 공유의 관계가 깊으며, 특히 오래전부터 연금술을 연구하고 있는 것, 북방에 위치하고 있는 것에서 연금술의 총 본산이라 불리는 라프 대동굴과 교류가 있다.`} />
    </div>
  );
}

function CapitalSection() {
  return (
    <div>
      <div style={{ background: "#fff", border: `2px solid ${ACCENT}30`, borderRadius: 10, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 14, letterSpacing: "0.08em" }}>왕도 그랑펠덴 기본 데이터</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 16 }}>
          {capitalData.stats.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: "13px", borderBottom: "1px solid #F0ECE5", paddingBottom: 6 }}>
              <span style={{ color: "#888", flexShrink: 0, minWidth: 72 }}>{s.label}</span>
              <span style={{ color: "#2a2a2a", fontWeight: 500 }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 600, color: ACCENT, marginBottom: 10 }}>
          인구 구성 — {capitalData.population}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {capitalData.raceComposition.map((r, i) => (
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

      <SecTitle title="왕도의 역사" />
      <Prose text={capitalHistory} />

      <SecTitle title="거리 구조" />
      <Prose text={"왕성을 중심으로 한 거리 구조이며, 도시 전체가 견고한 외벽에 의해 지켜지고 있다. 도시 내부는 동서남북 4개의 구획으로 크게 나눌 수 있다. 동쪽은 상점가, 서쪽은 고급 주택가, 남쪽은 주택가, 북쪽은 직인가다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {districts.map((d, i) => (
          <Card key={i} accent={ACCENT}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: ACCENT, marginBottom: 6 }}>{d.name}</div>
            <Prose text={d.content} />
          </Card>
        ))}
      </div>

      <SecTitle title="주변 지세" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {surroundings.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 14 }}>
            <span style={{ fontWeight: 600, color: ACCENT, flexShrink: 0, fontSize: "13px", minWidth: 80 }}>{s.name}</span>
            <span style={{ fontSize: "14px", color: "#555", lineHeight: 1.8 }}>{s.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        왕도 그랑펠덴의 주요 시설을 소개한다. 시설 소개에서는 해당 시설의 인물, 조직, 유명한 장소 등도 설명하고 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {facilities.map((f, i) => (
          <Card key={i} accent={ACCENT}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: ACCENT, marginBottom: 10 }}>
              {f.name}
            </div>
            <Prose text={f.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        그랑펠덴 왕국의 주요 인물들을 소개한다. 이들은 PC의 의뢰인이나 협력자, 혹은 적대자로서 시나리오에 등장할 수 있다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {characters.map((c, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10,
            overflow: "hidden", borderTop: `3px solid ${ACCENT}`,
          }}>
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
                  { label: "눈", value: c.eyeColor },
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

export default function GranFeldenKingdom() {
  const [activeId, setActiveId] = useState("gran");
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
      case "gran":       return <GranSection />;
      case "capital":    return <CapitalSection />;
      case "facilities": return <FacilitiesSection />;
      case "people":     return <PeopleSection />;
      default:           return null;
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

      {/* 사이드바 */}
      <nav style={{
        width: 248, minWidth: 248, background: "#1A2018", color: "#D4CFC7",
        display: "flex", flexDirection: "column", overflow: "hidden",
        ...(mob ? { position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999, transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none" } : {}),
      }}>
        <a href="/gran-felden" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>← 파리스 동맹</div>
        </a>
        <div style={{ padding: "20px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#7a8070", marginBottom: 6 }}>PARIS ALLIANCE · GRANFELDEN</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.5 }}>그랑펠덴 왕국</div>
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

      {/* 메인 */}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT_LIGHT}90 100%)`,
          borderBottom: `3px solid ${ACCENT}25`,
          padding: mob ? "60px 20px 28px" : "40px 48px 36px",
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>PARIS ALLIANCE · GRANFELDEN KINGDOM</div>
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
