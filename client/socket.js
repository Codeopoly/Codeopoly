import io from 'socket.io-client'
import {newGame} from '../client/components/playerPanels'
import {phaserE} from './components/scene'
import {modalE} from './components/challenge'

const socket = io(window.location.origin)

// For checking the signal was sent from React
newGame.on('start', (imageNameArray, hostStatusArray) => {
  console.log('newGame sent start!')
  console.log('here it is...', imageNameArray, hostStatusArray)
})

// Hook into the event being emitted from our Phaser game:
phaserE.on('playerRolled', (die1, die2) => {
  // send a signal to our server socket:
  socket.emit('iRolled', die1, die2)
})

socket.on('someoneRolled', (die1, die2) => {
  newGame.emit('socketSaysSomeoneRolled', die1, die2)
})

modalE.on('playerAnswered', (result, prize) => {
  console.log('-------------3--------------')
  console.log(
    'I received a signal and now sending a signal because I answered!!!!'
  )
  console.log('did I get result?', result)
  console.log('what about prize?', prize)
  socket.emit('iAnswered', result, prize)
})

socket.on('someoneAnswered', (result, prize) => {
  console.log('-------------5--------------')
  console.log('I got the signal from the other person!!', result, prize)
  modalE.emit('socketSaysSomeoneAnswered', result, prize)
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
