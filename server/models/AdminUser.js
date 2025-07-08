import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './User.js'; 

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/newsdb')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Failed:", err));

const createAdmin = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@example.com' });
  if (existingAdmin) {
    console.log(' Admin already exists');
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
  });
  console.log(' Admin created');
  mongoose.disconnect();
};

createAdmin();
