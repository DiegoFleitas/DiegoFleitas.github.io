/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { context7HiddenNote, context7SiteKey } from './src/data/site.ts'

// Injects the tag and note into the shared HTML template at build time, so the
// built HTML carries them without any client-side JavaScript.
const context7Ask = {
  name: 'context7-ask',
  transformIndexHtml: {
    order: 'post' as const,
    handler(html: string) {
      const metaTag = `    <meta name="context7-site-verification" content="${context7SiteKey}" />`
      const note = [
        '    <blockquote data-context7-ask="true" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">',
        '      <h2>Search</h2>',
        `      <p>${context7HiddenNote}</p>`,
        '    </blockquote>',
      ].join('\n')

      if (!html.includes('</head>') || !html.includes('<body>')) {
        throw new Error('context7-ask: index.html is missing <head> or <body>')
      }
      return html
        .replace('</head>', `${metaTag}\n  </head>`)
        .replace('<body>', `<body>\n${note}`)
    },
  },
}

export default defineConfig({
  plugins: [context7Ask, tailwindcss(), react()],
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
