const mongoose = require('mongoose');
const GalleryItem = require('./models/GalleryItem');
require('dotenv').config();

const sampleGalleryData = [
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop',
        title: 'Annual Sports Day 2024',
        category: 'Sports',
        date: new Date('2024-12-01')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop',
        title: 'Stress Management Workshop',
        category: 'Activities',
        date: new Date('2024-11-15')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
        title: 'Shree Krishna Janmashtami Celebration',
        category: 'Cultural',
        date: new Date('2024-08-26')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2070&auto=format&fit=crop',
        title: 'Independence Day Celebration',
        category: 'Cultural',
        date: new Date('2024-08-15')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
        title: 'ATL Workshop 2024',
        category: 'Academic',
        date: new Date('2024-07-08')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
        title: 'Annual Function 2024',
        category: 'Events',
        date: new Date('2024-12-10')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop',
        title: 'Classroom Learning Activities',
        category: 'Academic',
        date: new Date('2024-11-20')
    },
    {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop',
        title: 'Music and Arts Program',
        category: 'Cultural',
        date: new Date('2024-10-15')
    },
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/nLIqYHAdONM',
        title: 'School Campus Tour 2024',
        category: 'Events',
        date: new Date('2024-12-05')
    },
    {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        title: 'Annual Day Performance Highlights',
        category: 'Cultural',
        date: new Date('2024-11-25')
    }
];

async function seedGallery() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await GalleryItem.deleteMany({});
        console.log('Cleared existing gallery data');

        // Insert sample data
        await GalleryItem.insertMany(sampleGalleryData);
        console.log('Sample gallery data inserted successfully');

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding gallery:', error);
        process.exit(1);
    }
}

seedGallery();