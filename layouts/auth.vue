<script setup lang="ts">
import 'mosha-vue-toastify/dist/style.css';
import { useHead } from "#head";

useHead({
  title: "Agnus Plast - Sistema de pedidos",
});
</script>

<template>
  <v-app>
    <slot />
  </v-app>
</template>
