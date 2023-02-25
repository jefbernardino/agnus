<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "nuxt/app";
import { isActive } from "~/utils/shared_utils";

const route = useRoute();

const administrador = reactive({
  id: "",
  nome: "",
  email: "",
  usuario: "",
  senha: "",
  resgate: "",
  role: "",
  imagem: "",
  capa: "",
  ativo: "",
});

const setEntry = async () => {
  const response = await fetch(`/api/admin/show?id=${route.params.slug}`);
  const data = await response.json()

  if('entry' in data) {
    administrador.id = data.entry.id
    administrador.nome = data.entry.nome
    administrador.email = data.entry.email
    administrador.usuario = data.entry.usuario
    administrador.senha = data.entry.senha
    administrador.role = data.entry.role
    administrador.imagem = data.entry.imagem
    administrador.capa = data.entry.capa
    administrador.ativo = data.entry.ativo
  }
}

onMounted(setEntry)

</script>

<script>

export default {
  name: "adminEdit",
  data: () => ({
    form: false,
    id: null,
    nome: null,
    email: null,
    usuario: null,
    senha: null,
    capa: null,
    ativo: '1',
    role: 'admin',
    loading: false,
  }),
  methods: {
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      let responseUrl = `api/login/administrador?usuario=${this.email}&resgate=${this.password}`;
      const response = await fetch(`${responseUrl}`);
      const data = await response.json();
      console.log("data >>>", data);

      this.loading = false
      setTimeout(() => (this.loading = false), 2000)
    },
    required (v) {
      return !!v || 'Campo obrigatório'
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-text v-model="administrador">
      <h2 class="mb-4 mt-4">Editar administrador: {{ administrador.nome }}</h2>
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
                v-model="id"
                label="Id"
                class="d-none"
            ></v-text-field>
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
                label="Email"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
                v-model="login"
                :readonly="loading"
                :rules="[required]"
                label="Login"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
                v-model="password"
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
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-file-input
                v-model="imagem"
                :readonly="loading"
                :rules="[required]"
                type="imagem"
                clearable
                label="Imagem"
                placeholder="Insira sua imagem"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="ativo"
                :items="[
                  { value: '1', title: 'Sim' },
                  { value: '0', title: 'Não' },
                ]"
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
              Acessar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-col cols="12">
        <v-card color="#598bc4" theme="dark">
          <div class="d-flex justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ administrador.nome }} ({{ administrador.usuario }})
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="text-h6">
                <div class="mt-4">
                  <strong>E-mail: </strong>
                  {{ administrador.email }}
                </div>
                <div class="mt-4">
                  <strong>Nível / regra: </strong>
                  {{ administrador.role }}
                </div>
                <div class="mt-4">
                  <strong>Ativo: </strong>
                  {{ isActive(administrador.ativo) }}
                </div>
              </v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="160" rounded>
              <v-img :src="`https://agnusplast.com.br/pedidos/img/administradores/${administrador.imagem}`" :alt="administrador.nome"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-card-text>
  </v-card>
</template>
