import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const { user } = useSelector(state => state.auth)
  return <h1>Welcome, {user?.username}!</h1>
}
