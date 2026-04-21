'use client';

import { useState, useEffect, useRef } from "react";

const ACCENT = "#8A3A2A";
const ACCENT_LIGHT = "#F5E0DC";
const SIDEBAR_BG = "#1C0808";

interface NavItem { id: string; label: string; icon: string; }

const navItems: NavItem[] = [
  { id: "overview",  label: "알디온 개요",         icon: "🌋" },
  { id: "history",   label: "전설과 역사",          icon: "📜" },
  { id: "current",   label: "현재의 알디온",        icon: "🏰" },
  { id: "central",   label: "중부 지역",            icon: "🗺️" },
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

function OverviewSection() {
  const stats = [
    { label: "대륙명",     value: "알디온 대륙 (アルディオン大陸)" },
    { label: "위치",       value: "에린딜 대륙 서쪽, 대해 너머" },
    { label: "동서 길이",  value: "약 1,900km" },
    { label: "남북 길이",  value: "약 2,600km" },
    { label: "면적",       value: "약 500만 평방km" },
    { label: "기후",       value: "전반적으로 온난, 북부는 냉온" },
  ];
  return (
    <div>
      <Prose text={"알디온 대륙은 에린딜 대륙에서 서쪽을 향하여 대해를 건넌 끝에 펼쳐지는 광대한 대륙이다. 사람이 거주하는 곳은 동방 지역에 한정되어 있으며, 에린딜 서방 지역과는 1년에 1~2회 배를 통해 교류한다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontSize: "11px", color: "#999", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#2a2a2a" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <SecTitle title="알디온의 지형" />
      <Prose text={"알디온 대륙의 동방은 에얼즈해(海)에 의해 남북으로 분단된다. 서방의 산맥인 노란트 산맥이 험하기 때문에, 통행은 주로 배가 이용된다.\n\n북부는 기복이 풍부하며, 에스토넬 산지의 북동쪽에는 산지와 분지가 많다. 서방과 남서쪽에는 저지대가 넓어진다. 이 장에서는 주로 북부를 다룬다.\n\n한편 남부는 해안선 근처의 일부만 개척되어 있으며, 그 대부분은 밀림에 의해 막혀져 있다. 또한 노란트 산맥의 서쪽에는 황폐한 황야가 펼쳐져 있다고 전해진다."} />

      <SecTitle title="알디온의 종족" />
      <Prose text={"알디온에는 에린딜과 마찬가지로 인간 6종족 외에, 엑스마키나와 드라고넷이라는 2개의 독자 종족이 있다. 엑스마키나와 드라고넷은 인간이 아니지만, 기본적으로 인간과 같다고 여겨지고 있다."} />

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 20px", borderLeft: `4px solid ${ACCENT}` }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#2a2a2a", marginBottom: 10 }}>⚙️ 엑스마키나 (エクスマキナ)</div>
          <Prose text={"엑스마키나는 보통의 골렘과는 달리, 자아와 의지를 가진 기계다. 그래서 기계를 초월한 존재라는 의미에서 엑스마키나(ex-machina)라 불리게 되었다.\n\n엑스마키나의 탄생은 네바프 고블린이 만든 공장에서 만들어진 코어를 사용한 골렘이었다. 감정과 의지를 가졌던 것이다. 왜, 감정과 의사를 가지게 되었는지는 현재도 알 수 없다.\n\n코어를 만드는 공장은 지금도 가동을 계속하며, 알디온에서 엑스마키나는 계속 탄생하고 있다."} />
          <div style={{ fontSize: "12px", color: "#888", marginTop: 4 }}>
            <span style={{ fontWeight: 600, color: "#555" }}>형태 종류: </span>앤스록 (アンスロック) · 갑옷형 (鎧型) · 인간형 (人間型)
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "18px 20px", borderLeft: `4px solid ${ACCENT}` }}>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#2a2a2a", marginBottom: 10 }}>🐉 드라고넷 (ドラゴネット)</div>
          <Prose text={"드라고넷은 「신룡왕 세피로스」에 의해 창조된 종족이다. 신체에 용의 특징이 나타나 있으며, 「세피로스의 낙자(落とし子)」라고도 불린다.\n\n성격은 기본적으로 온화하며 지적인 악의 없는 소유자가 많지만, 흥분하면 공격적이 되는 면도 있다.\n\n드라고넷은 그들이 귀속하는 용의 종류에 따라 「앤스록」「메디온(竜頭)」「레바타르」의 3종류로 나뉜다.\n\n또한 일부 드라고넷은 용에 유사한 특수한 특징을 보유하여 날개를 가지는 경우도 있다. 신사에 모셔지는 경우, 의인화되어 그 모습은 용관(竜冠)을 이고 인간의 몸에 화신한 여성으로, 그 손에는 왕관·왕검·왕홀과 크리스탈을 들고 있는 경우가 많다."} />
          <div style={{ fontSize: "12px", color: "#888", marginTop: 4 }}>
            <span style={{ fontWeight: 600, color: "#555" }}>유형: </span>앤스록 · 메디온 (竜頭型) · 레바타르
          </div>
        </div>
      </div>

      <SecTitle title={`"신룡왕" 세피로스`} />
      <Prose text={"알디온과 에린딜에서의 종교에 큰 차이는 없다. 7대신 신앙은 이쪽에서도 널리 신앙받고 있다. 그러나 알디온에는 또 하나, 세피로스라는 신이 신앙의 대상이 되고 있다.\n\n정확히는 세피로스는 신이 아니며, 신에 가까운 고대의 힘과 창조의 능력을 보유하고 있다고 여겨지는 「깊은 홍룡(深紅竜)」 아인·소프·아울 - 파괴적인 힘, 「순백룡(純白竜)」 아인 - 창조의 힘이 있다.\n\n신사에 모셔지는 경우, 의인화되어 「용관」을 머리에 얹고, 수많은 창조의 보물을 보유하는 것으로 표현된다."} />
    </div>
  );
}

