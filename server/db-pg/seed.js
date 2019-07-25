// When this file is run, (i) the current `restaurant` table is cleared, (ii)
// the current `restaurants.csv` file is cleared, (iii) new content is generated
// and added to `restaurants.csv, and (iv) the contents of that file are
// copied over to the `restaurant` table. When seeding 10,000,000 items, the
// process should take less than ten minutes on a newish computer.
//
// The range of the item's ideas are specified in environment variables as START_ID
// and END_ID.

// seedInChunks();

const { exec } = require('child_process');
const { seedInChunks } = require('./seedHelpers');
require('dotenv').config();

const databaseName = process.env.DATABASE_NAME;


// TODO: rest_test => restaurant[s?]
const loadCSVIntoDatabase = () => {
  const command = exec(`psql -d ${databaseName} -c "copy rest_test from '${__dirname}/restaurants.csv' csv delimiter ','"`);

  command.stderr.on('data', (err) => {
    console.log(err);
  });

  console.log('Loading CSV data into database...')

  command.on('close', (code) => {
    if (code === 0) {
      console.log('CSV data loaded into database.');
      console.log('Database seeded successfully. Have a nice day.');
    } else {
      throw new Error('Unable to add CSV data into database');
    }
  });
};

const clearTable = () => {
  const command = exec(`psql -d ${databaseName} -f ${__dirname}/schema.sql`);

  command.on('close', (code) => {
    if (code === 0) {
      console.log('`restaurants` table cleared.');
      seedInChunks();
      loadCSVIntoDatabase();
    } else {
      throw new Error('Unable to clear table');
    }
  });
};

console.log('Seeding database...');
clearTable();

// loadCSVIntoDatabase();

// console.log(__dirname);
// const clearTable = spawn(`psql -d ${databaseName} -f schema.sql`);
// const command = exec(`psql -d ${databaseName} -f ${__dirname}/schema.sql`);
// const clearTable = exec(`cat ${__dirname}/schema.sql`);
// const clearTable = spawn('ls');
// const clearTable = exec('cat README.md');

// clearTable.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// clearTable.stderr.on('data', function(data){
//   console.log("ETEREOIJSODIJFOSDIFJ");
//   console.log(data);
//   // triggerErrorStuff();
// });

// clearTable.on('close', (code) => {
//   if (code === 0) {
//     console.log('`restaurants` table cleared.');
//   }
// });

// console.log(__dirname);

// const pwd = spawn('pwd');

// pwd.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// console.log(__dirname);
