import Phaser from 'phaser'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import SceneMain from './scene'

const Game = () => {
  useEffect(() => {
    console.log('useEffect ran!')
    console.log('Window.innerWidth inside game.js', window.innerWidth)
    return function cleanup() {
      console.log('cleanup ran!', game)
      game.destroy(true)
    }
  })
  console.log('Window.innerWidth inside game.js', window.innerWidth)
  const config = {
    type: Phaser.AUTO,
    parent: 'theGame',
    width: window.innerHeight * 0.85, // because the board is square (equal number of spaces on all sides)
    height: window.innerHeight * 0.85,
    resizeInterval: 800,
    scene: [SceneMain]
  }

  const game = new Phaser.Game(config)

  // Scene specific code:
  // function preload() {
  //   this.load.image('logo', 'assets/logo.png')
  // }

  // function create() {
  //   const logo = this.add.image(400, 150, 'logo')

  //   this.tweens.add({
  //     targets: logo,
  //     y: 450,
  //     duration: 2000,
  //     ease: 'Power2',
  //     yoyo: true,
  //     loop: -1
  //   })
  // }
  return null
}

export default Game
