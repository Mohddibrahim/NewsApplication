import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error('Failed to load announcements:', err));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="alert alert-info mt-3">
      <h5>Global Announcements</h5>
      <ul className="list-unstyled">
        {announcements.map((a) => (
          <li key={a._id} className="mb-2">
            <strong>{a.title}</strong>: {a.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
