<script setup lang="ts">
const { data: examples } = useFetch('/api/examples')

let form = ref()

function submit () {
  useFetch('/api/examples',{
    method:'post',
  })
}
</script>

<template>
  <div>
    <p>Prisma ORM Data from the database, received {{ examples?.length || 0 }} records: <pre>{{ examples }}</pre></p>

    <input type="text" v-model="form">
    <button type="button" @click="submit">submit</button>
  </div>
</template>
