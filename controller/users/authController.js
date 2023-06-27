const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require("../../model/users/userModel");
// const AppError = require("./../utils/{Apperror_name}")

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role
    });

    const token = signToken(newUser._id); 
    

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser
      }
    });

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.login = async (req,res,next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        //return next(new AppError('Please provide email and password',400));
        return next(console.log("Provide email or pass"));
    }

    const user= await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password,user.password))){
        //return next(new AppError('Incorrect email or password',401));
        return next(console.log("Incorrect email or pass"));
    }

    token= signToken(user._id);
    res.status(200).json({
        status: "Success",
        token
    })
};

exports.protect = async (req,res,next) => {
  
  let token;
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    //return next(new AppError('Not Logged in',401));
    return next(console.log("Not logged in"));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    //return next(new AppError('User with this token doesn't exist',401));
    return next(console.log("user dont exist"));
  }

  if(currentUser.changedPasswordAfter(decoded.iat)){
    //return next(new AppError('User recently changed password. Please login again',401));
    return next(console.log("User recently changed password. Please login again"));
  }
  
  req.user=currentUser;
  next();
}

exports.restrictTo = (...roles) => {
  return (req, res, next)=>{

    if(!roles.includes(req.user.role)){
      //return next(new AppError('You don't have permission to perform this action',403));
    return next(console.log("No Permission"));
    }

    next();
  }
}

exports.forgotPassword = async (req, res, next) => {

  const user = await User.findOne({email: req.body.email});
  if(!user){
    //return next(new AppError('No user with this email',404));
    return next(console.log("No user"));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave: false});

  next();

}
exports.resetPassword = (req, res, next) => {}






