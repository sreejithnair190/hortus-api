const User = require("../../model/users/userModel");
const factory = require("../../handlers/handleFactory");


exports.get_all_users = factory.getAll(User);
exports.get_user = factory.getOne(User);
exports.update_user = factory.updateOne(User);
exports.delete_user = factory.deleteOne(User);