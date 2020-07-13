import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch, useStore} from 'react-redux'
import {GameBoard, GameViewTitle, Player} from './index'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'

const CurrentGame = () => {
  // const testGamesCollectionObj = useSelector(state => state.firestore)
  // console.log('test data...', testGamesCollectionObj)
  let gameCode
  let playersArray
  // let players

  const test = useSelector(state => state)
  console.log('test!', test)

  //Is there an existing game on state from lobby? If not, use test game
  if (!test.firestore.data.games) {
    const testGameCode = '0F4Tr14nuz1TeQpLFwHd'
    useFirestoreConnect([{collection: 'games', doc: testGameCode}])
    console.log('current state', useStore.getState())
    playersArray = useSelector(
      state => state.firestore.data.games[testGameCode].playersArray
    )
  } else {
    const gamesCollectionObj = useSelector(state => state.firestore.data.games) // Hook into redux store
    gameCode = Object.keys(gamesCollectionObj)[0]
    playersArray = useSelector(
      state => state.firestore.data.games[gameCode].playersArray
    )
    players = useSelector(state => state.firestore.data.players)
  }

  console.log('here i am on line 35...')

  // const players = useSelector((state) => state.players)
  const [ready, setReady] = useState(false)
  // let arrayOfPlayerPathsAndGame = []
  // console.log("GameView loaded!")

  console.log('playersArray: ', playersArray)
  console.log('players from firestore', players)

  const arrayOfPlayerPathsAndGame = playersArray.map(playerId => {
    return {
      collection: 'players',
      doc: playerId
    }
  })
  arrayOfPlayerPathsAndGame.push({
    collection: 'games',
    doc: gameCode
  })

  useEffect(
    () => {
      if (players) {
        if (playersArray.length === Object.values(players).length) {
          console.log('THEY FINALLY MATCH')
          setReady(true)
        }
      }
    },
    [playersArray, players]
  )

  console.log('arrayOfPlayerPathsAndGame: ', arrayOfPlayerPathsAndGame)
  //console.log('PLAYERS!!!', players)
  useFirestoreConnect(arrayOfPlayerPathsAndGame)

  // Our redux state now has:
  // state.firestore.data.games[gameCode] for the game document
  // AND
  // state.firestore.data.players[playerId] for each player document
  let centerPanel
  if (ready) {
    centerPanel = (
      <div id="gameView">
        <div className="leftside">
          <div id="player1" className="singlePlayerBox">
            <Player player={Object.values(players)[0]} />
          </div>
          {Object.values(players).length > 2 ? (
            <div id="player3" className="singlePlayerBox">
              <Player player={Object.values(players)[2]} />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div id="theGame">
          <GameBoard />
        </div>
        <div className="rightside">
          <div id="player2" className="singlePlayerBox">
            <Player player={Object.values(players)[1]} />
          </div>

          {Object.values(players).length > 3 ? (
            <div id="player4" className="singlePlayerBox">
              <Player player={Object.values(players)[3]} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
  console.log(centerPanel, 'CENTER PANEL')
  if (!players) {
    console.log(players, 'VALUE OF')
    return null
  }
  return (
    <div id="mainScreen">
      <div id="topBar">
        <GameViewTitle />
      </div>
      {centerPanel}
    </div>
  )
}

export default CurrentGame
