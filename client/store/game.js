import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const db = firebase.firestore

//Action types:
const GOT_GAME_SNAPSHOT = 'GOT_GAME_SNAPSHOT'

//Action creators:
const gotGameSnapshot = game => {
  console.log('in action creator')
  return {
    type: GOT_GAME_SNAPSHOT,
    game
  }
}

//Thunk creators:
export const getGameSnapshot = gameid =>
  // console.log('hi')
  async dispatch => {
    // try {
    console.log('I AM INSIDE THE THUNK!!!')
    // db.collection('games').doc(gameId).onSnapshot(snapshot => {
    //     console.log('snapshot!!!!!!!!!!!!!!!!!!!!!!!!', snapshot)
    // dispatch(gotGameSnapshot('abc'))
    // })
    // } catch (error) {
    //     console.log(error)
    // }
  }

//Reducer:
const initialState = {game: ''}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_GAME_SNAPSHOT:
      return {...state, game: action.game}
    default:
      return state
  }
}
