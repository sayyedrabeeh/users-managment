import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import './Profile.css'
 

export default function Home() {
  const { user,toggle } = useSelector(state => state.auth)
 

  const dispatch = useDispatch()

  return (
    <div className="home-container">
      <div className="home-banner">
        <h1 className="banner-title">Welcome to the Dashboard</h1>
        <p className="banner-subtitle">Your personalized user space</p>
      </div>
      <div className="home-card">
        <h2>Hello, {user?.username} 👋</h2>
        
        <p>Glad to see you here. Explore your profile and manage your account with ease.</p>
      </div>

      <div className="user-info-panel">
        <h3>Your Info</h3>
        <ul>
          <li><strong>Username:</strong> {user?.username}</li>
          <li><strong>Email:</strong> {user?.email}</li>
          <li><strong>Admin:</strong> {user?.is_admin ? "Yes" : "No"}</li>
        </ul>
      </div>
 
      <div className="stats-section">
        <h3>Quick Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">24</span>
            <div className="stat-label">Total Logins</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">7</span>
            <div className="stat-label">Days Active</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <div className="stat-label">Profile Updates</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <div className="stat-label">Tasks Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}