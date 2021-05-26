const mongoose    = require('mongoose');
const Counterjson = require('./json/counter.json');
require('../database/database');

var counterschema = new mongoose.Schema(Counterjson);


//Export the model
module.exports = mongoose.model('newcountvisitdb', counterschema);
