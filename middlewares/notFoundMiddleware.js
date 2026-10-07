module.exports = (req, res) => {
    req.analyticsData = {
        action: 'route_not_found'
    };
    return res.status(404).json({
        message: 'Endpoint not found'
    });
}