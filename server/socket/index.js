module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('start', () => {
      console.log('start heard in socket!!')
    })
    // On Phaser signalling a player has landed on a tile:
    // phaser.on('playerLanded', (tileType, category, cardName) => {
    //   console.log("Socket received Phaser signal!")
    //   socket.broadcast.emit('challengeTime', category);
    // })

    // On disconnect:
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
