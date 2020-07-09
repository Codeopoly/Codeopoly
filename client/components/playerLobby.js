import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {getPlayersThunk} from '../store/players'

const PlayerLobby = () => {
  const gameCode = useSelector(state => state.preGame.gameCode) // Hook into redux store
  const playersArray = useSelector(state => state.players)
  const [localHost, setLocalHost] = useState(null)
  const [redirectNow, setRedirectNow] = useState(false)
  const dispatch = useDispatch() // Hook into dispatch; go ahead and dispatch actions
  // let host = playersArray.filter(player => player.isHost === true)

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
  useEffect(
    () => {
      let host = playersArray.filter(player => player.isHost === true)[0]
      console.log("useEffect's host:", host)
      setLocalHost(host)
    },
    [playersArray]
  )

  if (redirectNow) {
    return <Redirect to="/game" /> // This might need to be /game/:gameCode
  }

  return (
    <div className="welcome">
      <div id="title">
        <h1>[Code]opoly</h1>
        <h4>Room Code: {gameCode}</h4>
      </div>
      <div>
        <div>
          <h3>Your host:</h3>
          {localHost !== undefined && localHost !== null ? (
            <div key="host" className="playerInLobby">
              <div>
                <img className="responsive-img-lobby" src={localHost.avatar} />
              </div>
              <div className="playerName">{localHost.name}</div>
            </div>
          ) : (
            <div>No Host Found</div>
          )}
        </div>
        <div>
          <h3>Joined players:</h3>
          {playersArray.map((player, index) => {
            return player.isHost === false ? (
              <div key={`player${index}`} className="playerInLobby">
                <div>
                  <img className="responsive-img-lobby" src={player.avatar} />
                </div>
                <div className="playerName">{player.name}</div>
              </div>
            ) : (
              <div key={`player${index}`} />
            )
          })}
          {/* {players.map((player, index) => {
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
          })} */}
        </div>
        <h5>Waiting for host to start game...</h5>
      </div>
    </div>
  )
}

export default PlayerLobby
