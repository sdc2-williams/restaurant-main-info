const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  location: [Number],
  hours:[{day: String, open: String, close: String}],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

//Insert new restaurant into database
//
const newRestaurant = (restObj) => {
  let newPlace = new Restaurant(restObj);
  return newPlace.save();
};

module.exports = {
  newRest: newRestaurant,
};
