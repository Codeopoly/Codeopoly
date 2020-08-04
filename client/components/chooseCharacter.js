import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createPlayerThunk} from '../store/preGame'
import {Redirect} from 'react-router-dom'

const chooseCharacter = props => {
  // React hooks! Gimme local state:
  const [startupName, setStartupName] = useState('')
  const [img, setImg] = useState('')
  const [redirectNow, setRedirectNow] = useState(false)
  const [redirectHome, setRedirectHome] = useState(false)

  const handleSubmit = () => {
    if (props.reduxGame.host === null) {
      props.createPlayer(props.reduxGame.gameCode, startupName, img, true)
      setRedirectNow(true)
    } else {
      // create a player to join a game
      //has the game already started
      if (
        props.reduxGame.isStarted === true ||
        props.reduxGame.playersArray.length === 4
      ) {
        const message = props.reduxGame.isStarted
          ? 'Game already started.Go join another game '
          : 'Game is full. We are sending you back home, so join another game.'
        alert(message)
        setRedirectHome(true)
      } else {
        //first check is there room in the game for me
        props.createPlayer(props.reduxGame.gameCode, startupName, img, false)
        setRedirectNow(true)
      }
    }
  }

  const handleImg = event => {
    // event.target.src is a giant link... maybe we just want to handle the alt text
    // console.log('event.target.alt:', event.target.alt)
    //setImg as only part of event.target.src
    let slashIdx = event.target.src.lastIndexOf('/')
    let imageName = event.target.src.slice(slashIdx + 1, -4)
    setImg(imageName)
    const chars = document.getElementsByClassName('responsive-img')
    for (let i = 0; i < chars.length; i++) {
      if (chars[i].id !== event.target.id) {
        chars[i].classList.remove('selectedChar')
        chars[i].classList.add('unselectedChar')
      } else chars[i].classList.remove('unselectedChar')
    }
    event.target.classList.add('selectedChar')
  }

  if (props.reduxGame.gameCode === null) {
    alert('Invalid Game Code')
    return <Redirect to="/" />
  }
  if (redirectNow) {
    if (props.reduxGame.host === null) {
      return <Redirect to="/create/lobby" />
    }
    return <Redirect to="/join/lobby" />
  }
  if (redirectHome) {
    return <Redirect to="/" />
  }
  return (
    <div className="welcome">
      <div id="title">
        <h1>[Code]opoly</h1>
      </div>
      <div id="inputNameBox">
        <div id="inputLabel">Name your startup:</div>
        <input
          type="text"
          value={startupName}
          placeholder="insert supercool name here"
          onChange={() => {
            setStartupName(event.target.value)
          }} //Will this work?
        />
      </div>
      <div id="characterBox">
        <div id="firstRow">
          <img
            className="responsive-img"
            id="doge"
            alt="Doge"
            onClick={handleImg}
            src="assets/doge.png"
          />
          <img
            className="responsive-img"
            id="cody"
            alt="Cody"
            onClick={handleImg}
            src="assets/cody.png"
          />
          <img
            className="responsive-img"
            id="cat"
            alt="Cat"
            onClick={handleImg}
            src="assets/cat.png"
          />
        </div>
        <div id="secondRow">
          <img
            className="responsive-img"
            id="successKid"
            alt="Success Kid"
            onClick={handleImg}
            src="assets/kid.png"
          />
          <img
            className="responsive-img"
            id="kermit"
            alt="Kermit"
            onClick={handleImg}
            src="assets/kermit.png"
          />
          <img
            className="responsive-img"
            id="marshall"
            alt="Marshall"
            onClick={handleImg}
            src="assets/marshall.png"
          />
        </div>
      </div>
      <div id="submitBtnBox">
        {props.reduxGame.host === null ? ( // Conditionally render the submit button
          <button
            type="button"
            disabled={img === '' || startupName === ''}
            onClick={handleSubmit}
          >
            CREATE GAME
          </button>
        ) : (
          <button
            type="button"
            disabled={img === '' || startupName === ''}
            onClick={handleSubmit}
          >
            JOIN GAME
          </button>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    reduxGame: state.preGame
  }
}

const mapDispatch = dispatch => {
  return {
    createPlayer(gameCode, startupName, img, isHost) {
      dispatch(createPlayerThunk(gameCode, startupName, img, isHost))
    }
  }
}

export default connect(mapState, mapDispatch)(chooseCharacter)
