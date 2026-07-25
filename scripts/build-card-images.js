/*
 * drive_cards/<클래스>/<캐릭터명>/1.png  →  public/cards/<카드id>.webp
 *
 * 원본은 750x1050 PNG(장당 1MB 내외)라 그대로 올리기엔 무겁다.
 * 화면에서는 최대 520px로만 쓰므로 그 크기의 webp로 줄여서 저장한다.
 * 실행:  node scripts/build-card-images.js
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SRC = 'C:/Users/joy64/바탕 화면/MyCode/웹/drive_cards'
const ARCHIVE = path.join(__dirname, '..', 'public', 'pedomi-archive.html')
const OUT_DIR = path.join(__dirname, '..', 'public', 'cards')

const WIDTH = 520
const QUALITY = 82

const norm = (s) => String(s ?? '').replace(/\s+/g, '').replace(/[[\]_]/g, '').toLowerCase()

/* 아카이브 HTML에서 카드 id ↔ 이름을 뽑아낸다 */
function readCards() {
  const html = fs.readFileSync(ARCHIVE, 'utf8')
  const cards = []
  // id:"s1", ... name:"도브리냐 니키티치"  (같은 객체 안에서 id가 name보다 앞에 온다)
  const re = /id:\s*"([^"]+)"[\s\S]{0,400}?name:\s*"([^"]+)"/g
  for (const m of html.matchAll(re)) cards.push({ id: m[1], name: m[2] })
  // JSON 형식으로 들어간 항목도 수집
  const re2 = /"id":\s*"([^"]+)"[\s\S]{0,400}?"name":\s*"([^"]+)"/g
  for (const m of html.matchAll(re2)) cards.push({ id: m[1], name: m[2] })

  const byName = new Map()
  for (const c of cards) {
    const k = norm(c.name)
    if (k && !byName.has(k)) byName.set(k, c)
  }
  return byName
}

async function main() {
  const byName = readCards()
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const mapping = {}
  let done = 0, skipped = 0, bytes = 0
  const unmatched = []

  for (const cls of fs.readdirSync(SRC)) {
    const clsDir = path.join(SRC, cls)
    if (!fs.statSync(clsDir).isDirectory()) continue

    for (const charName of fs.readdirSync(clsDir)) {
      const charDir = path.join(clsDir, charName)
      if (!fs.statSync(charDir).isDirectory()) continue

      const files = fs.readdirSync(charDir)
        .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      if (!files.length) { skipped++; continue }

      const card = byName.get(norm(charName))
      if (!card) { unmatched.push(charName); continue }

      // 1.png(첫 번째)이 캐릭터 일러스트 카드
      const src = path.join(charDir, files[0])
      const outName = `${card.id}.webp`
      const outPath = path.join(OUT_DIR, outName)

      const buf = await sharp(src)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer()
      fs.writeFileSync(outPath, buf)

      mapping[card.id] = `/cards/${outName}`
      bytes += buf.length
      done++
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'mapping.json'), JSON.stringify(mapping, null, 2))

  console.log(`생성: ${done}장  (${(bytes / 1048576).toFixed(1)}MB)`)
  console.log(`이미지 없는 폴더: ${skipped}`)
  if (unmatched.length) console.log(`이름 불일치(${unmatched.length}): ${unmatched.join(', ')}`)
  console.log(`매핑 파일: public/cards/mapping.json`)
}

main().catch(e => { console.error(e); process.exit(1) })
