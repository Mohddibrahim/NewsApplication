import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import logo from '../../assets/newslogo.png';

export default function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', data);
      setMessage(' ' + res.data.message);
      navigate('/login');
    } catch (err) {
      setMessage(' ' + (err.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center register-container">
      <div className="register-card">
        <div className="text-center mb-4">
          <img src={logo} alt="NewsApp Logo" className="register-logo" />
          <h3 className="register-heading">Register to NewsApp</h3>
        </div>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success register-btn">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
