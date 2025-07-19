const { default: mongoose } = require("mongoose");

const wishlistschema = new mongoose.Schema({
  productname:String,
  productprice:String,
  productimage:String,
  category:String,
  productquatity:String,
});

// define name of collection

module.exports = mongoose.model('wishle', wishlistschema);