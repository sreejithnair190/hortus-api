const User = require("../../model/users/userModel");
const factory = require("../../handlers/handleFactory");
const catchAsync = require("./../../handlers/handleAsyncErr");
const AppError = require("./../../utils/appError")

exports.get_all_users = factory.getAll(User);
exports.get_user = factory.getOne(User);
exports.update_user = factory.updateOne(User);
exports.delete_user = factory.deleteOne(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {

    if (req.body.password || req.body.passwordConfirm)
        return next(new AppError("This route is not for password updates.", 400))

    if (req.body.email)
        return next(new AppError("You cannot change your email.", 400))

    if (req.file) req.photo = req.file.filename;

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
        status: 'success',
        data: user,
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});

    res.status(200).json({
        status: 'success',
        data: null,
    });
});