<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "nuxt/app";
import { formatCurrency, isActive } from "~/utils/shared_utils";

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

<template>
  <v-card>
    <v-card-text v-model="administrador">
      <h2 class="mb-4 mt-4">Administrador: {{ administrador.nome }}</h2>
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
