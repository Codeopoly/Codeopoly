import React from 'react'

const WinModal = props => {
  console.log('winModal ran!')
  if (props.show && props.name) {
    console.log('winModal is showing win screen')
    return (
      <div className="modalBox" id="winModal">
        <h1>{props.name} wins the game!</h1>
        <h3>Grace Hopper would be proud!</h3>
        <div>
          <img className="responsive-img-win-modal" src="https://media0.giphy.com/media/Qy1wtGkWv8neACuNVN/giphy.gif" alt="Grace Hopper Gif"/>
        </div>
      </div>
    )
  } else {
    console.log('winModal is showing empty  div', props.show, props.name)
    return <div />
  }
}

export default WinModal
