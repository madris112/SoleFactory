const mongoose    = require('mongoose');
require('../database/database');

var prodcntschema = new mongoose.Schema({
  prodid: String,
  cnt: Number
});

//Export the model
module.exports = mongoose.model('prodcnt', prodcntschema);
