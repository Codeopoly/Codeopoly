import Phaser from 'phaser'
import SceneMain from '../client/components/scene'

const config = {
  type: Phaser.AUTO,
  parent: 'theGame',
  // width: window.innerHeight * 0.85, // because the board is square (equal number of spaces on all sides)
  // height: window.innerHeight * 0.85,
  width: 768,
  height: 768,
  resizeInterval: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  },
  scene: [SceneMain]
}
export default config
