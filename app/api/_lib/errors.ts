/* "fetch failed" 같은 껍데기 메시지 대신 실제 원인(ENOTFOUND 등)까지 풀어준다.
   Node의 fetch 실패는 원인이 error.cause 에 중첩되어 들어간다. */
export function describeError(e: unknown): string {
  if (!(e instanceof Error)) return String(e)
  const parts: string[] = [e.message]
  let cause: unknown = (e as { cause?: unknown }).cause
  let depth = 0
  while (cause && depth < 3) {
    if (cause instanceof Error) {
      const code = (cause as { code?: string }).code
      parts.push(code ? `${code}: ${cause.message}` : cause.message)
      cause = (cause as { cause?: unknown }).cause
    } else {
      parts.push(String(cause))
      break
    }
    depth++
  }
  return parts.join(' — ')
}
