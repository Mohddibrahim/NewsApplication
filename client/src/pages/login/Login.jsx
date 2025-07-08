import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';






export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('/auth/login', { email, password });

    const token = res.data.token;
    localStorage.setItem('token', token);

    // Debug step: decode and log token
    const decoded = jwtDecode(token)
    console.log("Decoded Token:", decoded);

    const isAdmin = decoded?.role?.toLowerCase() === 'admin';


    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }

  } catch (err) {
    console.error("Login error:", err);
    setMessage(' ' + (err.response?.data?.message || 'Login failed'));
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login to NewsApp</h3>

        {message && <div className="alert alert-danger text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
