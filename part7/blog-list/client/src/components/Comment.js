import React, { useState } from 'react'
import blogService from '../services/blogs'
import { getBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comment = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const submitComment = async (event) => {
    event.preventDefault()
    let response = await blogService.addComment(blog, comment)
    if (response.status === 'SUCCESS') {
      dispatch(getBlogs())
    }
  }

  return (
    <div>
      <form onSubmit={submitComment}>
        <div>
                Comment:
          <input value={comment} type='text' name='Comment' onChange={({ target }) => setComment(target.value)} />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>

  )

}


export default Comment