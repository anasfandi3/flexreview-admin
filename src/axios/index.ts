import axios from 'axios'
import type {User} from '@/types/auth'
import { useToast } from 'vue-toastification'
import router from '@/router'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const raw = localStorage.getItem('user')
  const authUser: User | null = raw ? JSON.parse(raw) : null

  if (authUser?.username && authUser?.password) {
    config.headers['X-Username'] = authUser.username
    config.headers['X-Password'] = authUser.password
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (['post', 'delete', 'patch', 'put'].includes(response.config.method as string)) {
      if (response.data.api_response_message) {
        useToast().success(response.data.api_response_message)
      }
    }
    return response
  },
  (error) => {
    const errorMessage =
      error?.response?.data.message ?? error?.response?.data?.api_response_message ?? error.message
      useToast().error(errorMessage)
      router.push({ name: 'login' })
  },
)
export default axiosInstance
