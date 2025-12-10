require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const Lead = require('./models/Lead');

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Indus Public School Backend is Running');
});

// GET Leads (Admin) - Sorted by newest
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});

// POST Lead (Form Submission)
app.post('/api/leads', async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, lead });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: Object.values(err.errors).map(val => val.message).join(', ') });
        }
        res.status(500).json({ error: 'Server Error' });
    }
});

// GET Analytics
app.get('/api/analytics', async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();

        // Aggregation: Leads by Class
        const leadsByClass = await Lead.aggregate([
            { $group: { _id: "$class", count: { $sum: 1 } } }
        ]);

        // Trend: Last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentLeads = await Lead.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Daily Stats for Chart (Last 14 days)
        const dailyStats = await Lead.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 14)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalLeads,
            leadsByClass,
            recentLeads,
            dailyStats,
            generatedAt: new Date()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Analytics Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
