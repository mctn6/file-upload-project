// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ["@nuxt/typescript-build", 'nuxt-mdi'],
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vuetify: {
    defaultAssets: {
      font: true,
      icons: 'mdi'
    }
  },
  runtimeConfig: {
    public: {
      baseAPI: process.env.BASE_API
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: [
    '~/assets/css/app.css',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
})