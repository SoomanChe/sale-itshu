<script lang="ts" setup></script>

<template>
  <div class="relative pb-12 min-h-screen">
    <v-header-mobile class="lg:hidden" />
    <v-header class="@lg:hidden" />
    <slot />
    <v-footer class="absolute bottom-0 inset-x-0" />
  </div>
</template>

<style scoped></style>
