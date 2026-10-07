const { Sequelize } = require('sequelize');

const sequelize =  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

module.exports = sequelize

// We created one shared Sequelize instance for the entire applicatiob
// Read the MySQL credentials from invironment variables
// Use the mysql2 drive through the dialect option
// Disable raw MySQL logging
// Export the connection to use by the models and server