<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "nuxt/app";
import { dateToBr, formatCurrency, isActive } from "~/utils/shared_utils";

const route = useRoute();

const invoice = reactive({
  id: "",
  empresa_faturar: "",
  vendedor_id: "",
  cliente_id: "",
  data: "",
  prazo_pagamento: "",
  data_entrega: "",
  ipi: "",
  valor_total: "",
  observacao: "",
  status: "",
  ativo: "",
  created: "",
  modified: "",
});

const entries = ref([]);

const setEntry = async () => {
  const response = await fetch(`/api/invoices/show?id=${route.params.slug}`);
  const data = await response.json()

  if('entry' in data) {
    invoice.id = data.entry.id
    invoice.empresa_faturar = data.entry.empresa_faturar
    invoice.vendedor_id = data.entry.vendedor_id
    invoice.cliente_id = data.entry.cliente_id
    invoice.data = data.entry.data
    invoice.prazo_pagamento = data.entry.prazo_pagamento
    invoice.data_entrega = data.entry.data_entrega
    invoice.ipi = data.entry.ipi
    invoice.valor_total = data.entry.valor_total
    invoice.observacao = data.entry.observacao
    invoice.status = data.entry.status
    invoice.ativo = data.entry.ativo
    invoice.created = data.entry.created
    invoice.modified = data.entry.modified
    invoice.cliente_nome = data.entry.cliente_nome
    invoice.vendedor_nome = data.entry.vendedor_nome
  }

  const productResponse = await fetch(`/api/invoices/invoice_items?id=${route.params.slug}`);
  const productData = await productResponse.json()

  if('entries' in productData) {
    entries.value = productData.entries
  }
}

onMounted(setEntry)
</script>

<template>
  <v-card>
    <v-card-text v-model="invoice">
      <h2 class="mb-4 mt-4">Detalhes do pedido: #{{ invoice.id }}, de {{ dateToBr(invoice.data) }}</h2>
      <v-card color="#598bc4" theme="dark">
        <div class="d-flex justify-space-between">
          <v-card-subtitle class="text-h6">
            <div class="mt-4">
              <strong>Empresa à faturar: </strong>
              {{ invoice.empresa_faturar }}
            </div>
            <div class="mt-4">
              <strong>Vendedor: </strong>
              {{ invoice.vendedor_nome }}
            </div>
            <div class="mt-4">
              <strong>Cliente: </strong>
              {{ invoice.cliente_nome }}
            </div>
            <div class="mt-4">
              <strong>Valor: </strong>
              {{ formatCurrency(invoice.valor_total) }}
            </div>
            <v-divider class="mt-4 mb-4"></v-divider>
            <div class="mt-4">
              <strong>IPI: </strong>
              {{ invoice.ipi }}
            </div>
            <div class="mt-4">
              <strong>Prazo de pagamento: </strong>
              {{ invoice.prazo_pagamento }} dias
            </div>
            <div class="mt-4">
              <strong>Data de entrega: </strong>
              {{ dateToBr(invoice.data_entrega) }}
            </div>
            <v-divider class="mt-4 mb-4"></v-divider>
            <div class="mt-4">
              <strong>Observação: </strong>
              <br />
              <br />
              {{ invoice.observacao }}
            </div>
            <v-divider class="mt-4 mb-4"></v-divider>
            <div class="mt-4 mb-6">
              <strong>Ativo: </strong>
              {{ isActive(invoice.ativo) }}
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
              </v-table>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>
