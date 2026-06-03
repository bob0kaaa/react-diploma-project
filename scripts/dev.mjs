import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const R = '\x1b[0m'
const BOLD = '\x1b[1m'
const BLUE = '\x1b[34m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RED = '\x1b[31m'
const DIM = '\x1b[2m'

const tag = (name, color) => `${color}${BOLD}[${name}]${R}`

const printLine = (name, color, line) => {
  if (line.trim()) process.stdout.write(`${tag(name, color)} ${DIM}${line}${R}\n`)
}

const printReady = (msg) => {
  process.stdout.write(`\n${BOLD}${GREEN}  ✓ ${msg}${R}\n\n`)
}

const flaky = process.argv.includes('--flaky')

// ─── Backend ───────────────────────────────────────────────────────────────
const backendEnv = { ...process.env }
if (flaky) {
  backendEnv.APP_DELAY = 'true'
  backendEnv.APP_ERROR = 'true'
}

const backend = spawn('node', ['src/index.mjs'], {
  cwd: path.join(root, 'backend'),
  env: backendEnv,
})

backend.stdout.on('data', (buf) => {
  buf.toString().split('\n').forEach((line) => {
    const m = line.match(/running on port (\d+)/i)
    if (m) {
      printReady(`Backend поднялся  →  http://localhost:${m[1]}${flaky ? '  (flaky mode: задержки + ошибки)' : ''}`)
    } else {
      printLine('backend', BLUE, line)
    }
  })
})

backend.stderr.on('data', (buf) => {
  buf.toString().split('\n').forEach((line) => printLine('backend', RED, line))
})

// ─── Frontend (Vite) ────────────────────────────────────────────────────────
const frontend = spawn('node', ['node_modules/.bin/vite'], {
  cwd: root,
  env: { ...process.env },
})

frontend.stdout.on('data', (buf) => {
  buf.toString().split('\n').forEach((line) => {
    const m = line.match(/Local:\s+(https?:\/\/localhost[^\s]+)/)
    if (m) {
      printReady(`Frontend поднялся  →  ${m[1]}`)
    } else {
      printLine('frontend', GREEN, line)
    }
  })
})

frontend.stderr.on('data', (buf) => {
  buf.toString().split('\n').forEach((line) => printLine('frontend', YELLOW, line))
})

// ─── Cleanup ────────────────────────────────────────────────────────────────
const shutdown = () => {
  backend.kill()
  frontend.kill()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

backend.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    process.stdout.write(`${tag('backend', RED)} exited with code ${code}\n`)
    shutdown()
  }
})
