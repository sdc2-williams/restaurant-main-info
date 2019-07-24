const express = require('express');
const models = require('./db/models.js');

const app = express();
const PORT = 2000;

// Middleware
app.use(express.static((`${__dirname}/../public`)));
app.use('/:id', express.static((`${__dirname}/../public`)));
app.use(express.json());

// API routes
app.get('/api/restaurant/name/:name', (req, res) => {
  const { name } = req.params;

  models.getRestByName(name)
    .then(restData => res.status(202).send(restData).end())
    .catch(err => res.status(400).send(err).end());
});

app.get('/api/restaurant/:id', (req, res) => {
  const restId = req.params.id;

  models.getRest(restId)
    .then(restData => res.status(202).send(restData).end())
    .catch(err => res.status(400).send(err).end());
});

app.post('/api/restaurant', (req, res) => {
  const newRestaurant = req.body;

  models.postRest(newRestaurant)
    .then(() => res.json(newRestaurant))
    .catch(err => res.status(400).send(err).end());
});

app.put('/api/restaurant/:id', (req, res) => {
  const { id } = req.params;
  const valuesToUpdate = req.body;

  models.updateRest(id, valuesToUpdate)
    .then(updatedRest => res.json(updatedRest))
    .catch(err => res.status(400).send(err).end());
});

app.delete('/api/restaurant/:id', (req, res) => {
  const { id } = req.params;
  let deletedRest;

  models.getRest(id)
    .then(dbResponse => deletedRest = dbResponse)
    .then(() => models.deleteRest(id))
    .then(() => res.json(deletedRest))
    .catch(err => res.status(202).send(err).end());
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
