const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// Op provides such operators as SQL's AND, OR, NOT, etc. to use in queries

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.analyticsData = {
                action: 'registration_failed',
                reason: 'missing_email_or_password',
                email,
            }
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const existingUser = await User.findOne({where: { email }});

        if (existingUser) {
            req.analyticsData = {
                action: 'registration_failed',
                reason: 'user_already_exists',
                email,
            }
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ email, password });

        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
        req.analyticsData = {
            action: 'registration',
            email,
        }
        return res.status(201).json({ token, user: { id: user.id, email } });
    } catch (err) {
        return next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.analyticsData = {
                action: 'login_failed',
                reason: 'missing_email_or_password',
                email,
            }
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ 
            where: {email}
         });
        if (!user) {
            req.analyticsData = {
                action: 'login_failed',
                reason: 'user_not_found',
                email,
            }
            return res.status(400).json({ message: 'Wrong login payload' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            req.analyticsData = {
                action: 'login_failed',
                reason: 'wrong_password',
                email,
            }
            return res.status(400).json({ message: 'Wrong credentials' });
        }

        const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });

        // Update the analytics data after authentication is successful
        req.analyticsData = {
            email,
            success: true,
            userId: user.id,
            action: "login"
        };

        return res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        return next(err);
    }
};

exports.getUserById = async (req,res, next) => {
    try {
        const user = await User.findByPk(req.params.id, { // find by parimary key
            attributes: ['id', 'email', 'registeredAt'] // return only these fields, exclude password
        });

        if (!user) {
            req.analyticsData = {
                action: 'getUserById_failed',
                reason: 'user_not_found',
                userId: req.userId,
            }
            return res.status(404).json({
                message: 'User not found'
            });
        }

        req.analyticsData = {
            userId: req.userId,
            action: 'getUserById'
        }
        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
}
