const User = require('../models/User');

exports.getUserSettings = async (req, res,next) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: ['id','settings']
        });

        if (!user) {
            req.analyticsData = {
                action: 'get_user_settings_failed',
                reason: 'user_not_found',
                userId: req.userId,
            }
            return res.status(404).json({message: 'User not found'});
        }

        const settings = user.settings;

        req.analyticsData = {
            action: 'get_user_settings',
            userId: user.id,
        }
        return res.status(200).json({settings});
    } catch (err) {
        return next(err);
    }
}

exports.updateUserSettings = async (req, res, next) => {
    try {
        const {settings} = req.body;

        const user = await User.findByPk(req.userId, {
            attributes: ['id','settings']
        });
        if (!user) {
            req.analyticsData = {
                action: 'update_user_settings_failed',
                reason: 'user_not_found',
                userId: req.userId,
            }
            return res.status(404).json({message: 'User not found'});
        }

        if (!settings || typeof settings !== 'object') {
            req.analyticsData = {
                action: 'update_user_settings_failed',
                reason: 'invalid_settings_data',
                userId: req.userId,
            }
            return res.status(400).json({message: 'Invalid settings data'});
        }

        const mergedSettings = {...user.settings, ...settings}; // Merge existing settings with new ones
        user.settings = mergedSettings;
        await user.save();

        req.analyticsData = {
            action: 'update_user_settings',
            userId: user.id,
            changedKeys: Object.keys(settings)
        }

        return res.status(200).json({message: 'Settings saved successfully', mergedSettings});
    } catch (err) {
        return next(err);
    }
}