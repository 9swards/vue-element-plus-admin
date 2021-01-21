import ElementPlus from 'element-plus'
import type { App } from 'vue'
import 'element-plus/lib/theme-chalk/index.css'

export function registerGlobComp(app: App) {
  app.use(ElementPlus, {
    size: 'medium',
    zIndex: 3000,
  })
}
