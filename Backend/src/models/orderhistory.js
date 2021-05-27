const mongoose    = require('mongoose');
const OrderHistoryJson = require('./json/orderHistory.json');
require('../database/database');

// Declare the Schema of the Mongo model
var OrderHistorySchema = new mongoose.Schema(OrderHistoryJson);

//Export the model
module.exports = mongoose.model('orderhtestbd', OrderHistorySchema);
