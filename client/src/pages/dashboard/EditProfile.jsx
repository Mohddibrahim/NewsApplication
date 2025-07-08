import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

export default function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    gender: '',
    profileImage: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setProfile(res.data);
      setFormData({
        name: res.data.name || '',
        email: res.data.email || '',
        username: res.data.username || '',
        bio: res.data.bio || '',
        gender: res.data.gender || '',
        profileImage: res.data.profileImage || '',
      });
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching profile:', err);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append('image', file);

    try {
      const res = await axios.post('/user/upload', imageData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({ ...formData, profileImage: res.data.url });
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(' Profile updated!');
      setProfile(res.data);
    } catch (err) {
      console.error(' Update failed:', err);
      alert('Profile update failed');
    }
  };

  if (loading) return <p className="text-center mt-4"> Loading profile...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h2 className="text-center"> Edit Profile</h2>
      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <img
              src={formData.profileImage || '/default-avatar.png'}
              alt="Profile"
              className="rounded-circle mb-2"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-2">
            <label>Username</label>
            <input name="username" value={formData.username} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-2">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} className="form-control" rows="3" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
