import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { Icon, addCollection } from '@iconify/vue';
import antdIcons from '@iconify/json/json/ant-design.json';

addCollection(antdIcons);

import SvgIcon from './SvgIcon/index.vue';

const compList: any[] = [SvgIcon];

export function registerGlobComp(app: App) {
  app.component('Iconify', Icon);
  compList.forEach((comp: any) => {
    app.component(comp.name, comp);
  });

  app.use(ElementPlus, {});
}
