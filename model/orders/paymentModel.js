const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    order:{
        type: mongoose.Schema.ObjectId,
        ref: 'Orders',
        required: [true, 'A Payment must have an order']
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false,
    }
});

const Payment = mongoose.model('Payment', paymentSchema );

module.exports = Payment;