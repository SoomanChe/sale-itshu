<script setup lang='ts'>

const { data, pending } = await useFetch("/api/blogs/" + useRoute().params.id, {
  method: "get",
})
</script>

<template>
  <div v-if="pending" />

  <div v-else class="min-h-content-body">
    {{ data }}
  </div>
</template>

<style scoped>

</style>
