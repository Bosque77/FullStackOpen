import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [status_message, setStatusMessage] = useState(null)



  useEffect(() => {
    let cached_user = window.localStorage.getItem('user')
    cached_user = JSON.parse(cached_user)
    if (cached_user) {
      setUser(cached_user)
      blogService.setToken(cached_user.token)
      blogService.getUserBlogs().then(blogs => setBlogs(blogs))
    }

    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (username, password) => {
    console.log('inside handle login')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      let returned_blogs = await blogService.getUserBlogs()
      setBlogs(returned_blogs)
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

    if(response.status === 'SUCCESS'){
        console.log('successfully created a new blog')
        let new_blog = response.data

        let new_blogs = blogs.concat(new_blog)
        setBlogs(new_blogs)
    }
    createStatus(response.message)

}



  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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



  return (
    <div>
      {<Status message={status_message} />}
      {user !== null && userForm()}
      <br />
      {user !== null && <CreateBlog handleCreateBlog={handleCreateBlog} blogs={blogs} setBlogs={setBlogs} setStatusMessage={setStatusMessage} />}
      {user === null ?
        <LoginForm handleLogin={handleLogin} /> :
        blogForm()}
    </div>
  )
}

export default App