import { createApp } from 'vue'
import App from '/@/App.vue'
import router, { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { registerGlobComp } from '/@/components/registerGlobComp'

const app = createApp(App)

registerGlobComp(app)
setupRouter(app)
setupStore(app)

router.isReady().then(() => {
  app.mount('#app', true)
})
