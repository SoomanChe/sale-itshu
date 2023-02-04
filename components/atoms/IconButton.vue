<script setup lang='ts'>
interface Props{
  icon:string
}

defineProps<Props>()
</script>

<template>
  <button class="w-8 h-8">
    <icon :name="icon" size="24" />
  </button>
</template>

<style scoped>

</style>
