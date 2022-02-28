import { App } from 'vue'
import 'nprogress/nprogress.css'

const modules = import.meta.globEager('./**/*.[t|j]s')

export default (app: App<Element>): void => {
  Object.keys(modules).forEach((value: any) => {
    modules[value].default(app)
  })
}
