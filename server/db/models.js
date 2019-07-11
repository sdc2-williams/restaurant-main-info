const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
