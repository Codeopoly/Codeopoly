import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Game, PanelL, PanelR, GameViewTitle} from './index'

const GameView = () => {
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
