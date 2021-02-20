import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/installGlobalComponent';
import { isDevMode } from '/@/utils/env';

import '/@/styles/index.scss';

const app = createApp(App);

registerGlobComp(app);
setupI18n(app);
setupRouter(app);
setupStore(app);
setupGlobDirectives(app);
setupErrorHandle(app);
router.isReady().then(() => {
  app.mount('#app', true);
});


if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
