import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {getPlayersThunk} from '../store/players'
import {startGameThunk} from '../store/preGame'

const HostLobby = () => {
  const gameCode = useSelector(state => state.preGame.gameCode) // Hook into redux store
  const players = useSelector(state => state.players)
  const [redirectNow, setRedirectNow] = useState(false)
  const dispatch = useDispatch() // Hook into dispatch; go ahead and dispatch actions

  useFirestoreConnect([{collection: 'games', doc: gameCode}])
  const gameFromFirestore = useSelector(({firestore: {data}}) => data)
  useEffect(
    () => {
      if (gameFromFirestore.games) {
        if (gameFromFirestore.games[gameCode].isStarted === true) {
          setRedirectNow(true)
        }
        const array = gameFromFirestore.games[gameCode].playersArray
        dispatch(getPlayersThunk(array))
      }
    },
    [gameFromFirestore]
  )

  const handleStart = () => {
    console.log('I clicked START GAME')
    dispatch(startGameThunk(gameCode))
  }

  if (redirectNow) {
    return <Redirect to="/game" /> // This might need to be /game/:gameCode
  }

  return (
    <div className="welcome">
      <div id="title">
        <h1>[Code]opoly</h1>
        <h4>Room Code: {gameCode}</h4>
        <button
          type="button"
          disabled={players.length < 2}
          onClick={handleStart}
        >
          START GAME
        </button>
      </div>
      <div>
        <div>
          <h3>Joined players:</h3>
          {players.map((player, index) => {
            return player.isHost === false ? (
              <div key={`player${index}`}>
                <div>
                  <img
                    className="responsive-img-lobby"
                    src={`../assets/${player.avatar}.png`}
                  />
                </div>
                <div className="playerName">{player.name}</div>
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
