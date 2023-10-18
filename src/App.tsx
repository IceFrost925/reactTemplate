import './App.css'
import Pages from '@/routes/Pages'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { RouterBeforeEach } from '@/routes/permission.ts'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RouterBeforeEach>
              <Pages />
            </RouterBeforeEach>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
