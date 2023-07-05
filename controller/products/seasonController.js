const Season = require('./../../model/products/seasonModel');
const factory = require('./../../handlers/handleFactory');

exports.get_seasons = factory.getAll(Season);
exports.create_season = factory.createOne(Season);
exports.get_season = factory.getOne(Season);
exports.update_season = factory.updateOne(Season);
exports.delete_season= factory.deleteOne(Season);
