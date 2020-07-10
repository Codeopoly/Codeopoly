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
  update() {}
}
