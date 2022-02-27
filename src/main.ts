import { createApp } from 'vue'
import App from '@/App.vue'
import direct from '@/directives/actions'
import install from '@/plugins'
import router from '@/routers'
import { store } from '@/stores/index'
import '@/routers/permission'
import '@/styles/index.css'

import '@/mocks'

const app = createApp(App)
direct(app)
install(app)

app.use(router)
app.use(store)
app.mount('#app')
