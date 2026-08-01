/*
 * 아카이브 복구 스크립트
 *
 * data/pedomi-archive-snapshot.json 의 내용을 서버에 그대로 되돌린다.
 * 저장소가 초기화되었거나(무료 플랜 자동 보관 등) 데이터가 망가졌을 때 사용한다.
 *
 *   확인만:  node scripts/restore-archive.js
 *   실제 복구: node scripts/restore-archive.js --yes
 *
 * 주의: 서버의 현재 내용을 스냅샷으로 완전히 대체한다.
 *       복구 전에 현재 상태를 먼저 백업해 두는 것을 권한다.
 */
const fs = require('fs')
const path = require('path')

const SITE = process.env.ARCHIVE_SITE || 'https://arianrode-wiki.vercel.app'
const SNAPSHOT = path.join(__dirname, '..', 'data', 'pedomi-archive-snapshot.json')

async function main() {
  const apply = process.argv.includes('--yes')

  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8'))
  if (!Array.isArray(snapshot) || !snapshot.length) {
    console.error('스냅샷 파일이 비었거나 형식이 올바르지 않습니다.')
    process.exit(1)
  }

  // 현재 서버 상태부터 확인
  let live = null
  try {
    const r = await fetch(`${SITE}/api/archive`, { cache: 'no-store' })
    const d = await r.json()
    live = typeof d.value === 'string' ? JSON.parse(d.value) : d.value
  } catch (e) {
    console.log('현재 서버 상태를 읽지 못했습니다:', e.message)
  }

  console.log(`스냅샷: ${snapshot.length}장`)
  console.log(`현재 서버: ${Array.isArray(live) ? live.length + '장' : '읽기 실패'}`)

  if (Array.isArray(live) && live.length > snapshot.length) {
    console.log('\n경고: 서버가 스냅샷보다 카드가 많습니다.')
    console.log('복구하면 그 차이만큼 사라집니다. 정말 필요한지 확인하세요.')
  }

  if (!apply) {
    console.log('\n확인 모드입니다. 실제로 복구하려면 --yes 를 붙여 실행하세요.')
    return
  }

  const res = await fetch(`${SITE}/api/archive`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: JSON.stringify(snapshot) }),
  })
  const out = await res.json().catch(() => ({}))
  if (!res.ok) {
    console.error(`복구 실패 (HTTP ${res.status}):`, out.error || '')
    process.exit(1)
  }
  console.log(`복구 완료: ${snapshot.length}장`)
}

main().catch(e => { console.error(e); process.exit(1) })
