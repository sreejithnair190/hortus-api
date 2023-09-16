const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "A review cannot be empty"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "A review must have a rating"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to user'],
    },
  ],
  product: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Products',
    },
  ]
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.pre(/^find/, function (next){
  this.populate({
    path: 'user',
    select: 'name'
  })
  next();
})

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
