import React from 'react'

const Player = props => {
  const player = props.player
  console.log(props)
  return (
    <div className="singlePlayer">
      <div>
        ({player.startupName}
        {player.image}
        {player.seedMoney}
      </div>
      <div>
        {player.hasAlgorithm}
        {player.hasBackend}
        {player.hasFrontend}
        {player.hasMiddleware}
        {player.hasUI})
      </div>
    </div>
  )
}

export default Player
