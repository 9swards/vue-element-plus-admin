import {createApp} from 'vue'
import App from './App'
import installEle from './plugins/element-plus'

import '@/styles/index.scss' // global css
import router from './router'
import store from './store'

const app = createApp(App)
installEle(app)
app
    .use(store)
    .use(router)
    .mount('#app')
