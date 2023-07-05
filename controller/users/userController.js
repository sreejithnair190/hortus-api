const User = require("../../model/users/userModel");
const factory = require("../../handlers/handleFactory");
const catchAsync = require("./../../handlers/handleAsyncErr");


exports.get_all_users = factory.getAll(User);

exports.get_user = factory.getOne(User);
exports.update_user = factory.updateOne(User); //DO NOT CHANGE PASSWORD
exports.delete_user = factory.deleteOne(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}


exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });