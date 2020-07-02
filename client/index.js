import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import firebase from 'firebase/app'
import {createFirestoreInstance} from 'redux-firestore'
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import App from './app'
import config from '../config/fbConfig'

// establishes socket connection
import './socket'
const rrfProps = {
  firebase,
  config: config,
  dispatch: store.dispatch,
  createFirestoreInstance
}
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('app')
)
