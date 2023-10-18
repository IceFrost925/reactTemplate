import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import {viteMockServe} from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      logger: false,
      mockPath: 'mock'
    }),
    createSvgIconsPlugin({
      // 自动封装svg为svgIcon组件 指定需要缓存的图标文件夹
      iconDirs: [resolve(__dirname, 'src/assets/img/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    })
  ],
  resolve: {
    // 配置别名
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  server: {
    open: true
    /*proxy: {
      '/dev': {
        target: 'https://www.fastmock.site/mock/64f237e2c70ee37283fd8aebaf65d820/api',
        changeOrigin: true,
        cookieDomainRewrite: '',
        rewrite: (path) => path.replace(new RegExp(`/dev`), '')
      }
    }*/
  }
})
