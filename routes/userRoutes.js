const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.patch('/updateMe', authController.protect, userController.updateMe);

module.exports = router;
