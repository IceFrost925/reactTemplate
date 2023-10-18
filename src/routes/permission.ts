import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { Routes } from './types'
import { AnyProps } from '@/utils/lazyRoute/types'
import { routes } from '@/routes/index.ts'
import { addRouteAsync } from '@/store/reducers/userInfoReducer.ts'
import { cloneDeep } from 'lodash'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import { getUserInfoAction } from '@/store/actions/userInfo.action.ts'

export const RouterBeforeEach = ({ children }: AnyProps) => {
  const userInfo = useAppSelector('userInfo')
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigator = useNavigate()

  const getUserInfo = useCallback(async () => {
    await dispatch(getUserInfoAction())
    dispatch(addRouteAsync(cloneDeep(routes)))
  }, [])
  useEffect(() => {
    // 判断是否登录
    if (userInfo.loginToken) {
      // 根据权限设置动态路由
      if (!userInfo.isRefreshStatus) {
        getUserInfo()
      }
    } else {
      // 未登录调整登录页
      if (location.pathname != '/') {
        navigator('/')
      }
    }
  }, [location.pathname, userInfo.isRefreshStatus])
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
