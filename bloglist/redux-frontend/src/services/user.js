import axios from "axios"

const baseUrl = "/api/users"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data, () => [])
}

const getUser = (id) => {
  const request = axios.get(baseUrl + "/" + id)
  return request.then(response => response.data, () => ({ error: "an error ocurred" }))
}

export default { getAll, getUser }

