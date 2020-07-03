// import {getFirestore} from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// import {getFirebase} from 'react-redux-firebase'

const CREATE_PLAYER = 'CREATE_PLAYER'

export const playerActionCreator = data => {
  return {
    type: CREATE_PLAYER,
    data
  }
}

export const playerThunk = data => {
  return async (dispatch, getState, {getFirebase}) => {
    console.log('hello!')
    // console.log('this is firestore', getFirestore)
    // console.log('this is firebase!!!', getFirebase)
    // console.log('this is firebase invoked!!!', getFirebase())
    // const fireStore = getFirebase().fireStore()
    // console.log('hello i am in the player thunk!!!!!')
    try {
      console.log('try block executed')
      await getFirebase()
        .firestore()
        .collection('players')
        .add({
          startupName: 'Kitty',
          hasUI: 'none',
          hasFrontend: 'none',
          hasBackend: 'none',
          hasAlgorithm: 'none',
          hasMiddleware: 'none',
          seedMoney: 50,
          location: 1,
          game_id: 1,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwKVFwjXGAiso3ijDjk6RYWqZZVstt4FSB5w&usqp=CAU'
        })
    } catch (error) {
      console.error(error)
    }

    const hopeThisWorks = async function() {
      try {
        console.log('try block executed')
        const players = await getFirebase()
          .firestore()
          .collection('players')
          .onSnapshot(function(collection) {
            if (collection && collection.exists) {
              const myData = collection.data()
              console.log('this is my data!!!!', myData)
            }
          })
        players()
      } catch (error) {
        console.error(error)
      }
    }

    hopeThisWorks()

    dispatch(playerActionCreator(data))
  }
}
