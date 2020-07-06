import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import preGame from '../store/preGame'
// import { useParams } from 'react-router';

const WaitForPlayers = props => {
  const [host, setHost] = useState('')

  useEffect(() => {
    setHost(props.preGame.game.host)
    console.log('useEffect props.preGame', props.preGame)
  })

  console.log('props', props)

  return (
    <div className="welcome">
      <div id="title">
        <h1>[Code]opoly</h1>
        <h4>Room Code: {props.match.params.gameId}</h4>
      </div>
      <div id="playersJoinedBox">
        {host ? (
          host.includes(props.preGame.playerId) ? (
            <button type="button">Start Game</button>
          ) : (
            <p>Host ID: {host.slice(8, host.length)}</p>
          )
        ) : (
          <br />
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    preGame: state.preGame
  }
}

const mapDispatch = dispatch => {}

export default connect(mapState, mapDispatch)(WaitForPlayers)
