const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const ProductAttribute = sequelize.define('ProductAttribute', {
    attributeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        // Define a custom primary key named attributeId instead of Sequelize's default id.
        // The database generates its value automatically.
         // We define the id explicitly, decpite MySQL can create it automatically.
        // We do this because we want to use 'attributeId' as a key name instead simle and common 'id'
        allowNull: false,
        field: 'attribute_id',
    },
    productId: { // defines the product attribute belongs to.
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
    },
    attributeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'attribute_name',
        validate: {
            notEmpty: true, // Validate empty string
        }
    },
    attributeValue: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field : 'attribute_value',
        validate: {
            notEmpty: true, // Validate empty string
        }
    },

}, {
    tableName: 'product_attributes',
    timestamps: false,
})


module.exports = ProductAttribute;