const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');

const ADMIN_TOKEN = 'indus-admin-secret-2024';

// Auth middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (token !== ADMIN_TOKEN) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    next();
};

// GET all items (public)
router.get('/', async (req, res) => {
    try {
        const type = req.query.type;
        const query = type ? { type } : {};
        const items = await GalleryItem.find(query).sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new item (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newItem = new GalleryItem(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT (Update) item (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedItem = await GalleryItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE item (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await GalleryItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
