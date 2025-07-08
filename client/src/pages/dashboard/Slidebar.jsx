// src/pages/dashboard/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Slidebar.css';

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh' }}>
      <h5> Dashboard Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
         <NavLink className="nav-link text-white" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
         <NavLink className="nav-link text-white" to="/dashboard/edit-profile">Edit Profile</NavLink>
        </li>
        <li className="nav-item">
<NavLink className="nav-link text-white" to="/dashboard/saved">Saved Articles</NavLink>
        </li>
      </ul>
    </div>
  );
}
