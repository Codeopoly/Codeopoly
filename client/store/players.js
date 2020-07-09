import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {getFirebase} from 'react-redux-firebase'

// Action types:
const GOT_PLAYERS = 'GOT_PLAYERS'

// Action creators:
const gotPlayers = wholePlayers => {
  return {
    type: GOT_PLAYERS,
    wholePlayers
  }
}

// Thunks:
// Used when in the lobby and a player joins.
export const getPlayersThunk = playersArray => {
  return async (dispatch, getState, {getFirebase}) => {
    console.log('getPlayersThunk is running')
    if (playersArray.length == 0) {
      return
    }

    try {
      const queryResult = await getFirebase()
        .firestore()
        .collection('players')
        .where(firebase.firestore.FieldPath.documentId(), 'in', playersArray)
        .get()

      const playerDocArray = queryResult.docs
      const array = playerDocArray.map((playerDoc, index) => {
        const playerData = playerDoc.data()
        return {
          name: playerData.startupName,
          avatar: playerData.image,
          isHost: playerData.isHost
        }
      })

      dispatch(gotPlayers(array))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer:
export default function(state = [], action) {
  switch (action.type) {
    case GOT_PLAYERS:
      return action.wholePlayers
    default:
      return state
  }
}
