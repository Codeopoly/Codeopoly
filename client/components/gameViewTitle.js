import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

const GameViewTitle = () => {
  const [reload, setReload] = useState(false)
  const players = useSelector(state => state.firestore.data.players)
  const gameDoc = useSelector(state => state.firestore.data.games)
  const gameCode = Object.keys(gameDoc)[0]
  const currentPlayerId = gameDoc[gameCode].currentPlayer

  console.log('what is currentPlayerId?', currentPlayerId)
  console.log('gameviewtile is rendering')

  useEffect(
    () => {
      setReload(!reload)
    },
    [players, gameDoc]
  )

  function getCurrentPlayer() {
    return players[currentPlayerId]
  }

  return (
    <div id="gameViewTitle">
      {players ? (
        <h2>It's {getCurrentPlayer().startupName}'s turn!</h2>
      ) : (
        <div>
          <h2>Getting data...</h2>
        </div>
      )}
    </div>
  )
}

export default GameViewTitle
