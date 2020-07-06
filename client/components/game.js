import Phaser from 'phaser'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

const Game = () => {
  useEffect(() => {
    console.log('useEffect ran!')
    return function cleanup() {
      console.log('cleanup ran!', game)
      game.destroy(true)
    }
  })
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
      preload: preload,
      create: create
    }
  }

  const game = new Phaser.Game(config)

  function preload() {
    this.load.image('logo', 'assets/logo.png')
  }

  function create() {
    const logo = this.add.image(400, 150, 'logo')

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })
  }
  return null
}

export default Game
