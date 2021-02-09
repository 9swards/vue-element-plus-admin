import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from '/@/routers';
import { setupStore } from '/@/stores';
import { registerGlobComp } from '/@/components/installGlobalComponent';
import { isDevMode } from '/@/utils/env';

import '/@/styles/index.scss';

const app = createApp(App);

registerGlobComp(app);
setupRouter(app);
setupStore(app);
router.isReady().then(() => {
  app.mount('#app', true);
});

if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
