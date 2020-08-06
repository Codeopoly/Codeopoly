import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  HomePage,
  ChooseCharacter,
  HostLobby,
  PlayerLobby,
  CurrentGame,
  Instructions,
  Rejoin,
  Loading
} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create" component={ChooseCharacter} />
        <Route exact path="/game" component={CurrentGame} />
        <Route exact path="/create/lobby" component={HostLobby} />
        <Route exact path="/join/lobby" component={PlayerLobby} />
        <Route exact path="/instructions" component={Instructions} />
        <Route exact path="/rejoin" component={Rejoin} />
        <Route exact path="/loading" component={Loading} />
      </Switch>
    )
  }
}

export default Routes
