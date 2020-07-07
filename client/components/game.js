import Phaser from 'phaser'
import React, {useEffect} from 'react'
import config from '../../config/gameConfig'

const Game = () => {
  useEffect(() => {
    console.log('useEffect ran!')
    console.log('Window.innerWidth inside game.js', window.innerWidth)
    if (document.getElementById('theGame')) {
      console.log(document.getElementById('theGame'))
      const game = new Phaser.Game(config) // game creation after componentDidMount (hook-style)
    }
    return function cleanup() {
      console.log('cleanup ran!', game) // acts as componentWillUnmount
      game.destroy(true)
    }
  })

  return <div id="insideTheGame" />
}

export default Game
