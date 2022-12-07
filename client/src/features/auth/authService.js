import axios from 'axios'

// Register user
const register = async (userData) => {
  const response = await axios.post('http://localhost:5000/users/register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


const updateUser = async (userData) => {
  const response = await axios.post('http://localhost:5000/users/update', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post('http://localhost:5000/users/login', userData)

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