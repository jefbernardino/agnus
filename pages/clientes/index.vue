<script setup>
import { ref, onMounted } from "vue";
import { isActive } from "~/utils/shared_utils";
import { createToast } from "mosha-vue-toastify";
import { useUserStore } from "@/store/user";
import LoadingBar from "@/components/shared/LoadingBar.vue";

const userStore = useUserStore();
const entries = ref([]);

const setEntries = async () => {
  const showURL = userStore.user.role === 'admin' ?
      `/api/clients` :
      `/api/clients/clientsByUser?id=${userStore.user.id}`;

  const response = await fetch(showURL);
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

const deleteItem = async (id) => {
  await useFetch(`/api/clients/destroy?id=${id}`)
      .then(res => {
        createToast('Cliente excluído com sucesso.', {
          type: 'success'
        });
      }).catch((error) => {
        createToast('Erro ao excluir cliente.', {
          type: 'error'
        });
      });
  await setEntries()
}

onMounted(setEntries)
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="10">
          <h2 class="mb-4 mt-4">Clientes</h2>
          <h4 class="mb-4">Gerencie os clientes cadastrados no sistema.</h4>
        </v-col>
        <v-col align-self="center" class="text-right">
          <v-btn elevation="0" color="success" to="/clientes/add">
            Adicionar
          </v-btn>
        </v-col>
      </v-row>
      <LoadingBar v-if="entries.length === 0" />
      <v-table v-else fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left" width="22%">Nome</th>
          <th class="text-left" width="20%">Email</th>
          <th class="text-left" width="22%">Vendedor</th>
          <th class="text-center">Ativo</th>
          <th class="text-center">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.name">
          <td>{{ item.nome }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.vendedor }}</td>
          <td class="text-center">{{ isActive(item.ativo) }}</td>
          <td class="text-center">
            <v-btn elevation="0" color="primary" size="small" :to="`/clientes/view/${item.id}`">Visualizar</v-btn>
            <v-btn elevation="0" color="warning" size="small" :to="`/clientes/edit/${item.id}`" class="mx-2">Editar</v-btn>
            <v-btn elevation="0" color="error" size="small" @click="deleteItem(item.id)">Excluir</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
