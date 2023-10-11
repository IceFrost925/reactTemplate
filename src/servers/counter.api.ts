import axios from '@/request/index.ts'

// 退出登录
export const getUserInfoApi = () => {
  return axios.request({
    method: 'get',
    url: 'https://www.fastmock.site/mock/64f237e2c70ee37283fd8aebaf65d820/api/getUserInfo'
  })
}
