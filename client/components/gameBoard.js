import Phaser from 'phaser'
import React, {useEffect} from 'react'
import config from '../../config/gameConfig'
import {EventEmitter} from 'events'

const GameBoard = props => {
  console.log('props in gameBoard', props)

  let characters = {
    'https://www.pngmart.com/files/11/Doge-Meme-PNG-Photos.png':
      'Doge-Meme.png',
    'https://img2.pngio.com/pug-head-transparent-png-clipart-free-download-ywd-pug-head-png-1260_900.png':
      'cody.png',
    'https://ya-webdesign.com/images250_/cat-face-png-2.png': 'grumpy-cat.png',
    'https://i.ya-webdesign.com/images/baby-success-meme-png-2.png': 'kid.png',
    'https://i.ya-webdesign.com/images/kermit-the-frog-png-8.png': 'kermit.png',
    'https://vignette.wikia.nocookie.net/animalcrossing/images/8/80/Marshal_HHD.png/revision/latest?cb=20161013032212':
      'marshall.png'
  }

  let game

  const newGame = new EventEmitter()

  let playerDocs = Object.values(props.players)

  const imageNameArray = playerDocs.map(player => {
    return characters[player.image]
  })

  useEffect(() => {
    console.log('useEffect ran!')
    console.log('Window.innerWidth inside game.js', window.innerWidth)
    if (document.getElementById('theGame')) {
      console.log(document.getElementById('theGame'))
      game = new Phaser.Game(config) // game creation after componentDidMount (hook-style)
    }
    return function cleanup() {
      console.log('cleanup ran!', game) // acts as componentWillUnmount
      game.destroy(true)
    }
  })

  useEffect(() => {
    if (game) {
      newGame.emit('start', imageNameArray)
    }
  }, [])

  return <div id="insideTheGame" />
}

export default GameBoard
