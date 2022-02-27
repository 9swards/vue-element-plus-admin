import { App } from 'vue'
interface AssertOptions {
  assert?: {
    type: string
  }
}
interface ImportMetaEnv {
  readonly NINE_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
  glob<Module = { [key: string]: any }>(
    pattern: string,
    options?: AssertOptions
  ): Record<string, (app: App) => Promise<Module>>

  globEager<Module = { [key: string]: any }>(pattern: string, options?: AssertOptions): Record<string, Module>
}
