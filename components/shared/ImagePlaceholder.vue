<template>
  <v-img
      v-show="filename !== null && filename !== ''"
      :src="`https://agnusplast.com.br/pedidos/img/${folder}/${filename}`"
      :alt="name"
      class="my-2"
      height="60"
  />
</template>

<script>
export default {
  name: "ImagePlaceholder",
  props: {
    folder: String,
    name: String,
    filename: String,
  },
}
</script>
