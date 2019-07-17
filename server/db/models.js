const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  address: String,
  estDelivery: Number,
  location: [Number],
  hours: [{ day: String, open: String, close: String }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

//  Insert new restaurant into database

const newRestaurants = (restArr) => {
  Restaurant.insertMany(restArr).then(data => console.log('documents inserted')).catch(err => console.log(err));
};

const getRestaurant = (restId, callback) => Restaurant.find({ id: restId }, callback);

module.exports = {
  newRests: newRestaurants,
  getRest: getRestaurant,
};
