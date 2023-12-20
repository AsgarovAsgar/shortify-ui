// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss", "@formkit/nuxt"],
  plugins: ['./plugins/axiosPlugin.ts'],
  css: ["@/assets/main.css"],
  tailwindcss: {
    config: {
      content: ["./node_modules/laravel-vue-pagination/**/*.vue"],
    },
  },
  runtimeConfig: {
    public: {
      appURL: "http://localhost",
    },
  },
  routeRules: {
    "/profiles/*": { swr: true },
    "/*": { ssr: false },
  },
  
  vite: {
    server: {
      hmr: {
        port: 3000,
        clientPort: 3000
      }
    }
  }
});
