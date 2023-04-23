const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A plant must have a name'],
        unique:true
    },
    description:{
        type:String
    }
})

const Plants = mongoose.model('Plants', plantSchema);

module.exports = Plants