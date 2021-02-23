/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */

import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const pwaPlugin = styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  });
  return pwaPlugin;
}
