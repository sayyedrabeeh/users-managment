import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import './Navbar.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <nav>
      {!isAuthenticated ? (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          {user?.is_admin && <Link to="/admin">Admin</Link>}
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      )}
    </nav>
  );
}
