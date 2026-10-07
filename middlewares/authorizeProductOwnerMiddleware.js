module.exports = (req, res, next) => {
    if (req.product.ownerId !== req.userId) {
        req.analyticsData = {
            action: 'authorization_failed',
            reason: 'not_product_owner',
            productId: req.product.id,
            userId: req.userId
        };
        return res.status(403).json({
            message: 'Only the product owner can update this product'
        });
    }
    next();
}