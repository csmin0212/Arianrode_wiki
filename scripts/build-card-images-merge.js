/*
 * 두 차례 OCR 매칭 결과를 합쳐 public/cards/<카드id>.webp 를 만든다.
 *  - pipeline: 이름 띠 69~80% (서번트 카드에 강함)
 *  - p2:       이름 띠 70~86% + 가로로 붙은 이미지 분할 (마스터·자작 카드에 강함)
 * 같은 카드가 겹치면 해상도가 높은 원본을 쓴다.
 *
 * 실행:  node scripts/build-card-images-merge.js
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SCRATCH = 'C:/Users/joy64/AppData/Local/Temp/claude/C--ArianrodeWiki/834db74b-782d-468d-8a21-e8fea313abb3/scratchpad'
const OUT_DIR = path.join(__dirname, '..', 'public', 'cards')
const MAP_PATH = path.join(OUT_DIR, 'mapping.json')

const WIDTH = 520
const QUALITY = 82

const rj = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''))

async function main() {
  const a = rj(path.join(SCRATCH, 'pipeline/matches.json'))
    .map(m => ({ ...m, sliceW: m.w, slices: 1, slice: 0 }))
  const b = rj(path.join(SCRATCH, 'p2/matches.json'))
  // drive_cards는 폴더명으로 신원이 확실하므로 최우선으로 둔다
  const d = rj(path.join(SCRATCH, 'p3-drive.json')).map(m => ({ ...m, trusted: true }))

  const best = new Map()
  for (const m of [...a, ...b]) {
    const cur = best.get(m.id)
    if (!cur || m.sliceW > cur.sliceW || (m.sliceW === cur.sliceW && m.score > cur.score)) best.set(m.id, m)
  }
  // 폴더명 기반 결과가 있으면 그것으로 덮어쓴다
  for (const m of d) {
    const cur = best.get(m.id)
    if (!cur || !cur.trusted || m.sliceW > cur.sliceW) best.set(m.id, m)
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  // 기존 결과물은 지우고 새로 만든다 (제거된 항목이 남지 않도록)
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith('.webp')) fs.unlinkSync(path.join(OUT_DIR, f))
  }

  const mapping = {}
  let made = 0, failed = 0, bytes = 0

  for (const m of best.values()) {
    try {
      let img = sharp(m.src)
      if (m.slices > 1) {
        // 가로로 붙은 이미지에서 해당 카드만 잘라낸다 (별도 파이프라인으로 처리)
        const meta = await sharp(m.src).metadata()
        const buf = await sharp(m.src)
          .extract({ left: m.slice * m.sliceW, top: 0, width: m.sliceW, height: meta.height })
          .png().toBuffer()
        img = sharp(buf)
      }
      const out = await img.resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toBuffer()
      fs.writeFileSync(path.join(OUT_DIR, `${m.id}.webp`), out)
      mapping[m.id] = `/cards/${m.id}.webp`
      bytes += out.length
      made++
    } catch (e) {
      failed++
    }
  }

  fs.writeFileSync(MAP_PATH, JSON.stringify(mapping, null, 2))
  console.log(`생성: ${made}장 (${(bytes / 1048576).toFixed(1)}MB) / 실패: ${failed}`)
  console.log(`매핑: ${Object.keys(mapping).length}개 카드`)
}

main().catch(e => { console.error(e); process.exit(1) })
