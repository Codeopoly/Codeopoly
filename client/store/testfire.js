// import {getFirestore} from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// import {getFirebase} from 'react-redux-firebase'

const CREATE_PLAYER = 'CREATE_PLAYER'
const GET_PLAYERS = 'GET_PLAYERS'

export const playerActionCreator = data => {
  return {
    type: CREATE_PLAYER,
    data
  }
}
export const getAllPlayerActionCreator = data => {
  return {
    type: GET_PLAYERS,
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
      const allPlayers = await getFirebase()
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
      console.log('i am allPlayers', allPlayers)
      dispatch(playerActionCreator(allPlayers))
    } catch (error) {
      console.error(error)
    }
  }
}
export const getAllPlayers = data => {
  return async (dispatch, getState, {getFirebase}) => {
    try {
      console.log('try block executed')
      const players = await getFirebase()
        .firestore()
        .collection('players')
        .doc('4gXgvHJUskeay9D3AhjN')
      console.log('this is players!!!', players)
      const player = await players.get()
      if (!player.exists) {
        console.log('no such document!!!')
      }
      console.log('Document data:', player.data())
      // players()

      dispatch(getAllPlayerActionCreator(players))
    } catch (error) {
      console.log(error)
    }
  }

  // const hopeThisWorks = async function () {
  //   try {
  //     console.log('try block executed')
  //     const players = await getFirebase()
  //       .firestore()
  //       .collection('players')
  //       .onSnapshot(function (collection) {
  //         if (collection && collection.exists) {
  //           const myData = collection.data()
  //           console.log('this is my data!!!!', myData)
  //         }
  //       })
  //     players()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // hopeThisWorks()
}
