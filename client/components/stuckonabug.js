import React, {useState, useEffect} from 'react'

const StuckOnABug = props => {
  if (props.show) {
    return (
      <div className="modalBox">
        <div> STUCK ON A BUG! LOSE YOUR NEXT TURN</div>
      </div>
    )
  } else return <div />
}

export default StuckOnABug
