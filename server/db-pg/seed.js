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

const makeDeliveryTime = () => Math.floor(Math.random() * Math.floor(60));

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

const makeRestaurant = id => ({
  id,
  name: makeName(),
  description: makeDescription(),
  address: makeAddress(),
  estDelivery: makeDeliveryTime(),
  // location: '"' + JSON.stringify(makeLocation()) + '"',
  // hours: '"' + JSON.stringify(makeHours()) + '"',
});

const formatLine = object => Object.values(object).join(',');

const clearCSV = () => {
  const outputFile = `${__dirname}/restaurants.csv`;
  fs.writeFileSync(outputFile, '');
};

// OLD. Supereded by addToCSV
// TODO: switch to fs.appendFileSync
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

const addToCSV = (items) => {
  console.log('Appending to CSV.');
  const lines = items.map(formatLine).join('\n');
  console.log('- Formatting complete.');


  console.log('- Appending records to file...');
  const outputFile = `${__dirname}/restaurants.csv`;
  fs.appendFileSync(outputFile, lines, (err) => {
    if (!err) {
      console.log('- Appending complete.');
      console.log('CSV appended.');
    } else {
      console.error(err);
    }
  });
};

// SEED SCRIPTS
const startId = process.env.START_ID || 1;
const endId = process.env.END_ID || 1000;

//  OLD. Superseded by seedChunk
// TODO: split into ten chunks, 1,000,000 each.
const seed = () => {
  const restaurants = [];
  console.log('Generating mock data...');
  for (let id = startId; id <= endId; id += 1) {
    restaurants.push(makeRestaurant(id));
  }
  console.log('Data generated.');

  generateCSV(restaurants);
};

const seedChunk = (start, end) => {
  const restaurants = [];
  console.log('Generating mock data...');
  for (let id = start; id <= end; id += 1) {
    restaurants.push(makeRestaurant(id));
  }
  console.log('Data generated.');

  addToCSV(restaurants);
};

// Returns an array of sub-ranges that equally divide the given range. For
// example, `makeChunkRanges(1, 100)` => [[1, 11], [11, 21], ..., [90, 100]]
const makeChunkRanges = (start, end) => {
  const numberOfChunks = 10;
  const rangeLength = end - start + 1;
  const chunkSize = Math.floor(rangeLength / numberOfChunks);

  const ranges = [];
  for (let i = start; i <= end; i += chunkSize) {
    ranges.push([i, Math.min(i + chunkSize, end)]);
  }

  return ranges;
};

const seedInChunks = () => {
  const chunkRanges = makeChunkRanges(startId, endId);

  console.log(`Generating ${chunkRanges.length} chunks of ${endId - startId + 1} total items...`);

  clearCSV();

  chunkRanges.forEach((range, i) => {
    process.stdout.write((i + 1).toString());
    seedChunk(...range);
    process.stdout.write('.');
  });

  console.log('\nAll chunks generated. Have a nice day.');
};

// seed();

// console.log(makeChunkRanges(1, 100));

seedInChunks();

// seedChunk(1, 100);

// TO COPY CSV INTO TABLE
// in pgsql, run:
// copy rest_test from '/Users/thomas/Coding/Hack-Reactor/sdc/restaurant-main-info/server/db-pg/restaurants.csv' csv delimiter ',' header;