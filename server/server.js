const express = require('express');
const models = require('./db/models.js');

const app = express();
const PORT = 2000; // update later

app.use(express.static((`${__dirname}/../public`)));
app.use('/:id', express.static((`${__dirname}/../public`)));

// receives request at an id endpoint URL and returns, object containing restaurant data.
app.get('/api/restaurant/:id', (req, res) => {
  const restId = req.params.id;
  models.getRest(restId, (err, result) => {
    if (err) {
      res.status(400).send(err).end();
    } else {
      res.status(202).send(result).end();
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
