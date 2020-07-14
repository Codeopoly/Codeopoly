import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'

const Rejoin = () => {
  const [gameCode, setGameCode] = useState('0F4Tr14nuz1TeQpLFwHd')
  const [redirectNow, setRedirectNow] = useState(false)
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch()

  function handleChange(event) {
    setGameCode(event.target.value)
  }
  function handleClick(event) {
    // await dispatch(getGameThunk(gameCode))
    setClicked(true)
  }

  if (clicked) {
    useFirestoreConnect([{collection: 'games', doc: gameCode}])
    setRedirectNow(true)
  }

  // useEffect () {
  //   if ()
  //   setRedirectNow(true)
  // }

  if (redirectNow) {
    return <Redirect to="/game" />
  }

  return (
    <div className="welcome">
      <input type="text" value={gameCode} onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        Rejoin
      </button>
    </div>
  )
}

export default Rejoin
