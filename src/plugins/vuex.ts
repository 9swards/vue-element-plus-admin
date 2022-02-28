import { App } from 'vue'
import { store } from '@/stores'
export default (app: App<Element>): void => {
  app.use(store)
}
