/*
 * OCR로 찾아낸 인물 카드를 public/cards/<카드id>.webp 로 생성한다.
 * 앞서 drive_cards로 만든 매핑(mapping.json)과 합치며, 해상도가 높은 원본을 우선한다.
 *
 * 선행: scratchpad 파이프라인(1-crop → OCR → 2b-match)이 matches.json을 만들어 둔 상태
 * 실행:  node scripts/build-card-images-ocr.js
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const WORK = 'C:/Users/joy64/AppData/Local/Temp/claude/C--ArianrodeWiki/834db74b-782d-468d-8a21-e8fea313abb3/scratchpad/pipeline'
const OUT_DIR = path.join(__dirname, '..', 'public', 'cards')
const MAP_PATH = path.join(OUT_DIR, 'mapping.json')

const WIDTH = 520
const QUALITY = 82

async function main() {
  const matches = JSON.parse(fs.readFileSync(path.join(WORK, 'matches.json'), 'utf8'))
  const existing = fs.existsSync(MAP_PATH) ? JSON.parse(fs.readFileSync(MAP_PATH, 'utf8')) : {}

  // drive_cards로 이미 만든 것은 750x1050 원본이므로 그대로 둔다
  const already = new Set(Object.keys(existing))

  fs.mkdirSync(OUT_DIR, { recursive: true })
  const mapping = { ...existing }
  let made = 0, kept = 0, failed = 0, bytes = 0

  for (const m of matches) {
    if (already.has(m.id) && m.w <= 750) { kept++; continue }
    const outName = `${m.id}.webp`
    try {
      const buf = await sharp(m.src)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer()
      fs.writeFileSync(path.join(OUT_DIR, outName), buf)
      mapping[m.id] = `/cards/${outName}`
      bytes += buf.length
      made++
    } catch (e) {
      failed++
    }
  }

  fs.writeFileSync(MAP_PATH, JSON.stringify(mapping, null, 2))
  console.log(`새로 생성: ${made}장 (${(bytes / 1048576).toFixed(1)}MB)`)
  console.log(`기존 유지: ${kept}장 / 실패: ${failed}`)
  console.log(`매핑 총계: ${Object.keys(mapping).length}개 카드`)
}

main().catch(e => { console.error(e); process.exit(1) })
