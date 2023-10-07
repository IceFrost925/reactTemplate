import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Routes } from './types'
import routes from '.'
import { AnyProps } from '@/utils/lazyRoute/types'

export const RouterBeforeEach = ({ children }: AnyProps) => {
  const location = useLocation()
  const navigator = useNavigate()
  useEffect(() => {
    const router = getCurrentRouterMap(routes, location.pathname)
    if (router?.auth && checkAuth(router)) {
      navigator('/404')
    }
  }, [location.pathname])
  return children
}

const getCurrentRouterMap = (routers: Routes[], path: string): Routes | null => {
  for (const router of routers) {
    if (router.path == path) return router
    if (router.children) {
      const childRouter = getCurrentRouterMap(router.children, path)
      if (childRouter) return childRouter
    }
  }
  return null
}

// 获取用户菜单权限进行路由对比
const checkAuth = (router: Routes): boolean => {
  return router.auth || false
}
