import type { Router } from 'vue-router';

import { createProgressGuard } from './progressGuard';

export function createGuard(router: Router) {
  createProgressGuard(router);
}
