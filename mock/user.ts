import {responseBody} from './utils.js' // 菜单权限
// 菜单权限
const menus = [
  'authManage',
  'accountManage',
  // "menuManage", 未分配权限
  'roleManage',
  'Nested',
  'Menu1',
  'Menu2',
  'Menu2-1',
  'Menu2-2'
]
// 按钮权限
const points = ['deleteBtn', 'editBtn']
// 用户信息
const userInfo = {
  id: 1,
  phone: '12345678911',
  realName: 'admin',
  roles: {
    menus,
    points,
    roleStr: ['超级管理员']
  }
}
export default [
  // login
  {
    url: '/user/login',
    method: 'post',
    statusCode: 200,
    response: (req) => {
      const { username } = req.body
      if (username === 'admin') {
        let jwt =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwiaWF0IjoxNTcwMDc2NjU5fQ.3FT6v8zVptdWGBILD1m1CRY6sCP1I3E947krUh_E3'
        return responseBody({ data: jwt })
      } else {
        return responseBody({ code: 1001, message: '用户名错误' })
      }
    }
  },
  // 获取用户信息
  {
    url: '/user/profile',
    method: 'get',
    statusCode: 200,
    response: () => {
      return responseBody({ data: userInfo })
    }
  },
  // 获取用户信息
  {
    url: '/user/logout',
    method: 'get',
    statusCode: 200,
    response: () => {
      return responseBody({ data: null })
    }
  }
]
