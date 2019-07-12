const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  location: [Number],
  hours: [{ day: String, open: String, close: String }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

//  Insert new restaurant into database

const newRestaurant = (restObj) => {
  const newPlace = new Restaurant(restObj);
  return newPlace.save();
};

const getRestaurant = (restId, callback) => Restaurant.find({ id: restId }, callback);

module.exports = {
  newRest: newRestaurant,
  getRest: getRestaurant,
};
