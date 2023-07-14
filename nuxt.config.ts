// https://nuxt.com/docs/api/configuration/nuxt-config

import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
    devtools: {
        enabled: true,
    },
    modules: [
    ],
    css: [
        '~/assets/css/tailwind.css'
    ],
    postcss: {
        plugins: {
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        weatherApiKey: process.env.WEATHER_API_KEY,
    }
};

export default config;
