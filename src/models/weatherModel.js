const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zipcodeSchema = new Schema({
    zip: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});

const Zipcode = mongoose.model("Zipcode", zipcodeSchema);

module.exports = Zipcode;