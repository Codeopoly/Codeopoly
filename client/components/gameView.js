import React, {useState} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {GameBoard, GameViewTitle} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'

const GameView = () => {
  const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
  const gameCode = Object.keys(gamesCollectionObj)[0]
  const playersArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
  const players = useSelector(state => state.firestore.data.players)
  // let arrayOfPlayerPathsAndGame = []
  // console.log("GameView loaded!")

  console.log('playersArray: ', playersArray)

  const arrayOfPlayerPathsAndGame = playersArray.map(playerId => {
    return {
      collection: 'players',
      doc: playerId
    }
  })
  arrayOfPlayerPathsAndGame.push({
    collection: 'games',
    doc: gameCode
  })

  console.log('arrayOfPlayerPathsAndGame: ', arrayOfPlayerPathsAndGame)
  console.log('PLAYERS!!!', currentPlayers)
  useFirestoreConnect(arrayOfPlayerPathsAndGame)
  // Our redux state now has:
  // state.firestore.data.games[gameCode] for the game document
  // AND
  // state.firestore.data.players[playerId] for each player document

  return (
    <div id="mainScreen">
      <div id="topBar">
        <GameViewTitle />
      </div>
      <div className="players">
        <div className="leftside">
          <Player player={players[0]} />
          <Player player={players[2]} />
        </div>
        <div>
          <GameViewTitle />
          <div id="theGame">
            <GameBoard />
          </div>
        </div>
        <div className="rightside">
          <Player player={players[1]} />
          <Player player={players[3]} />
        </div>
      </div>
    </div>
  )
}

export default GameView
