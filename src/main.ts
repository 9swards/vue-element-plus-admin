import { createApp } from 'vue'
import App from './App.vue'
import installEle from './plugins/element-plus'

import '@/styles/index.scss' // global css

const app = createApp(App)
installEle(app)
app.mount('#app')
