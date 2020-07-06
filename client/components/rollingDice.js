import Phaser from 'phaser'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

// var game = new Phaser.Game(600, 400, Phaser.AUTO, "demo", {preload:preload, create:create, update:update});

const RollingDice = () => {
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
    this.load.spritesheet('dice', 'assets/diceRed.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  function create() {
    const dice = this.add.sprite(100, 100, 'dice', 0)
    this.anims.create({
      key: 'roll',
      repeat: -1,
      frameRate: 15,
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 7})
    })
    // dice.rotation += 0.01
    dice.play('roll')

    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   loop: -1,
    // })
  }

  return null
}

export default RollingDice
