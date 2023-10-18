import {FC, lazy, useEffect, useState} from 'react'

import {AnyProps, LoadComponent, LoaderDefaultOptions} from './types.ts' // 设置加载中的文案

// 设置加载中的文案
function getDelayedFallback(Fallback: FC, delay: number) {
  return function DelayedFallback(props: AnyProps) {
    const [isDelayPassed, setIsDelayPassed] = useState(false)

    useEffect(() => {
      const timerId = setTimeout(() => setIsDelayPassed(true), delay)

      return () => clearTimeout(timerId)
    }, [])

    return isDelayPassed ? <Fallback {...props} /> : null
  }
}

// 设置加载完成后要显示的组件 --- 懒加载
const getLazyComponent = (loadComponent: LoadComponent, loaderOptions: LoaderDefaultOptions) =>
  lazy(() => {
    // fix the moment of starting loading
    const start = performance.now()
    // start loading
    return loadComponent().then((moduleExports) => {
      // loading is finished
      const end = performance.now()
      const diff = end - start

      const { delay, minimumLoading } = loaderOptions

      if (diff < delay || (diff > delay && diff > delay + minimumLoading)) {
        return moduleExports
      }

      return sleep(delay + minimumLoading - diff).then(() => moduleExports)
    })
  })

// 设置组件异步加载
function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export { getDelayedFallback }

export default getLazyComponent
