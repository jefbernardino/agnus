<script setup lang="ts">
import 'mosha-vue-toastify/dist/style.css';
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import Sidebar from "@/components/layoutComponents/sidebar/Sidebar.vue";
import Header from "@/components/layoutComponents/header/Header.vue";
import { useHead } from "#head";

useHead({
  title: "Agnus Plast - Sistema de pedidos",
});

const drawer = ref(undefined || true);
const innerW = window.innerWidth;
const { mdAndUp, mdAndDown } = useDisplay();
onMounted(() => {
  if (innerW < 950) {
    drawer.value = !drawer.value;
  }
});
</script>
<template>
  <div>
    <v-app>
      <!-- ---------------------------------------------- -->
      <!---Header -->
      <!-- ---------------------------------------------- -->
      <v-app-bar elevation="0" color="primary">
        <div class="pe-5">
          <NuxtLink to="/" class="d-flex">
            <img src="~assets/images/logo.png" height="46" />
          </NuxtLink>
        </div>
        <v-app-bar-nav-icon class="" @click="drawer = !drawer" />
        <v-spacer />
        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <Header />
      </v-app-bar>
      <v-main>
        <!-- ---------------------------------------------- -->
        <!---Sidebar -->
        <!-- ---------------------------------------------- -->
        <v-navigation-drawer
          left
          :permanent="mdAndUp"
          elevation="10"
          app
          :temporary="mdAndDown"
          v-model="drawer"
          expand-on-hover
        >
          <Sidebar />
        </v-navigation-drawer>
        <v-container fluid class="page-wrapper v-fullwidth-form">
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
