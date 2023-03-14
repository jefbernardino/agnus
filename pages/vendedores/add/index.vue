<script>
import { createToast } from "mosha-vue-toastify";

export default {
  name: "productAdd",
  data: () => ({
    form: false,
    nome: null,
    email: null,
    tipo: null,
    login: null,
    resgate: null,
    // imagem: [],
    ativo: null,
    loading: false,
  }),
  methods: {
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      await useFetch(`/api/sellers/add`, {
        method: 'POST',
        body: {
          nome: this.nome,
          email: this.email,
          tipo: this.tipo,
          login: this.login,
          senha: this.resgate,
          resgate: this.resgate,
          // imagem: this.imagem,
          ativo: this.ativo,
        },
      }).then(() => {
        createToast('Vendedor adicionado com sucesso.', {
          type: 'success'
        });
        setTimeout(() => (
            location.assign('/vendedores')
        ), 1200);
      }).catch(() => {
        createToast('Erro ao adicionar vendedor.', {
          type: 'error'
        });
      }).finally(() => {
        this.loading = false
      });
    },
    required (v) {
      return !!v || 'Campo obrigatório'
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-text>
      <h2 class="mb-12 mt-4">Adicionar vendedor</h2>
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
                v-model="nome"
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
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                type="email"
                label="Email"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="tipo"
                :items="[
                  { value: '', title: 'Selecione' },
                  { value: 'Todas', title: 'Todas' },
                  { value: 'Filme', title: 'Filme' },
                  { value: 'Fita', title: 'Fita' },
                ]"
                :rules="[required]"
                item-title="title"
                item-value="value"
                label="Tipo"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
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
                v-model="login"
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
                v-model="resgate"
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
                v-model="ativo"
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
              Adicionar vendedor
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
