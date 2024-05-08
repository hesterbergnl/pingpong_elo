import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/player'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = (newObject, config) => {
  const req =  axios.post(baseUrl, newObject, config)
  return req.then(res => res.data)
}

const update = (id, newObject) => {
  const req =  axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

const del = (id, config) => {
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(res => res.data)
}

export default { getAll, create, update, del }