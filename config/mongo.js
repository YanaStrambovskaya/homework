// Creating MongoDB connection module to the separate MongoDB analytics database

const mongoose = require('mongoose');

const connectMongoDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Missing required environment variable: MONGO_URI');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully')
}

module.exports = connectMongoDB;