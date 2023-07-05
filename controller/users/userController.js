const User = require("../../model/users/userModel");
const factory = require("../../handlers/handleFactory");
const catchAsync = require("./../../handlers/handleAsyncErr");


exports.get_all_users = factory.getAll(User);
exports.get_user = factory.getOne(User);
exports.update_user = factory.updateOne(User);
exports.delete_user = factory.deleteOne(User);

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });