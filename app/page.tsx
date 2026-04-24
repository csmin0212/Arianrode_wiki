'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

// ---- 타입 정의 ----
interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface Era {
  name: string;
  note?: string;
  content: string;
}

interface DimensionItem {
  name: string;
  icon: string;
  content: string;
}

interface RegionItem {
  name: string;
  content: string;
  href?: string;
}

interface CountryItem {
  name: string;
  tag: string;
  color: string;
  accent: string;
  content: string;
}

interface NotablePlace {
  name: string;
  nickname: string;
  content: string;
  href?: string;
}

interface TimelineEvent {
  year: string;
  events: string[];
}

// ---- 네비게이션 ----
const navItems: NavItem[] = [
  { id: "intro",     label: "월드 섹션 안내",     icon: "📖" },
  { id: "history",   label: "에린의 역사",         icon: "⏳" },
  { id: "gods",      label: "신들과 정령왕",       icon: "✨" },
  { id: "structure", label: "세계의 구조",         icon: "🔮" },
  { id: "regions",   label: "에린의 제지역",       icon: "🗺️" },
  { id: "countries", label: "서방 4대국",          icon: "⚔️" },
  { id: "notable",   label: "특징 있는 지역",      icon: "🏰" },
  { id: "timeline",  label: "서방 연표",           icon: "📅" },
];

// ---- 데이터 ----

const eras: Era[] = [
  {
    name: "빛의 시대",
    content: `최초에 하늘과 땅이 뒤섞여 혼돈만이 있었다. 그후 하늘과 땅이 나뉘고, 그 틈새에서 빛이 생겨났다.\n\n이 하늘과 땅 사이에서 천공신 다그데모아와 대지의 여신 다난이 태어났다. 이 두 기둥은 신들 중에서도 강한 의지를 가진 정령을 "왕"이라 불렀다. 그 다음으로 정령들 중에서도 "빛의 왕" 마라이카가 항상 세계를 청명하게 지속했다. 이후 이어지는 다른 시대보다 뛰어났던 시대였다.`,
  },
  {
    name: "바람의 시대",
    content: `신들은 정령, 동물에 이어 에르다들을 낳았다. 에르다들은 정령에게서 지혜와 기술을 배우고, 동물과 같은 금빛 눈을 가졌으며, 동물을 "왕"으로 섬겼다. 그리고 많은 필보르, 두앙, 네바프를 지배하에 두었다.\n\n그러나 보통의 민이 신에게 유혹받기 시작했다. 신들은 바람의 정령왕 디지니에게 명하여 역병을 불어넣었다. 신들은 이를 "바람의 서청(書淸)"이라 불렀다.`,
  },
  {
    name: "물의 시대",
    content: `쫓겨나지 않은 악한 자들이 대지의 구멍에 숨어 반격의 기회를 노리고 있었다. 이 마물을 없애기 위해 천공신 다그데모아가 버나를 창조하고, 뇌신 그랑아인이 두앙을 만들었다.\n\n하지만 보통의 민이 다시 내분에 빠졌다. 신들은 물의 정령왕 마리드에게 명하여 물로 세계를 정화시켰다. 이것이 "물의 서청"이었다.`,
  },
  {
    name: "땅의 시대",
    content: `새롭게 변한 세계에서, 샘의 여신 아에마가 필보르를 낳고, 대장신 고바논이 네바프를 낳았다.\n\n"물의 서청"에서 유일하게 살아남은 에르다 바랄이 있었다. 그는 마왕이 되어 마족들을 부하로 두고 여러 종족을 지배했다. 두앙 여성들의 기도가 신에게 닿아, 신들은 대지의 정령왕 다오에게 명하여 지옥을 갈라 바랄과 마족들을 마계로 던져넣었다. 이것을 "땅의 서청"이라 불렀다.`,
  },
  {
    name: "불의 시대",
    note: "현재",
    content: `마물이 사라지고 세계는 빛을 되찾았다. 그러나 쫓겨났던 자들이 완전히 사라지지 않았고, 불안에 휩싸여 신들에게 제재를 받았다고 의심하는 자도 적지 않았다.\n\n그러한 시대에, 예언의 여신 브리간티아가 태양신 아켄라브에 의해 보내어진 휴린을 탄생시켰다. 두 민은 다가오는 마물 부활을 막기 위해 보내어졌다는 전설이 있다.\n\n이렇게 "불의 시대"가 시작되었다.`,
  },
];

const godsInfo = `에린에는 7대 신 외에도 많은 신들이 존재하며, 각자 직능을 맡아 역할을 다하고 있다. 주요 7대 신으로는 천공신 다그데모아, 태양신 아켄라브, 예언의 여신 브리간티아, 샘의 여신 아에마, 대장신 고바논, 뇌신 그랑아인 등이 있다.\n\n또한 세계의 이치를 다스리는 정령들의 왕과, 에린의 동물들의 시조가 된 7기둥의 동물의 왕들도 각자 역할을 담당하고 있다.\n\n바람의 시대에 에르다들은 세계 창조에 사용된 혼돈의 잔재를 바탕으로 새로운 신을 창조했다. 그러나 에르다들이 창조한 것들은 모두 파괴하려 했다. 이렇게 해서 사신(邪神)들이 탄생했다. 신과의 전투에서 패배한 많은 사신들은 현재 마계나 다른 장소에 봉인되어 있다.`;

