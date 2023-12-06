<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "nuxt/app";
import { formatCurrency, isActive } from "~/utils/shared_utils";
import LoadingBar from "@/components/shared/LoadingBar.vue";

const route = useRoute();

const seller = reactive({
  id: "",
  vendedor_id: "",
  razao_social: "",
  nome: "",
  email: "",
  telefone: "",
  cpfcnpj: "",
  ie: "",
  cep: "",
  endereco: "",
  cidade: "",
  contato: "",
  ativo: "",
});

const setEntry = async () => {
  const response = await fetch(`/api/sellers/show?id=${route.params.slug}`);
  const data = await response.json()

  if('entry' in data) {
    seller.id = data.entry.id
    seller.nome = data.entry.nome
    seller.email = data.entry.email
    seller.login = data.entry.login
    seller.ativo = data.entry.ativo
  }
}

onMounted(setEntry)
</script>

<template>
  <v-card>
    <LoadingBar v-if="seller.id == ''" />
    <v-card-text v-else v-model="seller">
      <h2 class="mb-4 mt-4">Vendedor: {{ seller.nome }} ({{ seller.login }})</h2>
      <v-col cols="12">
        <v-card color="#598bc4" theme="dark" class="pb-4">
          <div class="d-flex justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ seller.nome }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="text-h6">
                <div class="mt-4">
                  <strong>Nome: </strong>
                  {{ seller.nome }}
                </div>
                <div class="mt-4">
                  <strong>E-mail: </strong>
                  {{ seller.email }}
                </div>
                <div class="mt-4">
                  <strong>Login: </strong>
                  {{ seller.login }}
                </div>
                <div class="mt-4">
                  <strong>Ativo: </strong>
                  {{ isActive(seller.ativo) }}
                </div>
              </v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="160" rounded>
              <v-img :src="`https://agnusplast.com.br/pedidos/img/clientes/${seller.imagem}`" :alt="seller.nome"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-card-text>
  </v-card>
</template>
