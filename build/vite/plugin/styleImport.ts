import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const stylePlugin = styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        resolveStyle: (name: any) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  });
  return stylePlugin;
}
