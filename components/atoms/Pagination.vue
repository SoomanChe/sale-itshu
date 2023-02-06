<script setup lang="ts">
//

const pages = computed(() => {
  return [
    1, 2, 3, 4,
  ]
})

const currentPage = computed(() => Number(useRoute().query.page) || 1)
</script>

<template>
  <div class="my-4 space-x-1">
    <nuxt-link :to="{query:{page: 1}}" class="py-2 px-3.5 border-slate-900/10 border rounded text-sm hover:bg-slate-50/10">
      <icon name="ph:caret-double-left-light" />
    </nuxt-link>
    <nuxt-link
      v-for="page in pages"
      :key="page"
      :to="{query:{page: page}}"
      class="py-2 px-3.5 border-slate-900/10 border rounded text-sm hover:bg-slate-50"
      :class="{'text-blue-400 font-semibold': currentPage===page}"
    >
      {{ page }}
    </nuxt-link>
    <nuxt-link :to="{query:{page: 10}}" class="py-2 px-3.5 border-slate-900/10 border rounded text-sm hover:bg-slate-50/10">
      <icon name="ph:caret-double-right-light" />
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>
