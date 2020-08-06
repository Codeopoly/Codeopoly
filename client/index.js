import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {createFirestoreInstance} from 'redux-firestore'
import firebase from '../config/fbConfig'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

// Needed for Firestorm v3
const rrfProps = {
  firebase,
  config: {
    userProfile: 'players',
    useFirestoreForProfile: true
  }, // This config is for firestore profiles (?) as per Chaoo Charles, so we don't add our config file here
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('app')
)
