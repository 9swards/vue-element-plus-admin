import {defineConfig} from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
    // alias: {
    //     '/@/': path.resolve(__dirname, './src'),
    //     '/@views/': path.resolve(__dirname, './src/views'),
    //     '/@components/': path.resolve(__dirname, './src/components'),
    //     '/@utils/': path.resolve(__dirname, './src/utils'),
    // },
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        })
    ]
})
