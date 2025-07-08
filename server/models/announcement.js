const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
}, { timestamps: true });


module.exports = mongoose.model('Announcement', announcementSchema);
