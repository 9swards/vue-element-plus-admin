import { resolve } from 'path';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;

  return {
    resolve: {
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    build: {
      outDir: OUTPUT_DIR,
      polyfillDynamicImport: VITE_LEGACY,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
    },
    css: {
      preprocessorOptions: {},
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: ['@iconify/iconify'],
    },
    server: {
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
  };
};
