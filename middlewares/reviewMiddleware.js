const AppError = require('./../utils/appError');

exports.reviewMiddleware = (req, res, next) => {
    const product = req.params.id;
    const user = req.user.id;

    req.body = {
        ...req.body,
        user,
        product
    }
    next();
}