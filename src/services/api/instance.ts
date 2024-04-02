import { getCSRF } from '@/helpers'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://elife.loc/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': getCSRF(),
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  config => {
    config.headers['X-CSRF-TOKEN'] = getCSRF()

    return config
  },
  error => Promise.reject(error)
)

export default instance
