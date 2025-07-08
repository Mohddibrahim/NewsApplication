import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import News from './News/News';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import AllNews from './pages/AllNews';
import Footer from './components/Footer';
import Saved from './pages/Saved';
import AdminDashboard from './pages/admin/AdminDashboard'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/all-news" element={<AllNews />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
