
<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-text>
        <h2 class="mb-4 mt-4">Faça seu pedido</h2>
        <h4 class="mb-4">Preencha os campos abaixo corretamente:</h4>

        <v-row>
          <v-col
              cols="12"
              md="3"
          >
            <v-select
                v-model="selectedEmployee"
                :items="employees"
                item-title="title"
                item-value="value"
                label="Empresa a faturar"
                variant="outlined"
                density="comfortable"
                return-object
                single-line
            ></v-select>
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <v-select
                v-model="selectedEmployee"
                :items="employees"
                item-title="title"
                item-value="value"
                label="Empresa a faturar"
                variant="outlined"
                density="comfortable"
                return-object
                single-line
            ></v-select>
          </v-col>

          <v-col
              cols="12"
              md="2"
          >
            <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="10"
                label="Prazo de pgto"
                variant="outlined"
                density="comfortable"
                required
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              md="2"
          >
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Data da entrega"
                variant="outlined"
                density="comfortable"
                required
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              md="2"
          >
            <v-select
                v-model="selectedIPI"
                :items="ipi"
                item-title="title"
                item-value="value"
                label="IPI"
                variant="outlined"
                density="comfortable"
                return-object
                single-line
            ></v-select>
          </v-col>
        </v-row>

        <v-table fixed-header height="72vh">
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
          <!-- <tr v-for="item in entries" :key="item.id"> -->
          <tr>
            <td>
              <v-avatar size="46">
                <img src="https://agnusplast.com.br/pedidos/theme/admin/img/placeholders/avatars/avatar.jpg" width="46" alt="Usuário teste">
              </v-avatar>
            </td>
            <td>Empresa</td>
            <td>
              <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  variant="outlined"
                  density="compact"
                  class="mt-5"
                  required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  variant="outlined"
                  density="compact"
                  class="mt-5"
                  required
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  variant="outlined"
                  density="compact"
                  class="mt-5"
                  required
              ></v-text-field>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "novo_pedido",
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    selectedEmployee: { value: 'Agnusplast', title: 'Agnusplast Indústria e Comércio' },
    employees: [
      { value: 'Agnusplast', title: 'Agnusplast Indústria e Comércio' },
      { value: 'JColombo', title: 'J Colombo Comércio e Embalagens' },
    ],
    selectedIPI: { value: 'ISENTO', title: 'Isento' },
    ipi: [
      { value: 'ISENTO', title: 'Isento' },
      { value: '15%', title: 'IPI 15%' },
    ],
  }),
}
</script>

<style scoped>

</style>
