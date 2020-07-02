import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {reduxFirestore} from 'redux-firestore'
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase'
import config from '../../config/fbConfig'

const reducer = combineReducers({user})
//compose (video #17 installation connecting redux to firebase)
const middleware = compose(
  // was originally composewithdevTools
  applyMiddleware(
    thunkMiddleware.withExtraArgument({getFirebase}),
    createLogger({collapsed: true})
  ),
  reduxFirestore(config)
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
