<script setup lang='ts'>

const { data: post } = await useFetch("/api/blogs/" + useRoute().params.id, {
  method: "get",
})

const createdAt = useDateFormat(post?.createdAt, "YYYY-MM-DD hh:mm:ss")
</script>

<template>
  <v-section :title="post?.title" :meta="createdAt">
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
          <adsbygoogle
            style="display: block; margin: 3px 0; height: 280px;"
            ad-client="ca-pub-4350961883979083"
            data-ad-slot="7126539416"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
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
