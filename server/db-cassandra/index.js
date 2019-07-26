const cd = require('cassandra-driver');

const client = new cd.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'test' });

const queryString = 'select * from restaurants';


client.execute(queryString)
  .then(res => console.log(res.rows))
  .catch(console.error);
