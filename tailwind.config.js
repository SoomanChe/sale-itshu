// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.ts",
    "./plugins/**/*.ts",
    "./Appvue",
    "./appvue",
    "./Error.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
        godo: ["Godo", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        pattern: "url('@/assets/img/pattern.webp')",
      },
      screens: {
        "@sm": { max: "639px" },
        "@md": { max: "767px" },
        "@lg": { max: "1023px" },
      },
      minHeight: {
        "content-body": "calc(100vh - 56px - 48px)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
