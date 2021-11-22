import React from 'react'
import {
  useParams
} from 'react-router-dom'

const User = ({ users }) => {

  const id = useParams().id
  const user = users.find(n => n.id === id)


  if(!user){
    return null
  }

  console.log(user)

  let blogs = user.blogs

  console.log(blogs)

  const listBlogs = () => {
    return (
      blogs.map(blog =>
        <div key={blog.id}>
          <div>{blog.title}</div>
        </div>

      )
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <div>{listBlogs()}</div>
    </div>

  )
}

export default User