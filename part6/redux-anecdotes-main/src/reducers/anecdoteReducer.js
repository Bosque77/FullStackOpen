import AnecdoteService from '../services/anecdotes'
import { useSelector} from 'react-redux'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let new_state = []
  switch (action.type) {
    case 'ADD VOTE':
      const changed_anecdote = action.data
      let id = changed_anecdote.id
      new_state = state.map(anecdote => anecdote.id !== id ? anecdote : changed_anecdote)
      orderAnecdotes(new_state)
      return new_state
    case 'CREATE ANECDOTE':
      new_state = [...state, action.data]
      return new_state
    case 'INIT':
      console.log('inside init')
      let ordered_anecdotes = orderAnecdotes(action.data)
      return ordered_anecdotes
    default: // if none of the above matches then the code comes here
      return state
  }
  
}


const orderAnecdotes = (anecdotes) => {
  function compare( a, b ) {
    if ( a.votes < b.votes ){
      return 1
    }
    if ( a.votes > b.votes ){
      return -1
    }
    return 0
  }

  anecdotes.sort( compare )
  return anecdotes
}


export const addVote = (anecdote) => {
  return async dispatch =>{
    anecdote.votes = anecdote.votes+1
    let response = await AnecdoteService.putAnecdote(anecdote)
    dispatch({
      type: 'ADD VOTE',
      data: response
    })

  }

}


export const createAnecdote = (data) => {
  return async dispatch => {
    let anecdote = await AnecdoteService.createNew(data)
    dispatch({
      type: 'CREATE ANECDOTE',
      data: anecdote
    })
  }
}



export const initializeAnecdotes = () => {
  console.log('inside initializeAnecdotes')
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer