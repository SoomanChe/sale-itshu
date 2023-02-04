<script setup lang="ts">

type FormProp = { title: string, content: string, image: FileList | null, link:string};
const form = reactive<FormProp>({
  title: "",
  content: "",
  link: "",
  image: null
})
const previews = ref<string[]>([])

function onChange (event: InputEvent) {
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

const submitForm = async () => {
  const formData = new FormData()
  formData.append("title", form.title)
  formData.append("content", form.content)
  formData.append("link", form.link)
  for (let i = 0; i < form.image!.length; i++) {
    formData.append("images", form.image![i])
  }
  return await useFetch("/api/admin/blogs", {
    method: "post",
    body: formData
  })
}
</script>

<template>
  <form class="min-h-content-body space-y-4" @submit.prevent="submitForm">
    <input
      v-model="form.title"
      type="text"
      class="text-3xl text-slate-900 tracking-tight font-godo w-full bg-transparent p-2 hover:bg-slate-50"
      placeholder="제목"
      required
    >
    <textarea
      v-model="form.content"
      type="text"
      class="text-slate-900 w-full bg-transparent placeholder:text-base p-2  hover:bg-slate-50"
      placeholder="본문"
      required
    />
    <input
      v-model="form.link"
      type="url"
      class="text-slate-900 w-full bg-transparent p-2  hover:bg-slate-50"
      placeholder="주소"
      required
    >
    <label class="inline-block relative">
      <div class="v-button cursor-pointer">파일 선택</div>
      <input type="file" multiple required class="opacity-0 absolute inset-0 -z-10" @change="onChange">
    </label>
    <div class="flex flex-wrap">
      <img v-for="preview in previews" :key="preview" :src="preview" class="w-48">
    </div>

    <v-button type="submit">
      제출
    </v-button>
  </form>
</template>

<style scoped>

</style>
