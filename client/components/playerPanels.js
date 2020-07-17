import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {GameBoard, GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {EventEmitter} from 'events'
import ChallengeModal from './challengeModal'
import {phaserE} from './scene'
import {modalE} from './challenge'
import {getChallengeThunk} from '../store/challenge'

export const newGame = new EventEmitter()

let counter = 0
// let showModal = false

const PlayerPanels = () => {
  // const [counter, setCounter] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  // const [showTurn, setShowTurn] = useState(false)

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
    phaserE.on('playerLanded', (tileType, category = null, cardName = null) => {
      console.log('phaserE received in playerPanels!')
      // setCounter(1)
      if (tileType === 'challenge') {
        console.log("what's the category?", category)
        let deckName
        switch (category) {
          case 'frontend':
            console.log('The case was activated!!!!!!')
            deckName = 'deckFrontend'
            break
          case 'backend':
            deckName = 'deckBackend'
            break
          case 'ui':
            deckName = 'deckUI'
            break
          case 'algorithm':
            deckName = 'deckAlgorithm'
            break
          case 'misc':
            deckName = 'deckMisc'
            break
          case 'interview':
            deckName = 'deckInterview'
            break
          default:
            console.log('The DEFAULT was activated---------------')
            deckName = null
            break
        }

        let neededDeckArr = gamesCollectionObj[gameCode][deckName] // should be an array of cards still avaiable to draw for that category
        console.log('neededdDeckArr???????', neededDeckArr)
        let cardId = neededDeckArr[0]
        dispatch(getChallengeThunk(cardId))
        setShowModal(true)
        counter = 1
      }
    })
  }
  // Now handle the closing of the modal!
  modalE.setMaxListeners(4)
  modalE.on('modalGoAway', () => {
    setShowModal(false)
  })

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
    const hostStatusArray = playerDocs.map(player => {
      return player.isHost
    })

    newGame.emit(
      'start',
      imageNameArray,
      hostStatusArray,
      gamesCollectionObj[gameCode].randomness
    )

    document.getElementById('placeChars').classList.add('gameStarted')
    const title = document.getElementById('gameViewTitle')
    // title.classList.add('gameStarted')
    title.classList.remove('gameStarted')

    // showTurn = true
    // console.log('heres showTurn', showTurn)
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
        <button id="placeChars" type="button" onClick={triggerEmit}>
          Place players to begin game!
        </button>
        <div id="panelsBox">
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
          <div id="theGameBox">
            <ChallengeModal show={showModal} />
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
      </div>
    )
  }
  console.log(centerPanel, 'CENTER PANEL')
  if (!players) {
    console.log(players, 'VALUE OF')
    return null
  }
  return <div id="mainScreen">{centerPanel}</div>
}

export default PlayerPanels
