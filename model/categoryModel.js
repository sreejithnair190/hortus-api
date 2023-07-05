const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A plant must have a name'],
        unique:true
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

const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;