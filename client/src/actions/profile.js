import axios from 'axios'
// import { setAlert } from './alert'

import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types'

// get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    // pulls user id from token
    console.log('trying to make axios get request')
    const res = await axios.get(process.env.PORT || 'http://localhost:5000/api/profile/me')
    console.log('get request was made')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    console.log('about to attempt to dispatch profile error: FROM actions/profile.js')
    console.log(err)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
