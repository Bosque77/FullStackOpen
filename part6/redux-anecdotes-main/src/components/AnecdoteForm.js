import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        await dispatch(createAnecdote(content))
        let notification = `Created new anecdote '${content}'`
        console.log('about to set notification')
        dispatch(setNotification(notification,3))
      }

    //   const setNotification = (notification) => {
    //     dispatch(createMessage(notification))
    //     setTimeout(() => {dispatch(removeMessage())}, 3000);
    // }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name='note' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm