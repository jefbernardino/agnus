import moment from 'moment'
export const DEFAULT_LOCALE = 'pt-BR'

const CURRENCY_FORMAT = Intl.NumberFormat(DEFAULT_LOCALE, {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCurrency = (value) => {
  let formattedValue = CURRENCY_FORMAT.format(Math.floor(value ? value : 0))
  if (formattedValue.charAt(0) === '-') {
    const index = formattedValue.search(/\d/)
    formattedValue = `${formattedValue.slice(1, index)}-${formattedValue.slice(
      index
    )}`
  }
  return formattedValue
}

export const isActive = (status) => {
  return status.toString() === '1' ? 'Sim' : 'Não'
}

export const dateToBr = (data) => {
  return moment(data).format('DD/MM/YYYY')
}

export const dataToURLSearchParams = (data) => {
  return new URLSearchParams(data)
}
