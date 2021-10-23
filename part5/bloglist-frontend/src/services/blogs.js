import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { getAll, getUserBlogs, setToken, createBlog }