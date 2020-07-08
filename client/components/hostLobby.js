import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {getPlayersThunk} from '../store/players'

const HostLobby = () => {
  const gameCode = useSelector(state => state.preGame.gameCode) // Hook into redux store
  const players = useSelector(state => state.players)
  const [redirectNow, setRedirectNow] = useState(false)
  const dispatch = useDispatch() // Hook into dispatch; go ahead and dispatch actions

  useFirestoreConnect([{collection: 'games', doc: gameCode}])
  const gamePlayers = useSelector(({firestore: {data}}) => data)
  useEffect(
    () => {
      if (gamePlayers.games) {
        const array = gamePlayers.games[gameCode].playersArray
        dispatch(getPlayersThunk(array))
      }
    },
    [gamePlayers]
  )

  return (
    <div>
      <div id="title">
        <h1>[Code]opoly</h1>
        <h4>Room Code: {gameCode}</h4>
        <button>START GAME</button>
      </div>
      <div>
        <div>
          <h3>Joined players:</h3>
          {players.map((player, index) => {
            return player.isHost === false ? (
              <div key={`player${index}`} className="playerInLobby">
                <div>
                  <img className="responsive-img" src={player.avatar} />
                </div>
                <div>{player.name}</div>
              </div>
            ) : (
              <div key={`player${index}`} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HostLobby
