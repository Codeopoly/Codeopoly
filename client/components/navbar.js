import React, {useState} from 'react'
import {Link} from 'react-router-dom'
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

export default Navbar
