/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VENDOR_PHONE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
