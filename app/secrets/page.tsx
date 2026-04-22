'use client'
import { useState } from 'react'

const ACCENT = "#9A7A18"
const SIDEBAR_BG = "#060206"

function Prose({ text }: { text: string }) {
  return (
    <p style={{ margin: "0 0 10px", lineHeight: 1.8, color: "#D8CCA8" }}>
      {text}
    </p>
  )
}

function SecTitle({ title }: { title: string }) {
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color: ACCENT,
      borderBottom: `2px solid ${ACCENT}`, paddingBottom: 4,
      margin: "24px 0 12px", fontFamily: "'Noto Serif KR', serif"
    }}>
      {title}
    </h3>
  )
}

const navItems = [
  { id: "overview",   label: "비밀 정보 개요",   icon: "🔐" },
  { id: "invaders",   label: "래구저의 정체",    icon: "👁️" },
  { id: "scadi",      label: "스카디",           icon: "🌑" },
  { id: "overlord",   label: "패왕의 비밀",      icon: "👑" },
  { id: "balmunk",    label: "발뭉크·시조",      icon: "💀" },
  { id: "salvation",  label: "세계 구제 계획",   icon: "🌍" },
]

function OverviewSection() {
  return (
    <section>
      <div style={{ background: "#1A0808", border: "2px solid #AA3333", borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <div style={{ color: "#FF5555", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⛔ GM 전용 — 플레이어 열람 금지</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          이 페이지에는 이상동몽 세계의 핵심 비밀이 기록되어 있다.
          일반적으로는 알려지지 않은 정보로, GM이 시나리오를 구성할 때 참조하기 위한 것이다.
          플레이어는 GM의 허가 없이 이 내용을 열람하지 않도록 한다.
          또한 당신이 GM으로서 「AR2E」를 즐기는 경우라면, 여기서부터는 읽어도 문제없다.
          당신의 플레이 그룹에만 남겨두길 바란다.
        </p>
      </div>

      <SecTitle title="가르파의 비밀" />
      <Prose text="아발론의 「성배의 인도」 주점 점주 가르파는, 신환자다. 이것은 거의 알려지지 않은 비밀이다." />
      <div style={{ background: "#0E0A06", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          그가 습득한 신환자의 능력 중 하나는, <strong style={{ color: ACCENT }}>자신의 분신을 복수로 출현시키고, 나아가 각각이 얻은 정보를 공유할 수 있다</strong>는 것이다. 다시 말해 「가르파」는 전원이 분신 자기 자신인 것이다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          덧붙여 「가르파」들은 전원 여성이고, 외모는 젊은이도 있고 노인도 있고 청년도 있다. 모습이 「가르파」다운 외모를 하고 있는 것뿐이다. 지금까지 모험가들이 에린딜이나 아르디온의 각지에서 「가르파」와 만난 것도 이러한 사정에서다.
        </p>
      </div>

      <SecTitle title="비밀 정보와 세계" />
      <Prose text="에린의 세계에는 일반적으로 알려지지 않은 정보가 있다. 「AR2E」의 GM을 즐기는 입장에서 오늘도 플레이어에게만 남겨두면 좋을 것이다. 하지만 이들 비밀이 깊이 관여하는 시나리오나 캠페인을 전개하는 경우, 신중하게 이 정보를 다루어야 한다." />
      <Prose text="또한 이 내용 중에는 당신이 「AR2E」를 GM으로서 진행하고 있다면 별도로, 이 선에서 쓰여진 내용을 바탕으로 시나리오를 작성할 수도 있다." />
    </section>
  )
}

function InvadersSection() {
  return (
    <section>
      <SecTitle title="래구저의 정체" />
      <Prose text="사신과 마족은 「정령의 폐청」에 의해 에린에서 마계로 추방되었다. 에린은 지금 「바람의 폐청」을 완수하고자 하고 있으며, 에린은 「바람의 폐청」의 세례를 마쳐 이제 완전히 다른 세계와 이어지지 않게 되었다." />
      <Prose text="하지만 완전히 다른 세계와의 연결이 끊어진 것은 아니다. 사신의 힘을 가진 것들이 에린에 오면 불가능한 것이 되지 않는다. 그리고 다른 세계의 인간에 가까운 마족도 있어, 그들 중에는 신들을 찾아 에린에 오려는 자들이 있다." />

      <div style={{ background: "#0C0808", border: "1px solid #8A3A18", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#FF8844", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🔍 래구저의 진실</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          사신이라 불리는 것들은 「고대 민족」 에르다에 의해 소환된 다른 세계의 신이다. 에린의 신이 아니다. 그리고 에린에 찾아오는 마족 중에는, 그 신들을 찾아 에린의 각지를 헤매거나, 신들을 에린에서 마계로 해방시키려 하는 것들도 있다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          이렇게 볼 때, 에린에 찾아오는 래구저들은, 그들 자신의 눈으로 보면 신들을 찾아 에린에 온 것이고, 신들과 함께 에린에서 탈출하려 한 것이다. 그리고 동료 마족을 마계에서 해방시키려 하고 있다.
        </p>
      </div>

      <SecTitle title="「고대 민족」 에르다" />
      <Prose text="「고대 민족」 에르다는 에린의 신들이 아닌, 다른 세계의 사신을 에린에 불러들인 고대의 종족이다. 그 이유는 불명이지만, 에르다 자신이 에르다에 의해 원래 세계와는 다른 성질을 부여받아 현재의 사신화된 존재가 나타났다고 한다." />
      <Prose text="에르다의 계획에는 끊이지 않는 균열이 생긴다. 자신들이 믿는 신이 에린의 신들로 인해 에린의 사신으로 변질되었다는 것을 알았기 때문이다. 그 결과, 본래의 다른 세계의 인간에게 에르다는 생물로만 변했다." />
      <Prose text="그리고 사신은 마족화된 주민들을 에린에 불러 모으기 시작했고, 마족들의 내방자로서 신의 힘을 빌려 에린에 나타나게 되었다. 더하여 물질계에서의 침략자들 — 다시 말해 래구저들은, 신들에게 도전하여, 실제로 삼각 전투를 벌이고 있다." />

      <SecTitle title="마족의 목적" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { title: "신들을 찾는 자", desc: "에린의 신들에게 눈을 찌르우는 것, 신들을 에린에서 마계로 해방시키는 것. 이것이 그들의 목적이다. 신들로부터 해방 받아 에린의 사람들의 적이 되는 것은 분명하다." },
          { title: "사신을 해방시키려는 자", desc: "마계에 봉인된 사신을 해방시키고자 한다. 이를 위해 에린으로 침입해 신환자들에 맞선다." },
          { title: "에린에 공감하는 자", desc: "에린에 찾아온 사신의 부하이지만, 긴 세월이 지난 후에 에린에 공감하게 된 자는 에린을 수호하려 행동하는 경우도 있다." },
          { title: "단순히 침략하는 자", desc: "에린의 대지에 목적도 사정도 없이, 단순히 인간들과 에린을 적대하는 마족도 일정수 있다." },
        ].map(c => (
          <div key={c.title} style={{ background: "#0C0808", border: "1px solid #6A3A18", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 700, color: "#E8C870", fontSize: 13, marginBottom: 4 }}>{c.title}</div>
            <p style={{ color: "#D8CCA8", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ScadiSection() {
  return (
    <section>
      <SecTitle title="「불멸의 제후」 스카디" />
      <Prose text="에린에는 대소 다양한 명가가 존재한다. 신들의 폐청 — 신들의 힘을 제거하기 위해 어떤 세력의 힘도 꺾어버릴 수 있다는 소문이 있다. 「불멸의 제후」 스카디. 그것이 그 소문의 정체다." />

      <div style={{ background: "#080C08", border: `1px solid #3A6A1A`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#88CC44", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🌑 「불멸의 제후」의 진실</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          전승에 따르면, 「불멸의 제후」 스카디는 일찍이 「바람의 폐청」에 의해 소멸했다고 여겨지는 「고대 민족」 에르다의 후예라 한다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          「그림자의 나라」라 불리는 곳에 잠복해 있는 그들은, 그곳에서 세계를 감시하고, 때에 간섭한다. 그들의 언어는 에린의 여러 언어를 능숙하게 사용하며, 정체를 숨기는 것이 특기다. 스카디는 그 어디에 있는지를 에린을 지키기 위한 「열쇠」라 불리는 존재를 찾고 있다고도 한다.
        </p>
      </div>

      <SecTitle title="스카디의 목적과 행동원리" />
      <Prose text="스카디의 목적: 에린딜을 「신들의 폐청」으로부터 지키는 것. 이 때문에 어떤 특정한 세력이나 개인에게 지나치게 힘이 쏠리지 않도록, 「신들의 폐청」을 일으키지 않도록 하는 것." />
      <div style={{ background: "#0A0C08", border: "1px solid #4A6A18", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          스카디의 행동 규범에는 선악이나 사상, 정의나 악의 같은 판단 기준은 없다. 오로지 「신들의 폐청」를 일으키는 환경을 만들지 않기 위해 단순히 힘을 쓸 뿐이다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          따라서 그들은 비밀리에 활동하고, 어떤 조직을 약체화시키고, 어떤 개인을 지원한다. 또 어떤 나라를 괴롭히거나 어떤 세력을 원조하는 등, 그 행동 방침은 다양하다. 거기에는 주의와 사상, 정의나 악의 같은 판단 기준이 없다.
        </p>
      </div>

      <SecTitle title="스카디의 행동" />
      <Prose text="스카디는 에린의 여러 세력이나 개인과 교섭한다. 인간이든 마족이든 상관없이, 이 방침을 알고 있는 스카디에게 있어서 그들의 활동은 기이하게 보일 것이다. 또한, 스카디는 폐청을 일으키는 「열쇠」라 불리는 존재를 찾고 있다." />
      <Prose text="또한, 스카디도 예상치 못한 사태가 일어날 수 있다. 샬릴시아가 조직과 인물들의 측면에서, 인간의 편에 서서 활동하는 듯이 보이겠지만, 실은 그녀는 그것을 예상하고 있었다. 빌려준 6개의 마법 도구 (「패왕의 유산」)에 세세한 세공을 해 두어, 그것들을 가지고 죽도록 했다." />
    </section>
  )
}

function OverlordSection() {
  return (
    <section>
      <SecTitle title="「패왕」의 비밀" />
      <Prose text="성력 500년경 파리스 왕국을 건국해, 에린딜 서방의 중원을 통일한 걸물(傑物) — 「패왕」. 그 영웅이 일으킨 수많은 전설이 많은 사람들의 입에서 전해지고 있다." />
      <Prose text="「패왕」의 정체는 오랫동안 수수께끼에 싸여 있었다. 현재도 그 이름 두 가지만이 전해지고 있다." />

      <div style={{ background: "#0C0808", border: `1px solid ${ACCENT}`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: ACCENT, fontWeight: 700, marginBottom: 8, fontSize: 14 }}>👑 「패왕」 샬릴시아의 정체</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          비밀에 싸인 「패왕」의 정체는 <strong style={{ color: ACCENT }}>샬릴시아</strong>라는 여성으로, 스카디의 일원이었다.
          당시 확대 일도에 있던 엘루란 왕국의 독주를 꺾기 위해 스카디로부터 임무를 수행하러 왔다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          그녀는 6인의 동료 (「패왕의 유산」이라 불리는 6개의 강력한 마법 도구를 가진 자들)의 협력으로 중원을 통일하여 파리스 왕국을 건국했고, 엘루란 왕국에 대항했다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          파리스 왕국이라는 강대한 적의 출현으로 인해, 엘루란 왕국은 쇠락해 가기 시작했다. 단, 샬릴시아도 예상치 못한 사태가 일어났다. 샬릴시아의 배신으로 인해, 그 자식이 세상을 떠나게 된다. 그리고 자식을 잃은 엘루란 왕국은 결국 무너졌다.
        </p>
      </div>

      <SecTitle title="아론다이트와 에르다의 후예" />
      <Prose text="「고대 민족」 에르다의 생존자로서, 역사에 영향을 미치고자 활약하는 조직의 일원이면서도, 인간을 위해 싸우는 존재가 있다. 그 이름은 아론다이트." />
      <div style={{ background: "#0A0A0A", border: "1px solid #5A5A18", borderRadius: 8, padding: 14 }}>
        <div style={{ fontWeight: 700, color: "#E8D870", fontSize: 14, marginBottom: 6 }}>아론다이트</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          에르다의 수장 — 「신성왕」 아르토리우스의 충실한 기사였다. 그의 부친이 에르다이며, 어머니는 현재의 방새 도시 티르·나·노그(현 방새 도시)의 대지의 요정이었다고 한다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          아론다이트는 아르토리우스의 사후, 몇 번의 폐청을 살아남아 많은 무훈을 쌓아왔다. 그 끝없는 수행의 결과, 그는 신환자에 버금가는 힘을 얻었다. 현재 에르크레스트·카레지의 학생으로서, 또한 에르크레스트·카레지의 역사학 교수 오레스트·모즈레이가 그녀의 제자이기도 하다.
        </p>
      </div>
    </section>
  )
}

function BalmunkSection() {
  const founders = [
    {
      name: "베리알", nameJp: "ベリアル",
      title: "「검의 왕 (노트룽)」",
      hair: "—", eyes: "—", skin: "—",
      desc: "과거/현재/미래를 나타내는 3×12매의 날개를 가진 마족. 인간에게는 코우모리와 비슷한 날개를 가진 남성 모습으로 접근한다. 강한 자를 굴복시켜 따르게 하는 것을 좋아한다. 세계 구제 계획의 신구 나추라르파를 불러내려 했으나, 그 당시 소멸했다. 제기 812년 12월, 부활하여 마수군 「황금의 늑대」에 의해 「완전한 죽음」을 받았다.",
    },
    {
      name: "아자젤", nameJp: "アザゼル",
      title: "「패왕의 계승자 (프라가라흐)」",
      hair: "금색", eyes: "암갈색", skin: "요염한 백색",
      desc: "6매 12익과 뱀과 같은 7개의 머리를 가진 마족. 각 머리에는 두 개의 얼굴이 있다. 인간의 모습을 취할 때는 밝은 적갈색의 눈동자에 요염한 여성의 모습을 한다. 조종하는 것을 즐기며, 적대자가 자멸하는 것을 최대의 기쁨으로 삼는다. 전투를 좋아하며, 사람들이 탄식하고 괴로워하며 서로를 애도하는 모습을 보는 것을 무엇보다 좋아한다.",
    },
    {
      name: "마린", nameJp: "マーリン",
      title: "「혈의 고리사슬 (다인슬레이브)」",
      hair: "흑색 (소년 아바타)", eyes: "—", skin: "—",
      desc: "붉은빛이 도는 오라를 두른 이름 붙이기 어려운 거인의 모습을 한 마족. 평소에는 본체인 거인을 숨기고, 칠흑의 뿔과 코우모리와 비슷한 날개를 가진 소년의 아바타를 사용한다. 유언비어를 퍼뜨려 인간들이 혼란·자멸하는 모습을 바라보는 것을 즐긴다. 사람 앞에 나타날 때는 예언자를 자처하며 불길한 예언을 전한다. 제기 816년의 4인의 「영웅들」과 「심홍룡」 아인·조우에 의해 약화되었다.",
    },
    {
      name: "네 번째 시조",
      nameJp: "四人目の始祖",
      title: "이름 불명 / 정체 불명",
      hair: "?", eyes: "?", skin: "?",
      desc: "발뭉크를 창설한 시조 4인 중 나머지 1인. 두 가지 이름이 있다는 것, 마족인지 (혹은 인간인지), 혹은 처음부터 존재했던 것인지, 모든 것이 불명이다. 이 4명에 관한 것은 GM이 해방 세션을 향해 준비하는 존재로, 그들의 심연과 캠페인 중에 숨겨진 설정이 개방된다.",
    },
  ]

  return (
    <section>
      <SecTitle title="발뭉크" />
      <Prose text="긴 전쟁이 이어진 아르디온 대륙 동방에서, 인류 총화(제기 816년)를 계기로 일정의 평화가 찾아왔다. 그 전쟁의 이면에는, 발뭉크라 불리는 비밀 결사가 있었다고 한다." />

      <div style={{ background: "#0C0808", border: "1px solid #8A1A1A", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#FF6666", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>💀 발뭉크의 목적</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          발뭉크의 목적: 아르디온 대륙 동방에 혼성 마족을 상대하는 전쟁 태세를 유지하는 것.
          구성원은 마족과 마족에 협력하는 인간들, 그리고 각국의 왕가와 유력자 사이에 침투해 있으며, 국가 세력의 대립과 전쟁을 부추기는 활동을 해왔다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          발뭉크를 창설한 「시조의 4인」은 두 명이 사신 계열의 마족, (혹은 인간), 두 명은 인간이다. 그들의 존재는 알려지기까지 오랜 시간이 걸렸다. 그러나 많은 영웅들이 이들과 싸우려 했지만, 시조의 4인을 쓰러뜨리기 위해서는 긴 전투가 필요하다.
        </p>
      </div>

      <SecTitle title="시조의 4인" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {founders.map(f => (
          <div key={f.name} style={{ background: "#100606", border: "1px solid #6A1A1A", borderRadius: 8, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <span style={{ fontWeight: 700, color: "#F0B8B8", fontSize: 15 }}>{f.name}</span>
                </div>
              <span style={{ color: "#FF8888", fontSize: 12, fontStyle: "italic" }}>{f.title}</span>
            </div>
            {f.hair !== "—" && f.hair !== "?" && (
              <div style={{ display: "flex", gap: 12, marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: "#8A5050" }}>머리: <span style={{ color: "#D8CCA8" }}>{f.hair}</span></span>
                <span style={{ color: "#8A5050" }}>눈: <span style={{ color: "#D8CCA8" }}>{f.eyes}</span></span>
                <span style={{ color: "#8A5050" }}>피부: <span style={{ color: "#D8CCA8" }}>{f.skin}</span></span>
              </div>
            )}
            <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <SecTitle title="십삼신장 (아스란 관련)" />
      <div style={{ background: "#0A0808", border: "1px solid #5A3A18", borderRadius: 8, padding: 14 }}>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          글로비스 직속의 영광의 13명의 용사들. 사람들의 존경을 모으며, 전장을 비롯한 다양한 장면에서 의지가 되는 존재다. 용사 중 가장 유력한 자가 신장필두로 선발된다. PC가 십삼신장 혹은 그 제자가 되어 활약하기 위한 데이터이기도 하다.
          <br /><br />
          <span style={{ color: "#A87A30", fontSize: 12 }}>에리어: 아르디온 대륙 서방 지역 아스란</span>
        </p>
      </div>
    </section>
  )
}

function SalvationSection() {
  return (
    <section>
      <SecTitle title="세계 구제 계획" />
      <Prose text="세계 구제 계획은 레이워르 왕국의 히우이트 왕자가 주도해 진행하고 있었던 계획이다." />

      <div style={{ background: "#080C10", border: "1px solid #1A4A8A", borderRadius: 8, padding: 14, marginBottom: 16 }}>
        <div style={{ color: "#5599CC", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🌍 계획의 내용</div>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
          에린을, 인류를 「신들의 지배」와 「마족의 수탈」로부터 해방시키기 위한 계획이다.
          에린에서 아르디온 대륙 동방을 잘라내고, 별개의 세계로 이동시킨다는 내용이었다. 이 이동에는 많은 능력을 필요로 했다.
        </p>
        <p style={{ color: "#D8CCA8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          이것이 실제로 가능했는지 여부는 역사상 불명이다. 그러나 실제로 역사의 흔적을 보면, 이 계획에 유사한 의식이나 계획이 실행되고 있는 것으로 보인다. 예를 들어, 다른 세계에서 온 래구저들, 아스란을 만들어낸 이주신(二柱の神)의 힘, 일찍이 하늘을 달리던 테니아 — 이것들은 세계 구제 계획과 마찬가지로, 에린의 다른 지역에서 일정한 영역을 잘라내려는 시도였다고 볼 수 있다.
        </p>
      </div>

      <SecTitle title="세계 구제 계획의 규모와 연결" />
      <Prose text="세계 구제 계획의 스케일은 좀처럼 머릿속에 그리기 어렵다. 단, 래구저들이 인류를 넘어 이동하는 것은 불가능하지 않다. 또한 이와 같이 「작은 세계」라고도 부를 수 있는 거주 가능한 영역이, 그밖에도 존재하고 있는 것을 상상시킨다." />
      <Prose text="현재, 계획은 아직 진행 중이다. 세계 구제 계획과 함께, 에린의 그 외 지역으로부터 하나의 경계 구역을 잘라내려 한다. 그러나 무엇보다도, 에린의 외부에서 오는 래구저의 존재를 보여준다. 더하여 이와 같이 생겨난 「작은 세계」라고도 부를 수 있는 거주 가능한 영역이 그밖에도 존재하고 있을 것이다." />

      <SecTitle title="관련 이벤트 연표" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { year: "제기 812년 12월", event: "마수군 「황금의 늑대」, 베리알에게 「완전한 죽음」을 부여. 베리알 소멸." },
          { year: "제기 816년", event: "아르디온 대륙 동방에서의 인류 총화. 긴 전쟁이 끝나 일정한 평화가 찾아온다." },
          { year: "제기 816년 이후", event: "세계 구제 계획 관련 의식과 흔적들이 에린 각지에서 발견되고 있다." },
          { year: "현재 (성력 1013년 기준)", event: "세계 구제 계획은 히우이트 왕자가 사라진 후에도 어떤 형태로 계속 실행되고 있다고 여겨진다." },
        ].map(e => (
          <div key={e.year} style={{ display: "flex", gap: 12, background: "#080C10", border: "1px solid #1A3A5A", borderRadius: 6, padding: "10px 14px", fontSize: 13 }}>
            <span style={{ color: "#5599CC", fontWeight: 700, minWidth: 120, flexShrink: 0 }}>{e.year}</span>
            <span style={{ color: "#D8CCA8" }}>{e.event}</span>
          </div>
        ))}
      </div>

      <SecTitle title="연구자·관련 인물" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          {
            name: "베르프트·바우에스·레이워르", nameJp: "ベルフト·バウエス·レイウォールド",
            desc: "레이워르 왕국의 왕자로서, 힘 있는 존재로 생겨났다. 아르디온 대륙 동방에서 수행과 계획을 추구하고 있으며, 신환자에 버금가는 힘을 손에 넣었다고 한다.",
          },
          {
            name: "스카디의 감시자 파무리샤", nameJp: "ファムリシア",
            desc: "스카디를 위해 활동하는 조직의 일원이면서도, 인간을 위해 싸우는 존재. 「패왕」의 자식이다. 이것은 그녀 자신, 극히 일부의 것만이 아는 비밀이다.",
          },
        ].map(p => (
          <div key={p.name} style={{ background: "#080C10", border: "1px solid #1A3A5A", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 700, color: "#A8C8E8", fontSize: 13, marginBottom: 2 }}>{p.name}</div>
            <p style={{ color: "#D8CCA8", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function SecretsPage() {
  const [active, setActive] = useState("overview")

  function renderContent() {
    switch (active) {
      case "overview":  return <OverviewSection />
      case "invaders":  return <InvadersSection />
      case "scadi":     return <ScadiSection />
      case "overlord":  return <OverlordSection />
      case "balmunk":   return <BalmunkSection />
      case "salvation": return <SalvationSection />
      default:          return <OverviewSection />
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Noto Sans KR', sans-serif", background: "#F7F4EE" }}>
        {/* Sidebar */}
        <aside style={{ width: 220, background: SIDEBAR_BG, color: "#D8CCA8", display: "flex", flexDirection: "column", padding: "24px 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <a href="/" style={{ display: "block", padding: "12px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: "11px", color: "#888" }}>← 아리안로드 위키</div>
          </a>
          <div style={{ padding: "16px 20px 20px", borderBottom: "1px solid #2A2208" }}>
            <div style={{ fontSize: 11, color: "#7A6820", letterSpacing: 2, marginBottom: 4 }}>ARIANROD 2E — GM ONLY</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#E8D870", lineHeight: 1.3 }}>
              세계의 비밀
            </div>
            <div style={{ fontSize: 11, color: "#7A6820", marginTop: 4 }}>비밀 정보</div>
          </div>
          <nav style={{ padding: "12px 0", flex: 1 }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 20px",
                  background: active === item.id ? "#181408" : "transparent",
                  color: active === item.id ? "#E8D870" : "#8A7830",
                  border: "none", borderLeft: active === item.id ? `3px solid ${ACCENT}` : "3px solid transparent",
                  cursor: "pointer", fontSize: 13, fontFamily: "'Noto Sans KR', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 860, overflowY: "auto" }}>
          <header style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: "#AA3333", marginBottom: 4, fontWeight: 700 }}>⛔ GM 전용 비밀 정보</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1A1408", fontFamily: "'Noto Serif KR', serif", margin: "0 0 4px" }}>
              세계의 비밀
            </h1>
            <div style={{ fontSize: 14, color: "#6A5820" }}>비밀 정보 — 이상동몽 세계의 숨겨진 진실</div>
            <div style={{ width: 60, height: 3, background: ACCENT, marginTop: 12, borderRadius: 2 }} />
          </header>
          {renderContent()}
        </main>
      </div>
    </>
  )
}
