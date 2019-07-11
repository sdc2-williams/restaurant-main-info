const express = require('express');
const db = require('./db/models.js');

const app = express();
const PORT = 2000; //update later

app.use(express.static(__dirname + '/../public'));

app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`);
});
