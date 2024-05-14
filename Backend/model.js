const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  places: String,
  Rating: Number,
  PriceApprox: Number,
});

const Model = mongoose.model('location', schema);
module.exports = Model;
