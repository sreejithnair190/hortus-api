const Accessory = require('./../../model/products/accessoryModel');
const factory = require('./../../handlers/handleFactory');

exports.get_accessories = factory.getAll(Accessory);
exports.create_accessory = factory.createOne(Accessory);
exports.get_accessory = factory.getOne(Accessory);
exports.update_accessory = factory.updateOne(Accessory);
exports.delete_accessory = factory.deleteOne(Accessory);
