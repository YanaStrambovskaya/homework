const Product = require('../models/Product');

module.exports = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            req.analyticsData = {
                action: 'product_lookup_failed',
                reason: 'product_not_found',
                productId
            };
            return res.status(404).json({ message: 'Product not found' });
        }

        req.product = product;
        next();
    } catch (err) {
        return next(err);
    }
}