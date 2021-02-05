import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

export default defineConfig({
  alias: {
    '@': `${pathResolve('src')}`,
  },
  plugins: [vue()],
});
