// 获取未读消息数量
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfoApi, logoutApi } from '@/servers/login.api.ts'

export const getUserInfoAction = createAsyncThunk('getUserInfo', async () => await getUserInfoApi())
export const logoutAction = createAsyncThunk('logout', async () => await logoutApi())
