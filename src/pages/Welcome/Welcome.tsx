import { NavLink } from 'react-router-dom'
import routes from '@/routes'
import { Routes } from '@/routes/types'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import { Button } from 'antd'
import { decrement, increment, incrementByAmount } from '@/store/reducers/counterReducer.ts'

function Welcome() {
  const counter = useAppSelector('counter')
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
      <Button onClick={() => dispatch(increment())}>增加</Button>
      <Button onClick={() => dispatch(decrement())}>减少</Button>
      <Button onClick={() => dispatch(incrementByAmount(123))}>带参数</Button>
    </>
  )
}

export default Welcome
