<script lang="ts">
import { getActivePinia } from "pinia"
import { useUserStore } from "@/store/user";

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    const userProfile = ref([
      {
        title: userStore.user.nome,
        desc: userStore.user.role === "admin" ? "Administrador" : "Vendedor",
      },
    ]);

    return { userProfile, userStore }
  },
  methods: {
    logout() {
      getActivePinia()._s.forEach(store => store.$reset());
      return navigateTo('/login')
    }
  }
});
</script>

<template>
  <v-menu anchor="bottom end" origin="auto" min-width="300">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class="pa-0 px-1"
        elevation="0"
        color="transparent"
        plain
        :ripple="false"
      >
        <v-avatar size="36">
          <img 
            :src="`https://agnusplast.com.br/pedidos/img/${userStore.user.role === 'admin' ? 'administradores' : 'vendedores'}/${userStore.user.imagem}` || `~assets/images/user-white.svg`" 
            width="36" 
            :alt="`${userStore.user.nome}`" 
          />
        </v-avatar>
      </v-btn>
    </template>

    <v-list class="pa-6" elevation="10" rounded="lg">
      <v-list-item
        class="pa-3 mb-2"
        v-for="(item, i) in userProfile"
        :key="i"
        :value="item"
        :title="item.title"
        :subtitle="item.desc"
        rounded="lg"
      >
      </v-list-item>
      <v-btn block color="error" variant="tonal" class="mt-4 py-4" @click="logout">
        Sair
      </v-btn>
    </v-list>
  </v-menu>
</template>
