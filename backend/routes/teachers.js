const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const authMiddleware = require('../middleware/auth');

// GET all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ order: 1, createdAt: 1 });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new teacher
router.post('/', authMiddleware, async (req, res) => {
    const teacher = new Teacher({
        teacherCode: req.body.teacherCode,
        name: req.body.name,
        gender: req.body.gender,
        teacherType: req.body.teacherType,
        qualification: req.body.qualification,
        classesTaught: req.body.classesTaught,
        order: req.body.order || 0
    });

    try {
        const newTeacher = await teacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update teacher
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        if (req.body.teacherCode) teacher.teacherCode = req.body.teacherCode;
        if (req.body.name) teacher.name = req.body.name;
        if (req.body.gender) teacher.gender = req.body.gender;
        if (req.body.teacherType) teacher.teacherType = req.body.teacherType;
        if (req.body.qualification) teacher.qualification = req.body.qualification;
        if (req.body.classesTaught) teacher.classesTaught = req.body.classesTaught;
        if (req.body.order !== undefined) teacher.order = req.body.order;

        const updatedTeacher = await teacher.save();
        res.json(updatedTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE teacher
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        await teacher.deleteOne();
        res.json({ message: 'Teacher deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
