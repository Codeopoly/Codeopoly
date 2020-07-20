import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {GameBoard, GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {EventEmitter} from 'events'
import ChallengeModal from './challengeModal'
import {phaserE} from './scene'
import PlayerPanels from './playerPanels'

export const newGame = new EventEmitter()

const CurrentGame = () => {
  return (
    <div id="mainScreen">
      {/* <div id="topBar">
        <div id="gameViewTitle" className="gameStarted">
          <GameViewTitle />
        </div>
      </div> */}
      <div id="gameView">
        <div>
          <PlayerPanels />
        </div>
      </div>
      <div id="theGame">
        <GameBoard />
      </div>
    </div>
  )
}

export default CurrentGame
