import axios from 'axios'
import { requestInterceptor, responseInterceptor } from './interceptors'

const baseURL = import.meta.env.VITE_APP_API || ''
// 初始化
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 20,
  withCredentials: true
})

// 请求拦截器
requestInterceptor(instance)

// 响应拦截器
responseInterceptor(instance)

export default instance
