import React, { useState } from 'react'
import axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const { username, email, password } = form

    if (!username || !email || !password) {
      setError('All fields are required.')
      return false
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    try {
      await axios.post('http://localhost:8000/api/register/', form)
      navigate('/')
    }  catch (err) {
  const msg =
    err.response?.data?.error ||
    (typeof err.response?.data === 'string' ? err.response.data : 'Registration failed.')
  setError(msg)
}
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
