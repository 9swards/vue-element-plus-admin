import { createApp } from 'vue';
import App from './App.vue';
import { setupPlugins } from '/@/plugins';
import { setupRouter } from '/@/routers';
import { setupStore } from '/@/stores';
import '/@/styles/index.scss';

const app = createApp(App);
setupPlugins(app);
setupRouter(app);
setupStore(app);

app.mount('#app');
