<template>
  <v-container class="primary fullscreen pa-12" fluid>
    <v-card class="mx-auto px-6 py-8 text-center">
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <img src="~/assets/images/logo.png" alt="Agnus Plast" />
        <v-radio-group v-model="profile" inline>
          <template v-slot:label>
            <div>Qual o perfil de seu usuário?</div>
          </template>
          <v-radio label="Administrador" value="administrador"></v-radio>
          <v-radio label="Vendedor" value="vendedor"></v-radio>
        </v-radio-group>

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
import { MD5 } from "md5-js-tools";
import { dataToURLSearchParams } from "~/utils/shared_utils";

definePageMeta({
  layout: "blank",
});

export default {
  name: "login",
  data: () => ({
    form: false,
    profile: 'administrador',
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
      console.log('this.password', MD5.generate(this.password))

      let responseUrl;
      console.log('this.profile', this.profile)
      if (this.profile === 'administrador') {
        responseUrl = `api/login/administrador?usuario=${this.email}&resgate=${this.password}`;
      } else  {
        responseUrl = `api/login/vendedor?login=${this.email}&resgate=${this.password}`;
      }
      const response = await fetch(`${responseUrl}`);
      const data = await response.json()
      console.log('data', data.entry)

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
