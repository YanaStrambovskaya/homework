const mongoose = require('mongoose');

// An event has a common schema, 
// while 'data' can contain different information
// depending on the endpoint
const analyticsEventsSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    durationMs: {
        type: Number,
        required: true,
        min: 0
    },
    statusCode: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'analytics_events',
    versionKey: false
    // Prevents Mongoose from adding unnecessary __v field to the document
});

module.exports = mongoose.model('AnalyticsEvent', analyticsEventsSchema)