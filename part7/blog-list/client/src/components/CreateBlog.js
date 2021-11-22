import React, { useState } from 'react'



const CreateBlog = ({ handleCreateBlog }) => {
  console.log('inside Create Blog Component')
  const [blog_title, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const onSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog(blog_title,author,url)
    setBlogTitle([])
    setAuthor([])
    setUrl([])
  }

  return (
    <div>
      <div>Create Blog</div>
      <form onSubmit={onSubmit}>
        <div>
                    Title:
          <input type="text" id="blog-title" value={blog_title} name="Title" onChange={({ target }) => setBlogTitle(target.value)} />
        </div>
        <div>
                    Author:
          <input type="text" id="blog-author" value={author} name="Author" onChange = {({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
                    url:
          <input type="text" id="blog-url" value={url} name="Url" onChange ={({ target }) => setUrl(target.value)}/>
        </div>
        <button id="create-blog" type="submit">Create Blog</button>
      </form>
    </div>
  )
}

export default CreateBlog