<script setup lang='ts'>

const { data: post, pending } = await useFetch("/api/blogs/" + useRoute().params.id, {
  method: "get",
})

</script>

<template>
  <v-section :title="post?.title" :meta="post?.createdAt">
    <div class="mx-auto xl:px-12 pb-12">
      <div class="max-w-3xl pt-10 mx-auto xl:grid xl:max-w-none xl:grid-cols-[1fr_50rem] xl:gap-x-8">
        <aside>
          <div class="mb-5 hidden border-b border-slate-200 pb-5 xl:block text-sm">
            <nuxt-link to="/" class="group flex items-center font-semibold text-slate-700 hover:text-slate-900">
              <icon name="ei:chevron-left" class="mr-3 h-6 w-auto overflow-visible text-slate-400 group-hover:text-slate-600" />
              Home
            </nuxt-link>
          </div>
        </aside>
        <div>
          <div>
            <img src="~assets/img/adsense.svg" alt="">
          </div>
          <div class="mb-4">
            {{ post?.content }}
          </div>
          <nuxt-link :to="post?.link" class="font-semibold text-blue-400">
            {{ post?.title }} 바로가기
          </nuxt-link>
          <img v-for="(img,idx) in post?.images" :key="img" :src="img" :alt="post?.title+idx" class="w-full">
        </div>
      </div>
    </div>
  </v-section>
</template>

<style scoped>

</style>
