const Categories = require('../../model/products/categoryModel');
const factory = require('../../handlers/handleFactory');

exports.get_categories = factory.getAll(Categories);
exports.get_category = factory.getOne(Categories);
exports.create_category = factory.createOne(Categories);
exports.update_category = factory.updateOne(Categories);
exports.delete_category = factory.deleteOne(Categories);