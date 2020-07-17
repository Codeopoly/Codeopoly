import io from 'socket.io-client'
import {newGame} from '../client/components/playerPanels'
import {phaserE} from './components/scene'

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

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
