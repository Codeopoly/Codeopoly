import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'

const Player = props => {
  // Function that renders players' tech stack logos:
  // const renderTechImage = tech => {
  // if (tech === 'none') {
  // return <div />
  // } else {
  // return <img className={responsiveTech} src={tech} />
  // }
  // }
  console.log('props is  the  whole player doc check it out', props)

  const player = props.player
  const techs = ['Algorithm', 'Backend', 'Frontend', 'Misc', 'UI'] // Tech that player needs to earn

  useEffect(
    () => {
      console.log(
        '<--this useEffect to render player score panel ran this many times'
      )
      for (let i = 0; i < techs.length; i++) {
        // console.log(`has${techs[i]}: player[has${techs[i]}]`)
        if (player[`has${techs[i]}`] === true) {
          console.log('this is the tech that we HAVE:', techs[i])
          document.getElementById(techs[i]).classList.remove('noTech')
          techs.splice(i, 1) // If player has tech, remove from techsToEarn array
        }
      }
    },
    [player]
  ) //this updates on player change which is not happening  yet so reload page to see updated circle color

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
        <div className="scoreTechPiece circle noTech" id="Algorithm">
          {/* {renderTechImage(player.hasAlgorithm)} */}
        </div>
        <div className="scoreTechPiece circle noTech" id="Backend">
          {/* {renderTechImage(player.hasBackend)} */}
        </div>
        <div className="scoreTechPiece circle noTech" id="Frontend">
          {/* {renderTechImage(player.hasFrontend)} */}
        </div>
        <div className="scoreTechPiece circle noTech" id="Misc">
          {/* {renderTechImage(player.hasMiddleware)} */}
        </div>
        <div className="scoreTechPiece circle noTech" id="UI">
          {/* {renderTechImage(player.hasUI)} */}
        </div>
      </div>
    </div>
  )
}

export default Player
