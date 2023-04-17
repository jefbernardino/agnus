<script setup>
import { ref, onMounted } from "vue";
import { dateToBr, formatCurrency } from "~/utils/shared_utils";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const entries = ref([]);

const setEntries = async () => {
  const showURL = userStore.user.role === 'admin' ?
    `/api/invoices` :
    `/api/invoices/invoicesByUser?id=${userStore.user.id}`;

  const response = await fetch(showURL);
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

onMounted(setEntries)
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="10">
          <h2 class="mb-4 mt-4">Pedidos</h2>
          <h4 class="mb-4">Acompanhe os pedidos realizados no sistema.</h4>
        </v-col>
        <v-col align-self="center" class="text-right">
          <v-btn v-show="userStore.user.role !== 'admin'" elevation="0" color="success" to="/novo-pedido">
            Novo pedido
          </v-btn>
        </v-col>
      </v-row>
      <v-table fixed-header height="72vh">
        <thead>
        <tr>
          <th class="text-left">Empresa</th>
          <th class="text-left">Vendedor</th>
          <th class="text-left">Data pedido</th>
          <th class="text-left" width="20%">Cliente</th>
          <th class="text-right">Valor</th>
          <!-- <th class="text-left">Observação</th> -->
          <th class="text-left">Status</th>
          <th class="text-left">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in entries" :key="item.id">
          <!-- TODO: Criar os relacionamentos -->
          <td>{{ item.empresa_faturar }}</td>
          <td>{{ item.vendedor_nome }}</td>
          <td>{{ dateToBr(item.data) }}</td>
          <td>{{ item.cliente_nome }}</td>
          <td class="text-right">{{ formatCurrency(item.valor_total) }}</td>
          <!-- <td>{{ item.observacao }}</td> -->
          <td>{{ item.status }}</td>
          <td>
            <div class="d-flex flex-wrap gap-2">
              <v-tooltip location="top" :text="item.observacao">
                <template v-slot:activator="{ props }">
                  <v-btn elevation="0" color="warning" size="small" v-bind="props">Observação</v-btn>
                </template>
              </v-tooltip>
              <v-btn elevation="0" color="primary" size="small" :to="`/pedidos/view/${item.id}`">Visualizar</v-btn>
            </div>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
