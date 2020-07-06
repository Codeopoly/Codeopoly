import Phaser from 'phaser'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

const RollingDice = () => {
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
    this.load.spritesheet('dice', 'assets/diceRed.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  function create() {
    this.anims.create({
      key: 'firstDiceRoll',
      repeat: -1,
      frameRate: 15,
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 7})
    })
    this.anims.create({
      key: 'secondDiceRoll',
      repeat: -1,
      frameRate: 15,
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 7})
    })

    const first = this.add.sprite(100, 100, 'dice').play('firstDiceRoll')
    const second = this.add.sprite(200, 100, 'dice').play('secondDiceRoll')

    var _anims = this.anims
    document.addEventListener('mouseup', function() {
      if (_anims.paused) {
        _anims.resumeAll()
      } else {
        _anims.pauseAll()
      }
    })
  }

  function update() {
    first.rotation += 0.01
  }

  return null
}

export default RollingDice
