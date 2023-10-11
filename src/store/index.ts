import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history'
import { combineReducers } from 'redux'
import { createReduxHistoryContext } from 'redux-first-history'
import { persistReducer } from 'redux-persist'
import userInfoReducer from '@/store/reducers/userInfoReducer.ts'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Setup redux-first-history
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory()
})
// 合并reducer
const reducers = combineReducers({
  userInfo: userInfoReducer,
  router: routerReducer
})
// 持久化配置
const persistConfig = {
  key: 'root', // 存储的键名
  storage, // 保存在localStorage中
  whitelist: ['setting'] // 持久化白名单
}
// 数据持久化
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routerMiddleware]),
  reducer: persistedReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
export const history = createReduxHistory(store)
