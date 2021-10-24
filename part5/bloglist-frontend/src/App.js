import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import Togglable from './components/Toggable'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [status_message, setStatusMessage] = useState(null)
  const display_with_user = { display: user ? '' : 'none' }

  const togglable1 = useRef()


  useEffect(() => {
    let cached_user = window.localStorage.getItem('user')
    cached_user = JSON.parse(cached_user)
    if (cached_user) {
      setUser(cached_user)
      blogService.setToken(cached_user.token)
    }
    blogService.getAll().then( returned_blogs => setBlogs(returned_blogs))

  }, [])


  const sortBlogs = (input_blogs) => {
    function compare( a, b ) {
      if ( a.likes < b.likes ){
        return 1
      }
      if ( a.likes > b.likes ){
        return -1
      }
      return 0
    }

    input_blogs.sort( compare )
    return input_blogs
  }

  const handleLogin = async (username, password) => {
    console.log('inside handle login')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      // let returned_blogs = await blogService.getAllBlogs()
      // setBlogs(returned_blogs)
      setUser(user)
      createStatus('User Succesffuly Logged In')
    } catch (exception) {
      createStatus('User Login was unsuccessful')
    }

  }

  const createStatus = (message) => {
    setStatusMessage(message)
    const timeId = setTimeout(() => {
      setStatusMessage(null)
    }, 5000)

    return () => {
      clearTimeout(timeId)
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

      let new_blogs = blogs.concat(new_blog)
      setBlogs(new_blogs)
      togglable1.current.toggleVisibility()
    }
    createStatus(response.message)

  }

  const replaceBlog = (new_blog) => {
    console.log('inside replaceBlog')
    console.log(new_blog)
    let new_blog_list = []
    blogs.forEach(blog => {
      console.log(blog)
      if (blog.id === new_blog.id) {
        new_blog_list.push(new_blog)
      } else {
        new_blog_list.push(blog)
      }
    })

    console.log('about to log the new blog list')
    console.log(new_blog_list)
    return new_blog_list
  }


  const addBlogLike = async (blog) => {
    let new_blog = { ...blog }
    new_blog.likes = new_blog.likes + 1
    let response = await blogService.putBlog(new_blog)
    let returned_blog = response.data
    let new_blog_list = replaceBlog(returned_blog)
    let sorted_blogs = sortBlogs(new_blog_list)
    setBlogs(sorted_blogs)
  }



  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addBlogLike={addBlogLike} username={user.username} deleteBlog={deleteBlog}/>
          )}
        </div>
      </div>
    )
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const userForm = () => {
    return (
      <div>
        The user {user.name} is logged in <button type="submit" onClick={logoutHandler}>logout</button>
      </div>
    )
  }

  const deleteBlog = async (blog_id) => {
    let response = await blogService.deleteBlog(blog_id)
    if (response.status === 'SUCCESS') {
      console.log('successfully deleted the blog')
      let new_blogs = await blogService.getAll()
      setBlogs(new_blogs)
    }
    createStatus(response.message)

  }

  return (
    <div>
      {<Status message={status_message} />}
      {user !== null && userForm()}
      <br />
      <div style={display_with_user}>
        <Togglable buttonLabel="create new blog" ref={togglable1}>
          <CreateBlog handleCreateBlog={handleCreateBlog} blogs={blogs} setBlogs={setBlogs} setStatusMessage={setStatusMessage} />
        </Togglable>

      </div>
      {user === null ?
        <LoginForm handleLogin={handleLogin} /> :
        blogForm()}
    </div>
  )
}

export default App