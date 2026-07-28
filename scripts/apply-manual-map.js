/*
 * 직접 이미지를 보고 확인한 매핑(manual-map.json)을 적용한다.
 *   { "카드이름": "폴더/파일명" }   ← 확장자는 생략 가능 (png 우선)
 * 같은 이름의 카드가 여러 개면 모두에 같은 이미지를 넣는다.
 *
 * 실행: node scripts/apply-manual-map.js
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = 'C:/Users/joy64/바탕 화면/MyCode/웹'
const SCRATCH = 'C:/Users/joy64/AppData/Local/Temp/claude/C--ArianrodeWiki/834db74b-782d-468d-8a21-e8fea313abb3/scratchpad'
const OUT_DIR = path.join(__dirname, '..', 'public', 'cards')
const MAP_PATH = path.join(OUT_DIR, 'mapping.json')

const WIDTH = 520
const QUALITY = 82

const rj = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''))

/* 확장자가 없으면 png → webp → jpg 순으로 찾는다 (png가 원본 해상도) */
function resolveFile(rel) {
  const full = path.join(ROOT, rel)
  if (fs.existsSync(full) && fs.statSync(full).isFile()) return full
  for (const ext of ['.png', '.webp', '.jpg', '.jpeg']) {
    const p = full + ext
    if (fs.existsSync(p)) return p
  }
  return null
}

async function main() {
  const manual = rj(path.join(SCRATCH, 'manual-map.json'))
  const cards = rj(path.join(SCRATCH, 'pipeline/cards.json'))
  const mapping = rj(MAP_PATH)

  // 이름 → 카드들 (동명이인 카드가 있을 수 있다)
  const byName = new Map()
  for (const c of cards) {
    if (!byName.has(c.name)) byName.set(c.name, [])
    byName.get(c.name).push(c)
  }

  let made = 0, skipped = 0
  const problems = []

  const byId = new Map(cards.map(c => [c.id, c]))

  // 카드 ID로 지정한 항목이 이름으로 지정한 항목보다 구체적이므로 먼저 처리하고,
  // 이름 지정으로 이미 채워진 것도 덮어쓴다.
  // (그렇지 않으면 동명이인 카드가 같은 이미지를 공유해 버린다)
  const entries = Object.entries(manual).filter(([k]) => !k.startsWith('_'))
  entries.sort((a, b) => (byId.has(b[0]) ? 1 : 0) - (byId.has(a[0]) ? 1 : 0))

  for (const [name, rel] of entries) {
    const isIdKey = byId.has(name)
    const targets = isIdKey ? [byId.get(name)] : byName.get(name)
    if (!targets) { problems.push(`카드 없음: ${name}`); continue }
    const src = resolveFile(rel)
    if (!src) { problems.push(`파일 없음: ${name} → ${rel}`); continue }

    let buf
    try {
      buf = await sharp(src).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toBuffer()
    } catch (e) { problems.push(`변환 실패: ${name} (${e.message})`); continue }

    for (const c of targets) {
      // ID로 콕 집어 지정한 것은 덮어쓴다. 이름 지정은 빈 카드만 채운다.
      if (mapping[c.id] && !isIdKey) { skipped++; continue }
      fs.writeFileSync(path.join(OUT_DIR, `${c.id}.webp`), buf)
      mapping[c.id] = `/cards/${c.id}.webp`
      made++
    }
  }

  fs.writeFileSync(MAP_PATH, JSON.stringify(mapping, null, 2))
  console.log(`추가: ${made}장 / 이미 있어 건너뜀: ${skipped}`)
  console.log(`전체 매핑: ${Object.keys(mapping).length}개 카드`)
  if (problems.length) {
    console.log('\n확인 필요:')
    problems.forEach(p => console.log('  ', p))
  }
}

main().catch(e => { console.error(e); process.exit(1) })
