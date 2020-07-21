import React from 'react'
import * as img from '../../public/assets/graceHopper.gif'

const WinModal = props => {
  console.log('winModal ran!')
  if (props.show && props.name) {
    console.log('winModal is showing win screen')
    return (
      <div className="modalBox" id="winModal">
        <h1>{props.name} wins the game!</h1>
        <h3>Grace Hopper would be proud!</h3>
        <div>
          <img
            className="responsive-img-win-modal"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg"
          />
        </div>
        {/* {typeof img === "string" ? 
        <img src={img} alt="Startup Gif happy people coding" />
        : <img src={require('../../public/assets/teacher.jpg')} />} */}
      </div>
    )
  } else {
    console.log('winModal is showing empty  div', props.show, props.name)
    return <div />
  }
}

export default WinModal
