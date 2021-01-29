// bring in app.css
import './App.css'
// bring in fragment from react
import React, { Fragment } from 'react'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
// bring in router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// bring in components
import Navibar from './components/layout/Navibar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
// Bring in redux
import { Provider } from 'react-redux'
import store from './store'
// bring in alert
import Alert from './components/layout/Alert'

const App = () =>
// provider uses store
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navibar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
export default App
