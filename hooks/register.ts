import type { Register } from 'claude-code'

const THRESHOLD = 99

const WRITE_SIGNAL =
  'mkdir -p "$HOME/.claude" && printf \'{"sessionId":"%s","cwd":"%s"}\' "$1" "$2" > "$HOME/.claude/eco-signal.json"'

export const register: Register = on => {
  let isSignalled = false

  on('session.measure', async ($, e, next) => {
    const win = e.rateLimits.find(r => r.kind === 'five_hour')

    if (win !== undefined && win.percentUsed >= THRESHOLD && !isSignalled) {
      isSignalled = true
      const sessionId = await $.session.id()
      const cwd = await $.session.cwd()
      await $.process.run(['/bin/sh', '-c', WRITE_SIGNAL, 'sh', sessionId, cwd])
      $.ui.toast(`Sesión al ${win.percentUsed}%: claude-eco pasa a Console en unos segundos.`)
      $.ui.status('→ Console')
    }

    return next(e)
  })
}
