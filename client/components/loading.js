import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'
import {useSelector} from 'react-redux'

const Loading = () => {
  const preGame = useSelector(state => state.preGame)
  const [redirect, setRedirect] = useState(false)

  useFirestoreConnect([{collection: 'games', doc: preGame.gameCode}])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    setTimeout(() => {
      setRedirect(true)
    }, 500)

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  if (redirect) {
    console.log('redirect is true!')
    return <Redirect to="/game" />
  }

  return <p />
}

export default Loading
