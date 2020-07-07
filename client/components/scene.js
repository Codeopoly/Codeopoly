import AlignGrid from '../../utility/alignGrid'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain')
  }
  preload() {
    // this.load.image("face", "images/face.png");
    this.load.image('logo', 'assets/logo.png')
    this.load.image('center', 'assets/Center.png')
  }
  create() {
    var gridConfig = {
      scene: this,
      cols: 12,
      rows: 12
    }

    this.aGrid = new AlignGrid(gridConfig, this.game)
    this.aGrid.showNumbers()
    //
    //
    // this.logo = this.add.image(2, 2, "logo");
    this.center = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'center'
    )
    //   this.aGrid.placeAt(0,0,this.logo);
    //scale the face
    // this.logo.displayWidth = this.game.config.width * 0.2;
    this.center.displayWidth = this.game.config.width * 0.665
    // this.logo.scaleY = this.logo.scaleX;
    this.center.scaleY = this.center.scaleX
    //place the face on the grid
    //this.aGrid.placeAtIndex(65.5, this.center);
  }
  update() {}
}
