import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log('inside create new anecdote in the anecdote service')
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}


const getAnecdote = async (id) => {
  console.log('inside getAnecdote')
  let url = baseUrl + `/${id}`
  const response = await axios.get(url)
  console.log(response.data)
  return response.data
}

const putAnecdote = async (anecdote) => {
  console.log('inside putAnecdote')
  let id = anecdote.id
  let url = baseUrl + `/${id}`
  const response = await axios.put(url, anecdote)
  return response.data
}


export default { getAll, createNew, getAnecdote, putAnecdote }