import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@pinia/nuxt',
    ],
    pinia: {
        autoImports: [
            'defineStore',
        ],
    },
    css: [
        'normalize.css',
        '@/assets/styles/main.scss',
    ],
    alias: {
        '@styles': '@/assets/styles/',
    },
    vite: {
        plugins: [svgLoader()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/assets/styles/_variables.scss" as *;
                      `
                }
            }
        }
    }
});