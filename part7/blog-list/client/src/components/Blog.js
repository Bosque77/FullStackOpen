import React from 'react'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import {
  useParams,  useNavigate,
} from 'react-router-dom'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import Comment from './Comment'

const Blog = ({ blogs, user }) => {


  if(!blogs || !user){
    return null
  }else{
    console.log('passed the conditional logging the values')
    console.log(blogs)
    console.log(user)
  }

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const display_delete_button = { display: user.username === blog.user.username ? '' : 'none' }



  const sortBlogs = (input_blogs) => {
    function compare(a, b) {
      if (a.likes < b.likes) {
        return 1
      }
      if (a.likes > b.likes) {
        return -1
      }
      return 0
    }

    input_blogs.sort(compare)
    return input_blogs
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
    dispatch(setBlogs(sorted_blogs))
  }



  const deleteBlogID = async () => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotification('Successfully Deleted a blog', 3))
    navigate('/')
  }

  const randomNumber = () => {
    return Math.floor(Math.random() * 1000)
  }


  return (
    <div className='blog-class'>
      <div className='blogTitle'>{blog.title}</div>
      <div className='blogAuthor'>{blog.author} </div>
      <div className='blog-content'>
        <div> {blog.url} </div>
        <div className='num-of-likes'> {blog.likes} <button id='like-blog' onClick={() => addBlogLike(blog)}>like</button> </div>
        <button id='delete-blog' style={display_delete_button} onClick={deleteBlogID}>Delete Blog</button>
      </div>
      <br/>
      <div> Comments </div>
      <Comment blog={blog}/>
      <div>{blog.comments.map( comment => <div key={randomNumber()}>{comment}</div>)} </div>
    </div>
  )
}



export default Blog