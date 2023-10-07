import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  }
})
