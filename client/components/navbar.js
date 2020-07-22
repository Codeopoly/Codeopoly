import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {playerThunk, getAllPlayers} from '../store/testfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Instructions from './instructions'

const Navbar = () => {
  const [showIntructions, setShowInstructions] = useState(false)
  const showModal = () => {
    setShowInstructions(true)
  }
  const hideModal = () => {
    setShowInstructions(false)
  }

  return (
    <div>
      <nav>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        {showIntructions ? (
          <button type="button" onClick={hideModal}>
            Hide Instructions
          </button>
        ) : (
          <button type="button" onClick={showModal}>
            Instructions
          </button>
        )}
      </nav>
      <hr />
      <div>
        <Instructions show={showIntructions} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    handleTest() {
      dispatch(playerThunk('string'))
    },
    handleTest2() {
      dispatch(getAllPlayers('string'))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
