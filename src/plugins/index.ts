import { App } from 'vue'
import elInstall from '@/plugins/element-plus'
import 'nprogress/nprogress.css'

export default (app: App<Element>): void => {
  elInstall(app)
}
