import { defineNuxtConfig } from 'nuxt3'
import buildProfile from './profiles/build'
import labelProfile from './profiles/label'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    htmlAttrs: {
      lang: 'en'
    },
    title: labelProfile.name,
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: labelProfile.name }
    ]
  },
  buildModules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt'],
  publicRuntimeConfig: {
    build: buildProfile,
    label: labelProfile
  },
  typescript: {
    strict: true,
    shim: false
  },
  vueuse: {
    ssrHandlers: true
  },
  unocss: {
    // https://github.com/antfu/unocss/tree/main/packages/nuxt
    uno: false,
    attributify: false,
    icons: {
      scale: 1,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }
  },
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css'
  ],
  // If we dont transpile, the build/start will have error
  // https://github.com/primefaces/primevue/issues/1969
  build: {
    transpile: ['primevue']
  }
})
