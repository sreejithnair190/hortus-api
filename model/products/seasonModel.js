const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A season must have a name"],
        unique: true,
        }

});

const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;