const spiritKings = [
  { element: "땅(地)", name: "다오" },
  { element: "물(水)", name: "마리드" },
  { element: "불(火)", name: "이프리트" },
  { element: "바람(風)", name: "디지니" },
  { element: "빛(光)", name: "마라이카" },
  { element: "어둠(闇)", name: "디아아로스" },
];

const animalKingsNote = `에린의 동물은 모두 7기둥의 "동물의 왕" 중 하나, 혹은 복수의 혈통을 이어받고 있다. 동물의 왕들 중에는 지금도 살아 있는 자도 있다. 또한 "운명의 대정령" 아리안로드가 존재한다고 전해진다.`;

const dimensions: DimensionItem[] = [
  {
    name: "물질계",
    icon: "🌍",
    content: `인간이 사는 세계로 인간계라고도 불린다. 물건이 형태를 가질 수 있는 장소이며, 에린의 거의 모든 창조물은 이 물질계에 존재한다. 물질계에 사는 것은 반드시 수명을 가지며 전생을 반복한다. 전생의 기억을 유지하는 경우는 드물며, 같은 종족으로 전생하는 경우가 많다.`,
  },
  {
    name: "유계(幽界)",
    icon: "👁️",
    content: `육체가 없는 것들, 반신들의 세계로, 신계와 물질계 사이에 있다고 전해진다. 정령이라고도 불리며, "정령의 왕"과 "동물의 왕", 거인들이 깃들어 있는 세계이기도 하다.\n\n유계는 천국이나 지옥 등 이른바 사후 세계의 장소이며, 죽은 자들의 혼이 머물다가 정화된 후 물질계로 돌아간다. 다만, 사람에게 도움을 받은 혼이 은혜를 갚기 위해 사람으로 전생하는 경우도 있다고 전해진다.`,
  },
  {
    name: "신계(神界)",
    icon: "☀️",
    content: `가장 높은 차원에 존재하는 세계. 신들이 사는 세계이며, 사람의 몸으로 신계를 방문하는 것이 불가능하지는 않지만 상세는 불명이다.`,
  },
  {
    name: "마계(魔界)",
    icon: "🔥",
    content: `사신들과 많은 마족들이 봉인되어 있는 세계. 세계의 최저, 혹은 지하에 있다고 전해지며 실체는 잘 알려져 있지 않다. 다만 마계에서 마족들이 현세에 나타날 수 있고, 물질계와 유계와 이어져 있다는 것은 사실이다.`,
  },
  {
    name: "이세계(異世界)",
    icon: "🌀",
    content: `에린 이외의 세계에서 온 자들도 소수이지만 현재 마계에 존재하고 있다. 사신이나 마족, 아시안, 디에바, 베스티아, 레물레스 등이 있다. 이들 이세계에서 온 자들을 외적 의미를 담아 "이방자"라고 부른다.\n\n그러나 현재는 에린의 인간에게 협력적인 자도 나타나, 이러한 사람들을 다른 이방자와 구분하기 위해 "내방자(來訪者)"라고 부른다.`,
  },
  {
    name: "현대 지구",
    icon: "🌐",
    content: `에린에 오는 이방자 중 가장 눈에 띄는 그룹이 "현대 지구인"이라 불린다. 다른 이세계에서 에린에 오는 이방자들도 있지만, 현대 지구에서 오는 이방자가 가장 많다. 이 이유는 잘 알 수 없다.`,
  },
];

const regions: RegionItem[] = [
  {
    name: "에린딜 대륙 서방",
    href: "/erindil-west",
    content: `약 800만 평방킬로미터의 광대한 지역. 서방 남쪽은 빙원, 북동쪽은 사막이 넓게 분포한다. 신들에 의해 여러 차례 큰 변혁을 받았기 때문에, 파상의 기복을 가진 광대한 저지가 중앙 부근에 펼쳐진다.\n\n목초 성장이 빠르며 소·말·염소 등의 목축이 왕성하다. 주요 농작물은 밀, 호밀, 귀리, 오트밀, 감자 등이다.\n\n문명은 지구의 15~16세기 유럽에 가까우며, 마법이 당연하게 사용되고 황야에는 위험한 몬스터가 존재한다. 대륙 각지에 신화·전설 시대의 유적이 남아 있으며, 유적의 유물과 네바프의 연금술 덕분에 일부 기술 레벨은 18세기 수준에 달한다.\n\n현재는 신성 번스터 제국, 에를랑 왕국, 파리스 동맹, 키르디아 공화국의 4국 세력이 크다.`,
  },
  {
    name: "에린딜 대륙 동방",
    href: "/eastern-world",
    content: `에린딜 서방의 동쪽, "무한의 사막"을 넘어 도달하는 땅. 진보한 문명과 광대한 영토를 가진 세리아 대제국, 유목민들의 나라 타루타루·한국, 동방 극동의 섬나라 다이와 군도국의 3국이 알려져 있다.`,
  },
  {
    name: "알디온 대륙 동방",
    href: "/ardion",
    content: `에린딜 대륙 서방에서 넓은 바다를 건너 도달하는 알디온 대륙의 동방 지역. 에린딜과는 다른 독자적인 두 종족 — 자아를 가진 기계 엑스마키나와 신룡왕 세피로스가 창조한 드라고넷이 거주한다.\n\n전설의 영웅 울프릭이 건국한 페리타니아 통일제국의 후신인 페리타니아 합중국이 중심에 있으며, 7왕국의 후예들이 패권을 다투고 있다. 「대붕괴」 이후 혼란 속에서 각 세력이 재편 중이다.`,
  },
  {
    name: "아스란",
    href: "/arslan",
    content: `알디온 대륙의 서쪽에 펼쳐지는 격리된 지역. "신검의 여신" 그로비스와 "방위의 신" 세르노가 두 기둥의 신이 영원한 전쟁을 벌이고 있다.`,
  },
  {
    name: "마쥬라니카 대륙",
    href: "/majelanica",
    content: `에린딜 대륙 동방 세계의 남방에 있는 대륙. 자연이 풍요로운 대지에서 다양한 동물, 마수, 영수가 서식하고 있다.`,
  },
];

