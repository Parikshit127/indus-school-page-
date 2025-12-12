const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Lead = require('../models/Lead');

// Simple JWT-like auth (for demo - use proper JWT in production)
const ADMIN_TOKEN = 'indus-admin-secret-2024';

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email notification
const sendEmailNotification = async (lead) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `🎓 New Lead: ${lead.studentName} - Class ${lead.class}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%); color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">🏫 Indus Public School</h1>
                    <p style="margin: 5px 0 0 0;">New Lead Notification</p>
                </div>
                <div style="padding: 25px;">
                    <h2 style="color: #1e3a5f; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">New Admission Inquiry</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; width: 40%; color: #555;">👨‍🎓 Student Name:</td>
                            <td style="padding: 12px 0; color: #333;">${lead.studentName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">👨 Father's Name:</td>
                            <td style="padding: 12px 0; color: #333;">${lead.fatherName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">📞 Phone:</td>
                            <td style="padding: 12px 0; color: #333;"><a href="tel:${lead.phone}" style="color: #1e3a5f;">${lead.phone}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">📧 Email:</td>
                            <td style="padding: 12px 0; color: #333;"><a href="mailto:${lead.email}" style="color: #1e3a5f;">${lead.email}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">🎒 Class Applied:</td>
                            <td style="padding: 12px 0; color: #333;">${lead.class}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">🏙️ City:</td>
                            <td style="padding: 12px 0; color: #333;">${lead.city}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">🌍 State:</td>
                            <td style="padding: 12px 0; color: #333;">${lead.state}</td>
                        </tr>
                        ${lead.message ? `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">💬 Message:</td>
                            <td style="padding: 12px 0; color: #333;">${lead.message}</td>
                        </tr>
                        ` : ''}
                    </table>
                    <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; color: #666; font-size: 14px;">
                            📅 Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </p>
                    </div>
                </div>
                <div style="background: #1e3a5f; color: white; padding: 15px; text-align: center; font-size: 12px;">
                    <p style="margin: 0;">This is an automated notification from Indus Public School Lead Management System</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

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

// POST: Admin Login
router.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Simple auth for demo (use proper auth in production)
    if (email === 'admin@indusrohtak.com' && password === 'admin123') {
        return res.json({ success: true, token: ADMIN_TOKEN });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
});

// POST: Create a new lead
router.post('/', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();

        // Send email notification (don't wait for it to complete)
        sendEmailNotification(savedLead).then(success => {
            if (success) {
                console.log('Email sent for lead:', savedLead.studentName);
            } else {
                console.log('Failed to send email for lead:', savedLead.studentName);
            }
        });

        res.status(201).json(savedLead);
    } catch (err) {
        console.error("Error saving lead:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET: Get all leads (Protected)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ date: -1 });
        res.status(200).json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Update lead status
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.json(lead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
