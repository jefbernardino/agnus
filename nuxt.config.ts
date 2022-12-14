import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    privateRuntimeConfig: {
        mysql: {
            host: 'mysql.agnusplast.com.br',
            user: 'agnus365_megalu',
            password: 'megalu2211',
            database: 'agnus365_novosite',
        },
    },
    ssr: false,
    build: {
        extractCSS: false,
        transpile: ["vuetify"],
    },
    css: ["@/assets/scss/style.scss"],
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
});
