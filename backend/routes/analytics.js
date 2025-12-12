const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Simple auth middleware
const ADMIN_TOKEN = 'indus-admin-secret-2024';

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

// GET: Analytics data
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Build date filter
        let dateFilter = {};
        if (startDate) {
            dateFilter.date = { $gte: new Date(startDate) };
        }
        if (endDate) {
            dateFilter.date = { ...dateFilter.date, $lte: new Date(endDate) };
        }

        // Total leads
        const totalLeads = await Lead.countDocuments();

        // Period leads
        const periodLeads = await Lead.countDocuments(dateFilter);

        // Conversion stats
        const admitted = await Lead.countDocuments({ ...dateFilter, status: 'Admitted' });
        const conversionRate = periodLeads > 0 ? Math.round((admitted / periodLeads) * 100) : 0;

        // Leads by class
        const leadsByClass = await Lead.aggregate([
            { $match: dateFilter },
            { $group: { _id: '$class', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Daily stats - filter out null dates
        const dailyStats = await Lead.aggregate([
            { $match: { ...dateFilter, date: { $ne: null, $exists: true } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    count: { $sum: 1 },
                    admitted: {
                        $sum: { $cond: [{ $eq: ['$status', 'Admitted'] }, 1, 0] }
                    }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 30 } // Limit to last 30 days for performance
        ]);

        res.json({
            totalLeads,
            periodLeads,
            conversionStats: {
                total: periodLeads,
                admitted,
                rate: conversionRate
            },
            leadsByClass,
            dailyStats
        });
    } catch (err) {
        console.error('Analytics error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
