import axios from 'axios'
export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = 'https://agnusplast.com.br/pedidos/';

    let api = axios.create({
        baseUrl: defaultUrl,
        proxyHeaders: false,
        credentials: false,
        headers: {
            common: {},
        },
    });
    return {
        provide: {
            api: api,
        },
    };
});
