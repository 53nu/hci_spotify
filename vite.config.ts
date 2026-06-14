import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages는 https://53nu.github.io/hci_spotify/ 하위 경로로 서빙되므로
// 빌드 시에만 base를 저장소 이름으로 지정 (로컬 dev는 '/').
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/hci_spotify/' : '/',
  plugins: [react(), tailwindcss()],
}))
