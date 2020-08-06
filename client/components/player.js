import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'

const Player = props => {
  const player = props.player
  const techs = ['Algorithm', 'Backend', 'Frontend', 'Misc', 'UI'] // Tech that player needs to earn

  useEffect(
    () => {
      for (let i = 0; i < techs.length; i++) {
        // console.log(`has${techs[i]}: player[has${techs[i]}]`)
        if (player[`has${techs[i]}`] === true) {
          // console.log('------------LOOPING THROUGH PLAYER TECHS-----------')
          // // console.log('this is the tech that we HAVE:', techs[i])
          // console.log(
          //   'this is the player.startupName and techs[i]:',
          //   player.startupName,
          //   techs[i]
          // )
          document
            .getElementById(`${player.startupName}${techs[i]}`)
            .classList.remove('noTech')
          techs.splice(i, 1) // If player has tech, remove from techsToEarn array
        }
      }
    },
    [player]
  ) //this updates on player change which is not happening yet so reload page to see updated circle color

  return (
    <div className="singlePlayer">
      <div id="scoreIcon">
        <img src={`assets/${player.image}.png`} />
      </div>
      <div id="scoreBarsBox">
        <div id="scoreName" className="scoreBar">
          {player.startupName}
        </div>
        <div id="scoreMoney" className="scoreBar">
          ${player.seedMoney}
        </div>
      </div>
      <div id="scoreTech">
        <div
          className="scoreTechPiece circle noTech algorithm"
          id={`${player.startupName}Algorithm`}
        />
        <div
          className="scoreTechPiece circle noTech backend"
          id={`${player.startupName}Backend`}
        />
        <div
          className="scoreTechPiece circle noTech frontend"
          id={`${player.startupName}Frontend`}
        />
        <div
          className="scoreTechPiece circle noTech misc"
          id={`${player.startupName}Misc`}
        />
        <div
          className="scoreTechPiece circle noTech UI"
          id={`${player.startupName}UI`}
        />
      </div>
    </div>
  )
}

export default Player
