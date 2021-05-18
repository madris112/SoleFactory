const mongoose = require('mongoose'); // Erase if already required
const userjson = require('./json/user.json');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(userjson);

//Export the model
module.exports = mongoose.model('Userinfo', userSchema);