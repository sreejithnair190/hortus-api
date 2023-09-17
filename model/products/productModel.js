const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A product must have a name'],
        unique:true
    },
    description:{
        type:String,
        required: [true, 'A product must have a description'],
    },
    price:{
        type:Number,
        required: [true, 'A product must have a price'],
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
        required:[true,'A product must have a cover image']
    },
    images:[String],
    season:[
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Seasons'
        }
    ],
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'A product must have a category']
    },
    type:[
        {
            type: [mongoose.Schema.ObjectId],
            ref:'Type'
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
});

productSchema.virtual('reviews',{
    ref: 'Reviews',
    foreignField: 'product',
    localField: '_id'
})

const Products = mongoose.model('Products', productSchema);

module.exports = Products;