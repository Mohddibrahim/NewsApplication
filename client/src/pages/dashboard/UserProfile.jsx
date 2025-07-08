import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(' Error loading profile:', err);
        setError('Failed to load profile');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4"> Loading profile...</p>;
  if (error) return <p className="text-center text-danger"> {error}</p>;
  if (!user) return <p className="text-center">No profile data found.</p>;

  return (
    <div className="container-fluid mt-4">
      <div className="bg-light p-4 rounded shadow">
        <h2 className="text-center mb-4"> Welcome, {user.name}!</h2>
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3">
            <img
              src={user.profileImage || '/default-avatar.png'}
              alt="Profile"
              className="rounded-circle border border-3 border-primary"
              style={{ width: '180px', height: '180px', objectFit: 'cover' }}
            />
            <div className="mt-3">
              <a href="/dashboard/edit-profile" className="btn btn-outline-primary"> Edit Profile</a>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-sm-6 mb-2">
                <strong>Name:</strong>
                <p>{user.name}</p>
              </div>
              <div className="col-sm-6 mb-2">
                <strong>Username:</strong>
                <p>{user.username || 'N/A'}</p>
              </div>
              <div className="col-sm-6 mb-2">
                <strong>Email:</strong>
                <p>{user.email}</p>
              </div>
              <div className="col-sm-6 mb-2">
                <strong>Gender:</strong>
                <p>{user.gender || 'N/A'}</p>
              </div>
              <div className="col-sm-12 mb-2">
                <strong>Bio:</strong>
                <p>{user.bio || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Quick Access */}
      <div className="mt-5">
        <h4> Dashboard Quick Access</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5> Saved Articles</h5>
              <p>Quick access to your saved news items.</p>
              <a href="/dashboard/saved" className="btn btn-sm btn-outline-dark">View Saved</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5> Settings</h5>
              <p>Manage account preferences and notifications.</p>
              <button className="btn btn-sm btn-outline-secondary" disabled>Coming Soon</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5> Contact Support</h5>
              <p>Need help? Reach out to our support team.</p>
              <button className="btn btn-sm btn-outline-info" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Features */}
      <div className="mt-5">
        <h4 className="mb-3">Highlights & Features</h4>
        <div className="row g-4">

          {/* Articles Read */}
          <div className="col-md-4">
            <div className="card text-white bg-primary shadow p-3">
              <h5 className="card-title"> Articles Read</h5>
              <p className="card-text display-6">120+</p>
              <small>based on last 30 days</small>
            </div>
          </div>

          {/* New Feature: Reading Analytics */}
          <div className="col-md-4">
            <div className="card text-white bg-info shadow p-3">
              <h5 className="card-title"> Reading Analytics</h5>
              <p className="card-text">Avg. Reading Time: <strong>7 mins/day</strong></p>
              <p className="card-text">Engagement: <strong>85%</strong></p>
            </div>
          </div>

          {/* Trending Categories */}
          <div className="col-md-4">
            <div className="card bg-warning shadow p-3">
              <h5 className="card-title"> Trending Categories</h5>
              <ul className="list-unstyled mb-0">
                <li>World News</li>
                <li> Business</li>
                <li> Sports</li>
              </ul>
            </div>
          </div>

          {/* Personalized Feed */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h5 className="card-title"> Personalized Feed</h5>
              <p className="card-text">Get articles based on your saved preferences and categories.</p>
              <button className="btn btn-outline-primary btn-sm" disabled>Enable Preferences (Coming Soon)</button>
            </div>
          </div>

          {/* Dark Mode */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h5 className="card-title"> Dark Mode</h5>
              <p className="card-text">Toggle between light and dark modes for comfortable reading anytime.</p>
              <button className="btn btn-outline-dark btn-sm" disabled>Customize Theme (Coming Soon)</button>
            </div>
          </div>

          {/* Quote or Motivation */}
          <div className="col-12">
            <div className="alert alert-info text-center">
              <strong>“Stay informed. Stay ahead.”</strong> — Empower your day with the right news!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
