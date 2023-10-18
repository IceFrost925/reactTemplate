import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit'
import {getUserInfoAction, logoutAction} from '@/store/actions/userInfo.action.ts'
import {Routes} from '@/routes/types.ts'

// 初始数据类型
export interface CounterState {
  userInfo: any
  loginToken: string
  authMenu: Routes[]
  isRefreshStatus: boolean
}

// 初始数据
const initialState: CounterState = {
  userInfo: null,
  loginToken: '',
  authMenu: [],
  isRefreshStatus: false
}
//
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setLoginToken(state, { payload }) {
      state.loginToken = payload
    },
    addRouteAsync(state, { payload }) {
      state.authMenu = getRoutesByPermission(state, payload)
      state.isRefreshStatus = true
    }
  },
  // axios请求 actions
  extraReducers: (builder) => {
    getUserInfo(builder)
    logout(builder)
  }
})
// axios请求 action
// 获取用户信息
const getUserInfo = (builder: ActionReducerMapBuilder<CounterState>) => {
  builder.addCase(getUserInfoAction.fulfilled, (state, { payload }) => {
    console.warn('success: getUserInfoAction', payload)
    state.userInfo = payload.data
  })
  builder.addCase(getUserInfoAction.rejected, () => {
    console.error('fail: getUserInfoAction')
  })
}
// 退出登录
const logout = (builder: ActionReducerMapBuilder<CounterState>) => {
  builder.addCase(logoutAction.fulfilled, (state, { payload }) => {
    console.warn('success: logoutAction', payload)
    state.userInfo = null
    state.loginToken = ''
  })
  builder.addCase(logoutAction.rejected, () => {
    console.error('fail: getUserInfoAction')
  })
}

// 根据权限匹配路由
const getRoutesByPermission = (state: CounterState, staticRoutes: Routes[]): Routes[] => {
  return staticRoutes.filter((item) => {
    if (item?.children) {
      item.children = getRoutesByPermission(state, item?.children)
    }
    return !item?.auth || state.userInfo?.roles?.menus?.includes(item?.name)
  })
}
// Action creators are generated for each case reducer function
export const { setLoginToken, addRouteAsync } = userInfoSlice.actions

export default userInfoSlice.reducer
