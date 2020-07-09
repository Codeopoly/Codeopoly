import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {GameBoard, GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'

const CurrentGame = () => {
  const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
  const gameCode = Object.keys(gamesCollectionObj)[0]
  const playersArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
  const players = useSelector(state => state.firestore.data.players)
  // const players = useSelector((state) => state.players)
  const [allPlayers, setAllPlayer] = useState(false)

  useEffect(
    () => {
      if (players) {
        setAllPlayer(true)
      }
    },
    [players]
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
  console.log('PLAYERS!!!', players)
  useFirestoreConnect(arrayOfPlayerPathsAndGame, players)

  // Our redux state now has:
  // state.firestore.data.games[gameCode] for the game document
  // AND
  // state.firestore.data.players[playerId] for each player document
  if (playersArray.length === 1) {
    return <h1>Waiting for Players...</h1>
  } else if (playersArray && Object.keys(players).length === 2) {
    return (
      <div id="mainScreen">
        <div id="topBar">
          <GameViewTitle />
        </div>
        <div className="players">
          <div className="leftside">
            <Player player={Object.values(players)[0]} />
          </div>
          <div id="theGame">
            <GameBoard />
          </div>
          <div className="rightside">
            <Player player={Object.values(players)[1]} />
          </div>
        </div>
      </div>
    )
  } else if (playersArray && Object.keys(players).length === 3) {
    return (
      <div id="mainScreen">
        <div id="topBar">
          <GameViewTitle />
        </div>
        <div className="players">
          <div className="leftside">
            <Player player={Object.values(players)[0]} />
            <Player player={Object.values(players)[2]} />
          </div>
          <div id="theGame">
            <GameBoard />
          </div>
          <div className="rightside">
            <Player player={Object.values(players)[1]} />
          </div>
        </div>
      </div>
    )
  } else if (playersArray && Object.keys(players).length === 4) {
    return (
      <div id="mainScreen">
        <div id="topBar">
          <GameViewTitle />
        </div>
        <div className="players">
          <div className="leftside">
            <Player player={Object.values(players)[0]} />
            <Player player={Object.values(players)[2]} />
          </div>
          <div id="theGame">
            <GameBoard />
          </div>
          <div className="rightside">
            <Player player={Object.values(players)[1]} />
            <Player player={Object.values(players)[3]} />
          </div>
        </div>
      </div>
    )
  } else return <h1>This Game is Full</h1>
}

export default CurrentGame
