<script setup>
import { ref, onMounted } from "vue";
import CurrencyInput from "~/components/shared/CurrencyInput";
// import Datepicker from "~/components/shared/Datepicker";

const entries = ref([]);

const setEntries = async () => {
  const response = await fetch("api/invoices/new");
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

onMounted(setEntries)
</script>

<script>
export default {
  data() {
    return {
      valid: false,
      formData: {
        cliente_id: '',
        prazo_pagamento: '',
        data: '',
        ipi: '',
        empresa: '',
        observacao: '',
        produtos: [],
      }
    }
  }
}
</script>

<template>
  <v-form v-model="valid">
    <pre>{{ valid }}</pre>
    <pre>{{ formData }}</pre>
    <v-card>
      <v-card-text>
        <h2 class="mb-4 mt-4">Faça seu pedido</h2>
        <h4 class="mb-4">Preencha os campos abaixo corretamente:</h4>

        <v-row>
          <v-col cols="12" md="3">
            <v-select
                v-model="formData.cliente_id"
                :items="[
                  { value: '', title: 'Selecione o ciente' },
                  { value: 'Agnusplast', title: 'Agnusplast Indústria e Comércio' },
                  { value: 'JColombo', title: 'J Colombo Comércio e Embalagens' },
                ]"
                item-title="title"
                item-value="value"
                label="Cliente"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
                v-model="formData.empresa"
                :items="[
                  { value: '', title: 'Selecione a empresa' },
                  { value: 'Agnusplast', title: 'Agnusplast Indústria e Comércio' },
                  { value: 'JColombo', title: 'J Colombo Comércio e Embalagens' },
                ]"
                item-title="title"
                item-value="value"
                label="Empresa a faturar"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
                v-model="formData.prazo_pagamento"
                label="Prazo de pgto"
                variant="outlined"
                density="comfortable"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <!-- <Datepicker /> -->
            <v-text-field
                v-model="formData.data"
                label="Data da entrega"
                variant="outlined"
                density="comfortable"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-select
                v-model="formData.ipi"
                :items="[
                  { value: '', title: 'Selecione o IPI' },
                  { value: 'ISENTO', title: 'Isento' },
                  { value: '15%', title: 'IPI 15%' },
                ]"
                item-title="title"
                item-value="value"
                label="IPI"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
          </v-col>
        </v-row>

        <v-table fixed-header height="64vh">
          <thead>
            <tr>
              <th class="text-left">Imagem</th>
              <th class="text-left">Produto</th>
              <th class="text-right" width="15%">Espessura (micra)</th>
              <th class="text-right" width="15%">Quantidade (Kg)</th>
              <th class="text-right" width="15%">Preço Unitário</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in entries" :key="item.id">
              <td>
                <v-avatar size="60">
                  <img v-show="item.imagem !== null" :src="`https://agnusplast.com.br/pedidos/img/produtos/imagem/${item.imagem}`" :alt="item.nome" height="60" />
                </v-avatar>
              </td>
              <td>{{ item.nome }}</td>
              <td>
                <CurrencyInput
                  v-model="formData.produtos[index]"
                  :name="`formData.produtos[${index}]['espessura']`"
                  :options="{
                    locale: 'pt-BR',
                    currency: 'BRL',
                    currencyDisplay: 'hidden',
                    valueRange: {
                      min: 1,
                      max: 999
                    },
                    hideCurrencySymbolOnFocus: true,
                    hideGroupingSeparatorOnFocus: true,
                    hideNegligibleDecimalDigitsOnFocus: true,
                    autoDecimalDigits: false,
                    useGrouping: true,
                    accountingSign: false
                  }"
                />
              </td>
              <td>
                <CurrencyInput
                  v-model="formData.produtos[index]"
                  :name="`formData.produtos[${index}]['quantidade']`"
                  :options="{
                    locale: 'pt-BR',
                    currency: 'BRL',
                    currencyDisplay: 'hidden',
                    hideCurrencySymbolOnFocus: true,
                    hideGroupingSeparatorOnFocus: true,
                    hideNegligibleDecimalDigitsOnFocus: true,
                    autoDecimalDigits: false,
                    useGrouping: true,
                    accountingSign: false
                  }"
                />
              </td>
              <td>
                <CurrencyInput
                  v-model="formData.produtos[index]"
                  :name="`formData.produtos[${index}]['preco']`"
                  :options="{
                    locale: 'pt-BR',
                    currency: 'BRL',
                    currencyDisplay: 'hidden',
                    hideCurrencySymbolOnFocus: true,
                    hideGroupingSeparatorOnFocus: true,
                    hideNegligibleDecimalDigitsOnFocus: false,
                    autoDecimalDigits: true,
                    useGrouping: true,
                    accountingSign: false,
                  }"
                />
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <v-textarea
                  v-model="formData.observacao"
                  label="Observação"
                  variant="outlined"
                  density="compact"
                  class="mt-5"
                ></v-textarea>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-right">
                <v-btn class="mt-5" color="green" prepend-icon="mdi-check" :disabled="valid">
                  Salvar pedido
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-form>
</template>
