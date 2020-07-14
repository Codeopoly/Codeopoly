import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {useFirestoreConnect} from 'react-redux-firebase'

const loading = props => {
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    console.log('redirect  is true!')
    // return <Redirect to="/game" />
  }

  function redirectNow() {
    setRedirect(true)
  }

  useFirestoreConnect([{collection: 'games', doc: props.gameCode}])

  useEffect(() => {
    setTimeout(() => {
      redirectNow()
    }, 2000)
  })

  return <p>Loading game...</p>
}

export default loading
