import io from 'socket.io-client'
import {newGame} from '../client/components/playerPanels'
import {phaserE} from './components/scene'
import {modalE} from './components/challenge'

const socket = io(window.location.origin)

// For checking the signal was sent from React
newGame.on('start', (imageNameArray, hostStatusArray, randomness) => {
  console.log('newGame sent start!')
  console.log('here it is...', imageNameArray, hostStatusArray, randomness)
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
  console.log('Sending a signal because I answered!!!!')
  socket.emit('iAnswered', result, prize)
})

socket.on('someoneAnswered', (result, prize) => {
  modalE.emit('socketSaysSomeoneAnswered', result, prize)
  console.log('I got the signal from the other person!!')
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
