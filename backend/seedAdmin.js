const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const seedAdmin = async () => {
    try {
        // Check if admin exists
        const existingAdmin = await Admin.findOne({ email: 'vishesh.singal.contact@gmail.com' });

        if (existingAdmin) {
            console.log('Admin already exists. Updating password...');
            existingAdmin.password = 'admin123'; // Reset to default if run again
            await existingAdmin.save();
            console.log('Admin password updated to default: admin123');
        } else {
            const newAdmin = new Admin({
                email: 'vishesh.singal.contact@gmail.com',
                password: 'admin123'
            });
            await newAdmin.save();
            console.log('Admin created successfully with email: vishesh.singal.contact@gmail.com');
        }

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedAdmin();
