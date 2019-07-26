const { makeRestaurant } = require('../db-pg/seedHelpers.js');
const cd = require('cassandra-driver');

const client = new cd.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'test' });

const makeParams = restaurant => Object.values(restaurant);

const makeQueries = restaurants => (
  restaurants.map(restaurant => ({
    query: 'insert into restaurants(id, name, description, address, estdelivery, location, hours) values(?, ?, ?, ?, ?, ?, ?)',
    params: makeParams(restaurant),
  }))
);

const addBatchToDatabase = (restaurants) => {
  const queries = makeQueries(restaurants);

  return client.batch(queries, { prepare: true });
};

const makeRestaurants = (start, end) => {
  const restaurants = [];
  for (let i = start; i <= end; i += 1) {
    restaurants.push(makeRestaurant(i));
  }
  return restaurants;
};

const restaurants = makeRestaurants(1, 10);

const queryString = 'insert into restaurants(id, name, description, address, estdelivery, location, hours) values(?, ?, ?, ?, ?, ?, ?)';

const params = [ 10,
  'veniam ea',
  'Ullamco aliquip Lorem ex irure reprehenderit in ex pariatur. Irure excepteur mollit eu elit.',
  '96 elit Rd.',
  5,
  '"[33.067149,-117.263955]"',
  '"[{""day"":""Monday"",""open"":""0500"",""close"":""1100""},{""day"":""Tuesday"",""open"":""0500"",""close"":""1100""},{""day"":""Wednesday"",""open"":""0500"",""close"":""1100""},{""day"":""Thursday"",""open"":""0500"",""close"":""1100""},{""day"":""Friday"",""open"":""0500"",""close"":""1100""},{""day"":""Saturday"",""open"":""0500"",""close"":""1100""},{""day"":""Sunday"",""open"":""0500"",""close"":""1100""}]"' ];

// client.execute(queryString, params, { prepare: true })
//   .then(console.log)
//   .catch(console.error);

// console.log(makeQueries(restaurants));

addBatchToDatabase(restaurants);
