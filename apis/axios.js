import Axios from 'axios'
const DEFAULT_REQUEST_TIMEOUT = 5000

export const axiosPublic = Axios.create({
  baseURL: '',
  timeout: DEFAULT_REQUEST_TIMEOUT,
  headers: {
    common: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
})
