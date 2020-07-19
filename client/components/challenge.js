import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {answeredChallengeThunk, turnEndedThunk} from '../store/challenge'
import {EventEmitter} from 'events'

export const modalE = new EventEmitter()
let result = null
let prize = undefined
let runStep6 = true

const Challenge = () => {
  // const [result, setResult] = useState(null) // we'll set it to a string ("right" or "wrong" after they answer)
  const [resultDiv, setResultDiv] = useState(null)
  let challenge = useSelector(state => state.challenge)
  const gameObject = useSelector(state => state.firestore.data.games)
  const gameCode = Object.keys(gameObject)[0]
  const currentPlayer = gameObject[gameCode].currentPlayer
  const playersObject = useSelector(state => state.firestore.data.players)
  const currentMoney = playersObject[currentPlayer].seedMoney
  const dispatch = useDispatch()
  const playerIdsArray = useSelector(
    state => state.firestore.data.games[gameCode].playersArray
  )
  const modalGoAway = () => {
    result = null
    prize = undefined
    runStep6 = true
    modalE.emit('modalGoAway')
  }

  const createAnswerDiv = () => {
    console.log('createAnswerDiv function was called!')
    let divArray = [
      <div className="form-radio" id="a" key={`${challenge.cardId}buttonA`}>
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

      <div className="form-radio" id="b" key={`${challenge.cardId}buttonB`}>
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

      <div className="form-radio" id="c" key={`${challenge.cardId}buttonC`}>
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
      <div className="answerChoices" key={`${challenge.cardId}AnswerChoices`}>
        <div key={`${challenge.cardId}A`}>
          {divArray.splice(Math.floor(Math.random() * 3), 1)}
        </div>
        <div key={`${challenge.cardId}B`}>
          {divArray.splice(Math.floor(Math.random() * 2), 1)}
        </div>
        <div key={`${challenge.cardId}C`}>{divArray[0]}</div>
      </div>
    )
  }
  const answerDiv = createAnswerDiv()

  function handleClick(event) {
    console.log('---------------1----------------')
    console.log('player clicked an answer')
    let category =
      challenge.category.slice(0, 1).toUpperCase() + challenge.category.slice(1)

    //if correct answer was chosen (2,3,4):
    if (event.target.value === 'answer') {
      // What prize should we give?
      //if player  doesn't yet  have that tech category in their stack (2):
      if (playersObject[currentPlayer][`has${category}`] === 'none') {
        // if the currentPlayer's .hasCategory === false
        // give the category
        prize = category
      } else {
        // if the currentPlayer's .hasCategory ==== true || === undefined (i.e. Interview)  (3, 4)
        // give the positive money value
        prize = 1000 // challenge.money is currently a string! (easy/medium/hard)
      }
      console.log(
        'what is challenge.id in Challenge Component??',
        challenge.cardId
      )
      dispatch(
        answeredChallengeThunk(
          //(2, 3, 4)
          true,
          prize, //will either be tech category (str) or tech money prize (num)
          currentPlayer,
          gameCode,
          playerIdsArray,
          currentMoney,
          challenge.cardId
        )
      )
      // render the You Are Right component
      setResultDiv(
        <div>
          <h2>Good job!</h2>
          {typeof prize === 'string' ? (
            <h4>You win some tech!</h4> //(2)
          ) : (
            <h4>You win ${prize}!</h4> //(3, 4)
          )}
        </div>
      )
      // setResult('right')
      result = 'right'
      modalE.emit('playerAnswered', result, prize)
      setTimeout(modalGoAway, 5000)
    } else {
      // If you clicked the wrong answer... (1, 5)
      console.log('category atm......', category)
      if (category === 'Interview') {
        // (5)
        prize = -3000 // challenge.money is only a string at the moment!
      }
      dispatch(
        answeredChallengeThunk(
          //(1, 5)
          false,
          prize,
          currentPlayer,
          gameCode,
          playerIdsArray,
          currentMoney,
          challenge.cardId
        )
      )
      setResultDiv(
        <div>
          <h2>Sorry, wrong answer...</h2>
          {prize === undefined ? ( //(1)
            <div key={`${challenge.cardId}NoPrize`}>
              <h4>No prizes for you :(</h4>
              <h5>Better luck next time!</h5>
            </div>
          ) : (
            //(5)
            <div key={`${challenge.cardId}Prize`}>
              {console.log('what  is prize...', prize)}
              <h4>You lose ${Math.abs(prize)}!</h4>
              <h5>Interviews aren't cheap for the company, you know...</h5>
            </div>
          )}
        </div>
      )
      console.log('-------------2--------------')
      console.log("I'm about to send a signal!!!")
      // setResult('wrong')
      result = 'wrong'
      console.log("this is the result that's being emitted:", result)
      modalE.emit('playerAnswered', result, prize)
      setTimeout(modalGoAway, 5000)
    }
  }

  // Function that will run if player receives signal that OTHER player answered
  const someoneAnswered = (theirResult, prize) => {
    console.log('someoneAnswered ran!!!!')
    let currentPlayerName = playersObject[currentPlayer].startupName
    let divToRender =
      theirResult === 'right' ? (
        <div key={`${challenge.cardId}Right`}>
          <h2>Good job, {currentPlayerName}!</h2>
          {typeof prize === 'string' ? (
            <h4 key={`${challenge.cardId}BroadcastTech`}>
              They win some tech!
            </h4> //(2)
          ) : (
            <h4 key={`${challenge.cardId}BroadcastMoney`}>
              They win ${prize}!
            </h4> //(3, 4)
          )}
        </div>
      ) : (
        <div key={`${challenge.cardId}Wrong`}>
          <h2>Sorry, wrong answer...</h2>
          {prize === undefined ? ( //(1)
            <div key={`${challenge.cardId}BroadcastNoPrize`}>
              <h4>No prizes for {currentPlayerName} :(</h4>
              <h5>Better luck next time!</h5>
            </div>
          ) : (
            //(5)
            <div key={`${challenge.cardId}BroadcastPenalty`}>
              <h4>
                {currentPlayerName} lost ${Math.abs(prize)}!
              </h4>
              <h5>Interviews aren't cheap for the company, you know...</h5>
            </div>
          )}
        </div>
      )
    console.log('this should be rendered by other players', divToRender)
    console.log('this should be the result string', theirResult)
    return divToRender
  }
  // Listening for the signal to execute the someoneAnswered function.
  modalE.setMaxListeners(4)
  modalE.once('socketSaysSomeoneAnswered', (theirResult, prize) => {
    // why do I receive the signal 7 times when it's only emitting ONCE?!!!
    // if (runStep6) {
    console.log('-------------6--------------')
    console.log(
      'The component knows it needs to run someoneAnswered',
      theirResult,
      prize
    )
    const outputDiv = someoneAnswered(theirResult, prize)
    console.log("here's the output div we want? to render", outputDiv)
    runStep6 = false
    result = theirResult
    setResultDiv(outputDiv)
    console.log('is result set?', result)
    console.log('is resultDiv set?', resultDiv)
    setTimeout(modalGoAway, 5000)
    // Tell the people to update their firestore on state.
    console.log(
      'this is when I want playerPanels to refresh the firestore reducer'
    )
    // }
  })

  return (
    <div className="modalBox" key={`${challenge.cardId}ModalBox`}>
      {result ? (
        <div key={`${challenge.cardId}ResultDiv`}>{resultDiv}</div>
      ) : (
        <div key={`${challenge.cardId}QDiv`}>
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
