import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserInfoAction } from '@/store/actions/counter.action.ts'

// 初始数据类型
export interface CounterState {
  value: number
  userInfo: any
}

// 初始数据
const initialState: CounterState = {
  value: 0,
  userInfo: null
}
//
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1
    },
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  },
  // axios请求 actions
  extraReducers: (builder) => {
    getUserInfo(builder)
  }
})
// axios请求 action
const getUserInfo = (builder: ActionReducerMapBuilder<CounterState>) => {
  builder.addCase(getUserInfoAction.fulfilled, (state, { payload }) => {
    console.warn('success: getUserInfoAction', payload)
    state.userInfo = payload.data
  })
  builder.addCase(getUserInfoAction.rejected, () => {
    console.error('fail: getUserInfoAction')
  })
}

// Action creators are generated for each case reducer function
export const { decrement, increment, incrementByAmount } = userInfoSlice.actions

export default userInfoSlice.reducer
