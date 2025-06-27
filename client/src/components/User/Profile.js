import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Profile.css'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/authSlice'
import { getNewAccessToken } from '../../utils/refresh';

export default function Profile() {
  const { token, user } = useSelector(state => state.auth)
  const [img, setImg] = useState(null)
  const [preview, setPreview] = useState(`http://localhost:8000${user.profile_image}`)
  const dispatch = useDispatch()
  const handleUpload = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('profile_image', file)

  try {
    await axios.put('http://localhost:8000/api/profile/', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })

    
    const userRes = await axios.get('http://localhost:8000/api/profile/', {
      headers: { Authorization: `Bearer ${token}` }
    })

  
    dispatch({ type: 'auth/updateUser', payload: userRes.data })
    setPreview(`http://localhost:8000${userRes.data.profile_image}`)
  } catch (err) {
    console.error("Upload failed", err)
  }
}


  return (
    <div className="profile-container">
      <h2>Profile of {user.username}</h2>
      <input type="file" onChange={handleUpload} />
       <img src={preview} width={150} />
    </div>
  )
}
