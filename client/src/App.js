// bring in app.css
import './App.css'
// bring in fragment from react
import React, { Fragment } from 'react'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'


// bring in components
import Navibar from './components/layout/Navibar'
import Landing from './components/layout/Landing'
const App = () =>
  <Fragment>
    <Navibar />
    <Landing />
  </Fragment>

export default App
