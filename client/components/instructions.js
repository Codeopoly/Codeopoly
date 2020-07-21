import React from 'react'

const Instructions = props => {
  if (props.show) {
    return (
      <div className="welcome modalBox">
        <div id="title">
          <h1>[Code]opoly Instructions</h1>
        </div>
        <div id="textBox">
          <div id="text">Rule #1: Don't be an asshole</div>
          <div id="text">
            To start the game: Click the Place Players button at the top of the
            game board. Then the game will start with the host's turn.
          </div>
          <div id="text">
            On your turn: Click the dice to roll the number of spaces your
            character icon will move. Your player will move automatically, and
            when it lands you will receive a pop-up for that space.
          </div>
          <div id="text">
            How to answer challenges: Click the choice you think is the right
            answer to the question! While any player can click to answer the
            question shown, please only answer when it is your turn. There is a
            message above the game board to keep track of whose turn it is.
          </div>
          <div id="text">
            How to win: Fill up your tech stack circles by correctly answering a
            question from each category. You'll also need to save up $5000, and
            then reach or pass GO to win!
          </div>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default Instructions
