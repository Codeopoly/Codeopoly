import React, {useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {useFirestoreConnect} from 'react-redux-firebase'

const GameViewTitle = () => {
  const players = useSelector(state => state.players)

  return (
    <div id="gameViewTitle">
      <h2>It's {players[0].name}'s turn!</h2>
    </div>
  )
}

export default GameViewTitle
