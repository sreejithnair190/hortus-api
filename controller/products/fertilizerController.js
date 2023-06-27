const Fertilizers = require('./../../model/products/fertilizerModel');
const factory = require('./../../handlers/handleFactory');

exports.get_fertilizers = factory.getAll(Fertilizers);
exports.create_fertilizers = factory.createOne(Fertilizers);
exports.get_fertilizers = factory.getOne(Fertilizers);
exports.update_fertilizers = factory.updateOne(Fertilizers);
exports.delete_fertilizers = factory.deleteOne(Fertilizers);