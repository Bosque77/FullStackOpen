import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

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

const getAll = async() => {
  const response = await axios.get(baseUrl)
  let returned_blogs = response.data
  let sorted_blogs = sortBlogs(returned_blogs)
  return sorted_blogs
}

const getUserBlogs = async () => {
    const config = {
      headers: { Authorization: token },
    }

    let destination_url = baseUrl+'/user'
    const response = await axios.get(destination_url, config)
    return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  let response = {}

  try{
    response = await axios.post(baseUrl,blog,config)
    response.status = 'SUCCESS'
    response.message = 'Successfully created a new blog'
  }catch(error){
    response.status = 'ERROR'
    response.message = 'error creating the blog'
  }
  
  return response

}

const deleteBlog = async (blog_id) => {
  console.log('inside deleteBlog')
  const config = {
    headers: { Authorization: token },
  }

  let response = {}
  let url = baseUrl.concat(`/${blog_id}`)
  try{
    response = await axios.delete(url,config)
    response.status = 'SUCCESS'
    response.message = 'Successfully deleted the blog'
  }catch(error){
    response.status = 'ERROR'
    response.message = 'error deleting the blog'
  }

  return response



}

const putBlog = async (blog) => {
  console.log('inside addBloglikes')
  const config = {
    headers: { Authorization: token },
  }

  let response = {}
  let url = baseUrl.concat(`/${blog.id}`)
  console.log(url)
  try{
    response = await axios.put(url,blog,config)
    response.status = 'SUCCESS'
    response.message = 'Successfully created a new blog'
  }catch(error){
    response.status = 'ERROR'
    response.message = 'error creating the blog'
  }

  return response
}

export default { getAll, getUserBlogs, setToken, createBlog, putBlog, deleteBlog }