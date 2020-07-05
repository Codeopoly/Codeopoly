import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const waitForPlayers = props => {
  return (
    <div className="welcome">
      <div id="title">
        <h1>[Code]opoly</h1>
      </div>
    </div>
  )
}

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect(mapState, mapDispatch)(waitForPlayers)
