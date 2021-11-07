const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'ALL':
            return state
        case 'FILTER':
            return action.data.content
        default:
            return state
    }
}


export const filterAnecdotes = (content) => {
    return {
        type: 'FILTER',
        data: { content }
    }
}


export default filterReducer