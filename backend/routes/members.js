const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const authMiddleware = require('../middleware/auth');

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await Member.find().sort({ order: 1, createdAt: 1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a member (Protected)
router.post('/', authMiddleware, async (req, res) => {
    const member = new Member({
        name: req.body.name,
        relation: req.body.relation,
        designation: req.body.designation,
        order: req.body.order || 0
    });

    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a member (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        if (req.body.name != null) member.name = req.body.name;
        if (req.body.relation != null) member.relation = req.body.relation;
        if (req.body.designation != null) member.designation = req.body.designation;
        if (req.body.order != null) member.order = req.body.order;

        const updatedMember = await member.save();
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a member (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        await member.deleteOne();
        res.json({ message: 'Member deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
