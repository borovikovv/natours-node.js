const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please, tell us your name']
    },
    email: {
        type: String,
        require: [true, 'Please, provide your email'],
        unique: true,
        lowercase: true,
        // validate: [validator.isEmail, 'Please provide your email!']
    },
    photo: {
        type: String    },
    password: {
        type: String,
        require: [true, 'A User must be safe'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Please, confirm you password']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;