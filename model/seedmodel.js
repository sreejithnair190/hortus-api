const mongoose = require('mongoose');

const seedSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A seed must have a name'],
        unique:true
    },
    description:{
        type:String,
        required: [true, 'A seed must have a description'],
    },
    price:{
      type:Number,
      required: [true, 'A seed must have a price'],  
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
    }
    
})

const Seeds = mongoose.model('Seeds', seedSchema);

module.exports = Seeds