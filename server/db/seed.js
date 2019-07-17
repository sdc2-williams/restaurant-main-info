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

const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const models = require('./models.js');

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 15,
    min: 4,
  }
});

let mcdonalds = {
  id: 1,
  name: 'McDonald\'s',
  address: '123 Fake Street',
  location: [33.067149, -117.263955],
  description: 'Burgers, and french fries, and chicken McNuggets',
  estDelivery: 30,
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


const restArr = [];
restArr.push(mcdonalds);
for (let i = 2; i < 100; i++) {
  let obj = {};
  obj.id = i;
  obj.name = lorem.generateWords(2);
  obj.description = lorem.generateSentences(2);
  obj.address = Math.floor(Math.random() * Math.floor(100)) + ' ' + lorem.generateWords(1) + ' ' + ['street', 'blvd', 'road'][Math.floor(Math.random() * Math.floor(3))];
  obj.location = [33.067149, -117.263955];
  obj.hours = [{
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
  }];
  obj.estDelivery = Math.floor(Math.random() * Math.floor(60));
  restArr.push(obj);
}

models.newRests(restArr);