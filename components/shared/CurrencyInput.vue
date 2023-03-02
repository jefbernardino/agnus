<template>
  <v-text-field
    :name="name"
    :class="class"
    :density="density"
    ref="inputRef"
    variant="outlined"
  ></v-text-field>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: [Number, Object],
    name: String,
    class: String,
    density: String,
    options: Object
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>
