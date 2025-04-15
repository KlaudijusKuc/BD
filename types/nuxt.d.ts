import { RouteLocationNormalized } from 'vue-router'

declare module '#app' {
  interface NuxtApp {
    $router: any
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    googleFonts?: {
      families: Record<string, number[]>
    }
    colorMode?: {
      classSuffix: string
    }
  }
}

declare global {
  const defineNuxtRouteMiddleware: (middleware: (to: RouteLocationNormalized) => void | string) => void
  const definePageMeta: (meta: any) => void
  const navigateTo: (path: string) => void
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
} 