const otherRegions: { name: string; content: string; href?: string }[] = [
  { name: '"해저 도시" 카칼',    content: '에린딜와 마쥬라니카 사이의 해저에, 샤히긴이 사는 해저 도시가 있다.', href: "/kakkar" },
  { name: '"원환의 거리" 티르밀리', content: '탈탈·한 제국의 황야를 훨씬 넘어 북쪽에 있다고 전해지는 도시. 요정들이 사는 환상적인 도시가 있다고 전해진다.', href: "/tilmiriy" },
  { name: '"실낙원" 테니아',    content: '공중에 떠 있던 아름다운 정원이었지만 마계에 추락했다. 추락의 이유는 불명이다.', href: "/tenia" },
  { name: '"영원의 도시" 아발론',  content: '유계에 있는 거리의 하나로, "신의 부름을 받은 자"들이 살며 이방자를 맞이하고 있다.', href: "/avalon" },
  { name: '노탄디 대륙',           content: '에린딜 대륙의 남방에 있는 대륙이지만, 이름 이외에는 알려지지 않았다.' },
];

const countries: CountryItem[] = [
  {
    name: "에를랑 왕국",
    tag: "에린딜 서방 최고(最古)의 왕국",
    color: "#2A5F9E",
    accent: "#D4E4F7",
    content: `에린딜 서방에서 가장 오래된 역사를 자랑하는 왕국. 성력 300년경에 건국된 것으로 알려져 있으며, 오랫동안 에린딜 서방의 정치적 중심 역할을 담당해 왔다.\n\n성력 1002년 파리스 동맹 성립 이후 4대국의 세력 균형이 유지되고 있으며, 전통과 권위를 상징하는 나라로 자리잡고 있다. 왕도 로그레스가 주요 도시이다.`,
  },
  {
    name: "신성 번스터 제국",
    tag: "서쪽 바다의 섬 제국",
    color: "#8B2D2D",
    accent: "#F5D5D5",
    content: `서쪽 바다의 핀지아스 섬을 거점으로 하는 제국. 성력 719년에 번스터 제국으로 건국되어, 999년에 신성 번스터 제국으로 개칭했다.\n\n동방 진출을 노리며 에를랑 왕국 등과 긴장 관계에 있다. 4대국의 세력 균형 아래 상호 견제 상태에 있으나, 최근 다시 개전을 준비하고 있다는 소문이 돌고 있어 긴장이 고조되고 있다.`,
  },
  {
    name: "파리스 동맹",
    tag: "신성 번스터 제국에 대항하는 연합",
    color: "#1A6B4A",
    accent: "#D5EDDF",
    content: `신성 번스터 제국의 침략에 대항하기 위해 맺어진 국가 연합. 성력 1002년에 성립됐다.\n\n성립 이후 국가 간의 큰 싸움은 거의 일어나지 않았지만, 최근 북방에서 마족의 대규모 침략을 받아 고전하고 있다. 이를 계기로 신성 번스터 제국이 다시 개전을 준비하고 있다는 소문도 돌고 있다.`,
  },
  {
    name: "키르디아 공화국",
    tag: '"무한의 사막"에 건국된 공화국',
    color: "#8B6914",
    accent: "#F5E8C8",
    content: `광대한 "무한의 사막"에 건국된 공화국. 성력 996년에 건국됐다.\n\n사막을 기반으로 독자적인 문화와 정치 체계를 발전시켜, 4대국의 균형에서 독특한 위치를 차지하고 있다.`,
  },
];

