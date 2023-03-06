<script setup>
import { onMounted, reactive } from "vue";
import {createToast} from "mosha-vue-toastify";

const route = useRoute()

const item = reactive({
  nome: "",
  email: "",
  usuario: "",
  resgate: "",
  role: "",
  ativo: "",
});

const setEntry = async () => {
  const response = await fetch(`/api/admin/show?id=${route.params.id}`);
  const data = await response.json()

  if('entry' in data) {
    item.nome = data.entry.nome
    item.email = data.entry.email
    item.usuario = data.entry.usuario
    item.resgate = data.entry.resgate
    item.role = data.entry.role
    item.ativo = data.entry.ativo
  }
}

onMounted(setEntry)

const updateItem = async () => {
  await useFetch(`/api/admin/edit?id=${route.params.id}`, {
    method: 'POST',
    body: item
  }).then(() => {
    createToast('Administrador editado com sucesso.', {
      type: 'success'
    });
    setTimeout(() => (
        location.assign('/administradores')
    ), 1200);
  }).catch(() => {
    createToast('Erro ao editar administrador.', {
      type: 'error'
    });
  }).finally(() => {
    this.loading = false
  });
}

</script>

<script>
export default {
  name: "adminEdit",
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
          <v-col cols="12" md="4">
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
          <!-- <v-col cols="12" md="4">
            <v-file-input
                v-model="imagem"
                :readonly="loading"
                type="imagem"
                clearable
                label="Imagem"
                placeholder="Insira sua imagem"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-file-input>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
                v-model="item.usuario"
                :readonly="loading"
                :rules="[required]"
                label="Usuário (login)"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
                v-model="item.resgate"
                :readonly="loading"
                :rules="[required]"
                type="password"
                label="Senha"
                placeholder="Insira sua senha"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="item.ativo"
                :items="[
                  { value: '', title: 'Selecione' },
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
              Editar administrador
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
