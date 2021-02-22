import type { App } from 'vue';
import { registerGlobComp } from './elementPlus';
import { setupI18n } from './useI18n';

export function setupPlugins(app: App) {
  registerGlobComp(app);
  setupI18n(app);
}
