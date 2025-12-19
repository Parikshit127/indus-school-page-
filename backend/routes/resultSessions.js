const express = require('express');
const router = express.Router();

const ResultSession = require('../models/ResultSession');
const authMiddleware = require('../middleware/auth');

const generateSlug = (label) => {
    return label
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

// PUBLIC: Get active sessions with banners for frontend
router.get('/public', async (req, res) => {
    try {
        const sessions = await ResultSession.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 });

        res.json(sessions);
    } catch (err) {
        console.error('Error fetching public result sessions:', err);
        res.status(500).json({ error: 'Failed to fetch result sessions' });
    }
});

// ADMIN: List all sessions
router.get('/', authMiddleware, async (req, res) => {
    try {
        const sessions = await ResultSession.find({})
            .sort({ order: 1, createdAt: -1 });
        res.json(sessions);
    } catch (err) {
        console.error('Error fetching result sessions:', err);
        res.status(500).json({ error: 'Failed to fetch result sessions' });
    }
});

// ADMIN: Create new session
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { sessionLabel, description, isActive, order, banners } = req.body;

        if (!sessionLabel) {
            return res.status(400).json({ error: 'Session label is required' });
        }

        let slug = generateSlug(sessionLabel);
        let existing = await ResultSession.findOne({ slug });
        let counter = 1;
        while (existing) {
            slug = `${slug}-${counter}`;
            existing = await ResultSession.findOne({ slug });
            counter += 1;
        }

        const session = await ResultSession.create({
            sessionLabel,
            slug,
            description,
            isActive,
            order,
            banners: Array.isArray(banners) ? banners : []
        });

        res.status(201).json(session);
    } catch (err) {
        console.error('Error creating result session:', err);
        res.status(500).json({ error: 'Failed to create result session' });
    }
});

// ADMIN: Update session
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { sessionLabel, description, isActive, order, banners } = req.body;

        const update = {
            description,
            isActive,
            order
        };

        if (Array.isArray(banners)) {
            update.banners = banners;
        }

        if (sessionLabel) {
            update.sessionLabel = sessionLabel;
            let slug = generateSlug(sessionLabel);
            let existing = await ResultSession.findOne({ slug, _id: { $ne: id } });
            let counter = 1;
            while (existing) {
                slug = `${slug}-${counter}`;
                existing = await ResultSession.findOne({ slug, _id: { $ne: id } });
                counter += 1;
            }
            update.slug = slug;
        }

        const session = await ResultSession.findByIdAndUpdate(id, update, { new: true });

        if (!session) {
            return res.status(404).json({ error: 'Result session not found' });
        }

        res.json(session);
    } catch (err) {
        console.error('Error updating result session:', err);
        res.status(500).json({ error: 'Failed to update result session' });
    }
});

// ADMIN: Delete session
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const session = await ResultSession.findByIdAndDelete(id);

        if (!session) {
            return res.status(404).json({ error: 'Result session not found' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting result session:', err);
        res.status(500).json({ error: 'Failed to delete result session' });
    }
});

module.exports = router;


