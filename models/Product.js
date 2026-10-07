const { DataTypes } = require('sequelize');
// We import data types from sequelize library to define the data type of the model's attributes
const sequelize = require('../config/db');
// We import the sequelize instance to connect this model to the configurated MySQL database
const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 of whitch are after the decimal point
        allowNull: false,
        validate: {
            min: 0
        }
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'owner_id',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
    },
    // Creating SQL forein-key relationship with User model
    // This SQL foreign-key connects one table with another one
    // Each Product`s owner value contains the id of the User who created it
}, {
    timestamps: false,
    tableName: 'products'
})


module.exports = Product;
