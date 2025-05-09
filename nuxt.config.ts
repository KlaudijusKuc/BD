// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt'
  ],

  css: [
    'vue-toastification/dist/index.css',
    'vue3-carousel/dist/carousel.css',
    '@/assets/css/carousel.css'
  ],

  build: {
    transpile: ['vue-toastification']
  },

  // @ts-ignore - googleFonts is a valid property for @nuxtjs/google-fonts module
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700]
    }
  },

  app: {
    head: {
      title: 'E-Shop99 - Inovatyvūs IT Sprendimai',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'E-Shop99 - Pagrindinė IT įmonė, teikianti programinės įrangos kūrimo, debesies sprendimų ir kibernetinio saugumo paslaugas.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  nitro: {
    preset: 'node-server',
    compatibilityDate: '2025-04-13'
  },

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },

  vite: {
    ssr: {
      noExternal: ['@vueuse/core', 'unhead']
    },
    optimizeDeps: {
      include: ['@vueuse/core', 'unhead']
    }
  },

  colorMode: {
    classSuffix: ''
  }
})