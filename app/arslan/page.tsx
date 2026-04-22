'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8A2A1A";
const SIDEBAR_BG = "#1A0808";

const navItems = [
  { id: "overview",   label: "아스란 개요",    icon: "🏔️" },
  { id: "history",    label: "역사와 전쟁",    icon: "⚔️" },
  { id: "current",    label: "현재의 아스란",  icon: "🗺️" },
  { id: "elcarador",  label: "엘카라도르",     icon: "🏛️" },
  { id: "zan",        label: "잔·덴·바루아",   icon: "💀" },
  { id: "people",     label: "인물",           icon: "👤" },
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
      <Prose text={"알디온 대륙의 서쪽과 동쪽의 사이에는 커다란 절벽 산악이 가로막혀 있어, 그것을 넘는 것은 누구에게도 거의 불가능하다. 그러나 그 위에는 소신들의 세계가 펼쳐지고 있다."} />
      <SecTitle title="개요" />
      <Prose text={"알디온 대륙의 레이워르 왕국 이서에는 소국가군이 즐비해 있다. 그것보다 더 서쪽에는, 비룡의 날개로 비행 마법을 써도 넘을 수 없는 절벽 산맥이 이어진다. 그 절벽 절경의 아래가 아스란이라 불리는 지역이다. 그 크기는 알디온 대륙 동방의 기존 영역과 거의 같은 정도이나, 절경의 정상에는 바다가 없다. 알디온 서방 소국가군에서 잘 알려진 명소도 있다."} />
      <SecTitle title="신들의 전장" />
      <Prose text={"아스란은 타에 고립된 세계로, 신에게 이끌려 온 자 이외에는 다가설 수 없는 지역이다. 「검의 여신」 글로비스라는 소신과 「부패의 신」 세르노그라는 사신이 강림하고 있다."} />
      <SecTitle title="기후와 풍토" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8, marginBottom: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid #6A3A2A` }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>북부 (세르노그 영역)</div>
          <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>태양이 뜨는 것 없이 암흑의 대지가 펼쳐진다. 세르노그의 부패 기운으로 인해 암석이 부패 오염된 습지대가 많이 보인다. 악취 풍기는 늪지 및 오염 안개가 짙게 드리운 죽음의 땅이다.</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid #2A5A3A` }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>남부 (글로비스 영역)</div>
          <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>글로비스의 영역. 평원이나 구릉, 호수와 숲이 형성되는 밝고 온화한 땅. 「바람의 시대」 이전부터 이 땅에 오던 여러 종족이 아직도 많이 생존하고 있다.</div>
        </div>
      </div>
      <SecTitle title="아스란의 종족" />
      <Prose text={"아스란은 에린딜이나 알디온에 비해 휴린과 엘다난의 비율이 적고, 버나·두앙·네바프·필보르의 수가 많다. 또한 글로비스에게 의지하는 정령수, 글로비스 영역의 정령이나 용 등의 생물이 인간 사회와 섞여 살고 있다는 것이 도시에서도 특징적이다."} />
    </div>
  );
}

