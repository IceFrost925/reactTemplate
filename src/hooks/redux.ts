import {useDispatch, useSelector} from 'react-redux'

import type {AppDispatch} from '@/store'

// 二次封装useDispatch、useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: any = (reducer: string) => {
  return useSelector((state: any) => state[reducer])
}
