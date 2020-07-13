import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getGameThunk, createGameThunk} from '../store/preGame'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
// import welcome from '../../public/assets/welcome.png'

const HomePage = props => {
  // React hooks! This functional component now has local state.
  const [gameCode, setGameCode] = useState('')
  const [redirectNow, setRedirectNow] = useState(false)
  const [testRedirect, setTestRedirect] = useState(false)
  if (redirectNow) {
    return <Redirect to="/create" />
  }
  if (testRedirect) {
    // useFirestoreConnect([{collection: 'games', doc: '1DwGlcbpmVnRHl0opkgK'}])
    return <Redirect to="/game" />
  }

  const handleJoin = () => {
    console.log('handleJoin ran')
    console.log('this is the game code being sent:', gameCode)
    props.joinGame(gameCode)
    setRedirectNow(true)
  }
  const handleCreate = () => {
    console.log('handleCreate ran')
    props.createGame()
    setRedirectNow(true)
  }
  const handleChange = event => {
    setGameCode(event.target.value)
    // console.log('game code on state:', gameCode)
  }

  const handleTest = () => {
    console.log('in handleTest')
    setTestRedirect(true)
  }

  return (
    <div className="welcome">
      <div id="title">
        {/* <img src={welcome} /> */}
        <h1>[Code]opoly</h1>
      </div>
      <div id="textBox">
        <div id="text">
          Learn about the JavaScript stack! [Code]opoly looks like Monopoly, but
          the win condition is totally different. Your goal is to build your
          tech stack (think buying properties), earn seed money to fund your
          startup, and reach GO to launch your company! Building your tech stack
          isn’t easy; you’ll have to demonstrate your knowledge by answering
          multiple choice questions, but beware of the miscellaneous hazards of
          startup life! Oh, and don't get stuck on any bugs!
        </div>
      </div>
      <div id="buttonArea">
        <div id="buttonBox1">
          <button type="button" onClick={handleJoin} disabled={gameCode === ''}>
            Join Game
          </button>
          <input
            type="text"
            value={gameCode}
            placeholder="game code"
            onChange={handleChange}
          />
        </div>
        <div id="buttonBox2">
          <button type="button" onClick={handleCreate}>
            Create New Game
          </button>
        </div>
        <div id="testBox">
          <button type="button" onClick={handleTest}>
            Test
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    joinGame: gameCode => {
      dispatch(getGameThunk(gameCode))
    },
    createGame: () => {
      dispatch(createGameThunk())
    }
  }
}

export default connect(null, mapDispatch)(HomePage)
