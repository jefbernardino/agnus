<script setup>
import { ref, onMounted } from "vue";
import ImagePlaceholder from "~/components/shared/ImagePlaceholder.vue";
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
      disabledForm: true,
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
  },
  methods: {
    debounce(func, timeout = 500){
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    },
    async validate() {
      this.disabledForm =
        this.formData.prazo_pagamento !== '' &&
        this.formData.data !== '' &&
        this.formData.ipi !== '' &&
        this.formData.empresa !== '' &&
        this.formData.produtos.length > 0
    },
    async setTicknessValue(inputValue, indexValue, item) {
      let value = isNaN(inputValue) ? inputValue.target.value : inputValue
      this.formData.produtos[indexValue] = {
        ...this.formData.produtos[indexValue],
        id: item.id,
        nome: item.nome,
        espessura: value,
      }
      await this.validate();
    },
    async setQuantityValue(inputValue, indexValue, item) {
      let value = isNaN(inputValue) ? inputValue.target.value : inputValue
      this.formData.produtos[indexValue] = {
        ...this.formData.produtos[indexValue],
        id: item.id,
        nome: item.nome,
        quantidade: value,
      }
    },
    async setPriceValue(inputValue, indexValue, item) {
      let value = isNaN(inputValue) ? inputValue.target.value : inputValue
      this.formData.produtos[indexValue] = {
        ...this.formData.produtos[indexValue],
        id: item.id,
        nome: item.nome,
        preco: value,
      }
    },
  },
}
</script>

<template>
  <v-form v-model="disabledForm">
    <v-card>
      <v-card-text>
        <h2 class="mb-4 mt-4">Faça seu pedido</h2>
        <h4 class="mb-4">Preencha os campos abaixo corretamente:</h4>

        <v-row>
          <v-col>
            <pre>{{ disabledForm }}</pre>
            <pre>{{ formData }}</pre>
          </v-col>
        </v-row>
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
                @update:modelValue="validate()"
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
                @update:modelValue="validate()"
            ></v-select>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
                v-model="formData.prazo_pagamento"
                label="Prazo de pgto"
                variant="outlined"
                density="comfortable"
                required
                @change="validate()"
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
                @change="validate()"
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
                @update:modelValue="validate()"
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
                  <ImagePlaceholder folder="produtos/imagem" :name="item.nome" :filename="item.imagem" />
                </v-avatar>
              </td>
              <td>{{ item.nome }}</td>
              <td>
                <CurrencyInput
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
                  @blur="setTicknessValue($event, index, item)"
                />
              </td>
              <td>
                <CurrencyInput
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
                  @blur="setQuantityValue($event, index, item)"
                />
              </td>
              <td>
                <CurrencyInput
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
                  @blur="setPriceValue($event, index, item)"
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
                <v-btn class="mt-5" color="green" prepend-icon="mdi-check" :disabled="disabledForm">
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