function HistorySection() {
  return (
    <div>
      <SecTitle title="아스란의 역사" />
      <Prose text={"아스란의 역사에 대해서는, 다른 세계에는 거의 알려진 것이 없다. 그러나 신의 역사로서 「바람의 시대」의 모습이 아이들에게 전해져 내려오고 있다."} />
      <SecTitle title="부패의 탄생" />
      <Prose text={"아직 신들이 땅에서 시 읊기를 이어가던 시대, 대지에서 선악의 싸움이 끊임없이 이어지고 있었다. 어떤 사신들이 신과 그 봉사자들이 사는 땅에 오염과 불정을 뿌리기 위해, 반신반인의 엘다난 중에서 주원 사신 세르노그를 탄생시켰다."} />
      <Prose text={"세르노그는 악한 낫으로 대지를 쪼개자 땅이 오염된 독의 늪으로 변하고, 세르노그의 숨결은 공기를 독으로 가득 채웠다. 세르노그의 봉사자들은 주원하는 꽃의 오염을 이용해 신들의 봉사자들을 차례차례 쓰러뜨렸다. 세르노그가 스스로도 세상의 끝으로 향해 들어갔다."} />
      <SecTitle title="두 기둥의 신" />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", margin: "8px 0 16px", borderLeft: `4px solid ${ACCENT}` }}>
        <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>글로비스와 세르노그</div>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>글로비스와 세르노그는 아스란의 땅을 둘로 나눴다. 아스란 남반부가 글로비스의 진지, 북반부가 세르노그의 진지였다. 진지의 경계를 정하기 위해, 아스란 중앙에는 깊은 협곡이 생겨났다. 글로비스는 수정의 다리를 걸쳐 적지를 공격하는 준비를 하고, 세르노그는 뼈의 다리를 걸쳐 적지를 넘었다. 두 다리 사이에, 어느 쪽의 영역도 아닌 중립 지대가 존재한다.</div>
      </div>
      <SecTitle title="대리 전사들" />
      <Prose text={"아스란에서는 세르노그 편의 마물들과 싸우는 것이, 글로비스 배하에 있는 인간들이다. 글로비스의 전사 중에는, 타 세계에서는 볼 수 없는 특수한 능력을 가진 전사들도 포함되어 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, marginBottom: 6, color: "#2a2a2a" }}>사로게트</div>
          <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>글로비스의 가호를 받아 싸우는 전사. 신성한 무기——신구를 소환하여 일시적으로 사용할 수 있다.</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, marginBottom: 6, color: "#2a2a2a" }}>루이네이터</div>
          <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>일시적으로 사악화하였거나, 혹은 사악화하지 않고 글로비스의 의지로 사악함에서 되돌아온 자. 신체에 깃든 기운을 힘으로 바꾸는 것이 가능하다.</div>
        </div>
      </div>
      <SecTitle title="아스란의 전쟁" />
      <Prose text={"글로비스와 세르노그는, 아스란의 땅을 둘로 나눠 갖고 있었다. 아스란 남반부는 글로비스의 진지로 북반부는 세르노그의 진지였다. 진지의 경계를 정하기 위해, 아스란 중앙에는 깊은 협곡이 생겨났다. 글로비스는 자신의 혈전으로 아스란을 새빨갛게 물들이기까지 싸우겠다고 고함을 질렀고, 세르노그는 두 진지의 사이를 세상 끝으로 가득한 안개가 다할 때까지 무너뜨릴 것이라고 목소리를 높였다."} />
      <Prose text={"그들은 서로 자신의 배하가 되는 봉신들을 낳아, 서로 영역을 주고받는다. 이윽고 세계에는 「바람의 청청」이 일어나, 두 기둥의 신들만은 아스란에 남겨진 채 마물들은 마계로 추방됐다. 마물들은 글로비스 편의 전장 대부분에서, 인간에 의해 사악화하게 되는 자들이 전투로 인해 늘어나면서 전쟁은 마계와 가까운 경계선 전투로 변해 갔다."} />
      <SecTitle title="구명장 (九冥将)" />
      <Prose text={"세르노그를 섬기는 마물과 싸우는 것이, 글로비스 배하의 인간들이다. 세르노그 세력에서 조직적으로 글로비스 세력에 대항하기 위해, 세르노그의 총 9명의 무장——구명장이 존재한다. 그 리더적인 존재는 「지배자」 에크·카지슈, 「어둠의 전멸자」 키신, 「불의 격자」 카·아치, 「귀의 전멸자」 라고스타 등이 알려져 있다."} />
    </div>
  );
}

