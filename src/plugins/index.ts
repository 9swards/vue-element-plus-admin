import { App } from 'vue'
import 'nprogress/nprogress.css'

const modules = import.meta.glob('./*.ts')

export default (app: App<Element>): void => {
  for (const path in modules) {
    modules[path]().then((mod: any) => {
      mod.install(app)
    })
  }
}
