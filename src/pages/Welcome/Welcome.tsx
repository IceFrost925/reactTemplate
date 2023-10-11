import { NavLink } from 'react-router-dom'
import routes from '@/routes'
import { Routes } from '@/routes/types'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import { decrement, increment, incrementByAmount } from '@/store/reducers/userInfoReducer.ts'
import { getUserInfoAction } from '@/store/actions/counter.action.ts'
import { Button } from 'antd'

function Welcome() {
  const counter = useAppSelector('userInfo')
  const dispatch = useAppDispatch()
  return (
    <>
      {routes.map((item: Routes) => {
        return (
          <NavLink key={item.path} to={item.path}>
            {item.title}
          </NavLink>
        )
      })}
      {counter.value}
      <Button type="primary" onClick={() => dispatch(increment())}>
        增加
      </Button>
      <Button onClick={() => dispatch(decrement())}>减少</Button>
      <Button type="link" onClick={() => dispatch(incrementByAmount(123))}>
        带参数
      </Button>
      <Button type="link" onClick={() => dispatch(getUserInfoAction())}>
        发送请求
      </Button>
      {JSON.stringify(counter.userInfo)}
    </>
  )
}

export default Welcome
