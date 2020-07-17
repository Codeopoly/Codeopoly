import React from 'react'

const WinModal = props => {
  console.log('winModal ran!')
  if (props.show && props.name) {
    console.log('winModal is showing win screen')
    return (
      <div className="modalBox">
        {' '}
        <h1>{props.name} wins the game!</h1>
      </div>
    )
  } else {
    console.log('winModal is showing empty  div', props.show, props.name)
    return <div />
  }
}
export default WinModal
