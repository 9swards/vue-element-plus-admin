import { createApp } from 'vue'
import installElementPlus from '@/plugins/element-plus'
import installIcons from '@/plugins/icons.js'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // global css
import './icons' // icon

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app
  .use(store)
  .use(router)
  .mount('#app')
