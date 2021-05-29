const mongoose = require("mongoose");
require("../database/database");

var prodrateschema = new mongoose.Schema({
  prodid: String,
  rating: Number,
  cnt: Number,
});

//Export the model
module.exports = mongoose.model("prodrate", prodrateschema);
