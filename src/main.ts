import { createApp } from 'vue'
import App from './App.vue'
import installEle from './plugins/element-plus'

const app = createApp(App)
installEle(app)
app.mount('#app')
