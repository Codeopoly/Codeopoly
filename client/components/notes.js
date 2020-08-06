// import React, {useState, useEffect} from 'react'
// import {connect, useSelector} from 'react-redux'
// import {GameBoard, GameViewTitle, Player} from './index'
// import {Redirect} from 'react-router-dom'
// import {useFirestoreConnect} from 'react-redux-firebase'

// const CurrentGame = () => {
//   let playersArray
//   let gameCode
//   let players
//   let isThereState
//   let alternatePregame
//   const [firstTime, setFirstTime] = useState(true)

//   if (firstTime) {
//     isThereState = useSelector(state => state.firestore.data.games)
//     alternatePregame = useSelector(state => state.preGame)
//     console.log("is alternatePregame even a thing?", alternatePregame)
//     setFirstTime(false)
//   }

//   const [ready, setReady] = useState(false)
//   console.log("isThereState??", isThereState)

//   if (isThereState){
//     const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
//     gameCode = Object.keys(gamesCollectionObj)[0]
//     playersArray = useSelector(
//       state => state.firestore.data.games[gameCode].playersArray
//     )
//     players = useSelector(state => state.firestore.data.players)
//     // const players = useSelector((state) => state.players)

//     // let arrayOfPlayerPathsAndGame = []
//     // console.log("GameView loaded!")

//     console.log('playersArray: ', playersArray)
//     console.log('players from firestore', players)
//   } else {
//     console.log("The else is runngin!")

//       if (alternatePregame) {
//         console.log("alternate setting of playersArray")
//         playersArray = useSelector(state => state.preGame.playersArray)
//         gameCode = useSelector(state => state.preGame.gameCode)
//       }
//   }

//   if (Array.isArray(playersArray)){
//     const arrayOfPlayerPathsAndGame = playersArray.map(playerId => {
//       return {
//         collection: 'players',
//         doc: playerId
//       }
//     })
//     arrayOfPlayerPathsAndGame.push({
//       collection: 'games',
//       doc: gameCode
//     })

//     useEffect(
//       () => {
//         if (players) {
//           if (playersArray.length === Object.values(players).length) {
//             console.log('THEY FINALLY MATCH')
//             setReady(true)
//           }
//         }
//         if (gameCode.length > 0) {
//           // I want to do something with the new state I have
//         }
//       },
//       [playersArray, players]
//     )

//     console.log('arrayOfPlayerPathsAndGame: ', arrayOfPlayerPathsAndGame)
//     //console.log('PLAYERS!!!', players)
//     useFirestoreConnect(arrayOfPlayerPathsAndGame)
//   }

//   // Our redux state now has:
//   // state.firestore.data.games[gameCode] for the game document
//   // AND
//   // state.firestore.data.players[playerId] for each player document
//   let centerPanel
//   if (ready) {
//     centerPanel = (
//       <div id="gameView">
//         <div className="leftside">
//           <div id="player1" className="singlePlayerBox">
//             <Player player={Object.values(players)[0]} />
//           </div>
//           {Object.values(players).length > 2 ? (
//             <div id="player3" className="singlePlayerBox">
//               <Player player={Object.values(players)[2]} />
//             </div>
//           ) : (
//             <div />
//           )}
//         </div>
//         <div id="theGame">
//           <GameBoard />
//         </div>
//         <div className="rightside">
//           <div id="player2" className="singlePlayerBox">
//             <Player player={Object.values(players)[1]} />
//           </div>

//           {Object.values(players).length > 3 ? (
//             <div id="player4" className="singlePlayerBox">
//               <Player player={Object.values(players)[3]} />
//             </div>
//           ) : (
//             <div />
//           )}
//         </div>
//       </div>
//     )
//   }
//   console.log(centerPanel, 'CENTER PANEL')
//   if (!players) {
//     console.log(players, 'VALUE OF')
//     return null
//   }
//   return (
//     <div id="mainScreen">
//       <div id="topBar">
//         <GameViewTitle />
//       </div>
//       {centerPanel}
//     </div>
//   )
// }

// export default CurrentGame

