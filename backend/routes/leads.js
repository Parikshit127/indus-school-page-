const express = require('express');
const router = express.Router();
console.log("Loading leads.js route module...");
const nodemailer = require('nodemailer');
const Lead = require('../models/Lead');
const Admin = require('../models/Admin');
const AdminOtp = require('../models/AdminOtp');
const LoginAttempt = require('../models/LoginAttempt');

// Simple JWT-like auth (for demo - use proper JWT in production)
const ADMIN_TOKEN = 'indus-admin-secret-2024';

// Email configuration
// Email configuration
let transporter;

if (process.env.SENDGRID_API_KEY) {
    console.log('Using SendGrid for emails');
    transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY
        }
    });
} else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('Using Gmail SMTP for emails');
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
} else {
    console.warn('⚠️ NO EMAIL CONFIGURATION FOUND! Emails will not be sent.');
    // Create a dummy transporter to prevent crashes
    transporter = nodemailer.createTransport({
        jsonTransport: true
    });
}

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ EMAIL CONNECTION ERROR:', error);
    } else {
        console.log('✅ Email Server is ready to take our messages');
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
// GET: Debug Email Configuration
router.get('/auth/debug-email', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: 'Please provide email query param: ?email=your@email.com' });
        
        const configStatus = {
            hasSendGrid: !!process.env.SENDGRID_API_KEY,
            hasGmailUser: !!process.env.EMAIL_USER,
            hasGmailPass: !!process.env.EMAIL_PASS,
            activeTransporter: process.env.SENDGRID_API_KEY ? 'SendGrid' : (process.env.EMAIL_USER ? 'Gmail' : 'Dummy/None')
        };

        console.log('Debug Email Request:', { email, config: configStatus });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER || 'scrapshera01@gmail.com',
            to: email,
            subject: 'Debug Email Test - Indus Public School',
            text: `This is a test email from your deployed server.\n\nConfiguration Status:\n${JSON.stringify(configStatus, null, 2)}`
        });

        res.json({ 
            success: true, 
            message: 'Email sent successfully (check inbox & spam)', 
            messageId: info.messageId, 
            config: configStatus,
            note: configStatus.activeTransporter === 'Dummy/None' ? 'WARNING: No email config found, using dummy transport (no real email sent)' : 'Real transport used'
        });
    } catch (error) {
        console.error('Debug Email Failed:', error);
        res.status(500).json({ 
            error: 'Email Sending Failed', 
            details: error.message, 
            config: {
                hasSendGrid: !!process.env.SENDGRID_API_KEY,
                hasGmailUser: !!process.env.EMAIL_USER
            }
        });
    }
});

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

        // Check admin credentials in database
        const admin = await Admin.findOne({ email });
        let isMatch = false;
        if (admin) {
            isMatch = await admin.comparePassword(password);
        }

        if (isMatch) {
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
                from: process.env.EMAIL_USER || 'scrapshera01@gmail.com',
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

            transporter.sendMail(mailOptions).catch(err => console.error('Error sending login OTP:', err));
            return res.json({ success: true, message: 'OTP sent to email', otpSent: true });
        } else {
            // Track failed attempts
            const attempts = attemptRecord ? attemptRecord.attempts + 1 : 1;
            let lockUntil = undefined;

            if (attempts >= 5) {
                lockUntil = Date.now() + 5 * 60 * 1000; // Lock for 5 minutes

                // Send Security Alert Email
                const alertOptions = {
                    from: process.env.EMAIL_USER || 'scrapshera01@gmail.com',
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

// POST: Forgot Password - Request OTP
router.post('/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Forgot password request for:', email);

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log('Admin not found for email:', email);
            // Don't reveal if email exists or not for security
            return res.json({ success: true, message: 'If this email exists, an OTP has been sent' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated OTP for password reset:', otp);

        // Remove any existing OTPs for this email
        await AdminOtp.deleteMany({ email });

        // Save OTP with reset flag
        await AdminOtp.create({ email, otp, isPasswordReset: true });
        console.log('OTP saved to database');

        // Send OTP via Email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'scrapshera01@gmail.com',
            to: email,
            subject: '🔐 Password Reset OTP - Indus Public School',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #1e3a5f;">Password Reset Request</h2>
                    <p>You have requested to reset your password for Indus Public School Admin Dashboard.</p>
                    <p>Your OTP for password reset is:</p>
                    <h1 style="color: #c9a227; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP is valid for 5 minutes.</p>
                    <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                </div>
            `
        };

        console.log('Attempting to send email to:', email);
        transporter.sendMail(mailOptions).catch(err => console.error('Error sending reset OTP:', err));
        console.log('Password reset OTP email process initiated');
        return res.json({ success: true, message: 'OTP sent to email' });
    } catch (err) {
        console.error('Forgot Password Error:', err);
        console.error('Error details:', err.message);
        if (err.response) {
            console.error('Email service response:', err.response);
        }
        return res.status(500).json({ error: 'Failed to process request' });
    }
});

// POST: Verify Reset OTP
router.post('/auth/verify-reset-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        const record = await AdminOtp.findOne({ email, otp, isPasswordReset: true });
        if (!record) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // Don't delete OTP yet - keep it for password reset verification
        // Mark it as verified
        record.verified = true;
        await record.save();

        return res.json({ success: true, message: 'OTP verified successfully' });
    } catch (err) {
        console.error('Verify Reset OTP Error:', err);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// POST: Reset Password
router.post('/auth/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: 'Email, OTP, and new password are required' });
        }

        // Validate password strength
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Verify OTP one more time
        const record = await AdminOtp.findOne({ email, otp, isPasswordReset: true });
        if (!record) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // Find admin and update password
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Update password (will be hashed by pre-save hook)
        admin.password = newPassword;
        await admin.save();

        // Clear the OTP
        await AdminOtp.deleteOne({ _id: record._id });

        // Send confirmation email
        const mailOptions = {
            from: 'scrapshera01@gmail.com',
            to: email,
            subject: '✅ Password Reset Successful - Indus Public School',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #1e3a5f;">Password Reset Successful</h2>
                    <p>Your password for Indus Public School Admin Dashboard has been successfully reset.</p>
                    <p>You can now log in with your new password.</p>
                    <p style="font-size: 12px; color: #888; margin-top: 20px;">If you didn't make this change, please contact support immediately.</p>
                </div>
            `
        };

        transporter.sendMail(mailOptions).catch(err => console.error('Error sending reset confirmation:', err));

        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        console.error('Reset Password Error:', err);
        res.status(500).json({ error: 'Failed to reset password' });
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
