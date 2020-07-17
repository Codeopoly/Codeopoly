import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

const GameViewTitle = props => {
  // const [reload, setReload] = useState(false)
  // const players = useSelector(state => state.firestore.data.players)
  // const gameCollectionObject = useSelector(state => state.firestore.data.games)
  // const gameCode = Object.keys(gameCollectionObject)[0]
  // const gameDoc = gameCollectionObject[gameCode]

  // let currentPlayerId;
  // // const currentPlayerId = gameDoc[gameCode].currentPlayer
  // let currentPlayerName;

  // console.log('what is currentPlayerId?', currentPlayerId)
  // console.log('gameviewtile is rendering')

  // useEffect(
  //   () => {
  //     console.log("useEffect ran in GameViewTitle!")
  //     if (players) {
  //       currentPlayerId = gameDoc.currentPlayer
  //       if (players.length === gameDoc.playersArray.length) {
  //         // if all players have loaded into the firestore "state store"
  //         console.log("time to run getCurrentPlayer???")
  //         getCurrentPlayer()
  //       }
  //     }
  //     setReload(!reload)
  //   },
  //   [players, gameDoc]
  // )

  // const getCurrentPlayer = () => {
  //   if (players && currentPlayerId){
  //     console.log("players in getCurrentPlayers:", players)
  //     console.log("currentPlayerId in getCurrentPlayer:", currentPlayerId)
  //     currentPlayerName = players[currentPlayerId].startupName
  //     console.log("currentPlayerName", currentPlayerName)
  //     return currentPlayerName
  //   }
  // }

  return (
    <div id="gameViewTitle">
      {props.currentPlayerName !== undefined ? (
        <h2>It's {props.currentPlayerName}'s turn!</h2>
      ) : (
        <div>
          <h2>Getting data...</h2>
        </div>
      )}
    </div>
  )
}

export default GameViewTitle
