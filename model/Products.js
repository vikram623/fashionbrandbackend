const { default: mongoose } = require("mongoose");

const Productschema = new mongoose.Schema({
  productname:String,
  productprice:String,
  regularproductprice:String,
  productimage:String,
  productimage2:String,
  productimage3:String,
  productdes:String,
  category:String,
  productquatity:String,
});

// define name of collection

module.exports = mongoose.model('Products', Productschema);