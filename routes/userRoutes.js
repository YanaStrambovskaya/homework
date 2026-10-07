const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const userSettingsController = require('../controllers/userSettingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/settings', authMiddleware, userSettingsController.getUserSettings);
router.put('/settings', authMiddleware, userSettingsController.updateUserSettings);
router.get('/:id', authController.getUserById);

module.exports = router;