const notablePlaces: NotablePlace[] = [
  {
    name: "다브랄",
    nickname: "용병의 거리",
    content: `다니스 산맥 남서의 숲 속에 있는 거리. 100여 년 전에 마물과의 전투에서 함락된 폐허를 이용하여 17년 전에 건국된 새로운 거리이다.\n\n현재의 수장은 필 루스타라는 휴린 남성. 필이 일으킨 용병 중개 사업의 규모가 커지면서 점차 사람이 모여들어 다브랄은 하나의 거리가 되었다.`,
  },
  {
    name: "로다니아",
    nickname: "돌의 거리",
    content: `"무한의 사막"의 서쪽, 루디온 산맥 산기슭에 있는 도시 국가. 수장은 국왕 에네토 3세라는 휴린 남성이다.\n\n이 땅에서만 채굴되는 불가사의한 빛을 내는 로다니아 돌을 수출하는 것으로 성립하며, 황무지임에도 결코 가난하지 않다. 로다니아 돌 외에도 희귀한 광석이 채굴된다고 알려져 있다.`,
  },
  {
    name: "베르베",
    nickname: "마도(魔都)",
    content: `역병에 싸인 대부해에 떠 있는 트리 섬의 유일한 도시. 이 거리에 가기 위해서는 맞은편 "수호의 거리" 마제스타에 있는 신전의 전송 장치를 사용해야 한다.\n\n일찍이 "땅의 시대"에 마족들의 요새였기 때문에, 현재도 이 땅에 돌아오는 마물이나 마족이 적지 않다. 수년 전에도 큰 싸움이 일어났으며, "수호자"가 항상 주재하여 경계 태세를 유지하고 있다. 현재의 감시자는 리토니우스라 불리는 버나 남성(33세)이 맡고 있다.`,
  },
  {
    name: "틴다지엘",
    nickname: "옛 도읍(古の都)",
    content: `다니스 산맥의 거의 중앙에 위치하는 폐허. "바람의 시대"에 존재했던 왕국의 왕도였다고 전해진다.\n\n일찍이는 아론 산에 있는 전송 장치에서만 이 거리에 갈 수 있었지만, 현재는 "유적의 거리" 라인에서 이어지는 지하 통로가 발견되어 많은 모험자가 이 폐허에 도전하고 있다.`,
  },
  {
    name: "리아난테",
    nickname: "방랑의 거리",
    content: `안개와 함께 나타나고, 안개가 개이면 사라져 버리는 환상의 거리. 신들이 남긴 무구——신구(神具)가 이 거리에 안치되어 있다고 전해지며, 리아난테를 찾는 모험자는 많다.\n\n그러나 아직 상세한 것은 알려지지 않으며, 이 거리에서 돌아온 자도 없다.`,
  },
  {
    name: "유카리 왕국",
    nickname: "폐쇄된 소왕국",
    content: `파리스 동맹의 북방에 있는 소왕국. 7개의 도시로 구성되어 있으며, 각각 7대 신의 이름을 따온 명칭을 가진다. 7개 도시: 아케(왕도)·브리간디알(문의 거리)·다그데스·다난베르그·아에마디아·고바논루·그라인.\n\n왕도 아케는 외부인을 받아들이지 않는 것으로 유명하다. 입성하려면 "문의 거리" 브리간디알에 설치된 거대한 문에서 허가된 자만이 들어갈 수 있다.\n\n최근 "마족 패트롤"에 얽힌 음모에 유카리 왕국의 신관장이 관여했다는 것이 발각됐다. 그 후임으로 딕시라는 여성이 신관장으로 승격됐다.`,
  },
  {
    name: "라프 대동굴",
    nickname: "연금술의 총 본산",
    content: `"침묵의 빙원"과 경계에 있는 코나카타 산맥의 지하에 펼쳐지는 대동굴에는 네바프들이 구축한 거리가 있다.\n\n"땅의 서청"에 의해 생겨난 동굴이라고 전해지며, 다양한 종류의 광물 자원을 채굴할 수 있고 연금술이 왕성하다. 130세를 넘은 옴가라는 네바프 남성 아래 많은 네바프들이 연금술 연구에 힘쓰고 있으며, "연금술의 총 본산"이라고 불린다.`,
  },
  {
    name: "루디온 산맥",
    nickname: "에린딜의 등줄기",
    content: `"안개의 숲"과 "무한의 사막" 사이에 솟아 있는 큰 산맥. 에린딜 북부를 남북으로 종단하고 있어 "에린딜의 등줄기", 혹은 "다난의 등줄기"라고도 불린다.\n\n로다니아 돌의 산지인 "돌의 나라" 로다니아나, 고산 지대에서만 자라는 라피테르 과수원을 가진 "상림의 거리" 폰티엘 등의 소국이 산기슭과 산복에 존재한다. 남방에는 고대 용 "흰" 케테르가 사는 영원의 숲이 있다.`,
  },
  {
    name: "디아스론드",
    nickname: "성도(聖都)",
    href: "/diasrond",
    content: `에를랑 왕국 동쪽, 무한의 사막 남단에 위치하는 독립 도시 국가. 에린딜 서방 7대 신 신앙의 총본산으로, 성벽과 6개의 탑으로 이루어진 육각형 요새 도시이다.\n\n지도자는 제62대 교황 팔·밀리티아스(휴린 여, 23세). 역대 최연소 교황으로 알려져 있다. 신성 기사단과 비밀 집행 기관 "긴 발톱(라봐르다)"을 보유하며, 어떠한 세력도 침범할 수 없는 성역으로 여겨진다.`,
  },
  {
    name: "안개의 숲",
    nickname: "스피아르 엘다난의 땅",
    href: "/mist-forest",
    content: `에린딜 북부, 파리스 동맹 북쪽에 펼쳐지는 광대한 숲. 코나카타 산맥과 힐레디온 산맥 사이에 위치하며, 연중 짙은 안개로 뒤덮여 있다. 스피아르 엘다난이라 불리는 엘다난 씨족의 거주지이다.\n\n숲 유일의 도시 스피아르존에는 90%가 스피아르 엘다난으로 이루어진다. 여왕 에아르핀(엘다난 여, 909세)의 통치 아래 북쪽 마군의 동향을 감시하는 역할을 담당한다. 스피아르존 외곽에는 돌아오지 못한 자들을 기리는 "돌아올 자들의 언덕"이 있다.`,
  },
  {
    name: "네오·다이나스토카발",
    nickname: "반신전 비밀 결사",
    href: "/dynastokabal",
    content: `에린딜 서방에서 활동하는 비밀 결사. 신전 조직의 악폐와 부패를 폭로하고 개혁을 촉구하는 것을 공식 목적으로 내세우고 있다.\n\n대수령(신원 불명)을 정점으로 하는 피라미드형 조직 구조를 지닌다. 연금술로 동식물의 특성을 이식한 인공 인간 "괴인(怪人)"을 보유하며, 신전 비방 팸플릿 배포·정보 공작·인재 모집 등 다양한 수단으로 활동한다.`,
  },
];

