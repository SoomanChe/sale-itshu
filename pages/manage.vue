<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "admin" })
</script>

<template>
  <div class="w-7xl mx-auto grid grid-cols-[216px_1fr] gap-10 px-[65px] pt-10">
    <div>
      sidebar
    </div>
    <nuxt-page />
  </div>
</template>
