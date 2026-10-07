module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error(err)

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    if (!req.analyticsData) {
        req.analyticsData = {
            action: 'request_failed',
            reason: message,
            errorType: err.name
        };
    }

    return res.status(statusCode).json({
        message
    });
};