function CurrentSection() {
  return (
    <div>
      <SecTitle title="아스란의 현재" />
      <Prose text={"아스란에서는 현재도 여신과 사신의 전쟁이 이어지고 있다. 두 신은 「바람의 시대」부터 이 아스란에서 싸워왔으며, 그 국경선은 지금도 변함없다. 각각의 영주에게는, 배하가 되는 인간이나 혹은 마물의 도시나 요새가 존재한다. 아스란의 거주자 대부분은, 글로비스 또는 세르노그에게 이끌리거나, 다른 세계에서 이끌려 온 자의 자손이다."} />
      <SecTitle title="글로비스 령" />
      <Prose text={"아스란의 남반부를 차지하는 글로비스 령은, 「검의 여신」이라 불리는 글로비스의 영향으로, 평원이나 구릉, 호수와 숲이 형성되는 생기 있는 대지다. 「바람의 시대」 이전부터 이 땅에 오던 여러 종족이 아직도 많이 생존하고 있다. 그 때문에 에린딜이나 알디온에 비해 휴린과 엘다난의 비율은 적고, 버나·두앙·네바프·필보르의 수가 많다. 또한 글로비스에게 의지하는 정령수나 정령, 용 등의 생물이 인간 사회에 섞여 살고 있는 것이 도시에서 특징적이다."} />
      <SecTitle title="글로비스의 전력" />
      <Prose text={"아스란에 초대받은 인간은, 기본적으로 마대 세력과 싸우는 전사다. 그중에서도 특수한 것은 사로게트라 불리는 전사들로, 글로비스의 신성한 무기를 사용하는 자들이다. 루이네이터라 불리는 사악화에서 돌아온 자들도 포함되며, 이를 제외한 다른 종족, 워리어나 마이즈나 메이지 등이 없는 것은 아니다. 오히려 아스란에서는 그 과반수를 인간이 차지하고, 인간 사회가 크게 늘어나 있다. 도시를 형성하는 일반 시민들은, 상업에 관계하는 인간들보다는 의식이나 식료품의 생산에 관계하는 자들이 많이 모여 있어, 전원 다수가 생활 기반을 유지하기 위한 비전투원의 비율이 늘어나고 있다."} />
      <SecTitle title="글로비스의 도" />
      <Prose text={"글로비스 령에는 평원이나 구릉, 호수와 숲의 곳곳에 마을이나 촌락이 형성되어 있다. 그 중에서도 큰 도시는 「홍련신전」 엘카라도르와 그 주변에 생겨난 도시다. 「홍련신전」은 글로비스가 거처를 두는 대신전이며, 엘카라도르는 수도 기능을 담당한다."} />
      <SecTitle title="세르노그 령" />
      <Prose text={"아스란 북반부를 차지하는 세르노그 령은, 「부패의 신」이라 불리는 세르노그의 영향으로, 황무지 같은 암석이나 부패 오염 늪지대가 많이 보이는 죽음의 대지다. 볼노이, 또는 토트라라 불리는 암석이나 그 대지의 질병은 세르노그에 이끌린 사람들이 사악화하거나, 홍당무, 오우가, 트롤, 고블린, 밴파이어, 파모르, 하그와 같은 마물들이다."} />
      <SecTitle title="세르노그의 전력" />
      <Prose text={"마물들은, 과거 인간이 지녔던 영성을 보유하기 때문에, 원시적이면서도 집단 사회를 형성하는 경우가 많다. 더불어 글로비스 령의 전력에 대항하기 위해, 세르노그의 총 아래 조직적인 군사 형태를 형성하고 있다. 그 리더적 존재는 9명의 무장——구명장이 있다. 또한 마물이나 사악화한 집단에 의한 군단도 구성되어 있다."} />
      <SecTitle title="다른 나라와의 관계" />
      <Prose text={"알디온 대륙의 서쪽에 넓은 아스란은, 절벽 산맥 위에 있는 지역이다. 그 때문에, 어느 지역과도 교역을 하지 않는다."} />
      <SecTitle title="전설의 신구를 소환한 자" />
      <Prose text={"세계를 파괴할 수 있는 3가지 신구가 있다. 어딘가에 그 이름과 물어의 결을 맺은 에르다의 하나인 것이 이 중의 하나의 신구를 소환했다. 글로비스와 싸우겠다고 맹세한 에르다를 두려워한 에르고의 전사들은, 이 3개의 신구의 소환에 관련하는 기술을 아는 자를 찾아 보고 있으나, 아스란 전역에서 빈틈없이 소문이 퍼져있는 것이 믿어지지 않는다고 한다."} />
    </div>
  );
}

