<script setup lang="ts">
import { ref, watch } from "vue";
import sidebarItems from "./sidebarItems";

const sidebarMenu = ref(sidebarItems);
</script>

<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">
      <div class="profile">
        <div class="profile-pic">
          <v-avatar size="46">
            <!-- <img src="~assets/images/user.svg" width="46" alt="Julia" /> -->
            <img src="https://agnusplast.com.br/pedidos/theme/admin/img/placeholders/avatars/avatar.jpg" width="46" alt="Usuário teste">
          </v-avatar>
        </div>
        <div class="profile-name">
          <h5>Usuário teste</h5>
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
          <v-list-item :to="item.to" :prepend-icon="item.icon" :title="item.title" rounded="lg" class="mb-1"></v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>
