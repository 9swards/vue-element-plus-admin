import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { Icon, addCollection } from '@iconify/vue';
import antdIcons from '@iconify/json/json/ant-design.json';

addCollection(antdIcons);

const compList: any[] = [];

export function registerGlobComp(app: App) {
  app.component('Iconify', Icon);
  compList.forEach((comp: any) => {
    app.component(comp.name, comp);
  });

  app.use(ElementPlus, {});
}
