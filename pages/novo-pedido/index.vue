<script setup>
import moment from "moment";
import { ref, onMounted } from "vue";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import CurrencyInput from "@/components/shared/CurrencyInput";
import { useUserStore } from "@/store/user";
import LoadingBar from "@/components/shared/LoadingBar";

const userStore = useUserStore();
const entries = ref([]);
const clients = ref([]);

const setEntries = async () => {
  const response = await fetch("/api/invoices/new");
  const data = await response.json()

  if('entries' in data) {
    entries.value = data.entries
  }
}

const setClients = async () => {
  const responseClients = await fetch(`/api/invoices/clients?id=${userStore.user.id}`);
  const dataClients = await responseClients.json()

  if('entries' in dataClients) {
    clients.value = dataClients.entries
  }
}

onMounted(setEntries)
onMounted(setClients)
</script>

<script>
import { createToast } from "mosha-vue-toastify";

export default {
  data() {
    return {
      form: false,
      formData: {
        empresa_faturar: 'Agnusplast',
        vendedor_id: 2,
        cliente_id: null,
        data: moment(new Date().toJSON()).format('YYYY-MM-DD'),
        prazo_pagamento: '',
        data_entrega: moment(new Date().toJSON()).format('DD/MM/YYYY'),
        ipi: '',
        valor: 0,
        observacao: '',
        status: 'Aguardando',
        ativo: '1',
        produtos: [],
      }
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true

      await useFetch(`/api/invoices/add`, {
        method: 'POST',
        body: {
          empresa_faturar: this.formData.empresa_faturar,
          vendedor_id: this.formData.vendedor_id,
          cliente_id: this.formData.cliente_id,
          data: this.formData.data,
          prazo_pagamento: this.formData.prazo_pagamento,
          data_entrega: moment(this.formData.data_entrega).format('YYYY-MM-DD'),
          ipi: this.formData.ipi,
          valor: this.formData.valor,
          observacao: this.formData.observacao,
          status: this.formData.status,
          ativo: this.formData.ativo,
          produtos: this.formData.produtos.filter(function(el){
            return el['valor'] !== "";
          }),
        },
      }).then(() => {
        createToast('Pedido adicionado com sucesso.', {
          type: 'success'
        });
        setTimeout(() => (
            location.assign('/novo-pedido')
        ), 1200);
      }).catch(() => {
        createToast('Erro ao adicionar pedido.', {
          type: 'error'
        });
      }).finally(() => {
        this.loading = false
      });
    },
    debounce(func, timeout = 500){
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    },
    async validate() {
      this.form = false
    },
    async setTicknessValue(inputValue, indexValue, item) {
      let value = isNaN(inputValue) ? inputValue.target.value : inputValue
      this.formData.produtos[indexValue] = {
        ...this.formData.produtos[indexValue],
        produto_id: item.id,
        nome: item.nome,
        espessura: value,
      }
      await this.validate();
    },
    async setQuantityValue(inputValue, indexValue, item) {
      let value = isNaN(inputValue) ? inputValue.target.value : inputValue
      this.formData.produtos[indexValue] = {
        ...this.formData.produtos[indexValue],
        produto_id: item.id,
        nome: item.nome,
        quantidade: value,
      }
    },
    async setPriceValue(inputValue, indexValue, item) {
      let value = isNaN(inputValue) ? inputValue.target.value : inputValue
      this.formData.produtos[indexValue] = {
        ...this.formData.produtos[indexValue],
        produto_id: item.id,
        nome: item.nome,
        valor: value,
      }
    },
  },
}
</script>

<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <v-card>
      <v-card-text>
        <h2 class="mb-4 mt-4">Faça seu pedido</h2>
        <h4 class="mb-4">Preencha os campos abaixo corretamente:</h4>
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="formData.cliente_id"
              :items="clients"
              item-title="nome"
              item-value="id"
              label="Cliente"
              variant="outlined"
              density="comfortable"
              single-line
              @update:modelValue="validate()"
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              v-model="formData.empresa_faturar"
              :items="[
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
              @change="validate()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <!-- <Datepicker /> -->
            <v-text-field
              v-model="formData.data_entrega"
              label="Data da entrega"
              variant="outlined"
              density="comfortable"
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

        <LoadingBar v-if="entries.length == 0" />
        <v-table v-else fixed-header height="64vh">
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
              <td>
                <p>{{ item.nome }}</p>
                <small>{{ item.tipo }}</small>
              </td>
              <td>
                <CurrencyInput
                  :class="`mt-5`"
                  :density="`compact`"
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
                  :class="`mt-5`"
                  :density="`compact`"
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
                  :class="`mt-5`"
                  :density="`compact`"
                  :name="`formData.produtos[${index}]['valor']`"
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
                  rows="4"
                ></v-textarea>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-right">
                <v-btn type="submit" class="mt-5" color="green" prepend-icon="mdi-check">
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
