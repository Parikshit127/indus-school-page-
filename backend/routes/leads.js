const express = require('express');
const router = express.Router();
console.log("Loading leads.js route module...");
const nodemailer = require('nodemailer');
const Lead = require('../models/Lead');
const AdminOtp = require('../models/AdminOtp');
const LoginAttempt = require('../models/LoginAttempt');

// Simple JWT-like auth (for demo - use proper JWT in production)
const ADMIN_TOKEN = 'indus-admin-secret-2024';

// Email configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey', // This is the literal string 'apikey', not a placeholder
        pass: process.env.SENDGRID_API_KEY
    }
});

// Function to send email notification
const sendEmailNotification = async (lead) => {
    const mailOptions = {
        from: 'scrapshera01@gmail.com',
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

// POST: Admin Login - Request OTP
// POST: Admin Login - Request OTP
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password, securityCode } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Check for existing block
        const attemptRecord = await LoginAttempt.findOne({ ip });
        if (attemptRecord && attemptRecord.lockUntil && attemptRecord.lockUntil > Date.now()) {
            return res.status(403).json({ 
                error: `Too many failed attempts. Please try again in ${Math.ceil((attemptRecord.lockUntil - Date.now()) / 60000)} minutes.` 
            });
        }

        // Check security code first
        const envSecurityCode = process.env.ADMIN_SECURITY_CODE;
        if (envSecurityCode && securityCode !== envSecurityCode) {
            return res.status(401).json({ error: 'Invalid security code' });
        }
        
        if (password === 'admin123') { 
            // Reset attempts on success
            if (attemptRecord) {
                await LoginAttempt.deleteOne({ ip });
            }

             // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Remove any existing OTPs for this email to prevent clutter
            await AdminOtp.deleteMany({ email });
            
            // Save OTP
            await AdminOtp.create({ email, otp });

            // Send OTP via Email
            const mailOptions = {
                from: 'scrapshera01@gmail.com',
                to: email, // Send to the trying-to-login email
                subject: '🔐 Admin Login OTP - Indus Public School',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #1e3a5f;">Admin Login Verification</h2>
                        <p>Your OTP for Indus Public School Admin Dashboard is:</p>
                        <h1 style="color: #c9a227; letter-spacing: 5px;">${otp}</h1>
                        <p>This OTP is valid for 5 minutes.</p>
                        <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            return res.json({ success: true, message: 'OTP sent to email', otpSent: true });
        } else {
            // Track failed attempts
            const attempts = attemptRecord ? attemptRecord.attempts + 1 : 1;
            let lockUntil = undefined;
            
            if (attempts >= 5) {
                lockUntil = Date.now() + 5 * 60 * 1000; // Lock for 5 minutes
                
                // Send Security Alert Email
                 const alertOptions = {
                    from: 'scrapshera01@gmail.com',
                    to: process.env.ADMIN_EMAIL || 'vishesh.singal.contact@gmail.com',
                    subject: '🚨 SECURITY ALERT: Failed Admin Login Attempts',
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; border-left: 5px solid #d9534f;">
                            <h2 style="color: #d9534f;">Excessive Failed Login Attempts</h2>
                            <p>The IP Address <strong>${ip}</strong> has failed to log in 5 times continuously.</p>
                            <p><strong>Action Taken:</strong> Login blocked for 5 minutes.</p>
                            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                            <p style="margin-top:20px; font-size: 12px; color: #666;">If this was you, please wait 5 minutes and try again.</p>
                        </div>
                    `
                };
                transporter.sendMail(alertOptions).catch(console.error);
            }

            if (attemptRecord) {
                await LoginAttempt.updateOne({ ip }, { attempts, lockUntil });
            } else {
                await LoginAttempt.create({ ip, attempts, lockUntil });
            }
            
            return res.status(401).json({ 
                error: 'Invalid credentials', 
                attemptsRemaining: Math.max(0, 5 - attempts) 
            });
        }
    } catch (err) {
        console.error('Login Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Verify OTP
router.post('/auth/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const record = await AdminOtp.findOne({ email, otp });
        if (!record) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
        
        // Clear Used OTP
        await AdminOtp.deleteOne({ _id: record._id });
        
        return res.json({ success: true, token: ADMIN_TOKEN });
    } catch (err) {
        console.error('OTP Verify Error:', err);
        res.status(500).json({ error: 'Verification failed' });
    }
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

// POST: Add a note to a lead
router.post('/:id/notes', authMiddleware, async (req, res) => {
    console.log('Received add note request (v2 lean) for lead:', req.params.id);
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: 'Note content is required' });

        // Use lean() to get raw JSON, avoiding casting errors if DB schema mismatches
        const leadRaw = await Lead.findById(req.params.id).lean();
        if (!leadRaw) return res.status(404).json({ error: 'Lead not found' });

        let notesArray = [];

        // Handle existing array or legacy string
        if (Array.isArray(leadRaw.adminNotes)) {
            notesArray = leadRaw.adminNotes;
        } else if (typeof leadRaw.adminNotes === 'string' && leadRaw.adminNotes.trim()) {
            notesArray.push({ content: leadRaw.adminNotes, date: new Date() });
        }

        // Add new note
        notesArray.push({ content, date: new Date() });

        // Direct update to overwrite any schema inconsistencies
        await Lead.updateOne(
            { _id: req.params.id },
            { $set: { adminNotes: notesArray } }
        );

        // Fetch updated doc to return
        const updatedLead = await Lead.findById(req.params.id);

        console.log('Note added successfully (migrated if needed)');
        res.json(updatedLead);
    } catch (err) {
        console.error('Error adding note:', err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove a note from a lead
router.delete('/:id/notes/:noteId', authMiddleware, async (req, res) => {
    try {
        const leadRaw = await Lead.findById(req.params.id).lean();
        if (!leadRaw) return res.status(404).json({ error: 'Lead not found' });

        if (Array.isArray(leadRaw.adminNotes)) {
            const newNotes = leadRaw.adminNotes.filter(n => n._id.toString() !== req.params.noteId);
            await Lead.updateOne(
                { _id: req.params.id },
                { $set: { adminNotes: newNotes } }
            );
        }

        // Return updated document
        const updatedLead = await Lead.findById(req.params.id);
        res.json(updatedLead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
