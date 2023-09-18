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
<<<<<<< HEAD
        // required:[true,'A product must have a cover image']
    },
    images:[String],
    relatedProducts: [
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Products',
        }
    ],
=======
        required:[true,'A product must have a cover image']
    },
    images:[String],
>>>>>>> 033259b33e19336a632f359f7701ac161ee22666
    season:[
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Seasons'
        }
    ],
<<<<<<< HEAD
    category:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'A product must have a category']
        }
    ],
=======
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'A product must have a category']
    },
>>>>>>> 033259b33e19336a632f359f7701ac161ee22666
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