const { Client } = require('pg');

const client = new Client({
  database: 'sdc-tf3',
});

client.connect();

// ADD
// const queryString = 'INSERT INTO restaurants(name, description, address, estDelivery, location, hours) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
// const values = ['Joe', 'family restaurant', '777 Long Rd.', 42, [43.23453, 32.12345], ['xx:xx', 'yy:yy']];

// client.query(queryString, values)
//   .then(response => console.log(response.rows[0]))
//   .catch(console.log)
//   .finally(() => console.log('finished'));

// GET
// const queryString = 'SELECT * from restaurants';
// client.query(queryString)
//   .then(({ rows }) => console.log(rows))
//   .catch(console.log);
