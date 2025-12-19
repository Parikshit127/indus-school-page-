const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/indus-school')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Indus Public School API Running');
});

// Import Routes
const leadRoutes = require('./routes/leads');
const analyticsRoutes = require('./routes/analytics');

app.use('/api/leads', leadRoutes);
const contentRoutes = require('./routes/content');
app.use('/api/analytics', analyticsRoutes);
app.use('/api/content', contentRoutes);
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
const galleryRoutes = require('./routes/gallery');
app.use('/api/gallery', galleryRoutes);
const membersRoutes = require('./routes/members');
const teachersRoutes = require('./routes/teachers');
app.use('/api/members', membersRoutes);
app.use('/api/teachers', teachersRoutes);
const newsEventsRoutes = require('./routes/newsEvents');
app.use('/api/news-events', newsEventsRoutes);
const resultSessionsRoutes = require('./routes/resultSessions');
app.use('/api/result-sessions', resultSessionsRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
