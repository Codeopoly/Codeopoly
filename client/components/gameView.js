import React, {useState} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {Game, PanelL, PanelR, GameViewTitle} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'

const GameView = () => {
  const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
  const gameCode = Object.keys(gamesCollectionObj)[0]
  const playersArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
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
      <div id="gameView">
        <div id="panelL">
          <PanelL />
        </div>
        <div id="theGame">
          <Game />
        </div>
        <div id="panelR">
          <PanelR />
        </div>
      </div>
    </div>
  )
}

export default GameView