function HistorySection() {
  const crystals = [
    { name: "히노이시 (火石)", type: "火의 용휘석", color: "#CC3300" },
    { name: "카나이시 (新石)", type: "단야사(鍛冶師)의 용휘석", color: "#778888" },
    { name: "사토리이시 (知石)", type: "지혜의 용휘석", color: "#4455AA" },
    { name: "오노이시 (雄石)", type: "무용의 용휘석", color: "#884422" },
    { name: "오우이시 (王石)", type: "왕위의 용휘석", color: "#AAAA00" },
    { name: "츠치이시 (土石)", type: "대지의 용휘석", color: "#557733" },
    { name: "(7번째)", type: "불명", color: "#AAAAAA" },
  ];
  const treasures = [
    { name: "수정 왕관", jp: "クリュスタデム", desc: "투명한 수정으로 만들어진 왕관. 알디온을 통솔하는 왕을 선택하는 힘을 지닌다." },
    { name: "산호 왕홀", jp: "ラルセリア", desc: "산호로 만들어진 홀. 통일제의 권위를 상징." },
    { name: "황금 보검", jp: "オーブラント", desc: "황금의 보검. 왕권의 상징이자 실전 무기." },
    { name: "유리 왕장", jp: "アズリスタ", desc: "청금석(瑠璃)의 왕장. 왕권의 4가지 보물 중 하나." },
  ];
  return (
    <div>
      <SecTitle title="울프릭과 세인" />
      <Prose text={"알디온 대륙의 역사는 에린딜의 영웅이기도 한 울프릭의 전설과 함께 시작된다.\n\n'불의 시대'가 시작된 무렵의 일이다. 에린딜에서 신을 믿고 마물과 싸우는 전사들을 「세인」이라 불렀다. 특히 세인의 지도자 울프릭은 용맹한 전사였다. 격렬한 전투 속에서 울프릭은 신과 대치하여 「홍룡」 세피로스로부터 「용(竜)」이라는 이름의 강력한 마법의 크리스탈을 받아 세인이 13번에 걸친 마물과의 싸움에 승리하게 되었다.\n\n신들은 울프릭에게 에린딜의 서방에 있는 알디온 대륙을 인간들이 거주할 토지로서 활용할 것을 제안했다. 울프릭은 제안을 받아들이고 많은 세인들과 함께 알디온으로 향했다."} />
      <Prose text={"이때, 울프릭의 친구 루키아노스는 에린딜에 남아 계속 싸웠다. 그 후 루키아노스는 신의 용휘석을 받아 알디온의 서방에 신전을 세웠다. 이 땅에 건립된 신전이 바로 후일의 디아스론드의 기원이다."} />

      <SecTitle title="페리타니아 건국" />
      <Prose text={"세인의 지도자 울프릭은 왕으로 선출되어, 후에 「페리타니아 통일제국」이라 불리는 나라를 건국했다. 이때 「신룡왕」 세피로스를 에스토넬 왕국 도시 엘·울프릭·민스터의 신전의 「황제의 방」에 관리하도록 위임했다.\n\n「황제」울프릭으로서 즉위했다. 이 해를 「제위 원년」을 건국 원년으로 하여, 페리타니아국의 「제기(帝紀)」의 달력이 시작되었다."} />
      <Prose text={"4가지 보물에는 왕관에 3개, 왕홀에 2개, 왕검과 왕장에 1개씩의 왕위의 용휘석이 끼워져 있다. 이 4가지 보물과 7개의 용휘석을 가진 자를 알디온을 통솔하는 황제, 즉 「통일제」 — 알드왈다라 부르게 되었다."} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        {treasures.map((t, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "14px 16px", borderLeft: `3px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 2 }}>👑 {t.name}</div>
            <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.08em", marginBottom: 6 }}>{t.jp}</div>
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: "#555" }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <SecTitle title="7왕국 시대" />
      <Prose text={"그러나 그 후 페리타니아는 분열하여 제기 700년대에는 수많은 나라가 탄생했다. 그 중에서도 왕위의 용휘석을 하나씩 보유한 강력한 6개 왕국이 있었다. 그 이름은 골포드, 벨리르, 아벨시아, 레이워르, 멜트란드, 그라스웰즈다.\n\n통일제가 되기 위해서는 에스토넬 왕국의 도시 엘·울프릭·민스터의 신전에 있는 「황제의 방」에서 행하는 「사보(四宝)의 시련」에 인정받을 필요가 있다."} />

      <SecTitle title="용휘석 (竜輝石)" />
      <Prose text={"용휘석은 보유자에게 다양한 힘을 주는 신구(神具)다. 반투명의 크리스탈이며, 그 형태나 색은 일정하지 않고 보유자와 기량에 따라 달라진다고 여겨지고 있다. 그러나 대부분의 행위에 대해서 그것이 가능하다는 것이 알려져 있다.\n\n전설에 의하면 용휘석은 전부 7종류, 28개가 존재한다고 알려진다."} />
      <div style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, overflow: "hidden", marginTop: 8 }}>
        <div style={{ background: ACCENT, color: "#fff", display: "grid", gridTemplateColumns: "1fr 2fr", padding: "8px 14px", fontSize: "12px", fontWeight: 600 }}>
          <span>이름 (통칭)</span><span>속성</span>
        </div>
        {crystals.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", padding: "8px 14px", fontSize: "13px", borderTop: "1px solid #F0EBE3", background: i % 2 === 0 ? "#fff" : "#FAFAF7", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: "#2a2a2a" }}>{c.name}</span>
            </div>
            <span style={{ color: "#555" }}>{c.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentSection() {
  const nations = [
    {
      name: "페리타니아 합중국",
      jp: "フェリタニア合衆国",
      base: "노르위치",
      rep: "스리스·로이도스",
      color: "#8A3A2A",
      content: "대륙 중앙 지역에 있는 합중국. 일찍이 7왕국 모두를 산하에 두었던 합중국. 현재는 리드=에마르름 지방을 제외한 구 멜트란드의 거의 전 지역과 아벨시아 왕국, 뉴빌베리 등을 포함한다. 레이워르 왕국과 그라스웰즈 왕국은 이탈을 선언하고 있지 않으나 이전에 비해 영향력은 약화되고 있다. 에린딜 대륙 서방의 구조를 도입한 모험자 길드 제도 확대의 중심지이기도 하다.",
    },
    {
      name: "멜트란드 왕국",
      jp: "メルトランド王国",
      base: "노르위치",
      rep: "스리스·로이도스",
      color: "#5A4A3A",
      content: "대붕괴 후에도 이 지역에서는 전국 멜트란드라고 불리는 혼란의 시대가 이어졌다. 그러나 아벨을 대표로 하는 반 스리스 세력이 인류전쟁에서 구체화된 결과, 피육의 일로 멜트란드는 다시 지역으로서의 결합을 되찾았다. 단, 리드=에마르름 지방은 아가르타 공국에 편입된 채로 회복되지 못하고 있다.",
    },
    {
      name: "레이워르 왕국",
      jp: "レイウォール王国",
      base: "노르그람",
      rep: "리디르·바우에스",
      color: "#3A5A7A",
      content: "대륙 서부 지역에 있는 왕국. 레이워르 국내에서는 새 체제의 구축이 모색되고 있다. 두 파가 각립하고 있다: 리디르와 그라스웰즈 왕국의 필립과의 혼인을 추진하는 세력(페리타니아파)과 아벨시아 왕 윌프레드와의 혼인을 추진하는 세력(그라스웰즈파).",
    },
    {
      name: "그라스웰즈 왕국",
      jp: "グラスウェルズ王国",
      base: "벨크시레",
      rep: "필립·그라스웰즈",
      color: "#3A6A3A",
      content: "대륙 두부(頭部) 지역에 있는 왕국. 한때 잃어버린 그라스웰즈의 「백의 왕위 용휘석」을 뉴빌베리의 영주 힐데가르드·고다로부터 반환받음으로써 필립의 위광이 더욱 높아졌다.",
    },
    {
      name: "골포드 왕국",
      jp: "ゴルフォード王国",
      base: "워릭포드",
      rep: "드워딘",
      color: "#5A4A8A",
      content: "대륙 남부 지역에 있는 왕국. 마물의 감소, 신성 앙리 제국의 약체화에 의해 국세는 상승 중이지만, 해적 및 랑에엔드 문제 등 고민의 씨앗은 끊이지 않는다. 국왕 드워딘이 지도력을 발휘하지 못하여 국정은 혼란 상태에 있다.",
    },
    {
      name: "크레스트 제도 독립정권",
      jp: "クレスト諸島独立政権",
      base: "로스베르크 섬",
      rep: "메아리·크레스트",
      color: "#6A7A3A",
      content: "제기 812년 멜트란드 전역 당시 메아리 크레스트를 맹주로 하여 사실상의 독립을 달성한 신흥 세력의 선구다. 「대붕괴」 후, 대륙 교통망의 혼란을 계기로 해운의 중요성이 증가했다. 크레스트 제도 독립정권은 이것을 타고 세력을 확장하는 것에 성공했다. 다만 같은 시기 크레스트 제도 주변 해역의 전략적 가치가 높아짐에 따라 「그라스웰즈 국으로부터의 간섭이 강해지는 건 아닐까」하는 불안을 제기하는 자들도 늘어나고 있다.",
    },
    {
      name: "헥스포드 자치정권",
      jp: "ヘクスフォード自治政権",
      base: "헥스포드",
      rep: "에드가·헥삼",
      color: "#7A5A3A",
      content: "「대붕괴」 후 에스토넬을 중심으로 한 혼란 속에서, 레이워르를 제압하는 일 없이 자치정부를 세워 사실상의 독립 상태가 되었다. 에린딜의 협력으로 에린딜의 모험자 제도를 도입하여, 레이워르를 자극하지 않고 도시를 지키기 위해 방어력을 높이는 것을 꾀했다. 코로시아움을 제공하는 등 강국과의 거리를 능숙하게 유지하고 있다.",
    },
  ];
  return (
    <div>
      <SecTitle title="대붕괴와 인류전쟁" />
      <Prose text={"제기 814년에 일어난 「대붕괴」에 의해, 알디온 대륙은 혼란의 소용돌이에 빠졌다. 구 에스토넬 지역을 중심으로 마물이 거점을 확보하고, 한때의 대국이 분열됐다. 각지에서 수많은 신흥 세력이 탄생하여 날마다 세력권이 바뀌기 시작했다. 비아니의 평화가 끝나고, 전란의 시대가 다시 시작된 것이다.\n\n그것으로부터 1.5년을 지난 제기 816년, 독자적인 세력을 이룬 각 나라의 왕들이 「위대한 히즈」 앞에서 만찬회를 열었다. 젊고 아름다운 전 성녀로서 알려진 인물들의 연애담이 대륙 전체에서 화제가 됐다. 그러나 아직 새로운 질서는 가져와지지 않고 있다."} />
      <Prose text={"제기 816년 4월, 구 에스토넬 지역에서 대규모 마물 토벌 작전이 결행됐다. 참가한 것은 페리타니아 합중국, 레이워르 왕국, 그라스웰즈 왕국, 골포드 왕국, 벨리르 왕국, 아가르타 공국 등 각 세력. 이 작전은 뉴빌베리의 영주 힐다의 제안을 계기로 행해졌다. 작전 결과 마물이 거주하는 지역이었던 구 에스토넬 지방은 인간의 손으로 되돌아왔다."} />

      <SecTitle title="마물의 위협" />
      <Prose text={"인류전쟁의 결과, 에스토넬을 중심으로 한 마물 발생 지대는 방비됐다. 단, 마물을 완전히 절멸시키지는 못했다. 그래서 아벨시아의 엘자·브룩스를 중심으로 한 대응 조직으로서 에린딜의 모험자 길드 제도를 도입하고자 하는 움직임이 있다."} />

      <SecTitle title="현재의 각 세력" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {nations.map((n, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${n.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a" }}>{n.name}</div>
                <div style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.06em", marginTop: 2 }}>{n.jp}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: "12px", color: "#888", marginBottom: 8 }}>
              <span>본거지: {n.base}</span>
              <span>대표: {n.rep}</span>
            </div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{n.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CentralSection() {
  const cities = [
    {
      name: "노르위치 (ノルウィッチ)",
      desc: "페리타니아 합중국의 도성(都城). 일찍이 멜트란드와 아벨시아의 국경 근처의 중요 도시였으나, 페리타니아와 멜트란드의 연합 왕국 당시 양국을 잇는 거점으로 발전했다. 현재는 무역을 비롯하여 여러 상인들을 다수 끌어들이고 있어 상업 도시로서도 성장하고 있다. 여성 영주 이자베라는 마니악한 인물로, 그녀에 의해 대규모 성채 강화가 행해졌다. 과감하다고 여겨지는 개조가 달성된 결과 노르위치 성은 대륙에서도 최상위에 드는 견고한 성이 되고 있다. 또한 도성 앞에서부터 상인을 많이 끌어들여 상업 도시로서도 성공하고 있다.",
    },
    {
      name: "헥스포드 (ヘクスフォード)",
      desc: "알디온 대륙 중부의 구 멜트란드와 레이워르의 국경에 있는 자치 도시. 에린딜과 교류를 가지는 자치 도시가 되어 페리타니아의 세력하에 들어가지 않는 소수이다. 또한, 다수의 교통 요충이 있어, 밤에는 많은 술집이 줄지어 1일 경제 활동이 활발하다. 그래서 「빛나는 도시」라고도 불린다. 이전에는 레이워르 성이었다.",
    },
    {
      name: "뉴빌베리 (ニュービルベリ)",
      desc: "일찍이 그라스웰즈 군부였던 고다 가문. 힐데가르드·고다가 왕좌를 빼앗아 복흥(復興)한 신흥 도시. 뉴빌베리는 멜트란드 동방의 산기슭에 있었던 빌베리라는 도시의 주민들이 새롭게 도시를 쌓은 것이다. 뉴빌베리는 구 에스토넬 왕국의 남쪽에 있는 산기슭에 있으며, 「위대한 히즈」라는 신목이 존재한다. 그 장소에 뉴빌베리라고 하는 새로운 도시를 쌓은 것이다. 뉴빌베리에는 구 에스토넬 왕국을 탈환하여 멜트란드로부터 「위대한 히즈」를 찾아 이주하는 자들도 많아, 급속히 인구가 확대되고 있다.",
    },
  ];
  return (
    <div>
      <Prose text={"「대붕괴」 후에 대륙 중에서도 가장 혼란에 빠진 지역이었지만, 마물이 소멸된 것을 계기로 부흥의 조짐을 보이고 있다. 그러나 중부 지역의 각 나라들은 아직 안팎으로 많은 문제를 안고 있으며, 혼란은 해소되지 않고 있다."} />

      <SecTitle title="페리타니아 합중국의 실정" />
      <Prose text={"「대붕괴」에 의해 체제가 붕괴하여, 그 후 여러 고난에 시달려온 페리타니아 합중국. 그러나 비아니의 발자취를 잇는 스리스를 중심으로 한 존재감을 되찾고 있다. 구 에스토넬 지역에서 행해진 마물 토벌 작전에서 각 나라가 협력 체제를 취한 것도 합중국에게는 플러스였다. 앞으로 합중국은 각 나라와의 원만한 관계를 지향하는 것이 되겠다.\n\n합중국의 최대 문제는 국내 각 세력의 대립이다. 이것에 인접국과도 협력하면서 이기려는 자들과, 세력을 강화하면서 이득을 챙기려는 자들의 이해가 대립하고 있어 조율이 쉽지 않다."} />

      <SecTitle title="아벨시아 왕국" />
      <Prose text={"제기 814년 「아벨시아의 항복」 이래의 복활을 이루어낸 아벨시아 왕국. 그러나, 그 후 「대붕괴」에 의해 크게 혼란했다. 구 에스토넬의 인접한 탓에 마물의 최전선에 노출되게 됐지만, 현재는 모험자 제도의 중심지로서의 지위를 굳히고 있다. 상황을 같이 하는 「아벨시아 독립파」와 「페리타니아파」(스리스와 윌프레드의 혼인을 바라는 세력)가 존재한다."} />

      <SecTitle title="셸도니안 학원 (シェルドニアン学園)" />
      <Prose text={"일찍이 에스토넬에 존재했던 전통 있는 학교. 「대붕괴」 때 학생의 대다수는 탈출에 성공했다. 그 후, 아벨시아의 행운아 엘자가 새로운 땅을 제공하여 아벨시아 바란드 외곽에 재건을 달성했다."} />

      <SecTitle title="모험자 길드" />
      <Prose text={"원래는 에린딜 대륙에서 들여온 제도다. 당초는 에린딜과의 교류창구인 아벨시아의 행운아, 엘자·브룩스의 안목 찾기가 계기가 됐다. 이것에 페리타니아 합중국의 모험자 길드 제도 확대를 도모하는 노르위치를 제공하는 등, 페리타니아 합중국과의 관계를 강화하고 있다."} />

      <SecTitle title="중부의 주요 도시" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {cities.map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E3DA", borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${ACCENT}` }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "14px", fontWeight: 700, color: "#2a2a2a", marginBottom: 10 }}>🏙️ {c.name}</div>
            <div style={{ fontSize: "13px", lineHeight: 1.8, color: "#555" }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleSection() {
  const people = [
    {
      name: "스리스·로이도스",
      nameJp: "スリス・ロイドス",
      role: "페리타니아 합중국 대통령",
      race: "휴린",
      gender: "여",
      age: "11세",
      hair: "보라",
      eyes: "청색",
      skin: "백색",
      quote: "\"정말이지 자신이 어린아이라는 걸 통감합니다\"",
      note: "페리타니아 합중국 대통령 대행. 통일 비아니 등 중요 인물의 의지를 이어받은 인물. 어릴 때부터 총명한 소녀로, 자신의 힘으로 페리타니아를 지키고, 나아가 대륙을 평화로 이끌기 위해 노력하고 있다. 국가 간의 복잡한 이해관계로 좌절하는 일도 많지만, 그 배경에는 대륙을 떠난 비아니의 의지를 이어가겠다는 그녀의 결의가 있다.",
    },
    {
      name: "윌프레드·라드포드·아벨시아",
      nameJp: "ウィルフレッド・ラドフォード・アヴェルシア",
      role: "아벨시아 왕",
      race: "휴린",
      gender: "남",
      age: "10세",
      hair: "홍색",
      eyes: "적색",
      skin: "백색",
      quote: "\"슬슬 연습이 아니라 마법을 써보고 싶습니다\"",
      note: "아벨시아 왕. 발소가 인상적인 붉은 눈을 가진 소년. 레이워르 왕위 결정 전으로서 코로시아움을 제공하는 등, 강국과의 거리를 능숙히 유지하고 있다. 아버지 코네스 왕의 치료를 위해 남방의 마물 위협으로부터 아버지를 지키고 있다. 아버지의 통치를 이어받으려 생각하고 있다. 공부도 이어지고 있다. 또한 엘자로부터 마법의 도움을 받고 있다고 한다.",
    },
    {
      name: "이자베라·크리드",
      nameJp: "イザベラ・クリード",
      role: "노르위치 백작",
      race: "휴린",
      gender: "여",
      age: "35세",
      hair: "보라",
      eyes: "청색",
      skin: "백색",
      quote: "\"기동…… 비행…… 합체？\"",
      note: "아름다운 보라 머리를 가진 이동 성채이기도 한 탱크. 노르위치 백작. 수성에 막대한 투자를 한 군인. 그 실체에도 관련되지 않고, 미지의 것 하나에 눈을 떠 아직도 시야가 좁아지지 않는다. 주변의 배려를 알고, 그녀는 지금도 성의 강화, 개조에 힘쓰고 있다.",
    },
    {
      name: "아키나·브룩스",
      nameJp: "アキナ・ブルックス",
      role: "페리타니아 합중국 제1의 기사",
      race: "휴린",
      gender: "여",
      age: "21세",
      hair: "적갈색",
      eyes: "적색",
      skin: "백색",
      quote: "\"엔젤 파이어 출동입니다!\"",
      note: "젊은 나이에도 페리타니아 합중국 최고의 기사인 여성. 선발된 기사부대를 이끌어 왔다. 제국을 위해 기치를 내걸어 스리스 대통령을 위해, 페리타니아의 평화를 지키기 위해 임한다. 합중국 내에 높은 위치를 차지하고 있으며, 일단 싸우게 되면 동료들이 부족하게 되지 않을 수 없지만, 서로 믿는 동료와 함께 자진하여 최전선에 임한다.",
    },
    {
      name: "마르셀·벨트란",
      nameJp: "マルセル・ベルトラン",
      role: "합중국 군사",
      race: "휴린",
      gender: "남",
      age: "26세",
      hair: "청색",
      eyes: "담황색",
      skin: "불건강한 백색",
      quote: "\"자, 내년에야말로……\"",
      note: "명석한 두뇌로 나라를 운영하는 합중국 군인. 군인이 됐으나, 왜인지 배신을 의심받아, 목표 군인이라 불리기도 힘들다. 일찍이 합중국 대통령 선거의 실현을 향해 활동하고 있었는데, 상황이 달라진 탓에 기소를 면할 수 없게 되었다. 나아가 만남의 이야기가 얽혀 들어가고 있다고 하는데, 실은 걱정하지는 않는다.",
    },
  ];
  return (
    <div>
      <Prose text={"이 블록에서는 알디온 대륙 중부의 주요 인물들을 소개한다. 지역으로서는 구 멜트란드 왕국, 아벨시아 왕국, 그리고 구 에스토넬 왕국을 중심으로 한 일대가 이에 해당한다."} />
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
    </div>
  );
}

export default function ArdionPage() {
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
      case "overview": return <OverviewSection />;
      case "history":  return <HistorySection />;
      case "current":  return <CurrentSection />;
      case "central":  return <CentralSection />;
      case "people":   return <PeopleSection />;
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
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "10px", letterSpacing: "0.2em", color: "#3A1808", marginBottom: 6 }}>대륙 · 서방 너머</div>
          <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "15px", fontWeight: 700, color: "#E8E2D4", letterSpacing: "0.03em", lineHeight: 1.4 }}>알디온 대륙<br />アルディオン大陸</div>
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
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "11px" }}>
          <a href="/" style={{ color: "#6A5848", textDecoration: "none" }}>← 이상동몽 위키</a>
        </div>
      </nav>

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: mob ? "60px 16px 40px" : "48px 48px 60px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "11px", letterSpacing: "0.25em", color: "#8A5A4A", marginBottom: 10 }}>
              ARDION CONTINENT — BEYOND THE WESTERN SEA
            </div>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "26px", fontWeight: 700, color: "#1C0808", marginBottom: 8, letterSpacing: "0.04em" }}>
              알디온 대륙
            </h1>
            <div style={{ height: 3, background: `linear-gradient(to right, ${ACCENT}, transparent)`, borderRadius: 2, marginBottom: 16, width: 200 }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "17px", fontWeight: 600, color: "#2a1a1a", marginBottom: 4 }}>
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
