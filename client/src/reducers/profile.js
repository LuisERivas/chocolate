import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

export default function whatever (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_ERROR:
      console.log('profile error was activated: From reducers/profile.js')
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_PROFILE:
      console.log('Profile was cleared')
      return {
        ...state,
        profile: null,
        loading: false
      }
    default:
      return state
  }
}
