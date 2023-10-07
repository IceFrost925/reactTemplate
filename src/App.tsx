import './App.css'
import Pages from '@/routes/Pages'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { store, history } from './store'

function App() {
  console.log(history)
  return (
    <Provider store={store}>
      <Router history={history}>
        <Pages />
      </Router>
    </Provider>
  )
}

export default App
