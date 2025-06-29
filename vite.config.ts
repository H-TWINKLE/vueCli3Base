import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import virtualFilePlugin from './src/basic_service/plugin/virtualFilePlugin'
import { viteMockServe } from 'vite-plugin-mock'
import VueDevTools from 'vite-plugin-vue-devtools'

const localEnabled: any = (process.env.USE_MOCK && process.env.USE_MOCK === 'true') || false

export default defineConfig({
    base: './',
    build: {
        assetsDir: 'static'
    },
    resolve: {
        alias: {
            // 设置 `@` 指向 `src` 目录
            // @ts-ignore
            '@': resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue(),
        VueDevTools(),
        virtualFilePlugin(),
        viteMockServe({
            mockPath: './mock',
            // 开发打包开关
            enable: Boolean(localEnabled),
            // 是否在控制台显示请求日志
            logger: false
        })],
    server: {
        port: 9020,
        open: true,
        // 代理网址
        proxy: {
            '/api': {
                target: 'http://127.0.0.1/',
                changeOrigin: true
            }
        },
        cors: true
    }
})
