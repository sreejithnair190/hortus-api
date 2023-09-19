const Email = require("./../services/emailService");
const User = require("./../model/users/userModel");
const catchAsync = require("./../handlers/handleAsyncErr");

exports.home_url = (req, res) => {
    try{
        res.status(200).json({
            status: 'success',
            message: 'Hortus-Api version 1'
        })
    }catch(err) {}
}

// exports.test_email = catchAsync(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });
//     const email = new Email(user);
//     const view = email.getTemplate('welcome');
//     const subject = "Welcome to Hortus - Your Green Oasis Awaits!";
//     const data = {
//         name: user.name
//     }
//     await new Email(user).sendMail(view, subject, data)
//
//     res.status(200).json({
//         status:"success"
//     })
// });