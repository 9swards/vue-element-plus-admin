import { App } from 'vue'
import router from '@/routers'

export default (app: App<Element>): void => {
  app.use(router)
}
