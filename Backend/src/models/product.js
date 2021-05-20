const mongoose    = require('mongoose');
const ProductJson = require('./json/product.json');
require('../database/database');

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(ProductJson);

//Export the model
module.exports = mongoose.model('productinfo', productSchema);




