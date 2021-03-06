const mongoose = require('mongoose');
const crypto = require('crypto');
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
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        require: [true, 'A User must be safe'],
        minlength: 8,
        select: false
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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
})

userSchema.pre('save', function(next) {
    if(!this.isModified || !this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswrdAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt / 1000, 10
        )

        return JWTTimestamp < changedTimestamp
    }

    return false;
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log({resetToken}, this.passwordResetToken);

    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;