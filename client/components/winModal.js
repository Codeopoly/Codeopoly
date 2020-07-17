import React from 'react'

const WinModal = props => {
  if (props.show && props.name) {
    return <div> Congrats!{props.name}</div>
  } else {
    return <div />
  }
}

export default WinModal
