/// <reference types="vite/client" />

// Extend the ImportMeta interface to provide typing for our custom environment variables.
// Vite already declares a minimal `ImportMetaEnv` type via its built-in types, but we
// can augment it here with the specific keys we use in our project to avoid the
// "Property 'env' does not exist on type 'ImportMeta'" and similar TypeScript errors.

declare interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_API_VERSION: string
  // add other `VITE_` variables here as needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
