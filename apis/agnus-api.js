import { dataToURLSearchParams } from '@/utils/shared_utils'

const URL_LOGIN = `https://agnusplast.com.br/pedidos/`
const URL_LOGIN_VENDEDOR = `${URL_LOGIN}vendedor/`

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
}

export const login = (data) => {
  return $axios.$post(URL_LOGIN_VENDEDOR, dataToURLSearchParams(data))
}
