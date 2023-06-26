
const Seeds = require(`../model/seedModel`);
const factory = require("./../handlers/handleFactory");


exports.get_seeds = factory.getAll(Seeds);
exports.create_seed = factory.createOne(Seeds);
exports.get_seed = factory.getOne(Seeds);
exports.update_seed = factory.updateOne(Seeds);
exports.delete_seed = factory.deleteOne(Seeds);