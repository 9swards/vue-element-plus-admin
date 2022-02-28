import { App } from 'vue'
import kebabCase from 'lodash-es/kebabCase'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElIconModules from '@element-plus/icons-vue'

const transName = (iconName: string) => {
  return `i-${kebabCase(iconName)}`
}

export default (app: App<Element>): void => {
  Object.keys(ElIconModules).forEach((key) => {
    app.component(transName(key), ElIconModules[key as keyof typeof ElIconModules])
  })
  app.use(ElementPlus)
}
