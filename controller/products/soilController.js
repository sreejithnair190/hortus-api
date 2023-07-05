const Soils = require('./../../model/products/soilModel');
const factory = require('./../../handlers/handleFactory');

exports.get_soils = factory.getAll(Soils);
exports.create_soil = factory.createOne(Soils);
exports.get_soil = factory.getOne(Soils, { path: 'reviews' });
exports.update_soil = factory.updateOne(Soils);
exports.delete_soil = factory.deleteOne(Soils);