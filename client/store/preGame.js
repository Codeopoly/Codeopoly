import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {createArray} from '../../utility/preGame'
import {create} from 'react-test-renderer'

// This file might seem odd at first. Lots of thunks, only 1 action.
// That's because the only thing we want in state preGame is the Game document.

// Action Types:
const GOT_GAME = 'GOT_GAME'

// Action Creators:
const gotGame = theGame => {
  return {
    type: GOT_GAME,
    theGame
  }
}

// Thunk Creators:
// Used when a player presses JOIN GAME after selecting their character and startup name
export const createPlayerThunk = (gameCode, startupName, characterImg) => {
  return async (dispatch, getState, {getFirebase}) => {
    console.log('createPlayerThunk is running')
    try {
      // First make a player:
      console.log('if this ran, a player was made!')
      await getFirebase()
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
          hasAlgorithm: 'none'
        })
      // Here we do not dispatch an action creator;
      // I'm dispatching another thunk (trying to keep this thunk lightweight)
      dispatch(getGameThunk())
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
        .collection('codeopoly')
        .doc('1')
        .collection('game')
        .doc(gameCode)
        .get()
      if (!theGame.exists) {
        console.log('invalid game code!!!')
      } else {
        console.log('dispatching gotGame', theGame.data())
        dispatch(gotGame(theGame.data()))
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
        .collection('codeopoly')
        .doc('1')
        .collection('game')
        .add({
          completed: false,
          deckFrontend: createArray(0, 20),
          deckBackend: createArray(21, 40),
          deckUI: createArray(41, 60),
          deckMiddleware: createArray(61, 80),
          deckAlgorithm: createArray(81, 100),
          currentPlayer: null,
          host: null
        })
      // await newGameDR.get() is how you use a DocumentReference object to get the newly created document
      const newGame = await newGameDR.get()
      dispatch(gotGame(newGame.data()))
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
      return action.theGame
    default:
      return state
  }
}
