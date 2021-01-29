const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        require: [true, 'Please, confirm you password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Password are not the same!'
        }
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;