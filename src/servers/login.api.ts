import axios from '@/request/index.ts'

// 登录
export const loginApi = (data: any) => {
  return axios.request({
    method: 'post',
    url: 'user/login',
    data
  })
}
// 获取用户信息
export const getUserInfoApi = () => {
  return axios.request({
    method: 'get',
    url: 'user/profile'
  })
}
// 获取用户信息
export const logoutApi = () => {
  return axios.request({
    method: 'get',
    url: 'user/logout'
  })
}
