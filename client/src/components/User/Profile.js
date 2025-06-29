import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './Profile.css';
import { updateUser } from '../../redux/slices/authSlice';

export default function Profile() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(`http://localhost:8000${user.profile_image}`);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleSave = async () => {
    const formData = new FormData();
    if (img) formData.append('profile_image', img);
    formData.append('username', username);
    formData.append('email', email);
    try {
      const res = await axios.put('http://localhost:8000/api/profile/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userRes = await axios.get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateUser(userRes.data));
      setPreview(`http://localhost:8000${userRes.data.profile_image}`);
      setError(null);
      setSuccess("Profile updated ");
    } catch (err) {
      console.error('Update failed', err.response?.data || err);
      setError(err.response?.data?.error || "Something went wrong ");
      setSuccess(null);
    }
  };
 return (
  <div className="profile-container">
    <h2>👤 Profile of {user.username}</h2>
    <img src={preview} alt="Profile Preview" />
    
    <input type="file" onChange={handleFileChange} />

    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
    />

    <button onClick={handleSave}>💾 Save Profile</button>

    {error && <div className="error-message">{error}</div>}
    {success && <div className="success-message">{success}</div>}
  </div>
);
}
