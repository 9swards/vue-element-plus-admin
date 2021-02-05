import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import SvgIcon from './SvgIcon/index.vue';

const compList: any[] = [SvgIcon];

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name, comp);
  });

  app.use(ElementPlus, {});
}
