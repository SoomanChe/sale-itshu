<script setup>
import { routes } from "~/constants"

const { status, signOut, data } = useSession()
const isAdmin = data?.value?.user?.email === "straicus@gmail.com"
</script>

<template>
  <header class="border-b border-slate-900/10 dark:border-slate-200 h-14 sticky top-0 inset-x-0 z-50 bg-[radial-gradient(transparent_1px,white_1px)] bg-[length:4px_4px] backdrop-saturate-50 backdrop-blur-sm">
    <div class="max-w-7xl flex items-center h-full mx-auto px-6">
      <nuxt-link
        to="/"
        class="text-2xl text-slate-900 font-godo font-bold"
      >
        <img src="~assets/img/logo.svg" alt="logo" class="h-6 inline-block">
        세일잇슈
      </nuxt-link>

      <nav class="ml-auto text-slate-700 text-sm font-semibold space-x-8">
        <nuxt-link
          v-for="route in routes"
          :key="route"
          :to="route.path"
          class="hover:text-sky-500"
          active-class="text-sky-500"
        >
          {{ route.name }}
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
