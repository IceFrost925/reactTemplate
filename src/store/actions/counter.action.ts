// 获取未读消息数量
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfoApi } from '@/servers/counter.api.ts'

export const getUserInfoAction = createAsyncThunk('getUserInfo', async () => await getUserInfoApi())
