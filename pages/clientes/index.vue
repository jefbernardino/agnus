<script setup>
import { ref, onMounted } from "vue";
import { isActive } from "~/utils/shared_utils";

const entries = ref([]);

const setEntries = async () => {
  const response = await fetch("api/clients");
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

onMounted(setEntries)
</script>

<template>
  <v-card>
    <v-card-text>
      <h2 class="mb-4 mt-4">Clientes</h2>
      <h4 class="mb-4">Gerencie os clientes cadastrados no sistema.</h4>
      <v-table fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left" width="22%">Nome</th>
          <th class="text-left" width="20%">Email</th>
          <th class="text-left" width="22%">Vendedor</th>
          <th class="text-center">Ativo</th>
          <th class="text-left">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.name">
          <td>{{ item.nome }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.vendedor }}</td>
          <td class="text-center">{{ isActive(item.ativo) }}</td>
          <td>
            <div class="d-flex flex-wrap gap-2">
              <v-btn elevation="0" color="primary" size="small" :to="`/clientes/view/${item.id}`">Visualizar</v-btn>
              <v-btn elevation="0" color="warning" size="small">Editar</v-btn>
              <v-btn elevation="0" color="error" size="small">Excluir</v-btn>
            </div>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
