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
