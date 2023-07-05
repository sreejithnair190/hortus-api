const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "An accessory must have a name"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "An accessory must have a description"],
    },
    price: {
        type: Number,
        required: [true, "An accessory must have a price"],
    },
    discount: {
        type: Number,
        default: 0,
    },
    ratingsAverage: {
        type: Number,
        default: 4.0,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    //reviewIds: [mongoose.Schema.Types.ObjectId],
    imageCover: {
        type: String,
        // required:[true,'An accessory must have a cover image']
    },
    images: [String],
    slug: {
        type: String,
        unique: true,
    },
    available: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

const Accessories = mongoose.model("Accessories", accessorySchema);

module.exports = Accessories;
