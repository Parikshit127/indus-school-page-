const express = require('express');
const router = express.Router();
const PageContent = require('../models/PageContent');

const authMiddleware = require('../middleware/auth');

// GET: Get content for a specific section
router.get('/:section', async (req, res) => {
    try {
        let content = await PageContent.findOne({ section: req.params.section });

        // Return default structure if not found (first time setup)
        if (!content && req.params.section === 'hero') {
            content = new PageContent({
                section: 'hero',
                data: {
                    hero: {
                        mediaType: 'image',
                        mediaUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070',
                        announcement: {
                            text: 'Admissions Open for 2024-25',
                            isActive: true,
                            link: '#admissions'
                        },
                        admission: {
                            deadline: '31st March 2024',
                            gradesOpen: 'Nursery to XII',
                            ctaText: 'Apply Now'
                        },
                        stats: {
                            years: 25,
                            students: 2500,
                            teachers: 150,
                            boardResults: '100%'
                        }
                    }
                }
            });
            await content.save();
        }

        res.json(content ? content.data[req.params.section] : {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Update content for a specific section
router.put('/:section', authMiddleware, async (req, res) => {
    try {
        const updateData = {};
        updateData[`data.${req.params.section}`] = req.body;

        const content = await PageContent.findOneAndUpdate(
            { section: req.params.section },
            {
                $set: updateData,
                lastUpdated: Date.now()
            },
            { new: true, upsert: true } // Create if doesn't exist
        );

        res.json(content.data[req.params.section]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
