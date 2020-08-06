/* eslint-disable max-statements */
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {EventEmitter} from 'events'
import ChallengeModal from './challengeModal'
import WinModal from './winModal'
import {phaserE} from './scene'
import {modalE} from './challenge'
import StuckOnABug from './stuckonabug'
import {getChallengeThunk, turnEndedThunk} from '../store/challenge'

export const newGame = new EventEmitter()

let counter = 0

// Although Firestore updates whenever the gameDoc changes, the useSelector variables do not refresh...
// so we set these deck variables in a useEffect hook that runs whenever gameDoc changes.
let deckFrontend
let deckBackend
let deckUI
let deckAlgorithm
let deckMisc
let deckInterview
let areDecksAssigned = false

// eslint-disable-next-line max-statements
// eslint-disable-next-line complexity
const PlayerPanels = () => {
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [showWinModal, setShowWinModal] = useState(false)
  const [winnerName, setWinnerName] = useState('')
  const [ready, setReady] = useState(false)
  const [showStuckOnBugModal, setStuckOnBugModal] = useState(false)
  const dispatch = useDispatch()

  const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
  if (gamesCollectionObj === undefined) {
    return <Redirect to="/rejoin" />
  }
  const gameCode = Object.keys(gamesCollectionObj)[0]
  const gameDoc = useSelector(state => state.firestore.data.games[gameCode])
  const players = useSelector(state => state.firestore.data.players)
  const playerIdArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
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

  // Function used when player clicks "Place Players" to start game:
  const triggerEmit = () => {
    let playerDocs = Object.values(players)
    const imageNameArray = playerDocs.map(player => {
      return player.image
    })
    const hostStatusArray = playerDocs.map(player => {
      return player.isHost
    })
    newGame.emit('start', imageNameArray, hostStatusArray) // Phaser catches this signal and renders the characters in use
    document.getElementById('placeChars').classList.add('gameStarted') // Edit CSS to remove the button and add the turn text.
    const title = document.getElementById('gameViewTitle')
    title.classList.remove('gameStarted')
  }

  // Get currentPlayer name:
  let currentPlayerId
  let currentPlayerName
  if (
    gamesCollectionObj !== undefined &&
    gameCode !== undefined &&
    players !== undefined
  ) {
    currentPlayerId = gameDoc.currentPlayer
    currentPlayerName = players[currentPlayerId].startupName
  }

  // Handle receiving signal from Phaser:
  phaserE.setMaxListeners(1)
  if (counter < 1) {
    phaserE.on('playerLanded', (tileType, category = null, cardName = null) => {
      if (tileType === 'challenge' && areDecksAssigned) {
        let cardId
        switch (category) {
          case 'Frontend':
            cardId = deckFrontend[0]
            break
          case 'Backend':
            cardId = deckBackend[0]
            break
          case 'UI':
            cardId = deckUI[0]
            break
          case 'Algorithm':
            cardId = deckAlgorithm[0]
            break
          case 'Misc':
            cardId = deckMisc[0]
            break
          case 'Interview':
            cardId = deckInterview[0]
            break
          default:
            cardId = null
            break
        }

        dispatch(getChallengeThunk(cardId)) // Get the challenge and put it in Redux state
        setShowChallengeModal(true) // Render the Challenge Modal, which uses the challenge Redux state
        counter = 1
      } else if (category !== 'bug') {
        //coffee break //steal tech //call stack // bug spaces //new investor //lose money
        // currentPlayerId = gameDoc.currentPlayer
        // For some reason, currentPlayerId is always host...?
        dispatch(
          turnEndedThunk(
            currentPlayerId,
            gameCode,
            playerIdArray,
            null, // no prize for now
            '300' // nonexistant challenge Id for now
          )
        )
      }
    })
    phaserE.on('playerOnBug', player => {
      console.log('player on a bug', player)
      setStuckOnBugModal(true)
      setTimeout(() => {
        setStuckOnBugModal(false)
      }, 3000)
    })
  }

  // Handle the closing of the modal:
  modalE.setMaxListeners(4)
  modalE.on('modalGoAway', () => {
    setShowChallengeModal(false)
  })

  // Handle signal from Phaser when player passes GO:
  phaserE.on('playerPassedGo', () => {
    if (players !== undefined && gamesCollectionObj !== undefined) {
      let meetsWinConditions = false
      let decks = [
        'hasFrontend',
        'hasBackend',
        'hasUI',
        'hasAlgorithm',
        'hasMisc'
      ]
      if (players[currentPlayerId].seedMoney > 3000) {
        for (let i = 0; i < decks.length; i++) {
          if (players[currentPlayerId][decks[i]] === 'none') break
          if (i === decks.length - 1) {
            meetsWinConditions = true
          }
        }
      }
      if (meetsWinConditions) {
        setWinnerName(players[currentPlayerId].startupName)
        setShowWinModal(true)
      }
    }
  })

  // Updates the state.firestore whenever a change happens in any player document or the game document:
  useFirestoreConnect(arrayOfPlayerPathsAndGame)
  // Our redux state now has:
  // state.firestore.data.games[gameCode] for the game document
  // AND
  // state.firestore.data.players[playerId] for each player document

  // Makes sure we only render player panels when we've loaded all player data:
  useEffect(
    () => {
      if (players) {
        if (playerIdArray.length === Object.values(players).length) {
          setReady(true)
        }
      }
    },
    [playerIdArray, players]
  )

  // Keep the game up-to-date with the database changes to the decks:
  useEffect(
    () => {
      console.log('gameDoc changed!', gameDoc)
      areDecksAssigned = true
      deckFrontend = gameDoc.deckFrontend
      deckBackend = gameDoc.deckBackend
      deckAlgorithm = gameDoc.deckAlgorithm
      deckUI = gameDoc.deckUI
      deckMisc = gameDoc.deckMisc
      deckInterview = gameDoc.deckInterview
      currentPlayerId = gameDoc.currentPlayer
      if (players) {
        currentPlayerName = players[currentPlayerId].startupName
      }
    },
    [gameDoc]
  )

  let reactGamePanels
  if (ready) {
    reactGamePanels = (
      <div id="gameView">
        <div id="aboveGameBar">
          <div id="gameViewTitle" className="gameStarted">
            <GameViewTitle currentPlayerName={currentPlayerName} />
          </div>
          <button id="placeChars" type="button" onClick={triggerEmit}>
            Place players to begin game!
          </button>
        </div>
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
            <ChallengeModal show={showChallengeModal} />
            <WinModal show={showWinModal} name={winnerName} />
            <StuckOnABug show={showStuckOnBugModal} />
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

  // Our return/render statements:
  if (!players) {
    return null
  }
  return <div id="mainScreen">{reactGamePanels}</div>
}

export default PlayerPanels
