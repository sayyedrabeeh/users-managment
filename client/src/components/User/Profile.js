import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Profile.css'

export default function Profile() {
  const { token, user } = useSelector(state => state.auth)
  const [img, setImg] = useState(null)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('profile_image', file)

    const res = await axios.put('http://localhost:8000/api/profile/', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })

    alert('Updated!')
  }

  return (
    <div className="profile-container">
      <h2>Profile of {user.username}</h2>
      <input type="file" onChange={handleUpload} />
      <img src={`http://localhost:8000${user.profile_image}`} width={150} />
    </div>
  )
}
