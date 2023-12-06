<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "nuxt/app";
import { dateToBr, formatCurrency, isActive } from "~/utils/shared_utils";
import { useUserStore } from "@/store/user";
import LoadingBar from "~/components/shared/LoadingBar";

const userStore = useUserStore();
const route = useRoute();

const entries = ref([]);

const invoice = reactive({
  value: {}
});

const setInvoice = async () => {
  const showURL = userStore.user.role === 'admin' ?
    `/api/invoices/show?id=${route.params.slug}` : 
    `/api/invoices/showByUser?id=${route.params.slug}&vendedor_id=${userStore.user.id}`;
  
  const responseInvoice = await fetch(showURL);
  const invoiceData = await responseInvoice.json()

  if('entry' in invoiceData) {
    invoice.value = invoiceData.entry
  }
}

const setEntry = async () => {
  const productResponse = await fetch(`/api/invoices/invoice_items?id=${route.params.slug}`);
  const productData = await productResponse.json()

  if('entries' in productData) {
    entries.value = productData.entries
  }
}

onMounted(setInvoice)
onMounted(setEntry)
</script>

<template>
  <v-card>
    <LoadingBar v-if="entries.length == 0" />
    <v-card-text v-else v-model="invoice">
      <h2 class="my-4">
        Detalhes do pedido: #{{ invoice.value.id }}, 
        de {{ invoice.value.data && dateToBr(invoice.value.data) }}
      </h2>
      <v-divider class="my-6"></v-divider>
      <v-card color="#598bc4" theme="dark">
        <div class="d-flex justify-space-between">
          <v-card-subtitle class="text-h6">
            <div class="mt-4">
              <strong>Empresa à faturar: </strong>
              {{ invoice.value.empresa_faturar }}
            </div>
            <div class="mt-4">
              <strong>Vendedor: </strong>
              {{ invoice.value.vendedor_nome }}
            </div>
            <div class="mt-4">
              <strong>Cliente: </strong>
              {{ invoice.value.cliente_nome }}
            </div>
            <div class="mt-4">
              <strong>Valor: </strong>
              {{ invoice.value.valor_total && formatCurrency(invoice.value.valor_total) }}
            </div>
            <v-divider class="mt-4 mb-4"></v-divider>
            <div class="mt-4">
              <strong>IPI: </strong>
              {{ invoice.value.ipi }}
            </div>
            <div class="mt-4">
              <strong>Prazo de pagamento: </strong>
              {{ invoice.value.prazo_pagamento }}
            </div>
            <div class="mt-4">
              <strong>Data de entrega: </strong>
              {{ invoice.value.data_entrega && dateToBr(invoice.value.data_entrega) }}
            </div>
            <v-divider class="my-4"></v-divider>
            <div class="mt-4 mb-6">
              <strong>Observação: </strong>
              <br />
              <br />
              {{ invoice.value.observacao }}
            </div>
            <v-divider class="my-4"></v-divider>
            <div class="mt-4 mb-6">
              <strong>Ativo: </strong>
              {{ invoice.value.ativo && isActive(invoice.value.ativo) }}
            </div>
          </v-card-subtitle>

          <v-card color="#598bc4" theme="light">
            <v-card-text>
              <v-table theme="light" fixed-header density="compact" height="50vh">
                <thead>
                  <tr>
                    <th class="text-center">Imagem</th>
                    <th class="text-left">Produto</th>
                    <th class="text-right">Quantidade</th>
                    <th class="text-right">Valor</th>
                    <th class="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center" v-for="item in entries" :key="item.id">
                    <td>
                      <img v-show="item.imagem !== null" :src="`https://agnusplast.com.br/pedidos/img/produtos/imagem/${item.imagem}`" :alt="item.nome" height="44" />
                    </td>
                    <td class="text-left">{{ item.nome }}</td>
                    <td class="text-right">{{ item.quantidade }}</td>
                    <td class="text-right">{{ formatCurrency(item.valor) }}</td>
                    <td class="text-right">{{ formatCurrency(item.quantidade * item.valor) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">
                      <div class="mt-4">
                        <strong>Observação: </strong>
                        <br />
                        <br />
                        {{ invoice.value.observacao }}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </v-table>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>
