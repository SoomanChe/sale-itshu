<script setup lang='ts'>

type FormProp = { title: string, content: string, image: FileList|null };
const form = reactive<FormProp>({ title: "", content: "", image: null })
const previews = ref<string[]>([])
function onChange (event:InputEvent) {
  const files = (event.target as HTMLInputElement).files!
  if (files.length === 0) {
    return
  }
  form.image = files

  freeMemoryURL()
  previews.value = [...files].map(file => URL.createObjectURL(file))
}

function freeMemoryURL () {
  previews.value.forEach(url => URL.revokeObjectURL(url))
}

onBeforeUnmount(() => {
  freeMemoryURL()
})

const formValid = computed(() => form.title && form.content && form.image?.length)

const submitForm = async () => {
  const formData = new FormData()
  formData.append("title", form.title)
  formData.append("content", form.content)
  for (let i = 0; i < form.image!.length; i++) {
    formData.append("images", form.image![i])
  }
  return await useFetch("/api/admin/blogs", {
    method: "post",
    body: formData,
  })
}
</script>

<template>
  <div class="min-h-content-body space-y-4">
    <input v-model="form.title" type="text" class="text-3xl text-slate-900 tracking-tight font-godo w-full bg-transparent" placeholder="제목">
    <client-only>
      <v-tiptap v-model="form.content" />
    </client-only>
    <label class="inline-block">
      <div class="v-button cursor-pointer">파일 선택</div>
      <input type="file" multiple hidden @change="onChange">
    </label>
    <div>
      <img v-for="preview in previews" :key="preview" :src="preview">
    </div>

    <v-button :disabled="!formValid" type="button" @click="submitForm">
      제출
    </v-button>
  </div>
</template>

<style scoped>

</style>
