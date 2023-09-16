const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'An order must have a user']
    },
    products:[{
        type:[ mongoose.Schema.ObjectId],
        ref: 'Products',
        required: [true, 'An order must have a product']
    }],
    amount:{
        type: Number,
        required: [true, 'An order must have a amount']
    },
    payment:{

    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false,
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;