const express = require('express');
const model = require('./db-pg/model.js');

const app = express();
const PORT = 2000;

// Middleware
app.use(express.static((`${__dirname}/../public`)));
app.use('/:id', express.static((`${__dirname}/../public`)));
app.use(express.json());

// API routes
app.get('/api/restaurant/name/:name', (req, res) => {
  const { name } = req.params;

  model.getRestaurantByName(name)
    .then(restaurant => res.json(restaurant))
    .catch(err => res.json(err));
});

app.get('/api/restaurant/:id', (req, res) => {
  const { id } = req.params;

  model.getRestaurant(id)
    .then(restaurant => res.json(restaurant))
    .catch(err => res.json(err));
});

app.post('/api/restaurant', (req, res) => {
  const newRestaurant = req.body;

  model.postRestaurant(newRestaurant)
    .then(() => res.json(newRestaurant))
    .catch(err => res.json(err));
});

app.put('/api/restaurant/:id', (req, res) => {
  const { id } = req.params;
  const valuesToUpdate = req.body;

  model.updateRestaurant(id, valuesToUpdate)
    .then(updatedRestaurant => res.json(updatedRestaurant))
    .catch(err => res.json(err));
});

app.delete('/api/restaurant/:id', (req, res) => {
  const { id } = req.params;

  model.deleteRestaurant(id)
    .then(deletedRestaurant => res.json(deletedRestaurant))
    .catch(err => res.status(202).send(err).end());
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
