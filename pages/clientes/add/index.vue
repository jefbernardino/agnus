<script>
import { createToast } from "mosha-vue-toastify";

export default {
  name: "clientAdd",
  data: () => ({
    form: false,
    vendedor_id: 6,
    razao_social: null,
    nome: null,
    email: null,
    cpfcnpj: null,
    ie: null,
    cep: null,
    endereco: null,
    cidade: null,
    telefone: null,
    contato: null,
    ativo: '',
    loading: false,
  }),
  methods: {
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      await useFetch(`/api/clients/add`, {
        method: 'POST',
        body: {
          vendedor_id: this.vendedor_id,
          razao_social: this.razao_social,
          nome: this.nome,
          email: this.email,
          cpfcnpj: this.cpfcnpj,
          ie: this.ie,
          cep: this.cep,
          endereco: this.endereco,
          cidade: this.cidade,
          telefone: this.telefone,
          contato: this.contato,
          ativo: this.ativo,
        },
      }).then(() => {
        createToast('Cliente adicionado com sucesso.', {
          type: 'success'
        });
        setTimeout(() => (
            location.assign('/clientes')
        ), 1200);
      }).catch(() => {
        createToast('Erro ao adicionar cliente.', {
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
      <h2 class="mb-12 mt-4">Adicionar cliente</h2>
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <v-row>
          <v-col>
            <v-text-field
                v-model="razao_social"
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
                v-model="nome"
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
          <v-col cols="12" md="3">
            <v-text-field
                v-model="cpfcnpj"
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
                v-model="ie"
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
                v-model="cep"
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
                v-model="endereco"
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
                v-model="cidade"
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
                v-model="telefone"
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
                v-model="contato"
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
              Adicionar administrador
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
