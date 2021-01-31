const express = require('express');
const authController = require('./../controllers/authControllers');
const userControllers = require('./../controllers/userControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', userControllers.getAllUsers);

module.exports = router;