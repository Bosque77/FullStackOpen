import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    console.log('inside GET Users')
    return action.data
  default:
    return state
  }
}




export const getUsers = () => {
  return async dispatch => {
    let users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}


export default usersReducer