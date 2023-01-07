import axios from 'axios'
// need to change before deploying
// const baseUrl = '/api/notes/'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}
const create = async (newObject) => {
  console.log('token is ', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}
export default {
  getAll,
  create,
  update,
  setToken,
}
