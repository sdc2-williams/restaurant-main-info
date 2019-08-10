const fs = require('fs');
const { Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const { LoremIpsum } = require('lorem-ipsum');
require('dotenv').config();

const client = new Client();
client.connect();

const startId = Number(process.env.START_ID) || 1;
const endId = Number(process.env.END_ID) || 1000;

// The number of chunks that the restaurant data will be divided into when
// creating the CSV. Increase this number if you get out-of-memory errors while
// seeding.
const numberOfChunks = Number(process.env.NUMBER_OF_CHUNKS) || 100;

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 15,
    min: 4,
  },
});

const makeName = () => lorem.generateWords(2);

const makeDescription = () => lorem.generateSentences(2);

const randomInt = (min, max) => min + Math.floor(Math.random() * max);

const makeAddress = () => `${randomInt(1, 300)} ${lorem.generateWords(1)} ${['St.', 'Blvd.', 'Rd.'][randomInt(0, 2)]}`;

const makeDeliveryTime = () => randomInt(1, 60);

// TODO: fix this
const makeLocation = () => [33.067149, -117.263955];

const hoursFromDay = day => ({
  day,
  open: '0500',
  close: '1100',
});

const makeHours = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday', 'Sunday'];

  return days.map(hoursFromDay);
};

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
// (Output varies depending on value of `numberOfChunks`.)
const makeChunkRanges = (start, end) => {
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
  const done = (err) => {
    if (err) {
      reject(err);
    } else {
      resolve('CSV data loaded into database.');
    }
  };

  const database = client.query(copyFrom('COPY restaurants FROM STDIN csv'));
  const csv = fs.createReadStream(`${__dirname}/restaurants.csv`);

  csv.on('error', done);
  database.on('error', done);
  database.on('end', done);
  csv.pipe(database);
});

const createTable = () => (
  client.query(`
    drop table if exists restaurants;

    create table restaurants (
      id serial primary key,
      name varchar(50),
      description varchar(300),
      address varChar(250),
      estDelivery smallint,
      location text, -- These two columns store
      hours text --     stringified JSON.
    );

    create index on restaurants ("name");`)
);

const handleSeeding = () => {
  console.log(`Seeding database with ${endId - startId + 1} items...`);

  return createTable()
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
  makeRestaurant,
};
