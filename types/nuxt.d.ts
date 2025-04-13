import { RouteLocationNormalized } from 'vue-router'

declare module '#app' {
  interface NuxtApp {
    $router: any
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    // Add any custom Nuxt config types here
  }
}

declare global {
  const defineNuxtRouteMiddleware: (middleware: (to: RouteLocationNormalized) => void | string) => void
  const definePageMeta: (meta: any) => void
  const navigateTo: (path: string) => void
} 