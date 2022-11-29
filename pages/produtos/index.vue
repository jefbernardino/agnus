<script setup>
import { ref, onMounted } from "vue";
import { formatCurrency, isActive } from "~/utils/shared_utils";

const entries = ref([]);

const setEntries = async () => {
  const response = await fetch("api/products");
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
      <h2 class="mb-4 mt-4">Produtos</h2>
      <h4 class="mb-4">Gerencie os produtos vendidos no sistema.</h4>
      <v-table fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left">Imagem</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Tipo</th>
          <th class="text-right">Preço</th>
          <th class="text-center">Ativo</th>
          <th class="text-left">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.id">
          <td>
            <!-- TODO: componente imagem -->
            <img v-show="item.imagem !== null" :src="`https://agnusplast.com.br/pedidos/img/produtos/imagem/${item.imagem}`" :alt="item.nome" height="60" />
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.tipo }}</td>
          <td class="text-right">{{ formatCurrency(item.preco) }}</td>
          <td class="text-center">{{ isActive(item.ativo) }}</td>
          <td>
            <div class="d-flex flex-wrap gap-2">
              <v-btn elevation="0" color="primary" size="small" :to="`/produtos/view/${item.id}`">Visualizar</v-btn>
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
