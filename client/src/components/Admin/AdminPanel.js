import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './AdminPanel.css';

export default function AdminPanel() {
  const { token } = useSelector(state => state.auth);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', profile_image: null });
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/admin/users/?q=${q}&page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.results || res.data); // Adjust based on backend
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [q, currentPage]);

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditImage(null);
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('username', editUsername);
    formData.append('email', editEmail);
    if (editImage) formData.append('profile_image', editImage);

    await axios.put(`http://localhost:8000/api/admin/users/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    setEditUserId(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const handleAddUser = async () => {
    if (!newUser.username.trim() || !newUser.email.trim()) {
      setFormError("Username and Email are required.");
      return;
    }
    const formData = new FormData();
    formData.append('username', newUser.username);
    formData.append('email', newUser.email);
    if (newUser.profile_image) formData.append('profile_image', newUser.profile_image);

    await axios.post(`http://localhost:8000/api/admin/users/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    setNewUser({ username: '', email: '', profile_image: null });
    setFormError('');
    setShowModal(false);
    fetchUsers();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>

      <input
        className="admin-search"
        placeholder="Search users"
        value={q}
        onChange={e => setQ(e.target.value)}
      />

      <button className="btn btn-add-user" onClick={() => setShowModal(true)}>➕ Add User</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New User</h3>
            {formError && <div className="form-error">{formError}</div>}
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="file"
              onChange={e => setNewUser({ ...newUser, profile_image: e.target.files[0] })}
            />
            <div className="modal-actions">
              <button className="btn btn-save" onClick={handleAddUser}>Add</button>
              <button className="btn btn-cancel" onClick={() => {
                setShowModal(false);
                setFormError('');
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {users.map(u => (
        <div key={u.id} className="user-card">
          <div className="user-info">
            <img
              src={u.profile_image ? `http://localhost:8000${u.profile_image}` : "/default-profile.png"}
              alt={u.username}
              className="user-image"
            />
            <div className="user-details">
              {editUserId === u.id ? (
                <>
                  <input
                    value={editUsername}
                    onChange={e => setEditUsername(e.target.value)}
                    className="edit-input"
                    placeholder="Username"
                  />
                  <input
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="edit-input"
                    placeholder="Email"
                  />
                  <input type="file" onChange={e => setEditImage(e.target.files[0])} />
                </>
              ) : (
                <>
                  <div className="username">{u.username}</div>
                  <div className="email">{u.email}</div>
                </>
              )}
            </div>
          </div>

          <div className="user-actions">
            {editUserId === u.id ? (
              <>
                <button className="btn btn-save" onClick={() => handleSave(u.id)}>Save</button>
                <button className="btn btn-cancel" onClick={() => setEditUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button className="btn btn-edit" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn btn-delete" onClick={() => handleDelete(u.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '0.5rem' }}>
          <button
            className="btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn ${currentPage === idx + 1 ? 'btn-save' : 'btn-cancel'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
