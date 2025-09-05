import axios from 'axios'
import { getAuthToken } from '../utils'

export const axiosUbigeoApi = axios.create()

axiosUbigeoApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    config.headers.Authorization = token
    config.headers['Content-Type'] = 'application/json'
    config.baseURL = import.meta.env.VITE_ENDPOINT_UBIGEO as string
    return config
  },
  (error) => Promise.reject(error),
)

axiosUbigeoApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)
