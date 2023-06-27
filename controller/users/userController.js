const User = require("../../model/users/userModel");
const factory = require("../../handlers/handleFactory");


exports.get_all_users = factory.getAll(User);

exports.get_user = factory.getOne(User);
exports.update_user = factory.updateOne(User); //DO NOT CHANGE PASSWORD
exports.delete_user = factory.deleteOne(User);