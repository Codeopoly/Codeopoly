import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {getFirebase} from 'react-redux-firebase'

// Action types:
const GOT_CHALLENGE = 'GOT_CHALLENGE'
const ANSWERED_CHALLENGE = 'ANSWERED_CHALLENGE'

// Action creators:
const gotChallenge = (challengeData, chosenCardId) => {
  return {
    type: GOT_CHALLENGE,
    challengeData,
    chosenCardId
  }
}
const answeredChallenge = () => {
  return {
    type: ANSWERED_CHALLENGE
  }
}

// Thunks:
// Used when client? Socket receives when Phaser emits landedOn("challenge", "category").
// chosenCardId is made on React's side, before dispatching this thunk, by picking a random index of that category's array.
// chosenCardId should be a string
export const getChallengeThunk = chosenCardId => {
  return async (dispatch, getState, {getFirebase}) => {
    try {
      const theChallenge = await getFirebase()
        .firestore()
        .collection('challenges')
        .doc(chosenCardId)
        .get()

      dispatch(gotChallenge(theChallenge.data(), chosenCardId))
    } catch (error) {
      console.log(error)
    }
  }
}
export const answeredChallengeThunk = (
  amIRight,
  prize,
  currentPlayer,
  gameCode,
  playerIdsArray,
  currentMoney
) => {
  return async (dispatch, getState, {getFirebase}) => {
    let canIHazCookie = true
    // if I am right, give me somethingggg
    // prize can be either a positive or negative number or category string
    if (amIRight) {
      // if it is a tech stack:
      if (typeof prize === 'string') {
        // i.e. "Frontend"
        canIHazCookie = false
        await getFirebase()
          .firestore()
          .collection('players')
          .doc(currentPlayer)
          .update({
            // I am updating the specific game, arrayUnion
            [`has${prize}`]: true
          })
      }
    }

    // We want to give/take money ONLY if the player did not win a tech stack
    if (typeof prize === 'number' && canIHazCookie) {
      // you didn't get a tech stack, but still get a repercussion (either win or lose money)
      if (typeof prize === 'number') {
        // i.e. -300 or 1000
        canIHazCookie = false
        await getFirebase()
          .firestore()
          .collection('players')
          .doc(currentPlayer)
          .update({
            seedMoney: currentMoney + prize
          })
      }
    }

    // Regardless of if I'm wrong or right, the game needs to update
    dispatch(turnEndedThunk(currentPlayer, gameCode, playerIdsArray))
  }
}

export const turnEndedThunk = (currentPlayer, gameCode, playerIdsArray) => {
  return async (dispatch, getState, {getFirebase}) => {
    try {
      let nextPlayerIndex =
        playerIdsArray.indexOf(currentPlayer) === playerIdsArray.length - 1 // if it's the last player in the array
          ? 0
          : // if it's not the last player in the array
            playerIdsArray.indexOf(currentPlayer) + 1

      // Then update Firestore's game:
      await getFirebase()
        .firestore()
        .collection('games')
        .doc(gameCode)
        .update({
          currentPlayer: playerIdsArray[nextPlayerIndex]
        })
      dispatch(answeredChallenge())
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer:
export default function(state = {}, action) {
  switch (action.type) {
    case GOT_CHALLENGE:
      const stateChallenge = action.challengeData
      stateChallenge.cardId = action.chosenCardId
      return stateChallenge
    case ANSWERED_CHALLENGE:
      return {}
    default:
      return state
  }
}

//CHALLENGE cycle must account account for the following circumstances:

//1 category: tech, answer: incorrect --> nothing, show winNothing div --> prize: undefined
//2 category: tech, answer: correct, hasTech: false --> get tech, show winTech div --> prize: category (str)
//3 category: tech, answer: correct, hasTech: true --> get money, show winMoney div --> prize: 1000 (hardcoded)
//4 category: interview, answer: correct --> get money, show winMoney div --> prize: 1000 (hardcoded)
//5 category: interview, answer: incorrect --> lose money, loseInterviewMoney div --> -3000 (hardcoded)
