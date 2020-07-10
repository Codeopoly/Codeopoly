import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {playerThunk, getAllPlayers} from '../store/testfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const Navbar = ({handleClick, isLoggedIn, handleTest, handleTest2}) => (
  <div>
    <nav>
      <Link to="/">
        <button type="button">Play</button>
      </Link>
      <Link to="/instructions">
        <button type="button">Instructions</button>
      </Link>
    </nav>
    <hr />
  </div>
)

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
