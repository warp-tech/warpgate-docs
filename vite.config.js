import { defineConfig } from 'vite'
export default defineConfig({
    root: './theme-src',
    build: {
        rollupOptions: {
            input: {
                app: './theme-src/main.html',
            },

        },
        outDir: '../theme',
    },
})
