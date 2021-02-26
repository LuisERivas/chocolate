// bring in app.css
import './App.css'
// bring in fragment from react
import React, { Fragment, useEffect } from 'react'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
// bring in router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// bring in components
import Navibar from './components/layout/Navibar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import PickStonks from './components/profile-forms/PickStonks'
// Bring in redux
import { Provider } from 'react-redux'
import store from './store'
// bring in alert
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
// import { getCurrentProfile } from './actions/profile'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return <Provider store={store}>
    <Router>
      <Fragment>
        <Navibar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/pick-stonks' component={PickStonks} />

          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
}
export default App
