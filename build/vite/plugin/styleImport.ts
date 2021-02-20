/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */

import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const stylePlugin = styleImport({
    libs: [
      {
        libraryName: 'element-plus',
	esModule: true,
        resolveStyle: (name: any) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  });
  return stylePlugin;
}