// import React, {useState, useEffect} from 'react'
// import {connect, useSelector, useDispatch} from 'react-redux'
// import {GameBoard, GameViewTitle, Player} from './index'
// import {Redirect} from 'react-router-dom'
// import {useFirestoreConnect} from 'react-redux-firebase'
// import {getGameThunk} from '../store/preGame'

// const CurrentGame = () => {

//   // const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
//   // const gameCode = Object.keys(gamesCollectionObj)[0]
//   // const playersArray = useSelector(
//   //   state => state.firestore.data.games[gameCode].playersArray
//   // )
//   // const players = useSelector(state => state.firestore.data.players)
//   // // const players = useSelector((state) => state.players)
//   // const [ready, setReady] = useState(false)
//   // // let arrayOfPlayerPathsAndGame = []
//   // // console.log("GameView loaded!")

//   // console.log('playersArray: ', playersArray)
//   // console.log('players from firestore', players)

//   const dispatch = useDispatch()
//   const [isBeginning, setIsBeginning] = useState(true)
//   const [hasNewestPregame, setHasNewestPregame] = useState(false)
//   const [almostReady, setAlmostReady] = useState(false)
//   const [ready, setReady] = useState(false)
//   const gameCode = useSelector(state => state.preGame.gameCode)
//   let playersArray;
//   let players;

//   if (isBeginning) {
//     dispatch(getGameThunk(gameCode))
//     setIsBeginning(false)
//     setHasNewestPregame(true)
//   }

//   if (hasNewestPregame === true) {
//     playersArray = useSelector(state => state.preGame.playersArray)

//     const arrayOfPlayerPathsAndGame = playersArray.map(playerId => {
//       return {
//         collection: 'players',
//         doc: playerId
//       }
//     })
//     arrayOfPlayerPathsAndGame.push({
//       collection: 'games',
//       doc: gameCode
//     })

//     console.log('arrayOfPlayerPathsAndGame: ', arrayOfPlayerPathsAndGame)
//     //console.log('PLAYERS!!!', players)
//     useFirestoreConnect(arrayOfPlayerPathsAndGame)
//     setAlmostReady(true)
//     setHasNewestPregame("getoutoftheway")
//   }

//   if (almostReady) {
//     // players = useSelector(state => state.firestore.data.players)
//     setReady(true)
//   }

//   // useEffect(
//   //   () => {
//   //     if (players) {
//   //       if (playersArray.length === Object.values(players).length) {
//   //         console.log('THEY FINALLY MATCH')
//   //         setReady(true)
//   //       }
//   //     }
//   //   },
//   //   [playersArray, players]
//   // )

//   // Our redux state now has:
//   // state.firestore.data.games[gameCode] for the game document
//   // AND
//   // state.firestore.data.players[playerId] for each player document
//   let centerPanel
//   if (ready) {
//     centerPanel = (
//       <div id="gameView">
//         <div className="leftside">
//           <div id="player1" className="singlePlayerBox">
//             <Player player={Object.values(players)[0]} />
//           </div>
//           {Object.values(players).length > 2 ? (
//             <div id="player3" className="singlePlayerBox">
//               <Player player={Object.values(players)[2]} />
//             </div>
//           ) : (
//             <div />
//           )}
//         </div>
//         <div id="theGame">
//           <GameBoard />
//         </div>
//         <div className="rightside">
//           <div id="player2" className="singlePlayerBox">
//             <Player player={Object.values(players)[1]} />
//           </div>

//           {Object.values(players).length > 3 ? (
//             <div id="player4" className="singlePlayerBox">
//               <Player player={Object.values(players)[3]} />
//             </div>
//           ) : (
//             <div />
//           )}
//         </div>
//       </div>
//     )
//   }
//   console.log(centerPanel, 'CENTER PANEL')
//   if (!ready) {
//     console.log('not ready yet')
//     return null
//   }
//   return (
//     <div id="mainScreen">
//       <div id="topBar">
//         <GameViewTitle />
//       </div>
//       {centerPanel}
//     </div>
//   )
// }

// export default CurrentGame

