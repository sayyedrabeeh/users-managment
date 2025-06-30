import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../redux/slices/authSlice';
import './Login.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError('');  
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:8000/api/login/', form);
  

    dispatch(setAuth({ user: res.data.user, token: res.data.token.access,refresh: res.data.token.refresh }));
    console.log("User Info:", res.data.user);
     
  navigate('/admin');
 
  } catch (err) {
    console.log("Login error:", err.response?.data);  
    const msg = err.response?.data?.error || 'Login failed. Try again.';
    setError(msg);
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
