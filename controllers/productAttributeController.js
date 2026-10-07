const ProductAttribute = require('../models/ProductAttribute');

exports.createAttribute = async (req, res, next) => {
    try {
        const {attributeName, attributeValue} = req.body;
        const productId = req.params.id;

        // Validation
        if (!attributeName || !attributeValue) {
            req.analyticsData = {
                action: "attribute_create_failed",
                reason: "missing_attribute_name_or_value",
                productId,
                userId: req.userId,
            }
            return res.status(400).json({message: 'Attribute name and value are required'});
        }

        const attribute = await ProductAttribute.create({
            productId: req.product.id, 
            attributeName,
            attributeValue
        })

        req.analyticsData = {
            action: "attribute_create_completed",
            productId: req.product.id,
            attributeName: attribute.attributeName,
            attributeValue: attribute.attributeValue,
            userId: req.userId,
        }

        return res.status(201).json({message: 'Attribute created successfully', attribute});
    } catch (err) {
        return next(err);
    }
}

exports.getProductAttributes = async (req, res, next) => {
    try {
        const attributes = await ProductAttribute.findAll({
            where: {
                productId: req.product.id,
            },
            order: [['attributeId', 'ASC']]
        })

        req.analyticsData = {
            action: "get_product_attributes",
            productId: req.product.id,
            attributeCount: attributes.length,
            userId: req.userId,
        }
        return res.status(200).json({message: `Successfully`, attributes})
    } catch (err) {
        return next(err);
    }
}