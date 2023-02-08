<script setup lang="ts">
interface Props {
  image: File
}

const _prop = defineProps<Props>()
const { image } = toRefs(_prop)

defineEmits(["delete:image"])

const preview = computed(() => useObjectUrl(image).value)
</script>

<template>
  <div class="relative border w-48">
    <v-icon-button
      icon="mdi:close"
      size="20"
      class="rounded-full bg-gray-900 text-gray-100 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      @click="$emit('delete:image')"
    />
    <img :src="preview" class="w-full h-full object-cover">
  </div>
</template>

<style scoped>

</style>
