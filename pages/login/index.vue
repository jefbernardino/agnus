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
    onSubmit () {
      if (!this.form) return

      this.loading = true

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
