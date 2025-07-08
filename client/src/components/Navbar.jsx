// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../assets/newslogo.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [localStorage.getItem('token')]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" className="logo-img me-2" />
        <span className="brand-text">NewsApp</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ms-auto align-items-lg-center">
          {isLoggedIn ? (
            <>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
              <Link className="nav-link" to="/saved">Saved</Link>
              <button className="btn btn-outline-danger ms-lg-3" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
