import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  let new_state = []
  switch (action.type) {
  case 'GET_BLOGS':
    console.log('inside GET BLOGS')
    return action.data
  case 'ADD_BLOG':
    console.log('inside ADD BLOG')
    new_state = [...state, action.data]
    return new_state
  case 'SET_BLOGS':
    return action.data
  case 'DELETE_BLOG':
    return action.data
  default:
    return state
  }
}


export const getBlogs = () => {
  return async dispatch => {
    let blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}



export const deleteBlog = (blog_id) => {
  return async dispatch => {
    let response = await blogService.deleteBlog(blog_id)
    if (response.status === 'SUCCESS') {
      let new_blogs = await blogService.getAll()
      dispatch({
        type: 'DELETE_BLOG',
        data: new_blogs
      })
    }
  }
}


export const setBlogs = (blogs) => {
  return dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}





export default blogReducer