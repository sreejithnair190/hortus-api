const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../model/users/userModel");
const catchAsync = require("./../handlers/handleAsyncErr");
const AppError = require("./../utils/appError");


exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not Logged in", 403));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("User with this token doesn't exist", 403));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError("User recently changed password. Please login again", 403)
        );
    }

    req.user = currentUser;
    next();
})


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You don't have permission to perform this action", 403)
            );
        }

        next();
    };
};