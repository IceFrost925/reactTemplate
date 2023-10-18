import lazyComponent from '@/utils/lazyRoute'

import { Routes } from './types'

export const routes: Routes[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    title: '首页',
    Component: lazyComponent(() => import('@/pages/Dashboard')),
    icon: 'meau_Enterprise_certificate'
  },
  {
    path: '/nested',
    name: 'nested',
    title: '模拟菜单',
    icon: 'meau_Performance_maintenance',
    auth: true,
    children: [
      {
        path: '/nested/menu1',
        name: 'menu1',
        title: 'menu1',
        Component: lazyComponent(() => import('@/pages/Nested'))
      },
      {
        path: '/nested/menu2',
        name: 'menu2',
        title: 'Menu2',
        children: [
          {
            path: '/nested/menu2/menu2-1',
            name: 'menu2-1',
            title: 'Menu2-1',
            Component: lazyComponent(() => import('@/pages/Nested/Menu2/Menu2_1'))
          },
          {
            path: '/nested/menu2/menu2-2',
            name: 'menu2-2',
            title: 'Menu2-2',
            Component: lazyComponent(() => import('@/pages/Nested/Menu2/Menu2_1'))
          }
        ]
      }
    ]
  },
  {
    path: '/authManage',
    name: 'authManage',
    title: '权限管理',
    icon: 'meau_Social_security',
    auth: true,
    children: [
      {
        path: '/authManage/accountManage',
        name: 'accountManage',
        title: '用户管理',
        Component: lazyComponent(() => import('@/pages/AuthManage/AccountManage'))
      },
      {
        path: '/authManage/menuManage',
        name: 'menuManage',
        auth: true,
        title: '菜单管理',
        Component: lazyComponent(() => import('@/pages/AuthManage/MenuManage'))
      },
      {
        path: '/authManage/roleManage',
        name: 'roleManage',
        title: '角色管理',
        Component: lazyComponent(() => import('@/pages/AuthManage/RoleManage'))
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    Component: lazyComponent(() => import('@/pages/NotFound'))
  }
]

const baseRoutes: Routes[] = [
  {
    path: '/',
    title: '登录页',
    Component: lazyComponent(() => import('@/pages/Login'))
  },
  {
    path: '*',
    Component: lazyComponent(() => import('@/layout'))
  }
]
export default baseRoutes
