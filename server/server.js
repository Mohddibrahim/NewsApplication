const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const announcementRoutes = require('./routes/announcementRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const savedRoutes = require('./routes/savedRoutes');
const newsRoutes = require('./routes/newsRoutes');
const adminRoutes = require('./routes/adminRoutes');



app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded profile images

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Failed:", err));

//  Fix route prefixes
app.use("/api/announcements", announcementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
