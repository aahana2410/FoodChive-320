import axios from 'axios'
import { environmentURL } from '../../environementURL'
// Register user
const register = async (userData) => {
  const response = await axios.post(`${environmentURL}/users/register`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// handles updating the user
const updateUser = async (userData) => {
  const response = await axios.post(`${environmentURL}/users/update`, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${environmentURL}/users/login`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  updateUser,
}

export default authService