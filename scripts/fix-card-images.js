/*
 * 스킬 카드가 잘못 붙은 항목을 찾아, 같은 캐릭터의 다른 이미지 중
 * '인물 카드'(이름 띠에 캐릭터 이름이 인쇄된 것)로 교체한다.
 *
 * 판정: 최종 이미지의 이름 띠 OCR 결과가 길거나(스킬 설명) 이름과 전혀 다르면 오류.
 * 실행:  node scripts/fix-card-images.js <bad-ids.json>
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const OUT_DIR = path.join(__dirname, '..', 'public', 'cards')
const MAP_PATH = path.join(OUT_DIR, 'mapping.json')
const DRIVE = 'C:/Users/joy64/바탕 화면/MyCode/웹/drive_cards'

const norm = s => String(s ?? '').replace(/[\s·:()[\]_,.\-—=/|<>「」`'"*]/g, '').toLowerCase()

async function main() {
  const badIds = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
  const mapping = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
  const cards = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))
  const byId = new Map(cards.map(c => [c.id, c]))

  // drive_cards 캐릭터 폴더 색인
  const folders = new Map()
  for (const cls of fs.readdirSync(DRIVE)) {
    const p = path.join(DRIVE, cls)
    if (!fs.statSync(p).isDirectory()) continue
    for (const ch of fs.readdirSync(p)) {
      const cp = path.join(p, ch)
      if (fs.statSync(cp).isDirectory()) folders.set(norm(ch), cp)
    }
  }

  const work = process.argv[4]   // 후보 크롭을 모을 폴더
  fs.rmSync(work, { recursive: true, force: true })
  fs.mkdirSync(work, { recursive: true })

  const idx = []
  let n = 0
  for (const id of badIds) {
    const card = byId.get(id)
    if (!card) continue
    const dir = folders.get(norm(card.name))
    if (!dir) { console.log(`원본 폴더 없음: ${card.name}`); continue }

    const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    for (const f of files) {
      const src = path.join(dir, f)
      let m
      try { m = await sharp(src).metadata() } catch { continue }
      if (m.width / m.height < 0.6 || m.width / m.height > 0.8) continue
      // 원본(750x1050)은 이름 띠가 아래쪽에 있다
      const key = `f${String(n).padStart(4, '0')}.png`
      await sharp(src)
        .extract({ left: 0, top: Math.round(m.height * 0.80), width: m.width, height: Math.round(m.height * 0.10) })
        .resize({ width: Math.min(1600, m.width * 2) })
        .grayscale().normalize().sharpen()
        .png().toFile(path.join(work, key))
      idx.push({ key, id, name: card.name, src, w: m.width })
      n++
    }
  }
  fs.writeFileSync(path.join(work, 'index.json'), JSON.stringify(idx, null, 1))
  console.log(`후보 크롭 ${n}장 생성 → OCR 후 fix-card-images-apply.js 실행`)
}

main().catch(e => { console.error(e); process.exit(1) })
