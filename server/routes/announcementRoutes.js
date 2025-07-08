const express = require('express');
const Announcement = require('../models/announcement');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

//  Admin can post announcement
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, message } = req.body;
    const newAnnouncement = await Announcement.create({ title, message });
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//  Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

//  Delete announcement
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
