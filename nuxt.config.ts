import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // app: {
    //     cdnURL: "https://pedidos.grupoagnus.ind.br/",
    // },
    target: "server",
    ssr: false,
    // render: {
    //     static: {
    //         /**
    //          * Whether to add headers to allow access from any origin
    //          *
    //          * If set to true, all responses of static files from the `public/` directory will contain the following headers:
    //          * Access-Control-Allow-Origin *
    //          * Access-Control-Allow-Methods GET
    //          * Access-Control-Allow-Headers Origin, X-Requested-With, Content-Type, Accept
    //          * X-Frame-Options ALLOWALL
    //          */
    //         allowFromAnyOrigin: true
    //     },
    // },
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
    vite: {
      define: {
        "process.env.DEBUG": false,
      },
    },
});
