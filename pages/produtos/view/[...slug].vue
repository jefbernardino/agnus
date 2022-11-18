<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "nuxt/app";
import { formatCurrency, isActive } from "~/utils/shared_utils";

const route = useRoute();

const product = reactive({
  nome: "",
  preco: "",
  imagem: "",
  tipo: "",
  ativo: "",
});

const setEntry = async () => {
  const response = await fetch(`/api/products/show?id=${route.params.slug}`);
  const data = await response.json()

  if('entry' in data) {
    product.nome = data.entry.nome
    product.preco = data.entry.preco
    product.imagem = data.entry.imagem
    product.tipo = data.entry.tipo
    product.ativo = data.entry.ativo
  }
}

onMounted(setEntry)
</script>

<template>
  <v-card>
    <v-card-text v-model="product">
      <h2 class="mb-4 mt-4">Produto: {{ product.nome }}</h2>
      <v-col cols="12">
        <v-card color="#598bc4" theme="dark">
          <div class="d-flex justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ product.nome }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="text-h6">
                <div class="mt-4">
                  <strong>Tipo: </strong>
                  {{ product.tipo }}
                </div>
                <div class="mt-4">
                  <strong>Valor: </strong>
                  {{ formatCurrency(product.preco) }}
                </div>
                <div class="mt-4">
                  <strong>Ativo: </strong>
                  {{ isActive(product.ativo) }}
                </div>
              </v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="160" rounded>
              <v-img :src="`https://agnusplast.com.br/pedidos/img/produtos/imagem/${product.imagem}`" :alt="product.nome"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-card-text>
  </v-card>
</template>
