import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import beach from '../assets/australia.png';
import coorp from '../assets/coorp.jpg';
import american from '../assets/am.jpg';
import logo from '../assets/newslogo.png';
import lp1 from '../assets/landingpg1.png';
import lp2 from '../assets/landingpg2.png';
import lp3 from '../assets/landingpg3.png';
import lp4 from '../assets/landingpg4.png';
import lp5 from '../assets/landingpg5.png';
import lp6 from '../assets/landingpg6.png';
import lp7 from '../assets/landingpg7.png';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const scrollImages = [
    { img: lp2, title: "Akash, India win 2nd Test vs England at Edgbaston" },
    { img: lp3, title: "Trump’s July 9 tariff deadline approaches" },
    { img: lp4, title: "Attack reported near Yemeni port of Hodeidah" },
    { img: lp5, title: "Real Madrid wins FIFA Club World Cup 3-2" },
    { img: lp6, title: "Lando Norris wins F1 British Grand Prix" },
    { img: lp7, title: "Elon Musk backs third party idea in US politics" },
    { img: lp1, title: "New tech trends emerge in 2025" }
  ];

  useEffect(() => {
    if (!token) return;
    const fetchNews = async () => {
      try {
        const res = await axios.get('/news/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNews(res.data);
      } catch (err) {
        setError('Failed to load news.');
      }
    };
    fetchNews();
  }, [token]);

  const handleSave = async (article) => {
    if (!token) {
      alert('Please login to save articles.');
      return;
    }
    const articleData = {
      title: article.title,
      description: article.description || 'No description',
      url: article.url,
      image: article.urlToImage || '',
    };
    try {
      await axios.post('/saved', articleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Article saved successfully!');
    } catch (error) {
      alert('Failed to save article');
    }
  };

  if (!token) {
    return (
      <div className="container my-5">
        {/* Header */}
        <div className="text-center mb-3 p-3 shadow-lg bg-white rounded">
          <h1 className="news-title d-flex justify-content-center align-items-center gap-2">
            <img src={logo} alt="NewsApp Logo" className="news-logo-small" />
            NewsApp
          </h1>
          <p className="news-subtitle">Get the latest headlines, tailored for you.</p>
        </div>

        {/* Grid Section */}
        <div className="row gx-4 gy-4 mb-5">
          <div className="col-lg-8">
            <div className="grid-large shadow rounded overflow-hidden">
              <img src={american} className="w-100 h-100 object-fit-cover" alt="Main Story" />
              <div className="overlay-content">
                <span className="badge bg-danger mb-2">ENTERTAINMENT</span>
                <h2 className="text-white">American Football Highlights</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="grid-side shadow rounded overflow-hidden">
              <img src={coorp} className="w-100 h-100 object-fit-cover" alt="Corporate" />
              <div className="overlay-content-small">
                <span className="badge bg-primary mb-1">CAREER</span>
                <h6 className="text-white">Corporate News & Economy</h6>
              </div>
            </div>
            <div className="grid-side shadow rounded overflow-hidden">
              <img src={beach} className="w-100 h-100 object-fit-cover" alt="Travel" />
              <div className="overlay-content-small">
                <span className="badge bg-success mb-1">TRAVEL</span>
                <h6 className="text-white">Top Beach Resorts</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling News Highlights */}
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {scrollImages.concat(scrollImages).map((item, index) => (
              <div className="scroll-item" key={index}>
                <img src={item.img} alt={item.title} />
                <p className="scroll-caption">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-light p-5 mt-5 rounded shadow-sm text-center">
          <h4>More features coming soon!</h4>
          <p>Comment,like, and translate articles with a single click after login.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="news-title text-center mb-4 d-flex justify-content-center align-items-center gap-2">
        <img src={logo} alt="NewsApp Logo" className="news-logo" />
        Latest News
      </h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {news.map((article, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={article.image || article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image'}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                  {article.source?.name || 'Source'}
                </span>
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description || 'No description available.'}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Read More
                  </a>
                  <button className="btn btn-sm btn-outline-success ms-2" onClick={() => handleSave(article)}>
                    Save
                  </button>
                </div>
              </div>
              <div className="card-footer text-end text-muted small">
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
