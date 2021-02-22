const express = require('express');
const authController = require('./../controllers/authControllers');
const userControllers = require('./../controllers/userControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);


router.get('/', userControllers.getAllUsers);

module.exports = router;