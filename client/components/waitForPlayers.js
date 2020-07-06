import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import preGame from '../store/preGame'
import {getGameSnapshot} from '../store/game'

const WaitForPlayers = props => {
  const [host, setHost] = useState('')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    setHost(props.preGame.game.host)
    getGameSnapshot(props.preGame.gameCode)
    console.log('useEffect props.preGame', props.preGame.gameCode)
  })

  console.log('props', props)

  return (
    <div className="welcome">
      <div id="title">
        <h1>[Code]opoly</h1>
        <h4>Room Code: {props.match.params.gameId}</h4>
        {players[0] ? (
          players.map(player => {
            return <p key="player.id">player: {player.id}</p>
          })
        ) : (
          <p>No players have joined yet</p>
        )}
      </div>
      <div id="playersJoinedBox">
        {host ? (
          host.includes(props.preGame.playerId) ? (
            <button type="button">Start Game</button>
          ) : (
            (<p>Host ID: {host.slice(8, host.length)}</p>,
            <p>Waiting for host to start game...</p>)
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

const mapDispatch = dispatch => {
  return {
    getGameSnapshot: gameId => {
      dispatch(getGameSnapshot(gameId))
    }
  }
}

export default connect(mapState, mapDispatch)(WaitForPlayers)
