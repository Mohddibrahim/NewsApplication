// Dashboard.jsx
import React from 'react';
import Sidebar from './Slidebar';
import EditProfile from './EditProfile';
import Saved from '../Saved'
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import AnnouncementList from '../../components/AnnouncementBoard';


export default function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/saved" element={<Saved />} />
         
        </Routes>
      </div>
      <AnnouncementList/>
    </div>
  );
}

