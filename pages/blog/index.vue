<script lang="ts" setup>
import { Post } from "~/types"

const page = ref(1)
const posts = ref<Post[]>([])
const { data, pending, execute } = await useFetch<Post[]>("/api/blogs", {
  method: "get",
  query: { page },
})

const loadingContainer = ref()
useIntersectionObserver(loadingContainer, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    page.value++
    execute()
  }
}, { rootMargin: "20px" })

watchEffect(() => {
  if (data.value) {
    posts.value.push(...data.value)
  }
})

</script>

<template>
  <v-section title="고민은 배송만 늦출뿐 🤔" description="세일 정보를 모아보기 위해 작성하는 블로그입니다.">
    <div class="max-w-7xl mx-auto">
      <div class="mx-auto my-4 max-w-5xl">
        <!--        <adsbygoogle-->
        <!--          style="display: block; margin: 3px 0; height: 280px;"-->
        <!--          ad-client="ca-pub-4350961883979083"-->
        <!--          data-ad-slot="7126539416"-->
        <!--          data-ad-format="auto"-->
        <!--          data-full-width-responsive="true"-->
        <!--        />-->
        <img src="~assets/img/adsense.svg" alt="adsense placeholder" class="h-72 my-6">
      </div>
      <div class="grid gap-8 md:grid-cols-2">
        <blog-card v-for="post in posts" :key="post.id" :post="post" class="pt-8 border-t" />
      </div>
    </div>

    <div ref="loadingContainer" class="flex justify-center py-12">
      <div v-if="pending">
        <icon name="line-md:loading-twotone-loop" size="24" class="mr-2" />
        Loading more...
      </div>
    </div>
  </v-section>
</template>

<style></style>
