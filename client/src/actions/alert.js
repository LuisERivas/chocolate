// bring in alerts
import { SET_ALERT, REMOVE_ALERT } from './types'

// bring in uuid
import { v4 as uuidv4 } from 'uuid'

// export set alert
// uses msg and alert type, with timeout length
export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  // create unique id using uuid
  const id = uuidv4()
  // will dispatch to the reducer the following things
  dispatch({
    // the type will be set as SET_ALERT
    type: SET_ALERT,
    // the payload will consist of a message, alert type and the unique id
    payload: { msg, alertType, id }
  })

  // setTimeout (to get rid of alert)
  setTimeout(() =>
  // the time out dispatches type and payload
    dispatch({
      // the type is remove alert which gets rid of the alert
      type: REMOVE_ALERT,
      // the payload is the current id that is in the state in order to get rid of the same id alert
      payload: id }), timeout
  )
}