const timeline: TimelineEvent[] = [
  { year: "태초",    events: ['"불의 시대" 시작'] },
  { year: "200년경", events: [
    '"세인"이라 불렸던 전사와 마족에 의한 대규모 전쟁 발발',
    '신들, 무지개의 세피로스를 세인의 길에 따라 보냄',
    '세피로스, 에린딜 서방 수호 역할과 이명("신령")을 소하르에게 넘김',
    '"성도" 디아스론드 건설',
    '"신령" 소하르, 에린딜에 출현',
    '에린딜에 마족 대세력 침공',
    '"장폐의 도구" 집결',
    '마수 크루왓하 발생 확인',
    '넬수스 강 역류로 피아소가 수몰 상태에 빠짐',
  ]},
  { year: "300년경", events: ['에를랑 왕국 건국'] },
  { year: "370년경", events: ['에를랑 왕국과 하트파스 왕국의 전쟁 (사자공子전쟁)'] },
  { year: "400년경", events: ['그란펠덴 왕국 건국'] },
  { year: "500년경", events: [
    '에를랑 왕국의 중원 출병',
    '파리스 왕국 건국',
    '그란펠덴 왕국, 파리스 왕국에 패배하여 종속국이 됨',
    '제1차 길마드 전쟁',
    '에를랑 왕국과 파리스 왕국의 전쟁 (파리스 전쟁)',
    '파리스 왕국 패배',
  ]},
  { year: "600년경", events: [
    '에를랑 왕국과 "돌의 거리" 바르데르의 전쟁',
    '"돌의 거리" 로그아니아 건설',
    '"기계의 거리" 카난 건설',
  ]},
  { year: "700년경", events: ['에를랑 왕국의 각 지역이 자립하기 시작'] },
  { year: "705년",   events: ['라인 왕국 건국'] },
  { year: "719년",   events: ['번스터 제국 건국'] },
  { year: "722년",   events: ['제2차 길마드 전쟁'] },
  { year: "750년경", events: ['"마술 도시" 파리아스, 대지진으로 붕괴'] },
  { year: "799년",   events: ['번스터—휴린 일족, 마물 아스트로테에 의해 침략을 당함'] },
  { year: "813년",   events: ['"물의 거리" 그란=베르 건설'] },
  { year: "887년",   events: ['마술사 호트리, 금서 "두마의 서"의 일부를 발견'] },
  { year: "898년",   events: [
    '마물(바람에 의한 저주)이 에린딜에 휘몰아침',
    '에린딜 각지에서 마물·마족 목격 정보 증가',
  ]},
  { year: "921년",   events: ['"현자의 거리" 엘크레스트 건설'] },
  { year: "923년",   events: ['바람의 마지막 결전'] },
  { year: "949년",   events: ['"유적의 거리" 두르가르, 번스터 제국에 복종'] },
  { year: "971년",   events: ['루아당의 언덕, 프로렌 길마드 지방에서 확인됨'] },
  { year: "984년",   events: [
    '엘크레스트 칼리지 건설, 마족에 의해 점령됨',
    '"마왕의 유산서"가 발견되어 엘크레스트 칼리지 보물고에 수납됨',
    '"공중 도시" 테니아 건설',
  ]},
  { year: "992년",   events: ['마수 크루왓하 대량 발생, 마물 패트롤 토벌 시행'] },
  { year: "996년",   events: ['키르디아 공화국 건국', '"이중의 거리" 다브를 건설'] },
  { year: "997년",   events: [
    '모험자 알바르트·테니아에 의해 "공중 도시"가 재발견됨. 알바르트의 이름을 따 "공중 도시"에 테니아의 이름이 붙여짐',
    '마수 크루왓하 대량 발생, 마물 패트롤에 의해 토벌됨',
    '"신령" 소하르에 의한 "서청"이 미연에 방지됨 (최초의 재앙)',
  ]},
  { year: "998년",   events: [
    '마수 크루왓하·크루왓하 발생 확인',
    '"공중 도시" 테니아, "성도" 디아스론드에 의해 영구 중지 선언',
  ]},
  { year: "999년",   events: [
    '번스터 제국, 신성 번스터 제국으로 개칭',
    '신성 번스터 제국, 동방으로의 침공 시작',
  ]},
  { year: "1002년",  events: ['파리스 동맹 결성', '한마르비르의 묘, 자태를 드러냄'] },
  { year: "1004년",  events: [
    '영웅 가이아에 의한 전란 (마족 전쟁)',
    '파모루 왕 에루사핀데르의 부활이 저지됨',
    '에를랑 왕국 왕녀 아나 암살 미수 사건',
    '에를랑 왕국 국왕 엘13세 암살 미수 사건',
    '"공전의 신" 크롬그루르의 부활이 저지됨',
  ]},
  { year: "1005년",  events: ['"마왕" 베르베아이, 전투 동맹을 맺음'] },
  { year: "1006년",  events: [
    '신성 번스터 제국, "성도" 디아스론드의 "비밀 결사"가 다이나스타파르에 의한 "장폐의 도구" 탐색을 활성화함',
    '"신령" 소하르에 의한 "서청"이 미연에 방지됨 (최초의 재앙)',
    '엘크레스트 칼리지, 마족에 의해 재점령됨',
    '"공중 도시" 테니아 재건설',
  ]},
  { year: "1007년",  events: [
    '"에린딜의 방위선" 베넷, 신들의 명에 의해 서방 알디온 대륙으로 향함',
    '"크란벨의 풍천사" 쥬리오·코코로나, 행방불명',
    '신성 번스터 제국 황제 제단에 대한 암살 미수 사건',
    '파리스 동맹 그란펠덴 왕국, 북방에서 마족의 대침공을 받음',
  ]},
  { year: "1009년",  events: [
    '그란펠덴 왕국 국왕 여왕 에르레티스 암살 미수 사건',
    '포스타스 (만플레드)에 의한 "서청"이 미연에 방지됨',
    '엘가르 길마드에서 화산 아래 기온 급저하, "붉은" 게브라의 죽음과 탄생이 확인됨',
    '에린에 현대 지구인이 대거 유입됨 ("대혼란")',
    '그란펠덴 왕국 국왕 코라드에 대한 암살 미수 사건',
  ]},
  { year: "1010년",  events: [
    '에를랑 왕국 왕도 로그레스에서 "전설의 스파이" 프렛차가 격퇴됐다는 소문',
    '디아스론드 신전이 "오카" 대학의 설립을 선언',
  ]},
  { year: "1012년",  events: [
    '"대학 도시" 오카, 대량의 마족들에게 침략당함',
    '에를랑 왕국 왕도 로그레스에서 마족 그시온에 의한 크리처 저지됨',
    '별의 알이 출현, 토벌됨',
  ]},
];

