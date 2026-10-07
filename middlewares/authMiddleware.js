const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        req.analyticsData = {
            action: 'authentication_failed',
            reason: 'missing_token'
        };
        return res.status(401).json({ message: 'Token was not found' });
    }

    const parts = authHeader.trim().split(/\s+/);
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        req.analyticsData = {
            action: 'authentication_failed',
            reason: 'invalid_token_format'
        };
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = parts[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            req.analyticsData = {
                action: 'authentication_failed',
                reason: 'invalid_or_expired_token'
            };
            return res.status(401).json({ message: 'Wrong token' });
        }
        req.userId = decoded.id;
        next();
    });
};
