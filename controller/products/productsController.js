const Products = require('./../../model/products/productModel')
const factory = require('./../../handlers/handleFactory');

exports.get_products = factory.getAll(Products);
exports.create_product = factory.createOne(Products);
exports.get_product = factory.getOne(Products, { path: 'reviews' });
exports.update_product = factory.updateOne(Products);
exports.delete_product = factory.deleteOne(Products);