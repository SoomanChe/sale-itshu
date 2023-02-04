<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core"
import { routes } from "~/constants"

const isActive = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)

watchEffect(() => {
  if (breakpoints.greaterOrEqual("lg").value) {
    isActive.value = false
  }
})

const nav = ref()
onClickOutside(nav, () => {
  isActive.value = false
})

/* auth */
const { status, signOut, data } = useSession()
const isAdmin = data?.value?.user?.email === "straicus@gmail.com"
</script>

<template>
  <header class="border-b border-slate-900/10 dark:border-slate-200 h-14 sticky top-0 inset-x-0 z-50 bg-white">
    <div class="max-w-7xl mx-auto h-full flex items-center px-4">
      <nuxt-link
        to="/"
        class="text-2xl text-slate-900 font-godo font-bold"
      >
        <img src="~assets/img/logo.svg" alt="logo" class="h-6 inline-block">
        세일잇슈
      </nuxt-link>

      <div class="lg:pl-6 lg:border-l border-slate-200 lg:ml-6 ml-auto flex items-center">
        <v-icon-button icon="heroicons:magnifying-glass-20-solid" class="text-slate-500" />
        <div class="ml-2 lg:hidden">
          <v-icon-button icon="heroicons:ellipsis-vertical-20-solid" class="text-slate-500" @click="isActive = true" />
        </div>
      </div>

      <teleport v-if="isActive" to="body">
        <div class="fixed inset-0 z-50 lg:hidden" role="dialog">
          <div class="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
          <nav
            ref="nav"
            class="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5"
          >
            <v-icon-button
              icon="mdi:close"
              class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              @click="isActive=false"
            />
            <div class="space-y-6 flex flex-col">
              <nuxt-link
                v-for="route in routes"
                :key="route"
                :to="route.path"
                active-class="text-sky-500"
                @click="isActive=false"
              >
                {{ route.name }}
              </nuxt-link>
            </div>
          </nav>
        </div>
      </teleport>
    </div>
  </header>
</template>

<style scoped></style>
