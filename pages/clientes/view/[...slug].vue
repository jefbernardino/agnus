<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "nuxt/app";
import { formatCurrency, isActive } from "~/utils/shared_utils";

const route = useRoute();

const client = reactive({
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
  const response = await fetch(`/api/clients/show?id=${route.params.slug}`);
  const data = await response.json()

  if('entry' in data) {
    client.id = data.entry.id
    client.vendedor_id = data.entry.vendedor_id
    client.razao_social = data.entry.razao_social
    client.nome = data.entry.nome
    client.email = data.entry.email
    client.telefone = data.entry.telefone
    client.cpfcnpj = data.entry.cpfcnpj
    client.ie = data.entry.ie
    client.cep = data.entry.cep
    client.endereco = data.entry.endereco
    client.cidade = data.entry.cidade
    client.contato = data.entry.contato
    client.ativo = data.entry.ativo
  }
}

onMounted(setEntry)
</script>

<template>
  <v-card>
    <v-card-text v-model="client">
      <h2 class="mb-4 mt-4">Cliente: {{ client.razao_social }}</h2>
      <v-col cols="12">
        <v-card color="#598bc4" theme="dark" class="pb-4">
          <div class="d-flex justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ client.razao_social }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="text-h6">
                <div class="mt-4">
                  <strong>Nome: </strong>
                  {{ client.nome }}
                </div>
                <div class="mt-4">
                  <strong>E-mail: </strong>
                  {{ client.email }}
                </div>
                <div class="mt-4">
                  <strong>Telefone: </strong>
                  {{ client.telefone }}
                </div>
                <div class="mt-4">
                  <strong>IE | CNPJ: </strong>
                  {{ client.ie }} {{ client.cnpj && `| ${client.cnpj}` }}
                </div>
                <div class="mt-4">
                  <strong>Ativo: </strong>
                  {{ isActive(client.ativo) }}
                </div>
              </v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="160" rounded>
              <v-img :src="`https://agnusplast.com.br/pedidos/img/clientes/${client.imagem}`" :alt="client.nome"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-card-text>
  </v-card>
</template>
