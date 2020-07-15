import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {getFirebase} from 'react-redux-firebase'

// Action types:
const GOT_CHALLENGE = 'GOT_CHALLENGE'

// Action creators:
const gotChallenge = (challengeData, chosenCardId) => {
  return {
    type: GOT_CHALLENGE,
    challengeData,
    chosenCardId
  }
}

// Thunks:
// Used when client? Socket receives when Phaser emits landedOn("challenge", "category").
// chosenCardId is made on React's side, before dispatching this thunk, by picking a random index of that category's array.
// chosenCardId should be a string
export const getChallengeThunk = chosenCardId => {
  return async (dispatch, getState, {getFirebase}) => {
    console.log('getChallengeThunk is running')

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

// Reducer:
export default function(state = {}, action) {
  switch (action.type) {
    case GOT_CHALLENGE:
      const stateChallenge = action.challengeData
      stateChallenge.cardId = action.chosenCardId
      return stateChallenge
    default:
      return state
  }
}
