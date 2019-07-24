const fs = require('fs');
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
  // address: makeAddress(),
  // location: makeLocation(),
  // hours: makeHours(),
});

const formatLine = object => Object.values(object).join(',');

// Takes an array of objects. Generates a CSV based on them.
// Precondition: All objects have the same structure.
const generateCSV = (items) => {
  console.log(`Generating CSV of ${items.length} records...`);

  console.log('- Formatting records...');
  const head = Object.keys(items[0]).join(',');
  const lines = head + '\n' + items.map(formatLine).join('\n');
  console.log('- Formatting complete.');


  console.log('- Writing records to file...');
  const outputFile = `${__dirname}/restaurants.csv`;
  fs.writeFile(outputFile, lines, (err, res) => {
    if (!err) {
      console.log('- Writing complete.');
      console.log('CSV generated.');
    }
  });
};


// SEED SCRIPTS
const startId = process.env.START_ID || 1;
const endId = process.env.END_ID || 1000000;

const seed = () => {
  const restaurants = [];
  console.log('Generating mock data...');
  for (let id = startId; id <= endId; id += 1) {
    restaurants.push(makeRestaurant(id));
  }
  console.log('Data generated.');

  generateCSV(restaurants);
};

seed();
