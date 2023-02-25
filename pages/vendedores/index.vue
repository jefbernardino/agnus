<script setup>
import { ref, onMounted } from "vue";
import { isActive } from "~/utils/shared_utils";

const entries = ref([]);

const setEntries = async () => {
  const response = await fetch("api/sellers");
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

const deleteItem = async (id) => {
  console.log('id', id)
  await useFetch(`/api/sellers/destroy?id=${id}`)
    .then(res => {
      console.log('res', res)
    }).catch((error) => {
      console.log('error', error)
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
          <h2 class="mb-4 mt-4">Vendedores</h2>
          <h4 class="mb-4">Gerencie os vendedores que utilizam o sistema.</h4>
        </v-col>
        <v-col align-self="center" class="text-right">
          <v-btn elevation="0" color="success" to="/vendedores/add">
            Adicionar
          </v-btn>
        </v-col>
      </v-row>
      <v-table fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Tipo</th>
          <th class="text-center">Ativo</th>
          <th class="text-center">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.name">
          <td>{{ item.nome }}</td>
          <td>{{ item.tipo }}</td>
          <td class="text-center">{{ isActive(item.ativo) }}</td>
          <td class="text-center">
            <v-btn elevation="0" color="primary" size="small" :to="`/vendedores/view/${item.id}`">Visualizar</v-btn>
            <v-btn elevation="0" color="warning" size="small" :to="`/vendedores/edit/${item.id}`" class="mx-2">Editar</v-btn>
            <v-btn elevation="0" color="error" size="small" @click="deleteItem(item.id)">Excluir</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
