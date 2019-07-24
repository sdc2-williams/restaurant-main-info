const mongoose = require('mongoose');
const serverURL = 'localhost';

let retryConnect = () => {
  console.log('retrying connection to Mongo...')
  mongoose.connect(`mongodb://${serverURL}:27017/restaurants`,
    { useNewUrlParser: true}, (err, result) => {
    if(err){
      console.log('error')
      console.log(err)
      setTimeout(retryConnect, 5000)
    }
    console.log('Connected to mongo')
  });
};

// reconnectTries: 20, reconnectInterval: 5000

mongoose.connect(`mongodb://${serverURL}:27017/restaurants`, { useNewUrlParser: true})

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

const getRestaurant = id => Restaurant.find({ id });

const deleteRestaurant = id => Restaurant.deleteOne({ id });

const updateRestaurant = (id, valuesToUpdate) => {
  return Restaurant.findOneAndUpdate({ id }, valuesToUpdate, { new: true });
};

module.exports = {
  newRests: newRestaurants,
  getRest: getRestaurant,
  deleteRest: deleteRestaurant,
  updateRest: updateRestaurant,
};
