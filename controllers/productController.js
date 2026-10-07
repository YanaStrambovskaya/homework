const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || price === undefined) {
            req.analyticsData = {
                action: "product_create_failed",
                reason: "missing_required_fields",
                userId: req.userId,
            }
            return res.status(400).json({ message: 'Name, description and price are required' });
        }

        const numericPrice = Number(price); // Convert price to a number

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            req.analyticsData = {
                action: "product_create_failed",
                reason: "invalid_price",
                userId: req.userId,
            }
            return res.status(400).json({
                message: 'Price must be a non-negative number'
            });
        }

        const product = await Product.create({ 
            name,
            description,
            price: numericPrice,
            ownerId: req.userId 
        });

        req.analyticsData = {
            action: 'product_created',
            productId: product.id,
            ownerId: req.userId,
            product: {
                name: product.name,
                price: product.price
            }
        }
        return res.status(201).json(product);
    } catch (err) {
        return next(err);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        
        req.analyticsData = {
            action: 'products_listed',
            resultCount: products.length
        };
        return res.status(200).json(products);
    } catch (err) {
        return next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        req.analyticsData = {
            action: 'product_by_id',
            productId: req.params.id
        };
        return res.status(200).json(req.product);
    } catch (err) {
        return next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;

        if (name !== undefined) {
            
            if (!name) {
                req.analyticsData = {
                    action: 'product_update_failed',
                    reason: 'name_empty',
                    productId: req.params.id,
                    userId: req.userId
                };
                return res.status(400).json({
                    message: 'Name cannot be empty'
                });
            }
            req.product.name = name;
        }

        if (description !== undefined) {
            if (!description) {
                req.analyticsData = {
                    action: 'product_update_failed',
                    reason: 'description_empty',
                    productId: req.params.id,
                    userId: req.userId
                };
                return res.status(400).json({
                    message: 'Description cannot be empty'
                });
            }

            req.product.description = description;
        }

        if (price !== undefined) {
            const numericPrice = Number(price);

            if (!Number.isFinite(numericPrice) || numericPrice < 0) {
                req.analyticsData = {
                    action: 'product_update_failed',
                    reason: 'invalid_price',
                    productId: req.params.id,
                    userId: req.userId
                };
                return res.status(400).json({
                    message: 'Price must be a non-negative number'
                });
            }

            req.product.price = numericPrice;
        }
        await req.product.save();
        req.analyticsData = {
            action: 'product_updated',
            productId: req.product.id,
            userId: req.userId
        };
        return res.status(200).json(req.product);
    } catch (err) {
        return next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try{

        await req.product.destroy();
        
        req.analyticsData = {
            action: 'product_deleted',
            productId: req.params.id,
            userId: req.userId
        };
        
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        return next(err);
    }
};
