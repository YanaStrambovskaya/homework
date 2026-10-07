const User = require('./User');
const Product = require('./Product');
const ProductAttribute = require('./ProductAttribute');

Product.hasMany(ProductAttribute, {foreignKey: 'productId'}); 
ProductAttribute.belongsTo(Product, {foreignKey: 'productId', onDelete: 'CASCADE'});
// onDelete: 'CASCADE' - when Product is deleted the associated attribues are deleted automatically.
User.hasMany(Product, { foreignKey: 'ownerId' });
 // The User can own many Products, but each Product can only have one User as its owner
Product.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'RESTRICT' }); 
// Each Product belongs to one User, User can not be deleted if they has associated Products.

module.exports = {
    User,
    Product,
    ProductAttribute
};