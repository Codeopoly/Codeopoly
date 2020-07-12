import AlignGrid from '../../utility/alignGrid'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }
  preload() {
    this.load.image('background', 'assets/tilemaps/background.png')
    this.load.tilemapTiledJSON('board', 'assets/tilemaps/tile_board.json')
    this.load.spritesheet('dice', 'assets/dice.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('card1', 'assets/callstack/1.png', {
      frameWidth: 425,
      frameHeight: 275
    })
  }
  create() {
    var gridConfig = {
      scene: this,
      cols: 12,
      rows: 12
    }

    this.aGrid = new AlignGrid(gridConfig, this.game)
    this.aGrid.showNumbers()

    const arr = []

    // this.center = this.add.image(
    //   this.game.config.width / 2, // where the center of the image is placed on the x-axis
    //   this.game.config.height / 2, // y-axis
    //   'center'
    // )

    // //scale the center
    // this.center.displayWidth = this.game.config.width * 0.665
    // this.center.scaleY = this.center.scaleX

    // const backgroundImage = this.add.image(
    //   this.game.config.width / 2,
    //   this.game.config.height / 2,
    //   'background'
    // )
    // .setOrigin(0, 0)
    // backgroundImage.setScale(2, 0.8)
    // const board = this.make.tilemap({key: 'board'})
    let board = this.make.tilemap({key: 'board'})
    // let boardData = board.addTilesetImage('board')
    console.log('board is added')
    const tileset = board.addTilesetImage('all tiles', 'background')
    console.log('tileset added')
    const layer = board.createStaticLayer('Tile Layer 1', tileset, 0, 0)
    console.log('layer added')

    this.anims.create({
      key: 'firstDiceRoll',
      repeat: -1,
      frameRate: 15,
      frames: this.anims.generateFrameNames('dice', {start: 0, end: 5})
    })
    this.anims.create({
      key: 'secondDiceRoll',
      repeat: -1,
      frameRate: 15,
      frames: this.anims.generateFrameNames('dice', {start: 2, end: -2})
    })

    // Code for the dice:
    // const first = this.add.sprite(180, 200, 'dice').play('firstDiceRoll')
    // const second = this.add.sprite(280, 200, 'dice').play('secondDiceRoll')

    // var _anims = this.anims
    // this.tweens.add({
    //   targets: first,
    //   angle: 360.0,
    //   duration: 50,
    //   repeat: -1
    // })
    // this.tweens.add({
    //   targets: second,
    //   angle: 360.0,
    //   duration: 50,
    //   repeat: -1
    // })
    // var _tweens = this.tweens
    // document.addEventListener('mouseup', function() {
    //   if (_anims.paused) {
    //     _anims.resumeAll()
    //     _tweens.resumeAll()
    //   } else {
    //     _anims.pauseAll()
    //     _tweens.pauseAll()
    //   }
    // })

    // Code for Callstack deck:
    const deckSpot = this.game.config.width * 0.65
    const card = this.add.sprite(deckSpot, deckSpot, 'card1', 0)
    card.displayWidth = this.game.config.width / 4.2
    card.scaleY = card.scaleX
    card.setAngle(-45)
    card.isFlipping = false
    card.setInteractive()

    const gameOptions = {
      // flipping speed in milliseconds
      flipSpeed: 200,
      // flipping zoom ratio. Simulates the card to be raised when flipping
      flipZoom: 1.2
    }

    card.on(
      'pointerdown',
      function() {
        // if the card is not flipping:
        console.log('I clicked the card!')
        if (!card.isFlipping) {
          // make it flip now!
          card.isFlipping = true
          console.log('card scale', card.scale)
          console.log('card scaleX', card.scaleX)
          console.log('card scaleY', card.scaleY)
          myFlipTween.play()
        }
        if (card.canBeDismissed) {
          card.destroy()
        }
      },
      this
    )

    // first tween: we raise and flip the card
    // const flipTween = this.tweens.add({targets: card.scale}).updateTo({
    //   x:0,
    //   y: gameOptions.flipZoom
    // }, gameOptions.flipSpeed / 2)

    const myFlipTween = this.tweens.add({
      targets: card,
      scaleX: 0,
      scaleY: gameOptions.flipZoom,
      duration: gameOptions.flipSpeed / 2,
      paused: true,
      onComplete: switchSprite,
      onCompleteParams: [card]
      // onStart: handleMyFlipTween,
      // onStartParams: [card]
    })

    function switchSprite(tween, targets, gameObject) {
      console.log('switchSprite ran!')
      console.log('arguments:', arguments)
      console.log('targets[0].frame', targets[0].frame)
      targets[0].setFrame(1 - targets[0].frame.name)
      // targets[0].frame = 1 - targets[0].frame;
      backFlipTween.play()
    }

    const backFlipTween = this.tweens.add({
      targets: card,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      duration: gameOptions.flipSpeed / 2,
      paused: true,
      onComplete: backFlipDone
    })

    function backFlipDone() {
      console.log('backFlipDone ran!')
      card.canBeDismissed = true
    }

    // function handleMyFlipTween (tween, targets, gameObject){
    //   console.log("handler ran!")

    // }

    // // second tween: we complete the flip and lower the card
    // const backFlipTween = this.add.tween(this.card.scale).to({
    //   x: 1,
    //   y: 1
    // }, this.gameOptions.flipSpeed / 2, Phaser.Easing.Linear.None)

    // // once back on the table, we can flip it again
    // backFlipTween.onComplete.add(function(){
    //   card.isFlipping = false
    // }, this)
  }
  update() {}
}
