const Fertilizers = require('./../../model/products/fertilizerModel');
const factory = require('./../../handlers/handleFactory');

exports.get_fertilizers = factory.getAll(Fertilizers);
exports.create_fertilizer = factory.createOne(Fertilizers);
exports.get_fertilizer = factory.getOne(Fertilizers, { path: 'reviews' });
exports.update_fertilizer = factory.updateOne(Fertilizers);
exports.delete_fertilizer = factory.deleteOne(Fertilizers);