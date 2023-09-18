const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    address:{
        type: String,
        required: [true, 'Please provide address']
    },
    city:{
        type: String,
        required: [true, 'Please provide city']
    },
    state:{
        type: String,
        required: [true, 'Please provide state']
    },
    country:{
        type: String,
        required: [true, 'Please provide country']
    }
});


const Address = mongoose.model('Address', addressSchema);

module.exports = Address;