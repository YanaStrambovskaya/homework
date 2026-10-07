// General application configuration file
// The DB connections are configurated separetly in config/db.js and config/mongo.js

// Values are read from environment variables loaded from .env file
// Fallbacks provided for convenience

module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET
};