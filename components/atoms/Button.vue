<script setup lang='ts'>
interface Props{
  to?: string
}

defineProps<Props>()
</script>

<template>
  <nuxt-link v-if="to" :to="to" class="v-button">
    <slot />
  </nuxt-link>
  <button v-else class="v-button">
    <slot />
  </button>
</template>

<style>
.v-button{
  @apply h-8 flex items-center text-sm py-1.5 px-3 border border-slate-200 rounded;
}
</style>
