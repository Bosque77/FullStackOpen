import React, { useState } from 'react'



const Button = ({ functionHandler, text }) => {
  return (
    <div>
      <a className="waves-effect waves-light btn" onClick={functionHandler}>{text}</a>
    </div>
  )
}

const AnecdoteOfTheDay = ({anecdotes, voteArray}) => {

  let max_index = voteArray.indexOf(Math.max(...voteArray));
  return(
    <div>{anecdotes[max_index]}</div>
  )
 

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const num_of_anecdotes = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [voteArray, setVoteArray] = useState(new Array(num_of_anecdotes).fill(0))


  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const nextAnecdote = () => {
    let random_int = getRandomInt(num_of_anecdotes);
    setSelected(random_int);
  }


  const voteUp = () => {
    const copy = [...voteArray]
    copy[selected] += 1;
    setVoteArray(copy);
    console.log(copy);
  }



  return (
    <div>
      <h2>Anecdote of the Day</h2>
      {anecdotes[selected]}
      <div className="row">
        <div className="col l1">
          <Button functionHandler={nextAnecdote} text="Next Anecdote" />
        </div>
        <div className="col l1">
          <Button functionHandler={voteUp} text="Vote" className="col l3" />
        </div>
      </div>
      <h2>Anecdote With Most Votes</h2>
      <AnecdoteOfTheDay anecdotes={anecdotes} voteArray={voteArray}/>
    </div>
  )
}

export default App