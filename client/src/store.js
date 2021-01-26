import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// set initial state
const initialState = {}

// bring in middleware from thunk
const middleware = [thunk]

// create state store that uses reducer, initial state, and applys the destructured middle ware using compose with dev tools
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
