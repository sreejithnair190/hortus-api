const Plants = require('./../../model/products/plantModel');
const factory = require('./../../handlers/handleFactory');

exports.get_plants = factory.getAll(Plants);
exports.create_plant = factory.createOne(Plants);
exports.get_plant = factory.getOne(Plants);
exports.update_plant = factory.updateOne(Plants);
exports.delete_plant = factory.deleteOne(Plants);