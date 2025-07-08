import { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    const fetchNews = async () => {
      try {
        const res = await axios.get('/news/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNews(res.data.slice(0, 21)); //  LIMIT to 21 articles only
      } catch (err) {
        setError(' Failed to load news.');
      }
    };
    fetchNews();
  }, [token]);

  const handleSave = async (article) => {
    try {
      await axios.post(
        '/saved/save',
        {
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.image || article.urlToImage,
          publishedAt: article.publishedAt,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(' Article saved!');
    } catch (err) {
      console.error(' Save failed:', err);
      alert(' Failed to save article.');
    }
  };

  if (!token) {
    return (
      <div className="container mt-5 text-center">
        <h1> Welcome to NewsApp</h1>
        <p className="lead">Your trusted source for the latest headlines.</p>
        <p>Please login or register to start saving articles, explore full news, and manage your personalized dashboard.</p>
        <img
          src="https://cdn.pixabay.com/photo/2017/08/10/03/47/newspaper-2619718_1280.jpg"
          alt="News"
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Latest News</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {news.map((article, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src={article.image || article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image'}
                className="card-img-top"
                alt={article.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description || 'No description available.'}</p>
                <div className="mt-auto d-flex justify-content-between">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    Read Full Article
                  </a>
                  <button
                    className="btn btn-outline-success ms-2"
                    onClick={() => handleSave(article)}
                  >
                     Save
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted text-end" style={{ fontSize: '0.8rem' }}>
                {new Date(article.publishedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
