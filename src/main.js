import { createApp } from 'vue'
import installElementPlus from '@/plugins/element-plus'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
installElementPlus(app)
app
  .use(store)
  .use(router)
  .mount('#app')
