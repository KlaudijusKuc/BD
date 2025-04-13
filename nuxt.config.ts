// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts'
  ],

  // @ts-ignore - colorMode is a valid property for @nuxtjs/color-mode module
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  // @ts-ignore - googleFonts is a valid property for @nuxtjs/google-fonts module
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'Space+Grotesk': [400, 500, 600, 700]
    }
  },

  app: {
    head: {
      title: 'NovaTech Solutions - Innovative IT Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'NovaTech Solutions - Leading IT company providing software development, cloud solutions, and cybersecurity services.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  compatibilityDate: '2025-04-13'
})