// ---- 공통 컴포넌트 ----

function Prose({ text }: { text: string }) {
  return (
    <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a" }}>
      {text.split("\n\n").map((p, i) => (
        <p key={i} style={{ marginBottom: 12 }}>{p}</p>
      ))}
    </div>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <h3 style={{
      fontFamily: "'Noto Serif KR', Georgia, serif",
      fontSize: "15px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      borderBottom: `2px solid ${color}`,
      paddingBottom: 6,
      marginBottom: 16,
      marginTop: 28,
      color: color,
    }}>{title}</h3>
  );
}

function Card({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E8E3DA",
      borderRadius: 8,
      padding: "16px 20px",
      marginBottom: 10,
      borderLeft: accent ? `4px solid ${accent}` : undefined,
    }}>
      {children}
    </div>
  );
}

// ---- 섹션 컨텐츠 ----

function IntroSection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        여기서는 이 월드 섹션에 수록된 퍼스널리티 및 로컬 데이터 읽는 법에 대해 설명한다.
      </p>
      <SectionTitle title="각지의 해설" color={color} />
      <Prose text={"「AR2E」의 무대가 되는 에린은 다양한 대륙, 지역, 국가, 도시가 존재한다.\n\n월드 섹션에서는 각 지역의 역사와 지리에 대해 설명하고, 또한 현재 존재하는 국가나 도시, 조직, 단체나 시설에 대한 상세를 수록하고 있다."} />
      <SectionTitle title="각 지역의 인물들" color={color} />
      <Prose text={"각 지역의 중요 인물을 픽업하여, 일러스트와 함께 소개하고 있다. 시나리오에 따라 의뢰인이나 협력자가 되거나, 혹은 적이 되는 경우도 있을 것이다."} />
      <SectionTitle title="인물 데이터 보는 법" color={color} />
      <div style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        {[
          { label: "이름",          desc: "그 인물의 이름." },
          { label: "세리프",        desc: "그 인물의 결정적인 세리프나 말버릇 등." },
          { label: "퍼스널 데이터", desc: "그 인물의 특징, 성별, 연령, 외견적 특징 등." },
          { label: "해설",          desc: "그 인물에 대한 해설." },
          { label: "신분서",        desc: "그 인물의 입장이나 지위." },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <span style={{ fontWeight: 600, color, minWidth: 100, flexShrink: 0 }}>▼ {item.label}</span>
            <span style={{ color: "#555" }}>{item.desc}</span>
          </div>
        ))}
      </div>
      <SectionTitle title="로컬 데이터와 에리어 데이터" color={color} />
      <Prose text={"「AR2E」에서는 다양한 서플리먼트를 도입함으로써, 에린딜 서방뿐만 아니라 알디온 대륙이나 마쥬라니카 대륙 등 다양한 지역을 무대로 플레이할 수 있다.\n\n에리어 데이터는 특정 지역을 무대로 했을 때 사용 가능한 데이터이다. 로컬 데이터는 에리어 데이터보다 더 좁은 지역이나, 특정 조직에 관한 데이터로, 그 로컬 데이터에서 다루는 지역 출신이거나 조직에 속한 캐릭터만이 사용 가능하다."} />
    </div>
  );
}

function HistorySection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        에린의 신화에서는, 현대의 "불의 시대"를 포함하여 5개의 시대로 나뉘어 세계가 창조됐다고 전해진다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {eras.map((era, i) => (
          <Card key={i} accent={color}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color }}>
                {era.name}
              </span>
              {era.note && (
                <span style={{ fontSize: "11px", background: color, color: "#fff", padding: "2px 8px", borderRadius: 10, fontWeight: 500 }}>
                  {era.note}
                </span>
              )}
            </div>
            <Prose text={era.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function GodsSection({ color }: { color: string }) {
  return (
    <div>
      <SectionTitle title="신들과 사신" color={color} />
      <Prose text={godsInfo} />
      <SectionTitle title="정령의 왕" color={color} />
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 14 }}>
        정령은 세계의 이치를 다스리는 6개 원소의 현현이다. 이 정령을 대표하는 것이 6기둥의 정령의 왕이다.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
        {spiritKings.map((sk, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: 4 }}>{sk.element}</div>
            <div style={{ fontSize: "15px", fontWeight: 600, fontFamily: "'Noto Serif KR', serif", color }}>{sk.name}</div>
          </div>
        ))}
      </div>
      <Card>
        <div style={{ fontSize: "13px", fontWeight: 600, color, marginBottom: 6 }}>운명의 대정령 — 아리안로드</div>
        <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.8 }}>{animalKingsNote}</div>
      </Card>
    </div>
  );
}

