const express = require('express');
const router = express.Router();

const NewsEvent = require('../models/NewsEvent');
const authMiddleware = require('../middleware/auth');

// Helper to generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

// GET: Latest 10 items for homepage
router.get('/home-latest', async (req, res) => {
    try {
        const items = await NewsEvent.find({})
            .sort({ date: -1, createdAt: -1 })
            .limit(10)
            .select('title slug date category');

        res.json(items);
    } catch (err) {
        console.error('Error fetching home latest news:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// GET: All news & events (optionally limited)
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 0;

        let query = NewsEvent.find({}).sort({ date: -1, createdAt: -1 });
        if (limit > 0) {
            query = query.limit(limit);
        }

        const items = await query;
        res.json(items);
    } catch (err) {
        console.error('Error fetching news list:', err);
        res.status(500).json({ error: 'Failed to fetch news list' });
    }
});

// GET: Single item by slug or id
router.get('/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;

        let item = null;
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            item = await NewsEvent.findById(idOrSlug);
        }

        if (!item) {
            item = await NewsEvent.findOne({ slug: idOrSlug });
        }

        if (!item) {
            return res.status(404).json({ error: 'News item not found' });
        }

        res.json(item);
    } catch (err) {
        console.error('Error fetching news item:', err);
        res.status(500).json({ error: 'Failed to fetch news item' });
    }
});

// POST: Create new news/event (admin)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, excerpt, content, category, imageUrl, date, isFeatured } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        let slug = generateSlug(title);

        // Ensure slug uniqueness
        let existing = await NewsEvent.findOne({ slug });
        let counter = 1;
        while (existing) {
            slug = `${slug}-${counter}`;
            existing = await NewsEvent.findOne({ slug });
            counter += 1;
        }

        const item = await NewsEvent.create({
            title,
            slug,
            excerpt,
            content,
            category,
            imageUrl,
            date,
            isFeatured
        });

        res.status(201).json(item);
    } catch (err) {
        console.error('Error creating news item:', err);
        res.status(500).json({ error: 'Failed to create news item' });
    }
});

// PUT: Update news/event (admin)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, excerpt, content, category, imageUrl, date, isFeatured } = req.body;

        const update = {
            excerpt,
            content,
            category,
            imageUrl,
            date,
            isFeatured
        };

        if (title) {
            update.title = title;
            let slug = generateSlug(title);

            // Ensure slug uniqueness (excluding current item)
            let existing = await NewsEvent.findOne({ slug, _id: { $ne: id } });
            let counter = 1;
            while (existing) {
                slug = `${slug}-${counter}`;
                existing = await NewsEvent.findOne({ slug, _id: { $ne: id } });
                counter += 1;
            }
            update.slug = slug;
        }

        const item = await NewsEvent.findByIdAndUpdate(id, update, { new: true });

        if (!item) {
            return res.status(404).json({ error: 'News item not found' });
        }

        res.json(item);
    } catch (err) {
        console.error('Error updating news item:', err);
        res.status(500).json({ error: 'Failed to update news item' });
    }
});

// DELETE: Remove news/event (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const item = await NewsEvent.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({ error: 'News item not found' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting news item:', err);
        res.status(500).json({ error: 'Failed to delete news item' });
    }
});

module.exports = router;


