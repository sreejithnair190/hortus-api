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
        default:4.0
    },
    ratingsQuantity:{
        type:Number,
        default: 0
    },
    available:{
        type:Boolean,
        default:true
    },
    flower:{
        type:[String]
    },
    seeds:{
        type:[String]
    },
    soil:{
        type:[String]
    },
    fertilizer:{
        type:[String]
    },
    color:{
        type:[String]
    },
    season:{
        type:[String]
    },
    type:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false,
    }
})

const Plants = mongoose.model('Plants', plantSchema);

module.exports = Plants