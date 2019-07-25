const { Client } = require('pg');
require('dotenv').config();

const database = process.env.DATABASE_NAME;

const client = new Client({
  database,
});

client.connect();

// This modifies the given restaurant object by parsing its `hours` and
// `location` values, which are stored as stringified JSON in the database.
const parseRestaurant = (restaurant) => {
  restaurant.location = JSON.parse(restaurant.location || '""');
  restaurant.hours = JSON.parse(restaurant.hours || '""');
  return restaurant;
};

// Same as `pasreRestaurant`, except it stringifies the relevant values.
const stringifyRestaurant = (restaurant) => {
  restaurant.location = JSON.stringify(restaurant.location || '');
  restaurant.hours = JSON.stringify(restaurant.hours || '');
  return restaurant;
};

const getRestaurant = (id) => {
  const queryString = `select * from restaurants where id = ${id}`;

  return client.query(queryString)
    .then(res => parseRestaurant(res.rows[0]));
};

const deleteRestaurant = (id) => {
  const queryString = `delete from restaurants where id = ${id} returning *`;

  return client.query(queryString)
    .then(res => res.rows[0]);
};

const updateRestaurant = (id, valuesToUpdate) => {
  const updateAssignments = Object.entries(stringifyRestaurant(valuesToUpdate))
    .filter(([column, _]) => column !== 'id') // don't update ID
    .map(([column, value]) => `${column} = '${value}'`)
    .join(', ');
  const queryString = `update restaurants set ${updateAssignments} where id = ${id}  returning *`;

  return client.query(queryString);
};

const postRestaurant = (restaurant) => {
  stringifyRestaurant(restaurant);
  const columns = Object.keys(restaurant);
  const values = Object.values(restaurant);
  const queryString = `insert into restaurants(${columns.join(', ')}) values(${values.join(', ')})`;

  return client.query(queryString);
};

// deleteRestaurant(123)
//   .then(console.log);

// deleteRestaurant(12)
  // .then(console.log);

// const re = {
//   id: 13,
//   name: 'PanPan',
//   description:
//   'Amet adipisicing nulla ea laboris labore consequat ipsum id consectetur nulla. Nisi non id non amet.',
//   address: '60 cillum Blvd.',
//   estdelivery: 19,
// };

// updateRestaurant(13, re);

// getRestaurant(13)
//   .then(console.log);

module.exports = {
  getRestaurant,
  deleteRestaurant,
  postRestaurant,
  updateRestaurant,
};
