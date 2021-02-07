// bring in set types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

// set initial state as empty
const initialState = []

// export fucntion that takes in that that is initial state and an action
export default function something (state = initialState, action) {
  // destructure action
  const { type, payload } = action
  // evaluate actions based on their type
  switch (type) {
    // in case of set alert
    case SET_ALERT:
      // copy into array, alert that is given to us in state, and set alert with action.payload
      return [...state, payload]
    case REMOVE_ALERT:
      // use filter to find a specific alert and see if alert id is NOT equal to the alert in the payload (filter through all alerts except the one that matches the payload)
      return state.filter(alert => alert.id !== payload)
      // default to simply returning the state
    default:
      return state
  }
}
