const { default: mongoose } = require("mongoose");

const Addressschema = new mongoose.Schema({
  fullName:String,
  phone:String,
  addressLine:String,
  city:String,
  state:String,
  pincode:String,
  email:String,
});

// define name of collection

module.exports = mongoose.model('address', Addressschema);