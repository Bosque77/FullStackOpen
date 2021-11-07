const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.data.content
        case 'REMOVE_MESSAGE':
            return null
        default:
            return state
    }
}


export const createMessage = (content) => {
    return {
        type: 'SET_MESSAGE',
        data: { content }
    }
}

export const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE',
    }
}

export default notificationReducer