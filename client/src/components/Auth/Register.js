import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8000/api/register/', form)
    alert('Registered!')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  )
}
