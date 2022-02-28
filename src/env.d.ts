interface ImportMetaEnv {
  readonly NINE_BASE_URL: string
  readonly NINE_DEBUG: boolean | undefined
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
