const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const admins = await Admin.find({});
        console.log('Admins in database:');
        admins.forEach(a => console.log(`  - Email: ${a.email}, ID: ${a._id}`));
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
