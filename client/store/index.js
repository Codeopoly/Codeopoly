import {createStore, combineReducers, applyMiddleware} from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {getFirebase} from 'react-redux-firebase'

import user from './user'

const reducer = combineReducers({
  user,
  firebase: firebaseReducer,
  firestore: firestoreReducer // why is this blue??
})
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({getFirebase}),
    createLogger({collapsed: true})
  )
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
