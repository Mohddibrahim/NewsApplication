const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  description: String,
  url: String,
  image: String,
  publishedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Saved', savedSchema);

