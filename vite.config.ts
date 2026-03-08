import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Served from site root (e.g. diegofleitas.github.io). For project site at /portfolio/, use base: '/portfolio/'
  base: '/',
})
