import React, { useState } from 'react'
import './App.css';


const Button = ({ text, functionHandler }) => {
  return (
    <div>
      <button class="waves-effect waves-light btn" onClick={functionHandler}>{text} </button>
    </div>
  )
}


const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>


  )
}

const Statistics = ({ good, neutral, bad }) => {

  let all = good + neutral + bad
  let average = ((good - bad) / all).toFixed(2)
  let positive = (good / all).toFixed(2)


  return (
    <div className="row">
      <div className="col l2">
        <Title title="statistics" />
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    </div>

  )
}

const Title = ({ title }) => <h1>{title}</h1>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <Title title="give feedback" />
      <div className="row">
        <div className="col">
          <Button text="good" functionHandler={goodClick} />
        </div>
        <div className="col">
          <Button text="neutral" functionHandler={neutralClick} />
        </div>
        <div className="col">
          <Button text="bad" functionHandler={badClick} />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
