import {defineConfig} from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pathSrc = path.resolve(__dirname, "./src")

export default defineConfig({
    alias: {
        '@': pathSrc,
    },
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        })
    ]
})
