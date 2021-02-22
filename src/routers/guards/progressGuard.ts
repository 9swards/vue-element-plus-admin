import type { Router } from 'vue-router';

import nProgress from 'nprogress';

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    nProgress.start();
    return true;
  });

  router.afterEach(async (to) => {
    if (to.meta.loaded) return true;
    nProgress.done();
    return true;
  });
}
