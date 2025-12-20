const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const AchievementBanner = require('../models/AchievementBanner');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'achievement-banners' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

/* --- ACHIEVEMENT TABLE ROUTES --- */

// GET all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new achievement
router.post('/', async (req, res) => {
    try {
        const { studentName, achievement, category, class: studentClass, date, order } = req.body;
        const newAchievement = new Achievement({
            id: new Date().getTime().toString(), // Simple ID generation
            studentName,
            achievement,
            category,
            class: studentClass,
            date: date || new Date(),
            order: parseInt(order) || 0
        });
        await newAchievement.save();
        res.status(201).json(newAchievement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE achievement
router.delete('/:id', async (req, res) => {
    try {
        await Achievement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* --- ACHIEVEMENT BANNER Routes --- */

// GET all banners
router.get('/banners', async (req, res) => {
    try {
        const banners = await AchievementBanner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new banner
router.post('/banners', upload.single('image'), async (req, res) => {
    try {
        const { title, order, isActive } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const result = await uploadToCloudinary(req.file.buffer);

        const banner = new AchievementBanner({
            title,
            imageUrl: result.secure_url,
            publicId: result.public_id,
            order: parseInt(order) || 0,
            isActive: isActive === 'true' || isActive === true
        });

        await banner.save();
        res.status(201).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE banner
router.delete('/banners/:id', async (req, res) => {
    try {
        const banner = await AchievementBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        if (banner.publicId) {
            try {
                await cloudinary.uploader.destroy(banner.publicId);
            } catch (e) {
                console.error('Failed to delete image from Cloudinary:', e);
            }
        }

        await AchievementBanner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
