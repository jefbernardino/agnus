<template>
  <v-container class="primary fullscreen pa-12" fluid>
    <v-card class="mx-auto px-6 py-8 text-center">
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <img src="~/assets/images/logo.png" alt="Agnus Plast" />
        <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Login"
        ></v-text-field>

        <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            type="password"
            clearable
            label="Senha"
            placeholder="Insira sua senha"
        ></v-text-field>

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
          Acessar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// import * as AgnusApi from '@/apis/agnus-api'

import { dataToURLSearchParams } from "~/utils/shared_utils";

definePageMeta({
  layout: "blank",
});

export default {
  name: "login",
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),
  methods: {
    async asyncData() {
      const ip = await this.$api.get('http://icanhazip.com')
      console.log('IP >>> ', ip)
    },
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      // admin
      // megalu

      // jeferson
      // 96254600
      console.log('this.form', this.form)
      console.log('this.email', this.email)
      console.log('this.password', this.password)

      // const { response } = await AgnusApi.login({
      //   'data[Vendedor][login]': this.email,
      //   'data[Vendedor][senha]': this.password,
      // })
      // console.log('response >> ', response)

      const ip = await this.$api.post(
          'https://agnusplast.com.br/pedidos/vendedor',
          dataToURLSearchParams({
            'data[Vendedor][login]': this.email,
            'data[Vendedor][senha]': this.password,
            // email: this.email,
            // password: this.password,
          })
      )
      console.log('IP >>> ', ip)

      this.loading = false

      setTimeout(() => (this.loading = false), 2000)
    },
    required (v) {
      return !!v || 'Campo obrigatório'
    },
  },
}
</script>

<style lang="scss">
.fullscreen {
  background-color: #132e60;
  width: 100%;
  height: 100vh;

  .v-card {
    max-width: 36rem;

    img {
      margin-bottom: 2rem;
      max-width: 30rem;
    }
  }
}
</style>
