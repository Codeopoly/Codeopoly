import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, Switch} from 'react-router-dom'
import {createFirestoreInstance} from 'redux-firestore'
import firebase from '../config/fbConfig'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'
import {Game, PanelL, PanelR} from './components'

const fbConfig = {}

// Needed for Firestorm v3
const rrfProps = {
  firebase,
  config: {
    // userProfile: 'codeopoly',
    useFirestoreForProfile: true
  }, // This config is for firestore profiles (?) as per Chaoo Charles, so we don't add our config file here
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

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <Switch>
          <Route exact path="/game" component={PanelL} />
        </Switch>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('panelL')
)

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <Switch>
          <Route exact path="/game" component={Game} />
        </Switch>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('theGame')
)

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <Switch>
          <Route exact path="/game" component={PanelR} />
        </Switch>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('panelR')
)
