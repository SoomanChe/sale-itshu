// https://nuxt.com/docs/api/configuration/nuxt-config

const baseUrl = process.env.AUTH_ORIGIN || "http://localhost:3000"
export default defineNuxtConfig({
  app: {
    head: {
      ...configUtil(baseUrl),
    },
  },
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
    origin: baseUrl,
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

function configUtil (baseUrl:string) {
  const title = "세일잇슈"
  const imageUrl = baseUrl + "/logo.webp"
  const description = "오늘 사는게 제일 싸다! 싸게 살 수 있는 세일 정보를 모아봅니다."
  return {
    title,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: baseUrl,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: title,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: imageUrl,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: description,
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: title,
      },
      {
        hid: "og:locale",
        property: "og:locale",
        content: "ko-KR",
      },
      {
        hid: "og:image:width",
        property: "og:image:width",
        content: "400",
      },
      {
        hid: "og:image:height",
        property: "og:image:height",
        content: "400",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: title,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: description,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: imageUrl,
      },
      /* favicons */
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" },
      /* naver search advisor */
      {
        name: "naver-site-verification",
        content: "9670eb4b3a3ee32f041ac31c25b7a2c2df980716",
      },
    ],
    link: [
      /* favicons */
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
    style: [],
    script: [],
    noscript: [{ children: "Javascript is required" }],
    htmlAttrs: { lang: "ko" },
  }
}
