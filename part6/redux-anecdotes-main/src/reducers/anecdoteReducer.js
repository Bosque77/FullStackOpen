const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let new_state = []
  switch (action.type) {
    case 'ADD VOTE':
      console.log('inside reducer add vote')
      const id = action.data.id
      const anecdote_to_change = state.find(n => n.id === id)
      const changed_anecdote = {...anecdote_to_change, votes: anecdote_to_change.votes+1}
      new_state = state.map(anecdote => anecdote.id !== id ? anecdote : changed_anecdote)
      orderAnecdotes(new_state)
      return new_state
    case 'CREATE ANECDOTE':
      console.log('inside add anecdote')
      const new_anecdote = asObject(action.data.content)
      new_state = [...state, new_anecdote]
      console.log(new_state)
      return new_state
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
}


export const addVote = (id) => {
  return {
    type: 'ADD VOTE',
    data: {id}
  }
}


export const createAnecdote = (content) => {
  return {
    type: 'CREATE ANECDOTE',
    data: {content}
  }
}

export default reducer