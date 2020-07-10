import React from 'react'

const Player = props => {
  // Function that renders players' tech stack logos:
  const renderTechImage = tech => {
    if (tech === 'none') {
      return <div />
    } else {
      return <img className={responsiveTech} src={tech} />
    }
  }

  const player = props.player
  console.log('player component props', props)
  return (
    <div className="singlePlayer">
      <div id="scoreIcon">
        <img src={player.image} />
      </div>
      <div id="scoreBarsBox">
        <div id="scoreName" className="scoreBar">
          {player.startupName}
        </div>
        <div id="scoreMoney" className="scoreBar">
          {player.seedMoney}
        </div>
      </div>
      <div id="scoreTech">
        <div className="scoreTechPiece circle" id="algorithm">
          {renderTechImage(player.hasAlgorithm)}
        </div>
        <div className="scoreTechPiece circle" id="backend">
          {renderTechImage(player.hasBackend)}
        </div>
        <div className="scoreTechPiece circle" id="frontend">
          {renderTechImage(player.hasFrontend)}
        </div>
        <div className="scoreTechPiece circle" id="misc">
          {renderTechImage(player.hasMiddleware)}
        </div>
        <div className="scoreTechPiece circle" id="ui">
          {renderTechImage(player.hasUI)}
        </div>
      </div>
    </div>
  )
}

export default Player
