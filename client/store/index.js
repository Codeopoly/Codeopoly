import {createStore, combineReducers, applyMiddleware} from 'redux'
import {firebaseReducer, getFirebase} from 'react-redux-firebase'
import {firestoreReducer, getFirestore} from 'redux-firestore'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import {getFirebase} from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Imported Reducers:
import user from './user'
import preGame from './preGame'

const reducer = combineReducers({
  user,
  preGame,
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