function ElcaradorSection() {
  const districts = [
    { name: "클라나프라냐 (紅蓮神殿)", desc: "구릉 위에 건설된 신전과 그 주변 일대를 가리키는 지역. 글로비스가 사는 신사이며, 원로원이 설치되는 정치적 중심지이기도 하다. 또한 전사를 모집하는 거점이 되고 있으며, 신관들이 거처하는 종교적 성지이기도 하다. 그 경내는 하나의 구가라고 말해도 좋을 정도의 넓이를 자랑한다." },
    { name: "피에르비 층구", desc: "구릉 앞쪽을 따라 펼쳐지는 상업 구역. 많은 단조 공방이 모이는 공업 지대가 되고 있다. 검을 두들기고 불을 치는 글로비스를 신앙하는 아스란의 민들에게는, 단조 공방은 신성한 직업으로 여겨지고 있다. 그 때문에 신사 가장 가까운 중심부에 단조 공방이 집중하고 있다." },
    { name: "푸트라이 층구", desc: "공업 구역을 에워싸, 구릉의 주변에 넓어지는 주거 지역. 도시 생산에 관계하는 자들이 거주하고 있다. 상업에 관계하는 인간들보다는, 의식이나 식료품의 생산에 관계하는 자들이 많이 모여 있어, 전원이나 밭이 펼쳐지고 있다." },
    { name: "트레이치 층구", desc: "도시 외곽에 해당하는 지역. 외곽으로부터 도시를 지키는 전사나, 전투나 수렵을 위해 도시를 자주 떠나는 경우가 많은 자들이 살고 있다. 도시 외곽 부분의 부분에 반드시 여러 감시 초소가 세워져 있으며, 곳곳에 망루의 역할을 다하는 높은 건축물이 세워져 있다." },
  ];
  const orgs = [
    { name: "엘카라도르의 원로원", type: "정부 조직", base: "클라나프라냐", leader: "「회안의」 브라드렌 (의장)", content: "글로비스의 영광의 나라를 운영하기 위한 원로원. GM이 설정하거나 PC가 어드벤처의 의뢰나 명령을 받아 조직과 연결되게 된다. 여기에 소개된 조직은, PC가 코넥션으로 취득할 수 있다. 도시 선거에 의해 선출된 88인의 의원이, 도시 운영에 관련되는 것을 합의해 결정한다. 의장에 선출되는 것은 도시의 공적을 올린 공헌자가 된다." },
    { name: "십삼신장", type: "군사 조직", base: "클라나프라냐", leader: "「유신장」 클라스나야 (필두)", content: "글로비스의 직속 정예 전사들. 아스란에서 싸우는 용맹한 전사들의 조직으로, 전장을 비롯해 각지의 다양한 장면에서 활약하고 있다. 勇·仁·義·礼·智·信·忠·孝·道·愛·節·敬을 아우르는 13가지 덕목의 이름을 각 시대에서 가장 유력한 자가 명칭으로 불린다." },
    { name: "이스트리비테리", type: "군사 조직", base: "클라나프라냐", leader: "십삼신장", content: "아스란에서 글로비스를 섬기는 전사들의 조직. 아스란의 모든 장소가 전쟁터라는 것이 기본적 전제로, 전사들은 언제나 세르노그의 마물들과 싸울 준비를 하고 있다. 큰 전투 행동이 일어나는 경우에는, 신전에서 군집이 이루어진다." },
    { name: "오호트니키", type: "개인 상회", base: "피에르비 층구", leader: "이우할바", content: "아스란 이외의 각지를 이동하는 여행 상단 중 하나. 도란·베레렌을 포함해 이 세계에서 물자를 운반하고 있다. 오호트니키의 상인들은 미자나·시프도 잘 없어, 자신들이 무장해 판매를 이행한다." },
    { name: "신구 공방 오그니", type: "개인 공방", base: "피에르비 층구", leader: "이슈·카크", content: "엘카라도르의 공방을 거느리는 단조 공방. 화대 정령 이슈·카크에 의해 경영되고 있다. 오래된 고대 이전에도 엘카라도르에 존재했다는 화대 정령 이슈·카크가 공방을 운영하고 있으며, 그 공방을 방문하는 자에게 여러 조언도 해 준다." },
  ];
  return (
    <div>
      <SecTitle title="엘카라도르 (エルカラドル)" />
      <Prose text={"아스란의 남부에 있는 인간들의 도시. 「검의 여신」 글로비스가 거처하는 땅으로, 글로비스 령의 수도로 여겨지고 있다. 도시는 아스란 남부의 작은 구릉 위에 건설되어 있다."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { label: "인구", value: "2만인" },
          { label: "통치 형태", value: "원로원 합의제" },
          { label: "수호신", value: "글로비스 (守護神)" },
          { label: "종교", value: "글로비스 신앙·칠대신선 신앙" },
          { label: "기후", value: "아한대 기후" },
          { label: "특산품", value: "무기 품목" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: ACCENT, marginBottom: 8 }}>종족 구성</div>
        {[
          { race: "두앙",   pct: 20, color: "#4A3A8A" },
          { race: "네바프", pct: 18, color: "#4A8A3A" },
          { race: "버나",   pct: 18, color: "#8A3A4A" },
          { race: "필보르", pct: 16, color: "#6A8A2A" },
          { race: "휴린",   pct: 14, color: "#8A4A2A" },
          { race: "엘다난", pct: 9,  color: "#2A6A8A" },
          { race: "기타",   pct: 5,  color: "#888" },
        ].map(item => (
          <div key={item.race} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 52, fontSize: 12, color: "#555", textAlign: "right", flexShrink: 0 }}>{item.race}</div>
            <div style={{ flex: 1, background: "#E8E3DA", borderRadius: 3, height: 13, overflow: "hidden" }}>
              <div style={{ width: `${item.pct}%`, background: item.color, height: "100%", borderRadius: 3 }} />
            </div>
            <div style={{ width: 34, fontSize: 12, color: "#888", flexShrink: 0 }}>{item.pct}%</div>
          </div>
        ))}
      </div>
      <SecTitle title="도시 구역" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {districts.map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 6 }}>{d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginTop: 8, marginBottom: 20 }}>
        {[
          { name: "클라나프라냐", jp: "クラナプラーニャ", desc: "엘카라도르의 상징이자 신의 신전. 홍련신전이라 불린다. 아스란이 만들어진 때 글로비스가 최초에 위치를 정한 성지로, 그 현재는 종교적 성지인 동시에 지배자의 자리가 되는 신전이기도 하다. 세계와 아스란을 이어주는 관문도 신전 내에 있어, 아스란에 초대된 인간들은 이 곳에 도착하게 된다." },
          { name: "시발바르", jp: "シバルバー", desc: "트레이치 층구에 건설된 두꺼운 건축물. 지상 10층, 지하 9층의 주변이 위험한 인물들을 가두는 감옥으로, 마법의 봉인이 깔려있어 탈출은 거의 불가능. 세르노그의 기운을 받아 사악화한 인간이나 마물을 봉인해 두는 지하층 입구를 마라야가 관리하고 있다." },
          { name: "선술집 피야트니짜", jp: "居酒屋ピャートニッツァ", desc: "피에르비 층구에서 영업하는 선술집. 7명의 필보르 형제들이 공동으로 운영하고 있으며, 많은 모험자들이 단골이다. 가게는 다층 구조로 이루어져 있어, 3차원적인 진로의 ᄒᆞ은하한 내부에 놀라운 기괴한 의상을 하고 있다. 정보 교환이나 의뢰 수주의 장소로도 이용된다." },
          { name: "천마의 샘", jp: "天馬の泉", desc: "엘카라도르의 구릉 아래 깊은 숲 안에 있는 샘. 정령들 사이에서 화제가 되고 있는 다양한 정보들이 오가는 곳. 인간들이 접근하는 것은 금지되어 있지 않지만, 엘카라도르 거주자들 사이에서는 영감과 신탁을 받을 수 있는 장소로 경외심을 품고 있다. 정령들이 모여드는 집합 장소로도 기능한다." },
        ].map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{f.name} <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400 }}>{f.jp}</span></div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</div>
              <span style={{ fontSize: "11px", background: `${ACCENT}15`, color: ACCENT, padding: "2px 8px", borderRadius: 8, flexShrink: 0 }}>{o.type}</span>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: "12px", color: "#888", marginBottom: 8 }}>
              <span>본거지: {o.base}</span><span>대표: {o.leader}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{o.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZanSection() {
  const orgs = [
    { name: "부패의 교단", type: "종교 조직", base: "부식마전", leader: "스즈미야 (신관장)", content: "세르노그를 섬기는 부패 교단. 라이벌 조직과의 조정 및 세르노그의 의향을 봉사자들에게 전달하는 역할을 한다. 또한 일반 루트로는 연락이 불가능한 조직이나 인물들과도 연락을 하고 있는 경우가 있다." },
    { name: "볼론티크", type: "군사 조직", base: "잔·덴·바루아", leader: "「지배자」 에크·카지슈 (필두)", content: "세르노그에게 충성을 다하는 군단 중 하나. 카 어치에 해당하는 인물로 하늘을 날아다니는 생물과 마물을 이끌고, 세르노그의 공군으로 활약한다. 본거지인 잔·덴·바루아에는 거의 없으며, 각지에서 각각의 임무를 다하고 있다." },
    { name: "호랑이 군단", type: "군사 조직", base: "잔·덴·바루아", leader: "「나멸자」 키신", content: "세르노그에게 충성을 다하는 8개 군단 중 하나. 카 어치라는 인물에 해당하는 마물 도르자가 하늘을 날아다니는 생물과 마물을 이끌고 있다. 전선에서의 전투를 주로 담당하며, 군단장은 전 마물 마족의 마력 키신이다." },
    { name: "독수리 군단", type: "군사 조직", base: "잔·덴·바루아", leader: "「인격자」 카·아치", content: "세르노그에게 충성을 다하는 8개 군단 중 하나. 카 어치가 공중을 날아다니는 생물과 마물을 이끌어, 알디온 각지의 전방 기지에 파견을 내어, 공군으로서의 역할을 수행한다. 전선의 정찰이나 강습·후방 수송 등 다양한 임무를 수행하고 있다." },
    { name: "부·스베다", type: "지하 조직", base: "불명", leader: "레프·슈체바른", content: "잔·덴·바루아에 노동력으로 끌려온 인간들이 비밀리에 결성하는 레지스탕스 조직. 노예 해방을 목표로 하여, 글로비스 령의 도시들과 연락을 취하고 있다. 지하 활동을 추진하며 「언젠가 자유의 땅을」을 합언으로 삼고 있다." },
  ];
  return (
    <div>
      <Prose text={"아스란 북부의 산 속 깊숙이 존재하는 세르노그의 요새. 산을 파헤쳐 만들어진 거대한 요새이며, 그 구조는 층층이 이루어져 있고, 더욱이 산의 내부에 있는 지하 부분이 크게 펼쳐진다."} />
      <div style={{ background: "#1A0808", border: "1px solid #5A1A1A", borderRadius: 10, padding: "14px 18px", marginBottom: 20 }}>
        <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#CCC" }}>
          <strong style={{ color: "#EE9090" }}>인구:</strong> 불명 &nbsp;|&nbsp;
          <strong style={{ color: "#EE9090" }}>통치:</strong> 사신에 의한 통치 &nbsp;|&nbsp;
          <strong style={{ color: "#EE9090" }}>수장:</strong> 세르노그 (邪神) &nbsp;|&nbsp;
          <strong style={{ color: "#EE9090" }}>기후:</strong> 아한대 기후
        </div>
      </div>
      <SecTitle title="요새의 구조" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8, marginBottom: 20 }}>
        {[
          { name: "산의 기슭", desc: "산의 기슭 일대는 오염된 마물들의 늪이 헤드로의 연못이 되고 있다. 여기에는 유령이나 사악한 생각이 깃든 영혼들이 들끓으며, 오염수 속에 잠기는 집을 삼는 마귀들이 다수 숨어들고 있다." },
          { name: "제일의 보루", desc: "산을 에워싸듯 솟아 있는 성의 부분. 산을 오르려면 우선 이 보루를 돌파하지 않으면 안 된다. 적토석으로 굳혀진 벽이 몇 단이나 겹쳐 쌓여 있으며, 그 사이에 마물들을 방어하는 마물들의 집이 있다." },
          { name: "제이의 보루", desc: "제일 보루를 돌파하고 산의 중앙에 파고든 보루. 사악화한 거인들의 동네가 되어 있으며, 많은 화기를 갖춘 병기 창고도 되고 있다." },
          { name: "제삼의 보루", desc: "제이 보루를 넘어 더욱 정상에 가까운 산에 만들어진 방어 시설. 사악한 마물들의 도시가 되어 있으며, 그것을 지배하는 마물들의 궁전이 되고 있다." },
          { name: "화구", desc: "잔·덴·바루아의 산 정상에는, 검은 연기를 내뿜는 화구가 존재한다. 이 화구를 빠져나가 산 내부에 만들어진 지하 세계로 이어진다." },
          { name: "지하 세계", desc: "미크트란트라 불리는 잔·덴·바루아의 지하에는, 邪神의 봉신이 되는 최강의 마물들의 전사들이 보유 무기를 생산하는 제조 공장이 되고 있다. 더욱이 그 안에는, 邪神 세르노그가 거처하는 「부식마전」이 있다고 전해진다." },
        ].map((d, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 16px", borderLeft: "3px solid #5A1A1A" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{d.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{d.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="주요 시설" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginTop: 8, marginBottom: 20 }}>
        {[
          { name: "부식마전", jp: "腐蝕魔殿", desc: "세르노그를 모시는 지하 신전. 잔·덴·바루아라는 것은 원래 이 신전의 이름이었다. 그 장소는 잔·덴·바루아의 지하 미궁의 끝에 넓어지는 지하 세계에 세워져 있으며, 그 외관은 뼈를 조합시켜 만든 성 형태를 하고 있다." },
          { name: "암흑 투기장", jp: "邪なる暗黒闘技場", desc: "잔·덴·바루아의 지하 공간을 이용하여 만들어진 투기장. 원형 투기장을 에워싸듯 고임마에서의 갈 곳 없는 통로가 있다. 마물들을 전투시켜, 마물들이 그것을 오락으로 인기가 높다. 관객석은 하급 마물이 앞줄에, 상류 귀족 및 군대 상층부가 뒷줄에 차지하고 있다." },
          { name: "무기 공장", jp: "汚れ多き武器工場", desc: "잔·덴·바루아의 지하에서, 마물의 무기 제조를 하는 공장. 화구에서 끊임없이 솟아오르는 용암을 사용하여, 지하 내부에는 제조에 부수되는 여러 방이 나누어져 있다. 많은 부분이 지하이며, 대규모 생산 체제를 갖추고 있다." },
          { name: "사룡의 창고", jp: "邪竜の蔵", desc: "잔·덴·바루아의 산에 공동이 된 곳. 신에게 봉신하는 정룡의 일종으로서 생겨났으나, 생존 정룡에는 사기가 충만하여 사신에게 봉사하도록 변해 온 존재들이 자유롭게 날아다니는 곳. 「바람의 시대」에는 이 산의 몇 배나 되는 사룡의 군집이 있었다고 전해진다." },
        ].map((f, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a", marginBottom: 4 }}>{f.name} <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400 }}>{f.jp}</span></div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#666" }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <SecTitle title="조직" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        {orgs.map((o, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: "4px solid #5A1A1A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "13px", fontWeight: 700, color: "#2a2a2a" }}>{o.name}</div>
              <span style={{ fontSize: "11px", background: "#5A1A1A15", color: "#5A1A1A", padding: "2px 7px", borderRadius: 8, flexShrink: 0 }}>{o.type}</span>
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
  const people = [
    {
      name: "「검의 여신」 글로비스",
      nameJp: "「剣の女神」グローヴィス",
      role: "아스란의 여신·수호신",
      race: "신 (마이너 갓)",
      gender: "여",
      age: "불명",
      hair: "적색",
      eyes: "차갈색",
      skin: "백색",
      quote: "\"검에 맹세를. 방패에 소원을. 싸움의 나날들에 충성을\"",
      note: "날개를 가진 전투 여신. 검과 그것을 두들기는 불의 불꽃을 깃들이고 있다. 엘카라도르의 홍련신전에, 20세 전후의 젊은 여성의 모습으로 아스란에 오는 전사 앞에 강림한다. 신으로서의 성격은 겉으로 보기에 진지하고 외면적으로는 공정한 것처럼 부여받은 사명을 다하기 위해 담담히 싸움을 이어간다.",
    },
    {
      name: "「회안의」 브라드렌",
      nameJp: "「灰眼の」ヴラドレン",
      role: "클라나프라냐 원로원 의장",
      race: "두앙 (아귀족)",
      gender: "남",
      age: "67세",
      hair: "백발",
      eyes: "회색",
      skin: "백색",
      quote: "\"……아직 결정이 안 됐단 말이냐. 그렇다면 내가 정리하겠다!\"",
      note: "역전의 전사로 명성과 공적이 전설적이다. 은퇴 이후로는 엘카라도르의 선로들의 의견을 취합하는 대역을 맡고 있다. 의장 자리를 맡은 이후 자신의 의견을 입에 올리는 일이 적어졌다고 하지만, 회의가 일향 결론이 나지 않으면 강제로 정리해 버린다.",
    },
    {
      name: "「사를 바라보는 자」 마라야",
      nameJp: "「邪を見つめる者」マラヤ",
      role: "시발바르 감옥 수문장",
      race: "두앙 (천부족)",
      gender: "남",
      age: "34세",
      hair: "차색",
      eyes: "사색",
      skin: "백색",
      quote: "\"이 앞으로 가려면, 충분히 주의하세요\"",
      note: "글로비스 령 내의 범죄자나 위험 인물을 수용하는 시설 시발바르의 수문장. 특히 사악화한 자를 봉인해 두는 지하층 입구를 관리하고 있다. 무사에게도 능숙한 성격으로 묵묵히 일을 해낸다. 해방 루이네이터를 결정하는 것도 그의 일이 된다.",
    },
    {
      name: "이슈·카크",
      nameJp: "イシュ・カック",
      role: "대정령의 단조 공인",
      race: "정령",
      gender: "여",
      age: "불명",
      hair: "녹색",
      eyes: "청색",
      skin: "녹색",
      quote: "\"한 곳에 생명을 걸겠다! 기합이다!\"",
      note: "엘카라도르의 공방에서 신구를 비롯해 다양한 도구를 제작하는 단조 공인. 아득히 먼 고대부터 엘카라도르에 존재했다는 화대 정령으로 여성형이다. 글로비스로부터 이름을 부여받았다. 공방을 방문하는 자에게 여러 도움이 되는 조언도 해 준다.",
    },
    {
      name: "아리스티라·아그리아·안젤리카",
      nameJp: "アリスティラ・アグリア・アンジェリカ",
      role: "내관자",
      race: "레므레스",
      gender: "여",
      age: "불명",
      hair: "흑발",
      eyes: "자색",
      skin: "백색",
      quote: "\"모험자들이여. 아스란에 오신 것을 환영합니다\"",
      note: "내관자. 많은 세계들에 찾아온 자들에게 「별의 문」을 통해 에린에 이끈 자. 사고에 의해 발키리의 몸에 옮겨갔다. 「별의 문」을 쓰러뜨린 후에는 에린에 남아, 「검의 여신」 글로비스의 곁에서 에린에 끊임없이 오는 모험자들과 싸움을 이어가고 있다.",
    },
  ];
  return (
    <div>
      <Prose text={"엘카라도르를 거점으로 활동하는 주요 인물들. 「검의 여신」 글로비스와 그 봉사자들을 중심으로, 아스란의 운명을 담당하는 자들이다."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
        {people.map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a2a" }}>{p.name}</div>
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
      <SecTitle title="세르노그 진영의 인물들" />
      <Prose text={"잔·덴·바루아를 거점으로 하는 세르노그 진영의 주요 인물들."} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 16 }}>
        {[
          {
            name: "「부패의 신」 세르노그",
            nameJp: "「腐敗の神」セルノーグ",
            role: "아스란 북부의 지배자·邪神",
            race: "신 (邪神)",
            gender: "남",
            age: "불명",
            hair: "없음",
            eyes: "없음",
            skin: "백색",
            quote: "\"슬슬 소녀와의 전쟁도 질리기 시작했군……\"",
            note: "아스란의 북반부를 지배하는 사신. 「부패의 신」이라 불리며, 물질, 혹은 신적인 육체를 가지고 있다. 드러나 있는 뼈가 돌출된 신체를, 腐爛이 진행되어 뼈가 돌출된 면을 가지고 있으며, 소멸하는 것은 우선 없는 것처럼 여러 자들 앞에서도 모습을 나타낸다. 자신 있는 처지에서 공중에 떠오르는 책상에서 명령을 내린다.",
          },
          {
            name: "「명암의 무녀」 요미",
            nameJp: "「冥闇の巫女」ヨミ",
            role: "부패 교단의 선교사",
            race: "휴린",
            gender: "여",
            age: "21세",
            hair: "흑색",
            eyes: "흑색",
            skin: "백색",
            quote: "\"부패가 아니에요……그것이야말로 세계의, 진실한 모습이에요\"",
            note: "에린엘드에 있는 강한 카나기(무녀)의 모습을 한 소녀. 그녀는 인간이지만 신에게 마신에게 이끌려온 여성이었다. 선하지도 악하지도 않은 정령을 세르노그의 품 안에 불러들이는 것을 사명으로 여기며, 루이네이터를 이쪽으로 이끌기 위해 힘쓰고 있다.",
          },
          {
            name: "스즈미야",
            nameJp: "スズミヤ",
            role: "부식마전 신관장",
            race: "불명",
            gender: "불명",
            age: "불명",
            hair: "자색",
            eyes: "은색",
            skin: "회색",
            quote: "\"자, 오늘 밤의 제물은 어느 걸로 할까나?\"",
            note: "세르노그를 신봉하는 부패 교단의 신관장. 웃음의 가면을 착용하고 있으며, 그 소재의 얼굴을 드러내는 경우는 없다. 가면의 아래는 절세의 미인이라는 등 여러 소문이 있다. 부식마전의 신관들을 솔선하여 생물의 조달에 일상적이라 여기지 않는다. 또한 마물을 부리는 술수도 몸에 담고 있다고 여겨진다.",
          },
          {
            name: "「나멸자」 키신",
            nameJp: "「羅滅者」キシン",
            role: "구명장의 하나",
            race: "마족",
            gender: "남",
            age: "339세",
            hair: "흑색",
            eyes: "적색",
            skin: "암갈색",
            quote: "\"응~? 지금 몇 명 죽었으려나?\"",
            note: "구명장 중 하나. 많은 자를 익혀진 늪지대로 끌어올려 질질 끌려다니게 하는 오우가(大鬼). 맞서 싸우기 위해 상대의 손을 나긋나긋하게 하고, 들어올리고, 쓰러뜨리기를 거듭해, 상대를 극한 깊은 지하에 빠뜨리는 경우도 있다. 전장에서 매우 호전적이고 잔인하지만 동료들에게는 다소 상냥하게 살아가는 일이 있다고 한다.",
          },
          {
            name: "「수다쟁이」 아라라",
            nameJp: "「おしゃべり」アララ",
            role: "세르노그의 전령",
            race: "마족",
            gender: "여",
            age: "불명",
            hair: "연녹황색",
            eyes: "흑색",
            skin: "백색",
            quote: "\"키키키, 안 되지, 세르노그 님께 이렇게 보고하겠다\"",
            note: "초라한 새 하피의 모습. 부패 교단에 속해 있으며, 전령을 담당하고 있다. 각지를 순찰하며 정보를 가지는 임무를 맡고, 여러 장소에서 나타나는 경우에는 정보를 모으고 있다. 하피인 만큼 날쌔고 도망가기 위한 방식도 능숙하므로, 적방에 의해서도 속을 받기 어렵다.",
          },
        ].map((p, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 12, padding: "20px 22px", borderLeft: "4px solid #5A1A1A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "16px", fontWeight: 700, color: "#1a1a2a" }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.08em", marginTop: 2 }}>{p.nameJp}</div>
              </div>
              <span style={{ fontSize: "11px", background: "#5A1A1A15", color: "#5A1A1A", padding: "3px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 12 }}>{p.role}</span>
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
            <div style={{ fontSize: "13px", fontStyle: "italic", color: "#5A1A1A", margin: "8px 0", paddingLeft: 12, borderLeft: "2px solid #5A1A1A50" }}>{p.quote}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArslanPage() {
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
      case "history":    return <HistorySection />;
      case "current":    return <CurrentSection />;
      case "elcarador":  return <ElcaradorSection />;
      case "zan":        return <ZanSection />;
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
      {(!mob || showNav) && (
        <nav style={{ width: mob ? "100vw" : 220, flexShrink: 0, background: SIDEBAR_BG, display: "flex", flexDirection: "column", padding: "24px 0", overflowY: "auto", position: mob ? "fixed" : "relative", top: 0, left: 0, height: "100vh", zIndex: 999, boxShadow: mob ? "2px 0 16px rgba(0,0,0,0.3)" : "none" }}>
          <a href="/" style={{ display: "block", padding: "0 20px 20px", textDecoration: "none" }}>
            <div style={{ fontSize: "10px", color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>← 아리안로드 위키</div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Noto Serif KR', serif" }}>아스란</div>
            <div style={{ fontSize: "10px", color: "#aaa", marginTop: 2 }}>アースラン — 永遠なる闘争の地</div>
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
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: mob ? "22px" : "26px", fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1.3 }}>아스란</h1>
          <div style={{ fontSize: "12px", color: "#aaa", marginTop: 4 }}>アースラン — 알디온 대륙 서역 · 영원한 투쟁의 땅</div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginTop: 16, borderRadius: 1 }} />
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
