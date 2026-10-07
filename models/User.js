const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
// The imported sequelize instance connects this model to the configurated MySQL database

const User = sequelize.define('User', {
    // Why this is nor 'primary key' : true? But attribuer model has primaryKey: true??????
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    settings: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            theme: 'light',
            notifications: true,
            language: 'en'
        }
    },
    registeredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'registered_at'
    }
}, {
    tableName: 'users',
    //Without explicitly specifying tableName, 
    // Sequelize can automatically determine/pluralize 
    // the table name based on the model name. 
    // Setting it explicitly removes ambiguity.
    timestamps: false
    // prevents Sequelize from adding createdAt and updatedAt. 
    // The homework explicitly needs a registration date, 
    // so we use the clearer registered_at column instead.
});

// Hash the password before inserting the user into the DB
User.beforeCreate(async(user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
})

// Hash the password again when the existing user's password is updated
User.beforeUpdate(async(user) => {
    if (user.changed('password')) {
        // this condition prevents already hashed password from being hashed again 
        //if unrelated fields are updated
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
})

// Compare the plain user's password to the stored hashed password
User.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = User;