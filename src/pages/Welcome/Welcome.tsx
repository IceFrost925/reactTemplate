import { NavLink } from 'react-router-dom'
import routes from '@/routes'
import { Routes } from '@/routes/types'

function Welcome() {
  return (
    <>
      {routes.map((item: Routes) => {
        return (
          <NavLink key={item.path} to={item.path}>
            {item.title}
          </NavLink>
        )
      })}
    </>
  )
}

export default Welcome
