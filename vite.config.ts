/// <reference types="vitest/config" />
import { createHash } from 'node:crypto'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Every inline <script> in the built HTML is hashed so the CSP can allow exactly
 * those bytes and nothing else (no 'unsafe-inline').
 */
const inlineScriptHashes = (html: string) =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(
    // The HTML parser normalises CRLF to LF inside script data, so hash that form.
    ([, source]) =>
      `'sha256-${createHash('sha256').update(source.replace(/\r\n?/g, '\n'), 'utf8').digest('base64')}'`,
  )

/**
 * Production Content-Security-Policy, delivered as <meta http-equiv> because GitHub
 * Pages cannot set response headers. External origins are limited to the two the site
 * actually loads: Google Fonts (index.html) and GA4 gtag.js (src/utils/analytics.ts).
 */
export const contentSecurityPolicyFor = (html: string) =>
  [
    "default-src 'self'",
    `script-src 'self' ${inlineScriptHashes(html).join(' ')} https://www.googletagmanager.com`.replace('  ', ' '),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')

// Injected into built HTML only: an inline policy in index.html would also block the
// Vite dev server's inline React-refresh preamble.
const contentSecurityPolicyMeta = {
  name: 'content-security-policy-meta',
  apply: 'build' as const,
  transformIndexHtml: {
    order: 'post' as const,
    handler(html: string) {
      if (!html.includes('<head>')) {
        throw new Error('content-security-policy-meta: index.html is missing <head>')
      }
      const policy = contentSecurityPolicyFor(html)
      const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}" />`
      return html.replace('<head>', `<head>\n    ${meta}`)
    },
  },
}

export default defineConfig({
  plugins: [contentSecurityPolicyMeta, tailwindcss(), react()],
  // Served from site root (e.g. diegofleitas.github.io). For project site at /portfolio/, use base: '/portfolio/'
  base: '/',
  server: { host: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['src/e2e/**'],
  },
})
