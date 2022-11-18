export const DEFAULT_LOCALE = 'pt-BR'

const CURRENCY_FORMAT = Intl.NumberFormat(DEFAULT_LOCALE, {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCurrency = (value) => {
  let formattedValue = CURRENCY_FORMAT.format(value)
  if (formattedValue.charAt(0) === '-') {
    const index = formattedValue.search(/\d/)
    formattedValue = `${formattedValue.slice(1, index)}-${formattedValue.slice(
      index
    )}`
  }
  return formattedValue
}

export const isActive = (status) => {
  return status === '1' ? 'Sim' : 'Não'
}
