import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import './Navbar.css'


export default function Navbar() {
  const dispatch = useDispatch()
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/admin">Admin</Link>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </nav>
  )
}
