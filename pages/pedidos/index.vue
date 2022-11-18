<script setup>
import { ref, onMounted } from "vue";

const entries = ref([]);

const setEntries = async () => {
  const response = await fetch("api/invoices");
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
      <h2 class="mb-4 mt-4">Pedidos</h2>
      <h4 class="mb-4">Acompanhe os pedidos realizados no sistema.</h4>
      <v-table fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left">Empresa</th>
          <th class="text-left">Vendedor</th>
          <th class="text-left">Data do pedido</th>
          <th class="text-left">Cliente</th>
          <th class="text-left">Valor</th>
          <th class="text-left">Status</th>
          <th class="text-left">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.id">
          <!-- TODO: Criar os relacionamentos -->
          <td>{{ item.vendedor_id }}</td>
          <td>{{ item.empresa_faturar }}</td>
          <td>{{ item.data }}</td>
          <td>{{ item.cliente_id }}</td>
          <td>{{ item.valor }}</td>
          <td>{{ item.status }}</td>
          <td>
            <div class="d-flex flex-wrap gap-2">
              <v-btn elevation="0" color="primary" size="small">Visualizar</v-btn>
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
