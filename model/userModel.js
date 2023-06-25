const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
//const validator = require('validator');

// Create User schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    //validate: [validator.isEmail,'Please provide a valid email']
  },
  photo: String,
  role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true,'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm:{
    type: String,
    required: [true, 'Please confirm password'],
    validate:{
      validator: function(el){
        return el === this.password;
      },
      message:'Passwords are not the same'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date 

});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,12);

  this.passwordConfirm = undefined;
  next();
})

userSchema.methods.correctPassword= async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
}


userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }
  
  return false;

}

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 ;

  return resetToken;
}

// Create User model
const User = mongoose.model('User', userSchema);

// Export User model
module.exports = User;
