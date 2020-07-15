import React, {useState, useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import {getChallengeThunk} from '../store/challenge'

const Challenge = () => {
  const challenge = useSelector(state => state.challenge)
  console.log(challenge)

  const [selection, setSelection] = useState(null)
  function handleChange(event) {
    setSelection(event.target.value) // Not sure if Semantic is ok with this...
  }
  function handleSubmit(event) {
    event.preventDefault()
    console.log(
      "Now we should compare the local state's selection to the redux state's challenge answer"
    )
  }

  return (
    <div className="modalBox">
      <div className="question">
        <h2>What is the meaning of life?</h2>
      </div>
      <div className="answerChoices">
        <form onSubmit={handleSubmit}>
          <div className="form-radio">
            <input
              type="radio"
              name="answerChoices"
              value="b"
              className="form-radio-input"
              onChange={handleChange}
            />
            <label>Steak</label>
          </div>

          <div className="form-radio">
            <input
              type="radio"
              name="answerChoices"
              value="b"
              className="form-radio-input"
              onChange={handleChange}
            />
            <label>Cookies</label>
          </div>

          <div className="form-radio">
            <input
              type="radio"
              name="answerChoices"
              value="b"
              className="form-radio-input"
              onChange={handleChange}
            />
            <label>Love</label>
          </div>

          <div className="form-submit">
            <button type="submit">Submit Final Answer</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Challenge
