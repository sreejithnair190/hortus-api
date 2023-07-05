const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A plant must have a name'],
        unique:true
    },
    description:{
        type:String,
        required: [true, 'A plant must have a description'],
    },
    price:{
      type:Number,
      required: [true, 'A plant must have a price'],  
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default: 0
    },
    available:{
        type:Number,
        default:0
    },
    imageCover: {
        type:String,
        // required:[true,'A product must have a cover image']
    },
    images:[String],
    seed:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Seeds'
        }
    ],
    season:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Seasons'
        }
    ],
    categories:[
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Categories'
        }
    ],
    location:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Locations'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false,
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

plantSchema.virtual('reviews',{
    ref: 'Reviews',
    foreignField: 'plant',
    localField: '_id'
})

const Plants = mongoose.model('Plants', plantSchema);

module.exports = Plants