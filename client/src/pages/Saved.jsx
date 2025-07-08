import { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function Saved() {
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  //  Fetch saved articles
  const fetchSaved = async () => {
    try {
      const res = await axios.get('/saved/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved(res.data);
    } catch (err) {
      console.error(' Failed to fetch saved articles:', err);
      setError('Failed to fetch saved articles');
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  //  Save article manually if needed
  const handleSave = async (article) => {
    try {
      await axios.post('/saved/save', article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Article saved!');
      fetchSaved(); // refresh list
    } catch (err) {
      console.error(' Save failed:', err);
      alert(' Failed to save article.');
    }
  };

  //  Delete saved article
 const handleDelete = async (id) => {
  console.log(id)
  try {
    await axios.delete(`/saved/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchSaved(); // refresh list
  } catch (err) {
    console.error(' Failed to delete article:', err);
    alert(' Failed to delete article.');
  }
};


  return (
    <div className="container mt-4">
      <h2> Saved News</h2>
      {error && <p className="alert alert-danger text-center">{error}</p>}
      <div className="row">
        {saved.length === 0 ? (
          <p className="text-center"> No saved articles yet.</p>
        ) : (
          saved.map((article) => (
            <div className="col-md-4 mb-4" key={article._id}>
              <div className="card h-100">
                <img
                  src={article.image || 'https://via.placeholder.com/300'}
                  className="card-img-top"
                  alt={article.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(article._id)}
                    >
                       Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
