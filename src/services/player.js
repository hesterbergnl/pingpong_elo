import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/player'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = newObject => {
  const req =  axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const update = (id, newObject) => {
  const req =  axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

export default { getAll, create, update }