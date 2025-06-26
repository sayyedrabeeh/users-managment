import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuth } from '../../redux/slices/authSlice'
import './Login.css'


export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/login/', form)
      dispatch(setAuth({ user: res.data.user, token: res.data.token.access }))
      navigate('/home')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  )
}