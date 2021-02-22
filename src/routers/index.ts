import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './modules';
import { scrollBehavior } from './scrollBehavior';

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: scrollBehavior,
});

export default router;
export function setupRouter(app: App<Element>) {
  app.use(router);
}
