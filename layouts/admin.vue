<script lang="ts" setup></script>

<template>
  <div class="relative pb-12 min-h-screen">
    <v-admin-header />
    <div class="max-w-7xl min-w-[1280px] mx-auto">
      <slot />
    </div>
    <v-footer class="absolute bottom-0 inset-x-0" />
  </div>
</template>

<style scoped></style>
