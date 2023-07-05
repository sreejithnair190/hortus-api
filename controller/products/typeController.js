const Type = require('./../../model/products/typeModel');
const factory = require('./../../handlers/handleFactory');

exports.get_types = factory.getAll(Type);
exports.create_type = factory.createOne(Type);
exports.get_type = factory.getOne(Type);
exports.update_type = factory.updateOne(Type);
exports.delete_type= factory.deleteOne(Type);
