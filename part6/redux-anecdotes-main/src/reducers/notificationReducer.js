const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            console.log('inside SET Message')

            console.log(action.data)
            return action.data
        case 'REMOVE_MESSAGE':
            console.log('inside remove message')
            return null
        default:
            return state
    }
}


const createMessage = (content) => {
    return {
        type: 'SET_MESSAGE',
        data: { content }
    }
}

const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE',
    }
}

export const setNotification = (message, time) => {
    let ms = time*1000
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            data: message
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE',
            })
            }, ms)
    }
}

export default notificationReducer