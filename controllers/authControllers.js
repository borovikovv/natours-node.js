const User = require('./../models/userModels');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppErrors');

exports.signup = catchAsync( async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if(!email && !password) {
        next(new AppError('Please provide email and password!', 400))
    }

    const token = "jfldkjfls"

    res.status(200).json({
        status: "success",
        token
    })
}