function StructureSection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        에린은 4개의 차원을 내포하며, 에린의 밖에는 이세계가 있다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {dimensions.map((dim, i) => (
          <Card key={i} accent={color}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: "20px" }}>{dim.icon}</span>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color }}>{dim.name}</span>
            </div>
            <Prose text={dim.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function RegionsSection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        에린에는 다양한 대륙과 지역이 있다. 여기서는 각각의 대륙과 지역을 설명한다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {regions.map((r, i) => r.href ? (
          <a key={i} href={r.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{
              background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8,
              padding: "16px 20px", borderLeft: `4px solid ${color}`,
              transition: "box-shadow 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color }}>{r.name}</div>
                <span style={{ fontSize: "11px", color: color, background: `${color}15`, padding: "3px 10px", borderRadius: 10, flexShrink: 0, fontWeight: 500 }}>국가 목록 →</span>
              </div>
              <Prose text={r.content} />
            </div>
          </a>
        ) : (
          <Card key={i} accent={color}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color, marginBottom: 8 }}>{r.name}</div>
            <Prose text={r.content} />
          </Card>
        ))}
      </div>
      <SectionTitle title="그 외의 대륙이나 지역" color={color} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {otherRegions.map((r, i) => r.href ? (
          <a key={i} href={r.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{
              background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8,
              padding: "12px 16px", display: "flex", gap: 14, justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", gap: 14, flex: 1 }}>
                <span style={{ fontWeight: 600, color, flexShrink: 0, fontSize: "13px", minWidth: 148 }}>{r.name}</span>
                <span style={{ fontSize: "14px", color: "#555", lineHeight: 1.7 }}>{r.content}</span>
              </div>
              <span style={{ fontSize: "11px", color, background: `${color}15`, padding: "3px 10px", borderRadius: 10, flexShrink: 0, fontWeight: 500 }}>자세히 →</span>
            </div>
          </a>
        ) : (
          <div key={i} style={{
            background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8,
            padding: "12px 16px", display: "flex", gap: 14,
          }}>
            <span style={{ fontWeight: 600, color, flexShrink: 0, fontSize: "13px", minWidth: 148 }}>{r.name}</span>
            <span style={{ fontSize: "14px", color: "#555", lineHeight: 1.7 }}>{r.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountriesSection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 8 }}>
        에린딜 서방에는 많은 국가가 존재하지만, 그 중에서도 강대한 4개국이 있다.
        성력 1002년의 파리스 동맹 성립 이후 국가 간의 큰 싸움은 거의 일어나지 않고 있지만,
        현재도 많은 국가 간 경계선 부근에서 마찰이 빈번히 일어나며 다양한 교섭이 이루어지고 있다.
      </p>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 24 }}>
        더욱이 북방에서 마족의 대규모 침략을 받은 파리스 동맹은 가까스로 쫓겨난 상태이며, 이를 계기로
        신성 번스터 제국이 다시 개전을 준비하고 있다는 소문도 있어 예단을 허용하지 않는 상황이다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {countries.map((c, i) => (
          <div key={i} style={{
            background: "#fff",
            border: `1px solid ${c.color}40`,
            borderLeft: `5px solid ${c.color}`,
            borderRadius: 8,
            padding: "18px 20px",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 700, color: c.color }}>{c.name}</span>
              <span style={{ fontSize: "12px", background: c.accent, color: c.color, padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>{c.tag}</span>
            </div>
            <Prose text={c.content} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "16px 20px", background: "#F7F4EE", borderRadius: 8, border: "1px solid #E8E3DA" }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600, color, marginBottom: 8, fontSize: "14px" }}>그 외의 국가들</div>
        <div style={{ fontSize: "14px", lineHeight: 1.85, color: "#555" }}>
          에린딜 서방에는 4대국 외에도 중요한 위치에 있는 도시가 있다. 특히{" "}
          <strong style={{ color: "#2a2a2a" }}>디아스론드</strong>는 에린딜 서방의 총 본산으로,
          어떤 나라도 무시할 수 없는 힘을 가지고 있다. 또한 역사학자들이 "대학 도시"라 부르는{" "}
          <strong style={{ color: "#2a2a2a" }}>오카</strong>도 다른 지역에는 없는 특이한 도시라 할 수 있다.
        </div>
      </div>
    </div>
  );
}

function NotableSection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        앞서 소개한 국가나 도시 이외에도, 에린딜 서방에는 특징 있는 국가나 지역이 존재한다.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {notablePlaces.map((p, i) => (
          <Card key={i} accent={color}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color }}>{p.name}</span>
                <span style={{ fontSize: "12px", color: "#888", fontStyle: "italic" }}>{`"${p.nickname}"`}</span>
              </div>
              {p.href && (
                <a href={p.href} style={{ fontSize: "12px", color, textDecoration: "none", whiteSpace: "nowrap", borderBottom: `1px solid ${color}50` }}>자세히 보기 →</a>
              )}
            </div>
            <Prose text={p.content} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function TimelineSection({ color }: { color: string }) {
  return (
    <div>
      <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#3a3a3a", marginBottom: 20 }}>
        에린딜 대륙 서방의 주요 역사적 사건을 연대순으로 정리한 연표이다.
      </p>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 80, top: 0, bottom: 0, width: 2, background: `${color}25` }} />
        {timeline.map((entry, i) => (
          <div key={i} style={{ display: "flex", gap: 0, marginBottom: 14, position: "relative" }}>
            <div style={{ width: 80, flexShrink: 0, textAlign: "right", paddingRight: 16, paddingTop: 5 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color, fontFamily: "monospace", whiteSpace: "nowrap" }}>
                {entry.year}
              </span>
            </div>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", background: color,
              flexShrink: 0, marginTop: 5, marginLeft: -5, marginRight: 10,
              border: "2px solid #F7F4EE", position: "relative", zIndex: 1,
            }} />
            <div style={{ flex: 1, background: "#fff", border: "1px solid #E8E3DA", borderRadius: 6, padding: "8px 14px" }}>
              {entry.events.map((ev, j) => (
                <div key={j} style={{
                  fontSize: "13px", color: "#3a3a3a", lineHeight: 1.7,
                  paddingLeft: entry.events.length > 1 ? 10 : 0,
                  borderLeft: entry.events.length > 1 ? `2px solid ${color}30` : "none",
                  marginBottom: j < entry.events.length - 1 ? 6 : 0,
                }}>
                  {ev}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- 메인 컴포넌트 ----

const ACCENT = "#5E3A1E";
const ACCENT_LIGHT = "#F5EDE0";

export default function ArianrodWiki() {
  const [activeId, setActiveId] = useState("intro");
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
      case "intro":     return <IntroSection color={ACCENT} />;
      case "history":   return <HistorySection color={ACCENT} />;
      case "gods":      return <GodsSection color={ACCENT} />;
      case "structure": return <StructureSection color={ACCENT} />;
      case "regions":   return <RegionsSection color={ACCENT} />;
      case "countries": return <CountriesSection color={ACCENT} />;
      case "notable":   return <NotableSection color={ACCENT} />;
      case "timeline":  return <TimelineSection color={ACCENT} />;
      default:          return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE", color: "#2a2a2a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />

      {mob && (
        <button
          onClick={() => setShowNav(!showNav)}
          style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: "13px", fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
        >
          {showNav ? "✕" : "☰"}
        </button>
      )}

      {/* 사이드바 */}
      <nav style={{
        width: 248,
        minWidth: 248,
        background: "#1E1812",
        color: "#D4CFC7",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        ...(mob ? {
          position: "fixed", top: 0, left: showNav ? 0 : -260, height: "100vh", zIndex: 999,
          transition: "left 0.3s ease", boxShadow: showNav ? "4px 0 20px rgba(0,0,0,0.4)" : "none",
        } : {}),
      }}>
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#7a7060", marginBottom: 6 }}>ARIANROD 2E · WORLD GUIDE</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.04em", lineHeight: 1.4 }}>아리안로드<br />월드 섹션</div>
        </div>
        <div style={{ padding: "10px 0", flex: 1, overflowY: "auto" }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "10px 20px", border: "none", cursor: "pointer", textAlign: "left",
                fontSize: "13px", fontWeight: activeId === item.id ? 500 : 400,
                background: activeId === item.id ? "rgba(255,255,255,0.07)" : "transparent",
                color: activeId === item.id ? "#E8E2D4" : "#A09888",
                borderLeft: activeId === item.id ? `3px solid ${ACCENT}` : "3px solid transparent",
                transition: "all 0.15s ease",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              <span style={{ fontSize: "15px", width: 22, textAlign: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <a href="/mythology" style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: "12px", color: "#9A7A18", textDecoration: "none",
            background: "rgba(154,122,24,0.08)", borderRadius: 6,
            padding: "7px 10px", marginBottom: 6,
            border: "1px solid rgba(154,122,24,0.2)",
          }}>
            <span>✨</span>
            <span style={{ fontWeight: 500 }}>신화 가이드</span>
          </a>
          <a href="/secrets" style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: "12px", color: "#9A7A18", textDecoration: "none",
            background: "rgba(154,122,24,0.08)", borderRadius: 6,
            padding: "7px 10px", marginBottom: 10,
            border: "1px solid rgba(154,122,24,0.2)",
          }}>
            <span>🔐</span>
            <span style={{ fontWeight: 500 }}>GM 비밀 정보</span>
          </a>
          <div style={{ fontSize: "12px", color: "#7a6040", fontWeight: 500 }}>
            아리안로드 위키
          </div>
        </div>
      </nav>

      {/* 메인 */}
      <main ref={mainRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT_LIGHT}80 100%)`,
          borderBottom: `3px solid ${ACCENT}25`,
          padding: mob ? "60px 20px 28px" : "40px 48px 36px",
        }}>
          <div style={{ maxWidth: 740 }}>
            <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: ACCENT, opacity: 0.65, marginBottom: 6 }}>WORLD SECTION</div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8, letterSpacing: "0.02em" }}>
              {activeNav.icon} {activeNav.label}
            </h1>
            <div style={{ width: 40, height: 2, background: ACCENT, borderRadius: 1, opacity: 0.5 }} />
          </div>
        </div>
        <div style={{ maxWidth: 740, padding: mob ? "24px 20px 60px" : "32px 48px 80px" }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
