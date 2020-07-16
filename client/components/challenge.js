import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {answeredChallengeThunk} from '../store/challenge'

const Challenge = () => {
  const [result, setResult] = useState(null) // we'll set it to a string ("right" or "wrong" after they answer)
  const [resultDiv, setResultDiv] = useState(null)
  const challenge = useSelector(state => state.challenge)
  const gameObject = useSelector(state => state.firestore.data.games)
  const gameCode = Object.keys(gameObject)[0]
  const currentPlayer = gameObject[gameCode].currentPlayer
  const playersObject = useSelector(state => state.firestore.data.players)
  const playerIdsArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
  console.log('did we get a challenge from the database???:', challenge)
  console.log('what is resultDiv?', resultDiv)

  const createAnswerDiv = () => {
    console.log('createAnswerDiv function was called!')
    let divArray = [
      <div className="form-radio" key="a">
        <button
          type="button"
          name="answerChoices"
          value="answer"
          className="answerButton"
          onClick={handleClick}
        >
          {challenge.answer}
        </button>
      </div>,

      <div className="form-radio" key="b">
        <button
          type="button"
          name="answerChoices"
          value="wrongA"
          className="answerButton"
          onClick={handleClick}
        >
          {challenge.wrongA}
        </button>
      </div>,

      <div className="form-radio" key="c">
        <button
          type="button"
          name="answerChoices"
          value="wrongB"
          className="answerButton"
          onClick={handleClick}
        >
          {challenge.wrongB}
        </button>
      </div>
    ]

    return (
      <div className="answerChoices">
        {divArray.splice(Math.floor(Math.random() * 3), 1)}
        {divArray.splice(Math.floor(Math.random() * 2), 1)}
        {divArray[0]}
      </div>
    )
  }
  const answerDiv = createAnswerDiv()

  function handleClick(event) {
    console.log('I clicked an answer', event.target.value) // Not sure if Semantic is ok with this...
    let category =
      challenge.category.slice(0, 1).toUpperCase() + challenge.category.slice(1)
    console.log('is category now capitalized?', category)

    if (event.target.value === 'answer') {
      // What prize should we give?
      let prize
      if (!playersObject[currentPlayer][`has${category}`]) {
        // if the currentPlayer's .hasCategory === false
        // give the category
        prize = category
      } else {
        // if the currentPlayer's .hasCategory ==== true || === undefined (i.e. Interview)
        // give the positive money value
        prize = 1000 // challenge.money is currently a string! (easy/medium/hard)
      }
      answeredChallengeThunk(
        true,
        prize,
        currentPlayer,
        gameCode,
        playerIdsArray
      )
      // render the You Are Right component
      setResultDiv(
        <div>
          <h2>Good job!</h2>
          {typeof prize === 'string' ? (
            <h4>You win some tech!</h4>
          ) : (
            <h4>You win ${prize}!</h4>
          )}
        </div>
      )
      setResult('right')
    } else {
      // If you clicked the wrong answer...
      let prize
      if (category === 'Interview') {
        prize = -3000 // challenge.money is only a string at the moment!
      }
      answeredChallengeThunk(
        false,
        prize,
        currentPlayer,
        gameCode,
        playerIdsArray
      )
      setResultDiv(
        <div>
          <h2>Sorry, wrong answer...</h2>
          {typeof prize === undefined ? (
            <div>
              <h4>No prizes for you :(</h4>
              <h5>Better luck next time!</h5>
            </div>
          ) : (
            <div>
              <h4>You lose ${Math.abs(prize)}!</h4>
              <h5>Interviews aren't cheap for the company, you know...</h5>
            </div>
          )}
        </div>
      )
      setResult('wrong')
    }
  }

  return (
    <div className="modalBox">
      {result ? (
        resultDiv
      ) : (
        <div>
          <div className="question">
            <h2>{challenge.question}</h2>
          </div>
          <div className="underQuestionBox">
            <div className="answerChoices">
              <div className="answerChoices">{answerDiv}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Challenge
