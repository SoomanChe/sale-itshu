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
        <nuxt-link
          v-if="isAdmin"
          to="/manage"
          class="hover:text-sky-500"
          active-class="text-sky-500"
        >
          Manage
        </nuxt-link>
      </nav>
      <div class="h-6 pl-6 border-l border-slate-200 ml-6 flex items-center space-x-6">
        <v-icon-button icon="heroicons:magnifying-glass-20-solid" class="text-slate-400 hover:text-slate-500" />
        <v-button v-if="status==='authenticated'" @click="signOut({callbackUrl:'/'})">
          Logout
        </v-button>
        <v-button v-else to="/manage">
          Login
        </v-button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
