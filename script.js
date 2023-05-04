require('dotenv').config();

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/chores', require('./controllers/chores'));

app.listen(3110, () => {
  console.log('API listening on port http://localhost:3110');
});
