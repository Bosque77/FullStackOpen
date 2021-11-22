import React from 'react'

import blogService from './services/blogs'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import { getBlogs } from './reducers/blogReducer'
import Container from '@material-ui/core/Container'
// import ButtonAppBar from './components/ButtonAppBar'
import MyNavBar from './components/MyNavBar'

import {
  useNavigate,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const users = useSelector(state => {
    return state.users
  })

  const user = useSelector(state => {
    return state.user
  })

  const blogs = useSelector(state => {
    return state.blogs
  })


  const setStates = async () => {
    await dispatch(getBlogs())
    await dispatch(getUsers())
    let cached_user = window.localStorage.getItem('user')
    cached_user = JSON.parse(cached_user)
    if (cached_user) {
      await dispatch(setUser(cached_user))
      blogService.setToken(cached_user.token)
    }
    return 'successfuly set states'
  }


  useEffect(() => {
    let isMounted = true
    asyncOperation().then(
      () => {if (isMounted) setStates()})
    return () => { isMounted = false }
  }, [])

  const asyncOperation = async () => {
    await setTimeout(() => {console.log('message inside async operation')}, 1000)
    return 'finished timeout'
  }


  const userForm = () => {
    return (
      <div>
        The user {user.name} is logged in <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' id="logout-button" type="submit" onClick={logoutHandler}>logout</button>
      </div>
    )
  }

  const logoutHandler = () => {
    console.log('inside logoutHandler')
    window.localStorage.clear()
    dispatch(setUser(null))
    navigate('/')
  }



  return (
    <div>
      <MyNavBar />
      <Container>

        {/* <ButtonAppBar /> */}
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Blogs for Everyone
            </h2>
          </div>
        </div>
        <div>
          <Notification />
          {user !== null && userForm()}

          <div>
            <Routes>
              <Route path="/" element={<Home blogs={blogs} user={user} />} />
              <Route path="/users/:id" element={<User users={users} />} />
              <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user} />} />
              <Route path="/users" element={<UsersList users={users} />} />
            </Routes>
          </div>

        </div>
      </Container>
    </div>


  )
}

export default App