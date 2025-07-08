import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const token = localStorage.getItem('token');

  //  Fetch all users
  useEffect(() => {
    axios.get('/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error(' Failed to fetch users:', err));
  }, [token]);

  //  Fetch announcements
  useEffect(() => {
    axios.get('/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(' Failed to fetch announcements:', err));
  }, []);

  //  Delete user
  const handleDeleteUser = (id) => {
    axios.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setUsers(prev => prev.filter(user => user._id !== id));
    })
    .catch(err => console.error(' Failed to delete user:', err));
  };

  //  Post Global Announcement
  const handlePostAnnouncement = () => {
    axios.post('/announcements', { title: 'Global', message }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      alert(' Announcement posted');
      setAnnouncements(prev => [res.data, ...prev]);
      setMessage('');
    })
    .catch(err => {
      console.error(' Failed to post announcement:', err);
      alert(' Failed to post announcement');
    });
  };

  //  Delete announcement
  const handleDeleteAnnouncement = (id) => {
    axios.delete(`/announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setAnnouncements(prev => prev.filter(a => a._id !== id));
    })
    .catch(err => console.error(' Failed to delete announcement:', err));
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

       {/* Post Announcement */}
      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-control"
          placeholder="Write announcement..."
        />
        <button
          onClick={handlePostAnnouncement}
          className="btn btn-primary mt-2"
        >
          Post Global Announcement
        </button>
      </div>

      {/*  Announcement List */}
      <h4>Posted Announcements</h4>
      <ul className="list-group mb-4">
        {announcements.map(a => (
          <li key={a._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{a.title}: {a.message}</span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteAnnouncement(a._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/*  User List */}
      <h4>All Users</h4>
      <ul className="list-group">
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between">
            {user.name} ({user.email})
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
