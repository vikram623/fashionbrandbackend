const { default: mongoose } = require("mongoose");

const Userschema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  mobile:String,
});

// define name of collection

module.exports = mongoose.model('Users', Userschema);