<script setup lang='ts'>
import { Post } from "~/types"

interface Props{
  post: Post
}
defineProps<Props>()
</script>

<template>
  <section>
    <time class="text-xs">{{ post.createdAt }}</time>
    <div class="flex">
      <!--content-->
      <div class="flex-1">
        <nuxt-link :to="`/blog/${post.id}`" class="group">
          <h2 class="text-xl text-slate-700 font-semibold tracking-tight leading-relaxed">
            <span class="underline-animation group-hover:bg-[length:100%_25%]">{{ post.title }}</span>
          </h2>
          <p class="text-sm line-clamp-2 mt-3">
            {{ post.content }}
          </p>
        </nuxt-link>
        <v-tag-group :items="post.tags" class="mt-6" />
      </div>
      <!--thumbnail-->
      <nuxt-link :to="`/blog/${post.id}`" class="h-20 w-20 lg:w-40 lg:h-[108px] ml-4 lg:ml-10">
        <img :src="post.images[0]" :alt="post.title" class="h-full w-full object-cover">
      </nuxt-link>
    </div>
  </section>
</template>

<style>
.underline-animation {
  background-image: linear-gradient(45deg , #38bdf8 ,#a78bfa);
  background-size: 0 25%;
  background-position: left bottom;
  transition: background-size;
  transition-duration: 200ms;
  background-repeat: no-repeat;
}
</style>
