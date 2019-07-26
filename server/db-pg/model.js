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

const getRestaurantByName = (name) => {
  const queryString = `select * from restaurants where name = '${name}'`;

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

module.exports = {
  getRestaurant,
  getRestaurantByName,
  deleteRestaurant,
  postRestaurant,
  updateRestaurant,
};
