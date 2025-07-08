// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:5000/api',
// });
// utils/axios.js
// import axios from 'axios';

// const instance = axios.create({ baseURL: 'http://localhost:5000/api' });

// instance.interceptors.request.use(config => {
//   const t = localStorage.getItem('token');
//   if (t) config.headers.Authorization = `Bearer ${t}`;
//   return config;
// });

// export default instance;
// client/src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export default instance;


