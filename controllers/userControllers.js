const User = require('./../models/userModels');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppErrors');

const filteredObject = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    })

    return newObj;
};

exports.updateMe = catchAsync( async (req, res, next) => {

    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This routes is not password updated, please use /updateMyPassword', 400));
    }

    const filterdBody = filteredObject(req.body, "email", "name");
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterdBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: updateUser
    })
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
})