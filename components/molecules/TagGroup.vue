<script setup lang='ts'>
interface Props{
  items: string[]
}

defineProps<Props>()

const colors = [
  "bg-rose-100 text-rose-400", "bg-sky-100 text-sky-400", "bg-orange-100 text-orange-400",
]
</script>

<template>
  <div class="space-x-2">
    <v-chip v-for="(item,idx) in items" :key="item" :class="colors[idx]">
      {{ item }}
    </v-chip>
  </div>
</template>

<style scoped>

</style>
