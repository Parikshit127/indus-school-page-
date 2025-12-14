const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const os = require('os');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir());
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File details:', {
            path: req.file.path,
            mimetype: req.file.mimetype,
            originalname: req.file.originalname
        });

        // Use 'auto' to let Cloudinary handle PDFs as images/documents for better viewing compatibility
        const resourceType = 'auto';
        
        console.log('Uploading with resource_type:', resourceType);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: resourceType,
            folder: "indus_school_hero",
            use_filename: true,
            unique_filename: true
        });

        // Clean up local file
        fs.unlinkSync(req.file.path);

        res.json({ 
            url: result.secure_url, 
            public_id: result.public_id, 
            resource_type: result.resource_type 
        });
    } catch (err) {
        console.error('Upload Error Details:', err);
        if (err.message) console.error('Error Message:', err.message);
        if (err.http_code) console.error('HTTP Code:', err.http_code);
        
        // Try to cleanup file even on error
        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkErr) {
                console.error('Failed to delete temp file:', unlinkErr);
            }
        }
        res.status(500).json({ error: err.message || 'Upload failed', details: err });
    }
});

module.exports = router;
