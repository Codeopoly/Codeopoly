import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {createArray} from '../../utility/preGame'
import {create} from 'react-test-renderer'

// This file might seem odd at first. Lots of thunks, only 1 action.
// That's because the only thing we want in state preGame is the Game document.

// Action Types:
const GOT_GAME = 'GOT_GAME'
const START_GAME = 'START_GAME'

// Action Creators:
const gotGame = (theGame, gameCode) => {
  return {
    type: GOT_GAME,
    theGame,
    gameCode
  }
}
const startGame = () => {
  return {
    type: START_GAME
  }
}

// Thunk Creators:
// Used when a player presses JOIN GAME after selecting their character and startup name
export const createPlayerThunk = (
  gameCode,
  startupName,
  characterImg,
  isHost
) => {
  return async (dispatch, getState, {getFirebase}) => {
    console.log('createPlayerThunk is running')
    try {
      // First make a player:
      console.log('if this ran, a player was made!')
      const newPlayerDR = await getFirebase()
        .firestore()
        .collection('players')
        .add({
          startupName: startupName,
          image: characterImg,
          game_id: gameCode,
          seedMoney: 500,
          location: 1,
          hasFrontend: 'none',
          hasBackend: 'none',
          hasUI: 'none',
          hasMiddleware: 'none',
          hasAlgorithm: 'none',
          isHost: isHost
        })
      console.log('newPlayerId:', newPlayerDR.id)

      // Coolio, we made a new player, but we want to add the reference to the game.
      if (isHost) {
        await getFirebase()
          .firestore()
          .collection('games')
          .doc(gameCode)
          .update({
            host: newPlayerDR.id
          })
      }
      // Let's add the player reference to the players array
      await getFirebase()
        .firestore()
        .collection('games')
        .doc(gameCode)
        .update({
          // I am updating the specific game, arrayUnion
          playersArray: firebase.firestore.FieldValue.arrayUnion(newPlayerDR.id)
        })

      // Here we do not dispatch an action creator;
      // I'm dispatching another thunk (trying to keep this thunk lightweight)
      dispatch(getGameThunk(gameCode)) // This might not be needed anymore
    } catch (error) {
      console.log(error)
    }
  }
}

// Used when a player presses JOIN GAME from the home screen AND at player creation screen
export const getGameThunk = gameCode => {
  return async (dispatch, getState, {getFirebase}) => {
    // Grab the game, now containing the newly created player
    try {
      console.log('if this ran, a game was read from Firestore!')
      const theGame = await getFirebase()
        .firestore()
        .collection('games')
        .doc(gameCode)
        .get()
      if (!theGame.exists) {
        console.log('invalid game code!!!')
      } else {
        console.log('dispatching gotGame', theGame.data())
        dispatch(gotGame(theGame.data(), gameCode))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// Used when the CREATE GAME button is clicked.
export const createGameThunk = () => {
  return async (dispatch, getState, {getFirebase}) => {
    try {
      console.log('createGameThunk try block')
      // .add() returns a DocumentReference object
      const newGameDR = await getFirebase()
        .firestore()
        .collection('games')
        .add({
          isStarted: false,
          completed: false,
          deckFrontend: createArray(0, 20),
          deckBackend: createArray(21, 40),
          deckUI: createArray(41, 60),
          deckMiddleware: createArray(61, 80),
          deckAlgorithm: createArray(81, 100),
          currentPlayer: null,
          host: null,
          playersArray: [], // Host is in here too
          availableCharacters: {
            doge: true,
            cody: true,
            cat: true,
            successKid: true,
            kermit: true,
            marshall: true
          }
        })
      // await newGameDR.get() is how you use a DocumentReference object to get the newly created document
      const newGame = await newGameDR.get()
      dispatch(gotGame(newGame.data(), newGameDR.id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const startGameThunk = gameCode => {
  return async (dispatch, getState, {getFirebase}) => {
    try {
      // Let's add the player reference to the players array
      await getFirebase()
        .firestore()
        .collection('games')
        .doc(gameCode)
        .update({
          // I am updating the specific game, arrayUnion
          isStarted: true
        })
      dispatch(startGame())
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer:
export default function(state = {}, action) {
  console.log('the reducer is being accessed!')
  switch (action.type) {
    case GOT_GAME:
      console.log('theGame inside the reducer', action.theGame)
      const newState = action.theGame
      // Since theGame document doesn't come with its id (go figure), add a property to hold its id:
      newState.gameCode = action.gameCode
      return newState
    case START_GAME:
      return {isStarted: true} // might need to return old state?
    default:
      return state
  }
}
