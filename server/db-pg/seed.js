const { LoremIpsum } = require('lorem-ipsum');
// const model = require('./models.js');

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 15,
    min: 4,
  },
});

// HELPER FUNCTIONS
const makeName = () => lorem.generateWords(2);

const makeDescription = () => lorem.generateSentences(2);

// TODO: refactor this
const makeAddress = () =>  Math.floor(Math.random() * Math.floor(100)) + ' ' + lorem.generateWords(1) + ' ' + ['St.', 'Blvd.', 'Rd.'][Math.floor(Math.random() * Math.floor(3))];

// TODO: fix this
const makeLocation = () => [33.067149, -117.263955];

// TODO: fix this
const makeHours = () => [{
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

const makeRestaurant = (id) => ({
  id,
  name: makeName(),
  description: makeDescription(),
  address: makeAddress(),
  location: makeLocation(),
  hours: makeHours(),
});


// SEED SCRIPTS
const startId = process.env.START_ID || 100;
const endId = process.env.END_ID || 110;

const seed = () => {
  const restaurants = [];
  for (let id = startId; id <= endId; id += 1) {
    restaurants.push(makeRestaurant(id));
  }

  console.log(restaurants);
};

seed();