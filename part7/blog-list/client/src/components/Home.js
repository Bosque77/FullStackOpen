import React, { useRef } from 'react'
import Togglable from '../components/Toggable'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog, setBlogs } from '../reducers/blogReducer'
import { getUsers } from '../reducers/usersReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
// import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'
import LoginForm from '../components/LoginForm'
import LoginFormTW from '../components/LoginFormTW'

import {
  Link
} from 'react-router-dom'

const Home = ({ blogs, user }) => {
  console.log('redering the Home Component')


  if(!blogs){
    return null
  }

  const dispatch = useDispatch()

  const display_with_user = { display: user ? '' : 'none' }


  const togglable1 = useRef()





  const handleLogin = async (username, password) => {
    console.log('inside handle login')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      // setUser(user)
      dispatch(setNotification('User Successfully Logged In', 3))
    } catch (exception) {
      dispatch(setNotification('User Login was Unsuccessful', 3))
    }

  }


  const handleCreateBlog = async (blog_title, author, url) => {

    console.log('inside handle create blog')
    let new_blog = {
      title: blog_title,
      author: author,
      url: url,
      likes: 0
    }
    let response = await blogService.createBlog(new_blog)

    if (response.status === 'SUCCESS') {
      console.log('successfully created a new blog')
      let new_blog = response.data
      dispatch(addBlog(new_blog))

      // let new_blogs = blogs.concat(new_blog)
      // setBlogs(new_blogs)
      togglable1.current.toggleVisibility()
    }
    dispatch(getUsers())
    dispatch(setNotification(response.message, 3))

  }






  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div id='blogs-list'>
          {blogs.map(blog => <div key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
          )}
        </div>
      </div>
    )
  }



  return (
    <div>

      <br />
      <div style={display_with_user}>
        <Togglable buttonLabel="create new blog" ref={togglable1} >
          <CreateBlog handleCreateBlog={handleCreateBlog} blogs={blogs} setBlogs={setBlogs} />
        </Togglable>

      </div>
      {user === null ?
        <LoginFormTW handleLogin={handleLogin}/> :
        blogForm()}
    </div>

  )
}

export default Home