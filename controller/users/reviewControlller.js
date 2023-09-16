const Review = require('./../../model/users/reviewModel');
const factory = require('./../../handlers/handleFactory');

exports.get_reviews = factory.getAll(Review);
exports.get_review = factory.getOne(Review);
exports.create_review = factory.createOne(Review);
exports.update_review = factory.updateOne(Review);
exports.delete_review = factory.deleteOne(Review);