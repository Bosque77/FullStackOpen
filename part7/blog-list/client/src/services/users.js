import axios from 'axios'
const baseUrl = '/api/users'


const getAll = async() => {
  const response = await axios.get(baseUrl)
  let returned_users = response.data
  return returned_users
}

export default { getAll }