import AlignGrid from '../../utility/alignGrid'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }

  preload() {
    this.load.image('background', 'assets/tilemaps/background.png')
    this.load.image('drawCard', 'assets/tilemaps/draw_card.png')
    this.load.image('interview', 'assets/tilemaps/interview.png')
    this.load.tilemapTiledJSON('board', 'assets/tilemaps/tile_board.json')
    this.load.image('doge', 'assets/Doge-Meme.png')
    this.load.spritesheet('dice', 'assets/dice.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.image('doge', 'assets/Doge-Meme.png')
  }
  create() {
    this.keys = this.input.keyboard.createCursorKeys()

    let board = this.make.tilemap({key: 'board'})
    // let boardData = board.addTilesetImage('board')
    console.log('board is added')
    const tileset = board.addTilesetImage('all tiles', 'background')
    console.log('tileset added')
    const firstLayer = board.createStaticLayer('Tile Layer 1', tileset, 0, 0)
    console.log('first layer added')

    // this.physics.world.bounds.width = board.width
    // this.physics.world.bounds.height = board.height

    const interviewLayer = board.createStaticLayer('Interview', tileset, 0, 0)
    console.log('interview layer added')

    const interviewTiles = board.createFromObjects('Interview')
    const interviewObj = board.getObjectLayer('Interview').objects
    const drawCardObj = board.getObjectLayer('Draw a card').objects
    //console.log below works!!
    console.log('these are two object layers', interviewObj, drawCardObj)

    //THIS CONSOLE LOGS!!

    this.overlapObjectsGroup = this.physics.add.group({})

    interviewObj.forEach(object => {
      console.log('HI THIS IS WORKING I GUESS????')
      let obj = this.overlapObjectsGroup.create(object.x, object.y, 'tile')
      obj.setOrigin(0)
      obj.body.width = object.width
      obj.body.height = object.height
    })

    // overlapObjectsGroup.refresh()

    // this.physics.add.overlap(this.doge, this.overlapObjectsGroup)

    // const drawCardLayer = board.createStaticLayer('Draw a card', tileset, 0, 0)
    // console.log('draw card layer added')

    this.doge = this.physics.add.sprite(0, 0, 'doge')
    this.doge.setOrigin(-10.5, -10)
    this.doge.setScale(0.07)

    // this.doge.setCollideWorldBounds(true) // don't go out of the map

    //dice action below!!
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

    const first = this.add.sprite(180, 200, 'dice').play('firstDiceRoll')
    const second = this.add.sprite(280, 200, 'dice').play('secondDiceRoll')

    var _anims = this.anims
    this.tweens.add({
      targets: first,
      angle: 360.0,
      duration: 50,
      repeat: -1
    })
    this.tweens.add({
      targets: second,
      angle: 360.0,
      duration: 50,
      repeat: -1
    })
    var _tweens = this.tweens
    document.addEventListener('mouseup', function() {
      if (_anims.paused) {
        _anims.resumeAll()
        _tweens.resumeAll()
      } else {
        _anims.pauseAll()
        _tweens.pauseAll()
      }
    })

    //place the face on the grid
    //this.aGrid.placeAtIndex(65.5, this.center);
  }
  update() {
    // this.overlapObjectsGroup(this.doge)
    //SPRITE ANIMATION
    let spriteMovement = {velocity: 8}

    if (this.keys.left.isDown) {
      this.doge.x -= spriteMovement.velocity
    }
    if (this.keys.right.isDown) {
      this.doge.x += spriteMovement.velocity
    }
    if (this.keys.down.isDown) {
      this.doge.y += spriteMovement.velocity
    }
    if (this.keys.up.isDown) {
      this.doge.y -= spriteMovement.velocity
    }

    this.physics.add.overlap(
      this.doge,
      this.overlapObjectsGroup,
      this.activateFunc,
      null,
      this
    )
  }
  activateFunc(player, tile) {
    console.log('inside the func')
    tile.disableBody()
    // try game logic goes here
  }
}
