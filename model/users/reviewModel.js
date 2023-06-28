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
  },
  product:{
    type:String,
    enum:['plant', 'seed', 'fertilizer', 'soil', 'pot', 'accessories'],
    required:[true, 'A review must have a product']
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
  plant: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Plants',
      required: [true, 'A review must belong to user'],
    },
  ],
  seed: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Seeds',
      required: [true, 'A review must belong to user'],
    },
  ],
  fertilizer: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Fertilizers',
      required: [true, 'A review must belong to user'],
    },
  ],
//   soil: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: 'Soils',
//       required: [true, 'A review must belong to user'],
//     },
//   ],
//   pot: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: 'Pots',
//       required: [true, 'A review must belong to user'],
//     },
//   ],
//   accessory: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: 'Accessories',
//       required: [true, 'A review must belong to user'],
//     },
//   ],
});

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;
