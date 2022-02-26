import { App } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import * as ElIconModules from '@element-plus/icons-vue'

const transName = (iconName: string) => {
  return `i-${iconName.replace(/A-Z/g, (match: string) => '-' + match.toLowerCase())}`
}

export default (app: App<Element>): void => {
  for (const iconName in ElIconModules) {
    console.log(iconName)
    app.component(transName(iconName), ElIconModules[iconName])
  }
  app.use(ElementPlus)
}
