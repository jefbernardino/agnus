<script>
export default {
  name: "adminAdd",
  data: () => ({
    form: false,
    nome: null,
    email: null,
    usuario: null,
    resgate: null,
    // imagem: [],
    ativo: '',
    role: 'admin',
    loading: false,
  }),
  methods: {
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      await useFetch(`/api/admin/add`, {
        method: 'POST',
        body: {
          nome: this.nome,
          email: this.email,
          usuario: this.usuario,
          senha: this.resgate,
          resgate: this.resgate,
          role: this.role,
          ativo: this.ativo,
        },
      }).then(res => {
        console.log('res', res)
      }).catch((error) => {
        console.log('error', error)
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
      <h2 class="mb-12 mt-4">Adicionar administrador</h2>
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
                v-model="usuario"
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
              Adicionar administrador
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
