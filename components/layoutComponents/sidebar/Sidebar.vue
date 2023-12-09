<script setup lang="ts">
import { ref, watch } from "vue";
import { useUserStore } from "@/store/user";
import sidebarItems from "./sidebarItems";
import sidebarItemsAdmin from "./sidebarItemsAdmin";
import { version } from '@/package.json'

const userStore = useUserStore();

const sidebarMenu = ref(userStore.user.role === 'admin' ? sidebarItemsAdmin : sidebarItems);
</script>

<template>
  <div>
    <strong class="version">v. {{ version }}</strong>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">
      <div class="profile">
        <div class="profile-pic">
          <v-avatar size="46">
            <img
              v-if="userStore.user.imagem"
              :src="`https://agnusplast.com.br/pedidos/img/${userStore.user.role === 'admin' ? 'administradores' : 'vendedores'}/${userStore.user.imagem}`"
              width="46"
              :alt="`${userStore.user.nome}`"
            />
            <img
              v-else
              src="@/assets/images/user-white.svg"
              width="46"
              :alt="`${userStore.user.nome}`"
            />
          </v-avatar>
        </div>
        <div class="profile-name">
          <h5>{{ userStore.user.nome }}</h5>
        </div>
      </div>
      <v-list class="pa-4">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item lazy v-if="item.show" :to="item.to" :prepend-icon="item.icon" :title="item.title" rounded="lg" class="mb-1"></v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>
