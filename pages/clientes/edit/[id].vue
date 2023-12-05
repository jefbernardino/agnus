<script setup>
import { onMounted, reactive } from "vue";
import { createToast } from "mosha-vue-toastify";

const route = useRoute()

const item = reactive({
  vendedor_id: 6,
  razao_social: "",
  nome: "",
  email: "",
  cpfcnpj: "",
  ie: "",
  cep: "",
  endereco: "",
  cidade: "",
  telefone: "",
  contato: "",
  ativo: "",
});

const setEntry = async () => {
  const response = await fetch(`/api/clients/show?id=${route.params.id}`);
  const data = await response.json()

  if('entry' in data) {
    item.vendedor_id = data.entry.vendedor_id
    item.razao_social = data.entry.razao_social
    item.nome = data.entry.nome
    item.email = data.entry.email
    item.cpfcnpj = data.entry.cpfcnpj
    item.ie = data.entry.ie
    item.cep = data.entry.cep
    item.endereco = data.entry.endereco
    item.cidade = data.entry.cidade
    item.telefone = data.entry.telefone
    item.contato = data.entry.contato
    item.ativo = data.entry.ativo
  }
}

onMounted(setEntry)

const updateItem = async () => {
  await useFetch(`/api/clients/edit?id=${route.params.id}`, {
    method: 'POST',
    body: item
  }).then(() => {
    createToast('Cliente editado com sucesso.', {
      type: 'success'
    });
    setTimeout(() => (
        location.assign('/clientes')
    ), 1200);
  }).catch(() => {
    createToast('Erro ao editar cliente.', {
      type: 'error'
    });
  }).finally(() => {
    this.loading = false
  });
}

</script>

<script>
export default {
  name: "clientEdit",
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
      <h2 class="mb-12 mt-4">Editar administrador: {{ item.nome }}</h2>
      <v-form
          v-model="form"
          @submit.prevent="updateItem"
      >
      <v-row>
          <v-col>
            <v-text-field
                v-model="item.razao_social"
                :readonly="loading"
                :rules="[required]"
                label="Razão Social"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
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
          <v-col cols="12" md="3">
            <v-text-field
                v-model="item.email"
                :readonly="loading"
                :rules="[required]"
                type="email"
                label="Email"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="item.cpfcnpj"
                :readonly="loading"
                :rules="[required]"
                label="CPF / CNPJ"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
                v-model="item.ie"
                :readonly="loading"
                :rules="[required]"
                label="Inscrição Estadual"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="item.cep"
                :readonly="loading"
                :rules="[required]"
                label="CEP"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="item.endereco"
                :readonly="loading"
                :rules="[required]"
                label="Endereço"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="item.cidade"
                :readonly="loading"
                :rules="[required]"
                label="Cidade"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="item.telefone"
                :readonly="loading"
                :rules="[required]"
                type="phone"
                label="Telefone"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
                v-model="item.contato"
                :readonly="loading"
                :rules="[required]"
                label="Contato"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="item.ativo"
                :items="[
                  { value: '', title: 'Ativo?' },
                  { value: '1', title: 'Sim' },
                  { value: '0', title: 'Não' },
                ]"
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
