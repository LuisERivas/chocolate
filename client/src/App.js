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

const App = () =>
  <Router>
    <Fragment>
      <Navibar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
export default App
