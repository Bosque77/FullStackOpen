import React from "react";
import { addVote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter==='ALL'){
            return state.anecdotes
        }else{
            let filter = state.filter
            let anecdotes = state.anecdotes
            let filtered_anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
            return filtered_anecdotes
        }
    })

    const dispatch = useDispatch()

    const vote = async (id) => {
        console.log('vote', id)
        let selected_anecdote = anecdotes.find(anecdote => anecdote.id === id)
        await dispatch(addVote(selected_anecdote))
        let message = selected_anecdote.content
        let notification = `A vote was added to the anecdote '${message}'`
        console.log('about to set notifcation')
        dispatch(setNotification('test',3))
        // dispatch(setNotification(notification,3))
    }

    // const setNotification = (notification) => {
    //     dispatch(createMessage(notification))
    //     setTimeout(() => {dispatch(removeMessage())}, 3000);
    // }

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )
    )
}


export default AnecdoteList