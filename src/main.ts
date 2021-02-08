import { createApp } from 'vue';
import App from './App.vue';
import { registerGlobComp } from './components/installGlobalComponent';
import { installRouter } from '@/routers';
import { installStore } from '@/stores';
import '@/styles/index.scss';

const app = createApp(App);

registerGlobComp(app);
installRouter(app);
installStore(app);

import { mockXHR } from './mock';
if (process.env.NODE_ENV === 'production') {
  mockXHR();
}

app.mount('#app');
