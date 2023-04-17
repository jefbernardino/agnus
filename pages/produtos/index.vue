<script setup>
import { ref, onMounted } from "vue";
import { formatCurrency, isActive } from "~/utils/shared_utils";
import ImagePlaceholder from "~/components/shared/ImagePlaceholder.vue";
import { createToast } from "mosha-vue-toastify";

const entries = ref([]);

const setEntries = async () => {
  const response = await fetch("/api/products");
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

const deleteItem = async (id) => {
  await useFetch(`/api/products/destroy?id=${id}`)
      .then(res => {
        createToast('Produto excluído com sucesso.', {
          type: 'success'
        });
      }).catch((error) => {
        createToast('Erro ao excluir produto.', {
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
          <h2 class="mb-4 mt-4">Produtos</h2>
          <h4 class="mb-4">Gerencie os produtos vendidos no sistema.</h4>
        </v-col>
        <v-col align-self="center" class="text-right">
          <v-btn elevation="0" color="success" to="/produtos/add">
            Adicionar
          </v-btn>
        </v-col>
      </v-row>
      <v-table fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left">Imagem</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Tipo</th>
          <th class="text-right">Preço</th>
          <th class="text-center">Ativo</th>
          <th class="text-center">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.id">
          <td>
            <ImagePlaceholder folder="produtos/imagem" :name="item.nome" :filename="item.imagem" />
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.tipo }}</td>
          <td class="text-right">{{ formatCurrency(item.preco) }}</td>
          <td class="text-center">{{ isActive(item.ativo) }}</td>
          <td class="text-center">
            <v-btn elevation="0" color="primary" size="small" :to="`/produtos/view/${item.id}`">Visualizar</v-btn>
            <v-btn elevation="0" color="warning" size="small" :to="`/produtos/edit/${item.id}`" class="mx-2">Editar</v-btn>
            <v-btn elevation="0" color="error" size="small" @click="deleteItem(item.id)">Excluir</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
