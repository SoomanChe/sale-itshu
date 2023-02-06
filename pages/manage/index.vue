<script setup lang='ts'>
definePageMeta({ middleware: "check-manager" })
const page = ref(1)

const { data, pending } = await useFetch("/api/blogs", {
  method: "get",
  query: { page },
})

</script>

<template>
  <div v-if="pending" />

  <div v-else class="min-h-content-body">
    <div class="flex mb-2">
      <h1 class="text-xl mr-2">
        포스팅 글 관리
      </h1>
      <span class="text-slate-400 self-center">14</span>
      <v-button to="/manage/write" class="ml-auto bg-white">
        글쓰기
        <icon name="mdi:pen" class="ml-1" />
      </v-button>
    </div>

    <div class="border border-slate-900/10 rounded divide-y divide-slate-100 bg-white">
      <div v-for="post in data" :key="post.id" class="flex p-4 hover:bg-slate-50 group">
        <div>
          <nuxt-link :to="`/blog/${post.id}`">
            {{ post.title }}
          </nuxt-link>

          <div class="flex items-center mt-1.5">
            <v-tag-group :items="post.tags" />
            <span class="mx-1 leading-6">•</span>
            <span class="text-sm">{{ post.createdAt }}</span>
          </div>
        </div>

        <div class="ml-auto space-x-2 hidden group-hover:flex items-center">
          <v-button>삭제</v-button>
          <v-button>수정</v-button>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-5 mb-10">
      <v-pagination />
    </div>
  </div>
</template>

<style scoped>

</style>
