<script>
import CurrencyInput from "@/components/shared/CurrencyInput";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "productAdd",
  components: { CurrencyInput },
  data: () => ({
    form: false,
    nome: null,
    preco: null,
    // imagem: null,
    tipo: null,
    ativo: '',
    loading: false,
  }),
  methods: {
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      await useFetch(`/api/products/add`, {
        method: 'POST',
        body: {
          nome: this.nome,
          preco: this.preco || 0,
          // imagem: this.imagem,
          tipo: this.tipo,
          ativo: this.ativo,
        },
      }).then(() => {
        createToast('Produto adicionado com sucesso.', {
          type: 'success'
        });
        setTimeout(() => (
            location.assign('/produtos')
        ), 1200);
      }).catch(() => {
        createToast('Erro ao adicionar produto.', {
          type: 'error'
        });
      }).finally(() => {
        this.loading = false
      });
    },
    required (v) {
      return !!v || 'Campo obrigatório'
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-text>
      <h2 class="mb-12 mt-4">Adicionar produto</h2>
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <v-row>
          <v-col>
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
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <CurrencyInput
              v-model="preco"
              :density="`comfortable`"
              :name="`preco`"
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
                valueRange: {
                  min: 0,
                },
              }"
              label="Preço"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="tipo"
                :items="[
                  { value: '', title: 'Selecione' },
                  { value: 'Filme', title: 'Filme' },
                  { value: 'Fita', title: 'Fita' },
                ]"
                :readonly="loading"
                :rules="[required]"
                item-title="title"
                item-value="value"
                label="Tipo"
                variant="outlined"
                density="comfortable"
                single-line
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
                v-model="ativo"
                :items="[
                  { value: '', title: 'Selecione' },
                  { value: '1', title: 'Sim' },
                  { value: '0', title: 'Não' },
                ]"
                :readonly="loading"
                :rules="[required]"
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
              Adicionar produto
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
