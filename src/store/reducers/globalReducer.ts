import {createSlice} from '@reduxjs/toolkit' // 初始数据类型

// 初始数据类型
export interface GlobalState {}

// 初始数据
const initialState: GlobalState = {}
//
export const globalReducer = createSlice({
  name: 'globalSetting',
  initialState,
  reducers: {}
})

// export const {  } = globalReducer.actions
export default globalReducer.reducer
