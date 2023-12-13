import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    build: {
      extractCSS: false,
      transpile: ["vuetify"],
    },
    content: {
      experimental: {
        clientDB: true,
      }
    },
    css: ["@/assets/scss/style.scss"],
    modules: [
      "@pinia/nuxt",
      "@pinia-plugin-persistedstate/nuxt",
    ],
    piniaPersistedstate: {
      cookieOptions: {
        sameSite: 'strict',
      },
      storage: 'sessionStorage'
    },
    proxy: {
      'prefix': 'url',
    },
    router: {
      options: {
        strict: true,
      },
    },
    routeRules: {
      "/**": { prerender: true },
    },
    runtimeConfig: {
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_PORT: process.env.DATABASE_PORT,
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_PASS: process.env.DATABASE_PASS,
      DATABASE_DATA: process.env.DATABASE_DATA,
    },
    vite: {
      define: {
        "process.env.DEBUG": false,
      },
    },
});
