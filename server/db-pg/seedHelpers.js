const fs = require('fs');
const { LoremIpsum } = require('lorem-ipsum');

require('dotenv').config();

const startId = Number(process.env.START_ID) || 1;
const endId = Number(process.env.END_ID) || 1000;

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

const addToCSV = (items) => {
  const lines = items.map(formatLine).join('\n') + '\n';

  const outputFile = `${__dirname}/restaurants.csv`;
  fs.appendFileSync(outputFile, lines, (err) => {
    if (err) {
      console.error(`Error appending to CSV: ${err}`);
    }
  });
};

const seedChunk = (start, end) => {
  const restaurants = [];

  for (let id = start; id <= end; id += 1) {
    restaurants.push(makeRestaurant(id));
  }

  addToCSV(restaurants);
};

// Returns an array of sub-ranges that equally divide the given range. For
// example, `makeChunkRanges(1, 100)` => [[1, 10], [11, 20], ..., [91, 100]]
const makeChunkRanges = (start, end) => {
  const numberOfChunks = 10;
  const rangeLength = end - start;
  const chunkSize = Math.floor(rangeLength / numberOfChunks);

  const ranges = [];
  for (let i = start; i <= end; i += chunkSize + 1) {
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

// seedInChunks();

// TO COPY CSV INTO TABLE
// in pgsql, run:
// copy rest_test from '/Users/thomas/Coding/Hack-Reactor/sdc/restaurant-main-info/server/db-pg/restaurants.csv' csv delimiter ',' header;
// TODO: find the bash version of this

module.exports {
  seedInChunks
};