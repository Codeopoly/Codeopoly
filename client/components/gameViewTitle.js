import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

const GameViewTitle = props => {
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
