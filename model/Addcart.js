const { default: mongoose } = require("mongoose");

const Addcartschema = new mongoose.Schema({
  productname:String,
  productprice:String,
  productimage:String,
  productimage2:String,
  productimage3:String,
  regularproductprice:String,
  category:String,
  productdes:String,
  productquatity:String,
});

// define name of collection

module.exports = mongoose.model('cart', Addcartschema);