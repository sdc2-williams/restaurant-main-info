const express = require('express');
const models = require('./db/models.js');

// TODO: use express.json() middleware

const app = express();
const PORT = 2000; // update later

app.use(express.static((`${__dirname}/../public`)));
app.use('/:id', express.static((`${__dirname}/../public`)));

// receives request at an id endpoint URL and returns, object containing restaurant data.
app.get('/api/restaurant/:id', (req, res) => {
  const restId = req.params.id;

  models.getRest(restId)
    .then(restData => res.status(202).send(restData).end())
    .catch(err => res.status(400).send(err).end());
});

// TODO
app.put('/api/restaurant/:id', (req, res) => {
  const { id } = req.params;
  res.end('todo');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
