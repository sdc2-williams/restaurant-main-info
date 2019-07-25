const { Client } = require('pg');
require('dotenv').config();

const database = process.env.DATABASE_NAME;

const client = new Client({
  database,
});

client.connect();

// This modifies the given restaurant object by parsing its `hours` and
// `location` values, which are stored as stringified JSON in the database.
const fixData = (restaurant) => {
  restaurant.location = JSON.parse(restaurant.location);
  restaurant.hours = JSON.parse(restaurant.hours);
  return restaurant;
};

const getRestaurant = (id) => {
  const queryString = `select * from restaurants where id = ${id}`;

  return client.query(queryString)
    .then(res => fixData(res.rows[0]));
};

const deleteRestaurant = (id) => {
  const queryString = `delete from restaurants where id = ${id} returning *`;

  return client.query(queryString)
    .then(res => res.rows[0]);
};

// const updateRestaurant = (id, valuesToUpdate) => {

// };

const postRestaurant = (restaurant) => {
  const columns = Object.keys(restaurant);
  const values = Object.values(restaurant);
  const queryString = `insert into restaurants(${columns.join(', ')}) values(${values.join(', ')})`;

  return client.query(queryString);
};

// deleteRestaurant(123)
//   .then(console.log);

// deleteRestaurant(12)
  // .then(console.log);

module.exports = {
  getRestaurant,
  deleteRestaurant,
  postRestaurant,
};