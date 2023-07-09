const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require("./../../model/users/userModel");
const AppError = require("./../../utils/appError");
const catchAsync = require("./../../handlers/handleAsyncErr");
const sendEmail = require("./../../utils/email");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
}

const createSendToken = (user,statusCode,res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000),
    httpOnly: true
  } 
  
  if (process.env.NODE_ENV === 'production') cookieOptions.secure=true;
  res.cookie('jwt', token , cookieOptions );

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user
      }
    });
}
exports.signup = catchAsync( async (req, res, next) => {
  
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser,201,res);
    

  }); 

exports.login = catchAsync( async (req,res,next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please provide email and password',400));
        
    }

    const user= await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password',403));
        
    }

    createSendToken(user,200,res);
    
});

exports.protect = catchAsync( async (req,res,next) => {
  
  let token;
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError('Not Logged in',403));
    
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    return next(new AppError("User with this token doesn't exist",403));
    
  }

  if(currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password. Please login again',403));
    
  }
  
  req.user=currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next)=>{

    if(!roles.includes(req.user.role)){
      return next(new AppError("You don't have permission to perform this action",403));
    
    }

    next();
  }
}

exports.forgotPassword =catchAsync( async (req, res, next) => {

  const user = await User.findOne({email: req.body.email});
  if(!user){
    return next(new AppError('No user with this email',404));
    
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave: false});

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit request with new password and passwordConfirm to: ${resetURL}.\n If you didn't forget your password, please ignore this email`;
try{
  await sendEmail({
    email: user.email,
    subject: 'Your password reset token valid for 10 minutes',
    message
  });

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!'
  });
}catch(err){
  user.createPasswordResetToken= undefined;
  user.passwordResetExpires = undefined;
  await user.save({validateBeforeSave: false});

  return next(new AppError('There was an error sending email. Try again later.',400));
}
  

});

exports.resetPassword = catchAsync( async (req, res, next) => {

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires:{$gt:Date.now()}
  });

  if(!user){
    return next(new AppError('Token is invalid or expired!',400));
    }
   
    
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user,200,res);

});

exports.updatePassword =catchAsync( async (req,res,next) => {
  const user = await User.findById(req.user.id).select('+password');

  if(!(await user.correctPassword(req.body.passwordCurrent,user.password))){
    return next(new AppError('Your password is incorrect.',403));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();


  createSendToken(user,200,res);

});






