import { useRoutes } from 'react-router-dom'

import routes from '..'
import { Suspense } from 'react'
import { getDelayedFallback } from '@/utils/lazyRoute/lazyRoute.tsx'
import Loading from '@/components/Loading'
import { loader as loaderOptions } from '@/config'
import { RouterBeforeEach } from '@/routes/permission.ts'

function Pages() {
  const Fallback = loaderOptions.delay ? getDelayedFallback(Loading, loaderOptions.delay) : Loading
  const elements = useRoutes(routes)
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <RouterBeforeEach>{elements}</RouterBeforeEach>
      </Suspense>
    </div>
  )
}

export default Pages
