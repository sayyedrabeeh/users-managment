import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function AdminPanel() {
  const { token } = useSelector(state => state.auth)
  const [users, setUsers] = useState([])
  const [q, setQ] = useState('')

  const fetchUsers = async () => {
    const res = await axios.get(`http://localhost:8000/api/admin/users/?q=${q}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUsers(res.data)
  }

  useEffect(() => { fetchUsers() }, [q])

  return (
    <div>
      <input placeholder="Search users" onChange={e => setQ(e.target.value)} />
      {users.map(u => (
        <div key={u.id}>
          {u.username} - {u.email}
        </div>
      ))}
    </div>
  )
}
