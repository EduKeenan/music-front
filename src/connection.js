import axios from "axios"
export const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND}:${process.env.REACT_APP_BACKEND_PORTA}`,
})

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['x-access-token'] = token
  }
  return config
})
