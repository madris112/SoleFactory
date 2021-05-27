const mongoose = require('mongoose'); // Erase if already required
const userjson = require('./json/user.json');
require('../database/database');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(userjson);

//Export the model
module.exports = mongoose.model('usertestdb', userSchema);