// import axios from 'axios'
// import { REGISTER_SUCCESS, REGISTER_FAIL } from './types'
// // bring in setAlert action
// import { setAlert } from './alert'

// // register user export with input of name, email, and password, then dispatch with header configuration
// export const register = ({ name, email, password }) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   // set up body configureation by making name, email, and password into json format
//   const body = JSON.stringify({ name, email, password })
//   // try catch to dispatch infomration
//   try {
//     // asych send axios request to api/users as post with body and config
//     const res = await axios.post('/api/users', body, config)
//     // dispatch register success action type with payload of the res.data
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data
//     })
//     // if there is an error when trying to dispatch the infomraiton
//   } catch (err) {
//     // establish errors as error response from data.errors
//     const errors = err.response.data.errors
//     console.log(errors)
//     // if there is a value in errors then dispatch each error with message and alert
//     if (errors) {
//       console.log('oinkkkkeersss')
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//     }
//     // then dispatch register failed action
//     dispatch({
//       type: REGISTER_FAIL
//     })
//   }
// }

import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from './types'

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get(process.env.PORT || 'http://localhost:5000/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
    dispatch(
      loadUser()
    )
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
// register user

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json' }
  }
  const body = JSON.stringify({ name, email, password })
  try {
    // const proxyUrl = 'https://infinite-castle-58852.herokuapp.com/'
    // will set to whatever port is being used by host
    const res = await axios.post(process.env.PORT || 'http://localhost:5000/api/users', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(
      loadUser()
    )
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login user

export const login = (email, password) => async dispatch => {
  const config = {
    headers: { 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json' }
  }
  const body = JSON.stringify({ email, password })
  try {
    // const proxyUrl = 'https://infinite-castle-58852.herokuapp.com/'
    // will set to whatever port is being used by host
    const res = await axios.post(process.env.PORT || 'http://localhost:5000/api/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}
