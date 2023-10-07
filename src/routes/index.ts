import lazyComponent from '@/utils/lazyRoute'

import { Routes } from './types'

const routes: Routes[] = [
  {
    Component: lazyComponent(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: 'meau_Enterprise_certificate'
  },
  {
    Component: lazyComponent(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Page 1',
    icon: 'meau_Performance_maintenance',
    auth: true
  },
  {
    Component: lazyComponent(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Page 2',
    icon: 'meau_Social_security'
  },
  {
    Component: lazyComponent(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Page 3',
    icon: 'menu_all_personnel'
  },
  {
    Component: lazyComponent(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Page 4',
    icon: 'menu_all_personnel'
  },
  {
    Component: lazyComponent(() => import('@/pages/NotFound')),
    path: '*'
  }
]

export default routes
