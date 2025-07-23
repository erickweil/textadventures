import { defineConfig } from 'vite'


export default defineConfig({
  server: {
    allowedHosts: true,
    port: 3000,
  },
  base: "/textadventures/"
})