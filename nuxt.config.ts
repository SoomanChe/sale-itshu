// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: ["@/assets/css/main.pcss"],
  components: {
    dirs: [
      {
        path: "~/components/global",
        global: true,
        prefix: "v",
      },
      {
        path: "~/components/atoms",
        prefix: "v",
      },
      {
        path: "~/components/molecules",
        prefix: "v",
      },
      {
        path: "~/components/organisms",
        prefix: "v",
      },
      {
        path: "~/components/layouts",
        prefix: "v",
      },
      { path: "~/components/pages" },
      {
        path: "~/components",
        prefix: "v",
      },
    ],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@sidebase/nuxt-auth",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxtjs/google-adsense",
  ],
  hooks: {
    "pages:extend" (routes) {
      const blogPage = routes.find(r => r.path === "/blog")?.children?.find(r => r.name === "blog")
      blogPage!.alias = ["/"]
    },
  },
  auth: {
    origin: process.env.AUTH_ORIGIN || "http://localhost:3000",
  },
  "google-adsense": {
    id: "ca-pub-4350961883979083",
  },
  sourcemap: {
    server: true,
    client: true,
  },
  vite: {
    resolve: {
      dedupe: ["vue-router"],
    },
  },
})
