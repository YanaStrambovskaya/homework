require('dotenv').config();

const express = require('express');
const config = require('./config/config');
const sequelize = require('./config/db');
require('./models');
// Importing the models registers their table definitions with Sequelize,
// allowing Sequelize to manage the tables in the database.

const connectMongoDB = require('./config/mongo');
const analyticsMiddleware = require('./middlewares/analyticsMiddleware');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(analyticsMiddleware);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use(notFoundMiddleware);
app.use(errorHandler);

const startServer = async () => {
    try {
        // MySQL is the primary DB for application data
        await sequelize.sync({ alter: true });

        // MongoDB stores analitycs data
        await connectMongoDB();

        // After both BDs are connected - start accepting the requests
        app.listen(config.port, () => {
            console.log(`Server runs on the port ${config.port}`);
        });
    } catch (err) {
        console.error("Application error:", err);
        process.exit(1); // Exit the process with an error code
    }
}
startServer();