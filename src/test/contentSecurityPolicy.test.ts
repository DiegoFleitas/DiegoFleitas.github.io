import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { contentSecurityPolicyFor } from '../../vite.config'

// vitest runs from the repository root
const repositoryRoot = process.cwd()

const buildPolicyFor = (html: string) => contentSecurityPolicyFor(html)

describe('production Content-Security-Policy', () => {
  const indexHtml = readFileSync(resolve(repositoryRoot, 'index.html'), 'utf8')

  it('allows the inline theme script by hash instead of unsafe-inline', () => {
    const policy = buildPolicyFor(indexHtml)
    const scriptOpen = indexHtml.indexOf('<script>')
    const scriptClose = indexHtml.indexOf('</script>', scriptOpen)
    expect(scriptOpen).toBeGreaterThan(-1)
    expect(scriptClose).toBeGreaterThan(scriptOpen)

    const themeScript = indexHtml.slice(scriptOpen + '<script>'.length, scriptClose)
    expect(themeScript).toContain("localStorage.getItem('theme')")

    const hash = createHash('sha256').update(themeScript.replace(/\r\n?/g, '\n'), 'utf8').digest('base64')
    expect(policy).toContain(`'sha256-${hash}'`)
    expect(policy).not.toContain('script-src \'self\' \'unsafe-inline\'')
  })

  it('does not hash external script tags', () => {
    const policy = buildPolicyFor('<head><script type="module" src="/assets/index.js"></script></head>')
    expect(policy).not.toContain('sha256-')
  })

  it('keeps every origin the site loads in the allowlist', () => {
    const policy = buildPolicyFor(indexHtml)
    for (const origin of [
      'https://www.googletagmanager.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://*.google-analytics.com',
    ]) {
      expect(policy).toContain(origin)
    }
  })
})
