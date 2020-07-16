import React from 'react'
import Challenge from './challenge'

const ChallengeModal = props => {
  if (props.show) {
    return (
      <div>
        <Challenge />
      </div>
    )
  } else {
    return <div />
  }
}

export default ChallengeModal
