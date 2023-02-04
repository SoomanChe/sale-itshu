<script setup lang='ts'>
interface Props {
  error: {
    url: string,
    statusCode: string,
    statusMessage: string,
    message: string,
    stack: string,
    data: string
  }
}

defineProps<Props>()
</script>

<template>
  <div class="relative pb-12 min-h-screen">
    <v-header-mobile class="lg:hidden" />
    <v-header class="@lg:hidden" />
    <div class="min-h-content-body flex flex-auto items-center justify-center text-center px-4 flex-col sm:flex-row">
      <h1
        class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight sm:pr-6 sm:mr-6 sm:border-r sm:border-slate-900/10 sm:dark:border-slate-300/10 dark:text-slate-200"
      >
        {{ error.statusCode }}
      </h1>
      <h2 class="mt-2 text-lg text-slate-700 dark:text-slate-400 sm:mt-0">
        {{ error.message }}
      </h2>
    </div>
    <v-footer class="absolute bottom-0 inset-x-0" />
  </div>
</template>

<style scoped>

</style>
