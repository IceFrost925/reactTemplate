import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Pages from '@/routes/Pages'
import { Fragment, useEffect } from 'react'

function App() {
  useEffect(() => {
    console.log(123)
  })
  return (
    <Fragment>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </Fragment>
  )
}

export default App
