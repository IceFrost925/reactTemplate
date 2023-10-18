import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import userInfoReducer from '@/store/reducers/userInfoReducer.ts'
import storage from 'redux-persist/lib/storage'
import globalReducer from '@/store/reducers/globalReducer.ts'

// 持久化配置
const persistConfig = {
  key: 'root', // 存储的键名
  storage, // 保存在localStorage中
  blacklist: ['globalSetting', 'userInfo']
}
// 单个slice内部持久化策略 -- 需要在root中排除
const userInfoConfig = {
  key: 'userInfo', // 存储的键名
  storage, // 保存在localStorage中
  blacklist: ['isRefreshStatus']
}
// 合并reducer
const reducers = combineReducers({
  userInfo: persistReducer(userInfoConfig, userInfoReducer),
  globalSetting: globalReducer
})

// 数据持久化
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // 解决序列化问题
    }),
  reducer: persistedReducer
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
