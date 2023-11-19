<template>
  <v-container class="primary fullscreen pa-12" fluid>
    <v-card class="mx-auto px-6 pt-4 pb-8 text-center">
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
            variant="outlined"
            density="default"
            single-line
        ></v-text-field>

        <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            type="password"
            class="mb-2"
            clearable
            label="Senha"
            placeholder="Insira sua senha"
            variant="outlined"
            density="default"
            single-line
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
import { createToast } from 'mosha-vue-toastify';
import { useUserStore } from "@/store/user";
import { axiosPublic } from "@/apis/axios";

definePageMeta({
  layout: "auth",
  // middleware: ["login"],
});

export default {
  name: "login",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data: () => ({
    form: false,
    profile: 'administrador',
    email: null,
    password: null,
    loading: false,
  }),
  methods: {
    async onSubmit () {
      if (!this.form) return

      this.loading = true

      // admin, megalu
      // jeferson, 96254600

      let responseUrl;
      if (this.profile === 'administrador') {
        responseUrl = `/api/login/administrador?usuario=${this.email}&resgate=${this.password}`;
      } else  {
        responseUrl = `/api/login/vendedor?login=${this.email}&resgate=${this.password}`;
      }
      // const response = await fetch(
      //     `${responseUrl}`,
      //     {
      //       headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //       }
      //     }
      // );
      // const data = await response.json()
      const response = await axiosPublic.post(`${responseUrl}`);
      const { data } = await response;

      if(data?.entry?.id) {
        const screenToRedirect = data.entry.role === 'admin' ? '/' : '/novo-pedido'

        await this.userStore.fetchUser(data.entry);
        createToast('Seja bem vindo!', {
          type: 'success'
        });
        setTimeout(() => (
            this.$router.push(screenToRedirect)
        ), 1400)
      } else {
        createToast('Falha ao logar, verifique os dados inseridos.', {
          type: 'danger'
        });
      }
      setTimeout(() => (this.loading = false), 1600)
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
