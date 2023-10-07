import { loader as loaderDefaultOptions } from '@/config'

import getLazyComponent from './lazyRoute.tsx'
import type { LoadComponent, LoaderDefaultOptions } from './types.ts'

const configuredLazyComponent = (
  loadComponent: LoadComponent,
  loaderOptions: LoaderDefaultOptions = loaderDefaultOptions
) => getLazyComponent(loadComponent, loaderOptions)
export { loaderDefaultOptions }
export default configuredLazyComponent
