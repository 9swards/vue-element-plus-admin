import { Router } from 'vue-router'

import { createScrollGuard } from './scrollGuard'

export function createGuard(router: Router) {
  createScrollGuard(router)
}
