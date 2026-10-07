const AnalyticsEvent = require('../models/AnalyticsEvent');

// This middleware stores the analytics data from every request
// after the HTTP response has already been sent to user

const analyticsMiddleware = (req, res, next) => {
    const startedAt = Date.now(); // timestamp when the request started

    // Register a listener to the completed response
    // 'finish' runs after the response has been sent to the user
    // so the status is avaliable, 
    // the reuest duration can be calculated, 
    // and the controllers may have added endpoint-spesific analytics data
    res.on('finish', () => {
        const event = {
            endpoint: `${req.method} ${req.originalUrl.split('?')[0]}`, // Exclude query parameters
            path: req.originalUrl.split('?')[0], // Exclude query parameters
            method: req.method,
            data: req.analyticsData || {},
            durationMs: Date.now() - startedAt,
            statusCode: res.statusCode,
            timestamp:Date.now()
        }
        AnalyticsEvent.create(event)
            .then(() => console.log('Analytics event stored successfully'))
            .catch(err => console.error('Error storing analytics event:', err));
    })

    next();
}

module.exports = analyticsMiddleware;