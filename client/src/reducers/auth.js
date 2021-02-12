// import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types'

// const initialState = {
//   // token is grabbed from local storage
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   // in state of loading
//   loading: true,
//   // no user
//   user: null
// }

// // function needs initial state and action type
// export default function (state = initialState, action) {
//   // action is made up of the action type and the payiload
//   const { type, payload } = action
//   // switch between type of regsiter sucess and register fail
//   switch (type) {
//     // if register success
//     case REGISTER_SUCCESS:
//       // set token with the token from the payload
//       localStorage.setItem('token', payload.token)
//       // return the state, payload, true authenitcation and loading false
//       return {
//         ...state,
//         ...payload,
//         isAuthenticated: true,
//         loading: false
//       }
//       // if register fail
//     case REGISTER_FAIL:
//       // gets rid of token
//       console.log('poop')
//       localStorage.removeItem('token')
//       console.log(localStorage)
//       return {
//         // return state, null token, authentication false, and loading false
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         loading: false
//       }
//     default:
//       return state
//   }
// }

import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types'

// set intial state for token in local storage
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function cases (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case LOGOUT:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}
