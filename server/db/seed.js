const models = require('./models.js');
// const key = require('./seedConfig.js');
// const googleMapsClient = require('@google/maps').createClient({
//   key: key.key,
// });

// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   } else{
//     console.log(err)
//   }
// });

// googleMapsClient.findPlace({
//   input: '7607274000',
//   inputtype: 'phonenumber',
//   fields: ['formatted_address', 'geometry', 'name', 'place_id', 'opening_hours'],
// }, function(err, results){
//   if(err){
//     console.log('error', err)
//   } else{
//     console.log(results)
//   }
// });

// googleMapsClient.places({query: 'McDonalds', region: 'Encinitas'}, function(err, results){
//   if(err){
//     console.log('error', err)
//   } else{
//     console.log(results)
//   }
// });


let mcdonalds = {
  id: 1,
  name: 'McDonald\'s',
  address: '123 Fake Street',
  location: [33.067149, -117.263955],
  hours: [{
    day: 'Monday',
    open: '0500',
    close: '1100',
  },
  {
    day: 'Tuesday',
    open: '0500',
    close: '1100',
  },
  {
    day: 'Wednesday',
    open: '0500',
    close: '1100',
  },
  {
    day: 'Thursday',
    open: '0500',
    close: '1100',
  },
  {
    day: 'Friday',
    open: '0500',
    close: '1100',
  },
  {
    day: 'Saturday',
    open: '0500',
    close: '1100',
  },
  {
    day: 'Sunday',
    open: '0500',
    close: '1100',
  }],
};

models.newRest(mcdonalds)
.then(data=> console.log('sucess', data))
.catch(err => console.log(err))