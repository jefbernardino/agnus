<template>
  <v-text-field
    :name="name"
    ref="inputRef"
    variant="outlined"
    density="compact"
    class="mt-5"
  ></v-text-field>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    name: String,
    options: Object
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>
