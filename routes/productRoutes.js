const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productAttributesController = require('../controllers/productAttributeController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeProductOwner = require('../middlewares/authorizeProductOwnerMiddleware');
const getProductMiddleware = require('../middlewares/getProductMiddleware');

router.get('/', productController.getProducts);
router.get('/:id', getProductMiddleware, productController.getProductById);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, getProductMiddleware, authorizeProductOwner, productController.updateProduct);
router.delete('/:id', authMiddleware, getProductMiddleware, authorizeProductOwner, productController.deleteProduct);
router.post('/:id/attributes', authMiddleware,getProductMiddleware, authorizeProductOwner, productAttributesController.createAttribute);
router.get('/:id/attributes', authMiddleware, getProductMiddleware, authorizeProductOwner, productAttributesController.getProductAttributes);

module.exports = router;
