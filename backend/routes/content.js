const express = require('express');
const router = express.Router();
const PageContent = require('../models/PageContent');

const authMiddleware = require('../middleware/auth');

// GET: Get content for a specific section
const CalendarFile = require('../models/CalendarFile');
const FeesFile = require('../models/FeesFile');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve Calendar PDF from DB
router.get('/calendar/pdf', async (req, res) => {
    try {
        const fileDoc = await CalendarFile.findOne().sort({ uploadedAt: -1 });
        if (!fileDoc) return res.status(404).send('No calendar found');
        
        res.set('Content-Type', fileDoc.contentType);
        res.set('Content-Disposition', `inline; filename="${fileDoc.filename}"`);
        res.send(fileDoc.data);
    } catch (err) {
        console.error('Error serving PDF:', err);
        res.status(500).send('Error retrieving file');
    }
});

// Upload Calendar PDF to DB
router.post('/calendar/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        // Save file to MongoDB
        const newFile = new CalendarFile({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });
        await newFile.save();

        // Update generic content metadata
        // Update generic content metadata
        const baseUrl = process.env.API_URL || `${req.protocol}://${req.get('host')}`;
        const pdfUrl = `${baseUrl}/api/content/calendar/pdf`;

        await PageContent.findOneAndUpdate(
            { section: 'calendar' },
            { 
                $set: { 
                    'data.calendar.pdfUrl': pdfUrl,
                    'data.calendar.lastUpdated': Date.now() 
                } 
            },
            { upsert: true }
        );

        res.json({ url: pdfUrl });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Serve Fees PDF from DB
router.get('/fees/pdf', async (req, res) => {
    try {
        const fileDoc = await FeesFile.findOne().sort({ uploadedAt: -1 });
        if (!fileDoc) return res.status(404).send('No fees document found');
        
        res.set('Content-Type', fileDoc.contentType);
        res.set('Content-Disposition', `inline; filename="${fileDoc.filename}"`);
        res.send(fileDoc.data);
    } catch (err) {
        console.error('Error serving PDF:', err);
        res.status(500).send('Error retrieving file');
    }
});

// Upload Fees PDF to DB
router.post('/fees/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        // Save file to MongoDB
        const newFile = new FeesFile({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });
        await newFile.save();

        const baseUrl = process.env.API_URL || `${req.protocol}://${req.get('host')}`;
        const pdfUrl = `${baseUrl}/api/content/fees/pdf`;

        await PageContent.findOneAndUpdate(
            { section: 'fees' },
            { 
                $set: { 
                    'data.fees.pdfUrl': pdfUrl,
                    'data.fees.lastUpdated': Date.now() 
                } 
            },
            { upsert: true }
        );

        res.json({ url: pdfUrl });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message });
    }
});

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

        // Dynamic URL fix for deployed environments
        if (req.params.section === 'calendar' && content && content.data && content.data.calendar) {
            const baseUrl = process.env.API_URL || `${req.protocol}://${req.get('host')}`;
            content.data.calendar.pdfUrl = `${baseUrl}/api/content/calendar/pdf`;
        }

        if (req.params.section === 'fees' && content && content.data && content.data.fees) {
            const baseUrl = process.env.API_URL || `${req.protocol}://${req.get('host')}`;
            content.data.fees.pdfUrl = `${baseUrl}/api/content/fees/pdf`;
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
