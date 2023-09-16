const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Products',
        required: [true, 'An inventory must have a product']
    },
    quantity:{
        type: Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false,
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;