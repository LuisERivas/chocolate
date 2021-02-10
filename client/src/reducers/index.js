// bring in alert reducer
import alert from './alert'
import auth from './auth'

import { combineReducers } from 'redux'
export default combineReducers({
  alert,
  auth
})
