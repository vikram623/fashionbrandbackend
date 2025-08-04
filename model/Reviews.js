const { default: mongoose } = require("mongoose");

const reviewschema = new mongoose.Schema({
productid:String,
name:String,
review:String,
productname:String,
});

// define name of collection

module.exports = mongoose.model('review', reviewschema);