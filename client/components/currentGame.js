import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {GameBoard, GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {EventEmitter} from 'events'
import ChallengeModal from './challengeModal'
import {phaserE} from './scene'

export const newGame = new EventEmitter()

let counter = 0
// let showModal = false

const CurrentGame = () => {
  // const [counter, setCounter] = useState(0)
  const [showModal, setShowModal] = useState(false)

  console.log('heres the counter', counter)

  const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
  if (gamesCollectionObj === undefined) {
    return <Redirect to="/rejoin" />
  }
  const gameCode = Object.keys(gamesCollectionObj)[0]
  const playerIdArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
  const [ready, setReady] = useState(false)
  const arrayOfPlayerPathsAndGame = playerIdArray.map(playerId => {
    return {
      collection: 'players',
      doc: playerId
    }
  })

  arrayOfPlayerPathsAndGame.push({
    collection: 'games',
    doc: gameCode
  })

  const players = useSelector(state => state.firestore.data.players)

  // console.log('player docs array!', players)

  if (counter < 1) {
    phaserE.on('playerLanded', () => {
      console.log('phaserE received in currentGame!')
      // setCounter(1)
      setShowModal(true)
      counter = 1
      // showModal = true
    })
  }

  const triggerEmit = () => {
    let characters = {
      'https://www.pngmart.com/files/11/Doge-Meme-PNG-Photos.png': 'doge',
      'https://img2.pngio.com/pug-head-transparent-png-clipart-free-download-ywd-pug-head-png-1260_900.png':
        'cody',
      'https://ya-webdesign.com/images250_/cat-face-png-2.png': 'cat',
      'https://i.ya-webdesign.com/images/baby-success-meme-png-2.png': 'kid',
      'https://i.ya-webdesign.com/images/kermit-the-frog-png-8.png': 'kermit',
      'https://vignette.wikia.nocookie.net/animalcrossing/images/8/80/Marshal_HHD.png/revision/latest?cb=20161013032212':
        'marshall'
    }
    let playerDocs = Object.values(players)

    const imageNameArray = playerDocs.map(player => {
      return characters[player.image]
    })

    newGame.emit('start', imageNameArray)

    document.getElementById('placeChars').classList.add('gameStarted')
  }

  useFirestoreConnect(arrayOfPlayerPathsAndGame)

  useEffect(
    () => {
      if (players) {
        if (playerIdArray.length === Object.values(players).length) {
          console.log('THEY FINALLY MATCH')
          setReady(true)
        } else {
          console.log("They don't match yettttttttttttttttt")
        }
      }
    },
    [playerIdArray, players]
  )

  // Our redux state now has:
  // state.firestore.data.games[gameCode] for the game document
  // AND
  // state.firestore.data.players[playerId] for each player document
  let centerPanel
  if (ready) {
    centerPanel = (
      <div id="gameView">
        <div className="leftside">
          <div id="player1" className="singlePlayerBox">
            <Player player={Object.values(players)[0]} />
          </div>
          {Object.values(players).length > 2 ? (
            <div id="player3" className="singlePlayerBox">
              <Player player={Object.values(players)[2]} />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div id="theGame">
          <GameBoard players={players} />
        </div>
        <div className="rightside">
          <div id="player2" className="singlePlayerBox">
            <Player player={Object.values(players)[1]} />
          </div>

          {Object.values(players).length > 3 ? (
            <div id="player4" className="singlePlayerBox">
              <Player player={Object.values(players)[3]} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
  console.log(centerPanel, 'CENTER PANEL')
  if (!players) {
    console.log(players, 'VALUE OF')
    return null
  }
  return (
    <div id="mainScreen">
      <div id="topBar">
        <GameViewTitle />
        <ChallengeModal show={showModal} />
        <button id="placeChars" type="button" onClick={triggerEmit}>
          Place players to begin game!
        </button>
      </div>
      {centerPanel}
    </div>
  )
}

export default CurrentGame
