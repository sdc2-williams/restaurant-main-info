const fs = require('fs');
const { exec } = require('child_process');
const { LoremIpsum } = require('lorem-ipsum');

require('dotenv').config();

const database = process.env.DATABASE_NAME;
const startId = Number(process.env.START_ID) || 1;
const endId = Number(process.env.END_ID) || 1000;

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 15,
    min: 4,
  },
});

const makeName = () => lorem.generateWords(2);

const makeDescription = () => lorem.generateSentences(2);

// TODO: refactor this
const makeAddress = () => Math.floor(Math.random() * Math.floor(100)) + ' ' + lorem.generateWords(1) + ' ' + ['St.', 'Blvd.', 'Rd.'][Math.floor(Math.random() * Math.floor(3))];

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

// The values of `location` and `hours` are stringified JSON. They are
// surrounded by double quotes so Postgres knows they are strings. In `hours`,
// the double quotes in the stringified object are surrounded by double quotes
// because in Postgres you escape values in CSV by quoting them.
const makeRestaurant = id => ({
  id,
  name: makeName(),
  description: makeDescription(),
  address: makeAddress(),
  estDelivery: makeDeliveryTime(),
  location: '"' + JSON.stringify(makeLocation()) + '"',
  hours: '"' + JSON.stringify(makeHours()).replace(/"/g, '""') + '"',
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
  const numberOfChunks = 100; // Increase this number if you get out-of-memory errors when seeding
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
  console.log(`Generating ${chunkRanges.length} chunks...`);
  clearCSV();

  chunkRanges.forEach((range, i) => {
    process.stdout.write((i + 1).toString());
    seedChunk(...range);
    process.stdout.write('.');
  });

  console.log('\nAll chunks generated.');
};

const loadCSVIntoDatabase = () => new Promise((resolve, reject) => {
  const command = exec(`psql -d ${database} -c "copy restaurants from '${__dirname}/restaurants.csv' csv delimiter ','"`);

  command.stderr.on('data', (err) => {
    reject(err);
  });

  command.on('close', (code) => {
    if (code === 0) {
      resolve('CSV data loaded into database.');
    } else {
      reject(new Error('Unable to add CSV data into database'));
    }
  });
});

const clearTable = () => new Promise((resolve, reject) => {
  const command = exec(`psql -d ${database} -f ${__dirname}/schema.sql`);

  command.on('close', (code) => {
    if (code === 0) {
      resolve('`restaurants` table cleared.');
    } else {
      reject(new Error('Unable to clear table'));
    }
  });
});

const handleSeeding = () => {
  console.log(`Seeding database with ${endId - startId + 1} items...`);

  return clearTable()
    .then(() => seedInChunks())
    .then(() => console.log('Loading CSV into database...'))
    .then(() => loadCSVIntoDatabase())
    .then(() => {
      console.log('CSV loaded into database');
      console.log('Database seeded successfully. Have a nice day.');
    })
    .catch(err => console.log('Error seeding database:', err));
};

module.exports = {
  handleSeeding,
  seedInChunks,
};
