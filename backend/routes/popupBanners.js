const express = require('express');
const router = express.Router();
const PopupBanner = require('../models/PopupBanner');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'popup-banners' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

// GET active banners for frontend display
router.get('/active', async (req, res) => {
    try {
        const now = new Date();
        const banners = await PopupBanner.find({
            isActive: true,
            $or: [
                { endDate: null },
                { endDate: { $gte: now } }
            ],
            startDate: { $lte: now }
        }).sort({ displayOrder: 1 });

        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all banners (admin)
router.get('/', async (req, res) => {
    try {
        const banners = await PopupBanner.find().sort({ createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single banner
router.get('/:id', async (req, res) => {
    try {
        const banner = await PopupBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        res.json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new banner with images
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const { title, isActive, displayOrder, startDate, endDate } = req.body;

        // Upload images to Cloudinary
        const imageUploads = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                imageUploads.push({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        }

        const banner = new PopupBanner({
            title,
            images: imageUploads,
            isActive: isActive === 'true' || isActive === true,
            displayOrder: parseInt(displayOrder) || 0,
            startDate: startDate ? new Date(startDate) : new Date(),
            endDate: endDate ? new Date(endDate) : null
        });

        await banner.save();
        res.status(201).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update banner
router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const { title, isActive, displayOrder, startDate, endDate, existingImages } = req.body;

        const banner = await PopupBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Parse existing images to keep
        let imagesToKeep = [];
        if (existingImages) {
            try {
                imagesToKeep = JSON.parse(existingImages);
            } catch (e) {
                imagesToKeep = [];
            }
        }

        // Upload new images
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                imagesToKeep.push({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        }

        banner.title = title || banner.title;
        banner.images = imagesToKeep;
        banner.isActive = isActive === 'true' || isActive === true;
        banner.displayOrder = parseInt(displayOrder) || banner.displayOrder;
        banner.startDate = startDate ? new Date(startDate) : banner.startDate;
        banner.endDate = endDate ? new Date(endDate) : null;

        await banner.save();
        res.json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE banner
router.delete('/:id', async (req, res) => {
    try {
        const banner = await PopupBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Delete images from Cloudinary
        for (const image of banner.images) {
            if (image.publicId) {
                try {
                    await cloudinary.uploader.destroy(image.publicId);
                } catch (e) {
                    console.error('Failed to delete image from Cloudinary:', e);
                }
            }
        }

        await PopupBanner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH toggle active status
router.patch('/:id/toggle', async (req, res) => {
    try {
        const banner = await PopupBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        banner.isActive = !banner.isActive;
        await banner.save();
        res.json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
