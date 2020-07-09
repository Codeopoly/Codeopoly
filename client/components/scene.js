import AlignGrid from '../../utility/alignGrid'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }
  preload() {
    this.load.image('center', 'assets/Center.png')
    this.load.tilemapTiledJSON('board', 'assets/tilemaps/codeopoly_board.json')
  }
  create() {
    var gridConfig = {
      scene: this,
      cols: 12,
      rows: 12
    }

    this.aGrid = new AlignGrid(gridConfig, this.game)
    this.aGrid.showNumbers()

    this.center = this.add.image(
      this.game.config.width / 2, // where the center of the image is placed on the x-axis
      this.game.config.height / 2, // y-axis
      'center'
    )

    //scale the center
    this.center.displayWidth = this.game.config.width * 0.665
    this.center.scaleY = this.center.scaleX

    const board = this.make.tilemap({key: 'board'})

    //place the face on the grid
    //this.aGrid.placeAtIndex(65.5, this.center);
  }
  update() {}
}
