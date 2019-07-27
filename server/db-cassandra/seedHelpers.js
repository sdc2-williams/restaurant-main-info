const { exec } = require('child_process');
const { seedInChunks } = require('../db-pg/seedHelpers.js');
require('dotenv').config();

const startId = Number(process.env.START_ID) || 1;
const endId = Number(process.env.END_ID) || 1000;

const loadCSVIntoDatabase = () => new Promise((resolve, reject) => {
  const command = exec(`cqlsh -k main_info -f ${__dirname}/loadCSV.sql`);

  command.stdout.on('data', console.log);
  command.stderr.on('data', reject);

  command.on('close', (code) => {
    if (code === 0) {
      resolve('CSV data loaded into database.');
    } else {
      reject(new Error('Unable to add CSV data into database'));
    }
  });
});

const clearTable = () => new Promise((resolve, reject) => {
  const command = exec(`cqlsh -f '${__dirname}/schema.sql'`);

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
};
