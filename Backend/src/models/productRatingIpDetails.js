const mongoose    = require('mongoose');
const Ratingjson = require('./json/rating.json');
require('../database/database');

var ratingschema = new mongoose.Schema(Ratingjson);


//Export the model
module.exports = mongoose.model('ratingdb', ratingschema);
