<script setup>
import { onMounted, reactive } from "vue";

const route = useRoute()

const item = reactive({
  vendedor_id: 6,
  nome: "",
  preco: "",
  // imagem: "",
  tipo: "",
  ativo: "",
});

const setEntry = async () => {
  const response = await fetch(`/api/products/show?id=${route.params.id}`);
  const data = await response.json()

  if('entry' in data) {
    item.nome = data.entry.nome
    item.preco = data.entry.preco
    // item.imagem = data.entry.imagem
    item.tipo = data.entry.tipo
    item.ativo = data.entry.ativo
  }
}

onMounted(setEntry)

const updateItem = async () => {
  await useFetch(`/api/products/edit?id=${route.params.id}`, {
    method: 'POST',
    body: item
  })
  location.assign('/produtos')
}

</script>

<script>
export default {
  name: "productEdit",
  data: () => ({
    form: false,
    loading: false,
  }),
  methods: {
    required (v) {
      return !!v || 'Campo obrigatório'
    },
  },
}
</script>

<template>
  <v-card v-model="item">
    <v-card-text>
      <h2 class="mb-12 mt-4">Editar produto: {{ item.nome }}</h2>
      <v-form
          v-model="form"
          @submit.prevent="updateItem"
      >
      <v-row>
          <v-col>
            <v-text-field
                v-model="item.nome"
                :readonly="loading"
                :rules="[required]"
                label="Nome"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
                v-model="item.preco"
                :readonly="loading"
                :rules="[required]"
                label="Preço"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="item.tipo"
                :items="[
                  { value: '', title: 'Selecione' },
                  { value: 'Filme', title: 'Filme' },
                  { value: 'Fita', title: 'Fita' },
                ]"
                :readonly="loading"
                :rules="[required]"
                item-title="title"
                item-value="value"
                label="Tipo"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="item.ativo"
                :items="[
                  { value: '', title: 'Selecione' },
                  { value: '1', title: 'Sim' },
                  { value: '0', title: 'Não' },
                ]"
                :readonly="loading"
                :rules="[required]"
                item-title="title"
                item-value="value"
                label="Ativo"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-btn
                :disabled="!form"
                :loading="loading"
                block
                class="mt-4"
                color="success"
                size="x-large"
                type="submit"
                variant="elevated"
            >
              Editar cliente
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
