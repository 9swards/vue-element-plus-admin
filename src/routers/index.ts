import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';

import { baseRoutes } from './routes';
import { scrollBehavior } from './scrollBehavior';

// app router
const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior,
});

export function installRouter(app: App<Element>) {
  app.use(router);
}

router.onError((error) => {
  console.error(error);
});

export default router;
