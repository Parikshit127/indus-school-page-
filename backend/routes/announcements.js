const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get all active announcements (public)
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all announcements (admin)
router.get('/all', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ order: 1, createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new announcement
router.post('/', async (req, res) => {
    const announcement = new Announcement({
        text: req.body.text,
        type: req.body.type,
        link: req.body.link,
        isActive: req.body.isActive,
        order: req.body.order
    });

    try {
        const newAnnouncement = await announcement.save();
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update announcement
router.patch('/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

        if (req.body.text != null) announcement.text = req.body.text;
        if (req.body.type != null) announcement.type = req.body.type;
        if (req.body.link != null) announcement.link = req.body.link;
        if (req.body.isActive != null) announcement.isActive = req.body.isActive;
        if (req.body.order != null) announcement.order = req.body.order;

        const updatedAnnouncement = await announcement.save();
        res.json(updatedAnnouncement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

        await announcement.deleteOne();
        res.json({ message: 'Announcement deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
