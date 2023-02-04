<script setup lang='ts'>
interface Props{
  meta?: string
  title?: string
  description?: string
  size?: "wide"|"narrow"
}

withDefaults(defineProps<Props>(), {
  size: "wide",
})
</script>

<template>
  <section>
    <!--header-->
    <div class="h-36 lg:h-48 relative before:-z-10 before:absolute before:opacity-90 before:inset-0 before:bg-pattern px-6">
      <div :class="[size==='narrow'? 'max-w-2xl': 'max-w-3xl']" class="flex items-center justify-center h-full flex-col mx-auto">
        <div class="text-sm text-slate-400 mb-2">
          {{ meta }}
        </div>
        <div class="text-3xl text-slate-900 tracking-tight font-godo">
          {{ title }}
        </div>
        <div class="text-sm text-slate-400 font-semibold mt-2">
          {{ description }}
        </div>
      </div>
    </div>
    <!--body-->
    <div class="mx-auto px-6 sm:px-12" :class="[size==='narrow'?'':'max-w-7xl']">
      <slot />
    </div>
  </section>
</template>

<style>
</style>
