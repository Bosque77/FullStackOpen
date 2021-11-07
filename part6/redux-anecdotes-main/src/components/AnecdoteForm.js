import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {createMessage, removeMessage} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createAnecdote(content))
        let notification = `Created new anecdote '${content}'`
        setNotification(notification)
      }

      const setNotification = (notification) => {
        dispatch(createMessage(notification))
        setTimeout(() => {dispatch(removeMessage())}, 3000);
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name='note' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm