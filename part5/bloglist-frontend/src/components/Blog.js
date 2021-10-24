import React, { useState } from 'react'


const Blog = ({ blog,addBlogLike, deleteBlog,username }) => {
  const [display, setDisplay] = useState(false)
  const display_info = { display: display ? '' : 'none' }
  const display_delete_button = { display: username === blog.user.username ? '' : 'none' }



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    let new_display = display ? false : true
    setDisplay(new_display)
  }


  const displayButton = () =>{
    if(display){
      return( <button onClick={toggleVisibility}> hide </button> )
    }else{
      return( <button onClick={toggleVisibility}> view </button> )
    }
  }

  const onDeleteHandler = () => {
    deleteBlog(blog.id)
  }


  return (
    <div style={blogStyle}>
      {blog.title} {displayButton()}

      <div style={display_info}>
        <div> {blog.author} </div>
        <div> {blog.url} </div>
        <div> {blog.likes} <button onClick={() => addBlogLike(blog)}>like</button> </div> 
        <button style={display_delete_button} onClick={onDeleteHandler}>Delete Blog</button>
      </div>
    </div>
  )
}



export default Blog