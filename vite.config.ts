import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    root: 'src/ui', // Указываем корневую директорию для исходников UI
    plugins: [react()],
    build: {
        outDir: '../../out/ui_dist', // Директория для собранных файлов UI (путь относительно нового root)
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    },
    base: './' // Указываем, что ресурсы должны загружаться относительно index.html
})