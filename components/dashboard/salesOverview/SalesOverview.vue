<script setup lang="ts">
import { onMounted } from "vue";
import GoogleChart from "./Gchart";

const elementVisible = ref(false);

onMounted(() => {
  setTimeout(() => (elementVisible.value = true), 350);
});
</script>

<template>
  <v-card>
    <v-card-text>
      <div class="d-sm-flex align-center">
        <div>
          <h3 class="text-h6 title font-weight-medium">Vendas</h3>
          <h5 class="subtitle">Comparativo de produtos vendidos</h5>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <div class="d-flex align-center">
            <div class="d-flex align-center px-2">
              <span class="text-primary">
                <span class="text-overline">
                  <i class="mdi mdi-brightness-1 mx-1"></i>
                </span>
                <span class="font-weight-regular">Filme</span>
              </span>
            </div>
            <div class="d-flex align-center px-2">
              <span class="text-secondary">
                <span class="text-overline">
                  <i class="mdi mdi-brightness-1 mx-1"></i>
                </span>
                <span class="font-weight-regular">Fita</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5" v-if="elementVisible">
        <GoogleChart />
      </div>
    </v-card-text>
  </v-card>
</template>
