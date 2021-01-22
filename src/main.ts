import {createApp} from 'vue'
import App from './App.vue'
import {registerGlobComp} from "./components/installGlobalComponent"
import {installRouter} from "@/routers";
import {installStore} from "@/stores";

const app = createApp(App)

registerGlobComp(app)
installRouter(app)
installStore(app)

app.mount('#app')
