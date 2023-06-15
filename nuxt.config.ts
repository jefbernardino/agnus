import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // app: {
    //     cdnURL: "https://pedidos.grupoagnus.ind.br/",
    // },
    target: "static",
    ssr: false,
    build: {
        extractCSS: false,
        transpile: ["vuetify"],
    },
    css: ["@/assets/scss/style.scss"],
    modules: [
      "@pinia/nuxt",
      "@pinia-plugin-persistedstate/nuxt",
    ],
    vite: {
        resolve: {
            dedupe: [
                'vue'
            ]
        },
        define: {
            "process.env.DEBUG": false,
        },
    },
    router: {
        base: '/',
        options: {
            strict: true,
        },
    },
});
