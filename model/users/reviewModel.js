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
  product:{
    type:String,
    enum:['plant', 'seed', 'fertilizer', 'soil', 'pot', 'accessories']
  },
  product_id:{
    type:String,
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
    },
  ],
  seed: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Seeds',
    },
  ],
  fertilizer: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Fertilizers',
    },
  ],
  soil: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Soils',
    },
  ],
  accessory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Accessories',
    },
  ],
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.pre(/^find/, function (next){
  this
  .populate({
    path: 'user',
    select: 'name'
  })
  next();
})

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
