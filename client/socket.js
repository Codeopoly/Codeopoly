import io from 'socket.io-client'
import {newGame} from '../client/components/currentGame'

const socket = io(window.location.origin)

newGame.on('start', imageNameArray => {
  console.log('newGame sent start!')
  console.log('here it is...', imageNameArray)
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
