<script setup lang='ts'>
import { Post } from "~/types"

const { data: post } = await useFetch<Post>("/api/blogs/" + useRoute().params.id, {
  method: "get",
})

const createdAt = useDateFormat(post.value?.createdAt, "YYYY-MM-DD hh:mm:ss")

const contentSummary = post.value?.content.slice(0, 140) + "..."
useHead({
  title: post.value?.title,
  meta: [
    {
      hid: "og:url",
      property: "og:url",
      content: useRoute().path,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: post.value?.title,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: post.value?.images[0],
    },
    {
      hid: "og:description",
      property: "og:description",
      content: contentSummary,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: post.value?.title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: contentSummary,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: post.value?.images[0],
    },
  ],
})
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
          <!--          <adsbygoogle-->
          <!--            style="display: block; margin: 3px 0; height: 280px;"-->
          <!--            ad-client="ca-pub-4350961883979083"-->
          <!--            data-ad-slot="7126539416"-->
          <!--            data-ad-format="auto"-->
          <!--            data-full-width-responsive="true"-->
          <!--          />-->
          <img src="~assets/img/adsense.svg" alt="adsense placeholder" class="h-72 my-6">
          <div class="mb-4 space-y-2">
            <p>오늘 사는게 가장 싸다! <icon name="twemoji:money-mouth-face" style="vertical-align: text-top" /> 오늘도 할인정보를 수집하고 있는 Haronz 입니다.</p>
            <p>{{ post?.content }}</p>
            <p>다음엔 더 좋은 할인으로 찾아뵐께요. 그럼, 안녕~ <icon name="twemoji:hand-with-fingers-splayed" style="vertical-align: text-top" /></p>
          </div>
          <nuxt-link :to="post?.link" class="font-semibold text-blue-400 mb-6 inline-block w-full text-center">
            {{ post?.title }} 바로가기
          </nuxt-link>
          <nuxt-link v-for="(img,idx) in post?.images" :key="img" :to="post?.link">
            <img :src="img" :alt="post?.title+idx" class="w-full">
          </nuxt-link>
        </div>
      </div>
    </div>
  </v-section>
</template>

<style scoped>

</style>
