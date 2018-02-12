import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateComments = async (id, newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove, updateComments, setToken }
