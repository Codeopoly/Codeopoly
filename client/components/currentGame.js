import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {GameBoard, GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {EventEmitter} from 'events'

const CurrentGame = () => {
  const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
  if (gamesCollectionObj === undefined) {
    return <Redirect to="/rejoin" />
  }
  const gameCode = Object.keys(gamesCollectionObj)[0]
  const playerIdArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
  const [ready, setReady] = useState(false)
  const arrayOfPlayerPathsAndGame = playerIdArray.map(playerId => {
    return {
      collection: 'players',
      doc: playerId
    }
  })

  arrayOfPlayerPathsAndGame.push({
    collection: 'games',
    doc: gameCode
  })

  const players = useSelector(state => state.firestore.data.players)

  // console.log('player docs array!', players)

  useFirestoreConnect(arrayOfPlayerPathsAndGame)

  useEffect(
    () => {
      if (players) {
        if (playerIdArray.length === Object.values(players).length) {
          console.log('THEY FINALLY MATCH')
          setReady(true)
        } else {
          console.log("They don't match yettttttttttttttttt")
        }
      }
    },
    [playerIdArray, players]
  )

  // Our redux state now has:
  // state.firestore.data.games[gameCode] for the game document
  // AND
  // state.firestore.data.players[playerId] for each player document
  let centerPanel
  if (ready) {
    centerPanel = (
      <div id="gameView">
        <div className="leftside">
          <div id="player1" className="singlePlayerBox">
            <Player player={Object.values(players)[0]} />
          </div>
          {Object.values(players).length > 2 ? (
            <div id="player3" className="singlePlayerBox">
              <Player player={Object.values(players)[2]} />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div id="theGame">
          <GameBoard players={players} />
        </div>
        <div className="rightside">
          <div id="player2" className="singlePlayerBox">
            <Player player={Object.values(players)[1]} />
          </div>

          {Object.values(players).length > 3 ? (
            <div id="player4" className="singlePlayerBox">
              <Player player={Object.values(players)[3]} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
  console.log(centerPanel, 'CENTER PANEL')
  if (!players) {
    console.log(players, 'VALUE OF')
    return null
  }
  return (
    <div id="mainScreen">
      <div id="topBar">
        <GameViewTitle />
      </div>
      {centerPanel}
    </div>
  )
}

export default CurrentGame
