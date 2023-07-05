const Review = require('./../../model/users/reviewModel');
const factory = require('./../../handlers/handleFactory');
const AppError = require('./../../utils/appError');

exports.reviewMiddleware = (req, res, next) => {
    const productArr = ['plant', 'seed', 'fertilizer', 'soil', 'accessory'];
    const  product = req.body.product;
    const  product_id = req.body.product_id || req.params.id;
    const user = req.body.user || req.user.id;

    if (!productArr.includes(product)) return next(new AppError('No such product exist!', 400));
    if (!product_id) return next(new AppError('No product found!', 400));

    req.body = {
        ...req.body,
        [product]: product_id,
        user
    };
    req.body.product = undefined;
    req.body.product_id = undefined;
    next();
}

exports.get_reviews = factory.getAll(Review);
exports.get_review = factory.getOne(Review);
exports.create_review = factory.createOne(Review);
exports.update_review = factory.updateOne(Review);
exports.delete_review = factory.deleteOne(Review);