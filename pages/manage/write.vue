<script setup lang="ts">
import draggable from "vuedraggable"

type FormProp = { title: string, content: string, image: File[], link: string, tags: string[] };
const form = reactive<FormProp>({
  title: "",
  content: "",
  link: "",
  tags: [],
  image: [],
})

function onChange (event: InputEvent) {
  const files = (event.target as HTMLInputElement).files!
  if (files.length === 0) {
    return
  }
  form.image = Array.prototype.slice.call(files)
}

const loading = ref(false)
const submitForm = async () => {
  loading.value = true
  const formData = new FormData()
  formData.append("title", form.title)
  formData.append("content", form.content)
  formData.append("link", form.link)
  for (let i = 0; i < form.tags!.length; i++) {
    formData.append("tags", form.tags[i])
  }
  for (let i = 0; i < form.image!.length; i++) {
    formData.append("images", form.image![i])
  }
  await useFetch("/api/admin/blogs", {
    method: "post",
    body: formData,
  }).catch((e) => {
    throw createError({
      statusCode: 500,
      statusMessage: e,
    })
  })
  loading.value = false
  useRouter().push({ path: "/manage" })
}

function onTagInputEnter (e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value
  const tags = form.tags
  if (tags.length < 3) {
    tags.push(value)
    target.value = ""
  }
}

function onTagInputDelete (e: Event) {
  if ((e.target as HTMLInputElement).value.length === 0) {
    const tags = form.tags
    tags.splice(tags.length - 1)
  }
}

function onRemoveImage (index: number) {
  form.image.splice(index, 1)
}

onMounted(() => {
  useEventListener(document, "paste", (e: ClipboardEvent) => {
    const blob = e.clipboardData?.files[0]
    console.log(blob)
    if (!blob || !blob.type.includes("image/")) {
      return
    }
    form.image.push(blob)
  })
})
</script>

<template>
  <form class="min-h-content-body space-y-4" @submit.prevent="submitForm">
    <input
      v-model="form.title"
      type="text"
      class="text-3xl text-slate-900 tracking-tight font-godo w-full bg-transparent p-2 hover:bg-slate-50 focus:outline-blue-400"
      placeholder="제목"
      required
    >
    <textarea
      v-model="form.content"
      type="text"
      class="text-slate-900 w-full bg-transparent placeholder:text-base p-2 hover:bg-slate-50 focus:outline-blue-400"
      placeholder="본문"
      required
    />
    <input
      v-model="form.link"
      type="url"
      class="text-slate-900 w-full bg-transparent p-2 hover:bg-slate-50 focus:outline-blue-400"
      placeholder="링크"
      required
    >
    <div class="flex items-center">
      <v-tag-group :items="form.tags" />
      <input
        type="text"
        class="text-slate-900 flex-1 bg-transparent p-2 hover:bg-slate-50 focus:outline-blue-400"
        placeholder="태그"
        @keydown.enter.prevent="onTagInputEnter"
        @keydown.delete="onTagInputDelete"
      >
    </div>
    <label class="inline-block relative">
      <div class="v-button cursor-pointer">파일 선택</div>
      <input type="file" multiple required class="opacity-0 absolute inset-0 -z-10" @change="onChange">
    </label>
    <div>
      <draggable v-model="form.image" class="flex flex-wrap space-x-4" :item-key="(v)=>v">
        <template #item="{element,index}">
          <v-image-preview :image="element" @delete:image="onRemoveImage(index)" />
        </template>
      </draggable>
    </div>

    <v-button
      type="submit"
      :disabled="form.tags.length < 3 || loading"
      class="disabled:bg-gray-200 disabled:text-black/30"
    >
      제출
    </v-button>
  </form>
</template>

<style scoped>

</style>