///////////////////////////////////////////////////////////
//
//  CARD FLIP ANIMATION on CLICK
//
///////////////////////////////////////////////////////////
// callstackCards.forEach(card => {
//   // card.setInteractive()
//   // card.on(
//   //   'pointerdown',
//   //   function() {
//   //     // if the card is not flipping:
//   //     console.log('I clicked the card!')
//   //     if (!card.isFlipping) {
//   //       // make it flip now!
//   //       card.isFlipping = true
//   //       console.log('card scale', card.scale)
//   //       console.log('card scaleX', card.scaleX)
//   //       console.log('card scaleY', card.scaleY)
//   //       myFlipTween.play()
//   //     }
//   //     if (card.canBeDismissed) {
//   //       card.destroy()
//   //     }
//   //   },
//   //   this
//   // )
//   phaserE.on('flipCard', () => {
//     console.log('I landed on callstack!')
//     if (!card.isFlipping) {
//       // make it flip now!
//       card.isFlipping = true
//       console.log('card scale', card.scale)
//       console.log('card scaleX', card.scaleX)
//       console.log('card scaleY', card.scaleY)
//       myFlipTween.play()
//     }
//     setTimeout(5000, () => {
//       console.log('DESTROY THE CARD')
//       card.destroy()
//     })
//   })

//   const myFlipTween = this.tweens.add({
//     targets: card,
//     scaleX: 0,
//     scaleY: gameOptions.flipZoom,
//     duration: gameOptions.flipSpeed / 2,
//     paused: true,
//     onComplete: switchSprite,
//     onCompleteParams: [card]
//   })

//   function switchSprite(tween, targets, gameObject) {
//     targets[0].setFrame(1 - targets[0].frame.name)
//     backFlipTween.play()
//   }

//   const backFlipTween = this.tweens.add({
//     targets: card,
//     scaleX: 1,
//     scaleY: 1,
//     rotation: 0,
//     duration: gameOptions.flipSpeed / 2,
//     paused: true,
//     onComplete: backFlipDone
//   })

//   function switchSprite(tween, targets, gameObject) {
//     console.log('switchSprite ran!')
//     console.log('arguments:', arguments)
//     console.log('targets[0].frame', targets[0].frame)
//     targets[0].setFrame(1 - targets[0].frame.name)
//     backFlipTween.play()
//   }

//   function backFlipDone() {
//     console.log('backFlipDone ran!')
//     card.canBeDismissed = true
//   }
//   // card.on(
//   //   'pointerdown',
//   //   function() {
//   //     // if the card is not flipping:
//   //     console.log('I clicked the card!')
//   //     if (!card.isFlipping) {
//   //       // make it flip now!
//   //       card.isFlipping = true
//   //       console.log('card scale', card.scale)
//   //       console.log('card scaleX', card.scaleX)
//   //       console.log('card scaleY', card.scaleY)
//   //       myFlipTween.play()
//   //     }
//   //     if (card.canBeDismissed) {
//   //       card.destroy()
//   //       console.log('how many times??')
//   //       phaserE.emit('playerLanded', player)
//   //     }
//   //   },
//   //   this
//   // )
// })

///////////////////////////////////////////////////////////
//
//  TESTING COMPONENT THAT CAME WITH BOILERMAKER
//
///////////////////////////////////////////////////////////
//     /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {UserHome} from './user-home'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('UserHome', () => {
//   let userHome

//   beforeEach(() => {
//     userHome = shallow(<UserHome email="cody@email.com" />)
//   })

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
//   })
// })

///////////////////////////////////////////////////////////
//
//  TESTING STORE FILE THAT CAME WITH BOILERMAKER
//
///////////////////////////////////////////////////////////
// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import {me, logout} from './user'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('me', () => {
//     it('eventually dispatches the GET USER action', async () => {
//       const fakeUser = {email: 'Cody'}
//       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//       await store.dispatch(me())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER')
//       expect(actions[0].user).to.be.deep.equal(fakeUser)
//     })
//   })

//   describe('logout', () => {
//     it('logout: eventually dispatches the REMOVE_USER action', async () => {
//       mockAxios.onPost('/auth/logout').replyOnce(204)
//       await store.dispatch(logout())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('REMOVE_USER')
//       expect(history.location.pathname).to.be.equal('/login')
//     })
//   })
// })
