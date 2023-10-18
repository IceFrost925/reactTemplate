import { useRoutes } from 'react-router-dom'
import baseRoutes from '..'
import { Suspense, useEffect, useState } from 'react'
import { getDelayedFallback } from '@/utils/lazyRoute/lazyRoute.tsx'
import Loading from '@/components/Loading'
import { loader as loaderOptions } from '@/config'
import { RouterBeforeEach } from '@/routes/permission.ts'
import { useAppSelector } from '@/hooks/redux.ts'
import { Routes } from '@/routes/types.ts'
import { cloneDeep } from 'lodash'
import { AnyProps } from '@/utils/lazyRoute/types.ts'

export const StaticRoute = () => {
  const elements = useRoutes(baseRoutes)
  return <RoutesWrap>{elements}</RoutesWrap>
}

// 动态路由
export const DynamicRoute = () => {
  const userInfo = useAppSelector('userInfo')
  // 进行权限判断后的路由表
  const [authRoutes, setAuthRoutes] = useState<Routes[]>([])
  // 生成动态路由
  const elements = useRoutes(authRoutes)
  useEffect(() => {
    setAuthRoutes(cloneDeep(userInfo.authMenu))
  }, [userInfo.authMenu])

  return <RoutesWrap>{elements}</RoutesWrap>
}

const RoutesWrap = ({ children }: AnyProps) => {
  // 加载文案组件
  const Fallback = loaderOptions.delay ? getDelayedFallback(Loading, loaderOptions.delay) : Loading

  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <RouterBeforeEach>{children}</RouterBeforeEach>
      </Suspense>
    </div>
  )
}
export default StaticRoute
