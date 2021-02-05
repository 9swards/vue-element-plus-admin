import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const compList: any[] = [];

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name, comp);
  });

  app.use(ElementPlus, {});
}
