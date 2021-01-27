// bring in alerts
import { SET_ALERT, REMOVE_ALERT } from './types'

// bring in uuid
import uuid from 'uuid'

// export set alert
// uses msg and alert type
export const setAlert = (msg, alertType) => dispatch => {
  // create unique id using uuid
  const id = uuid.v4()
  // will dispatch to the reducer the following things
  dispatch({
    // the type will be set as SET_ALERT
    type: SET_ALERT,
    // the payload will consist of a message, alert type and the unique id
    payload: { msg, alertType, id }
  })
}
