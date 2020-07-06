import Phaser from 'phaser'
//import AlignGrid from '../../utility/AlignGrid'
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
  console.log(game.scene, 'game scene')

  function preload() {
    this.load.image('logo', 'assets/logo.png', {
      frameWidth: 32,
      frameHeight: 24
    })
  }

  function create() {
    //   const logo = this.add.image(400, 150, 'logo')

    //   this.tweens.add({
    //     targets: logo,
    //     y: 450,
    //     duration: 2000,
    //     ease: 'Power2',
    //     yoyo: true,
    //     loop: -1,
    //   })
    // }
    // const group = this.add.group({key: 'logo', frame: [0], frameQuantity: 20})
    // Phaser.Actions.GridAlign(group.getChildren(), {
    //   width: 10,
    //   height: 10,
    //   cellWidth: 32,
    //   cellHeight: 32,
    //   x: 100,
    //   y: 100,
    // })

    // this.aGrid = new AlignGrid({scene: this, rows: 12, columns: 12}, game)
    // this.aGrid.showNumbers()
    // this.placeAtIndex(0, 'logo')
    // var board = this.add.grid(200, 300, 450, 500, 90, 64, 0xff0000)
    // var g2 = this.add
    //   .grid(300, 340, 512, 256, 64, 64, 0x00b9f2)
    //   .setAltFillStyle(0x016fce)
    //   .setOutlineStyle()

    return null
  }
}

export default Game
